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
    role: 'admin' | 'habilitada' | 'superadmin';
    whatsapp?: string;
    estado?: string;
    is_active?: boolean;
    enrollment_status?: string;
  };
  // Campos para compatibilidade com resposta plana (flat) do banco de dados
  user_id?: string;
  id?: string;
  email?: string;
  name?: string;
  full_name?: string;
  role?: 'admin' | 'habilitada' | 'superadmin';
  whatsapp?: string;
  estado?: string;
  is_active?: boolean;
  enrollment_status?: string;
}

export interface SessionData {
  session_token: string;
  expires_at: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'habilitada' | 'superadmin';
    whatsapp?: string;
    estado?: string;
    is_active?: boolean;
    enrollment_status?: string;
  };
}

export const login = async (email: string, password: string, userType: 'admin' | 'habilitada') => {
  const rpcName = userType === 'admin' ? 'login_admin' : 'login_habilitada';

  const { data, error } = await supabase.rpc(rpcName, {
    p_email: email,
    p_password: password,
  });

  console.log('Resposta da Supabase (DEBUG):', JSON.stringify(data, null, 2));

  if (error) {
    throw new Error(error.message);
  }

  const response = data as LoginResponse;

  if (response && response.success) {
    if (response.session_token) {
      let userPayload = response.user;

      // Compatibilidade: Se não houver objeto 'user' aninhado, tenta montar a partir da raiz
      if (!userPayload && (response.user_id || response.id)) {
        userPayload = {
          id: response.user_id || response.id || '',
          email: response.email || '',
          name: response.name || response.full_name || '',
          role: response.role as 'admin' | 'habilitada' | 'superadmin',
          whatsapp: response.whatsapp,
          estado: response.estado,
          is_active: response.is_active,
          enrollment_status: response.enrollment_status,
        };
      }

      if (!userPayload || !userPayload.id) {
        console.error('Dados recebidos:', response);
        throw new Error('Resposta de login inválida: dados do usuário ausentes.');
      }

      const expiresAt = response.expires_at
        ? response.expires_at
        : new Date(Date.now() + (userType === 'admin' ? 24 : 8) * 60 * 60 * 1000).toISOString();

      const sessionData: SessionData = {
        session_token: response.session_token,
        expires_at: expiresAt,
        user: {
          id: userPayload.id,
          email: userPayload.email,
          name: userPayload.name,
          role: userPayload.role,
          whatsapp: userPayload.whatsapp,
          estado: userPayload.estado,
          is_active: userPayload.is_active,
          enrollment_status: userPayload.enrollment_status,
        },
      };

      localStorage.setItem('authSession', JSON.stringify(sessionData));
      return sessionData;
    } else {
      throw new Error(response.message || 'Token de sessão não fornecido após o login.');
    }
  } else {
    throw new Error(response.message || 'O login falhou.');
  }
};

export const logout = async () => {
  const session = getSession();

  if (session?.session_token) {
    try {
      await supabase.rpc('logout_session', {
        p_session_token: session.session_token
      });
    } catch (error) {
      console.error('Erro ao invalidar sessão no servidor:', error);
      // Mesmo em caso de erro, o logout local deve prosseguir para evitar que o usuário fique preso.
    }
  }

  // Sempre remove a sessão local, independentemente do sucesso do logout no servidor.
  localStorage.removeItem('authSession');
};

export const getSession = (): SessionData | null => {
  const sessionStr = localStorage.getItem('authSession');
  if (!sessionStr) return null;

  try {
    const session = JSON.parse(sessionStr) as SessionData;
    // Validação adicional para garantir que a sessão tem a estrutura esperada
    if (session && session.session_token && session.user) {
      return session;
    }
    return null;
  } catch (error) {
    console.error("Erro ao analisar dados da sessão:", error);
    // Em caso de erro de parse, é mais seguro remover a sessão inválida
    localStorage.removeItem('authSession');
    return null;
  }
};

export const validateSession = async () => {
  const session = getSession();
  if (!session) return null;
  
  // Verificar se a sessão expirou localmente
  const expiresAt = new Date(session.expires_at);
  if (expiresAt <= new Date()) {
    localStorage.removeItem('session');
    return null;
  }
  
  try {
    // Validar sessão no servidor
    const { data, error } = await supabase.rpc('validate_session', {
      p_session_token: session.session_token
    });
    
    if (error || !data?.valid) {
      localStorage.removeItem('session');
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
      localStorage.setItem('session', JSON.stringify(updatedSession));
      return updatedSession;
    }
    
    return session;
  } catch (error) {
    console.error('Erro ao validar sessão:', error);
    localStorage.removeItem('session');
    return null;
  }
};

export const getCurrentUser = () => {
  const session = getSession();
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
    const currentSession = getSession();
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
      localStorage.setItem('session', JSON.stringify(updatedSession));
    }
  }

  return data;
};
