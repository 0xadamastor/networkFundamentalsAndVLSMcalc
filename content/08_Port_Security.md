# 08 - Port Security and Switch Security

## Port Security

### Concepts
- Controls access to switch ports
- Limits number of MAC addresses per port
- Prevents unauthorized access
- Applied only to access ports (not trunk)

### Basic Configuration
```bash
# Configure port as access
interface fa0/1
switchport mode access

# Enable port security
switchport port-security

# Define maximum number of MACs (default: 1)
switchport port-security maximum [number]

# Define action in case of violation
switchport port-security violation [shutdown|restrict|protect]

# MAC learning method
switchport port-security mac-address [MAC]              # Manual
switchport port-security mac-address sticky             # Automatic
```

### Violation Types
- **Shutdown**: Disables port (default) - err-disabled
- **Restrict**: Drops packets, maintains counter
- **Protect**: Drops packets silently

### Learning Methods
- **Manual**: Configure MAC addresses manually
- **Dynamic**: Switch learns automatically (lost on restart)
- **Sticky**: Switch learns and saves in configuration

### Complete Example
```bash
interface fa0/1
switchport mode access
switchport access vlan 10
switchport port-security
switchport port-security maximum 2
switchport port-security violation shutdown
switchport port-security mac-address sticky
switchport port-security aging time 30         # Aging in minutes
no shutdown
```

## Port Error Recovery
```bash
# View ports in error
show interfaces status err-disabled

# Reactivate port manually
interface fa0/1
shutdown
no shutdown

# Automatic recovery (global)
errdisable recovery cause psecure-violation
errdisable recovery interval [seconds]
```

## DHCP Snooping

### Concepts
- Protects against DHCP attacks (DHCP spoofing/starvation)
- Creates binding table (IP-MAC-Port-VLAN)
- Distinguishes trusted/untrusted ports

### Configuration
```bash
# Enable DHCP snooping globally
ip dhcp snooping

# Enable for specific VLANs
ip dhcp snooping vlan [vlan-list]

# Configure trusted ports (connections to DHCP servers)
interface [interface]
ip dhcp snooping trust

# Limit DHCP request rate per port
interface [interface]
ip dhcp snooping limit rate [pps]
```

## Dynamic ARP Inspection (DAI)

### Concepts
- Protects against ARP spoofing/poisoning attacks
- Validates ARP packets against DHCP snooping binding table
- Works together with DHCP snooping

### Configuration
```bash
# Enable DAI for VLANs
ip arp inspection vlan [vlan-list]

# Configure trusted ports
interface [interface]
ip arp inspection trust

# Limit ARP packet rate
interface [interface]
ip arp inspection limit rate [pps]
```

## Verification Commands
```bash
# Port Security
show port-security
show port-security address
show port-security interface [interface]

# DHCP Snooping
show ip dhcp snooping
show ip dhcp snooping binding

# DAI
show ip arp inspection
show ip arp inspection interfaces
show ip arp inspection statistics
```

## 802.1X (Port-Based Network Access Control)

### Concepts
- User/device-based authentication
- Requires RADIUS server (AAA)
- Controls network access per port

### Basic Configuration
```bash
# Enable 802.1X globally
dot1x system-auth-control

# Configure interface
interface fa0/1
switchport mode access
dot1x port-control auto
dot1x host-mode single-host      # or multi-host/multi-domain
```

## Storm Control

### Concepts
- Prevents broadcast/multicast/unicast storms
- Limits traffic rate by type

### Configuration
```bash
interface [interface]
storm-control broadcast level [percentage]
storm-control multicast level [percentage]
storm-control unicast level [percentage]
storm-control action [shutdown|trap]
```