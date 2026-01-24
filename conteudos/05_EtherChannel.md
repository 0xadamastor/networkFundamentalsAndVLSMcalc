# 05 - EtherChannel

## Conceitos
- **Link Aggregation**: Agrupa ligações físicas numa ligação lógica
- Aumenta largura de banda e redundância
- 2 ou mais ligações físicas = 1 ligação lógica

## Requisitos e Restrições
- Interfaces do mesmo tipo (não misturar FastEthernet com Gigabit)
- Largura de banda: 800 Mbps (FastEthernet), 9-10 Gbps (Gigabit)
- Máximo 6 EtherChannels por switch
- Ligações devem estar em modo trunk
- Mesma velocidade e configuração em ambos os lados

## Protocolos

### PAgP (Port Aggregation Protocol)
- **Proprietário Cisco**
- **Modos:**
  - `ON` - Não negocia, força agregação
  - `AUTO` - Passivo, não toma iniciativa
  - `DESIRABLE` - Ativo, toma iniciativa (envia pedidos de 30 em 30s)
- **Combinação ideal**: um em DESIRABLE, outro em AUTO

### LACP (Link Aggregation Control Protocol)
- **Padrão IEEE 802.3ad (open source)**
- **Modos:**
  - `ON` - Não negocia, força agregação
  - `PASSIVE` - Passivo, não toma iniciativa
  - `ACTIVE` - Ativo, toma iniciativa (envia pedidos de 30 em 30s)
- **Combinação ideal**: um em ACTIVE, outro em PASSIVE

## Configuração

### Configuração LACP
```bash
# Switch A
interface range g0/1-2
channel-group 1 mode active
switchport mode trunk

# Switch B
interface range g0/1-2
channel-group 1 mode passive
switchport mode trunk
```

### Configuração PAgP
```bash
# Switch A
interface range g0/3-4
channel-group 2 mode desirable
switchport mode trunk

# Switch B
interface range g0/3-4
channel-group 2 mode auto
switchport mode trunk
```

### Configuração do Port-Channel
```bash
# Configurar a interface lógica
interface port-channel 1
switchport mode trunk
switchport trunk allowed vlan [lista_vlans]
no shutdown
```

## Procedimento Completo
1. Seleccionar interfaces em range
2. Configurar como trunk
3. Desativar interfaces (shutdown)
4. Configurar channel-group com modo apropriado
5. Configurar interface port-channel
6. Ativar interfaces (no shutdown)
7. Repetir configuração no switch parceiro

## Comandos de Verificação
```bash
show etherchannel summary          # Resumo de todos os EtherChannels
show etherchannel detail
show interfaces port-channel 1     # Detalhes de um Port-Channel específico
show etherchannel load-balance     # Método de balanceamento de carga
```

## Métodos de Balanceamento
```bash
# Configurar método de balanceamento (global)
port-channel load-balance [método]

# Métodos disponíveis:
# src-mac, dst-mac, src-dst-mac
# src-ip, dst-ip, src-dst-ip  
# src-port, dst-port, src-dst-port
```