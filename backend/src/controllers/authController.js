const { AdminUser, VolunteerUser } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'admin';

exports.register = async (req, res) => {
  const { name, email, password, role, hospitalId } = req.body;

  try {
    const isAdmin = role === 'admin';
    const UserModel = isAdmin ? AdminUser : VolunteerUser;

    const existingUser = await UserModel.findOne({ ds_email: email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      nm_nome: name,
      ds_email: email,
      ds_senha: hashedPassword,
    };

    if (isAdmin) {
      if (!hospitalId) {
        return res.status(400).json({ error: 'hospitalId é obrigatório para administradores' });
      }

      userData.id_hospital = hospitalId;
    }

    const newUser = await UserModel.create(userData);

    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};
// Login de usuários (administradores e voluntários)
exports.login = async (req, res) => {
  const { email, password, hospitalId } = req.body;

  try {
    // Primeiro tenta buscar como admin (com hospitalId)
    const adminUser = await AdminUser.findOne({ ds_email: email });

    if (adminUser) {
      if (!hospitalId) {
        return res.status(400).json({ error: 'hospitalId é obrigatório para administradores' });
      }

      if (adminUser.id_hospital.toString() !== hospitalId) {
        return res.status(400).json({ error: 'Administrador não pertence a esse hospital' });
      }

      const isMatch = await bcrypt.compare(password, adminUser.ds_senha);
      if (!isMatch) {
        return res.status(400).json({ error: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { id: adminUser._id, role: 'admin', hospitalId },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      return res.status(200).json({
        token,
        user: {
          id: adminUser._id,
          name: adminUser.nm_nome,
          email: adminUser.ds_email,
          role: 'admin',
          hospitalId,
        },
      });
    }

    // Senão, tenta como voluntário
    const volunteerUser = await VolunteerUser.findOne({ ds_email: email });
    if (!volunteerUser) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, volunteerUser.ds_senha);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: volunteerUser._id, role: 'volunteer' },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      token,
      user: {
        id: volunteerUser._id,
        name: volunteerUser.nm_nome,
        email: volunteerUser.ds_email,
        role: 'volunteer',
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};