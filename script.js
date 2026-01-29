let currentLanguage = 'en';

function isValidIPv4(ip) {
    if (typeof ip !== 'string') return false;
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    return parts.every(part => {
        if (!/^\d+$/.test(part)) return false;
        const num = parseInt(part, 10);
        return num >= 0 && num <= 255;
    });
}

function sanitizeText(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isAllowedUrl(url) {
    if (typeof url !== 'string') return false;
    const trimmed = url.trim().toLowerCase();
    if (trimmed.startsWith('javascript:') || trimmed.startsWith('data:') || trimmed.startsWith('vbscript:')) {
        return false;
    }
    return true;
}

const markdownFiles = {
    'en': {
        fundamentos: 'content/01_Theoretical_Fundamentals.md',
        comandos: 'content/02_Basic_Cisco_Commands.md',
        vlans: 'content/03_VLANs_and_VTP.md',
        stp: 'content/04_Spanning_Tree_Protocol.md',
        etherchannel: 'content/05_EtherChannel.md',
        roteamento: 'content/06_Routing_Protocols.md',
        hsrp: 'content/07_HSRP_Redundancy.md',
        security: 'content/08_Port_Security.md',
        verificacao: 'content/09_Verification_Commands.md',
        exemplo: 'content/10_Example_Scenario.md'
    },
    'pt': {
        fundamentos: 'conteudos/01_Fundamentos_Teoricos.md',
        comandos: 'conteudos/02_Comandos_Basicos_Cisco.md',
        vlans: 'conteudos/03_VLANs_e_VTP.md',
        stp: 'conteudos/04_Spanning_Tree_Protocol.md',
        etherchannel: 'conteudos/05_EtherChannel.md',
        roteamento: 'conteudos/06_Protocolos_Roteamento.md',
        hsrp: 'conteudos/07_HSRP_Redundancia.md',
        security: 'conteudos/08_Port_Security.md',
        verificacao: 'conteudos/09_Comandos_Verificacao.md',
        exemplo: 'conteudos/10_Cenário_Exemplo.md'
    }
};

const interfaceTexts = {
    'en': {
        title: 'Network Notes',
        subtitle: 'network fundamentals, commands and configurations',
        navHeader: '> documentation',
        navItems: {
            home: '> home',
            fundamentos: '> fundamentals',
            comandos: '> basic commands',
            vlans: '> vlans & vtp',
            stp: '> spanning tree',
            etherchannel: '> etherchannel',
            roteamento: '> routing',
            hsrp: '> hsrp',
            security: '> port security',
            verificacao: '> verification',
            exemplo: '> example scenario'
        },
        footer: 'made by'
    },
    'pt': {
        title: 'Apontamentos de Redes',
        subtitle: 'fundamentos de rede, comandos e configurações',
        navHeader: '> documentação',
        navItems: {
            home: '> início',
            fundamentos: '> fundamentos',
            comandos: '> comandos básicos',
            vlans: '> vlans & vtp',
            stp: '> spanning tree',
            etherchannel: '> etherchannel',
            roteamento: '> roteamento',
            hsrp: '> hsrp',
            security: '> port security',
            verificacao: '> verificação',
            exemplo: '> cenário exemplo'
        },
        footer: 'made by'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    setupNavigation();
    setupMobileNavigation();
    setupLanguageToggle();
    setupVLSMCalculator();
    updateInterface();
    showSection('home');
});

function setupLanguageToggle() {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
        updateLanguageButton();
    }
}

function setupVLSMCalculator() {
    const vlsmBtn = document.getElementById('vlsm-calc-btn');
    const calculateBtn = document.getElementById('calculate-btn');
    const numSubnetsInput = document.getElementById('num-subnets');
    
    if (vlsmBtn) {
        vlsmBtn.addEventListener('click', function() {
            showVLSMCalculator();
            document.querySelectorAll('.nav a').forEach(link => {
                link.classList.remove('active');
            });
        });
    }
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateVLSM);
    }
    
    if (numSubnetsInput) {
        numSubnetsInput.addEventListener('input', generateHostInputs);
        generateHostInputs();
    }
}

function showVLSMCalculator() {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById('vlsm-calculator').classList.add('active');
}

