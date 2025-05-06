import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Home from "./pages/routepublic/home/Home";
import VagasPublicas from "./pages/routepublic/vagapub/VagasPublicas";
import CadastroVoluntario from "./pages/routepublic/voluntario/CadastroVolunter";
import LoginPage from "./pages/routepublic/LoginPage";
import RegisterPage from "./pages/routepublic/RegisterPage";
import Leaderboard from "./pages/routepublic/voluntario/LeaderBoard";

import DashboardHospital from "./pages/routeadmin/hospage/DashboardHosp";
import CriarVaga from "./pages/routeadmin/criarvaga/CriarVaga";
import GerenciarUsuarios from "./pages/routeadmin/gerenciarusu/GerenciarUsu";
import AprovarVoluntarios from "./pages/routeadmin/aprov/AprovarVoluntarios";

import VagasCandidatas from "./pages/routepublic/voluntario/VagasCandidatadas";

import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/private/PrivateRoute";

const App = () => (
  <Router>
    <Header />
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/vagas" element={<VagasPublicas />} />
      <Route path="/cadastroV" element={<CadastroVoluntario />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      {/* Rotas de admin (precisam de token + role="admin") */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute requiredRole="admin">
            <DashboardHospital />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/criar-vaga"
        element={
          <PrivateRoute requiredRole="admin">
            <CriarVaga />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          <PrivateRoute requiredRole="admin">
            <GerenciarUsuarios />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/aprovar-voluntarios"
        element={
          <PrivateRoute requiredRole="admin">
            <AprovarVoluntarios />
          </PrivateRoute>
        }
      />
      {/* Rotas de voluntário (precisam de token + role="volunteer")*/}
      <Route
        path="/voluntario/minhas-candidaturas"
        element={
          <PrivateRoute requiredRole="volunteer">
            <VagasCandidatas />
          </PrivateRoute>
        }
      />
      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
