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

Build de produção: `npm run build`.

Dados de linguagens e projetos ficam em `src/data.js`.

## Deploy no Fabroku (IFC)

O projeto já tem os arquivos que o Fabroku pede para SPA (`.buildpacks`, `.static` e `static.json`): o buildpack do Node roda o `npm run build` e o `dokku/buildpack-nginx` serve o site.

O `app-nginx.conf.sigil` é o que faz o nginx servir a pasta `dist` (com fallback para o `index.html`, gzip e cache dos assets). Sem ele, o buildpack serve a raiz do repositório e o site quebra com `Failed to resolve module specifier "vue"`, porque esse buildpack ignora o `static.json`.

```sh
npm i -g fabroku
fabroku login
fabroku verify   # confere os arquivos de deploy
fabroku apps     # lista seus apps
fabroku deploy   # dispara o deploy
```
