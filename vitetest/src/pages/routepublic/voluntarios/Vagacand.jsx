import React, { useEffect, useState } from 'react';
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../../config/api";
import './style/Vagacad.css';

const VagasCandidatadas = () => {
  const [candidaturas, setCandidaturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidaturas = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          alert('Você precisa estar logado.');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/candidaturas/minhas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setCandidaturas(data);
      } catch (error) {
        console.error('Erro ao buscar candidaturas:', error);
        alert('Erro ao carregar candidaturas.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidaturas();
  }, []);

  return (
    <div className="vagas-container">
      <h2 className="vagas-title">Minhas Candidaturas</h2>

      {loading ? (
        <p className="vagas-loading">Carregando suas candidaturas...</p>
      ) : candidaturas.length === 0 ? (
        <p className="vagas-empty">Você ainda não se candidatou a nenhuma vaga.</p>
      ) : (
        <div className="vagas-list">
          {candidaturas.map((candidatura) => (
            <div key={candidatura._id} className="vaga-card">
              <div className="vaga-info">
                {candidatura.vaga?.imageUrl && (
                  <img
                    src={`${API_BASE_IMAGE_URL}${candidatura.vaga.imageUrl}`}
                    alt={candidatura.vaga.titulodavaga || 'Vaga desconhecida'}
                    className="vaga-image"
                  />
                )}
                <h3 className="vaga-title">{candidatura.vaga?.titulodavaga || 'Vaga desconhecida'}</h3>
                <p className="vaga-desc">{candidatura.vaga?.descricao || 'Sem descrição'}</p>
                <p className="vaga-status">Status da candidatura: <strong>{candidatura.status}</strong></p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VagasCandidatadas;
