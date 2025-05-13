require('dotenv').config();
const jwt = require('jsonwebtoken');
const { AdminUser, VolunteerUser } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoAqui';

const autenticarUsuario = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado. Acesso negado.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user =
      decoded.role === 'admin'
        ? await AdminUser.findById(decoded.id)
        : await VolunteerUser.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    req.user = user;
    req.user.role = decoded.role;
    if (decoded.role === 'admin') {
      req.user.hospitalId = decoded.hospitalId;
    }

    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error.message);
    return res.status(401).json({ message: 'Token inválido. Acesso negado.' });
  }
};


const verificarAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

module.exports = {
  autenticarUsuario,
  verificarAdmin,
};
