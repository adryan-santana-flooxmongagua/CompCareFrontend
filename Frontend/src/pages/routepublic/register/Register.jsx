import React, { useState } from 'react';
import { auth, db } from '../../../services/firebaseConfig'; // importar o db também!
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // importar Firestore
import { useNavigate, Link } from 'react-router-dom';
import './style.css';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Por favor, preencha todos os campos!');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Atualizar nome de exibição
      await updateProfile(user, {
        displayName: nome
      });

      // Criar um documento no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nome: nome,
        email: email,
        criadoEm: new Date()
      });

      console.log('Cadastro e criação no Firestore bem-sucedidos!');
      setErro('');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error.message);

      if (error.code === 'auth/email-already-in-use') {
        setErro('Este email já está em uso.');
      } else if (error.code === 'auth/weak-password') {
        setErro('A senha deve ter pelo menos 6 caracteres.');
      } else if (error.code === 'auth/invalid-email') {
        setErro('Formato de email inválido.');
      } else {
        setErro('Erro ao criar conta.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Crie sua conta</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-input-group">
          <label className="login-label">Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="login-input"
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">E-mail</label>
          <input
            type="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="login-input"
          />
        </div>

        <div className="login-input-group">
          <label className="login-label">Confirmar Senha</label>
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="login-input"
          />
        </div>

        {erro && <p className="login-error">{erro}</p>}

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="login-footer">
          Já tem uma conta? <Link to="/login" className="login-link">Faça login aqui</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
