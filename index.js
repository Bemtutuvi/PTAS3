const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const veiculoRoute = require("./routes/veiculoroutes");
app.use("/veiculos", veiculoRoute);

const usuarioRoute = require("./routes/usuarioroutes");
const usuarioController = require("./controllers/usuariocontroller");
app.use("/usuario", usuarioRoute);

app.get("/areaLogada", usuarioController.verificarAutenticacao, (req, res) => {
  res.json({
    msg:
      "Você está logado com o ID: " +
      req.usuarioID +
      " e você está permitido a acessar esta área logada",
  });
});

app.get(
  "/areaAdmin",
  usuarioController.verificarAutenticacao,
  usuarioController.verificaIsAdmin,
  (req, res) => {
    res.json({
      msg: "Você é um administrador!",
    });
  }
);

app.listen(8000, (err) => {
  if (err) {
    console.log("Erro: " + JSON.stringify(err));
  } else {
    console.log(`servidor rodando na porta http://localhost:${8000}`);
  }
});
