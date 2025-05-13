const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const conn = async () => {
  if (!dbUser || !dbPassword) {
    throw new Error("DB_USER e DB_PASSWORD devem estar definidos no arquivo .env");
  }

  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.0rftkp8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("✅ Conectado ao banco de dados com sucesso");
    return dbConn;
  } catch (error) {
    console.error("❌ Erro ao conectar no banco:", error);
    process.exit(1); // Encerra o processo com erro
  }
};

module.exports = conn;
