-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.access_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_email text,
  user_type text,
  action text NOT NULL,
  success boolean DEFAULT true,
  ip_address inet,
  user_agent text,
  error_message text,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT access_logs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.admin_users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  full_name text NOT NULL,
  department text,
  permissions jsonb DEFAULT '{"can_manage_users": true, "can_manage_content": true}'::jsonb,
  is_super_admin boolean DEFAULT false,
  is_active boolean DEFAULT true,
  phone text,
  failed_login_attempts integer DEFAULT 0,
  last_login timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT admin_users_pkey PRIMARY KEY (id)
);
CREATE TABLE public.blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text,
  author_email text,
  author_name text,
  featured_image_url text,
  category text,
  tags ARRAY,
  is_published boolean DEFAULT false,
  published_at timestamp with time zone,
  views_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT blog_posts_pkey PRIMARY KEY (id)
);
CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  event_date timestamp with time zone NOT NULL,
  location text,
  max_participants integer,
  current_participants integer DEFAULT 0,
  price numeric,
  image_url text,
  event_type text,
  is_active boolean DEFAULT true,
  created_by text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (id)
);
CREATE TABLE public.habilitadas (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  name text NOT NULL,
  WhatsApp text,
  cpf text UNIQUE,
  Estado text,
  bio text,
  profile_image_url text,
  enrollment_date date DEFAULT CURRENT_DATE,
  enrollment_status text DEFAULT 'active'::text CHECK (enrollment_status = ANY (ARRAY['active'::text, 'inactive'::text, 'suspended'::text, 'graduated'::text])),
  course_progress jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  failed_login_attempts integer DEFAULT 0,
  last_login timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT habilitadas_pkey PRIMARY KEY (id)
);
CREATE TABLE public.methodology (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  section_order integer DEFAULT 0,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT methodology_pkey PRIMARY KEY (id)
);
CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric,
  duration_minutes integer,
  image_url text,
  category text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_by text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT services_pkey PRIMARY KEY (id)
);
CREATE TABLE public.user_sessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  user_type text NOT NULL CHECK (user_type = ANY (ARRAY['admin'::text, 'habilitada'::text])),
  session_token text NOT NULL UNIQUE,
  ip_address inet,
  user_agent text,
  is_active boolean DEFAULT true,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_sessions_pkey PRIMARY KEY (id)
);

