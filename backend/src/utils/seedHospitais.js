const Hospital = require('../models/Hospital');

const hospitaisFicticios = [
  {
    nm_nome: "Hospital São Lucas",
    ds_endereco: "Rua das Palmeiras, 123 - Centro, São Paulo - SP",
    ds_telefone: "(11) 3456-7890"
  },
  {
    nm_nome: "Clínica Vida Nova",
    ds_endereco: "Av. Brasil, 456 - Jardim América, Rio de Janeiro - RJ",
    ds_telefone: "(21) 9876-5432"
  },
  {
    nm_nome: "Instituto Santa Clara",
    ds_endereco: "Rua Aurora Boreal, 789 - Boa Vista, Recife - PE",
    ds_telefone: "(81) 3344-5566"
  },
  {
    nm_nome: "Hospital Esperança",
    ds_endereco: "Av. da Liberdade, 1010 - Liberdade, Salvador - BA",
    ds_telefone: "(71) 3222-1122"
  },
  {
    nm_nome: "Centro Médico Harmonia",
    ds_endereco: "Rua das Acácias, 202 - Zona Sul, Porto Alegre - RS",
    ds_telefone: "(51) 4002-8922"
  }
];

async function seedHospitais() {
  try {
    const total = await Hospital.countDocuments();
    if (total === 0) {
      await Hospital.insertMany(hospitaisFicticios);
      console.log('✅ Hospitais inseridos com sucesso!');
    } else {
      console.log('ℹ️  Hospitais já existem no banco.');
    }
  } catch (err) {
    console.error('❌ Erro ao inserir hospitais:', err);
  }
}

module.exports = seedHospitais;
