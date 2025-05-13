import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../config/api";
import "./Mytask.css";

const MyTasks = () => {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinhasTarefas = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/tasks/minhas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setTarefas(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        setLoading(false);
      }
    };

    fetchMinhasTarefas();
  }, []);

  return (
    <div className="my-tasks-container">
      <h2>Minhas Tarefas</h2>
      {loading ? (
        <p>Carregando tarefas...</p>
      ) : tarefas.length === 0 ? (
        <p>Você ainda não tem tarefas atribuídas.</p>
      ) : (
        <ul className="task-list">
          {tarefas.map((task) => (
            <li key={task._id} className="task-item">
              <strong>Vaga:</strong> {task.vagaId?.titulodavaga || "Vaga não encontrada"} <br />
              <strong>Descrição:</strong> {task.descricao} <br />
              <strong>Frequência:</strong> {task.frequencia} <br />
              <strong>Status:</strong>{" "}
              {task.atribuicoes.find((a) => a.userId._id === task.meuId)?.status || "pendente"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyTasks;
