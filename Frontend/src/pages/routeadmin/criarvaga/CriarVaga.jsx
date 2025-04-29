import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import './CriarVaga.css';

const CriarVaga = () => {
  const [formData, setFormData] = useState({
    titulodavaga: '',
    descricao: '',
    tipo_vaga: '',
    vl_pontos: '',
    id_hospital: '',
    status: 'ativa',
    qtd_vagas: ''
  });

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'vagas'), {
        ...formData,
        vl_pontos: Number(formData.vl_pontos),
        qtd_vagas: Number(formData.qtd_vagas),
        iddavaga: crypto.randomUUID(), // ID único para relacionar nas candidaturas
      });

      setMensagem('Vaga cadastrada com sucesso!');
      setFormData({
        titulodavaga: '',
        descricao: '',
        tipo_vaga: '',
        vl_pontos: '',
        id_hospital: '',
        status: 'ativa',
        qtd_vagas: ''
      });
    } catch (error) {
      console.error("Erro ao cadastrar vaga: ", error);
      setMensagem(`Erro ao cadastrar vaga: ${error.message}`);
    }
  };

  return (
    <div className="vaga-container">
      <h2>Cadastrar Nova Vaga</h2>
      <form className="vaga-form" onSubmit={handleSubmit}>
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
          <input
            type="text"
            name="tipo_vaga"
            value={formData.tipo_vaga}
            onChange={handleChange}
            required
          />
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

        <button type="submit" className="submit-btn">Cadastrar Vaga</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default CriarVaga;
