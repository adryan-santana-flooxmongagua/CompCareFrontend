const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  id_voluntario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vl_pontos: { type: Number, required: true },
  dt_mes_ano: { type: String, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
