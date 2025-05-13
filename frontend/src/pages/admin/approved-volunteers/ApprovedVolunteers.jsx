import React, { useEffect, useState } from "react";
import AdminSidebar from "../aside/Aside";
import { API_BASE_URL } from "../../../config/api";
import "./ApprovedVolunteers.css"; 

const CandidatosConfirmados = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/candidaturas/confirmados`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          if (!response.ok) {
            throw new Error(data.message || "Erro ao buscar candidatos confirmados");
          }
          setCandidatos(data);
        } catch (e) {
          console.error("Resposta inesperada (não JSON):", text);
          throw new Error("Resposta inválida do servidor.");
        }
      } catch (error) {
        console.error("Erro ao buscar candidatos:", error);
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCandidatos();
  }, [token]);

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <div className="candidatos-container">
          <h2>Candidatos Confirmados</h2>

          {loading ? (
            <p>Carregando candidatos...</p>
          ) : erro ? (
            <p className="error">{erro}</p>
          ) : candidatos.length === 0 ? (
            <p>Nenhum candidato confirmado.</p>
          ) : (
            <table className="candidatos-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Serviço</th>
                  <th>Data</th>
                  <th>Erros</th>
                </tr>
              </thead>
              <tbody>
                {candidatos.map((cand, index) => (
                  <tr key={index}>
                    <td>{cand.nome}</td>
                    <td>{cand.fonte}</td>
                    <td>{new Date(cand.timestamp).toLocaleString()}</td>
                    <td>{cand.erros || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default CandidatosConfirmados;
