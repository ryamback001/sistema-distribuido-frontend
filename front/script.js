// ======================================
// URL DO NGROK
// ======================================

const NGROK_URL =
    "https://SEU-NGROK.ngrok-free.app";


// ======================================
// ALTERAR TELAS
// ======================================

function alternarTela(idTela) {

    document
        .querySelectorAll('.modulo-tela')
        .forEach(tela => {
            tela.classList.add('deactive');
        });

    document
        .getElementById(idTela)
        .classList.remove('deactive');

    // Atualiza tabela automaticamente
    if (idTela === 'tela-listagem') {
        atualizarTabela();
    }
}


// ======================================
// ELEMENTOS HTML
// ======================================

const formCadastro =
    document.getElementById('formCadastro');

const formLogin =
    document.getElementById('formLogin');

const tabelaBody =
    document.querySelector('#tabelaUsuarios tbody');


// ======================================
// LOGIN
// ======================================

formLogin.addEventListener(
    'submit',

    async (e) => {

        e.preventDefault();

        const email =
            document.getElementById(
                'loginEmail'
            ).value;

        const senha =
            document.getElementById(
                'loginSenha'
            ).value;

        try {

            const response = await fetch(
                `${NGROK_URL}/login`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        email,
                        senha
                    })
                }
            );

            const data =
                await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "usuario",
                    JSON.stringify(data.usuario)
                );

                alert("✅ Login realizado!");

                alternarTela(
                    'tela-listagem'
                );

            } else {

                alert(
                    "❌ " + data.erro
                );
            }

        } catch (erro) {

            console.error(erro);

            alert(
                "Erro conexão login"
            );
        }
    }
);


// ======================================
// CADASTRO
// ======================================

formCadastro.addEventListener(
    'submit',

    async (e) => {

        e.preventDefault();

        const nome =
            document.getElementById(
                'nome'
            ).value;

        const email =
            document.getElementById(
                'email'
            ).value;

        const senha =
            document.getElementById(
                'senha'
            ).value;

        try {

            const response = await fetch(
                `${NGROK_URL}/usuarios`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        nome,
                        email,
                        senha
                    })
                }
            );

            const data =
                await response.json();

            if (response.ok) {

                alert(
                    "✅ Usuário cadastrado!"
                );

                formCadastro.reset();

                alternarTela(
                    'tela-login'
                );

            } else {

                alert(
                    "❌ " + data.erro
                );
            }

        } catch (erro) {

            console.error(erro);

            alert(
                "Erro cadastro"
            );
        }
    }
);


```javascript
// ======================================
// LISTAR USUÁRIOS
// ======================================
´´´´´`


async function atualizarTabela() {

    try {

        const response = await fetch(
            "${NGROK_URL}/usuarios"
        );

        const usuarios =
            await response.json();

        tabelaBody.innerHTML = '';

        usuarios.forEach(user => {

            const linha = `
                <tr>
                    <><td>${user.id}</td><td>${user.nome}</td><td>${user.email}</td><td>
        ${new Date(user.data)
            .toLocaleDateString('pt-BR')}
    </td></>
                </tr>
            `;

            tabelaBody.innerHTML += linha;
        });

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro listagem"
        );
    }
}


// ======================================
// BOTÃO ATUALIZAR
// ======================================

document
    .getElementById('btnAtualizar')
    .addEventListener(
        'click',
        atualizarTabela
    );
