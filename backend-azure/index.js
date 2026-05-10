require("http")
.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.url === "/teste") {

        res.end("Azure OK 🚀");

    } else {

        res.end("Rota inválida");
    }

})
.listen(3002, "0.0.0.0");