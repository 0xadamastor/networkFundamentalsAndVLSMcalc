# 03 - VLANs and VTP

## VLANs (Virtual Local Area Networks)

### Concepts
- Allows separating physical networks into logical groups
- Configured on layer 2/3 switches
- Recommended equipment: Cisco Catalyst 2960

### Port Modes
- **Access**: Port for end devices (passes only one VLAN)
- **Trunk**: Port between switches or switch-router (passes multiple VLANs)

### VLAN Configuration

#### Create VLAN
```bash
vlan [vlan_id]
name [vlan_name]
```

#### Configure Access Port
```bash
interface [interface]
switchport mode access
switchport access vlan [id]
no shutdown
```

#### Configure Trunk Port
```bash
interface [interface]
switchport mode trunk
switchport trunk allowed vlan [id,id,id]  # Optional: specify VLANs
no shutdown
```

### Router-on-a-Stick (Inter-VLAN Routing)
```bash
# Main interface
interface g0/0
no ip address
no shutdown

# Sub-interfaces for each VLAN
interface g0/0.10
encapsulation dot1q 10
ip address 192.168.10.1 255.255.255.0

interface g0/0.20
encapsulation dot1q 20
ip address 192.168.20.1 255.255.255.0
```

## VTP (VLAN Trunking Protocol)

### Concepts
- Cisco proprietary protocol
- Synchronizes VLAN configurations between switches
- Reduces manual configuration

### VTP Modes
- **Server**: Creates, modifies and deletes VLANs; propagates changes
- **Client**: Receives and applies VTP configurations; cannot modify VLANs
- **Transparent**: Doesn't participate in VTP; forwards VTP messages

### VTP Configuration

#### Server Switch
```bash
vtp domain [domain_name]
vtp mode server
vtp password [password]

# Create VLANs (server only)
vlan 10
name Marketing
vlan 20
name Developers
```

#### Client Switch
```bash
vtp domain [domain_name]
vtp mode client
vtp password [password]
```

### Trunk Configuration
```bash
# On all inter-switch connections
interface [interface]
switchport mode trunk
```

### Verification Commands
```bash
show vtp status
show vlan brief
show interfaces trunk
```