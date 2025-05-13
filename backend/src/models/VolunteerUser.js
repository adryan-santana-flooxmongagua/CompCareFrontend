const mongoose = require('mongoose');

const volunteerUserSchema = new mongoose.Schema({
  nm_nome: { type: String, required: true },
  ds_email: { type: String, required: true, unique: true },
  ds_senha: { type: String, required: true },
  vl_pontos: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('VolunteerUser', volunteerUserSchema);
