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
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  border-bottom: 1px solid #e5e7eb;
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2563eb;
}

.nav {
  display: flex;
  gap: 24px;
}

.link {
  text-decoration: none;
  color: #374151;
  font-weight: 900;
  transition: color 0.2s ease;
}

.link:hover {
  color: #2563eb;
}

/* classe automática do Vue Router */
.router-link-active {
  color: #2563eb;
  font-weight: 600;
}
</style>
