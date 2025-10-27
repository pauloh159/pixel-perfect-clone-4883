-- Adicionar coluna estado na tabela habilitadas
ALTER TABLE public.habilitadas ADD COLUMN IF NOT EXISTS estado text;

-- Atualizar o usuário de teste com um estado
UPDATE public.habilitadas 
SET estado = 'São Paulo' 
WHERE email = 'maria@clinica.com';