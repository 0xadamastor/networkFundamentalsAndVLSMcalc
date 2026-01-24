# 04 - Spanning Tree Protocol (STP)

## Fundamental Concepts

### Loop Problem
- Redundancy can cause switching loops
- Excessive packets on the network
- TTL/Hop Limit only works on layer 3 (routers)

### Spanning Tree Protocol
- Active by default on Cisco switches
- Prevents loops in switched networks (layer 2)
- Uses STA (Spanning Tree Algorithm)

## STA Algorithm

### 1. Root Bridge Election
- **Bridge ID** = Priority + MAC Address
- Lowest Bridge ID becomes Root Bridge
- Default priority value: 32768

### 2. Root Port Election
- Each switch (except Root Bridge) has ONE Root Port
- Criteria: lowest cost to Root Bridge
- **Root Path Cost** = sum of individual costs to Root Bridge

### 3. Designated Port Election
- One per network segment
- Port with lowest cost to Root Bridge on that segment
- Root Bridge has all ports as Designated

### 4. Blocked Ports
- Ports that are neither Root nor Designated
- Do not pass traffic (prevent loops)

## Port States

### Classic STP
1. **Blocking** - Does not pass traffic
2. **Listening** - Listens to BPDUs
3. **Learning** - Learns MACs, doesn't forward
4. **Forwarding** - Passes traffic normally
5. **Disabled** - Port disabled

### RSTP (Rapid Spanning Tree)
1. **Discarding** - Equivalent to Blocking + Listening + Disabled
2. **Learning** - Learns MACs
3. **Forwarding** - Passes traffic

## Optimizations

### PortFast
- For access ports (end devices)
- Goes immediately to Forwarding
- **WARNING**: Only use on access ports!

```bash
# On a specific interface
interface fa0/1
switchport mode access
spanning-tree portfast

# Enable by default on all access ports
spanning-tree portfast default
```

### BPDU Guard
- Protects PortFast ports
- If receives BPDU, puts port in error state
- Prevents Root Bridge attacks

```bash
# On a specific interface
interface fa0/1
spanning-tree bpduguard enable

# Enable by default
spanning-tree bpduguard default
```

## Verification Commands
```bash
show spanning-tree                      # STP overview
show spanning-tree interface [int] detail
show spanning-tree summary
show spanning-tree root
```

## Advanced Configuration
```bash
# Change priority (to force Root Bridge)
spanning-tree vlan [vlan-id] priority [value]

# Change port cost
interface [interface]
spanning-tree cost [value]
```