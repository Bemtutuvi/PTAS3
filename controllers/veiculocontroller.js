const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { verify } = require("crypto");

const prisma = new PrismaClient();

class VeiculoController {


  static async cadastrar(req, res) {
    const novoVeiculo = await prisma.veiculo.create({
      data: {
        placa: req.body.placa,
        modelo: req.body.modelo,
        ano: parseInt(req.body.ano), //essa maracutaia diferente é pra transformar isso em um numero, se chegar como texto da erro (vai q cai na prova)
        cor: req.body.cor,
      },
    });
    res.json({
        veiculoID: novoVeiculo.id,
    });
  }

  static async buscarTodos(req, res) {
    const veiculos = await prisma.veiculo.findMany();

    res.send(veiculos);
  }
}

module.exports = VeiculoController;