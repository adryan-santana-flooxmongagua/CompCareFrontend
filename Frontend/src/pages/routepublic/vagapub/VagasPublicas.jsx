import React, { useEffect, useState } from 'react';
import './Vagapub.css';

const VagasPublicas = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/vagas/vagas");
        const data = await response.json();
        const vagasAtivas = data.filter(vaga => vaga.status === "ativa");
        setVagas(vagasAtivas);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVagas();
  }, []);

  const handleCandidatar = async (vagaId) => {
    alert(`Você se candidatou à vaga com ID: ${vagaId}`);

    // Exemplo futuro para POST:
    /*
    try {
      const response = await fetch("http://localhost:5000/api/candidaturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vagaId, userId: "id_do_usuario_aqui" }),
      });

      const result = await response.json();
      alert("Candidatura enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao se candidatar:", error);
      alert("Erro ao se candidatar.");
    }
    */
  };

  return (
    <div className="vagas-container">
      <h2 className="vagas-title">Vagas Disponíveis</h2>

      {loading ? (
        <p className="vagas-loading">Carregando vagas...</p>
      ) : vagas.length === 0 ? (
        <p className="vagas-empty">Não há vagas disponíveis no momento.</p>
      ) : (
        <div className="vagas-list">
          {vagas.map(vaga => (
            <div key={vaga._id} className="vaga-card">
              {vaga.imageUrl && (
                <img
                  src={`http://localhost:5000${vaga.imageUrl}`}
                  alt={vaga.titulodavaga}
                  className="vaga-image"
                />
              )}
              <div className="vaga-info">
                <h3 className="vaga-title">{vaga.titulodavaga}</h3>
                <p className="vaga-desc">{vaga.descricao}</p>
                <p className="vaga-type">Tipo: {vaga.tipo_vaga}</p>
                <p className="vaga-status">Status: {vaga.status}</p>
                <p className="vaga-points">Pontos: {vaga.vl_pontos}</p>
                <p className="vaga-quantity">Vagas: {vaga.qtd_vagas}</p>
                <button
                  className="vaga-btn"
                  onClick={() => handleCandidatar(vaga._id)}
                >
                  Quero me candidatar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VagasPublicas;