function generateHostInputs() {
    let numSubnets = parseInt(document.getElementById('num-subnets').value) || 1;
    
    if (numSubnets > 256) {
        numSubnets = 256;
        document.getElementById('num-subnets').value = 256;
    }
    if (numSubnets < 1) {
        numSubnets = 1;
        document.getElementById('num-subnets').value = 1;
    }
    
    const hostList = document.getElementById('host-list');
    hostList.innerHTML = '';
    
    for (let i = 0; i < numSubnets; i++) {
        const hostInputGroup = document.createElement('div');
        hostInputGroup.className = 'host-input-group';
        
        const label = document.createElement('label');
        label.textContent = 'subnet ' + (i + 1) + ' hosts:';
        
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'form-input host-input';
        input.placeholder = '50';
        input.min = '1';
        input.max = '65534';
        
        hostInputGroup.appendChild(label);
        hostInputGroup.appendChild(input);
        hostList.appendChild(hostInputGroup);
    }
}

function calculateVLSM() {
    const networkIP = document.getElementById('network-ip').value.trim();
    const subnetMask = parseInt(document.getElementById('subnet-mask').value);
    const hostInputs = document.querySelectorAll('.host-input');
    
    if (!networkIP || !subnetMask) {
        alert('Please fill in network address and subnet mask');
        return;
    }
    
    if (!isValidIPv4(networkIP)) {
        alert('Invalid IPv4 address format');
        return;
    }
    
    if (subnetMask < 8 || subnetMask > 30 || isNaN(subnetMask)) {
        alert('Subnet mask must be between 8 and 30');
        return;
    }
    
    const hostRequirements = Array.from(hostInputs).map(input => parseInt(input.value) || 0);
    
    if (hostRequirements.some(h => h <= 0)) {
        alert('All host requirements must be greater than 0');
        return;
    }
    
    if (hostRequirements.some(h => h > 16777214)) {
        alert('Host requirement too large. Maximum: 16,777,214 hosts per subnet');
        return;
    }
    
    if (hostRequirements.length > 256) {
        alert('Too many subnets. Maximum: 256 subnets');
        return;
    }
    
    try {
        const subnets = calculateSubnets(networkIP, subnetMask, hostRequirements);
        displayResults(subnets);
    } catch (error) {
        alert('Error calculating subnets: ' + error.message);
    }
}

