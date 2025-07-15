const router = require("express").Router();

const UsuarioController = require("../controllers/usuariocontroller");

router.post("/cadastro", UsuarioController.cadastrar);

router.post("/login", UsuarioController.login);

module.exports = router;
