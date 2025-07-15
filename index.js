const express = require ('express');
const app = express();
app.use(express.urlencoded({ extends: true }));

app.use(express.json())

app.get("/", (req, res) =>{
res.send("ola mundo?");
});

const veiculoRoute = require("./routes/veiculoroutes")
app. use("/veiculos", veiculoRoute);

const usuarioRoute = require("./routes/usuarioroutes");
const usuarioController = require("./controllers/usuariocontroller");
app. use("/usuarios", usuarioRoute);

app.get("/areaLogada", usuarioController.vereficarAutentificacao, (req, res) => {
    res.json({
        msg:"vcesta logando com o ID: "
        + req.usuarioId
        + "e vc esta permitido a acessar esta area logada"
});

});

app.listen(8000, (err) => {
    if (err) {
        console.log("Erro: " + JSON.stringify(err));
    }else{
        console.log(`servidor rodando na porta http://localhost:${8000}`);
    }
})