import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaPlus, FaEye, FaUserCheck } from 'react-icons/fa';
import './Aside.css';

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
      <ul className="admin-sidebar__nav">
        <li onClick={() => navigate('/admin/dashboard')}>
          <FaTachometerAlt className="icon" /> Página principal
        </li>
        <li onClick={() => navigate('/admin/usuarios')}>
          <FaUsers className="icon" /> Gerenciar Voluntários
        </li>
        <li onClick={() => navigate('/admin/criar-vaga')}>
          <FaPlus className="icon" /> Criar nova vaga
        </li>
        <li onClick={() => navigate('/admin/status-vaga')}>
          <FaEye className="icon" /> Vagas criadas
        </li>
        <li onClick={() => navigate('/admin/candidatos')}>
          <FaUserCheck className="icon" /> Candidatos confirmados
        </li>
        <li onClick={() => navigate('/admin/aprovar-voluntarios')}>
          <FaUserCheck className="icon" /> Aprovar voluntários
        </li>
        <li onClick={() => navigate('/admin/nova-tarefa')}>
          <FaUserCheck className="icon" /> Nova tarefa
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
