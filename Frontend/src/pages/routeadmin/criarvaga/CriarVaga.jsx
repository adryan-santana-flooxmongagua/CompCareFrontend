import React, { useState } from "react";
import AdminSidebar from '../aside/AdminSidebar';
import './CriarVaga.css';

const CriarVaga = () => {
  const [formData, setFormData] = useState({
    titulodavaga: "",
    descricao: "",
    tipo_vaga: "",
    vl_pontos: "",
    id_hospital: "",
    status: "ativa",
    qtd_vagas: "",
    image: null,
  });

  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const data = new FormData();
    data.append("titulodavaga", formData.titulodavaga);
    data.append("descricao", formData.descricao);
    data.append("tipo_vaga", formData.tipo_vaga);
    data.append("vl_pontos", formData.vl_pontos);
    data.append("id_hospital", formData.id_hospital);
    data.append("status", formData.status);
    data.append("qtd_vagas", formData.qtd_vagas);
    if (formData.image) {
      data.append("image", formData.image);
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/vagas/vagas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,        
        },
        body: data,
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMensagem("Vaga cadastrada com sucesso!");
        setFormData({
          titulodavaga: "",
          descricao: "",
          tipo_vaga: "",
          vl_pontos: "",
          id_hospital: "",
          status: "ativa",
          qtd_vagas: "",
          image: null,
        });
      } else {
        setMensagem(`Erro: ${result.message || "Falha ao cadastrar vaga"}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar vaga:", error);
      setMensagem(`Erro ao cadastrar vaga: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <div className="vaga-container">
          <h2>Cadastrar Nova Vaga</h2>
          <form className="vaga-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Imagem</label>
              <input type="file" name="image" onChange={handleChange} accept="image/*" />
            </div>

            <div className="form-group">
              <label>Título da Vaga</label>
              <input type="text" name="titulodavaga" value={formData.titulodavaga} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <textarea name="descricao" value={formData.descricao} onChange={handleChange} required></textarea>
            </div>

            <div className="form-group">
              <label>Tipo de Vaga</label>
              <select name="tipo_vaga" value={formData.tipo_vaga} onChange={handleChange} required>
                <option value="">Selecione o tipo</option>
                <option value="cuidados com idosos">Cuidados com idosos</option>
                <option value="cuidados com jovens">Cuidados com jovens</option>
                <option value="comunicação">Comunicação</option>
                <option value="administração">Administração</option>
                <option value="educação">Educação</option>
                <option value="limpeza">Limpeza</option>
                <option value="alimentação">Alimentação</option>
              </select>
            </div>

            <div className="form-group">
              <label>Valor em Pontos</label>
              <input type="number" name="vl_pontos" value={formData.vl_pontos} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>ID do Hospital</label>
              <input type="text" name="id_hospital" value={formData.id_hospital} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="ativa">Ativa</option>
                <option value="pendente">Pendente</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </div>

            <div className="form-group">
              <label>Quantidade de Vagas</label>
              <input type="number" name="qtd_vagas" value={formData.qtd_vagas} onChange={handleChange} required />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar Vaga"}
            </button>
          </form>
          {mensagem && <p>{mensagem}</p>}
        </div>
      </main>
    </div>
  );
};

export default CriarVaga;
