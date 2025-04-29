import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Header.css'; 

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('token');
    window.location.href = '/login'; // força redirecionar
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
            <button onClick={handleLogout} className="nav-link">Sair</button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
