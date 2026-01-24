# 09 - Verification and Troubleshooting Commands

## Basic Status Commands

### General Equipment Information
```bash
show version                       # IOS version, hardware, uptime
show clock                         # Current date and time
show users                         # Connected users
show history                       # Command history
show running-config                # Active configuration
show startup-config                # Saved configuration
```

### Interface Status
```bash
show interfaces                    # All interfaces
show interfaces [interface]        # Specific interface
show interfaces status             # Interface status summary
show interfaces trunk              # Trunk information
show interfaces switchport         # Switchport information
```

### Network Connectivity
```bash
ping [ip]                         # ICMP connectivity test
traceroute [ip]                   # Route tracing
telnet [ip]                       # Telnet connection
ssh [ip]                          # SSH connection (if configured)
```

## Routing Commands

### Routing Table
```bash
show ip route                     # Complete table
show ip route [network]           # Specific route
show ip route connected           # Directly connected routes
show ip route static              # Static routes
show ip route ospf                # OSPF routes
show ip route eigrp               # EIGRP routes
show ip route rip                 # RIP routes
```

### Routing Protocols
```bash
# OSPF
show ip ospf                      # General OSPF information
show ip ospf neighbor             # OSPF neighbors
show ip ospf database             # OSPF database
show ip ospf interface            # OSPF interfaces

# EIGRP
show ip eigrp neighbors           # EIGRP neighbors
show ip eigrp topology            # Topology table
show ip eigrp interfaces          # EIGRP interfaces

# RIP
show ip rip database              # RIP database
```

## Switching Commands

### VLANs
```bash
show vlan brief                   # VLAN summary
show vlan                         # Detailed VLAN information
show interfaces vlan [id]         # Specific VLAN interface
```

### VTP
```bash
show vtp status                   # VTP status
show vtp counters                 # VTP counters
```

### Spanning Tree
```bash
show spanning-tree                  # STP overview
show spanning-tree root             # Root bridge information
show spanning-tree interface [int]  # STP on interface
show spanning-tree summary          # STP summary
```

### EtherChannel
```bash
show etherchannel summary       # EtherChannel summary
show etherchannel detail        # Detailed information
show etherchannel load-balance  # Load balancing method
```

## Security Commands

### Port Security
```bash
show port-security                  # General port security status
show port-security address          # Learned MAC addresses
show port-security interface [int]  # Port security on interface
```

### DHCP Snooping
```bash
show ip dhcp snooping          # DHCP snooping status
show ip dhcp snooping binding  # Binding table
```

### HSRP
```bash
show standby                   # HSRP status
show standby brief             # HSRP summary
show standby [group]           # Specific group
```

## Debug Commands

### Enable/Disable Debug
```bash
debug [protocol/feature]      # Enable debug
undebug all                   # Disable all debugs
no debug all                  # Alternative to disable
```

### Specific Debugs
```bash
debug eigrp packets          # EIGRP packets
debug ip ospf events         # OSPF events
debug spanning-tree events   # STP events
debug standby events         # HSRP events
```

## Monitoring Commands

### MAC Tables
```bash
show mac address-table                  # Complete MAC table
show mac address-table dynamic          # Dynamically learned addresses
show mac address-table interface [int]  # MACs on interface
```

### ARP
```bash
show arp                      # ARP table (routers)
show ip arp                   # Alternative for ARP table
```

### CDP (Cisco Discovery Protocol)
```bash
show cdp neighbors            # CDP neighbors
show cdp neighbors detail     # Detailed neighbor information
show cdp interface            # CDP interfaces
```

## System Commands

### Logs and Messages
```bash
show log                      # System logs
show logging                  # Logging configuration
terminal monitor              # Enable console messages
```

### CPU and Memory
```bash
show processes cpu           # CPU utilization
show memory                  # Memory utilization
show flash                   # Flash contents
```

### Line Configurations
```bash
show line                    # Line status (console, vty)
show sessions                # Active sessions
```