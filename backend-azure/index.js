
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3002; // Porta que você abriu na Azure

app.use(cors());
app.use(express.json());

// Banco de dados simulado em memória na Nuvem
let bancoDadosUsuarios = [];

// Rota POST: Recebe os dados persistidos vindo do nó local
app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email) {
        return res.status(400).json({ erro: "Dados incompletos no servidor Azure." });
    }

    const novoUsuario = {
        id: bancoDadosUsuarios.length + 1,
        nome,
        email,
        data: new Date()
    };

    bancoDadosUsuarios.push(novoUsuario);
    
    console.log(`🚀 [CLOUD AZURE] Dado gravado com sucesso no banco central:`, novoUsuario);
    return res.status(201).json({ mensagem: "Gravado na Azure com sucesso!", usuario: novoUsuario });
});

// Rota GET: Retorna a lista consolidada para o nó local
app.get('/usuarios', (req, res) => {
    console.log(`🔍 [CLOUD AZURE] Enviando lista de usuários para o nó solicitante. Total: ${bancoDadosUsuarios.length}`);
    return res.json(bancoDadosUsuarios);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`☁️ Servidor Central Azure rodando na porta ${PORT}`);
});