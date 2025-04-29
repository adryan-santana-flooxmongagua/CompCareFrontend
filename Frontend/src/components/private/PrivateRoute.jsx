import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../../services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Carregando...</div>; // Tela de loading enquanto checa
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
