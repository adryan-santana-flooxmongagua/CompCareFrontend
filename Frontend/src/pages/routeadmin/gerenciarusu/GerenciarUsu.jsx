import React, { useEffect, useState } from "react";
import AdminSidebar from "../aside/AdminSidebar";
import "./GerenciarUsuarios.css";

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao buscar usuários");
        }

        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [token]);

  const handleExcluir = async (id) => {
    if (!window.confirm("Deseja realmente excluir este usuário?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao excluir usuário");
      }

      setUsuarios((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      setErro(error.message);
    }
  };

  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <div className="usuarios-container">
          <h2>Gerenciar Voluntarios Cadastrados</h2>

          {loading ? (
            <p>Carregando usuários...</p>
          ) : erro ? (
            <p className="error">{erro}</p>
          ) : usuarios.length === 0 ? (
            <p>Nenhum usuário encontrado.</p>
          ) : (
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Tipo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleExcluir(user._id)}>Excluir</button>
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

export default GerenciarUsuarios;
