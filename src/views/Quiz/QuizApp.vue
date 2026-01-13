<style>
/* ================= ESTILOS (Mantidos e Adaptados) ================= */
* {
  box-sizing: border-box;
}

main {
  font-size: calc(12px + 0.95vw);
  font-family: 'Open Sans', sans-serif;
  color: #333;
  line-height: 1.6;
  background-color: #f9fbff;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.quiz-container {
  max-width: 620px;
  margin: 5vh auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  color: #333;
  position: relative;
}

.quiz-header {
  margin-top: 1rem;
  background: #2196f3;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 18px;
  text-align: center;
  border: 2px solid #64b5f6;
  box-shadow: 0 5px 15px rgba(33, 150, 243, 0.3);
}

.quiz-header h1 {
  font-size: 1.35em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  color: white;
}

.plus {
  color: #4caf50;
  font-size: 1.2em;
  background: white;
  border-radius: 50%;
  padding: 0 5px;
  display: inline-block;
  line-height: 1;
}

/* Barra de Progresso */
.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #2196f3);
  border-radius: 10px;
  transition: width 0.5s ease;
}

.progress-text {
  font-weight: bold;
  color: #ff9800;
  font-size: 0.9em;
  white-space: nowrap;
}

/* Pergunta */
.question {
  font-size: 0.98em;
  margin-bottom: 16px;
  text-align: center;
  line-height: 1.6;
  background: rgba(33, 150, 243, 0.05);
  padding: 14px;
  border-radius: 10px;
  border-left: 5px solid #2196f3;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Opções */
.options-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.option {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9em;
  position: relative;
  overflow: hidden;
  color: #333;
}

.option:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: #2196f3;
}

/* Estados das Opções (Controlados pelo Vue) */
.option.selected {
  border-width: 2px;
  transform: scale(1.01);
  background: #e3f2fd;
  border-color: #2196f3;
  box-shadow: 0 0 10px rgba(33, 150, 243, 0.3);
}

.option.correct {
  background: #e8f5e9 !important;
  border-color: #4caf50 !important;
  color: #2e7d32;
  pointer-events: none;
}

.option.incorrect {
  background: #ffebee !important;
  border-color: #ef5350 !important;
  color: #c62828;
  pointer-events: none;
}

.option.disabled {
  pointer-events: none;
}

.option-icon {
  font-weight: bold;
  background: rgba(0, 0, 0, 0.05);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.8em;
  flex-shrink: 0;
}

/* Feedback */
.feedback-container {
  margin-bottom: 16px;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.feedback-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
}

.feedback-correct {
  background: #e8f5e9;
  border: 1px solid #a5d6a7;
  color: #2e7d32;
}

.feedback-incorrect {
  background: #ffebee;
  border: 1px solid #ef9a9a;
  color: #c62828;
}

.feedback-icon {
  font-size: 1.5em;
}

/* Botão */
.btn {
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  width: 100%;
}

.btn-primary {
  background: #ff9800;
  color: white;
  box-shadow: 0 5px 15px rgba(255, 152, 0, 0.3);
}

.btn-primary:hover:not(:disabled) {
  background: #f57c00;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 152, 0, 0.5);
}

.btn-primary:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

/* Placar */
.score-display {
  display: flex;
  justify-content: space-around;
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 12px;
  margin-top: 16px;
}

.score-item {
  text-align: center;
}

.score-label {
  display: block;
  font-size: 0.8em;
  color: #6c757d;
  margin-bottom: 2px;
  text-transform: uppercase;
}

.score-value {
  display: block;
  font-size: 1.2em;
  font-weight: bold;
  color: #ff9800;
}

/* Resultado (Modal) */
.result-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.result-content {
  background: #1a1a1a;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  border: 1px solid #333;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  color: #fff;
}

.result-content h2 {
  margin-top: 0;
  color: #ff9800;
}

.final-score {
  font-size: 3em;
  font-weight: bold;
  color: #fff;
  margin: 20px 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.result-message {
  font-size: 1.1em;
  margin-bottom: 20px;
  color: #e0e0e0;
}

.result-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  font-size: 0.9em;
  color: #bbb;
}

