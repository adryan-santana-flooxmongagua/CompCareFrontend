import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Se não estiver autenticado
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se a rota exigir um role específico e o usuário não tiver esse role
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  

  // Autorizado
  return children;
};

export default PrivateRoute;