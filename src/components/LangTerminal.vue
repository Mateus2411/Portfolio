<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { gsap } from '@/lib/motion'

const props = defineProps({ lang: { type: Object, required: true } })

// destaque de sintaxe bem simples: comentário, string, palavra-chave, número, tag
const RE =
  /(\/\/.*|#.*|<!--.*?-->|\/\*.*?\*\/)|("[^"\n]*"|'[^'\n]*'|`[^`\n]*`)|\b(const|let|import|from|export|interface|function|return|def|class|public|static|void|int|while|if|in|async|await|new|true|false|True|False|default)\b|(\b\d+\b)|(<\/?[\w-]+|\/?>)/g
const COLORS = ['text-mute italic', 'text-aqua', 'text-pink', 'text-amber-300', 'text-violet']

const tokens = computed(() => {
  const code = props.lang.code
  const out = []
  let last = 0
  for (const m of code.matchAll(RE)) {
    if (m.index > last) out.push({ t: code.slice(last, m.index), c: '' })
    const g = m.slice(1).findIndex(Boolean)
    out.push({ t: m[0], c: COLORS[g] })
    last = m.index + m[0].length
  }
  out.push({ t: code.slice(last), c: '' })
  return out
})

// quantos caracteres já foram "digitados"
const count = ref(0)
let tween
watch(
  () => props.lang,
  (l) => {
    tween?.kill()
    count.value = 0
    const o = { v: 0 }
    tween = gsap.to(o, {
      v: l.code.length,
      duration: l.code.length / 90,
      ease: 'none',
      onUpdate: () => (count.value = Math.round(o.v)),
    })
  },
  { immediate: true },
)
onBeforeUnmount(() => tween?.kill())

const visible = computed(() => {
  let left = count.value
  const out = []
  for (const tk of tokens.value) {
    if (left <= 0) break
    out.push({ t: tk.t.slice(0, left), c: tk.c })
    left -= tk.t.length
  }
  return out
})
</script>

<template>
  <div class="glass overflow-hidden rounded-2xl">
    <div class="flex items-center gap-2 border-b border-white/10 px-4 py-3">
      <i class="size-3 rounded-full bg-[#ff5f57]" /><i class="size-3 rounded-full bg-[#febc2e]" /><i
        class="size-3 rounded-full bg-[#28c840]"
      />
      <AnimatePresence mode="wait">
        <motion.span
          :key="lang.key"
          :initial="{ opacity: 0, y: 8 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -8 }"
          class="ml-3 flex items-center gap-2 font-mono text-xs text-mute"
        >
          <span
            class="size-2 rounded-full"
            :style="{ background: lang.color }"
          />
          {{ lang.file }}
        </motion.span>
      </AnimatePresence>
    </div>
    <pre
      class="h-72 overflow-hidden p-5 font-mono text-[13px] leading-relaxed text-white/90 md:text-sm"
    ><span v-for="(tk, i) in visible" :key="i" :class="tk.c">{{ tk.t }}</span><span class="ml-px inline-block h-4 w-2 animate-blink align-middle" :style="{ background: lang.color }" /></pre>
  </div>
</template>
