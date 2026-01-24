# 07 - HSRP and Redundancy Protocols

## Fundamental Concepts

### Redundant First Hop Protocols
- **HSRP** (Hot Standby Router Protocol) - Cisco proprietary
- **VRRP** (Virtual Router Redundancy Protocol) - Open standard
- **GLBP** (Gateway Load Balancing Protocol) - Cisco proprietary

### Purpose
- Group routers as if they were just one
- Generate redundancy at layer 3
- Routers share a virtual IP address
- One active router, others on standby

## HSRP (Hot Standby Router Protocol)

### Operation
- Routers share virtual IP (VIP)
- One router is Active, others are Standby
- If Active fails, Standby takes over automatically
- Devices use VIP as default gateway

### Timers
- **Hello Timer**: 3 seconds (default)
- **Hold Timer**: 10 seconds (default, should be 3x the hello)

### Active Router Election
1. **Priority**: 0-255 (default: 100, higher value wins)
2. **IP Address**: In case of tie, higher IP wins

### Preempt
- Allows router with higher priority to resume Active role
- Re-does election when router with higher priority becomes available

### Interface Tracking
- Monitors interfaces of Active router
- If critical interface fails, forces new election

## HSRP Configuration

### Primary Router (Active)
```bash
interface g0/1
standby 1 ip 192.168.1.254           # Virtual IP (VIP)
standby 1 priority 110               # Higher priority
standby 1 preempt                    # Allow resuming Active role
standby 1 track [interface]          # Monitor specific interface
```

### Secondary Router (Standby)
```bash
interface g0/1
standby 1 ip 192.168.1.254           # Same VIP
standby 1 priority 100               # Lower priority (default)
standby 1 preempt                    # Allow taking over if needed
```

### Advanced Configurations
```bash
# Change timers
standby 1 timers [hello] [hold]      # Ex: standby 1 timers 5 15

# Authentication
standby 1 authentication text [password]
standby 1 authentication md5 key-string [password]

# Interface tracking
standby 1 track [interface] [decrement_value]
```

## End Device Configuration
- **Default gateway**: HSRP virtual IP (not real router IPs)
- Example: If VIP is 192.168.1.254, use this as gateway

## Verification Commands
```bash
show standby                         # General HSRP status
show standby brief                   # HSRP group summary
show standby [group]                 # Specific group information
debug standby events                 # Debug HSRP events
```

## HSRP States
- **Initial**: Initial state
- **Learn**: Learning configuration
- **Listen**: Listening to other routers
- **Speak**: Participating in election
- **Standby**: Backup router
- **Active**: Primary router

## Complete Practical Example
```bash
# Router A (intended as Active)
interface gigabitethernet0/1
ip address 192.168.1.1 255.255.255.0
standby 1 ip 192.168.1.254
standby 1 priority 110
standby 1 preempt
standby 1 track gigabitethernet0/0 20
no shutdown

# Router B (Standby)
interface gigabitethernet0/1
ip address 192.168.1.2 255.255.255.0
standby 1 ip 192.168.1.254
standby 1 priority 90
standby 1 preempt
no shutdown

# PC Configuration
# Default gateway: 192.168.1.254
```

## HSRP Advantages
- Transparency for end devices
- Automatic failover
- Load balancing possible with multiple groups
- Critical interface monitoring