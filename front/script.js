const AZURE = "http://IP_DA_AZURE:3002";
const PC = "https://SEU_NGROK.io";

// TESTE AZURE
async function testarAzure() {
    try {
        const res = await fetch(`${AZURE}/teste`);
        const data = await res.text();

        document.getElementById("resultado").textContent =
            "Azure respondeu: " + data;

    } catch (erro) {
        document.getElementById("resultado").textContent =
            "❌ Erro Azure";
        console.error(erro);
    }
}

// TESTE PC
async function testarPC() {
    try {
        const res = await fetch(`${PC}/teste`);
        const data = await res.text();

        document.getElementById("resultado").textContent =
            "PC respondeu: " + data;

    } catch (erro) {
        document.getElementById("resultado").textContent =
            "❌ Erro PC";
        console.error(erro);
    }
}