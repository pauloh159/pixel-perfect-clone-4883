-- Script para criar usuário administrativo no Supabase
-- ATENÇÃO: Este script insere diretamente nas tabelas do Supabase
-- Use apenas para resolver problemas de acesso inicial

-- Inserir usuário na tabela auth.users (se não existir)
DO $$
DECLARE
    auth_user_id UUID;
    hashed_password TEXT;
BEGIN
    -- Gerar hash da senha para o Supabase Auth
    hashed_password := crypt('admin123', gen_salt('bf'));
    
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@clinica.com') THEN
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            gen_random_uuid(),
            'authenticated',
            'authenticated',
            'admin@clinica.com',
            hashed_password,
            NOW(),
            NOW(),
            NOW(),
            '',
            '',
            '',
            ''
        );
        RAISE NOTICE 'Usuário criado na tabela auth.users';
    ELSE
        -- Atualizar a senha se o usuário já existir
        UPDATE auth.users SET
            encrypted_password = hashed_password,
            updated_at = NOW()
        WHERE email = 'admin@clinica.com';
        RAISE NOTICE 'Senha do usuário atualizada na tabela auth.users';
    END IF;
END $$;

-- Inserir perfil na tabela user_profiles (se não existir) ou atualizar se existir
DO $$
DECLARE
    auth_user_id UUID;
BEGIN
    -- Buscar o ID do usuário na tabela auth.users
    SELECT id INTO auth_user_id FROM auth.users WHERE email = 'admin@clinica.com';
    
    IF NOT EXISTS (SELECT 1 FROM user_profiles WHERE email = 'admin@clinica.com') THEN
        INSERT INTO user_profiles (
            user_id,
            email,
            password,
            password_hash,
            role,
            full_name,
            created_at,
            updated_at
        ) VALUES (
            auth_user_id,
            'admin@clinica.com',
            'admin123',
            hashed_password,
            'admin',
            'Administrador da Clínica',
            NOW(),
            NOW()
        );
        RAISE NOTICE 'Perfil criado na tabela user_profiles';
    ELSE
        UPDATE user_profiles SET
             user_id = auth_user_id,
             password = 'admin123',
             password_hash = hashed_password,
             role = 'admin',
             full_name = 'Administrador da Clínica',
             updated_at = NOW()
         WHERE email = 'admin@clinica.com';
        RAISE NOTICE 'Perfil atualizado na tabela user_profiles';
    END IF;
END $$;

-- 3. Verificar se o usuário foi criado corretamente
SELECT 
  u.id,
  u.email,
  up.role,
  up.full_name,
  up.created_at
FROM auth.users u
JOIN public.user_profiles up ON u.id = up.user_id
WHERE u.email = 'admin@clinica.com';