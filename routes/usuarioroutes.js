const router = require("express").Router();

const UsuarioController = require("../controllers/usuariocontroller");

router.post("/cadastro", UsuarioController.cadastrar);

router.get("/buscar/:id?", UsuarioController.buscar);


router.post("/login",UsuarioController.login);

module.exports = router;
