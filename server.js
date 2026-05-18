const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// IP e porta onde o backend-azure está rodando na sua VM
const AZURE_API = "http://20.151.117.60:3002/usuarios"; 

// Rota POST: Recebe do Pages e repassa para a Azure
app.post('/usuarios', async (req, res) => {
    console.log("📥 [PC LOCAL] Dados recebidos do Frontend. Repassando para a Azure...");
    try {
        const respostaAzure = await fetch(AZURE_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const resultado = await respostaAzure.json();
        
        console.log("✅ [PC LOCAL] Armazenamento confirmado na Azure!");
        return res.status(201).json(resultado);
    } catch (erro) {
        console.error("❌ Erro ao conectar com o Nó Azure:", erro.message);
        return res.status(500).json({ erro: "Falha na comunicação com a infraestrutura cloud." });
    }
});

// Rota GET: Busca os dados consolidados da Azure
app.get('/usuarios', async (req, res) => {
    console.log("🔍 [PC LOCAL] Buscando dados consolidados na Nuvem Azure...");
    try {
        const respostaAzure = await fetch(AZURE_API);
        const dados = await respostaAzure.json();
        return res.json(dados);
    } catch (erro) {
        return res.status(500).json({ erro: "Banco de dados inacessível." });
    }
});

app.listen(PORT, '0.0.0.0', () => console.log(`💻 Nó Local ativo na porta ${PORT}`));