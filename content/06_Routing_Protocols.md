# 06 - Routing Protocols

## RIP (Routing Information Protocol)

### Characteristics
- Distance vector protocol
- Metric: hop count (maximum 15 hops)
- Updates every 30 seconds
- RIPv1: broadcast, RIPv2: multicast (224.0.0.9)

### Configuration
```bash
router rip
version 2
network [network_1]
network [network_2]
no auto-summary
passive-interface [LAN_interface]
default-information originate       # Propagate default route
```

### Simulate Internet Connection
```bash
interface loopback0
ip address [fictional_ip] [mask]
ip route 0.0.0.0 0.0.0.0 loopback0
```

## OSPF (Open Shortest Path First)

### Characteristics
- Link state protocol
- Metric: cost (based on bandwidth)
- Updates only when changes occur
- Support for hierarchical areas

### Single Area Configuration
```bash
router ospf [process_id]
router-id [unique_id]               # Ex: 1.1.1.1
network [network] [wildcard_mask] area 0
passive-interface [LAN_interface]
default-information originate
```

### Multi-Area Configuration
```bash
router ospf 1
router-id 1.1.1.1
network 192.168.1.0 0.0.0.255 area 1
network 10.0.0.0 0.0.0.3 area 0
```

### Interface Configuration
```bash
interface [interface]
ip ospf cost [value]
bandwidth [value_in_kbps]
```

### OSPF Authentication
```bash
# On interface
interface [interface]
ip ospf message-digest-key 1 md5 7 [password]

# In OSPF process
router ospf [process]
area [area] authentication message-digest
```

### Verification Commands
```bash
show ip ospf neighbor
show ip ospf database
show ip ospf interface
show ip route ospf
show ip ospf [process]
```

## EIGRP (Enhanced Interior Gateway Routing Protocol)

### Characteristics
- Cisco hybrid protocol
- Metric: bandwidth, delay, reliability, load, MTU
- Incremental updates
- Fast convergence

### Terminology
- **Feasible Distance (FD)**: Best distance to destination
- **Reported Distance (RD)**: Distance advertised by neighbor
- **Successor**: Best route (lowest FD)
- **Feasible Successor**: Backup route

### Configuration
```bash
router eigrp [AS_number]
network [network] [wildcard_mask]
no auto-summary
passive-interface [LAN_interface]
```

### Static Route Redistribution
```bash
# Create loopback to simulate external network
interface loopback0
ip address [ip] [mask]

# Redistribute in EIGRP
router eigrp [AS]
redistribute static metric [BW] [delay] [reliability] [load] [MTU]
# Example: redistribute static metric 1544 20000 255 1 1500
```

### EIGRP Authentication
```bash
# Create key chain
key chain [key_name]
key 1
key-string [password]

# Apply on interface
interface [interface]
ip authentication mode eigrp [AS] md5
ip authentication key-chain eigrp [AS] [key_name]
```

### Verification Commands
```bash
show ip eigrp topology
show ip eigrp neighbor
show ip route eigrp
debug eigrp packets
```

## Redistribution Between Protocols

### On Central Router
```bash
# RIP
router rip
redistribute ospf [process] metric 1
redistribute eigrp [AS] metric 1

# OSPF  
router ospf 1
redistribute rip subnets
redistribute eigrp [AS] subnets

# EIGRP
router eigrp [AS]
redistribute ospf [process] metric 1544 20000 255 1 1500
redistribute rip metric 1544 20000 255 1 1500
```

### Wildcard Mask Calculation
Wildcard = 255.255.255.255 - Network Mask
- Example: Network 192.168.1.0/24
- Mask: 255.255.255.0  
- Wildcard: 0.0.0.255