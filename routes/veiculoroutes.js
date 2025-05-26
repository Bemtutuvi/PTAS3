const router= require("express").Router();

const VeiculoController = require("../controllers/veiculocontroller");

router.post("/cadastro", VeiculoController.cadastrar);

router.get("/todos", VeiculoController.buscarTodos);

module.exports= router;