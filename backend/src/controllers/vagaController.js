const Vaga = require("../models/Vaga");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");


// POST - Criar nova vaga
const createVaga = async (req, res) => {
  try {
    const {
      titulodavaga, descricao, tipo_vaga,
      vl_pontos, id_hospital, status, qtd_vagas
    } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const novaVaga = new Vaga({
      titulo: titulodavaga,
      descricao,
      tipo: tipo_vaga,
      pontos: Number(vl_pontos),
      hospitalId: id_hospital,
      status,
      quantidade: Number(qtd_vagas),
      imageUrl,
    });

    await novaVaga.save();
    res.status(201).json({ message: "Vaga criada com sucesso", vaga: novaVaga });
  } catch (error) {
    console.error("Erro ao criar vaga:", error);
    res.status(500).json({ error: "Erro ao criar vaga" });
  }
};

// GET - Listar vagas do hospital do admin
const listarVagas = async (req, res) => {
  try {
    // Verifica se o usuário logado é admin
    if (!req.user || !req.user.hospitalId) {
      return res.status(403).json({ error: "Acesso negado. Usuário sem hospital associado." });
    }

    const hospitalId = req.user.hospitalId;

    const vagas = await Vaga.find({ hospitalId }).sort({ createdAt: -1 });
    res.status(200).json(vagas);
  } catch (error) {
    console.error("Erro ao listar vagas:", error);
    res.status(500).json({ error: "Erro ao listar vagas" });
  }
};

// PUT - Editar vaga por ID
const editarVaga = async (req, res) => {
  try {
    const vagaId = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const vagaAtualizada = await Vaga.findByIdAndUpdate(vagaId, updateData, { new: true });

    if (!vagaAtualizada) {
      return res.status(404).json({ error: "Vaga não encontrada" });
    }

    res.status(200).json({ message: "Vaga atualizada com sucesso", vaga: vagaAtualizada });
  } catch (error) {
    console.error("Erro ao editar vaga:", error);
    res.status(500).json({ error: "Erro ao editar vaga" });
  }
};

const deletarVaga = async (req, res) => {
  try {
    const vagaId = req.params.id;

    const vaga = await Vaga.findById(vagaId);
    if (!vaga) {
      return res.status(404).json({ message: "Vaga não encontrada." });
    }

    // Tenta excluir a imagem, se existir
    if (vaga.imageUrl) {
      const imagePath = path.join(__dirname, "../../", vaga.imageUrl);
      fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (!err) {
          fs.unlink(imagePath, (err) => {
            if (err) console.warn("Erro ao excluir imagem:", err.message);
          });
        } else {
          console.warn("Imagem não encontrada para exclusão:", imagePath);
        }
      });
    }

    await Vaga.findByIdAndDelete(vagaId);
    res.status(200).json({ message: "Vaga excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir vaga:", error);
    res.status(500).json({ message: "Erro ao excluir a vaga." });
  }
};


module.exports = {
  createVaga,
  listarVagas,
  editarVaga,
  deletarVaga
};
