<script setup>
import { ref, watch } from 'vue'
import { motion, AnimatePresence, useScroll, useSpring } from 'motion-v'
import { scrollTo, lenis } from '@/lib/motion'

const { scrollYProgress } = useScroll()
const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
const links = [
  ['sobre', '#sobre'],
  ['stack', '#stack'],
  ['projetos', '#projetos'],
  ['contato', '#contato'],
]

// menu em tela cheia do celular
const open = ref(false)
watch(open, (v) => (v ? lenis.stop() : lenis.start()))
function go(href) {
  if (!open.value) return scrollTo(href)
  open.value = false
  // espera o menu fechar antes de rolar
  setTimeout(() => scrollTo(href), 350)
}
const ease = [0.16, 1, 0.3, 1]
</script>

<template>
  <motion.header
    :initial="{ y: -80, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ delay: 0.4, duration: 0.8, ease }"
    class="pt-safe fixed inset-x-0 top-0 z-50 px-4 md:px-8"
  >
    <nav
      class="glass relative z-10 mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-5"
    >
      <button class="font-mono text-sm font-semibold" @click="go(0)">mateus</button>
      <ul class="hidden items-center gap-1 text-sm text-mute sm:flex">
        <li v-for="[label, href] in links" :key="href">
          <a
            :href="href"
            class="rounded-lg px-3 py-1.5 transition hover:bg-white/5 hover:text-white"
            @click.prevent="scrollTo(href)"
            >{{ label }}</a
          >
        </li>
        <li>
          <a
            href="https://github.com/Mateus2411"
            target="_blank"
            rel="noopener"
            class="ml-2 block rounded-lg bg-white px-3 py-1.5 font-medium text-ink transition-colors hover:bg-aqua"
            >GitHub ↗</a
          >
        </li>
      </ul>

      <!-- botão do menu (celular) -->
      <button
        class="relative flex size-10 items-center justify-center rounded-xl sm:hidden"
        :aria-expanded="open"
        aria-label="Abrir menu"
        @click="open = !open"
      >
        <span
          class="absolute h-0.5 w-5 rounded bg-white transition-transform duration-300"
          :class="open ? 'rotate-45' : '-translate-y-1.5'"
        />
        <span
          class="absolute h-0.5 w-5 rounded bg-white transition-opacity duration-200"
          :class="open ? 'opacity-0' : ''"
        />
        <span
          class="absolute h-0.5 w-5 rounded bg-white transition-transform duration-300"
          :class="open ? '-rotate-45' : 'translate-y-1.5'"
        />
      </button>

      <motion.div
        :style="{ scaleX: progress }"
        class="absolute inset-x-5 bottom-0 h-px origin-left bg-white/30"
      />
    </nav>

    <AnimatePresence>
      <motion.div
        v-if="open"
        key="menu"
        :initial="{ clipPath: 'circle(0% at 92% 6%)' }"
        :animate="{ clipPath: 'circle(150% at 92% 6%)' }"
        :exit="{ clipPath: 'circle(0% at 92% 6%)' }"
        :transition="{ duration: 0.7, ease }"
        class="fixed inset-0 flex flex-col justify-between bg-ink px-6 pt-28 pb-safe sm:hidden"
      >
        <ul class="relative flex flex-col gap-2">
          <motion.li
            v-for="([label, href], i) in links"
            :key="href"
            :initial="{ y: 60, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ delay: 0.15 + i * 0.06, duration: 0.7, ease }"
          >
            <a
              :href="href"
              class="block border-b border-white/10 py-3 text-5xl font-bold tracking-tighter active:text-aqua"
              @click.prevent="go(href)"
              >{{ label }}</a
            >
          </motion.li>
        </ul>
        <motion.div
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ delay: 0.45 }"
          class="relative grid grid-cols-2 gap-3"
        >
          <a
            href="https://github.com/Mateus2411"
            target="_blank"
            rel="noopener"
            class="rounded-2xl bg-white py-4 text-center font-medium text-ink"
            >GitHub ↗</a
          >
          <a
            href="https://instagram.com/mateus_.hs"
            target="_blank"
            rel="noopener"
            class="glass rounded-2xl py-4 text-center font-medium"
            >Instagram ↗</a
          >
        </motion.div>
      </motion.div>
    </AnimatePresence>
  </motion.header>
</template>
