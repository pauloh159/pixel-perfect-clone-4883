## Ajuste de objetivo
- Manter a conexão com o WordPress como estava, reduzindo o retrabalho.
- Restaurar páginas e a estética Tailwind/Shadcn, garantindo que o consumo do WP alimente os componentes visuais.
- Reativar a conexão com o banco (Supabase) onde já era usada.

## Auditoria resumida
- Importações em `src/App.tsx:7–16` apontam para páginas que não existem (ex.: `Services`, `Methodology`, `Blog`, `UserProfile`, `LoginHabilitada`, `Admin/*`, `Unauthorized`). Presentes: `Index.tsx`, `Habilitadas.tsx`, `NotFound.tsx`.
- WP ativo em `src/components/MethodologyTrainings.tsx:41–46` (eventos) e `src/hooks/useServices.ts:24` (serviços).
- Supabase em `src/pages/Habilitadas.tsx:4–5,26`, `src/components/HabilitadaRegistrationModal.tsx:2,38`, `src/hooks/useAuth.tsx:2`; client ausente (`src/lib/supabase`).
- Tailwind configurado corretamente: `tailwind.config.ts:5,82`, `postcss.config.js:1–6`, `src/index.css:1–3`, importado em `src/main.tsx:3`.

## Plano de implementação
### 1) Recriar páginas mantendo dados do WP
- `src/pages/Services.tsx`: usar `useServices` para listar serviços com `ServiceCard`, grid Tailwind.
- `src/pages/Methodology.tsx`: compor com `MethodologyHero`, `MethodologyFeatures`, `MethodologyGallery`, `MethodologyTrainings` (dados WP de `eventos`).
- `src/pages/Blog.tsx`: criar hook simples para `wp-json/wp/v2/posts?_embed` e renderizar com `BlogHero` + lista `ArticleCard`.
- `src/pages/UserProfile.tsx`, `src/pages/LoginHabilitada.tsx`, `src/pages/Admin/*`, `src/pages/Unauthorized.tsx`: criar placeholders estilizados (Shadcn + Tailwind) para restabelecer rotas; conectar autenticação quando Supabase estiver funcional.
- Reintroduzir rotas correspondentes em `src/App.tsx` após criação dos arquivos.

### 2) Melhorar resiliência do consumo WP
- Replicar padrões de `MethodologyTrainings` (timeout/retry) em `useServices` e novo hook de Blog.
- Sanitizar conteúdo HTML (`content.rendered`) em componentes que exibem texto, mantendo estética Tailwind.

### 3) Restaurar client do Supabase
- Criar `src/lib/supabase.ts` com `createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)`.
- Atualizar importações em `Habilitadas.tsx`, `HabilitadaRegistrationModal.tsx`, `useAuth.tsx` para usar o client.
- Garantir `.env` com as variáveis (sem expor valores), validar leitura via `import.meta.env`.

### 4) Revisão Tailwind e limpeza
- Confirmar que `src/App.css` é órfão e remover se não usado.
- Garantir uso consistente de utilitários Tailwind e componentes Shadcn nas páginas recriadas.
- Manter tema e tokens de `tailwind.config.ts` como base visual.

### 5) Verificação
- Rodar `npm run dev`, validar: build sem erros; navegação em todas as rotas; dados do WP carregando; estilização alinhada ao design Tailwind.
- Testar listagem/inserção em `habilitadas` via Supabase (`Habilitadas.tsx:26`, `HabilitadaRegistrationModal.tsx:38`).

## Entregáveis
- Páginas ausentes recriadas e rotas corrigidas.
- Hooks WP (serviços e blog) resilientes.
- `src/lib/supabase.ts` implementado e autenticação pronta para conectar.
- Estética Tailwind/Shadcn restaurada e consistente.

Posso começar com a criação das páginas e o client do Supabase, mantendo as integrações WP ativas? 