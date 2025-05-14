const express = require('express');
const router = express.Router();

const vagaRoutes = require('./vagaRoutes');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const candidaturaRoutes = require('./candidaturaRoutes');
const hospitalRoutes = require('./hospitalRoutes');
const adminRoutes = require('./admin.routes');


// Rota de teste
router.get('/', (req, res) => {
  res.send('API Working!');
});

// Agrupamento das rotas
router.use('/vagas', vagaRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/candidaturas', candidaturaRoutes);
router.use('/hospitais', hospitalRoutes);
router.use('/admins', adminRoutes);


module.exports = router;
