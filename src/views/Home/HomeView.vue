<script setup>
</script>

<template>
  <main class="home">
    <section class="intro">
      <h1>Este é o meu portfólio</h1>
      <p>
        Aqui você encontra meus projetos, uma breve descrição sobre mim
        e um quiz do qual me orgulho bastante.
      </p>
    </section>

    <section class="descricao">
      <p>
        Atualmente sou estudante do Instituto Federal (IF) e estou explorando
        o mundo da programação por meio de projetos cada vez mais desafiadores
        e interessantes. Meu objetivo é aprender de forma prática, desenvolver
        habilidades em diferentes linguagens e, futuramente, construir algo que
        realmente faça a diferença.
      </p>
    </section>
  </main>
</template>

<style scoped>
.home {
  max-width: 900px;
  margin: 60px auto;
  padding: 0 24px;
  font-family: Arial, sans-serif;
  color: #1f2933;
}

/* Intro */
.intro h1 {
  font-size: 2.2rem;
  margin-bottom: 16px;
  color: #2563eb;
}

.intro p {
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 32px;
}

/* Descrição */
.descricao p {
  line-height: 1.7;
  font-size: 1rem;
}

/* 🔹 Tablets */
@media (max-width: 768px) {
  .home {
    margin: 40px auto;
    padding: 0 20px;
  }

  .intro h1 {
    font-size: 1.9rem;
  }

  .intro p,
  .descricao p {
    font-size: 0.98rem;
  }
}

/* 🔹 Celulares */
@media (max-width: 480px) {
  .home {
    margin: 28px auto;
    padding: 0 18px;
  }

  .intro h1 {
    font-size: 1.9rem;
    line-height: 1.35;
  }

  .intro p {
    font-size: 1.1rem;
    margin-bottom: 28px;
    line-height: 1.65;
  }

  .descricao p {
    font-size: 1.05rem;
    line-height: 1.7;
  }
}

</style>
