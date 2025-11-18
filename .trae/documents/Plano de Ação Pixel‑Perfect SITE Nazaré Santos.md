## Objetivo
Alinhar 100% o visual e comportamento do site ao Figma em desktop (1920px) e manter responsividade fiel aos mockups, sem alterar a estética nas imagens fornecidas.

## Diretrizes de Design
- Paleta: `#F2E4D9` (background), `#EFCFA6` (barra/header), `#402510` (texto primário), `#A67B5B` (CTA), `#8C6A4E` (CTA hover).
- Tipografia: Títulos com `Jomolhari`, textos e UI com `Inter` (pesos 400/600/700).
- Grid Desktop: largura 1920px, container central com padding horizontal de 164px; espaçamentos e gaps iguais ao Figma.
- Bordas e sombras: raios de 3px, 10px, 15px e 20px conforme cada componente; sombras suaves nos cartões e barra de estatísticas.

## Tokens e Tailwind
- Configurar `tailwind.config` com `fontFamily` (Jomolhari/Inter) e cores do design system.
- Adicionar utilitários para: `container`, `px-[164px]`, `gap` específicos, `rounded` e `shadow` equivalentes às specs.
- Habilitar classes para estados `hover`, `focus-visible` e `active` em links e botões.

## Assets
- Exportar do Figma os seguintes arquivos para `public/` mantendo nomes:
  - Hero: imagem principal e dupla silhueta (overlay).
  - Barra superior (svg) e logo.
  - Cards de serviços, metodologia, blog, galeria, mapa.
- Otimizar em PNG/JPG (qualidade 80), SVG para vetores; dimensões exatas do Figma.
- Substituir placeholders por assets corretos mantendo aspect ratio.

## Estrutura de Layout
- Usar layouts globais já existentes: `PublicLayout` e `AdminLayout`.
- Garantir que páginas públicas não renderizem Header/Footer localmente (evitar barra duplicada).
- Header: layout `flex` com logo à esquerda, navegação central/direita, CTA "Área das Habilitadas" alinhado; desativar posicionamentos absolutos fora de casos de banner.

## Páginas (Desktop 1920px)
### Home
- Hero com título Jomolhari, subtítulo, CTA; imagem à direita; overlay suave sobre fundo.
- Barra de estatísticas com 3 métricas (+6 anos, +800 clientes, +860 casos) sobre cartão com cantos 20px.
- Seção "Por que escolher" com tabs em linha (6 itens) e alternância de cor invertida conforme Figma.
- Bloco de texto com borda (`stroke`) sutil e espaçamento exato.
- Tratamentos: 3 cards com imagem, overlay e texto inferior esquerdo; spacing/gap do Figma.
- Depoimentos: 5 cards com avatar fictício, nome, estrelas (`StarIcon`), texto; mesma ordem e largura.
- Galeria: mosaic com 7 imagens e bordas arredondadas; distribuição exata.
- Mapa: embed com frame e cantos arredondados; legenda acima.
- Footer: colunas Instagram/contato/navegação rápida conforme tipografia e espaçamento.

### Serviços
- Hero com imagem de fundo, título, subtítulo e CTA.
- Barra de busca com placeholder central e ícone; cantos 20px; sombra leve.
- Grid de serviços: 3 colunas, cards com imagem, overlay e rótulo branco; seguir títulos e ordem dos mockups.

### Metodologia
- Hero com métricas (+120 habilitadas, +800 clientes, +10 países) sobre cartão translúcido.
- Tabs de categorias (Método Exclusivo, Formação, Curso, etc.) e texto descritivo.
- Galeria de fotos de treinamentos com grid 2×N e espaçamentos.
- Seção "Nazaré Santos" com foto à direita e texto à esquerda; botão; métricas.
- Carrossel/grade de agenda de treinamentos com cartões e navegação.

### Blog
- Hero com imagem, título e barra de busca.
- Grid 3 colunas de artigos com thumb, título, resumo, botão.
- Bordas, sombras e espaçamentos iguais aos mockups.

### Perfil do Usuário
- Header secundário com breadcrumb "HOME" à direita.
- Card grande com fundo `#EFCFA6`, foto circular, nome (Jomolhari), status e ID.
- Form com 2 colunas, labels em Inter 600, inputs com cantos 10px e preenchimento claro; divider sutil.

## Interações e Estados
- Links da navbar: cor base `#A66642`; ativo/hover `#402510`.
- Botões: base `#A67B5B`, hover `#8C6A4E`, foco com `ring` discreto.
- Evitar elementos interativos aninhados (não envolver `<a>` dentro de `<button>` e vice‑versa).

## Responsividade (sem alterar estética desktop)
- Breakpoints: `xl` desktop (1920), `lg` (1440), `md` (1280), `sm` (768).
- Container usa `px-[164px]` no `xl`, reduz gradualmente para `px-8` em `md`.
- Stacks verticais: hero troca para coluna; grids de cards passam para 2 colunas em `md` e 1 coluna em `sm` mantendo ratios e tipografia proporcional.

## Acessibilidade
- Texto alternativo em imagens, contraste mínimo AA, foco visível.
- Títulos com hierarquia semântica (`h1`/`h2`/`h3`).

## Performance
- Lazy‑loading de imagens abaixo da dobra.
- Preload das fontes; compressão e cache em `public/`.

## Validação Pixel‑Perfect
- Checklist por seção: dimensões, espaçamentos, tipografia e cores.
- Comparação lado a lado com Figma e screenshots.
- Medição com rulers e overlay para ajuste fino (padding 164px, gaps e radius).

## Entregáveis
- Código Tailwind com tokens e componentes revisados.
- Assets corretos em `public/` com nomes estáveis.
- Páginas Home, Serviços, Metodologia, Blog e Perfil totalmente alinhadas.

## Sequência de Execução
1) Configurar fontes e tokens Tailwind.
2) Corrigir Header e layouts globais.
3) Implementar Hero e barra de estatísticas da Home.
4) Ajustar seções Home: tabs, texto, tratamentos, depoimentos, galeria, mapa, footer.
5) Serviços: hero, busca, grid de cards.
6) Metodologia: hero, tabs, texto, galeria e agenda.
7) Blog: hero e grid de artigos.
8) Perfil do Usuário: card e formulário.
9) Responsividade e acessibilidade.
10) Passo final: validação pixel‑perfect e correções milimétricas.

## Aprovação
Confirme este plano para iniciarmos as alterações com Tailwind e substituição de todos os assets, garantindo o desktop idêntico ao Figma e responsividade controlada sem impactar o visual das imagens anexadas.