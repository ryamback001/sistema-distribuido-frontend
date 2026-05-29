// =========================
// CONFIGURAÇÃO DA REDE
// =========================

const AZURE = "http://20.151.117.60:3002";

// URL DO NGROK
const NGROK_URL = "https://rimless-venture-water.ngrok-free.dev";


// =========================
// LOGIN
// =========================

const USER = "admin";
const PASS = "1234";

// Fazer login
function fazerLogin() {

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    const erro = document.getElementById('erroLogin');

    if (usuario === USER && senha === PASS) {

        localStorage.setItem('auth', 'true');

        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('sistema').style.display = 'block';

    } else {

        erro.innerText = 'Usuário ou senha inválidos';

    }
}

// Verificar login salvo
window.onload = () => {

    const auth = localStorage.getItem('auth');

    if (auth === 'true') {

        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('sistema').style.display = 'block';

    }
}

// Logout
function logout() {

    localStorage.removeItem('auth');

    location.reload();

}


// =========================
// TELAS
// =========================

// Alternar entre módulos
function alternarTela(idTela) {

    document
        .querySelectorAll('.modulo-tela')
        .forEach(tela => tela.classList.add('deactive'));

    document
        .getElementById(idTela)
        .classList.remove('deactive');

    if (idTela === 'tela-listagem') {

        atualizarTabela();

    }
}


// =========================
// ELEMENTOS
// =========================

const form = document.getElementById('formCadastro');

const tabelaBody =
    document.querySelector('#tabelaUsuarios tbody');


// =========================
// BUSCAR USUÁRIOS
// =========================

async function atualizarTabela() {

    try {

        const response = await fetch(`${NGROK_URL}/usuarios`, {

            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }

        });

        const usuarios = await response.json();

        tabelaBody.innerHTML = '';

        usuarios.forEach(user => {

            const linha = `
                <tr>
                    <td>${user.id || '-'}</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>
                        ${new Date(user.data).toLocaleDateString('pt-BR')}
                    </td>
                </tr>
            `;

            tabelaBody.innerHTML += linha;

        });

    } catch (error) {

        console.error(
            "Erro na busca distribuída:",
            error
        );

        alert('Erro ao buscar dados da rede.');

    }
}


// =========================
// CADASTRAR USUÁRIO
// =========================

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const nome =
        document.getElementById('nome').value;

    const email =
        document.getElementById('email').value;

    try {

        const response = await fetch(`${NGROK_URL}/usuarios`, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },

            body: JSON.stringify({
                nome,
                email
            })

        });

        if (response.ok) {

            alert(
                'Sucesso! Dados enviados para a rede distribuída.'
            );

            form.reset();

            alternarTela('tela-listagem');

        } else {

            alert(
                'Falha ao processar requisição.'
            );

        }

    } catch (error) {

        console.error(
            "Erro de conectividade:",
            error
        );

        alert(
            'Erro de conexão com a API.'
        );

    }

});


// =========================
// BOTÃO ATUALIZAR
// =========================

document
    .getElementById('btnAtualizar')
    .addEventListener('click', atualizarTabela);