const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const usuarioRoutes = require("./routes/usuarioroutes");
app.use("/usuario", usuarioRoutes);

const usuariocontroler = require("./controllers/usuariocontroller");

app.get("/areaLogado", usuariocontroler.verificarAutenticacao, (req, res) => {
  res.json({
    msg:
      "Você está logado com o ID " +
      req.usuarioID +
      "e pode acessar este recurso.",
  });
});

app.get(
  "/areaAdmin",
  usuariocontroler.verificarAutenticacao,
  usuariocontroler.verificarAutenticacao,
  (req, res) => {
    res.json({
      msg: "Você é um administrador!",
    });
  }
);

//const veiculoRoutes= require("./routes/veiculoroutes");
//const { verificarAutenticacao } = require("./controllers/usuariocontroller");
//app.use("/veiculos",veiculoRoutes);

app.listen(8000, (err) => {
  console.log("Aplicação rodando em localhost:8000");

  //  if (err) {
  //  console.log("Erro: " + JSON.stringify(err));
  //} else {
  // console.log("Aplicação rodando em localhost:8000");
  //}
});
