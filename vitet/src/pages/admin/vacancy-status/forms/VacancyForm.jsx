import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../../config/api";
import "./VacancyForm.css";

const FormVaga = ({ vagaParaEditar, onClose, onSave }) => {
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

  useEffect(() => {
    if (vagaParaEditar) {
      setFormData({
        titulodavaga: vagaParaEditar.titulodavaga || "",
        descricao: vagaParaEditar.descricao || "",
        tipo_vaga: vagaParaEditar.tipo_vaga || "",
        vl_pontos: vagaParaEditar.vl_pontos || "",
        id_hospital: vagaParaEditar.id_hospital || "",
        status: vagaParaEditar.status || "ativa",
        qtd_vagas: vagaParaEditar.qtd_vagas || "",
        image: null,
      });
    }
  }, [vagaParaEditar]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id_admin = localStorage.getItem("userId");
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    data.append("id_admin", id_admin);

    const endpoint = vagaParaEditar
      ? `${API_BASE_URL}/vagas/vagas/${vagaParaEditar._id}`
      : `${API_BASE_URL}/vagas/vagas`;

    try {
      const response = await fetch(endpoint, {
        method: vagaParaEditar ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setMensagem("Vaga salva com sucesso!");
        onSave();
        onClose();
      } else {
        setMensagem(result.message || "Erro ao salvar vaga.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("Erro ao salvar vaga.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-vaga-overlay">
      <div className="vaga-container">
        <h2>{vagaParaEditar ? "Editar Vaga" : "Cadastrar Vaga"}</h2>
        <form className="vaga-form" onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-left">
              <div className="image-upload">
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="image-preview"
                  />
                ) : (
                  <div className="placeholder-image">Imagem da vaga</div>
                )}
                <label htmlFor="image-upload" className="custom-file-upload">
                  Selecionar imagem
                </label>
                <input
                  id="image-upload"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="form-right">
              <div className="form-group">
                <label>Título da vaga</label>
                <input
                  name="titulodavaga"
                  value={formData.titulodavaga}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Tipo</label>
                  <input
                    name="tipo_vaga"
                    value={formData.tipo_vaga}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group half">
                  <label>Pontos</label>
                  <input
                    name="vl_pontos"
                    type="number"
                    value={formData.vl_pontos}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Hospital ID</label>
                  <input
                    name="id_hospital"
                    value={formData.id_hospital}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group half">
                  <label>Quantidade de Vagas</label>
                  <input
                    name="qtd_vagas"
                    type="number"
                    value={formData.qtd_vagas}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="ativa">Ativa</option>
                  <option value="inativa">Inativa</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Vaga"}
          </button>
        </form>
        {mensagem && <p>{mensagem}</p>}
        <button onClick={onClose} className="submit-btn" style={{ backgroundColor: "#aaa" }}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default FormVaga;
