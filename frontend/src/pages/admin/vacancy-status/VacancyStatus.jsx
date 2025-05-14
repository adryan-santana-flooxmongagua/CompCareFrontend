import React, { useEffect, useState } from "react";
import AdminSidebar from "../aside/Aside";
import { API_BASE_URL, API_BASE_IMAGE_URL } from "../../../config/api";
import FormVaga from "./forms/VacancyForm";
import "./VacancyStatus.css";

const StatusVaga = () => {
  const [vagaEditando, setVagaEditando] = useState(null);
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVagas = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vagas/vagas`);
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Formato inválido da resposta de vagas.");
      }

      // Obtenha o ID do hospital ou admin logado
      const userData = JSON.parse(localStorage.getItem("userData"));
      const hospitalId = userData?.hospitalId || userData?._id;

      // Filtra as vagas criadas pelo hospital logado
      const vagasFiltradas = data.filter(
        (vaga) => vaga.id_hospital === hospitalId
      );

      setVagas(vagasFiltradas);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVagas();
  }, []);

  const handleDelete = async (vagaId) => {
    if (!window.confirm("Tem certeza que deseja excluir esta vaga?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/vagas/vagas/${vagaId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao deletar vaga.");
      }

      // Atualiza a lista após deletar
      fetchVagas();
    } catch (error) {
      console.error("Erro ao deletar vaga:", error.message);
      alert("Erro ao deletar vaga.");
    }
  };

  const handleEdit = (vagaId) => {
    const vagaSelecionada = vagas.find((vaga) => vaga._id === vagaId);
    setVagaEditando(vagaSelecionada);
  };

  const handleSave = () => {
    fetchVagas(); // Recarrega a lista
    setVagaEditando(null); // Fecha o formulário
  };

  const handleCloseForm = () => {
    setVagaEditando(null);
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        {vagaEditando ? (
          <FormVaga
            vagaParaEditar={vagaEditando}
            onClose={handleCloseForm}
            onSave={handleSave}
          />
        ) : (
          <div className="usuarios-container">
            <h2>Status das Vagas</h2>

            {loading ? (
              <p>Carregando vagas...</p>
            ) : vagas.length === 0 ? (
              <p>Não há vagas disponíveis.</p>
            ) : (
              <div className="vagas-list">
                {vagas.map((vaga) => (
                  <div key={vaga._id} className="vaga-card">
                    {vaga.ds_imagem_url ? (
                      <img
                        src={`${API_BASE_IMAGE_URL}${vaga.ds_imagem_url}`}
                        alt={vaga.nm_titulo}
                      />
                    ) : (
                      <div className="vaga-no-image">Sem imagem</div>
                    )}
                    <div className="vaga-info">
                      <h3>{vaga.nm_titulo}</h3>
                      <p>Tipo: {vaga.tp_vaga}</p>
                      <p>Status: {vaga.st_status}</p>
                      <p>Pontos: {vaga.vl_pontos}</p>
                      <p>Qtd. Vagas: {vaga.qt_vagas}</p>

                      <p className="vaga-candidatos">
                        Voluntários Alistados: {vaga.candidatos?.length || 0}
                      </p>
                      <div className="vaga-actions">
                        <button
                          onClick={() => handleEdit(vaga._id)}
                          className="edit-btn"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(vaga._id)}
                          className="delete-btn"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StatusVaga;
