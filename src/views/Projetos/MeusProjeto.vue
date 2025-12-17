<template>
  <section class="projetos">
    <h1>Projetos</h1>

    <div class="cards">
      <div class="card">
        <h2>Calculadora Multilíngue</h2>
        <p>
          Projeto desenvolvido em <strong>HTML, CSS e JavaScript</strong>.
          Permite alternar entre os idiomas português, inglês e espanhol.
        </p>
      </div>

      <div class="card">
        <h2>Lista de Afazeres Interativa</h2>
        <p>
          Desafio interativo com marcação de tarefas concluídas.
          Utiliza <strong>localStorage</strong> para salvar os dados diretamente no navegador.
        </p>
      </div>
    </div>

    <p class="repos">
      Mais projetos podem ser conferidos na aba
      <a
        href="https://github.com/Mateus2411"
        target="_blank"
        rel="noopener noreferrer"
      >
        Repositories
      </a>
      do meu perfil 🚀
    </p>

    <h2 class="subtitulo">Repositórios em destaque</h2>

    <ul class="lista-repos">
      <li>
        <a href="https://github.com/Mateus2411/Frontend-Gerando-Programadores" target="_blank">
          Frontend – Gerando Programadores
        </a>
      </li>
      <li>
        <a href="https://github.com/Mateus2411/Tutorial-Livraria" target="_blank">
          Tutorial – Livraria
        </a>
      </li>
      <li>
        <a href="https://github.com/Mateus2411/Desafios-1-ano" target="_blank">
          Desafios – 1º Ano
        </a>
      </li>
      <li>
        <a href="https://github.com/Davi-Prussek/PI_CuidadosDeUmProgramador" target="_blank">
          PI – Cuidados de um Programador
        </a>
      </li>
    </ul>

    <h2 class="subtitulo">📫 Como me contatar</h2>

    <ul class="contato">
      <li>Email: <strong>mateushenriquedasilva2411@gmail.com</strong></li>
      <li>Instagram: <strong>@mateus_.hs</strong></li>
      <li>WhatsApp: <strong>+55 47 98895-2789</strong></li>
    </ul>

    <p class="footer">
      Caso encontre algum erro ou saiba uma forma melhor de fazer,
      entre em contato comigo 🔥💻
    </p>
  </section>
</template>

<style scoped>
.projetos {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 24px;
  font-family: Arial, sans-serif;
  color: #1f2933;
}

h1 {
  font-size: 2rem;
  margin-bottom: 24px;
  color: #2563eb;
}

.cards {
  display: grid;
  gap: 20px;
  margin-bottom: 24px;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
}

.card h2 {
  margin-bottom: 8px;
  color: #111827;
}

.repos {
  margin: 24px 0;
}

.repos a {
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
}

.subtitulo {
  margin-top: 32px;
  margin-bottom: 12px;
  color: #111827;
}

.lista-repos,
.contato {
  list-style: none;
  padding-left: 0;
}

.lista-repos li,
.contato li {
  margin-bottom: 8px;
}

.lista-repos a {
  text-decoration: none;
  color: #2563eb;
}

.footer {
  margin-top: 32px;
  font-style: italic;
}
</style>
