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

/* Bola animada RGB */
.bg-animation {
  position: fixed;
  top: 25%;
  left: -250px;

  width: 320px;
  height: 320px;
  border-radius: 50%;

  background: radial-gradient(
    circle at 30% 30%,
    rgb(255, 0, 150),
    rgb(0, 200, 255),
    rgb(0, 255, 150)
  );

  filter: blur(90px);
  opacity: 100;

  animation:
    moveBall 24s linear infinite alternate,
    colorShift 9s linear infinite;

  z-index: -1;
  pointer-events: none;
}

/* Movimento horizontal */
@keyframes moveBall {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(100vw + 500px));
  }
}

/* Troca de cores */
@keyframes colorShift {
  0% {
    background: radial-gradient(circle, rgba(255, 0, 149, 0.2), rgba(0, 200, 255, 0.2));
  }
  33% {
    background: radial-gradient(circle, rgba(0, 255, 150, 0.2), rgba(255, 80, 0, 0.2));
  }
  66% {
    background: radial-gradient(circle, rgba(0, 150, 255, 0.2), rgba(180, 0, 255, 0.2));
  }
  100% {
    background: radial-gradient(circle, rgba(255, 0, 150, 0.2), rgba(0, 200, 255, 0.2));
  }
}
</style>
