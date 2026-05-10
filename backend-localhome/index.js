const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

// ROTA TESTE
app.get('/teste', (req, res) => {

    console.log(
        "💻 Requisição recebida no PC local"
    );

    res.send("PC Local OK 💻");
});

// INICIA SERVIDOR
app.listen(3000, '0.0.0.0', () => {

    console.log(
        "🚀 Servidor local rodando na porta 3000"
    );
});