-- Função para login de habilitadas
CREATE OR REPLACE FUNCTION public.login_habilitada(
  p_email text,
  p_password text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_habilitada RECORD;
    v_session_token TEXT;
    v_max_attempts INTEGER := 5;
BEGIN
    -- 1. Busca a habilitada pelo e-mail, selecionando a coluna 'password'.
    SELECT 
        id,
        email,
        name,
        password, -- ✅ Alterado de volta para 'password' para corresponder ao seu banco
        is_active,
        enrollment_status,
        failed_login_attempts,
        course_progress,
        whatsapp,
        estado
    INTO v_habilitada
    FROM public.habilitadas
    WHERE email = p_email;
    
    -- 2. Verifica se o e-mail foi encontrado.
    IF NOT FOUND THEN
        INSERT INTO public.access_logs (user_email, user_type, action, success, error_message)
        VALUES (p_email, 'habilitada', 'login_attempt', false, 'Usuário não encontrado');
        
        RETURN json_build_object(
            'success', false,
            'message', 'Email ou senha incorretos'
        );
    END IF;
    
    -- 3. VERIFICA SE A CONTA ESTÁ ATIVA (is_active = true).
    --    Se for 'false', o acesso é negado. Esta é a sua regra principal.
    IF NOT v_habilitada.is_active THEN
        INSERT INTO public.access_logs (user_email, user_type, action, success, error_message)
        VALUES (p_email, 'habilitada', 'login_attempt', false, 'Conta desativada');
        
        RETURN json_build_object(
            'success', false,
            'message', 'Sua conta está desativada. Entre em contato com o suporte.'
        );
    END IF;

    -- 4. Verifica se a conta está bloqueada por excesso de tentativas.
    IF v_habilitada.failed_login_attempts >= v_max_attempts THEN
        INSERT INTO public.access_logs (user_email, user_type, action, success, error_message)
        VALUES (p_email, 'habilitada', 'login_attempt', false, 'Conta bloqueada por excesso de tentativas');
        
        RETURN json_build_object(
            'success', false,
            'message', 'Conta bloqueada por muitas tentativas. Entre em contato com o suporte.'
        );
    END IF;

    -- 5. ⚠️ VERIFICA A SENHA EM TEXTO CLARO.
    --    Esta linha foi ajustada para usar a comparação direta com a coluna 'password'.
    IF v_habilitada.password != p_password THEN
        -- Incrementa o contador de tentativas falhadas.
        UPDATE public.habilitadas 
        SET failed_login_attempts = failed_login_attempts + 1
        WHERE id = v_habilitada.id;
        
        INSERT INTO public.access_logs (user_email, user_type, action, success, error_message)
        VALUES (p_email, 'habilitada', 'login_attempt', false, 'Senha incorreta');
        
        RETURN json_build_object(
            'success', false,
            'message', 'Email ou senha incorretos'
        );
    END IF;

    -- Lógica de negócio e sucesso no login continua igual...
    
    -- 6. Verifica o status da matrícula
    IF v_habilitada.enrollment_status NOT IN ('active', 'graduated') THEN
        INSERT INTO public.access_logs (user_email, user_type, action, success, error_message)
        VALUES (p_email, 'habilitada', 'login_attempt', false, 'Matrícula não ativa ou finalizada');

        RETURN json_build_object(
            'success', false,
            'message', 'Sua matrícula não está ativa. Verifique sua situação.'
        );
    END IF;
    
    -- 7. Login bem-sucedido: zera as tentativas e atualiza o último login.
    UPDATE public.habilitadas 
    SET 
        failed_login_attempts = 0,
        last_login = NOW()
    WHERE id = v_habilitada.id;
    
    -- 8. Gera um token de sessão.
    v_session_token := encode(gen_random_bytes(32), 'hex');
    
    -- 9. Insere a nova sessão.
    INSERT INTO public.user_sessions (user_id, user_email, user_type, session_token, expires_at)
    VALUES (v_habilitada.id, v_habilitada.email, 'habilitada', v_session_token, NOW() + INTERVAL '8 hours');
    
    -- 10. Registra o log de sucesso.
    INSERT INTO public.access_logs (user_email, user_type, action, success)
    VALUES (p_email, 'habilitada', 'login', true);
    
    -- 11. Retorna os dados do usuário.
    RETURN json_build_object(
        'success', true,
        'message', 'Login realizado com sucesso',
        'session_token', v_session_token,
        'expires_at', NOW() + INTERVAL '8 hours',
        'user', json_build_object(
            'id', v_habilitada.id,
            'email', v_habilitada.email,
            'name', v_habilitada.name,
            'role', 'habilitada',
            'whatsapp', v_habilitada.whatsapp,
            'estado', v_habilitada.estado,
            'is_active', v_habilitada.is_active,
            'enrollment_status', v_habilitada.enrollment_status
        )
    );
END;
$$;

-- Função para login de administradores
CREATE OR REPLACE FUNCTION public.login_admin(
  p_email text,
  p_password text,
  p_ip_address inet DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_record public.admin_users%ROWTYPE;
  v_session_token text;
  v_expires_at timestamp with time zone;
  v_result jsonb;
BEGIN
  -- Verificar se o admin existe e está ativo
  SELECT * INTO v_user_record
  FROM public.admin_users
  WHERE email = p_email AND is_active = true;

  IF NOT FOUND THEN
    -- Log da tentativa de login falhada
    INSERT INTO public.access_logs (user_email, user_type, action, success, ip_address, user_agent, error_message)
    VALUES (p_email, 'admin', 'login_attempt', false, p_ip_address, p_user_agent, 'User not found or inactive');
    
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Email ou senha incorretos'
    );
  END IF;

  -- Verificar a senha (assumindo que está em texto plano por enquanto)
  IF v_user_record.password != p_password THEN
    -- Incrementar tentativas de login falhadas
    UPDATE public.admin_users
    SET failed_login_attempts = failed_login_attempts + 1
    WHERE id = v_user_record.id;

    -- Log da tentativa de login falhada
    INSERT INTO public.access_logs (user_email, user_type, action, success, ip_address, user_agent, error_message)
    VALUES (p_email, 'admin', 'login_attempt', false, p_ip_address, p_user_agent, 'Invalid password');
    
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Email ou senha incorretos'
    );
  END IF;

  -- Gerar token de sessão
  v_session_token := encode(gen_random_bytes(32), 'base64');
  v_expires_at := now() + interval '24 hours';

  -- Criar sessão
  INSERT INTO public.user_sessions (user_id, user_email, user_type, session_token, ip_address, user_agent, expires_at)
  VALUES (v_user_record.id, v_user_record.email, 'admin', v_session_token, p_ip_address, p_user_agent, v_expires_at);

  -- Atualizar último login e resetar tentativas falhadas
  UPDATE public.admin_users
  SET last_login = now(), failed_login_attempts = 0
  WHERE id = v_user_record.id;

  -- Log do login bem-sucedido
  INSERT INTO public.access_logs (user_email, user_type, action, success, ip_address, user_agent)
  VALUES (p_email, 'admin', 'login_success', true, p_ip_address, p_user_agent);

  -- Retornar dados da sessão
  RETURN jsonb_build_object(
    'success', true,
    'message', 'Login realizado com sucesso',
    'session_token', v_session_token,
    'expires_at', v_expires_at,
    'user', jsonb_build_object(
      'id', v_user_record.id,
      'email', v_user_record.email,
      'name', v_user_record.full_name,
      'department', v_user_record.department,
      'permissions', v_user_record.permissions,
      'is_super_admin', v_user_record.is_super_admin,
      'role', 'admin'
    )
  );
