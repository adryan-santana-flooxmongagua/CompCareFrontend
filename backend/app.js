require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();
const port = process.env.PORT || 5000;

// Conectar ao banco
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:3000';
app.use(cors({ credentials: true, origin: allowedOrigin }));

// Arquivos estáticos (ex: imagens de uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
const router = require('./src/routes/Router');
app.use('/api', router);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
