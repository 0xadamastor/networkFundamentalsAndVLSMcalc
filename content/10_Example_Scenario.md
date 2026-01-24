# 10 - Practical Assessment Configurations

### Base Topology
- 1 Central router
- 3 Switches (1 central, 2 access)
- Multiple VLANs
- HSRP redundancy
- EtherChannel between switches
- Routing protocols (EIGRP/OSPF)

## Complete Configuration by Equipment

### Central Switch (VTP Server)
```bash
enable
configure terminal
hostname SWCENTRAL

# VTP Configuration
vtp domain istec.local
vtp mode server
vtp password cisco

# Create VLANs
vlan 10
name Marketing
vlan 20
name Developers
vlan 30
name Admin

# Configure trunks to access switches
interface range fa0/23-24
switchport mode trunk

# EtherChannel for redundancy (if applicable)
interface range g0/1-2
channel-group 1 mode active
switchport mode trunk

# Trunk to router
interface g0/1
switchport mode trunk

# STP optimizations
spanning-tree portfast default
spanning-tree bpduguard default
```

### Access Switches (VTP Client)
```bash
enable
configure terminal
hostname SWLEFT   # or SWRIGHT

# VTP Configuration
vtp domain istec.local
vtp mode client
vtp password cisco

# Configure access ports
interface fa0/1
switchport mode access
switchport access vlan 10
switchport port-security
switchport port-security maximum 1
switchport port-security violation shutdown
switchport port-security mac-address sticky
spanning-tree portfast
spanning-tree bpduguard enable

interface fa0/2
switchport mode access
switchport access vlan 20
# ... repeat port-security configuration

interface fa0/3
switchport mode access
switchport access vlan 30
# ... repeat port-security configuration

# Trunk to central switch
interface fa0/24
switchport mode trunk
```

### Router (Inter-VLAN + HSRP + Routing)
```bash
enable
configure terminal
hostname R1

# Basic security configuration
banner motd #RESTRICTED ACCESS#
enable secret cisco
service password-encryption
line console 0
password cisco
login
logging synchronous

# Inter-VLAN Routing (Router-on-a-Stick)
interface g0/0
no ip address
no shutdown

# Sub-interfaces for each VLAN
interface g0/0.10
encapsulation dot1q 10
ip address 192.168.10.1 255.255.255.0
standby 1 ip 192.168.10.254
standby 1 priority 110
standby 1 preempt

interface g0/0.20
encapsulation dot1q 20
ip address 192.168.20.1 255.255.255.0
standby 1 ip 192.168.20.254
standby 1 priority 110
standby 1 preempt

interface g0/0.30
encapsulation dot1q 30
ip address 192.168.30.1 255.255.255.240
standby 1 ip 192.168.30.254
standby 1 priority 110
standby 1 preempt

# WAN configuration (connection to other routers)
interface s0/0/0
ip address 10.0.0.1 255.255.255.252
no shutdown

# EIGRP
router eigrp 100
network 192.168.10.0 0.0.0.255
network 192.168.20.0 0.0.0.255
network 192.168.30.0 0.0.0.15
network 10.0.0.0 0.0.0.3
passive-interface g0/0.10
passive-interface g0/0.20
passive-interface g0/0.30
no auto-summary

# EIGRP Authentication
key chain EIGRP_KEYS
key 1
key-string securePassword123

interface s0/0/0
ip authentication mode eigrp 100 md5
ip authentication key-chain eigrp 100 EIGRP_KEYS
```

### Secondary Router (for HSRP)
```bash
enable
configure terminal
hostname R2

# Similar configurations to R1, but with lower HSRP priorities
interface g0/0.10
encapsulation dot1q 10
ip address 192.168.10.2 255.255.255.0
standby 1 ip 192.168.10.254
standby 1 priority 90
standby 1 preempt

# ... repeat for other VLANs with priority 90
```

## Assessment Verification Checklist

### Basic Connectivity
- [ ] Inter-VLAN ping works
- [ ] DHCP (if configured) assigns IPs correctly
- [ ] SSH/Telnet access works

### VLANs and Trunking
- [ ] `show vlan brief` shows correct VLANs
- [ ] `show interfaces trunk` shows active trunks
- [ ] VTP synchronizes VLANs between switches

### Redundancy
- [ ] `show spanning-tree` shows loop-free topology
- [ ] `show etherchannel summary` shows active EtherChannels
- [ ] `show standby` shows HSRP working

### Security
- [ ] Port security active on access ports
- [ ] PortFast and BPDU Guard configured
- [ ] Passwords configured and encrypted

### Routing
- [ ] `show ip route` shows all routes
- [ ] `show ip eigrp neighbors` shows neighbors
- [ ] Protocol authentication works

## Final Test Commands
```bash
# Verify complete connectivity
ping 192.168.10.254    # VLAN 10 Gateway
ping 192.168.20.254    # VLAN 20 Gateway
ping 192.168.30.254    # VLAN 30 Gateway

# Verify redundancy
show standby brief
show etherchannel summary
show spanning-tree root

# Verify security
show port-security
show vtp status
```