function calculateSubnets(networkIP, originalMask, hostRequirements) {
    function ipToNumber(ip) {
        return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
    }
    
    function numberToIP(num) {
        return [(num >>> 24), (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
    }
    
    function nextPowerOf2(n) {
        return Math.pow(2, Math.ceil(Math.log2(n + 2)));
    }
    
    const sortedRequirements = hostRequirements
        .map((hosts, index) => ({ hosts, index }))
        .sort((a, b) => b.hosts - a.hosts);
    
    const networkNumber = ipToNumber(networkIP);
    const subnets = [];
    let currentAddress = networkNumber;
    
    for (const req of sortedRequirements) {
        const hostsNeeded = nextPowerOf2(req.hosts);
        const subnetBits = 32 - Math.log2(hostsNeeded);
        const subnetMask = Math.pow(2, 32) - hostsNeeded;
        
        const networkAddress = currentAddress;
        const broadcastAddress = networkAddress + hostsNeeded - 1;
        const firstHost = networkAddress + 1;
        const lastHost = broadcastAddress - 1;
        
        subnets.push({
            index: req.index,
            hostsRequired: req.hosts,
            hostsAvailable: hostsNeeded - 2,
            networkAddress: numberToIP(networkAddress),
            subnetMask: numberToIP(subnetMask),
            cidr: subnetBits,
            firstHost: numberToIP(firstHost),
            lastHost: numberToIP(lastHost),
            broadcastAddress: numberToIP(broadcastAddress)
        });
        
        currentAddress = broadcastAddress + 1;
    }
    
    return subnets.sort((a, b) => a.index - b.index);
}

function displayResults(subnets) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    const header = document.createElement('div');
    header.className = 'result-header';
    header.textContent = '> vlsm calculation results';
    resultsDiv.appendChild(header);
    
    subnets.forEach((subnet, index) => {
        const subnetResult = document.createElement('div');
        subnetResult.className = 'subnet-result';
        
        const subnetTitle = document.createElement('div');
        subnetTitle.className = 'subnet-title';
        subnetTitle.textContent = 'subnet ' + (index + 1) + ' (' + subnet.hostsRequired + ' hosts required)';
        subnetResult.appendChild(subnetTitle);
        
        const subnetInfo = document.createElement('div');
        subnetInfo.className = 'subnet-info';
        
        const items = [
            ['network:', subnet.networkAddress + '/' + subnet.cidr],
            ['subnet mask:', subnet.subnetMask],
            ['first host:', subnet.firstHost],
            ['last host:', subnet.lastHost],
            ['broadcast:', subnet.broadcastAddress],
            ['available hosts:', subnet.hostsAvailable]
        ];
        
        items.forEach(([label, value]) => {
            const infoItem = document.createElement('div');
            infoItem.className = 'info-item';
            const span = document.createElement('span');
            span.textContent = label;
            infoItem.appendChild(span);
            infoItem.appendChild(document.createTextNode(' ' + value));
            subnetInfo.appendChild(infoItem);
        });
        
        subnetResult.appendChild(subnetInfo);
        resultsDiv.appendChild(subnetResult);
    });
    
    resultsDiv.classList.add('show');
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'pt' : 'en';
    updateLanguageButton();
    updateInterface();
    
    const activeSection = document.querySelector('.section.active');
    if (activeSection && activeSection.id === 'content-display') {
        const activeNav = document.querySelector('.nav a.active');
        if (activeNav) {
            const section = activeNav.getAttribute('data-section');
            if (section && markdownFiles[currentLanguage][section]) {
                loadMarkdownContent(markdownFiles[currentLanguage][section]);
            }
        }
    }
}

function updateLanguageButton() {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        const activeSpan = langBtn.querySelector('.lang-active');
        const inactiveSpan = langBtn.querySelector('.lang-inactive');
        
        if (currentLanguage === 'en') {
            activeSpan.textContent = 'EN';
            inactiveSpan.textContent = 'PT';
        } else {
            activeSpan.textContent = 'PT';
            inactiveSpan.textContent = 'EN';
        }
    }
}

function updateInterface() {
    const texts = interfaceTexts[currentLanguage];
    
    const sectionTitle = document.querySelector('.section-title');
    const sectionSubtitle = document.querySelector('.section-subtitle');
    if (sectionTitle) sectionTitle.textContent = `> ${texts.title.toLowerCase()}`;
    if (sectionSubtitle) sectionSubtitle.textContent = texts.subtitle;
    
    const navHeaderSpan = document.querySelector('.nav-header span');
    if (navHeaderSpan) navHeaderSpan.textContent = texts.navHeader;
    
    Object.keys(texts.navItems).forEach(key => {
        const link = document.querySelector(`[data-section="${key}"]`);
        if (link) link.textContent = texts.navItems[key];
    });
}

function setupMobileNavigation() {
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const nav = document.getElementById('nav');
    const main = document.querySelector('main');
    const footer = document.querySelector('.footer');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-visible');
        });
        
        const navLinks = document.querySelectorAll('.nav a[data-section]');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('mobile-visible');
                }
            });
        });
        
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                !nav.contains(e.target) && 
                !mobileToggle.contains(e.target)) {
                nav.classList.remove('mobile-visible');
            }
        });
    }
    
    function adjustLayout() {
        if (window.innerWidth <= 768) {
            main.classList.add('main-mobile');
            if (footer) footer.classList.add('mobile');
        } else {
            main.classList.remove('main-mobile');
            if (footer) footer.classList.remove('mobile');
            nav.classList.remove('mobile-visible');
        }
    }
    
    adjustLayout();
    window.addEventListener('resize', adjustLayout);
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav a[data-section]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            setActiveNav(this);
        });
    });
}

function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Reset scroll to top
    window.scrollTo(0, 0);
    
    if (sectionName === 'home') {
        document.getElementById('home').classList.add('active');
    } else if (markdownFiles[currentLanguage] && markdownFiles[currentLanguage][sectionName]) {
        document.getElementById('content-display').classList.add('active');
        loadMarkdownContent(markdownFiles[currentLanguage][sectionName]);
    }
}

