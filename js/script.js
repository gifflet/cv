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

// Função para carregar e renderizar os dados
async function loadAndRenderData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
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
        const experienceContent = data.experience.map(exp => `
            <div class="experience">
                <h4>${exp.title}</h4>
                <p>${exp.company} · ${exp.type}</p>
                <p class="period">${exp.period}</p>
                ${exp.responsibilities.map(resp => `<p>- ${resp}</p>`).join('')}
            </div>
        `).join('');
        experienceSection.innerHTML += experienceContent;

        // Renderizar habilidades
        const skillsList = document.querySelector('#skills ul');
        skillsList.innerHTML = data.skills.map(skill => `
            <li class="dark-theme">
                <i class="fas ${skill.icon}"></i> ${skill.category}: ${skill.items.join(', ')}
            </li>
        `).join('');

        // Renderizar educação
        const educationSection = document.getElementById('education');
        educationSection.innerHTML += `
            <p><strong>${data.education.institution}</strong> - ${data.education.course}, ${data.education.period} (${data.education.status})</p>
        `;

    } catch (error) {
        console.error('Erro ao carregar ou renderizar dados:', error);
    }
}

// Carregar dados quando a página carregar
document.addEventListener('DOMContentLoaded', loadAndRenderData);
