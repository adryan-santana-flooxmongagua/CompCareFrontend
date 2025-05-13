const express = require('express');
const router = express.Router();
const { listarHospitais } = require('../controllers/hospitalController');

// GET /api/hospitais
router.get('/', listarHospitais);

module.exports = router;