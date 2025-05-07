// src/components/layout/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Roda sempre que a rota mudar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setIsAuthenticated(!!token);
    setRole(storedRole);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setRole(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">CompCare</h1>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/vagas" className="nav-link">Vagas</Link>
          <Link to="/leaderboard" className="nav-link">Ranking</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Registrar</Link>
            </>
          ) : (
            <div className="menu-wrapper">
              <button
                className="menu-button"
                onClick={() => setMenuOpen(o => !o)}
              >
                ☰
              </button>
              {menuOpen && (
                <div className="dropdown-menu">
                  {role === 'admin' && (
                    <>
                      <Link to="/admin/dashboard" className="dropdown-link">Dashboard</Link>
                      <Link to="/admin/criar-vaga" className="dropdown-link">Criar Vaga</Link>
                      <Link to="/admin/usuarios" className="dropdown-link">Usuários</Link>
                    </>
                  )}
                  {role === 'volunteer' && (
                    <>
                      <Link to="/meus-pontos" className="dropdown-link">Meus Pontos</Link>
                      <Link to="/voluntario/minhas-candidaturas" className="dropdown-link">Minhas Vagas</Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="dropdown-link logout"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
