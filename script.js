const AZURE = "http://IP_DA_AZURE:3002";
const PC = "https://SEU_NGROK.io";

// TESTE AZURE
function testarConexaoAzure() {
    fetch("http://20.151.117.60:3002/teste")
        .then(response => response.text())
        .then(data => {
            console.log(data); 
            alert("Conexão com Azure: " + data);
        })
        .catch(err => {
            console.error("Erro na requisição:", err);
            alert("Erro ao conectar com a Azure. Verifique o console.");
        });
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
