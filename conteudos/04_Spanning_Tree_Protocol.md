# 04 - Spanning Tree Protocol (STP)

## Conceitos Fundamentais

### Problema de Loops
- Redundância pode causar loops de comutação
- Excesso de pacotes na rede
- TTL/Hop Limit só funciona na camada 3 (routers)

### Spanning Tree Protocol
- Ativo por defeito em switches Cisco
- Evita loops em redes comutadas (camada 2)
- Utiliza algoritmo STA (Spanning Tree Algorithm)

## Algoritmo STA

### 1. Eleição do Root Bridge
- **Bridge ID** = Prioridade + MAC Address
- Menor Bridge ID torna-se Root Bridge
- Valor padrão da prioridade: 32768

### 2. Eleição das Root Ports
- Cada switch (excepto Root Bridge) tem UMA Root Port
- Critério: menor custo até ao Root Bridge
- **Root Path Cost** = soma dos custos individuais até ao Root Bridge

### 3. Eleição das Designated Ports
- Uma por segmento de rede
- Porta com menor custo até ao Root Bridge naquele segmento
- Root Bridge tem todas as portas como Designated

### 4. Blocked Ports
- Portas que não são Root nem Designated
- Não passam tráfego (previnem loops)

## Estados das Portas

### STP Clássico
1. **Blocking** - Não passa tráfego
2. **Listening** - Ouve BPDUs
3. **Learning** - Aprende MACs, não encaminha
4. **Forwarding** - Passa tráfego normalmente
5. **Disabled** - Porta desativada

### RSTP (Rapid Spanning Tree)
1. **Discarding** - Equivale a Blocking + Listening + Disabled
2. **Learning** - Aprende MACs
3. **Forwarding** - Passa tráfego

## Otimizações

### PortFast
- Para portas de acesso (dispositivos finais)
- Passa imediatamente para Forwarding
- **ATENÇÃO**: Só usar em portas de acesso!

```bash
# Numa interface específica
interface fa0/1
switchport mode access
spanning-tree portfast

# Ativar por defeito em todas as portas de acesso
spanning-tree portfast default
```

### BPDU Guard
- Protege portas PortFast
- Se receber BPDU, coloca porta em estado de erro
- Previne ataques de Root Bridge

```bash
# Numa interface específica
interface fa0/1
spanning-tree bpduguard enable

# Ativar por defeito
spanning-tree bpduguard default
```

## Comandos de Verificação
```bash
show spanning-tree                      # Visão geral do STP
show spanning-tree interface [int] detail
show spanning-tree summary
show spanning-tree root
```

## Configuração Avançada
```bash
# Alterar prioridade (para forçar Root Bridge)
spanning-tree vlan [vlan-id] priority [valor]

# Alterar custo de uma porta
interface [interface]
spanning-tree cost [valor]
```