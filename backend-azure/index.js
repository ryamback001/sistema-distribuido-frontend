const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

// ======================================
// BANCO JSON
// ======================================

const ARQUIVO = 'usuarios.json';

let bancoDadosUsuarios = [];

if (fs.existsSync(ARQUIVO)) {
    bancoDadosUsuarios = JSON.parse(
        fs.readFileSync(ARQUIVO, 'utf8')
    );
}

console.log(
    `📂 Banco carregado com ${bancoDadosUsuarios.length} usuário(s)`
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

    const existe = bancoDadosUsuarios.find(
        u => u.usuario === usuario
    );

    if (existe) {
        return res.status(400).json({
            erro: 'Usuário já existe.'
        });
    }

    bancoDadosUsuarios.push({
        id: bancoDadosUsuarios.length + 1,
        usuario,
        senha,
        data: new Date()
    });

    fs.writeFileSync(
        ARQUIVO,
        JSON.stringify(
            bancoDadosUsuarios,
            null,
            2
        )
    );

    console.log('✅ Usuário registrado:', usuario);

    res.status(201).json({
        mensagem: 'Conta criada com sucesso.'
    });

});

// ======================================
// LOGIN
// ======================================

app.post('/login', (req, res) => {

    const { usuario, senha } = req.body;

    const user = bancoDadosUsuarios.find(
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

    res.json({
        mensagem: 'Login realizado',
        token: 'TOKEN_SIMULADO_123'
    });

});

// ======================================
// CADASTRO DE PESSOAS
// ======================================

app.post('/usuarios', (req, res) => {

    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({
            erro: 'Dados incompletos.'
        });
    }

    const novoUsuario = {
        id: bancoDadosUsuarios.length + 1,
        nome,
        email,
        data: new Date()
    };

    bancoDadosUsuarios.push(
        novoUsuario
    );

    fs.writeFileSync(
        ARQUIVO,
        JSON.stringify(
            bancoDadosUsuarios,
            null,
            2
        )
    );

    console.log(
        '🚀 Usuário salvo:',
        novoUsuario
    );

    res.status(201).json({
        mensagem: 'Salvo com sucesso',
        usuario: novoUsuario
    });

});

// ======================================
// LISTAR
// ======================================

app.get('/usuarios', (req, res) => {

    res.json(
        bancoDadosUsuarios
    );

});

// ======================================
// START
// ======================================

app.listen(PORT, '0.0.0.0', () => {

    console.log(
        `☁️ Servidor Central Azure rodando na porta ${PORT}`
    );

});
