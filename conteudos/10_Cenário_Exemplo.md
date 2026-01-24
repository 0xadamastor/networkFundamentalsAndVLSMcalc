# 10 - Configurações de Avaliação Prática

### Topologia Base
- 1 Router central
- 3 Switches (1 central, 2 de acesso)
- Múltiplas VLANs
- Redundância com HSRP
- EtherChannel entre switches
- Protocolos de roteamento (EIGRP/OSPF)

## Configuração Completa por Equipamento

### Switch Central (Server VTP)
```bash
enable
configure terminal
hostname SWCENTRAL

# Configuração VTP
vtp domain istec.local
vtp mode server
vtp password cisco

# Criar VLANs
vlan 10
name Marketing
vlan 20
name Developers
vlan 30
name Admin

# Configurar trunks para switches de acesso
interface range fa0/23-24
switchport mode trunk

# EtherChannel para redundância (se aplicável)
interface range g0/1-2
channel-group 1 mode active
switchport mode trunk

# Trunk para router
interface g0/1
switchport mode trunk

# STP otimizações
spanning-tree portfast default
spanning-tree bpduguard default
```

### Switches de Acesso (Client VTP)
```bash
enable
configure terminal
hostname SWLEFT   # ou SWRIGHT

# Configuração VTP
vtp domain istec.local
vtp mode client
vtp password cisco

# Configurar portas de acesso
interface fa0/1
switchport mode access
switchport access vlan 10
switchport port-security
switchport port-security maximum 1
switchport port-security violation shutdown
switchport port-security mac-address sticky
spanning-tree portfast
spanning-tree bpduguard enable

interface fa0/2
switchport mode access
switchport access vlan 20
# ... repetir configuração port-security

interface fa0/3
switchport mode access
switchport access vlan 30
# ... repetir configuração port-security

# Trunk para switch central
interface fa0/24
switchport mode trunk
```

### Router (Inter-VLAN + HSRP + Roteamento)
```bash
enable
configure terminal
hostname R1

# Configuração básica de segurança
banner motd #ACESSO RESTRITO#
enable secret cisco
service password-encryption
line console 0
password cisco
login
logging synchronous

# Inter-VLAN Routing (Router-on-a-Stick)
interface g0/0
no ip address
no shutdown

# Sub-interfaces para cada VLAN
interface g0/0.10
encapsulation dot1q 10
ip address 192.168.10.1 255.255.255.0
standby 1 ip 192.168.10.254
standby 1 priority 110
standby 1 preempt

interface g0/0.20
encapsulation dot1q 20
ip address 192.168.20.1 255.255.255.0
standby 1 ip 192.168.20.254
standby 1 priority 110
standby 1 preempt

interface g0/0.30
encapsulation dot1q 30
ip address 192.168.30.1 255.255.255.240
standby 1 ip 192.168.30.254
standby 1 priority 110
standby 1 preempt

# Configuração WAN (ligação a outros routers)
interface s0/0/0
ip address 10.0.0.1 255.255.255.252
no shutdown

# EIGRP
router eigrp 100
network 192.168.10.0 0.0.0.255
network 192.168.20.0 0.0.0.255
network 192.168.30.0 0.0.0.15
network 10.0.0.0 0.0.0.3
passive-interface g0/0.10
passive-interface g0/0.20
passive-interface g0/0.30
no auto-summary

# Autenticação EIGRP
key chain EIGRP_KEYS
key 1
key-string passwordSegura123

interface s0/0/0
ip authentication mode eigrp 100 md5
ip authentication key-chain eigrp 100 EIGRP_KEYS
```

### Router Secundário (para HSRP)
```bash
enable
configure terminal
hostname R2

# Configurações similares ao R1, mas com prioridades HSRP menores
interface g0/0.10
encapsulation dot1q 10
ip address 192.168.10.2 255.255.255.0
standby 1 ip 192.168.10.254
standby 1 priority 90
standby 1 preempt

# ... repetir para outras VLANs com prioridade 90
```

## Lista de Verificação para Avaliação

### Conectividade Básica
- [ ] Ping entre VLANs funciona
- [ ] DHCP (se configurado) atribui IPs correctamente
- [ ] Acesso SSH/Telnet funciona

### VLANs e Trunking
- [ ] `show vlan brief` mostra VLANs correctas
- [ ] `show interfaces trunk` mostra trunks ativos
- [ ] VTP sincroniza VLANs entre switches

### Redundância
- [ ] `show spanning-tree` mostra topologia sem loops
- [ ] `show etherchannel summary` mostra EtherChannels ativos
- [ ] `show standby` mostra HSRP a funcionar

### Segurança
- [ ] Port security ativo nas portas de acesso
- [ ] PortFast e BPDU Guard configurados
- [ ] Passwords configurados e encriptados

### Roteamento
- [ ] `show ip route` mostra todas as rotas
- [ ] `show ip eigrp neighbors` mostra vizinhos
- [ ] Autenticação de protocolos funciona

## Comandos de Teste Final
```bash
# Verificar conectividade completa
ping 192.168.10.254    # Gateway VLAN 10
ping 192.168.20.254    # Gateway VLAN 20
ping 192.168.30.254    # Gateway VLAN 30

# Verificar redundância
show standby brief
show etherchannel summary
show spanning-tree root

# Verificar segurança
show port-security
show vtp status
```