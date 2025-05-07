import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Homes from "./pages/routepublic/homes/Homes";
import VagasPublicas from "./pages/routepublic/vagapub/Vagapub";
import CadastroVoluntario from "./pages/routepublic/voluntarios/Cadastrovolunteer";
import Loginpage from "./pages/routepublic/login/Loginpages";
import Registerpage from "./pages/routepublic/register/Pageregister";
import Leaderboards from "./pages/routepublic/voluntarios/Leaderboards";

import DashboardHospital from "./pages/routeadmin/dashboardhosp/Dashboardhosps";
import CriarVaga from "./pages/routeadmin/criarposs/Criarvagas";
import GerenciarUsuarios from "./pages/routeadmin/gerenciarusus/Gerenciar";
import AprovarVoluntarios from "./pages/routeadmin/aprovevollunteer/AproveVolunteer";

import VagasCandidatas from "./pages/routepublic/voluntarios/Vagacand";

import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/private/PrivateRoute";

const App = () => (
  <Router>
    <Header />
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Homes />} />
      <Route path="/vagas" element={<VagasPublicas />} />
      <Route path="/cadastroV" element={<CadastroVoluntario />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Registerpage />} />
      <Route path="/leaderboard" element={<Leaderboards />} />
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
