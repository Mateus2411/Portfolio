<script setup></script>

<template>
  <section class="sobre">
    <div class="I">
      <img src="/Image_2025_05_13_08_18_39.jpg" alt="" />
    </div>
    <div class="II">
      <h1>Sobre mim</h1>
      <ul>
        <li>Estudante do Instituto Federal (IF), apaixonado por tecnologia e programação.</li>
        <li>Curioso e persistente, sempre explorando novas linguagens, frameworks e conceitos.</li>
        <li>
          Em busca constante de desafios que contribuam para minha evolução como desenvolvedor.
        </li>
        <li>
          Meus projetos envolvem front-end simples e, futuramente, lógicas mais complexas em
          JavaScript, Python e HTML/CSS.
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.sobre {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 24px;
  font-family: Arial, sans-serif;
  color: #1f2933;
}
div.I {
  width: 50%;
  padding: 4rem;
  text-align: center;
  img {
    border-radius: 11%;
    box-shadow: 2px 5px 4px rgba(0, 0, 0, 0.292);
    width: 300px;
    height: 300px;
    transition: 0.2s ease;
  }
  img:hover{
    transform: scale(1.08);
    box-shadow: 4px 10px 8px rgba(0, 0, 0, 0.292);
  }
}
div.II {
  width: 50%;
  h1 {
    text-align: center;
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
    content: '•';
    position: absolute;
    left: 0;
    color: #2563eb;
    font-weight: bold;
  }
}
</style>