/* Animações Vue Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  animation: fadeInUp 0.5s ease-out;
}

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

.pulse {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

/* Responsividade */
@media (max-width: 600px) {
  .quiz-container {
    margin-top: 0;
    border-radius: 0;
    min-height: 100vh;
  }
}
</style>
<template>
  <main>
    <!-- Tela do Quiz -->
    <section v-if="!showResult" class="quiz-container">
      <div class="quiz-header">
        <h1>Quiz: Saúde <span class="plus">+</span> Programação</h1>
      </div>

      <!-- Barra de Progresso -->
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
        </div>
        <span class="progress-text">{{ currentIndex + 1 }} / {{ questions.length }}</span>
      </div>

      <!-- Pergunta -->
      <div class="question" v-if="currentQuestionData">
        {{ currentIndex + 1 }}. {{ currentQuestionData.question }}
      </div>

      <!-- Opções -->
      <div class="options-container" v-if="currentQuestionData">
        <div
          v-for="(option, index) in currentQuestionData.options"
          :key="index"
          class="option"
          :class="{
            selected: selectedAnswer === index,
            correct: locked && index === currentQuestionData.correct,
            incorrect:
              locked && selectedAnswer === index && selectedAnswer !== currentQuestionData.correct,
            disabled: locked,
            pulse: selectedAnswer === index && !locked,
          }"
          @click="selectAnswer(index)"
        >
          <span class="option-icon">{{ String.fromCharCode(65 + index) }}</span>
          <span>{{ option }}</span>
        </div>
      </div>

      <!-- Feedback -->
      <div
        v-if="showFeedback"
        class="feedback-container slide-up-enter-active"
        :class="feedbackClass"
      >
        <div class="feedback-content">
          <div class="feedback-icon">{{ isCorrect ? '✅' : '❌' }}</div>
          <div class="feedback-text">
            <strong>{{ isCorrect ? 'Correto!' : 'Incorreto!' }}</strong
            ><br />
            {{ currentQuestionData.explanation }}
          </div>
        </div>
      </div>

      <!-- Botão Próxima -->
      <!-- O botão some quando travado (locked) para dar lugar ao feedback e timer -->
      <button
        v-if="!locked"
        class="btn btn-primary"
        :disabled="selectedAnswer === null"
        @click="confirmAnswer"
      >
        Próxima
      </button>
      <!-- Opcional: Mostrar mensagem de espera quando travado -->
      <div v-else style="text-align: center; color: #666; font-size: 0.8em; margin-top: 10px">
        Próxima pergunta em instantes...
      </div>

      <!-- Placar -->
      <div class="score-display">
        <div class="score-item">
          <span class="score-label">Pontos</span>
          <span class="score-value">{{ score }}</span>
        </div>
        <div class="score-item">
          <span class="score-label">Acertos</span>
          <span class="score-value">{{ correctAnswers }}</span>
        </div>
      </div>
    </section>

    <!-- Tela de Resultado -->
    <transition name="slide-up">
      <section v-if="showResult" class="result-container">
        <div class="result-content">
          <h2>🎉 Quiz Finalizado!</h2>

          <div class="final-score">{{ correctAnswers }} / {{ questions.length }}</div>

          <p class="result-message">{{ resultMessage }}</p>

          <div class="result-stats">
            <span
              >Acertos: <strong>{{ correctAnswers }}</strong></span
            >
            <span
              >Erros: <strong>{{ wrongAnswers }}</strong></span
            >
            <span
              >Pts: <strong>{{ score }}</strong></span
            >
          </div>

          <button class="btn btn-primary" @click="restartQuiz">Jogar novamente</button>
        </div>
      </section>
    </transition>
  </main>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

// --- Dados ---
const questionsData = [
  {
    question: "Em programação, o que seria mais parecido com uma 'alimentação saudável'?",
    options: [
      'Código limpo e bem estruturado',
      'Copiar e colar código sem entender',
      'Variáveis com nomes confusos',
      'Código sem comentários',
    ],
    correct: 0,
    explanation:
      "Assim como uma alimentação saudável nutre o corpo, código limpo e bem estruturado 'nutre' o projeto, facilitando manutenção e evolução!",
  },
  {
    question:
      'Assim como o cérebro precisa de descanso, o que o computador precisa para não sobrecarregar?',
    options: [
      'Compilar mais vezes',
      'Limpar a memória/cache',
      'Desligar o antivírus',
      'Aumentar o brilho da tela',
    ],
    correct: 1,
    explanation:
      "Limpar a memória e cache é como dar um 'descanso' para o computador, liberando recursos e melhorando a performance!",
  },
  {
    question: 'Qual dos hábitos abaixo ajuda na saúde mental e também na programação?',
    options: ['Dormir bem', 'Comer fast food', 'Ignorar erros no código', 'Trabalhar sem pausas'],
    correct: 0,
    explanation:
      'Dormir bem é fundamental tanto para a saúde mental quanto para ter clareza de pensamento na programação!',
  },
  {
    question:
      "Em nutrição, 'junk food' é prejudicial. Em programação, o que seria um exemplo de 'junk code'?",
    options: [
      'Código bem documentado',
      'Funções gigantes e confusas',
      'Testes automatizados',
      'Algoritmos otimizados',
    ],
    correct: 1,
    explanation:
      "Funções gigantes e confusas são o 'junk food' da programação - podem até funcionar, mas prejudicam a saúde do projeto!",
  },
  {
    question: 'O que se assemelha ao exercício físico regular no mundo da programação?',
    options: [
      'Refatorar e revisar código',
      'Ficar sem versionamento',
      'Usar console.log em tudo',
      'Nunca atualizar o sistema',
    ],
    correct: 0,
    explanation:
      "Refatorar e revisar código é como fazer exercícios regulares - mantém o código 'em forma' e saudável!",
  },
  {
    question: "O corpo humano precisa de hidratação constante. Qual seria a 'água' da programação?",
    options: [
      'Internet',
      'Comentários no código',
      'Atualizações de software',
      'Boas práticas de versionamento',
    ],
    correct: 3,
    explanation:
      'Boas práticas de versionamento são como a água para o projeto - essenciais para manter tudo funcionando e organizado!',
  },
  {
    question: "O que pode causar um 'burnout digital' no programador?",
    options: [
      'Pausas regulares',
      'Boa ergonomia',
      'Trabalhar horas seguidas sem descanso',
      'Estudo com moderação',
    ],
    correct: 2,
    explanation:
      'Trabalhar horas seguidas sem descanso é o caminho certo para o burnout - tanto físico quanto digital!',
  },
  {
    question: "Se vitaminas ajudam o corpo, o que ajuda o código a ficar 'forte'?",
    options: ['Documentação clara', 'Código duplicado', 'Falta de testes', 'Ignorar bugs'],
    correct: 0,
    explanation:
      'Documentação clara é como as vitaminas para o código - fortalece o entendimento e facilita a manutenção!',
  },
  {
    question: 'Qual a semelhança entre alongamento físico e debugging?',
    options: [
      'Ambos são perda de tempo',
      'Ambos previnem problemas maiores',
      'Não têm utilidade prática',
      'São feitos apenas no início',
    ],
    correct: 1,
    explanation:
      'Assim como alongamento previne lesões, debugging previne problemas maiores no futuro - ambos são investimentos em saúde!',
  },
  {
    question:
      "Em saúde, o excesso faz mal. Em programação, o excesso de quê pode 'adoecer' o projeto?",
    options: [
      'Testes automatizados',
      'Comentários explicativos',
      'Dependências externas desnecessárias',
      'Planejamento',
    ],
    correct: 2,
    explanation:
      'Dependências desnecessárias são como o excesso de medicamentos - podem causar mais problemas do que soluções!',
  },
]

