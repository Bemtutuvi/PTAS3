//tratar da senha do usuario gerando e verificando hashes
const bcryptjs = require("bcryptjs");

//gera tokens de acesso para usuarios autenticados
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
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

    if (!senhaCorreta) {
      res.json({
        msg: "Senha Incorreta!",
      });
      return;
    }
    const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    res.json({
      msg: "Logado!",
      token: token,
    });
  }

  static async verificarAutenticacao(req, res, next) {
    const authHeader = req.headres["authorization"];

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
          return res.json({
            msg: "Token inválido!",
          });
        }
        req.usuarioID = payload.id;
        next();
      });
    } else {
      return res.json({
        msg: "Token não encontrado",
      });
    }
  }
  static async verificaIsAdmin(req, res, next) {
    if (!req.usuarioID) {
      return res.json({
        msg: "Você não está autenticado!",
      });
    }

    const usuario = await client.usuario.findUnique({
      where: {
        id: req.usuarioID,
      },
    });
    if (!usuario.isAdmin) {
      return res.json({
        msg: "Acesso negado! Você não é um administrador!",
      });
    }

    next();
  }
}

module.exports = UsuarioController;
