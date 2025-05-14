const express = require('express');
const router = express.Router();
const { getAdminById } = require('../controllers/users/adminController');
const { autenticarUsuario } = require('../middleware/authMiddleware');

router.get('/:id', autenticarUsuario, getAdminById);

module.exports = router;
