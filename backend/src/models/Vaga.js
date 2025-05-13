const mongoose = require("mongoose");

const vagaSchema = new mongoose.Schema({
  nm_titulo: { type: String, required: true },
  ds_descricao: { type: String, required: true },
  tp_vaga: { type: String, required: true },
  vl_pontos: { type: Number, required: true },
  id_hospital: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true },
  st_status: { type: String, enum: ['ativa', 'inativa'], default: 'ativa' },
  qt_vagas: { type: Number, required: true },
  ds_imagem_url: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Vaga", vagaSchema);