function setActiveNav(activeLink) {
    document.querySelectorAll('.nav a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

async function loadMarkdownContent(filename) {
    const container = document.getElementById('markdown-content');
    
    try {
        const response = await fetch(filename);
        
        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }
        
        const content = await response.text();
        const htmlContent = parseMarkdown(content);
        container.innerHTML = htmlContent;
    } catch (error) {
        console.error('Erro ao carregar:', filename, error);
        container.innerHTML = '<p style="color: #ff4444;">Erro ao carregar o ficheiro: ' + filename + '</p>' +
            '<p style="color: #808080; font-size: 14px;">Se estás a abrir o ficheiro localmente (file://), precisas de usar um servidor HTTP.</p>' +
            '<p style="color: #808080; font-size: 14px;">Usa: npx http-server ou Live Server no VS Code.</p>';
    }
}

function parseMarkdown(markdown) {
    let html = markdown;
    
    const codeBlocks = [];
    let codeIndex = 0;
    
    html = html.replace(/```[\w]*\n?([\s\S]*?)```/g, function(match, code) {
        const placeholder = `__CODEBLOCK_${codeIndex}__`;
        codeBlocks[codeIndex] = `<pre><code>${code.trim()}</code></pre>`;
        codeIndex++;
        return placeholder;
    });
    
    const inlineCodes = [];
    let inlineIndex = 0;
    html = html.replace(/`([^`]+)`/g, function(match, code) {
        const placeholder = `__INLINECODE_${inlineIndex}__`;
        inlineCodes[inlineIndex] = `<code>${code}</code>`;
        inlineIndex++;
        return placeholder;
    });
    
    html = html.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;');
    
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/(?<!\*)\*([^\*\n]+?)\*(?!\*)/g, '<em>$1</em>');
    
    for (let i = 0; i < inlineCodes.length; i++) {
        html = html.replace(`__INLINECODE_${i}__`, inlineCodes[i]);
    }
    
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function(match, text, url) {
        if (!isAllowedUrl(url)) {
            return sanitizeText(text);
        }
        return '<a href="' + url + '">' + text + '</a>';
    });
    
    const lines = html.split('\n');
    let inList = false;
    let listType = '';
    let processedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isUnorderedItem = /^\s*[-*+]\s/.test(line) && !line.includes('__CODEBLOCK_') && !line.includes('__INLINECODE_');
        const isOrderedItem = /^\s*\d+\.\s/.test(line) && !line.includes('__CODEBLOCK_') && !line.includes('__INLINECODE_');
        
        if (isUnorderedItem || isOrderedItem) {
            const newListType = isUnorderedItem ? 'ul' : 'ol';
            
            if (!inList) {
                processedLines.push(`<${newListType}>`);
                inList = true;
                listType = newListType;
            } else if (listType !== newListType) {
                processedLines.push(`</${listType}>`);
                processedLines.push(`<${newListType}>`);
                listType = newListType;
            }
            
            const itemText = line.replace(/^\s*[-*+]\s/, '').replace(/^\s*\d+\.\s/, '');
            processedLines.push(`<li>${itemText}</li>`);
        } else {
            if (inList) {
                processedLines.push(`</${listType}>`);
                inList = false;
                listType = '';
            }
            processedLines.push(line);
        }
    }
    
    if (inList) {
        processedLines.push(`</${listType}>`);
    }
    
    html = processedLines.join('\n');
    
    const paragraphs = html.split(/\n\s*\n/);
    let finalHtml = '';
    
    for (let para of paragraphs) {
        para = para.trim();
        if (para) {
            if (!para.match(/^<(h[1-6]|ul|ol|li|pre|code)/)) {
                if (!para.includes('<h') && !para.includes('<ul') && !para.includes('<ol') && !para.includes('<pre')) {
                    para = `<p>${para}</p>`;
                }
            }
            finalHtml += para + '\n\n';
        }
    }
    
    for (let i = 0; i < codeBlocks.length; i++) {
        finalHtml = finalHtml.replace(`__CODEBLOCK_${i}__`, codeBlocks[i]);
    }
    
    return finalHtml.trim();
}