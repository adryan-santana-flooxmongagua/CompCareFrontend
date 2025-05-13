const { VolunteerUser } = require('../models');
const mongoose = require('mongoose');

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await VolunteerUser.find({}, '-password');
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

exports.deletarUsuario = async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    if (req.user._id.toString() === id) {
      return res.status(403).json({ error: 'Você não pode excluir seu próprio usuário.' });
    }

    const usuario = await VolunteerUser.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
};
