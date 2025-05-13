import React, { useEffect, useState } from 'react';
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../../config/api";
import './ApplyVacancy.css';

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

  const confirmarParticipacao = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/candidaturas/confirmar/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Erro ao confirmar participação");

      setCandidaturas((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: 'confirmado' } : c))
      );
    } catch (err) {
      alert("Erro ao confirmar participação");
    }
  };

  const excluirCandidatura = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/candidaturas/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Erro ao excluir candidatura");

      setCandidaturas((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Erro ao excluir candidatura");
    }
  };

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

                {candidatura.status === 'aprovado' && (
                  <button className="vaga-btn confirmar" onClick={() => confirmarParticipacao(candidatura._id)}>
                    Confirmar Participação
                  </button>
                )}

                {candidatura.status === 'recusada' && (
                 <button className="vaga-btn excluir" onClick={() => excluirCandidatura(candidatura._id)}>
                 Excluir Candidatura
               </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VagasCandidatadas;