// --- Estados Reativos ---
const questions = ref(questionsData) // Mantendo original para referência
const order = ref([]) // Ordem embaralhada
const currentIndex = ref(0)
const score = ref(0)
const correctAnswers = ref(0)
const wrongAnswers = ref(0)
const selectedAnswer = ref(null)
const locked = ref(false) // Impede cliques durante o feedback
const showResult = ref(false)

// Estados do Feedback
const showFeedback = ref(false)
const isCorrect = ref(false)

// --- Computados ---
const currentQuestionData = computed(() => {
  if (order.value.length === 0) return null
  const index = order.value[currentIndex.value]
  return questions.value[index]
})

const progressPercentage = computed(() => {
  return ((currentIndex.value + 1) / questions.value.length) * 100
})

const feedbackClass = computed(() => {
  return isCorrect.value ? 'feedback-correct' : 'feedback-incorrect'
})

const resultMessage = computed(() => {
  const percentage = Math.round((correctAnswers.value / questions.value.length) * 100)
  if (percentage >= 90)
    return '🎉 Excelente! Seu código é saudável como uma dieta equilibrada! Você domina tanto a saúde quanto a programação!'
  if (percentage >= 70)
    return '👍 Muito bom! Você está no caminho certo para um desenvolvimento saudável! Continue assim!'
  if (percentage >= 50)
    return '⚠️ Cuidado! Seu projeto está precisando de alguns ajustes na "dieta digital". Estude mais sobre boas práticas!'
  return '🚨 Atenção! Seu projeto está cheio de "junk food digital"! É hora de revisar os conceitos de programação saudável!'
})

// --- Métodos ---

function init() {
  // Embaralha os índices das perguntas
  order.value = [...Array(questions.value.length).keys()].sort(() => Math.random() - 0.5)

  currentIndex.value = 0
  score.value = 0
  correctAnswers.value = 0
  wrongAnswers.value = 0
  selectedAnswer.value = null
  locked.value = false
  showResult.value = false
  showFeedback.value = false
}

function playSound(type) {
  // Implementação simples de áudio via Web Audio API
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return

    const audioContext = new AudioContext()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === 'correct') {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1)
    } else if (type === 'incorrect') {
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.1)
    } else if (type === 'click') {
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  } catch (e) {
    console.error('Audio error', e)
  }
}

function selectAnswer(index) {
  if (locked.value) return
  selectedAnswer.value = index
  playSound('click')
}

function confirmAnswer() {
  if (selectedAnswer.value === null) return

  locked.value = true
  const correctOption = currentQuestionData.value.correct
  isCorrect.value = selectedAnswer.value === correctOption

  // Atualizar pontuação
  if (isCorrect.value) {
    correctAnswers.value++
    score.value += 10
    playSound('correct')
  } else {
    wrongAnswers.value++
    playSound('incorrect')
  }

  // Mostrar Feedback
  showFeedback.value = true

  // Delay para próxima pergunta (6 segundos, conforme lógica original)
  setTimeout(() => {
    nextQuestion()
  }, 6000)
}

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++
    selectedAnswer.value = null
    locked.value = false
    showFeedback.value = false
  } else {
    showResult.value = true
  }
}

function restartQuiz() {
  init()
}

// --- Lifecycle ---
onMounted(() => {
  init()
})
</script>
