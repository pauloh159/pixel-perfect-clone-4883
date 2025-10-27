import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.tsx';

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Admin</h1>
          {user && (
            <div className="text-sm text-gray-300">
              <p>Logado como:</p>
              <p className="font-medium">{user.email}</p>
            </div>
          )}
        </div>
        <nav className="flex-1">
          <ul>
            <li className="mb-4"><Link to="/admin/habilitadas" className="hover:text-gray-300">Habilitadas</Link></li>
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
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;