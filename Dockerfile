# ---------- build: gera o site estático com o Vite ----------
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---------- runtime: nginx servindo o dist na porta 5000 ----------
FROM nginx:1.27-alpine

LABEL description="Portfólio 3D - Mateus Henrique"
LABEL maintainer="Mateus2411"

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# O Fabroku (Dokku) só roteia a porta 5000
ENV PORT=5000
ENV DOKKU_DOCKERFILE_PORT=5000
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:5000/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
