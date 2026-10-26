<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap, cursor } from '@/lib/motion'

const dot = ref(null)
const ring = ref(null)
const fine = matchMedia('(pointer: fine)').matches
let off

onMounted(() => {
  if (!fine) return
  document.documentElement.classList.add('has-cursor')
  const dx = gsap.quickTo(dot.value, 'x', { duration: 0.08 })
  const dy = gsap.quickTo(dot.value, 'y', { duration: 0.08 })
  const rx = gsap.quickTo(ring.value, 'x', { duration: 0.45, ease: 'power3' })
  const ry = gsap.quickTo(ring.value, 'y', { duration: 0.45, ease: 'power3' })
  const move = (e) => (dx(e.clientX), dy(e.clientY), rx(e.clientX), ry(e.clientY))
  addEventListener('pointermove', move)
  off = () => removeEventListener('pointermove', move)
})
onBeforeUnmount(() => off?.())
</script>

<template>
  <div v-if="fine" class="pointer-events-none fixed inset-0 z-[100]">
    <div
      ref="dot"
      class="absolute -top-1 -left-1 size-2 rounded-full bg-white mix-blend-difference"
    />
    <div ref="ring" class="absolute top-0 left-0">
      <div
        class="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 font-mono text-[11px] tracking-wide text-ink transition-all duration-300 ease-out"
        :class="cursor.big ? 'size-24 border-transparent bg-aqua' : 'size-9'"
      >
        <span :class="cursor.label ? 'opacity-100' : 'opacity-0'" class="transition-opacity">{{
          cursor.label
        }}</span>
      </div>
    </div>
  </div>
</template>
