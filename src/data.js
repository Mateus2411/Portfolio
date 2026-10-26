export const GITHUB_USER = 'Mateus2411'

// Cada linguagem vira um cubo de gelo 3D e tem um snippet que é digitado no terminal
export const langs = [
  {
    key: 'javascript',
    name: 'JavaScript',
    color: '#f7df1e',
    file: 'cafe.js',
    code: `// JavaScript: onde tudo começou
const cafe = ['coado', 'expresso', 'cappuccino']

cafe
  .map((c) => c.toUpperCase())
  .forEach((c) => console.log(\`☕ \${c}\`))`,
  },
  {
    key: 'vuejs',
    name: 'Vue',
    color: '#41b883',
    file: 'Contador.vue',
    code: `<script setup>
import { ref } from 'vue'
const cliques = ref(0)
</script>

<template>
  <button @click="cliques++">
    {{ cliques }} cliques
  </button>
</template>`,
  },
  {
    key: 'typescript',
    name: 'TypeScript',
    color: '#3178c6',
    file: 'dev.ts',
    code: `interface Dev {
  nome: string
  stack: string[]
  aprendendo: boolean
}

const eu: Dev = {
  nome: 'Mateus',
  stack: ['Vue', 'Node', 'Python'],
  aprendendo: true,
}`,
  },
  {
    key: 'nodejs',
    name: 'Node.js',
    color: '#5fa04e',
    file: 'server.js',
    code: `import express from 'express'

const app = express()

app.get('/camisetas', async (req, res) => {
  const lista = await db.camisetas.findAll()
  res.json(lista)
})

app.listen(3000)`,
  },
  {
    key: 'python',
    name: 'Python',
    color: '#3776ab',
    file: 'bot.py',
    code: `# Hermes: meu bot pessoal
def responder(msg: str) -> str:
    if "café" in msg.lower():
        return "Sempre aceito um ☕"
    return agente.pensar(msg)

print(responder("Bora um café?"))`,
  },
  {
    key: 'django',
    name: 'Django',
    color: '#44b78b',
    file: 'models.py',
    code: `from django.db import models

class Projeto(models.Model):
    nome = models.CharField(max_length=80)
    no_ar = models.BooleanField(default=False)

    def __str__(self):
        return self.nome`,
  },
  {
    key: 'java',
    name: 'Java',
    color: '#f89820',
    file: 'Main.java',
    code: `public class Main {
    public static void main(String[] args) {
        int cafes = 0;
        while (cafes < 3) {
            cafes++;
            System.out.println("café #" + cafes);
        }
    }
}`,
  },
  {
    key: 'html5',
    name: 'HTML',
    color: '#e34f26',
    file: 'index.html',
    code: `<!-- o primeiro de todos -->
<main>
  <h1>Olá, mundo!</h1>
  <p>Meu primeiro site 🚀</p>
  <button>Clique aqui</button>
</main>`,
  },
  {
    key: 'css3',
    name: 'CSS',
    color: '#8a5cf6',
    file: 'style.css',
    code: `/* deixando tudo liso */
.card {
  border-radius: 24px;
  transition: transform .4s ease;
}

.card:hover {
  transform: translateY(-8px) rotate(-1deg);
}`,
  },
  {
    key: 'git',
    name: 'Git',
    color: '#f05032',
    file: 'terminal',
    code: `# como todo projeto termina
git add .
git commit -m "FEAT: ABSOLUT CINEMA"
git push origin main

# ✔ deploy na Vercel`,
  },
]

export const projects = [
  {
    name: 'Gerando Programadores',
    desc: 'Meu projeto pessoal full stack: frontend em Vue publicado na Vercel e backend próprio em Node.js.',
    tags: ['Vue', 'Node.js', 'Vercel'],
    repo: 'Frontend-Gerando-Programadores',
    live: 'https://gerando-programadores.vercel.app',
    hue: ['#7c5cff', '#00e5c3'],
    icon: '🧑‍💻',
  },
  {
    name: 'Coffee Quality',
    desc: 'Coffee Quality Challenge, avaliação de Desenvolvimento Web II no IFC. Tudo sobre café, claro.',
    tags: ['Vue', 'Vercel'],
    repo: 'coffee-quality',
    live: 'https://coffee-quality.vercel.app',
    hue: ['#c47a3d', '#3b2314'],
    icon: '☕',
  },
  {
    name: 'Hermes Agent',
    desc: 'Agente de IA com DeepSeek rodando no Fabroku, a plataforma de deploy do IFC, e meu bot pessoal em Python.',
    tags: ['Python', 'IA', 'Deploy'],
    repo: 'Hermes-PersonalBot',
    hue: ['#ff4d8d', '#7c5cff'],
    icon: '🤖',
  },
  {
    name: 'Chromium MCP',
    desc: 'Chromium headless exposto via MCP no Fabroku, para dar um navegador de verdade a agentes de IA.',
    tags: ['Shell', 'MCP', 'Infra'],
    repo: 'chromium-mcp-fabroku',
    hue: ['#4285f4', '#00e5c3'],
    icon: '🌐',
  },
  {
    name: 'DevWeb II',
    desc: 'Trabalhos e experimentos da disciplina de Desenvolvimento Web II, todos em Vue.',
    tags: ['Vue', 'Vercel'],
    repo: 'DevWeb-II',
    live: 'https://dev-web-2.vercel.app',
    hue: ['#41b883', '#35495e'],
    icon: '🧪',
  },
  {
    name: 'Site de Camisetas (API)',
    desc: 'Backend em Node.js de uma loja de camisetas, hospedado no Render.',
    tags: ['Node.js', 'API', 'Render'],
    repo: 'Back-Site-Camisetas',
    live: 'https://back-site-camisetas.onrender.com',
    hue: ['#f05032', '#f7df1e'],
    icon: '👕',
  },
]
