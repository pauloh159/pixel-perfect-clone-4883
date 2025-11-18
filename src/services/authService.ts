import { supabase } from '@/lib/supabase';

interface LoginResponse {
  success: boolean;
  message: string;
  session_token?: string;
  expires_at?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
    whatsapp?: string;
    estado?: string;
    is_active?: boolean;
    enrollment_status?: string;
  };
}

export interface SessionData {
  session_token: string;
  expires_at: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    whatsapp?: string;
    estado?: string;
    is_active?: boolean;
    enrollment_status?: string;
  };
}

export const login = async (email: string, password: string, userType: 'admin' | 'habilitada') => {
  const rpcName = userType === 'admin' ? 'login_admin' : 'login_habilitada';

  // Obter informações do cliente para logs de segurança
  const userAgent = navigator.userAgent;
  
  const { data, error } = await supabase.rpc(rpcName, {
    p_email: email,
    p_password: password,
  });
  
  if (error) {
    throw new Error(error.message);
  }

  const response = data as LoginResponse;

  if (response && response.success && response.session_token) {
    const userPayload = userType === 'admin' && response.user ? response.user : response;

    const expiresAt = response.expires_at
      ? response.expires_at
      : new Date(Date.now() + (userType === 'admin' ? 24 : 8) * 60 * 60 * 1000).toISOString();

    if (!userPayload || (!userPayload.id && !userPayload.user_id)) {
      throw new Error('Resposta de login inválida: usuário ausente');
    }

    const sessionData: SessionData = {
      session_token: response.session_token,
      expires_at: expiresAt,
      user: {
        id: userPayload.id ?? userPayload.user_id,
        email: userPayload.email,
        name: userPayload.name,
        whatsapp: userPayload.whatsapp,
        estado: userPayload.estado,
        is_active: userPayload.is_active,
        enrollment_status: userPayload.enrollment_status,
        role: userType,
      },
    };
    
    // Armazenar sessão com token seguro
    localStorage.setItem('authSession', JSON.stringify(sessionData));
    
    return { user: sessionData.user };
  } else {
    throw new Error(response.message || 'Login failed');
  }
};

export const logout = async () => {
  const session = getStoredSession();
  
  if (session?.session_token) {
    try {
      // Invalidar sessão no servidor
      await supabase.rpc('logout_session', {
        p_session_token: session.session_token
      });
    } catch (error) {
      console.error('Erro ao invalidar sessão no servidor:', error);
    }
  }
  
  // Remover sessão local
  localStorage.removeItem('authSession');
};

const getStoredSession = (): SessionData | null => {
  const session = localStorage.getItem('authSession');
  if (!session) return null;
  
  try {
    return JSON.parse(session);
  } catch {
    localStorage.removeItem('authSession');
    return null;
  }
};

export const validateSession = async () => {
  const session = getStoredSession();
  if (!session) return null;
  
  // Verificar se a sessão expirou localmente
  const expiresAt = new Date(session.expires_at);
  if (expiresAt <= new Date()) {
    localStorage.removeItem('authSession');
    return null;
  }
  
  try {
    // Validar sessão no servidor
    const { data, error } = await supabase.rpc('validate_session', {
      p_session_token: session.session_token
    });
    
    if (error || !data?.valid) {
      localStorage.removeItem('authSession');
      return null;
    }
    
    // Atualizar dados do usuário se necessário
    if (data.user) {
      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          ...data.user
        }
      };
      localStorage.setItem('authSession', JSON.stringify(updatedSession));
      return updatedSession;
    }
    
    return session;
  } catch (error) {
    console.error('Erro ao validar sessão:', error);
    localStorage.removeItem('authSession');
    return null;
  }
};

export const getCurrentUser = () => {
  const session = getStoredSession();
  return session ? session.user : null;
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return !!user && user.role === 'admin';
};

export const isSuperAdmin = () => {
  const user = getCurrentUser();
  return !!user && user.role === 'superadmin';
};

export const isHabilitada = () => {
  const user = getCurrentUser();
  return !!user && user.role === 'habilitada';
};

export const updateProfile = async (profileData: {
  name?: string;
  email?: string;
  whatsapp?: string;
  estado?: string;
}) => {
  const user = getCurrentUser();
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const { data, error } = await supabase.rpc('update_habilitada_profile', {
    p_user_id: user.id,
    p_name: profileData.name,
    p_email: profileData.email,
    p_whatsapp: profileData.whatsapp,
    p_estado: profileData.estado
  });

  if (error) {
    throw new Error(error.message);
  }

  // Atualizar os dados do usuário no localStorage se o update foi bem-sucedido
  if (data.success && data.user) {
    const currentSession = getStoredSession();
    if (currentSession) {
      const updatedSession = {
        ...currentSession,
        user: {
          ...currentSession.user,
          name: data.user.name,
          email: data.user.email,
          whatsapp: data.user.whatsapp,
          estado: data.user.estado
        }
      };
      localStorage.setItem('authSession', JSON.stringify(updatedSession));
    }
  }

  return data;
};