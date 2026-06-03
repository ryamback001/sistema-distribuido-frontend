// =========================
// CONFIGURAÇÃO
// =========================

const NGROK_URL = "https://SEU-NGROK.ngrok-free.dev";


// =========================
// ELEMENTOS
// =========================

const formCadastro =
    document.getElementById('formCadastro');

const tabelaBody =
    document.querySelector('#tabelaUsuarios tbody');


// =========================
// INICIALIZAÇÃO
// =========================

window.onload = () => {

    const token =
        localStorage.getItem('token');

    if (token) {

        mostrarSistema();

    }

}


// =========================
// CONTROLE DE TELAS
// =========================

function mostrarSistema() {

    document.getElementById(
        'loginScreen'
    ).style.display = 'none';

    document.getElementById(
        'sistema'
    ).style.display = 'block';

}

function mostrarLogin() {

    document.getElementById(
        'loginScreen'
    ).style.display = 'flex';

    document.getElementById(
        'sistema'
    ).style.display = 'none';

}


// =========================
// CADASTRAR CONTA
// =========================

async function cadastrarConta() {

    const usuario =
        document.getElementById('usuario')
        .value;

    const senha =
        document.getElementById('senha')
        .value;

    try {

        const response =
            await fetch(
                `${NGROK_URL}/register`,
                {

                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',
                        'ngrok-skip-browser-warning':
                            'true'
                    },

                    body: JSON.stringify({
                        usuario,
                        senha
                    })

                }
            );

        const dados =
            await response.json();

        if (response.ok) {

            alert(
                'Conta criada com sucesso!'
            );

        } else {

            alert(
                dados.erro
            );

        }

    } catch (error) {

        console.error(error);

        alert(
            'Erro ao cadastrar conta.'
        );

    }

}


// =========================
// LOGIN
// =========================

async function fazerLogin() {

    const usuario =
        document.getElementById('usuario')
        .value;

    const senha =
        document.getElementById('senha')
        .value;

    try {

        const response =
            await fetch(
                `${NGROK_URL}/login`,
                {

                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json',
                        'ngrok-skip-browser-warning':
                            'true'
                    },

                    body: JSON.stringify({
                        usuario,
                        senha
                    })

                }
            );

        const dados =
            await response.json();

        if (response.ok) {

            localStorage.setItem(
                'token',
                dados.token
            );

            mostrarSistema();

        } else {

            alert(
                dados.erro
            );

        }

    } catch (error) {

        console.error(error);

        alert(
            'Erro ao realizar login.'
        );

    }

}


// =========================
// LOGOUT
// =========================

function logout() {

    localStorage.removeItem('token');

    location.reload();

}


// =========================
// TROCAR TELAS
// =========================

function alternarTela(idTela) {

    document
        .querySelectorAll('.modulo-tela')
        .forEach(tela => {

            tela.classList.add('deactive');

        });

    document
        .getElementById(idTela)
        .classList.remove('deactive');

    if (idTela === 'tela-listagem') {

        atualizarTabela();

    }

}


// =========================
// BUSCAR USUÁRIOS
// =========================

async function atualizarTabela() {

    const token =
        localStorage.getItem('token');

    try {

        const response =
            await fetch(
                `${NGROK_URL}/usuarios`,
                {

                    method: 'GET',

                    headers: {
                        'Content-Type':
                            'application/json',

                        'Authorization':
                            token,

                        'ngrok-skip-browser-warning':
                            'true'
                    }

                }
            );

        const usuarios =
            await response.json();

        tabelaBody.innerHTML = '';

        usuarios.forEach(user => {

            const linha = `
                <tr>
                    <td>${user.id || '-'}</td>
                    <td>${user.nome}</td>
                    <td>${user.email}</td>
                    <td>
                        ${new Date(user.data)
                            .toLocaleDateString('pt-BR')}
                    </td>
                </tr>
            `;

            tabelaBody.innerHTML += linha;

        });

    } catch (error) {

        console.error(error);

        alert(
            'Erro ao buscar usuários.'
        );

    }

}


// =========================
// CADASTRAR USUÁRIO
// =========================

formCadastro.addEventListener(
    'submit',
    async (e) => {

        e.preventDefault();

        const token =
            localStorage.getItem('token');

        const nome =
            document.getElementById('nome')
            .value;

        const email =
            document.getElementById('email')
            .value;

        try {

            const response =
                await fetch(
                    `${NGROK_URL}/usuarios`,
                    {

                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json',

                            'Authorization':
                                token,

                            'ngrok-skip-browser-warning':
                                'true'
                        },

                        body: JSON.stringify({
                            nome,
                            email
                        })

                    }
                );

            if (response.ok) {

                alert(
                    'Usuário cadastrado com sucesso!'
                );

                formCadastro.reset();

                alternarTela(
                    'tela-listagem'
                );

            } else {

                alert(
                    'Falha ao cadastrar usuário.'
                );

            }

        } catch (error) {

            console.error(error);

            alert(
                'Erro de conexão.'
            );

        }

    }
);


// =========================
// BOTÃO ATUALIZAR
// =========================

document
    .getElementById('btnAtualizar')
    .addEventListener(
        'click',
        atualizarTabela
    );
