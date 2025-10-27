import React from 'react';
import { Outlet } from 'react-router-dom';

export const AdminLayout: React.FC = () => (
  <div className="min-h-screen bg-gray-100">
    <Outlet />
  </div>
);