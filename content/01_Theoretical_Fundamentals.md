# 01 - Network Theoretical Fundamentals

## OSI Model

### Layer 1 - Physical
- Transforms electrical pulses into bits
- Equipment: cables, hubs, repeaters

### Layer 2 - Data Link
- Receives and assembles bits transforming them into frames
- Equipment: switches and network cards
- Works with MAC addresses

### Layer 3 - Network
- Equipment: routers
- Association of logical address to physical (IP to MAC)
- Packet forwarding

### Layer 4 - Transport
- Protocols: UDP and TCP
- Guarantees data transport (without losses or duplications)
- Divides messages into smaller segments

#### UDP vs TCP
**UDP:**
- Faster, but doesn't control flow
- Doesn't guarantee data delivery
- Doesn't establish pre-agreement
- If a segment is lost, it doesn't recover it

**TCP:**
- Slower, controls flow
- Guarantees data delivery
- Establishes pre-agreement through 3 messages (Three-way handshake)
  - SYN → SYN+ACK → ACK

### Layer 5 - Session
- Establishes, manages, maintains and terminates connections

### Layer 6 - Presentation
- Converts data to universal format
- Data encryption and compression
- SSL/HTTPS implementation

### Layer 7 - Application
- Interface between network communication processes and user applications

## LAN Security Concepts

### Endpoint Protection
- **Cisco ESA (Email Security Appliance)**
  - Email monitoring
  - Threat verification
  - Cisco Talos database
  - Email encryption


- **Cisco WSA (Web Security Appliance)**
  - Web threat mitigation
  - Inbound/outbound traffic control
  - Website blacklisting
  - Traffic reporting

### AAA (Authentication, Authorization, Accounting)
- **Authentication**: Who is the user
- **Authorization**: What they can do after login
- **Accounting**: Usage data collection

### Layer 2 Vulnerabilities
- **MAC Table Attacks**


- **VLAN Attacks**
  - VLAN Hopping
  - VLAN Double Tagging


- **DHCP Attacks**
  - DHCP Starvation (denial of service)
  - DHCP Spoofing


- **ARP Attacks**
  - ARP Spoofing
  - ARP Poisoning


- **Address Spoofing Attacks**
  - MAC address spoofing