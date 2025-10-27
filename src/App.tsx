import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './hooks/useAuth.tsx';
import Index from './pages/Index';
import Services from './pages/Services';
import Methodology from './pages/Methodology';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import UserProfile from './pages/UserProfile';
import LoginHabilitada from './pages/LoginHabilitada';
import AdminPanel from './pages/Admin/AdminPanel';
import AdminLogin from './pages/Admin/Login';
import ProtectedRoute from './pages/Admin/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import { Register } from "./pages/Register";
import { Habilitadas } from './pages/Habilitadas';
import { PublicLayout } from './components/Layout/PublicLayout.tsx';
import { AdminLayout } from './components/Layout/AdminLayout.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rotas Públicas */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPostDetail />} />
              <Route path="/login" element={<LoginHabilitada />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/habilitadas" element={<Habilitadas />} />
              <Route 
                path="/user-profile" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Route>

            {/* Rotas de Administração */}
            <Route element={<AdminLayout />}>
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
