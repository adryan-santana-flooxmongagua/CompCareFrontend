import React, { useEffect, useState } from "react";
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../../config/api";
import "./PublicVacancy.css";

const VagasPublicas = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // Estado para armazenar o papel do usuário

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/vagas/publicas`);
        const data = await response.json();
        console.log("Vagas recebidas:", data);
        const vagasAtivas = data.filter((vaga) => vaga.st_status === "ativa");
        setVagas(vagasAtivas);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      } finally {
        setLoading(false);
      }
    };

    // Função para decodificar o token JWT e obter o papel do usuário
    const fetchUserRole = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decodifica o payload do JWT
          setUserRole(decodedToken.role); // Supondo que o campo "role" esteja presente no token
        } catch (error) {
          console.error("Erro ao decodificar o token:", error);
        }
      }
    };

    fetchVagas();
    fetchUserRole(); // Chama a função para obter o papel do usuário
  }, []);

  const handleCandidatar = async (vagaId) => {
    if (userRole !== "volunteer") {
      alert("Você precisa ser um voluntário para se candidatar a vagas.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado para se candidatar.");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/candidaturas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ vagaId }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message); // Sucesso
      } else {
        alert(result.message); // Já se candidatou ou outro erro tratado
      }
    } catch (error) {
      console.error("Erro ao se candidatar:", error);
      alert("Erro ao se candidatar.");
    }
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
          {vagas.map((vaga) => (
            <div key={vaga._id} className="vaga-card">
              {vaga.ds_imagem_url && (
                <img
                  src={`${API_BASE_IMAGE_URL}${vaga.ds_imagem_url}`}
                  alt={vaga.nm_titulo}
                  className="vaga-image"
                />
              )}
              <div className="vaga-info">
                <h3 className="vaga-title">{vaga.nm_titulo}</h3>
                <p className="vaga-desc">{vaga.ds_descricao}</p>
                <p className="vaga-type">Tipo: {vaga.tp_vaga}</p>
                <p className="vaga-status">Status: {vaga.st_status}</p>
                <p className="vaga-points">Pontos: {vaga.vl_pontos}</p>
                <p className="vaga-quantity">Vagas: {vaga.qt_vagas}</p>
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
