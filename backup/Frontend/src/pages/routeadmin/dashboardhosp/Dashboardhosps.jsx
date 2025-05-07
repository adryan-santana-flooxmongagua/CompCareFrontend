import React from 'react';
import AdminSidebar from '../aside/Adminsidebar';
import './Dashhosp.css';

const DashboardHospital = () => {
  return (
    <div className="dashboard-layout">
      <AdminSidebar />
      <main className="dashboard-content">
        <h1>Bem-vindo ao Painel do Hospital</h1>
        <p>
          Este painel permite gerenciar voluntários, usuários e vagas disponíveis,
          além de acompanhar pontuações e tarefas.
        </p>
        {/* Render additional admin components here */}
      </main>
    </div>
  );
};
export default DashboardHospital;