const router = require("express").Router();

const UsuarioController = require("../controllers/usuariocontroller");

router.post("/cadastro", UsuarioController.cadastrar);

router.get("/buscar/:id?", UsuarioController.buscar);

module.exports = router;
