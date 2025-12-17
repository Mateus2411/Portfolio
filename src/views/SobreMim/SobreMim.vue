<script setup></script>

<template>
  <section class="sobre">
    <h1>Sobre mim</h1>

    <ul>
      <li>
        Estudante do Instituto Federal (IF), apaixonado por tecnologia e programação.
      </li>
      <li>
        Curioso e persistente, sempre explorando novas linguagens, frameworks e conceitos.
      </li>
      <li>
        Em busca constante de desafios que contribuam para minha evolução como desenvolvedor.
      </li>
      <li>
        Meus projetos envolvem front-end simples e, futuramente, lógicas mais complexas em
        JavaScript, Python e HTML/CSS.
      </li>
    </ul>
  </section>
</template>

<style scoped>
.sobre {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 24px;
  font-family: Arial, sans-serif;
  color: #1f2933;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2563eb;
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin-bottom: 12px;
  line-height: 1.6;
  position: relative;
  padding-left: 20px;
}

li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #2563eb;
  font-weight: bold;
}
</style>
