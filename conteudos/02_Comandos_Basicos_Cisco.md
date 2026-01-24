# 02 - Comandos Básicos Cisco

## Modos de Configuração

### Hierarquia dos Modos
```
Modo Executivo: [router]>
↓ enable
Modo Privilegiado: [router]#
↓ configure terminal  
Modo Configuração Global: [router](config)#
↓ interface [interface] / line console 0
Modo Configuração Específico: [router](config-if)# ou [router](config-line)#
```

### Comandos de Navegação
- `exit` - Retroceder um modo
- `end` - Voltar ao modo privilegiado
- `ctrl+shift+6` - Parar pesquisa/comando

## Configuração Inicial

### Definições Básicas
```bash
hostname [nome]                         # Alterar nome do equipamento
banner motd # [mensagem] #              # Mensagem de banner
service password-encryption             # Encriptar passwords
write                                   # Guardar configurações
no ip domain-lookup                     # Desativar pesquisa DNS
```

### Configuração de Passwords
```bash
# Password para modo executivo
line console 0
password [password]
login

# Password para modo privilegiado
enable secret [password]

# Configurar Telnet
line vty 0 4
password [password]
login
```

## Configuração de Interfaces

### Router
```bash
interface [interface]
ip address [ip] [máscara]
no shutdown
```

### Switch - IP de Gestão
```bash
interface vlan 1
ip address [ip] [máscara]
no shutdown

# Gateway padrão
ip default-gateway [ip]
```

## Comandos de Verificação
```bash
show running-config                    # Configuração ativa
show ip route                          # Tabela de roteamento
show interfaces                        # Estado das interfaces
telnet [ip]                            # Ligação via Telnet
```