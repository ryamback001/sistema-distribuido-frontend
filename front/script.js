// ⚠️ IMPORTANTE: Sempre coloque aqui a URL gerada pelo seu ngrok ativo!
const NGROK_URL = "https://rimless-venture-water.ngrok-free.app"; 

// Alternar entre as abas do menu
function alternarTela(idTela) {
    document.querySelectorAll('.modulo-tela').forEach(tela => tela.classList.add('deactive'));
    document.getElementById(idTela).classList.remove('deactive');
    if (idTela === 'tela-listagem') atualizarTabela();
}

const form = document.getElementById('formCadastro');
const tabelaBody = document.querySelector('#tabelaUsuarios tbody');

// Buscar Usuários (GET)
async function atualizarTabela() {
    try {
        const response = await fetch(`${NGROK_URL}/usuarios`);
        const usuarios = await response.json();
        
        tabelaBody.innerHTML = '';
        usuarios.forEach(user => {
            const linha = `<tr>
                <td>${user.id || '-'}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${new Date(user.data).toLocaleDateString('pt-BR')}</td>
            </tr>`;
            tabelaBody.innerHTML += linha;
        });
    } catch (error) {
        console.error("Erro na busca distribuída:", error);
    }
}

// Enviar Usuário (POST)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch(`${NGROK_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email })
        });

        if (response.ok) {
            alert('Sucesso! Dados processados pelo Nó Local e replicados na Nuvem.');
            form.reset();
            alternarTela('tela-listagem');
        } else {
            alert('Falha ao processar requisição.');
        }
    } catch (error) {
        console.error("Erro de conectividade na rede:", error);
    }
});

document.getElementById('btnAtualizar').addEventListener('click', atualizarTabela);