const { AdminUser } = require('../../models');

const getAdminById = async (req, res) => {
  try {
    const admin = await AdminUser.findById(req.params.id).select('nm_nome id_hospital');

    if (!admin) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error("Erro ao buscar administrador:", error);
    res.status(500).json({ message: 'Erro ao buscar administrador' });
  }
};

module.exports = {
  getAdminById,
};
