# 01 - Fundamentos Teóricos de Redes

## Modelo OSI

### Camada 1 - Física
- Transforma pulsos eléctricos em bits
- Equipamentos: cabos, hubs, repeaters

### Camada 2 - Dados (Data Link)
- Recebe e monta os bits transformando-os em frames
- Equipamentos: switches e placas de rede
- Trabalha com endereços MAC

### Camada 3 - Rede (Network)
- Equipamentos: routers/encaminhadores
- Associação de endereço lógico para físico (IP para MAC)
- Encaminhamento de pacotes

### Camada 4 - Transporte
- Protocolos: UDP e TCP
- Garante o transporte dos dados (sem perdas ou duplicações)
- Divide mensagens em segmentos mais pequenos

#### UDP vs TCP
**UDP:**
- Mais rápido, mas não controla fluxo
- Não garante que os dados foram entregues
- Não estabelece pré-acordo
- Se um segmento se perder, não o recupera

**TCP:**
- Mais lento, controla o fluxo
- Garante que os dados foram entregues
- Estabelece pré-acordo através de 3 mensagens (Three-way handshake)
  - SYN → SYN+ACK → ACK

### Camada 5 - Sessão
- Estabelece, gere, mantém e finaliza conexões

### Camada 6 - Apresentação
- Converte dados para formato universal
- Encriptação e compressão de dados
- Implementação de SSL/HTTPS

### Camada 7 - Aplicação
- Interface entre processos de comunicação de rede e aplicações do utilizador

## Conceitos de Segurança LAN

### Protecção de Endpoints
- **Cisco ESA (Email Security Appliance)**
  - Monitorização de emails
  - Verificação de ameaças
  - Base de dados Cisco Talos
  - Encriptação de emails


- **Cisco WSA (Web Security Appliance)**
  - Mitigação de ameaças web
  - Controlo de tráfego entrada/saída
  - Blacklist de websites
  - Relatórios de tráfego

### AAA (Authentication, Authorization, Accounting)
- **Autenticação**: Quem é o utilizador
- **Autorização**: O que pode fazer após login
- **Auditoria/Contabilização**: Recolha de dados de utilização

### Vulnerabilidades Camada 2
- **MAC Table Attacks**


- **VLAN Attacks**
  - VLAN Hopping
  - VLAN Double Tagging


- **DHCP Attacks**
  - DHCP Starvation (negação de serviço)
  - DHCP Spoofing


- **ARP Attacks**
  - Falsificação de ARP
  - Envenenamento de ARP


- **Address Spoofing Attacks**
  - Falsificação de endereço MAC