END;
$$;

-- Função para atualizar perfil de habilitadas
CREATE OR REPLACE FUNCTION public.update_habilitada_profile(
  p_user_id uuid,
  p_name text DEFAULT NULL,
  p_email text DEFAULT NULL,
  p_whatsapp text DEFAULT NULL,
  p_estado text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_updated_user public.habilitadas%ROWTYPE;
BEGIN
  -- Verificar se o usuário existe (removendo a verificação de is_active para permitir atualização de contas inativas)
  IF NOT EXISTS (SELECT 1 FROM public.habilitadas WHERE id = p_user_id) THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Usuário não encontrado'
    );
  END IF;

  -- Atualizar apenas os campos fornecidos
  UPDATE public.habilitadas
  SET 
    name = COALESCE(p_name, name),
    email = COALESCE(p_email, email),
    WhatsApp = COALESCE(p_whatsapp, WhatsApp),
    Estado = COALESCE(p_estado, Estado),
    updated_at = now()
  WHERE id = p_user_id
  RETURNING * INTO v_updated_user;

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Perfil atualizado com sucesso',
    'user', jsonb_build_object(
      'id', v_updated_user.id,
      'email', v_updated_user.email,
      'name', v_updated_user.name,
      'whatsapp', v_updated_user.WhatsApp,
      'estado', v_updated_user.Estado
    )
  );
END;
$$;


-- Função para atualizar perfil de habilitadas
CREATE OR REPLACE FUNCTION public.update_habilitada_profile(
  p_user_id uuid,
  p_name text DEFAULT NULL,
  p_email text DEFAULT NULL,
  p_whatsapp text DEFAULT NULL,
  p_estado text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_updated_user public.habilitadas%ROWTYPE;
BEGIN
  -- Verificar se o usuário existe (removendo a verificação de is_active para permitir atualização de contas inativas)
  IF NOT EXISTS (SELECT 1 FROM public.habilitadas WHERE id = p_user_id) THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Usuário não encontrado'
    );
  END IF;

  -- Atualizar apenas os campos fornecidos
  UPDATE public.habilitadas
  SET 
    name = COALESCE(p_name, name),
    email = COALESCE(p_email, email),
    WhatsApp = COALESCE(p_whatsapp, WhatsApp),
    Estado = COALESCE(p_estado, Estado),
    updated_at = now()
  WHERE id = p_user_id
  RETURNING * INTO v_updated_user;

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Perfil atualizado com sucesso',
    'user', jsonb_build_object(
      'id', v_updated_user.id,
      'email', v_updated_user.email,
      'name', v_updated_user.name,
      'whatsapp', v_updated_user.WhatsApp,
      'estado', v_updated_user.Estado
    )
  );
END;
$$;