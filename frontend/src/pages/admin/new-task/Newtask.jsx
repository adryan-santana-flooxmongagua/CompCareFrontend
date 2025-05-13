import React, { useState, useEffect } from "react";
import AdminSidebar from "../aside/Aside";
import { API_BASE_URL } from "../../../config/api";
import "./Newtask.css";

const NewTask = () => {
  const [vagas, setVagas] = useState([]);
  const [vagaSelecionada, setVagaSelecionada] = useState("");
  const [descricao, setDescricao] = useState("");
  const [frequencia, setFrequencia] = useState("diaria");
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const fetchVagas = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/vagas/vagas`);
        const data = await res.json();
        setVagas(data);
      } catch (error) {
        console.error("Erro ao buscar vagas:", error);
      }
    };
    fetchVagas();
  }, []);

  useEffect(() => {
    const fetchTarefas = async () => {
      if (!vagaSelecionada) return;
    
      try {
        const token = localStorage.getItem("token");
    
        const res = await fetch(`${API_BASE_URL}/tasks/vaga/${vagaSelecionada}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data = await res.json();
        setTarefas(data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };

    fetchTarefas();
  }, [vagaSelecionada]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/tasks/criar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vagaId: vagaSelecionada,
          descricao,
          frequencia,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao criar tarefa");
      }

      alert("Tarefa criada com sucesso!");
      setDescricao("");
      setFrequencia("diaria");

      // Atualiza tarefas após criação
      const atualizadas = await fetch(`${API_BASE_URL}/tasks/vaga/${vagaSelecionada}`);
      const data = await atualizadas.json();
      setTarefas(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar tarefa.");
    }
  };


  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error("Erro ao excluir tarefa");
      }
  
      // Atualiza a lista após excluir
      const atualizadas = await fetch(`${API_BASE_URL}/tasks/vaga/${vagaSelecionada}`);
      const data = await atualizadas.json();
      setTarefas(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir tarefa.");
    }
  };
  
  const handleEdit = (task) => {
    setDescricao(task.descricao);
    setFrequencia(task.frequencia);
  };

  

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <div className="new-task-container">
          <div className="new-task-form">
            <h2 className="form-title">Gerenciar Tarefas por Vaga</h2>
            <p className="form-description">
              Crie tarefas específicas para cada vaga e acompanhe as já cadastradas abaixo.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Vaga</label>
                <select
                  value={vagaSelecionada}
                  onChange={(e) => setVagaSelecionada(e.target.value)}
                  required
                >
                  <option value="">Selecione uma vaga</option>
                  {vagas.map((vaga) => (
                    <option key={vaga._id} value={vaga._id}>
                      {vaga.titulodavaga}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Descrição da Tarefa</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="form-group">
                <label>Frequência</label>
                <select
                  value={frequencia}
                  onChange={(e) => setFrequencia(e.target.value)}
                  required
                >
                  <option value="diaria">Diária</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensal">Mensal</option>
                </select>
              </div>

              <button type="submit" className="submit-btn">
                Criar Tarefa
              </button>
            </form>

            {vagaSelecionada && (
              <div className="task-list">
                <h3 className="task-list-title">Tarefas da vaga selecionada</h3>
                {tarefas.length > 0 ? (
                 <ul>
                 {tarefas.map((task) => (
                   <li key={task._id}>
                     <strong>Frequência:</strong> {task.frequencia} <br />
                     <strong>Descrição:</strong> {task.descricao} <br />
                     <button onClick={() => handleEdit(task)}>Editar</button>
                     <button onClick={() => handleDelete(task._id)}>Excluir</button>
                   </li>
                 ))}
               </ul>
                ) : (
                  <p>Nenhuma tarefa cadastrada para esta vaga.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewTask;
