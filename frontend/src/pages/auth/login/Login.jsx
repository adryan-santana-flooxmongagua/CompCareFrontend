import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [hospitalId, setHospitalId] = useState("");
  const [hospitais, setHospitais] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "admin") {
      fetch(`${API_BASE_URL}/hospitais`)
        .then((res) => res.json())
        .then((data) => setHospitais(data))
        .catch(() => setErro("Erro ao carregar hospitais."));
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!email || !password || (role === "admin" && !hospitalId)) {
      setErro("Por favor, preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          role,
          hospitalId: role === "admin" ? hospitalId : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Email ou senha inválidos!");
        return;
      }

      const { token, user } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);
      localStorage.setItem("userId", user.id);

      navigate(user.role === "admin" ? "/admin/dashboard" : "/");
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Acesse sua conta</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-input-group">
          <label className="login-label">Tipo de Usuário</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="login-input">
            <option value="volunteer">Voluntário</option>
            <option value="admin">Administrador</option>
          </select>
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

        {erro && <p className="login-error">{erro}</p>}

        <div className="login-link-container">
          <Link to="/forgot-password" className="login-link">
            Esqueceu a senha?
          </Link>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="login-footer">
          Ainda não tem conta?{" "}
          <Link to="/register" className="login-link">
            Cadastre-se aqui
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
