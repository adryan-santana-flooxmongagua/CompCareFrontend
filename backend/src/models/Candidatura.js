const mongoose = require('mongoose');

const candidaturaSchema = new mongoose.Schema({
  id_vaga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaga',
    required: true,
  },
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  st_status: {
    type: String,
    enum: ['pendente', 'aprovado', 'recusado', 'confirmado'],
    default: 'pendente',
  },
  nr_erros: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Candidatura', candidaturaSchema);
