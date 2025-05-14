const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createVaga,
  listarVagas,
  listarVagasPublicas,
  editarVaga,
  deletarVaga,
} = require("../controllers/vagaController");

// Rotas com upload de imagem
router.post("/vagas", upload.single("image"), createVaga);
router.put("/vagas/:id", upload.single("image"), editarVaga);

// Rotas simples
router.get("/vagas", listarVagas);
router.get("/publicas", listarVagasPublicas);
router.delete("/vagas/:id", deletarVaga);

module.exports = router;
