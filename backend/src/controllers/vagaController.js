const Vaga = require("../models/Vaga");
const fs = require("fs");
const path = require("path");

const createVaga = async (req, res) => {
  try {
    const { nm_titulo, ds_descricao, tp_vaga, vl_pontos, id_hospital, qt_vagas } = req.body;

    if (!nm_titulo || !ds_descricao || !tp_vaga || !vl_pontos || !id_hospital || !qt_vagas) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    const vaga = new Vaga({
      nm_titulo,
      ds_descricao,
      tp_vaga,
      vl_pontos: Number(vl_pontos),
      id_hospital,
      qt_vagas: Number(qt_vagas),
      ds_imagem_url: req.file ? `uploads/${req.file.filename}` : "",
    });

    await vaga.save();
    res.status(201).json(vaga);
  } catch (error) {
    console.error("Erro ao criar vaga:", error);
    res.status(500).json({ message: "Erro ao criar vaga", error });
  }
};

const listarVagas = async (req, res) => {
  try {
    const hospitalId = req.user?.hospitalId;
    if (!hospitalId) return res.status(403).json({ error: "Acesso negado." });

    const vagas = await Vaga.find({ id_hospital: hospitalId }).sort({ createdAt: -1 });
    res.status(200).json(vagas);
  } catch (error) {
    console.error("Erro ao listar vagas:", error);
    res.status(500).json({ error: "Erro ao listar vagas" });
  }
};

const listarVagasPublicas = async (_req, res) => {
  try {
    const vagas = await Vaga.find({ st_status: "ativa" }).sort({ createdAt: -1 });
    res.status(200).json(vagas);
  } catch (error) {
    console.error("Erro ao listar vagas públicas:", error);
    res.status(500).json({ error: "Erro ao listar vagas públicas" });
  }
};

const editarVaga = async (req, res) => {
  try {
    const vagaId = req.params.id;
    const updateData = req.body;

    if (req.file) {
      updateData.ds_imagem_url = `uploads/${req.file.filename}`;
    }

    const vaga = await Vaga.findByIdAndUpdate(vagaId, updateData, { new: true });
    if (!vaga) return res.status(404).json({ error: "Vaga não encontrada" });

    res.status(200).json({ message: "Vaga atualizada", vaga });
  } catch (error) {
    console.error("Erro ao editar vaga:", error);
    res.status(500).json({ error: "Erro ao editar vaga" });
  }
};

const deletarVaga = async (req, res) => {
  try {
    const vagaId = req.params.id;
    const vaga = await Vaga.findById(vagaId);
    if (!vaga) return res.status(404).json({ message: "Vaga não encontrada" });

    if (vaga.ds_imagem_url) {
      const imgPath = path.join(__dirname, "../../", vaga.ds_imagem_url);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Vaga.findByIdAndDelete(vagaId);
    res.status(200).json({ message: "Vaga excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir vaga:", error);
    res.status(500).json({ message: "Erro ao excluir vaga" });
  }
};

module.exports = {
  createVaga,
  listarVagas,
  listarVagasPublicas,
  editarVaga,
  deletarVaga,
};
