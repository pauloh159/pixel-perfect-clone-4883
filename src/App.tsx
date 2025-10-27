import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './hooks/useAuth.tsx';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Index from './pages/Index';
import Services from './pages/Services';
import Methodology from './pages/Methodology';
import Blog from './pages/Blog';
import UserProfile from './pages/UserProfile';
import LoginHabilitada from './pages/LoginHabilitada';
import AdminPanel from './pages/Admin/AdminPanel';
import AdminLogin from './pages/Admin/Login';
import ProtectedRoute from './pages/Admin/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';

const queryClient = new QueryClient();

// Layout para páginas públicas (com Header e Footer)
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

// Layout para páginas de administração (sem Header e Footer)
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    {children}
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rotas Públicas (com Header e Footer) */}
            <Route path="/" element={
              <PublicLayout>
                <Index />
              </PublicLayout>
            } />
            <Route path="/services" element={
              <PublicLayout>
                <Services />
              </PublicLayout>
            } />
            <Route path="/methodology" element={
              <PublicLayout>
                <Methodology />
              </PublicLayout>
            } />
            <Route path="/blog" element={
              <PublicLayout>
                <Blog />
              </PublicLayout>
            } />
            
            {/* Rotas de Login (com Header e Footer) */}
            <Route path="/login" element={
              <PublicLayout>
                <LoginHabilitada />
              </PublicLayout>
            } />
            <Route path="/admin/login" element={
              <PublicLayout>
                <AdminLogin />
              </PublicLayout>
            } />
            
            {/* Rota de Perfil do Usuário (com Header e Footer) */}
            <Route 
              path="/user-profile" 
              element={
                <PublicLayout>
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                </PublicLayout>
              } 
            />
            
            {/* Rotas de Administração (sem Header e Footer) */}
            <Route 
              path="/admin/*" 
              element={
                <AdminLayout>
                  <ProtectedRoute requireAdmin>
                    <AdminPanel />
                  </ProtectedRoute>
                </AdminLayout>
              } 
            />
            
            {/* Unauthorized Route (com Header e Footer) */}
            <Route path="/unauthorized" element={
              <PublicLayout>
                <Unauthorized />
              </PublicLayout>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
