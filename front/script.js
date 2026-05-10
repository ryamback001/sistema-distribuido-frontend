const AZURE = "http://20.151.117.60:3002";
const PC = "https://SEU_NGROK.ngrok-free.app";

// TESTE AZURE
async function testarConexaoAzure() {

    try {

        const response = await fetch(`${AZURE}/teste`);
        const data = await response.text();

        console.log(data);

        document.getElementById("resultado").textContent =
            "✅ Azure respondeu: " + data;

    } catch (err) {

        console.error("Erro Azure:", err);

        document.getElementById("resultado").textContent =
            "❌ Erro ao conectar Azure";
    }
}

// TESTE PC LOCAL (NGROK)
async function testarPC() {

    try {

        const response = await fetch(`${PC}/teste`);
        const data = await response.text();

        console.log(data);

        document.getElementById("resultado").textContent =
            "✅ PC respondeu: " + data;

    } catch (erro) {

        console.error("Erro PC:", erro);

        document.getElementById("resultado").textContent =
            "❌ Erro ao conectar PC";
    }
}

async function testarFluxoCompleto() {

    const response =
        await fetch(`${AZURE}/pc`);

    const data =
        await response.text();

    document.getElementById("resultado")
        .textContent = data;
}