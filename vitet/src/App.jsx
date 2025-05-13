import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Header from "./components/layout/Header";

// Páginas públicas
import Home from "./pages/public/home/Home";
import PublicVacancy from "./pages/public/vacancies/PublicVacancy";
import LoginPage from "./pages/auth/Loginpages";
import RegisterPage from "./pages/auth/Pageregister";
import Leaderboard from "./pages/volunteer/leaderboard/Leaderboard";

// Páginas de admin
import Dashboard from "./pages/admin/dashboard/Dashboard";
import CreateVacancy from "./pages/admin/create-vacancy/CreateVacancy";
import ManageUsers from "./pages/admin/manage-users/ManageUsers";
import ApproveVolunteers from "./pages/admin/aprove-vollunteer/ApproveVolunteers";
import ApprovedVolunteers from "./pages/admin/approved-volunteers/ApprovedVolunteers";
import VacancyStatus from "./pages/admin/vacancy-status/VacancyStatus";
import NewTask from "./pages/admin/new-task/Newtask";

// Páginas de voluntário
import ApplyVacancy from "./pages/volunteer/apply-vacancy/ApplyVacancy";

// Rota protegida e 404
import PrivateRoute from "./components/private/PrivateRoute";
import NotFound from "./pages/NotFound";

const App = () => (
  <Router>
    <Header />
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/vagas" element={<PublicVacancy />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/leaderboard" element={<Leaderboard />} />

      {/* Admin (protegidas) */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute requiredRole="admin">
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/criar-vaga"
        element={
          <PrivateRoute requiredRole="admin">
            <CreateVacancy />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/usuarios"
        element={
          <PrivateRoute requiredRole="admin">
            <ManageUsers />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/aprovar-voluntarios"
        element={
          <PrivateRoute requiredRole="admin">
            <ApproveVolunteers />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/candidatos"
        element={
          <PrivateRoute requiredRole="admin">
            <ApprovedVolunteers />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/status-vaga"
        element={
          <PrivateRoute requiredRole="admin">
            <VacancyStatus />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/nova-tarefa"
        element={
          <PrivateRoute requiredRole="admin">
            <NewTask />
          </PrivateRoute>
        }
      />

      {/* Voluntário (protegido) */}
      <Route
        path="/voluntario/minhas-candidaturas"
        element={
          <PrivateRoute requiredRole="volunteer">
            <ApplyVacancy />
          </PrivateRoute>
        }
      />

      {/* Página não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
