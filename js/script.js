let currentLang = 'pt';

// Seleciona o ícone de alternância de tema
document.getElementById('theme-toggle').addEventListener('click', function() {
    const body = document.body; // Seleciona o elemento body
    const themeToggleIcon = this; // Referência ao ícone de alternância

    // Alterna as classes de tema
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');

    // Alterna as classes de tema nos links
    Array.from(document.getElementsByTagName('a')).forEach(link => {
        link.classList.toggle('dark-theme');
        link.classList.toggle('light-theme');
    });

    // Atualiza o ícone do botão de acordo com o tema
    if (body.classList.contains('light-theme')) {
        themeToggleIcon.classList.remove('fa-sun'); // Remove ícone de sol
        themeToggleIcon.classList.add('fa-moon');   // Adiciona ícone de lua
    } else {
        themeToggleIcon.classList.remove('fa-moon'); // Remove ícone de lua
        themeToggleIcon.classList.add('fa-sun');      // Adiciona ícone de sol
    }
});

async function loadLanguageData(lang) {
    try {
        const response = await fetch(`i18n/${lang}.json`);
        return await response.json();
    } catch (error) {
        console.error(`Error loading language data: ${error}`);
        return null;
    }
}

async function changeLanguage(lang) {
    currentLang = lang;
    const data = await loadLanguageData(lang);
    if (data) {
        document.querySelectorAll('.language-selector button').forEach(btn => {
            btn.classList.toggle('active', btn.id === `${lang}-lang`);
        });
        renderContent(data);
    }
}

// Modifique a função loadAndRenderData existente para:
async function loadAndRenderData() {
    const data = await loadLanguageData(currentLang);
    if (data) {
        renderContent(data);
    }
}

function renderContent(data) {
    // Renderizar informações pessoais
    const header = document.getElementById('personal-info');
    header.innerHTML = `
        <h1 class="name">${data.personalInfo.name}</h1>
        <h2 class="title">${data.personalInfo.title}</h2>
        ${data.personalInfo.contacts.map(contact => `
            <p><i class="${contact.icon}"></i> <a class="dark-theme" href="${contact.href}" ${contact.type === 'github' ? 'target="_blank"' : ''}>${contact.value}</a></p>
        `).join('')}
    `;

    // Renderizar experiências
    const experienceSection = document.getElementById('experience');
    experienceSection.innerHTML = `
        <h3><i class="fas fa-briefcase"></i> ${data.sections.experience}</h3>
        ${data.experience.map(exp => `
            <div class="experience">
                <h4>${exp.title}</h4>
                <p>${exp.company} · ${exp.type}</p>
                <p class="period">${exp.period}</p>
                ${exp.responsibilities.map(resp => `<p>- ${resp}</p>`).join('')}
            </div>
        `).join('')}
    `;

    // Renderizar habilidades
    const skillsSection = document.getElementById('skills');
    skillsSection.innerHTML = `
        <h3><i class="fas fa-code"></i> ${data.sections.skills}</h3>
        <ul>
            ${data.skills.map(skill => `
                <li class="dark-theme">
                    <i class="fas ${skill.icon}"></i> ${skill.category}: ${skill.items.join(', ')}
                </li>
            `).join('')}
        </ul>
    `;

    // Renderizar educação
    const educationSection = document.getElementById('education');
    educationSection.innerHTML = `
        <h3><i class="fas fa-graduation-cap"></i> ${data.sections.education}</h3>
        <p><strong>${data.education.institution}</strong> - ${data.education.course}, ${data.education.period} (${data.education.status})</p>
    `;
}

// Adicione os event listeners para os botões de idioma
document.addEventListener('DOMContentLoaded', () => {
    loadAndRenderData();

    document.getElementById('en-lang').addEventListener('click', () => changeLanguage('en'));
    document.getElementById('pt-lang').addEventListener('click', () => changeLanguage('pt'));
});
