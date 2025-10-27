-- Script de debug completo para verificar autenticação

-- 1. Verificar se o usuário existe na tabela auth.users
SELECT 
    'AUTH.USERS' as tabela,
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at
FROM auth.users 
WHERE email = 'admin@clinica.com';

-- 2. Verificar se o perfil existe na tabela user_profiles
SELECT 
    'USER_PROFILES' as tabela,
    id,
    user_id,
    email,
    password,
    password_hash,
    role,
    full_name,
    created_at,
    updated_at
FROM user_profiles 
WHERE email = 'admin@clinica.com';

-- 3. Verificar correspondência entre as tabelas
SELECT 
    'CORRESPONDENCIA' as tipo,
    u.id as auth_user_id,
    u.email as auth_email,
    u.encrypted_password as auth_encrypted_password,
    p.user_id as profile_user_id,
    p.email as profile_email,
    p.password as profile_password,
    p.password_hash as profile_password_hash,
    p.role,
    CASE 
        WHEN u.id = p.user_id THEN 'MATCH'
        ELSE 'NO_MATCH'
    END as id_match_status
FROM auth.users u
FULL OUTER JOIN user_profiles p ON u.id = p.user_id
WHERE u.email = 'admin@clinica.com' OR p.email = 'admin@clinica.com';

-- 4. Verificar se há outros usuários admin
SELECT 
    'OUTROS_ADMINS' as tipo,
    COUNT(*) as total_admins
FROM user_profiles 
WHERE role = 'admin';

-- 5. Verificar estrutura da tabela user_profiles
SELECT 
    'ESTRUTURA_USER_PROFILES' as tipo,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
ORDER BY ordinal_position;