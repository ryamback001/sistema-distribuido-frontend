const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// ======================================
// ARQUIVOS
// ======================================

const ARQUIVO_CONTAS = 'contas.json';
const ARQUIVO_USUARIOS = 'usuarios.json';

// ======================================
// CARREGAR DADOS
// ======================================

let contas = [];
let usuarios = [];

if (fs.existsSync(ARQUIVO_CONTAS)) {
    contas = JSON.parse(
        fs.readFileSync(ARQUIVO_CONTAS, 'utf8')
    );
}

if (fs.existsSync(ARQUIVO_USUARIOS)) {
    usuarios = JSON.parse(
        fs.readFileSync(ARQUIVO_USUARIOS, 'utf8')
    );
}

console.log(
    `📂 Contas carregadas: ${contas.length}`
);

console.log(
    `📂 Usuários carregados: ${usuarios.length}`
);

// ======================================
// REGISTRO DE CONTA
// ======================================

app.post('/register', (req, res) => {

    const { usuario, senha } = req.body;

    if (!usuario || !senha) {

        return res.status(400).json({
            erro: 'Usuário e senha obrigatórios.'
        });

    }

    const existe = contas.find(
        u => u.usuario === usuario
    );

    if (existe) {

        return res.status(400).json({
            erro: 'Usuário já existe.'
        });

    }

    const novaConta = {
        id: contas.length + 1,
        usuario,
        senha,
        data: new Date()
    };

    contas.push(novaConta);

    fs.writeFileSync(
        ARQUIVO_CONTAS,
        JSON.stringify(contas, null, 2)
    );

    console.log(
        '✅ Conta registrada:',
        usuario
    );

    return res.status(201).json({
        mensagem: 'Conta criada com sucesso.'
    });

});

// ======================================
// LOGIN
// ======================================

app.post('/login', (req, res) => {

    const { usuario, senha } = req.body;

    const user = contas.find(
        u =>
            u.usuario === usuario &&
            u.senha === senha
    );

    if (!user) {

        return res.status(401).json({
            erro: 'Credenciais inválidas.'
        });

    }

    console.log(
        `🔐 Login autorizado: ${usuario}`
    );

    return res.json({
        mensagem: 'Login realizado',
        token: 'TOKEN_SIMULADO_123'
    });

});

// ======================================
// CADASTRAR USUÁRIO/ALUNO
// ======================================

app.post('/usuarios', (req, res) => {

    const { nome, email } = req.body;

    if (!nome || !email) {

        return res.status(400).json({
            erro: 'Dados incompletos.'
        });

    }

    const novoUsuario = {
        id: usuarios.length + 1,
        nome,
        email,
        data: new Date()
    };

    usuarios.push(novoUsuario);

    fs.writeFileSync(
        ARQUIVO_USUARIOS,
        JSON.stringify(usuarios, null, 2)
    );

    console.log(
        '🚀 Usuário salvo:',
        novoUsuario
    );

    return res.status(201).json({
        mensagem: 'Salvo com sucesso',
        usuario: novoUsuario
    });

});

// ======================================
// LISTAR USUÁRIOS
// ======================================

app.get('/usuarios', (req, res) => {

    return res.json(usuarios);

});

// ======================================
// STATUS
// ======================================

app.get('/', (req, res) => {

    return res.json({
        status: 'AZURE ONLINE',
        contas: contas.length,
        usuarios: usuarios.length
    });

});

// ======================================
// START
// ======================================

app.listen(PORT, '0.0.0.0', () => {

    console.log(
        `☁️ Servidor Central Azure rodando na porta ${PORT}`
    );

});
