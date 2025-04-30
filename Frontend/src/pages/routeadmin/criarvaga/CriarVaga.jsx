import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../services/firebaseConfig";
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

    try {
      let imageUrl = "";

      if (formData.image) {
        const storageRef = ref(storage, `vagas/${crypto.randomUUID()}_${formData.image.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, formData.image);
        imageUrl = await getDownloadURL(uploadTask.ref);
      }

      const vagaData = {
        titulodavaga: formData.titulodavaga,
        descricao: formData.descricao,
        tipo_vaga: formData.tipo_vaga,
        vl_pontos: Number(formData.vl_pontos),
        id_hospital: formData.id_hospital,
        status: formData.status,
        qtd_vagas: Number(formData.qtd_vagas),
        iddavaga: crypto.randomUUID(),
        imageUrl,
      };

      await addDoc(collection(db, "vagas"), vagaData);

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
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
              />
            </div>

            <div className="form-group">
              <label>Título da Vaga</label>
              <input
                type="text"
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
              ></textarea>
            </div>

            <div className="form-group">
              <label>Tipo de Vaga</label>
              <select
                name="tipo_vaga"
                value={formData.tipo_vaga}
                onChange={handleChange}
                required
              >
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
              <input
                type="number"
                name="vl_pontos"
                value={formData.vl_pontos}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>ID do Hospital</label>
              <input
                type="text"
                name="id_hospital"
                value={formData.id_hospital}
                onChange={handleChange}
                required
              />
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
              <input
                type="number"
                name="qtd_vagas"
                value={formData.qtd_vagas}
                onChange={handleChange}
                required
              />
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