async function testarPC() {

    try {

        const response =
            await fetch(`${PC}/teste`);

        const data =
            await response.text();

        document.getElementById("resultado")
            .textContent =
            "✅ PC respondeu: " + data;

    } catch (erro) {

        console.error(erro);

        document.getElementById("resultado")
            .textContent =
            "❌ Erro PC";
    }
}