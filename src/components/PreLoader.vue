<script setup>
import { onMounted, ref, watch } from 'vue'
import { gsap } from '@/lib/motion'

const props = defineProps({ progress: { type: Number, default: 0 } })
const emit = defineEmits(['done'])
const shown = ref(0)
const root = ref(null)
const counter = { v: 0 }
let finished = false

// o contador persegue o progresso real de carregamento
watch(
  () => props.progress,
  (p) =>
    gsap.to(counter, {
      v: p * 100,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => (shown.value = Math.round(counter.v)),
      onComplete: () => p >= 1 && leave(),
    }),
)

function leave() {
  if (finished) return
  finished = true
  gsap
    .timeline({ onComplete: () => emit('done') })
    .to('.pl-num', { yPercent: -110, duration: 0.6, ease: 'power3.in' })
    .to(root.value, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=0.1')
}

onMounted(() => gsap.from('.pl-bar', { scaleX: 0, duration: 1.4, ease: 'expo.out' }))
</script>

<template>
  <div
    ref="root"
    class="fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-6 md:p-10"
    style="clip-path: inset(0 0 0 0)"
  >
    <div class="flex justify-between font-mono text-xs text-mute">
      <span>mateus/portfolio</span>
      <span>carregando os cubos de gelo 🧊</span>
    </div>
    <div class="flex items-end justify-between">
      <div class="line-mask">
        <div class="pl-num text-[28vw] leading-[0.8] font-bold tracking-tighter md:text-[16vw]">
          {{ shown }}
        </div>
      </div>
      <div class="pl-bar mb-4 h-px w-1/3 origin-left bg-gradient-to-r from-violet to-aqua" />
    </div>
  </div>
</template>
