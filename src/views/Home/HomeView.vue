
<template>
  <main class="home">
    <section class="intro">
      <h1>Este é o meu portfólio</h1>
      <p>
        Aqui você encontra meus projetos, uma breve descrição sobre mim e um quiz do qual me orgulho
        bastante.
      </p>

      <p>
        Atualmente sou estudante do Instituto Federal (IF) e estou explorando o mundo da programação
        por meio de projetos cada vez mais desafiadores e interessantes. Meu objetivo é aprender de
        forma prática, desenvolver habilidades em diferentes linguagens e, futuramente, construir
        algo que realmente faça a diferença.
      </p>
    </section>

    <section id="focos-programacao">
      <h2>Meus focos na programação</h2>

      <p>
        Atualmente, meu principal interesse dentro da programação está no
        <strong>backend</strong>, com uma atenção especial à área de <strong>dados</strong>, como
        estruturação, manipulação e a lógica que sustenta as aplicações. Tenho um interesse mais
        aprofundado em entender como os dados são organizados, processados e utilizados para gerar
        valor, mas continuo apreciando e estudando o backend como um todo, incluindo regras de
        negócio, APIs e a integração entre sistemas.
      </p>

      <p>
        No momento, estou em uma fase de aprendizado mais ampla, buscando compreender o ecossistema
        completo do desenvolvimento de software. Isso envolve estudar frontend, backend, lógica,
        arquitetura e boas práticas, com o objetivo de construir uma base sólida antes de direcionar
        minha especialização de forma definitiva.
      </p>

      <p>
        Acredito que essa abordagem me permite desenvolver uma visão mais estratégica e consciente,
        entendendo como cada parte de um sistema se conecta. Com o tempo, meu foco tende a se
        consolidar cada vez mais no backend, especialmente no trabalho com dados, sem perder a visão
        geral das aplicações.
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

  /* Intro */
  .intro {
    h1 {
      font-size: 2.2rem;
      margin-bottom: 16px;
      color: #2563eb;
    }

    p {
      font-size: 1.05rem;
      line-height: 1.6;
      margin-bottom: 10px;
    }
  }

  /* Focos na programação */
  #focos-programacao {
    margin-top: 48px;

    h2 {
      font-size: 1.6rem;
      margin-bottom: 20px;
      font-weight: 600;
      color: #2563eb;
    }

    p {
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 16px;
    }

    strong {
      font-weight: 600;
    }
  }
}

/* 🔹 Tablets */
@media (max-width: 768px) {
  .home {
    margin: 40px auto;
    padding: 0 20px;

    .intro {
      h1 {
        font-size: 1.9rem;
      }

      p {
        font-size: 0.98rem;
      }
    }
  }
}

/* 🔹 Celulares */
@media (max-width: 480px) {
  .home {
    margin: 28px auto;
    padding: 0 18px;

    .intro {
      h1 {
        font-size: 1.9rem;
        line-height: 1.35;
      }

      p {
        font-size: 1.1rem;
        margin-bottom: 28px;
        line-height: 1.65;
      }
    }
  }
}
</style>
