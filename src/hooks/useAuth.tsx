import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { login as authLogin, logout as authLogout, validateSession, updateProfile } from '@/services/authService';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin' | 'habilitada';
  
  // Campos específicos para habilitadas
  whatsapp?: string;
  estado?: string;
  
  // Campos específicos para admin
  full_name?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, userType: 'admin' | 'habilitada') => Promise<{ success: boolean; message?: string; user?: User }>;
  logout: () => void;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  isHabilitada: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string, userType: 'admin' | 'habilitada') => {
    setLoading(true);
    setError(null);
    try {
      const session = await authLogin(email, password, userType);
      setUser(session.user);
      return { success: true, user: session.user };
    } catch (err: any) {
      const message = err.message || 'Erro no login';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authLogout();
      setUser(null);
    } catch (err) {
      console.error('Erro no logout:', err);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = async () => {
    setLoading(true);
    try {
      const session = await validateSession();
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Erro na validação de sessão:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticatedCheck = () => !!user;
  const isAdminCheck = () => user?.role === 'admin' || user?.role === 'superadmin';
  const isSuperAdminCheck = () => user?.role === 'superadmin';
  const isHabilitadaCheck = () => user?.role === 'habilitada';

  const value: AuthContextType = {
    user,
    setUser,
    loading,
    error,
    login,
    logout,
    isAuthenticated: isAuthenticatedCheck,
    isAdmin: isAdminCheck,
    isSuperAdmin: isSuperAdminCheck,
    isHabilitada: isHabilitadaCheck,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};