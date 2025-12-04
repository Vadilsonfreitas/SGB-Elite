// js/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Verifica se estamos numa página que requer autenticação (não é a de login)
    if (!window.location.pathname.includes('index.html')) {
        checkAuth();
    }
    
    // Atualiza elementos da UI com dados do usuário
    const userSpan = document.getElementById('user-name-display');
    const roleSpan = document.getElementById('user-role-display');
    if (userSpan) userSpan.textContent = localStorage.getItem('sgbUser') || 'Usuário';
    if (roleSpan) roleSpan.textContent = localStorage.getItem('sgbRoleDisplay') || '';

    // --- Lógica da Tela de Login ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// --- Função de Login ---
function handleLogin(e) {
    e.preventDefault();
    const roleSelect = document.getElementById('roleSelect');
    const selectedRole = roleSelect.value;
    const roleDisplayName = roleSelect.options[roleSelect.selectedIndex].text;
    const username = document.getElementById('username').value;

    // Salva dados na sessão (simulação)
    localStorage.setItem('sgbUser', username);
    localStorage.setItem('sgbRole', selectedRole);
    localStorage.setItem('sgbRoleDisplay', roleDisplayName);

    // REDIRECIONAMENTO BASEADO NO PERFIL (Separando as telas)
    switch(selectedRole) {
        case 'admin':
            window.location.href = 'dash_admin.html';
            break;
        case 'gestor':
            window.location.href = 'dash_gestor.html';
            break;
        case 'barbeiro':
            window.location.href = 'dash_barbeiro.html';
            break;
        default:
            alert('Erro no perfil selecionado');
    }
}

// --- Funções de Navegação ---
function navigateTo(page) {
    window.location.href = page;
}

// Retorna ao painel correto baseado no perfil salvo
function backToDashboard() {
    const role = localStorage.getItem('sgbRole');
    if (role === 'admin') window.location.href = 'dash_admin.html';
    else if (role === 'gestor') window.location.href = 'dash_gestor.html';
    else if (role === 'barbeiro') window.location.href = 'dash_barbeiro.html';
    else window.location.href = 'index.html';
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}

// --- Simulação de Segurança (Check Auth) ---
function checkAuth() {
    const role = localStorage.getItem('sgbRole');
    const path = window.location.pathname;

    if (!role) {
        window.location.href = 'index.html'; // Não logado
        return;
    }

    // Regras simples de bloqueio de página por perfil
    // Se for barbeiro tentando acessar paginas de gestão ou relatórios completos
    if (role === 'barbeiro') {
        if (path.includes('manage_membership.html') || path.includes('reports_full.html')) {
            alert('Acesso Negado: Perfil de Barbeiro não tem permissão para esta área.');
            backToDashboard();
        }
    }
    // Se for gestor tentando acessar relatórios completos de admin
    if (role === 'gestor' && path.includes('reports_full.html')) {
             alert('Acesso Negado: Apenas Administradores podem ver relatórios completos.');
             backToDashboard();
    }
}

// --- Funções Simuladas de Ação ---
function simularRegisto() {
    alert("✅ Serviço registado com sucesso! (Simulação)");
    // Em um app real, enviaria dados ao backend
}

function simularRenovacao() {
    alert("💰 Mensalidade renovada por 30 dias! (Simulação)");
}