<script setup>
import HeaderApp from './components/HeaderApp.vue'
</script>

<template>
  <div id="app">
    <!-- Fundo animado -->
    <div class="bg-animation"></div>

    <!-- Conteúdo normal -->
    <header-app />
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Animated gradient background */
.bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.bg-animation::before,
.bg-animation::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
}

.bg-animation::before {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  top: -200px;
  right: -200px;
  animation: float1 20s ease-in-out infinite;
}

.bg-animation::after {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  bottom: -150px;
  left: -150px;
  animation: float2 25s ease-in-out infinite;
}

@keyframes float1 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-100px, 100px) scale(1.1);
  }
}

@keyframes float2 {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(100px, -100px) scale(1.2);
  }
}
</style>
