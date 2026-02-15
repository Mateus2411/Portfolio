<template>
  <header class="header">
    <div class="logo">MeuSite</div>

    <nav class="nav">
      <router-link to="/" class="link">Home</router-link>
      <RouterLink to="/sobre" class="link">Sobre mim</RouterLink>
      <RouterLink to="/projetos" class="link">Projetos</RouterLink>
      <RouterLink to="/quiz" class="link">Quiz</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header {
  width: 100%;
  height: 64px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
}

.logo {
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.nav {
  display: flex;
  gap: 8px;
}

.link {
  text-decoration: none;
  color: #4a5568;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.link:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.08);
}

.link::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 60%;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: transform 0.3s ease;
}

.link:hover::after {
  transform: translateX(-50%) scaleX(1);
}

.router-link-active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.router-link-active::after {
  transform: translateX(-50%) scaleX(1);
}

@media (max-width: 768px) {
  .header {
    padding: 0 20px;
  }

  .nav {
    gap: 4px;
  }

  .link {
    padding: 8px 12px;
    font-size: 0.9rem;
  }

  .logo {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 0 16px;
  }

  .nav {
    gap: 2px;
  }

  .link {
    padding: 6px 10px;
    font-size: 0.85rem;
  }
}
</style>
