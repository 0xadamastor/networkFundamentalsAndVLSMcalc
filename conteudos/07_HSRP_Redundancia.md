# 07 - HSRP e Protocolos de Redundância

## Conceitos Fundamentais

### Protocolos de Primeira Ligação Redundante
- **HSRP** (Hot Standby Router Protocol) - Cisco proprietário
- **VRRP** (Virtual Router Redundancy Protocol) - Padrão aberto
- **GLBP** (Gateway Load Balancing Protocol) - Cisco proprietário

### Finalidade
- Agrupar routers como se fosse apenas um
- Gerar redundância na camada 3
- Routers partilham um IP address virtual
- Um router ativo, outros em standby

## HSRP (Hot Standby Router Protocol)

### Funcionamento
- Routers partilham IP virtual (VIP)
- Um router é Active, outros são Standby
- Se Active falhar, Standby assume automaticamente
- Dispositivos usam VIP como gateway padrão

### Timers
- **Hello Timer**: 3 segundos (padrão)
- **Hold Timer**: 10 segundos (padrão, deve ser 3x o hello)

### Eleição do Router Ativo
1. **Prioridade**: 0-255 (padrão: 100, maior valor ganha)
2. **IP Address**: Em caso de empate, maior IP ganha

### Preempt
- Permite que router com maior prioridade reassuma papel de Active
- Refaz eleição quando router com prioridade superior se torna disponível

### Interface Tracking
- Monitoriza interfaces do router Active
- Se interface crítica falhar, força nova eleição

## Configuração HSRP

### Router Principal (Active)
```bash
interface g0/1
standby 1 ip 192.168.1.254           # IP virtual (VIP)
standby 1 priority 110               # Prioridade superior
standby 1 preempt                    # Permite reassumir papel Active
standby 1 track [interface]          # Monitorizar interface específica
```

### Router Secundário (Standby)
```bash
interface g0/1
standby 1 ip 192.168.1.254           # Mesmo VIP
standby 1 priority 100               # Prioridade inferior (padrão)
standby 1 preempt                    # Permite assumir se necessário
```

### Configurações Avançadas
```bash
# Alterar timers
standby 1 timers [hello] [hold]      # Ex: standby 1 timers 5 15

# Autenticação
standby 1 authentication text [password]
standby 1 authentication md5 key-string [password]

# Interface tracking
standby 1 track [interface] [decrement_value]
```

## Configuração de Dispositivos Finais
- **Gateway padrão**: IP virtual do HSRP (não IP real dos routers)
- Exemplo: Se VIP é 192.168.1.254, usar este como gateway

## Comandos de Verificação
```bash
show standby                         # Estado geral do HSRP
show standby brief                   # Resumo dos grupos HSRP
show standby [group]                 # Informações de grupo específico
debug standby events                 # Debug de eventos HSRP
```

## Estados HSRP
- **Initial**: Estado inicial
- **Learn**: A aprender configuração
- **Listen**: A ouvir outros routers
- **Speak**: A participar na eleição
- **Standby**: Router backup
- **Active**: Router principal

## Exemplo Prático Completo
```bash
# Router A (pretendido como Active)
interface gigabitethernet0/1
ip address 192.168.1.1 255.255.255.0
standby 1 ip 192.168.1.254
standby 1 priority 110
standby 1 preempt
standby 1 track gigabitethernet0/0 20
no shutdown

# Router B (Standby)
interface gigabitethernet0/1
ip address 192.168.1.2 255.255.255.0
standby 1 ip 192.168.1.254
standby 1 priority 90
standby 1 preempt
no shutdown

# Configuração nos PCs
# Gateway padrão: 192.168.1.254
```

## Vantagens do HSRP
- Transparência para dispositivos finais
- Failover automático
- Balanceamento possível com múltiplos grupos
- Monitorização de interfaces críticas