const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello people!");
});

const veiculoRoutes= require("./routes/veiculoroutes");
app.use("/veiculos",veiculoRoutes);

const usuarioRoutes= require("./routes/usuarioroutes");
app.use("/usuario",usuarioRoutes);


app.listen(8000, (err) => {
  if (err) {
    console.log("Erro: " + JSON.stringify(err));
  } else {
    console.log("Aplicação rodando em localhost:8000");
  }
});
