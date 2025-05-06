import React, { useEffect, useState } from "react";
import AdminSidebar from "../aside/AdminSidebar";
import { API_BASE_URL } from "../../../config/api";
import "./AprovarVoluntarios.css";

const AprovarVoluntarios = () => {
  const [candidaturas, setCandidaturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCandidaturasPendentes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/candidaturas/pendentes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Erro ao buscar candidaturas");

        setCandidaturas(data);
      } catch (error) {
        console.error("Erro ao buscar candidaturas:", error);
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidaturasPendentes();
  }, [token]);

  const handleAprovar = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/candidaturas/aprovar/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Erro ao aprovar candidatura");

      // Remove do estado após aprovação
      setCandidaturas((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Erro ao aprovar candidatura:", error);
      setErro(error.message);
    }
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <div className="usuarios-container">
          <h2>Candidaturas Pendentes de Aprovação</h2>

          {loading ? (
            <p>Carregando candidaturas...</p>
          ) : erro ? (
            <p className="error">{erro}</p>
          ) : candidaturas.length === 0 ? (
            <p>Nenhuma candidatura pendente.</p>
          ) : (
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Voluntário</th>
                  <th>Email</th>
                  <th>Vaga</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {candidaturas.map((c) => (
                  <tr key={c._id}>
                    <td>{c.userId?.name || "N/A"}</td>
                    <td>{c.userId?.email || "N/A"}</td>
                    <td>{c.vagaId?.titulodavaga || "Vaga desconhecida"}</td>
                    <td>
                      <button onClick={() => handleAprovar(c._id)}>Aprovar</button>
                    </td>
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

export default AprovarVoluntarios;
