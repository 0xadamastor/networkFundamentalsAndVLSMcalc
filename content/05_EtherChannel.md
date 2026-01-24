# 05 - EtherChannel

## Concepts
- **Link Aggregation**: Groups physical connections into one logical connection
- Increases bandwidth and redundancy
- 2 or more physical connections = 1 logical connection

## Requirements and Restrictions
- Same interface type (don't mix FastEthernet with Gigabit)
- Bandwidth: 800 Mbps (FastEthernet), 9-10 Gbps (Gigabit)
- Maximum 6 EtherChannels per switch
- Connections must be in trunk mode
- Same speed and configuration on both sides

## Protocols

### PAgP (Port Aggregation Protocol)
- **Cisco Proprietary**
- **Modes:**
  - `ON` - Doesn't negotiate, forces aggregation
  - `AUTO` - Passive, doesn't take initiative
  - `DESIRABLE` - Active, takes initiative (sends requests every 30s)
- **Ideal combination**: one in DESIRABLE, other in AUTO

### LACP (Link Aggregation Control Protocol)
- **IEEE 802.3ad standard (open source)**
- **Modes:**
  - `ON` - Doesn't negotiate, forces aggregation
  - `PASSIVE` - Passive, doesn't take initiative
  - `ACTIVE` - Active, takes initiative (sends requests every 30s)
- **Ideal combination**: one in ACTIVE, other in PASSIVE

## Configuration

### LACP Configuration
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

### PAgP Configuration
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

### Port-Channel Configuration
```bash
# Configure logical interface
interface port-channel 1
switchport mode trunk
switchport trunk allowed vlan [vlan_list]
no shutdown
```

## Complete Procedure
1. Select interfaces in range
2. Configure as trunk
3. Disable interfaces (shutdown)
4. Configure channel-group with appropriate mode
5. Configure port-channel interface
6. Enable interfaces (no shutdown)
7. Repeat configuration on partner switch

## Verification Commands
```bash
show etherchannel summary          # Summary of all EtherChannels
show etherchannel detail
show interfaces port-channel 1     # Details of specific Port-Channel
show etherchannel load-balance     # Load balancing method
```

## Load Balancing Methods
```bash
# Configure load balancing method (global)
port-channel load-balance [method]

# Available methods:
# src-mac, dst-mac, src-dst-mac
# src-ip, dst-ip, src-dst-ip  
# src-port, dst-port, src-dst-port
```