# 🧊 Portfólio · Mateus Henrique

Portfólio 3D interativo: um cristal no centro e um cubo de gelo para cada linguagem que eu uso. Dá para **arrastar e arremessar** os cubos, clicar no cristal para explodir tudo e ver código sendo digitado em cada linguagem.

**Stack:** Vue 3 · Three.js · GSAP (ScrollTrigger + SplitText) · Motion for Vue · Tailwind CSS v4 · Lenis

## O que tem

- Cena 3D em `src/three/World.js`: cristal de vidro iridescente, cubos de gelo com física simples (mola, colisão, arremesso) e neve caindo
- O scroll (Lenis + ScrollTrigger com scrub) move a câmera, o cristal e reorganiza os cubos em cada seção
- Preloader com contador, títulos com SplitText, texto que acende palavra por palavra
- Terminal que digita um snippet da linguagem escolhida (clique no cubo ou no botão)
- Galeria horizontal fixa de projetos no desktop, cursor customizado e botões magnéticos
- Funciona no celular (layout próprio, toque nos cubos)

## Rodando

```sh
npm install
npm run dev
```

Build de produção: `npm run build`. Para deploy na Vercel o `vercel.json` já redireciona as rotas pro `index.html`.

Dados de linguagens e projetos ficam em `src/data.js`.

## Deploy no Fabroku (IFC)

O Fabroku usa Dokku: ele faz o build pelo `Dockerfile` e só roteia a **porta 5000**.

- `Dockerfile`: etapa 1 roda `npm ci` + `npm run build` no Node 22; etapa 2 serve o `dist` com nginx na porta 5000 (imagem final ~77 MB)
- `nginx.conf`: fallback de SPA (`/quiz` funciona), gzip, cache de 1 ano nos arquivos com hash e `GET /health` para o healthcheck
- Nenhuma variável de ambiente é necessária

Passos: crie o app no Fabroku apontando para este repo (branch `master`) e faça o deploy. O site fica em `*.class.fabricadesoftware.ifc.edu.br`.

Testar local igual ao Fabroku:

```sh
docker build -t portfolio .
docker run -p 5000:5000 portfolio
# http://localhost:5000
```
