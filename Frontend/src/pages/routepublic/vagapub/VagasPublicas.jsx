import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';
import './Vagapub.css';

const VagasPublicas = () => {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const vagasCollection = collection(db, 'vagas');
        const vagasSnapshot = await getDocs(vagasCollection);
        const vagasList = vagasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVagas(vagasList);
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      }
    };

    fetchVagas();
  }, []);

  const handleCandidatar = (vagaId) => {
    alert(`Você se candidatou à vaga com ID: ${vagaId}`);
    //adicionar lógica para enviar a candidatura ao Firestore, etc.
  };

  return (
    <div className="vagas-container">
      <h2 className="vagas-title">Vagas Disponíveis</h2>

      {vagas.length === 0 ? (
        <p className="vagas-empty">Não há vagas disponíveis no momento.</p>
      ) : (
        <div className="vagas-list">
          {vagas.map(vaga => (
            <div key={vaga.id} className="vaga-card">
              {vaga.imageUrl && (
                <img
                  src={vaga.imageUrl}
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
                  onClick={() => handleCandidatar(vaga.id)}
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
