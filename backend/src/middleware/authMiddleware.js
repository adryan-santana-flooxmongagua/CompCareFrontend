require('dotenv').config();
const jwt = require('jsonwebtoken');
const { AdminUser, VolunteerUser } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoAqui';

// Middleware de autenticação
const autenticarUsuario = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    let user;
    switch (decoded.role) {
      case 'admin':
        user = await AdminUser.findById(decoded.id);
        break;
      case 'voluntario':
        user = await VolunteerUser.findById(decoded.id);
        break;
      default:
        return res.status(403).json({ message: 'Tipo de usuário inválido.' });
    }

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    req.user = {
      ...user.toObject(),
      role: decoded.role,
      hospitalId: decoded.hospitalId || null
    };

    next();
  } catch (error) {
    console.error('Erro na verificação do token JWT:', error.message);
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

// Middleware para verificar se o usuário é admin
const verificarAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito a administradores.' });
  }

  if (!req.user.hospitalId) {
    return res.status(403).json({ message: 'Administrador não está vinculado a um hospital.' });
  }

  next();
};

module.exports = {
  autenticarUsuario,
  verificarAdmin,
};
