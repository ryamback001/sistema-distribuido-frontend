const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const AZURE_BASE = "http://20.151.117.60:3002";

app.use(cors());
app.use(express.json());

// Cadastro
app.post('/usuarios', async (req, res) => {
    try {
        const respostaAzure = await fetch(
            `${AZURE_BASE}/usuarios`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            }
        );

        const dados = await respostaAzure.json();

        res.status(respostaAzure.status).json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
});
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const AZURE_BASE = "http://20.151.117.60:3002";

app.use(cors());
app.use(express.json());

// Cadastro
app.post('/usuarios', async (req, res) => {
    try {
        const respostaAzure = await fetch(
            `${AZURE_BASE}/usuarios`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            }
        );

        const dados = await respostaAzure.json();

        res.status(respostaAzure.status).json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
});
// Registro de conta
app.post('/register', async (req, res) => {

    try {

        const respostaAzure = await fetch(
            `${AZURE_BASE}/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            }
        );

        const dados = await respostaAzure.json();

        res.status(
            respostaAzure.status
        ).json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

});

// Login
app.post('/login', async (req, res) => {

    try {

        const respostaAzure = await fetch(
            `${AZURE_BASE}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            }
        );

        const dados = await respostaAzure.json();

        res.status(respostaAzure.status).json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
});

// Listagem
app.get('/usuarios', async (req, res) => {

    try {

        const respostaAzure =
            await fetch(`${AZURE_BASE}/usuarios`);

        const dados =
            await respostaAzure.json();

        res.json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
});

// Status
app.get('/', (req, res) => {

    res.json({
        status: "HOME ONLINE"
    });

});

app.listen(PORT, () => {

    console.log(
        `💻 Nó Local ativo na porta ${PORT}`
    );

});


// Login
app.post('/login', async (req, res) => {

    try {

        const respostaAzure = await fetch(
            `${AZURE_BASE}/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            }
        );

        const dados = await respostaAzure.json();

        res.status(respostaAzure.status).json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
});

// Listagem
app.get('/usuarios', async (req, res) => {

    try {

        const respostaAzure =
            await fetch(`${AZURE_BASE}/usuarios`);

        const dados =
            await respostaAzure.json();

        res.json(dados);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }
});

// Status
app.get('/', (req, res) => {

    res.json({
        status: "HOME ONLINE"
    });

});

app.listen(PORT, () => {

    console.log(
        `💻 Nó Local ativo na porta ${PORT}`
    );

});
