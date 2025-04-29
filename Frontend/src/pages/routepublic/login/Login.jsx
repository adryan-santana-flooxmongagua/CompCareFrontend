import React, { useState } from 'react';
import { auth } from '../../../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos!');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      console.log('Login bem-sucedido!');
      setErro('');
      navigate('/admin/dashboard'); 
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setErro('Email ou senha inválidos!');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Por favor digite suas informações de login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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

        {erro && <p className="login-error">{erro}</p>}

        <div className="login-link-container">
          <a href="#" className="login-link">Esqueceu sua senha ?</a>
        </div>

        <button type="submit" className="login-button">Entrar</button>

        <p className="login-footer">
          Você não tem uma conta? <a href="/register" className="login-link">Crie a sua conta aqui</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
