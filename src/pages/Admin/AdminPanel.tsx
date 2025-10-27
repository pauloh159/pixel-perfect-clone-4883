import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.tsx';
import Habilitadas from './Habilitadas';

const AdminPanel: React.FC = () => {
  const { user: adminData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
          {adminData && (
            <div className="text-sm text-gray-300">
              <p>Logado como:</p>
              <p className="font-medium">{adminData.full_name || adminData.email}</p>
            </div>
          )}
        </div>
        <nav className="flex-1">
          <ul>
            <li className="mb-4">
              <Link to="/admin/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/habilitadas" className="hover:text-gray-300">
                Habilitadas
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-300 hover:text-red-100 hover:bg-gray-700 rounded transition-colors"
          >
            Sair
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <h1 className="text-3xl font-bold mb-6">Dashboard Administrativo</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Habilitadas</h3>
                    <p className="text-gray-600">Gerenciar profissionais</p>
                  </div>
                </div>
              </div>
            } 
          />
          <Route path="/dashboard" element={
            <div>
              <h1 className="text-3xl font-bold mb-6">Dashboard Administrativo</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Habilitadas</h3>
                  <p className="text-gray-600">Gerenciar profissionais</p>
                </div>
              </div>
            </div>
          } />
          <Route path="/habilitadas" element={<Habilitadas />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;