const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());


// ========================================
// AZURE
// ========================================

const AZURE_API = "http://20.151.117.60:3002/usuarios";


// ========================================
// BANCO LOCAL TEMPORÁRIO
// ========================================

const contas = [];


// ========================================
// CADASTRO DE CONTA
// ========================================

app.post('/register', (req, res) => {

    const { usuario, senha } = req.body;

    if (!usuario || !senha) {

        return res.status(400).json({
            erro: "Preencha usuário e senha."
        });

    }

    const existe = contas.find(
        u => u.usuario === usuario
    );

    if (existe) {

        return res.status(400).json({
            erro: "Usuário já existe."
        });

    }

    contas.push({
        usuario,
        senha
    });

    console.log("✅ Novo usuário registrado:", usuario);

    return res.status(201).json({
        mensagem: "Conta criada com sucesso."
    });

});


// ========================================
// LOGIN
// ========================================

app.post('/login', (req, res) => {

    const { usuario, senha } = req.body;

    const user = contas.find(
        u =>
            u.usuario === usuario &&
            u.senha === senha
    );

    if (!user) {

        return res.status(401).json({
            erro: "Credenciais inválidas."
        });

    }

    console.log("🔐 Login realizado:", usuario);

    return res.json({
        mensagem: "Login realizado.",
        token: "TOKEN_SIMULADO_123"
    });

});


// ========================================
// MIDDLEWARE DE AUTENTICAÇÃO
// ========================================

function autenticar(req, res, next) {

    const token =
        req.headers.authorization;

    if (!token) {

        return res.status(401).json({
            erro: "Acesso negado."
        });

    }

    next();

}


// ========================================
// POST USUÁRIOS
// ========================================

app.post('/usuarios', autenticar, async (req, res) => {

    console.log(
        "📥 [PC LOCAL] Dados recebidos."
    );

    try {

        const respostaAzure =
            await fetch(AZURE_API, {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(req.body)

            });

        const resultado =
            await respostaAzure.json();

        console.log(
            "✅ Dados replicados na Azure."
        );

        return res.status(201).json(resultado);

    } catch (erro) {

        console.error(
            "❌ Erro Azure:",
            erro.message
        );

        return res.status(500).json({
            erro:
                "Falha na comunicação cloud."
        });

    }

});


// ========================================
// GET USUÁRIOS
// ========================================

app.get('/usuarios', autenticar, async (req, res) => {

    console.log(
        "🔍 Buscando dados da Azure..."
    );

    try {

        const respostaAzure =
            await fetch(AZURE_API);

        const dados =
            await respostaAzure.json();

        return res.json(dados);

    } catch (erro) {

        return res.status(500).json({
            erro:
                "Banco inacessível."
        });

    }

});


// ========================================
// SERVER
// ========================================

app.listen(PORT, () => {

    console.log(
        `💻 Nó Local ativo na porta ${PORT}`
    );

});
