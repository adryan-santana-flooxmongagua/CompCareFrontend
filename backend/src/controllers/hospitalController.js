const Hospital = require('../models/Hospital');

// GET /api/hospitais
const listarHospitais = async (req, res) => {
  try {
    const hospitais = await Hospital.find().sort({ createdAt: -1 });
    res.status(200).json(hospitais);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar hospitais', error: err });
  }
};

module.exports = { listarHospitais };
