const path = require("path");
const bcryptjs = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class UsuarioController {
  static async cadastrar(req, res){
    const salt = bcryptjs.getSaltSync(8);
    const hashSenha = bcryptjs.hashSync(req.body.senha, salt);
    const usuario = await prisma.usuario.create ({
      data: {
        nome: req.body.nome,
        email: req.body.email,
        senha: hashSenha,
      },
    });

    res.json({
    usuarioID: usuario.id,
    });
  }
}


module.exports = UsuarioController;
