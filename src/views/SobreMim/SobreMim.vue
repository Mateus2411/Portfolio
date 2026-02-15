<script setup></script>

<template>
  <section class="sobre">
    <div class="sobre-container">
      <div class="image-section">
        <div class="image-wrapper">
          <img src="/Image_2025_05_13_08_18_39.jpg" alt="Foto de perfil" />
          <div class="image-decoration"></div>
        </div>
      </div>

      <div class="content-section">
        <div class="content-wrapper">
          <span class="subtitle">Conheça mais</span>
          <h1>Sobre mim</h1>
          <p class="intro-text">
            Estudante do Instituto Federal apaixonado por tecnologia e programação, sempre em busca
            de novos desafios e aprendizados.
          </p>

          <div class="highlights">
            <div class="highlight-item">
              <div class="highlight-icon">🎓</div>
              <div class="highlight-content">
                <h3>Formação</h3>
                <p>Estudante do Instituto Federal, focado em desenvolvimento de software</p>
              </div>
            </div>

            <div class="highlight-item">
              <div class="highlight-icon">💡</div>
              <div class="highlight-content">
                <h3>Mentalidade</h3>
                <p>Curioso e persistente, explorando novas linguagens, frameworks e conceitos</p>
              </div>
            </div>

            <div class="highlight-item">
              <div class="highlight-icon">🚀</div>
              <div class="highlight-content">
                <h3>Objetivo</h3>
                <p>Busca constante por desafios que contribuam para minha evolução</p>
              </div>
            </div>

            <div class="highlight-item">
              <div class="highlight-icon">⚡</div>
              <div class="highlight-content">
                <h3>Stack</h3>
                <p>JavaScript, Python, HTML/CSS e explorando lógicas cada vez mais complexas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sobre {
  min-height: calc(100vh - 64px);
  padding: 80px 24px;
  background: linear-gradient(to bottom, #ffffff 0%, #f7fafc 100%);
}

.sobre-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* Image Section */
.image-section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper {
  position: relative;
  animation: fadeInLeft 0.8s ease-out;
}

.image-wrapper img {
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
}

.image-wrapper img:hover {
  transform: scale(1.05) rotate(2deg);
  box-shadow: 0 25px 80px rgba(102, 126, 234, 0.3);
}

.image-decoration {
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 30px;
  z-index: 1;
  opacity: 0.2;
}

/* Content Section */
.content-section {
  animation: fadeInRight 0.8s ease-out;
}

.content-wrapper {
  max-width: 600px;
}

.subtitle {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 12px;
}

.content-wrapper h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 24px;
  line-height: 1.2;
}

.intro-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 40px;
}

/* Highlights */
.highlights {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.highlight-item {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.highlight-item:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.15);
  border-color: #667eea;
}

.highlight-icon {
  font-size: 2.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 12px;
}

.highlight-content h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 8px;
}

.highlight-content p {
  font-size: 1rem;
  line-height: 1.6;
  color: #4a5568;
}

/* Animations */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .sobre-container {
    gap: 60px;
  }

  .image-wrapper img {
    width: 350px;
    height: 350px;
  }
}

@media (max-width: 768px) {
  .sobre {
    padding: 60px 20px;
  }

  .sobre-container {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .image-wrapper img {
    width: 300px;
    height: 300px;
  }

  .content-wrapper {
    max-width: 100%;
  }

  .highlight-item {
    padding: 20px;
  }

  .highlight-icon {
    width: 50px;
    height: 50px;
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .sobre {
    padding: 40px 18px;
  }

  .image-wrapper img {
    width: 250px;
    height: 250px;
  }

  .highlight-item {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .highlight-icon {
    margin: 0 auto;
  }
}
</style>
