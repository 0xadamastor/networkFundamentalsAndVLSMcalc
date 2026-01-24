# 09 - Comandos de Verificação e Troubleshooting

## Comandos Básicos de Estado

### Informações Gerais do Equipamento
```bash
show version                       # Versão IOS, hardware, uptime
show clock                         # Data e hora atual
show users                         # Utilizadores ligados
show history                       # Histórico de comandos
show running-config                # Configuração ativa
show startup-config                # Configuração guardada
```

### Estado das Interfaces
```bash
show interfaces                    # Todas as interfaces
show interfaces [interface]        # Interface específica
show interfaces status             # Resumo do estado das interfaces
show interfaces trunk              # Informações de trunk
show interfaces switchport         # Informações de switchport
```

### Conectividade de Rede
```bash
ping [ip]                         # Teste de conectividade ICMP
traceroute [ip]                   # Rastreamento de rota
telnet [ip]                       # Ligação Telnet
ssh [ip]                          # Ligação SSH (se configurado)
```

## Comandos de Roteamento

### Tabela de Roteamento
```bash
show ip route                     # Tabela completa
show ip route [rede]              # Rota específica
show ip route connected           # Rotas diretamente conectadas
show ip route static              # Rotas estáticas
show ip route ospf                # Rotas OSPF
show ip route eigrp               # Rotas EIGRP
show ip route rip                 # Rotas RIP
```

### Protocolos de Roteamento
```bash
# OSPF
show ip ospf                      # Informações gerais OSPF
show ip ospf neighbor             # Vizinhos OSPF
show ip ospf database             # Base de dados OSPF
show ip ospf interface            # Interfaces OSPF

# EIGRP
show ip eigrp neighbors           # Vizinhos EIGRP
show ip eigrp topology            # Tabela topológica
show ip eigrp interfaces          # Interfaces EIGRP

# RIP
show ip rip database              # Base de dados RIP
```

## Comandos de Switching

### VLANs
```bash
show vlan brief                   # Resumo das VLANs
show vlan                         # Informações detalhadas das VLANs
show interfaces vlan [id]         # Interface VLAN específica
```

### VTP
```bash
show vtp status                  # Estado do VTP
show vtp counters                # Contadores VTP
```

### Spanning Tree
```bash
show spanning-tree                  # Visão geral STP
show spanning-tree root             # Informações do root bridge
show spanning-tree interface [int]  # STP numa interface
show spanning-tree summary          # Resumo do STP
```

### EtherChannel
```bash
show etherchannel summary       # Resumo EtherChannels
show etherchannel detail        # Informações detalhadas
show etherchannel load-balance  # Método de balanceamento
```

## Comandos de Segurança

### Port Security
```bash
show port-security                  # Estado geral port security
show port-security address          # Endereços MAC aprendidos
show port-security interface [int]  # Port security numa interface
```

### DHCP Snooping
```bash
show ip dhcp snooping          # Estado DHCP snooping
show ip dhcp snooping binding  # Tabela de bindings
```

### HSRP
```bash
show standby                   # Estado HSRP
show standby brief             # Resumo HSRP
show standby [group]           # Grupo específico
```

## Comandos de Debug

### Ativar/Desativar Debug
```bash
debug [protocolo/feature]      # Ativar debug
undebug all                    # Desativar todos os debugs
no debug all                   # Alternativa para desativar
```

### Debug Específicos
```bash
debug eigrp packets          # Pacotes EIGRP
debug ip ospf events         # Eventos OSPF
debug spanning-tree events   # Eventos STP
debug standby events         # Eventos HSRP
```

## Comandos de Monitorização

### Tabelas MAC
```bash
show mac address-table                  # Tabela completa MAC
show mac address-table dynamic          # Endereços aprendidos dinamicamente
show mac address-table interface [int]  # MACs numa interface
```

### ARP
```bash
show arp                      # Tabela ARP (routers)
show ip arp                   # Alternativa para tabela ARP
```

### CDN (Cisco Discovery Protocol)
```bash
show cdp neighbors            # Vizinhos CDP
show cdp neighbors detail     # Informações detalhadas dos vizinhos
show cdp interface            # Interfaces CDP
```

## Comandos de Sistema

### Logs e Mensagens
```bash
show log                      # Logs do sistema
show logging                  # Configuração de logging
terminal monitor              # Ativar mensagens na consola
```

### CPU e Memória
```bash
show processes cpu           # Utilização CPU
show memory                  # Utilização memória
show flash                   # Conteúdo da flash
```

### Configurações de Linha
```bash
show line                    # Estado das linhas (console, vty)
show sessions                # Sessões ativas
```