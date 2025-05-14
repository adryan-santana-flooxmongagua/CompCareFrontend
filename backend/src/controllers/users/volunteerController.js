const { VolunteerUser } = require('../../models');
const mongoose = require('mongoose');

exports.listarVoluntarios = async (req, res) => {
  try {
    const voluntarios = await VolunteerUser.find({ role: 'volunteer' }, '-password');
    res.json(voluntarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar voluntários' });
  }
};

exports.deletarVoluntario = async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    if (req.user._id.toString() === id) {
      return res.status(403).json({ error: 'Você não pode excluir seu próprio usuário.' });
    }

    const voluntario = await VolunteerUser.findOneAndDelete({ _id: id, role: 'volunteer' });

    if (!voluntario) {
      return res.status(404).json({ error: 'Voluntário não encontrado' });
    }

    res.json({ message: 'Voluntário deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar voluntário' });
  }
};
