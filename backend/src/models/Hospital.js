const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  nm_nome: { type: String, required: true },
  ds_endereco: { type: String },
  ds_telefone: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
