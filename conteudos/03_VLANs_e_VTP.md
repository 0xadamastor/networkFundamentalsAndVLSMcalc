# 03 - VLANs e VTP

## VLANs (Virtual Local Area Networks)

### Conceitos
- Permite separar redes físicas em grupos lógicos
- Configuradas em switches de camada 2/3
- Equipamento recomendado: Cisco Catalyst 2960

### Modos de Porta
- **Access**: Porta para dispositivos finais (passa apenas uma VLAN)
- **Trunk**: Porta entre switches ou switch-router (passa múltiplas VLANs)

### Configuração de VLANs

#### Criar VLAN
```bash
vlan [vlan_id]
name [vlan_name]
```

#### Configurar Porta Access
```bash
interface [interface]
switchport mode access
switchport access vlan [id]
no shutdown
```

#### Configurar Porta Trunk
```bash
interface [interface]
switchport mode trunk
switchport trunk allowed vlan [id,id,id]  # Opcional: especificar VLANs
no shutdown
```

### Router-on-a-Stick (Inter-VLAN Routing)
```bash
# Interface principal
interface g0/0
no ip address
no shutdown

# Sub-interfaces para cada VLAN
interface g0/0.10
encapsulation dot1q 10
ip address 192.168.10.1 255.255.255.0

interface g0/0.20
encapsulation dot1q 20
ip address 192.168.20.1 255.255.255.0
```

## VTP (VLAN Trunking Protocol)

### Conceitos
- Protocolo Cisco proprietário
- Sincroniza configurações de VLAN entre switches
- Reduz configuração manual

### Modos VTP
- **Server**: Cria, modifica e elimina VLANs; propaga alterações
- **Client**: Recebe e aplica configurações VTP; não pode modificar VLANs
- **Transparent**: Não participa no VTP; reencaminha mensagens VTP

### Configuração VTP

#### Switch Server
```bash
vtp domain [nome_dominio]
vtp mode server
vtp password [password]

# Criar VLANs (só no servidor)
vlan 10
name Marketing
vlan 20
name Developers
```

#### Switch Client
```bash
vtp domain [nome_dominio]
vtp mode client
vtp password [password]
```

### Configuração de Trunks
```bash
# Em todas as ligações entre switches
interface [interface]
switchport mode trunk
```

### Comandos de Verificação
```bash
show vtp status
show vlan brief
show interfaces trunk
```