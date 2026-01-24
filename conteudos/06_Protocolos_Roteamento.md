# 06 - Protocolos de Roteamento

## RIP (Routing Information Protocol)

### Características
- Protocolo de vector distância
- Métrica: hop count (máximo 15 hops)
- Atualizações de 30 em 30 segundos
- RIPv1: broadcast, RIPv2: multicast (224.0.0.9)

### Configuração
```bash
router rip
version 2
network [rede_1]
network [rede_2]
no auto-summary
passive-interface [interface_LAN]
default-information originate       # Propagar rota padrão
```

### Simular Ligação à Internet
```bash
interface loopback0
ip address [ip_ficticio] [máscara]
ip route 0.0.0.0 0.0.0.0 loopback0
```

## OSPF (Open Shortest Path First)

### Características
- Protocolo de estado de ligação
- Métrica: custo (baseado na largura de banda)
- Atualizações apenas quando há alterações
- Suporte para áreas hierárquicas

### Configuração Single Area
```bash
router ospf [processo_id]
router-id [id_unico]               # Ex: 1.1.1.1
network [rede] [wildcard_mask] area 0
passive-interface [interface_LAN]
default-information originate
```

### Configuração Multi-Área
```bash
router ospf 1
router-id 1.1.1.1
network 192.168.1.0 0.0.0.255 area 1
network 10.0.0.0 0.0.0.3 area 0
```

### Configuração de Interface
```bash
interface [interface]
ip ospf cost [valor]
bandwidth [valor_em_kbps]
```

### Autenticação OSPF
```bash
# Na interface
interface [interface]
ip ospf message-digest-key 1 md5 7 [password]

# No processo OSPF
router ospf [processo]
area [area] authentication message-digest
```

### Comandos de Verificação
```bash
show ip ospf neighbor
show ip ospf database
show ip ospf interface
show ip route ospf
show ip ospf [processo]
```

## EIGRP (Enhanced Interior Gateway Routing Protocol)

### Características
- Protocolo híbrido Cisco
- Métrica: largura de banda, delay, reliability, load, MTU
- Atualizações incrementais
- Convergência rápida

### Terminologia
- **Feasible Distance (FD)**: Melhor distância até ao destino
- **Reported Distance (RD)**: Distância anunciada pelo vizinho
- **Successor**: Melhor rota (menor FD)
- **Feasible Successor**: Rota de backup

### Configuração
```bash
router eigrp [AS_number]
network [rede] [wildcard_mask]
no auto-summary
passive-interface [interface_LAN]
```

### Redistribuição de Rota Estática
```bash
# Criar loopback para simular rede externa
interface loopback0
ip address [ip] [máscara]

# Redistribuir no EIGRP
router eigrp [AS]
redistribute static metric [BW] [delay] [reliability] [load] [MTU]
# Exemplo: redistribute static metric 1544 20000 255 1 1500
```

### Autenticação EIGRP
```bash
# Criar cadeia de chaves
key chain [nome_chave]
key 1
key-string [password]

# Aplicar na interface
interface [interface]
ip authentication mode eigrp [AS] md5
ip authentication key-chain eigrp [AS] [nome_chave]
```

### Comandos de Verificação
```bash
show ip eigrp topology
show ip eigrp neighbor
show ip route eigrp
debug eigrp packets
```

## Redistribuição entre Protocolos

### No Router Central
```bash
# RIP
router rip
redistribute ospf [processo] metric 1
redistribute eigrp [AS] metric 1

# OSPF  
router ospf 1
redistribute rip subnets
redistribute eigrp [AS] subnets

# EIGRP
router eigrp [AS]
redistribute ospf [processo] metric 1544 20000 255 1 1500
redistribute rip metric 1544 20000 255 1 1500
```

### Cálculo de Wildcard Mask
Wildcard = 255.255.255.255 - Máscara de Rede
- Exemplo: Rede 192.168.1.0/24
- Máscara: 255.255.255.0  
- Wildcard: 0.0.0.255