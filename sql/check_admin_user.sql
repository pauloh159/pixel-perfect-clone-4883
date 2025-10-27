-- Script para verificar se o usuário administrativo foi criado corretamente

-- Verificar usuário na tabela auth.users
SELECT 
    id,
    email,
    created_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users 
WHERE email = 'admin@clinica.com';

-- Verificar perfil na tabela user_profiles
SELECT 
    id,
    user_id,
    email,
    password,
    password_hash,
    role,
    full_name,
    created_at
FROM user_profiles 
WHERE email = 'admin@clinica.com';

-- Verificar se há correspondência entre as tabelas
SELECT 
    u.id as auth_user_id,
    u.email as auth_email,
    p.user_id as profile_user_id,
    p.email as profile_email,
    p.role,
    p.password,
    p.password_hash
FROM auth.users u
LEFT JOIN user_profiles p ON u.id = p.user_id
WHERE u.email = 'admin@clinica.com'
   OR p.email = 'admin@clinica.com';