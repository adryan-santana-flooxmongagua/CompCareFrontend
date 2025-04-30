import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-sidebar__title">Admin Panel</h2>
      <ul className="admin-sidebar__nav">
        <li onClick={() => navigate('/admin/dashboard')}>Página principal</li>
        <li onClick={() => navigate('/admin/usuarios')}>Gerenciar usuários</li>
        <li onClick={() => navigate('/admin/criar-vaga')}>Criar nova vaga</li>
        <li onClick={() => navigate('/vagas')}>Ver vagas públicas</li> 
        <li onClick={() => navigate('/admin/candidatos')}>Candidatos</li> 
        <li onClick={() => navigate('/admin/aprovar-voluntarios')}>Aprovar voluntários</li> 
        <li onClick={() => navigate('/admin/historico')}>Histórico de tarefas</li> 
      </ul>
    </aside>
  );
};

export default AdminSidebar;
