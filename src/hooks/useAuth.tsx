import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  login as authLogin, 
  logout as authLogout, 
  validateSession, 
  getCurrentUser, 
  SessionData 
} from '@/services/authService';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'superadmin' | 'habilitada';
  
  // Campos específicos para habilitadas
  whatsapp?: string;
  estado?: string;
  is_active?: boolean;
  enrollment_status?: string;
  
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

// Função auxiliar para obter a sessão inicial
const getInitialSession = (): User | null => {
  if (typeof window !== 'undefined') {
    const session = localStorage.getItem('session');
    if (session) {
      try {
        const parsedSession: SessionData = JSON.parse(session);
        // Adicionar verificação de expiração se necessário
        if (new Date(parsedSession.expires_at) > new Date()) {
          return parsedSession.user;
        }
      } catch (e) {
        console.error("Failed to parse auth session", e);
        return null;
      }
    }
  }
  return null;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(getInitialSession);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Adicionado estado de erro

  useEffect(() => {
    // A lógica de checkAuth foi movida para cá e simplificada
    validateSession()
      .then(session => {
        if (session) {
          setUser(session.user);
        }
      })
      .catch(err => {
        console.error('Erro na validação de sessão:', err);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email: string, password: string, userType: 'admin' | 'habilitada') => {
    setLoading(true);
    setError(null);
    try {
      const session = await authLogin(email, password, userType);
      const userWithRole = { ...session.user, role: userType };
      setUser(userWithRole);
      return { success: true, user: userWithRole };
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