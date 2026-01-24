# 08 - Port Security e Segurança de Switches

## Port Security

### Conceitos
- Controla acesso às portas do switch
- Limita número de endereços MAC por porta
- Previne acesso não autorizado
- Aplicado apenas a portas de acesso (não trunk)

### Configuração Básica
```bash
# Configurar porta como acesso
interface fa0/1
switchport mode access

# Ativar port security
switchport port-security

# Definir número máximo de MACs (padrão: 1)
switchport port-security maximum [número]

# Definir ação em caso de violação
switchport port-security violation [shutdown|restrict|protect]

# Método de aprendizagem de MACs
switchport port-security mac-address [MAC]              # Manual
switchport port-security mac-address sticky             # Automático
```

### Tipos de Violação
- **Shutdown**: Desativa porta (padrão) - erro-desabilitado
- **Restrict**: Descarta pacotes, mantém contador
- **Protect**: Descarta pacotes silenciosamente

### Métodos de Aprendizagem
- **Manual**: Configurar MAC addresses manualmente
- **Dinâmico**: Switch aprende automaticamente (perdido no reinício)
- **Sticky**: Switch aprende e guarda na configuração

### Exemplo Completo
```bash
interface fa0/1
switchport mode access
switchport access vlan 10
switchport port-security
switchport port-security maximum 2
switchport port-security violation shutdown
switchport port-security mac-address sticky
switchport port-security aging time 30         # Aging em minutos
no shutdown
```

## Recuperação de Portas em Erro
```bash
# Ver portas em erro
show interfaces status err-disabled

# Reativar porta manualmente
interface fa0/1
shutdown
no shutdown

# Recuperação automática (global)
errdisable recovery cause psecure-violation
errdisable recovery interval [segundos]
```

## DHCP Snooping

### Conceitos
- Protege contra ataques DHCP (DHCP spoofing/starvation)
- Cria tabela de bindings (IP-MAC-Porta-VLAN)
- Distingue portas trusted/untrusted

### Configuração
```bash
# Ativar DHCP snooping globalmente
ip dhcp snooping

# Ativar para VLANs específicas
ip dhcp snooping vlan [vlan-list]

# Configurar portas trusted (ligações a servidores DHCP)
interface [interface]
ip dhcp snooping trust

# Limitar taxa de pedidos DHCP por porta
interface [interface]
ip dhcp snooping limit rate [pps]
```

## Dynamic ARP Inspection (DAI)

### Conceitos
- Protege contra ataques ARP spoofing/poisoning
- Valida pacotes ARP contra DHCP snooping binding table
- Funciona em conjunto com DHCP snooping

### Configuração
```bash
# Ativar DAI para VLANs
ip arp inspection vlan [vlan-list]

# Configurar portas trusted
interface [interface]
ip arp inspection trust

# Limitar taxa de pacotes ARP
interface [interface]
ip arp inspection limit rate [pps]
```

## Comandos de Verificação
```bash
# Port Security
show port-security
show port-security address
show port-security interface [interface]

# DHCP Snooping
show ip dhcp snooping
show ip dhcp snooping binding

# DAI
show ip arp inspection
show ip arp inspection interfaces
show ip arp inspection statistics
```

## 802.1X (Port-Based Network Access Control)

### Conceitos
- Autenticação baseada em utilizador/dispositivo
- Requer servidor RADIUS (AAA)
- Controla acesso à rede por porta

### Configuração Básica
```bash
# Ativar 802.1X globalmente
dot1x system-auth-control

# Configurar interface
interface fa0/1
switchport mode access
dot1x port-control auto
dot1x host-mode single-host      # ou multi-host/multi-domain
```

## Storm Control

### Conceitos
- Previne tempestades de broadcast/multicast/unicast
- Limita taxa de tráfego por tipo

### Configuração
```bash
interface [interface]
storm-control broadcast level [percentage]
storm-control multicast level [percentage]
storm-control unicast level [percentage]
storm-control action [shutdown|trap]
```