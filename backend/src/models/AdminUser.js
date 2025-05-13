const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  nm_nome: { type: String, required: true },
  ds_email: { type: String, required: true, unique: true },
  ds_senha: { type: String, required: true },
  id_hospital: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Hospital', 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('AdminUser', adminUserSchema);
