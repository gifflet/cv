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
