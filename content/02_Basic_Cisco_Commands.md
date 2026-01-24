# 02 - Basic Cisco Commands

## Configuration Modes

### Mode Hierarchy
```
Executive Mode: [router]>
↓ enable
Privileged Mode: [router]#
↓ configure terminal  
Global Configuration Mode: [router](config)#
↓ interface [interface] / line console 0
Specific Configuration Mode: [router](config-if)# or [router](config-line)#
```

### Navigation Commands
- `exit` - Go back one mode
- `end` - Return to privileged mode
- `ctrl+shift+6` - Stop search/command

## Initial Configuration

### Basic Settings
```bash
hostname [name]                         # Change device name
banner motd # [message] #               # Banner message
service password-encryption             # Encrypt passwords
write                                   # Save configurations
no ip domain-lookup                     # Disable DNS lookup
```

### Password Configuration
```bash
# Password for executive mode
line console 0
password [password]
login

# Password for privileged mode
enable secret [password]

# Configure Telnet
line vty 0 4
password [password]
login
```

## Interface Configuration

### Router
```bash
interface [interface]
ip address [ip] [mask]
no shutdown
```

### Switch - Management IP
```bash
interface vlan 1
ip address [ip] [mask]
no shutdown

# Default gateway
ip default-gateway [ip]
```

## Verification Commands
```bash
show running-config                    # Active configuration
show ip route                          # Routing table
show interfaces                        # Interface status
telnet [ip]                            # Telnet connection
```