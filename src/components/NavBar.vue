<script setup>
import { motion, useScroll, useSpring } from 'motion-v'
import { scrollTo } from '@/lib/motion'

const { scrollYProgress } = useScroll()
const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
const links = [
  ['sobre', '#sobre'],
  ['stack', '#stack'],
  ['projetos', '#projetos'],
  ['contato', '#contato'],
]
</script>

<template>
  <motion.header
    :initial="{ y: -80, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }"
    class="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
  >
    <nav
      class="glass relative mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-5"
    >
      <button v-magnetic class="font-mono text-sm font-semibold" @click="scrollTo(0)">
        &lt;<span class="text-grad">mateus</span>/&gt;
      </button>
      <ul class="flex items-center gap-1 text-sm text-mute">
        <li v-for="[label, href] in links" :key="href" class="hidden sm:block">
          <a
            :href="href"
            class="rounded-lg px-3 py-1.5 transition hover:bg-white/5 hover:text-white"
            @click.prevent="scrollTo(href)"
            >{{ label }}</a
          >
        </li>
        <li>
          <a
            v-magnetic
            href="https://github.com/Mateus2411"
            target="_blank"
            rel="noopener"
            class="ml-2 block rounded-lg bg-white px-3 py-1.5 font-medium text-ink transition-colors hover:bg-aqua"
            >GitHub ↗</a
          >
        </li>
      </ul>
      <motion.div
        :style="{ scaleX: progress }"
        class="absolute inset-x-5 bottom-0 h-px origin-left bg-gradient-to-r from-violet via-aqua to-pink"
      />
    </nav>
  </motion.header>
</template>
