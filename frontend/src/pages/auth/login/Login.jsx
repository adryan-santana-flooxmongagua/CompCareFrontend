import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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

    if (!email || !senha || (role === "admin" && !hospitalId)) {
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
          password: senha,
          role,
          hospitalId: role === "admin" ? hospitalId : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Email ou senha inválidos!");
      } else {
        const { token, user } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("name", user.name);
        localStorage.setItem("userId", user.id);

        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setErro("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">
        Por favor, digite suas informações de login
      </h2>
      <form onSubmit={handleSubmit} className="login-form">
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

        <div className="login-input-group">
          <label className="login-label">E-mail</label>
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">Senha</label>
          <input
            type="password"
            placeholder="***************"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="login-input"
          />
        </div>

        {role === "admin" && (
          <div className="login-input-group">
            <label className="login-label">ID do Hospital</label>
            <input
              type="text"
              placeholder="Digite o ID do hospital"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              className="login-input"
            />
          </div>
        )}

        {erro && <p className="login-error">{erro}</p>}

        <div className="login-link-container">
          <Link to="/forgot-password" className="login-link">
            Esqueceu sua senha?
          </Link>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="login-footer">
          Você não tem uma conta?{" "}
          <Link to="/register" className="login-link">
            Crie a sua conta aqui
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
