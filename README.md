# NetworkFundamentals & VLSM Calculator

A comprehensive network documentation and VLSM calculator built with vanilla HTML, CSS, and JavaScript.

 **Demo Online:** [https://pingpongpackettracer.netlify.app/](https://pingpongpackettracer.netlify.app/)

---

## 𝗘𝗡 English

### Features

- **Network Documentation** - Complete guide covering networking fundamentals, Cisco commands, VLANs, VTP, Spanning Tree Protocol, EtherChannel, Routing Protocols, HSRP, Port Security, and more
- **VLSM Calculator** - Calculate subnet allocations with variable length subnet masking
- **Bilingual Support** - Full content available in English and Portuguese
- **Responsive Design** - Works on desktop and mobile devices
- **Terminal-style UI** - Clean, dark theme with monospace typography

> ⚠️ **Note:** This documentation assumes you already have basic networking knowledge. It does not cover the absolute basics (e.g., what is an IP address, what is a router, OSI model introduction). However, I plan to add beginner-friendly content in a future update.

### Topics Covered

1. Theoretical Fundamentals
2. Basic Cisco Commands
3. VLANs & VTP
4. Spanning Tree Protocol
5. EtherChannel
6. Routing Protocols
7. HSRP Redundancy
8. Port Security
9. Verification Commands
10. Example Scenario

### How to Run Locally

Since the project uses `fetch()` to load markdown files, you need to run it on a local server:

**Option 1: VS Code Live Server**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` → "Open with Live Server"

**Option 2: Node.js http-server**
```bash
npx http-server -p 8000
```
Then open http://localhost:8000

**Option 3: Python**
```bash
python -m http.server 8000
```
Then open http://localhost:8000

### Project Structure

```
├── index.html          # Main HTML file
├── style.css           # Styles
├── script.js           # JavaScript logic
├── assets/             # Images and icons
├── content/            # English markdown files
├── conteudos/          # Portuguese markdown files
└── raw/                # txt files that are now markdown
```

---

## 🇵🇹 Português

### Funcionalidades

- **Documentação de Redes** - Guia completo sobre fundamentos de redes, comandos Cisco, VLANs, VTP, Spanning Tree Protocol, EtherChannel, Protocolos de Roteamento, HSRP, Port Security, e mais
- **Calculadora VLSM** - Calcula alocações de sub-redes com máscara de comprimento variável
- **Suporte Bilingue** - Conteúdo completo disponível em Inglês e Português
- **Design Responsivo** - Funciona em desktop e dispositivos móveis
- **Interface estilo Terminal** - Tema escuro e limpo com tipografia monospace

> ⚠️ **Nota:** Esta documentação assume que já tens conhecimentos básicos de redes. Não cobre o básico do básico (ex: o que é um endereço IP, o que é um router, introdução ao modelo OSI). No entanto, planeio adicionar conteúdo para iniciantes numa futura atualização.

### Tópicos Abordados

1. Fundamentos Teóricos
2. Comandos Básicos Cisco
3. VLANs & VTP
4. Spanning Tree Protocol
5. EtherChannel
6. Protocolos de Roteamento
7. HSRP Redundância
8. Port Security
9. Comandos de Verificação
10. Cenário Exemplo

### Como Executar Localmente

Como o projeto usa `fetch()` para carregar ficheiros markdown, precisas de executar num servidor local:

**Opção 1: VS Code Live Server**
1. Instala a extensão "Live Server" no VS Code
2. Clica com o botão direito em `index.html` → "Open with Live Server"

**Opção 2: Node.js http-server**
```bash
npx http-server -p 8000
```
Depois abre http://localhost:8000

**Opção 3: Python**
```bash
python -m http.server 8000
```
Depois abre http://localhost:8000

### Estrutura do Projeto

```
├── index.html          # Ficheiro HTML principal
├── style.css           # Estilos
├── script.js           # Lógica JavaScript
├── assets/             # Imagens e ícones
├── content/            # Ficheiros markdown em Inglês
├── conteudos/          # Ficheiros markdown em Português
└── raw                 # txt que são agora markdown
```
---

## License

MIT License - feel free to use and modify.

## Author

**0xadamastor**
- Website: [https://0xadamastor.com](https://0xadamastor.com)
- GitHub: [https://github.com/0xadamastor](https://github.com/0xadamastor)
