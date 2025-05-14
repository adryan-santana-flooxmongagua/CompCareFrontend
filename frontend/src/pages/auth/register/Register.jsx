import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [hospitalId, setHospitalId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!name || !email || !password || !confirmPassword) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          ...(role === "admin" && { hospitalId }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Erro ao criar conta.");
        return;
      }

      navigate("/login");
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Crie sua conta</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-input-group">
          <label className="login-label">Nome</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
            placeholder="Seu nome completo"
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">E-mail</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">Senha</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="********"
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">Confirmar Senha</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="login-input"
            placeholder="********"
          />
        </div>
        {role === "admin" && (
          <div className="login-input-group">
            <label className="login-label">ID do Hospital</label>
            <input
              type="text"
              required
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              className="login-input"
              placeholder="Digite o ID do hospital"
            />
          </div>
        )}
        <div className="login-input-group">
          <label className="login-label">Tipo de Usuário</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="login-input"
          >
            <option value="volunteer">Voluntário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        {erro && <p className="login-error">{erro}</p>}

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p className="login-footer">
          Já tem uma conta?{" "}
          <Link to="/login" className="login-link">
            Faça login aqui
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
