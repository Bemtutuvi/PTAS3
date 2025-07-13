//tratar da senha do usuario gerando e verificando hashes
const bcryptjs = require("bcryptjs");

//gera tokens de acesso para usuarios autenticados
const jwt= require("jsonwebtoken");

const { PrismaClient } = require("../generate/prisma/cliente");
const client = new PrismaClient();

class UsuarioController {
  static async cadastrar(req, res) {
    const { nome, email, senha } = req.body;

    const salt = bcryptjs.getSaltSync(8);
    const hashSenha = bcryptjs.hashSync(senha, salt);

    const usuario = await client.usuario.create({
      data: {
        nome,
        email,
        senha: hashSenha,
      },
    });

    res.json({
      usuarioID: usuario.id,
    });
  }
  static async login(req, res) {
    const { email, senha } = req.body;

    const usuario = await client.usuario.findUnique({
      where: { email: email },
    });
    if (usuario == null) {
      res.json({
        msg: "Usuário não encontrado!",
      });
      return;
    }

    const senhaCorreta = bcryptjs.compareSync(senha, usuario.senha);

    if(!senhaCorreta){
      res.json({
        msg:"Senha Incorreta!",
      });
      return;
    }
const token= jwt.sign({id:usuario.id}, process.env.SECRET_KEY,{expiresIn:"2h",});

    res.json({
      msg: "Logado!",
      token: token,
    });
  }
}

module.exports = UsuarioController;
