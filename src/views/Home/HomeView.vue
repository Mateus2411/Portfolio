<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">👋 Bem-vindo ao meu portfólio</div>
        <h1 class="hero-title">
          Transformando ideias em
          <span class="gradient-text">código</span>
        </h1>
        <p class="hero-description">
          Estudante do Instituto Federal explorando o mundo da programação através de projetos
          desafiadores. Focado em backend, dados e construindo soluções que fazem a diferença.
        </p>
        <div class="hero-cta">
          <router-link to="/projetos" class="btn-primary">Ver Projetos</router-link>
          <router-link to="/sobre" class="btn-secondary">Sobre Mim</router-link>
        </div>
      </div>
    </section>

    <!-- Focus Cards -->
    <section class="focus-section">
      <h2 class="section-title">Áreas de Interesse</h2>
      <div class="focus-grid">
        <div class="focus-card">
          <div class="card-icon">🎯</div>
          <h3>Backend Development</h3>
          <p>
            Foco principal em desenvolvimento backend, com atenção especial à estruturação de dados,
            APIs e regras de negócio que sustentam aplicações robustas.
          </p>
        </div>

        <div class="focus-card">
          <div class="card-icon">📊</div>
          <h3>Engenharia de Dados</h3>
          <p>
            Interesse profundo em como os dados são organizados, processados e utilizados para gerar
            valor, explorando manipulação e lógica de dados.
          </p>
        </div>

        <div class="focus-card">
          <div class="card-icon">🚀</div>
          <h3>Aprendizado Contínuo</h3>
          <p>
            Estudando o ecossistema completo do desenvolvimento: frontend, backend, arquitetura e
            boas práticas para construir uma base sólida.
          </p>
        </div>
      </div>
    </section>

    <!-- Philosophy Section -->
    <section class="philosophy">
      <div class="philosophy-content">
        <h2>Minha Abordagem</h2>
        <p>
          Acredito que uma visão estratégica e consciente do desenvolvimento vem de entender como
          cada parte de um sistema se conecta. Por isso, busco compreender o ecossistema completo
          antes de especializar definitivamente.
        </p>
        <p>
          Com o tempo, meu foco tende a se consolidar cada vez mais no backend e trabalho com dados,
          sem perder a visão geral das aplicações e mantendo a curiosidade que me move.
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home {
  width: 100%;
  min-height: calc(100vh - 64px);
}

/* Hero Section */
.hero {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 24px 80px;
  text-align: center;
}

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}

.hero-badge {
  display: inline-block;
  padding: 8px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 24px;
  animation: float 3s ease-in-out infinite;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
  color: #1a202c;
  letter-spacing: -0.02em;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  line-height: 1.7;
  color: #4a5568;
  max-width: 700px;
  margin: 0 auto 40px;
}

.hero-cta {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

/* Focus Section */
.focus-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  color: #1a202c;
}

.focus-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.focus-card:last-child:nth-child(3n - 1) {
  grid-column: span 2;
}

@media (max-width: 768px) {
  .focus-card:last-child:nth-child(3n - 1) {
    grid-column: span 1;
  }
}

.focus-card {
  background: white;
  padding: 40px 32px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.focus-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.focus-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #1a202c;
}

.focus-card p {
  font-size: 1rem;
  line-height: 1.7;
  color: #4a5568;
}

/* Philosophy Section */
.philosophy {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 24px;
  margin-top: 40px;
}

.philosophy-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  color: white;
}

.philosophy-content h2 {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 32px;
}

.philosophy-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  opacity: 0.95;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    padding: 80px 20px 60px;
  }

  .hero-cta {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 300px;
  }

  .focus-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .focus-section,
  .philosophy {
    padding: 60px 20px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 60px 18px 40px;
  }

  .focus-card {
    padding: 32px 24px;
  }
}
</style>
