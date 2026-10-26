<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import { motion } from 'motion-v'
import { World } from '@/three/World'
import { gsap, ScrollTrigger, SplitText, cursor, scrollTo, lenis } from '@/lib/motion'
import { langs, projects, GITHUB_USER } from '@/data'
import PreLoader from '@/components/PreLoader.vue'
import NavBar from '@/components/NavBar.vue'
import LangTerminal from '@/components/LangTerminal.vue'

const canvas = ref(null)
const root = ref(null)
const track = ref(null)
const world = shallowRef(null)
const progress = ref(0)
const loaded = ref(false)
const current = ref(0)
const repoCount = ref(26)
let ctx,
  cycle,
  pausedUntil = 0,
  cursorFromWorld = false

// posição do cristal/câmera/cubos em cada seção [desktop, celular]
const T = {
  hero: [
    {
      camX: 0,
      camY: 0,
      camZ: 10,
      crX: 2.6,
      crY: 0.1,
      crZ: 0,
      crS: 1,
      w0: 1,
      w1: 0,
      w2: 0,
      w3: 0,
      w4: 0,
      tint: 0,
    },
    {
      camX: 0,
      camY: 0,
      camZ: 11,
      crX: 0,
      crY: 2.1,
      crZ: -1,
      crS: 0.7,
      w0: 1,
      w1: 0,
      w2: 0,
      w3: 0,
      w4: 0,
      tint: 0,
    },
  ],
  sobre: [
    {
      camX: 0,
      camY: 0,
      camZ: 11,
      crX: -4,
      crY: -0.5,
      crZ: -3,
      crS: 0.8,
      w0: 0,
      w1: 1,
      w2: 0,
      w3: 0,
      w4: 0,
      tint: 0.3,
    },
    {
      camX: 0,
      camY: 0,
      camZ: 12,
      crX: 0,
      crY: -2.5,
      crZ: -5,
      crS: 0.7,
      w0: 0,
      w1: 1,
      w2: 0,
      w3: 0,
      w4: 0,
      tint: 0.3,
    },
  ],
  stack: [
    {
      camX: 0,
      camY: 0,
      camZ: 10,
      crX: 3.4,
      crY: 0,
      crZ: -3,
      crS: 0.55,
      w0: 0,
      w1: 0,
      w2: 1,
      w3: 0,
      w4: 0,
      tint: 0.55,
    },
    {
      camX: 0,
      camY: 0,
      camZ: 12,
      crX: 0,
      crY: 2.2,
      crZ: -3,
      crS: 0.5,
      w0: 0,
      w1: 0,
      w2: 1,
      w3: 0,
      w4: 0,
      tint: 0.55,
    },
  ],
  projetos: [
    {
      camX: 0,
      camY: 0,
      camZ: 12,
      crX: 0,
      crY: 0,
      crZ: -9,
      crS: 1.6,
      w0: 0,
      w1: 0,
      w2: 0,
      w3: 1,
      w4: 0,
      tint: 0.8,
    },
    {
      camX: 0,
      camY: 0,
      camZ: 13,
      crX: 0,
      crY: 0,
      crZ: -9,
      crS: 1.4,
      w0: 0,
      w1: 0,
      w2: 0,
      w3: 1,
      w4: 0,
      tint: 0.8,
    },
  ],
  contato: [
    {
      camX: 0,
      camY: 0,
      camZ: 10,
      crX: 0,
      crY: 0,
      crZ: -1,
      crS: 0.8,
      w0: 0,
      w1: 0,
      w2: 0,
      w3: 0,
      w4: 1,
      tint: 1,
    },
    {
      camX: 0,
      camY: 0,
      camZ: 12,
      crX: 0,
      crY: 0.6,
      crZ: -1,
      crS: 0.7,
      w0: 0,
      w1: 0,
      w2: 0,
      w3: 0,
      w4: 1,
      tint: 1,
    },
  ],
}

function pick(i, manual = false) {
  current.value = i
  if (manual) pausedUntil = performance.now() + 15000
}

onMounted(() => {
  lenis.stop()
  world.value = new World(canvas.value, langs, {
    onProgress: (p) => (progress.value = p),
    onSelect: (i) => pick(i, true),
    onHover: (h) => {
      if (h) {
        Object.assign(cursor, { label: h === 'crystal' ? 'clique 💥' : 'arraste', big: true })
        cursorFromWorld = true
      } else if (cursorFromWorld) {
        Object.assign(cursor, { label: '', big: false })
        cursorFromWorld = false
      }
    },
  })
  // sem textura de rede, nada trava o preloader; ainda assim garante o fim
  world.value.ready.then(() => (progress.value = 1))

  fetch(`https://api.github.com/users/${GITHUB_USER}`)
    .then((r) => r.ok && r.json())
    .then((u) => u?.public_repos && (repoCount.value = u.public_repos))
    .catch(() => {})

  // as linguagens trocam sozinhas, a não ser que alguém escolha uma
  cycle = setInterval(() => {
    if (performance.now() > pausedUntil) world.value?.select((current.value + 1) % langs.length)
  }, 6000)
})

// SplitText quebra o background-clip do gradiente: cada pedaço dentro de
// .text-grad recebe o próprio gradiente (palavras inteiras, não letra a letra)
function split(target, opts) {
  const s = SplitText.create(target, opts)
  s.words.forEach((w) => {
    if (!w.parentElement.closest('.text-grad')) return
    w.classList.add('text-grad')
    w.querySelectorAll('*').forEach((c) => c.classList.add('text-grad'))
  })
  return s
}

async function start() {
  loaded.value = true
  await nextTick()
  lenis.start()
  ctx = gsap.context(() => {
    // ---------- entrada do hero ----------
    const name = split('.hero-name', { type: 'words,chars', mask: 'chars' })
    gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      .from(name.chars, { yPercent: 120, rotate: 8, duration: 1.4, stagger: 0.05 })
      .from('.hero-in', { y: 30, opacity: 0, duration: 1.2, stagger: 0.1 }, 0.3)
      .from('.marquee', { opacity: 0, duration: 1.5 }, 0.8)

    // ---------- títulos das seções ----------
    gsap.utils.toArray('.sec-title').forEach((el) => {
      const s = split(el, { type: 'words,chars', mask: 'chars' })
      gsap.from(s.chars, {
        yPercent: 110,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.025,
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })

    // ---------- texto do "sobre" acendendo palavra por palavra ----------
    const words = SplitText.create('.statement', { type: 'words' }).words
    gsap.fromTo(
      words,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: '.statement', start: 'top 80%', end: 'bottom 50%', scrub: true },
      },
    )

    // contadores
    gsap.utils.toArray('[data-count]').forEach((el) => {
      const o = { v: 0 }
      gsap.to(o, {
        v: () => +el.dataset.count,
        duration: 2,
        ease: 'power3.out',
        onUpdate: () => (el.textContent = Math.round(o.v)),
        scrollTrigger: { trigger: el, start: 'top 90%' },
      })
    })

    // ---------- cena 3D guiada pelo scroll ----------
    const mm = gsap.matchMedia()
    mm.add({ desk: '(min-width: 768px)', mob: '(max-width: 767px)' }, (c) => {
      const k = c.conditions.desk ? 0 : 1
      const s = world.value.state
      Object.assign(s, T.hero[k])
      const move = (from, to, trigger, extra = {}) =>
        gsap.fromTo(
          s,
          { ...T[from][k] },
          {
            ...T[to][k],
            ease: 'none',
            immediateRender: false,
            scrollTrigger: { trigger, start: 'top bottom', end: 'top 25%', scrub: 1.2, ...extra },
          },
        )

      move('hero', 'sobre', '#sobre')
      move('sobre', 'stack', '#stack')
      move('stack', 'projetos', '#projetos', { end: 'top top' })

      // galeria horizontal dos projetos (só no desktop)
      if (c.conditions.desk) {
        const dist = () => track.value.scrollWidth - innerWidth + 64
        gsap.to(track.value, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: '#projetos',
            start: 'top top',
            end: () => '+=' + dist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      }
      move('projetos', 'contato', '#contato')
    })

    // ---------- contato ----------
    const big = split('.contact-big', { type: 'words', mask: 'words' })
    gsap.from(big.words, {
      yPercent: 120,
      rotate: 6,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.contact-big', start: 'top 80%' },
    })

    ScrollTrigger.refresh()
  }, root.value)
}

onBeforeUnmount(() => {
  clearInterval(cycle)
  ctx?.revert()
  world.value?.dispose()
  Object.assign(cursor, { label: '', big: false })
})

const marquee = [...langs, ...langs]
</script>

<template>
  <canvas ref="canvas" class="fixed inset-0 z-0 h-svh w-full touch-pan-y" aria-hidden="true" />
  <PreLoader v-if="!loaded" :progress="progress" @done="start" />
  <NavBar />

  <main ref="root" class="pointer-events-none relative z-10 select-none">
    <!-- ================= HERO ================= -->
    <section
      id="hero"
      class="relative flex min-h-svh flex-col justify-end px-5 pb-28 md:justify-center md:px-12 md:pb-0"
    >
      <div class="mx-auto w-full max-w-6xl">
        <p
          class="hero-in mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs text-mute"
        >
          <span class="size-2 animate-pulse rounded-full bg-aqua shadow-[0_0_12px] shadow-aqua" />
          Araquari, SC · estudante de T.I. no IFC
        </p>
        <h1 class="text-[17vw] leading-[0.85] font-bold tracking-[-0.06em] md:text-[11vw]">
          <span class="hero-name block">Mateus</span>
          <span class="hero-name block pb-[0.08em]"><span class="text-grad">Henrique</span></span>
        </h1>
        <p class="hero-in mt-6 max-w-md text-lg text-white/70 md:text-xl">
          Dev em formação que transforma café em <b class="text-white">Vue, Node, Python e Java</b>.
          Construindo coisas todo dia.
        </p>
        <div class="hero-in pointer-events-auto mt-8 flex flex-wrap gap-3">
          <button
            v-magnetic
            v-cursor="'bora'"
            class="rounded-full bg-white px-6 py-3 font-medium text-ink transition-colors hover:bg-aqua"
            @click="scrollTo('#projetos')"
          >
            Ver projetos ↓
          </button>
          <button
            v-magnetic
            class="glass rounded-full px-6 py-3 font-medium transition-colors hover:border-aqua"
            @click="scrollTo('#contato')"
          >
            Falar comigo
          </button>
        </div>
        <p class="hero-in mt-8 hidden font-mono text-xs text-mute md:block">
          🧊 arraste e arremesse os cubos · 💎 clique no cristal
        </p>
      </div>

      <div
        class="marquee absolute inset-x-0 bottom-6 overflow-hidden border-y border-white/5 py-3 opacity-70"
      >
        <div
          class="flex w-max animate-marquee gap-10 font-mono text-sm whitespace-nowrap text-mute"
        >
          <span v-for="(l, i) in marquee" :key="i" class="flex items-center gap-3">
            <span class="size-1.5 rounded-full" :style="{ background: l.color }" />{{ l.name }}
          </span>
        </div>
      </div>
    </section>

    <!-- ================= SOBRE ================= -->
    <section id="sobre" class="px-5 py-32 md:px-12 md:py-48">
      <div class="mx-auto max-w-6xl">
        <p class="mb-8 font-mono text-sm text-aqua">01 — sobre</p>
        <p
          class="statement max-w-5xl text-3xl leading-[1.15] font-medium tracking-tight md:text-6xl"
        >
          Sou estudante do Instituto Federal em Araquari, apaixonado por tecnologia, café e código
          aberto. Aprendo construindo: saí do HTML puro, passei por Vue, Node e Django, e hoje
          brinco com agentes de IA e deploy.
        </p>
        <div class="mt-20 grid grid-cols-2 gap-3 md:grid-cols-4">
          <motion.div
            v-for="(s, i) in [
              { v: repoCount, l: 'repositórios públicos' },
              { v: langs.length, l: 'linguagens e ferramentas' },
              { v: 4, l: 'projetos no ar' },
              { v: null, l: 'cafés por commit' },
            ]"
            :key="s.l"
            :initial="{ opacity: 0, y: 40 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :in-view-options="{ once: true, margin: '-10%' }"
            :transition="{ delay: i * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }"
            class="glass rounded-3xl p-6"
          >
            <div class="text-grad text-5xl font-bold tracking-tighter md:text-6xl">
              <span v-if="s.v !== null" :data-count="s.v">0</span><span v-else>∞</span>
            </div>
            <div class="mt-2 text-sm text-mute">{{ s.l }}</div>
          </motion.div>
        </div>
      </div>
    </section>

    <!-- ================= STACK ================= -->
    <section id="stack" class="px-5 py-32 md:px-12">
      <div class="mx-auto grid min-h-[80svh] max-w-6xl items-center md:grid-cols-2">
        <div>
          <!-- no celular o anel de cubos fica em cima -->
          <div class="h-[42svh] md:hidden" />
          <p class="mb-4 font-mono text-sm text-aqua">02 — stack</p>
          <h2 class="sec-title text-5xl font-bold tracking-tighter md:text-7xl">
            Minhas linguagens
          </h2>
          <p class="mt-4 max-w-md text-white/60">
            Cada cubo de gelo é uma linguagem que eu uso. Clica num deles (ou aqui embaixo) e vê um
            pedaço de código meu sendo digitado.
          </p>
          <div class="pointer-events-auto mt-6 flex flex-wrap gap-2">
            <motion.button
              v-for="(l, i) in langs"
              :key="l.key"
              :while-hover="{ y: -3 }"
              :while-press="{ scale: 0.94 }"
              class="flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors"
              :class="
                current === i
                  ? 'border-transparent text-ink'
                  : 'border-white/10 text-white/70 hover:text-white'
              "
              :style="current === i ? { background: l.color } : {}"
              @click="world?.select(i)"
            >
              <img :src="`/icons/${l.key}.svg`" alt="" class="size-4" onerror="this.remove()" />{{
                l.name
              }}
            </motion.button>
          </div>
          <div class="pointer-events-auto mt-8 select-text">
            <LangTerminal :lang="langs[current]" />
          </div>
        </div>
      </div>
    </section>

    <!-- ================= PROJETOS ================= -->
    <section
      id="projetos"
      class="overflow-hidden py-24 md:flex md:h-svh md:flex-col md:justify-center md:py-0"
    >
      <div class="mx-auto mb-10 w-full max-w-6xl px-5 md:px-12">
        <p class="mb-4 font-mono text-sm text-aqua">03 — projetos</p>
        <h2 class="sec-title text-5xl font-bold tracking-tighter md:text-7xl">Coisas que eu fiz</h2>
      </div>
      <div
        ref="track"
        class="flex flex-col gap-5 px-5 md:w-max md:flex-row md:pr-12 md:pl-[max(3rem,calc((100vw-72rem)/2+3rem))]"
      >
        <motion.article
          v-for="(p, i) in projects"
          :key="p.repo"
          :initial="{ opacity: 0, y: 60 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :while-hover="{ y: -12, rotate: -0.6 }"
          :transition="{ type: 'spring', stiffness: 160, damping: 20 }"
          class="glass pointer-events-auto group relative flex w-full shrink-0 flex-col overflow-hidden rounded-[2rem] md:h-[62svh] md:w-[min(34rem,70vw)]"
        >
          <div
            class="relative flex h-48 items-center justify-center overflow-hidden md:h-auto md:flex-1"
            :style="{
              background: `radial-gradient(circle at 30% 20%, ${p.hue[0]}, transparent 60%), radial-gradient(circle at 80% 90%, ${p.hue[1]}, transparent 55%), #0b0c16`,
            }"
          >
            <span class="absolute top-4 left-6 font-mono text-sm text-white/60">0{{ i + 1 }}</span>
            <span
              v-if="p.live"
              class="absolute top-4 right-5 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 font-mono text-xs backdrop-blur"
            >
              <span class="size-1.5 animate-pulse rounded-full bg-aqua" /> no ar
            </span>
            <span
              class="text-7xl transition-transform duration-700 ease-out group-hover:scale-125 group-hover:rotate-12 md:text-8xl"
              >{{ p.icon }}</span
            >
          </div>
          <div class="flex flex-col gap-3 p-6">
            <h3 class="text-2xl font-bold tracking-tight">{{ p.name }}</h3>
            <p class="text-sm text-white/60">{{ p.desc }}</p>
            <div class="flex flex-wrap gap-2 font-mono text-xs">
              <span
                v-for="t in p.tags"
                :key="t"
                class="rounded-md bg-white/5 px-2 py-1 text-mute"
                >{{ t }}</span
              >
            </div>
            <div class="mt-2 flex gap-5 text-sm">
              <a
                v-if="p.live"
                v-cursor="'abrir'"
                :href="p.live"
                target="_blank"
                rel="noopener"
                class="border-b border-aqua pb-0.5 hover:text-aqua"
                >Ver ao vivo ↗</a
              >
              <a
                v-cursor="'código'"
                :href="`https://github.com/${GITHUB_USER}/${p.repo}`"
                target="_blank"
                rel="noopener"
                class="border-b border-white/20 pb-0.5 hover:border-white"
                >Código</a
              >
            </div>
          </div>
        </motion.article>
        <a
          v-cursor="'github'"
          :href="`https://github.com/${GITHUB_USER}?tab=repositories`"
          target="_blank"
          rel="noopener"
          class="pointer-events-auto flex shrink-0 items-center justify-center rounded-[2rem] border border-dashed border-white/15 p-10 text-center text-xl text-white/60 transition-colors hover:border-aqua hover:text-white md:h-[62svh] md:w-80"
        >
          + {{ repoCount - projects.length }} repositórios<br />no GitHub ↗
        </a>
      </div>
    </section>

    <!-- ================= CONTATO ================= -->
    <section id="contato" class="flex min-h-svh flex-col justify-center px-5 py-32 md:px-12">
      <div class="mx-auto w-full max-w-6xl text-center">
        <p class="mb-6 font-mono text-sm text-aqua">04 — contato</p>
        <h2
          class="contact-big text-[13vw] leading-[0.9] font-bold tracking-[-0.05em] md:text-[8vw]"
        >
          Bora criar algo <span class="text-grad">juntos?</span>
        </h2>
        <p class="mx-auto mt-6 max-w-md text-white/60">
          Aberto a estágios, colaborações, conversas sobre código e ideias malucas.
        </p>
        <div class="pointer-events-auto mt-10 flex flex-wrap justify-center gap-3">
          <a
            v-magnetic
            v-cursor="'email'"
            href="mailto:mateushenriquedasilva2411@gmail.com"
            class="rounded-full bg-white px-7 py-4 font-medium text-ink transition-colors hover:bg-aqua"
            >✉ mateushenriquedasilva2411@gmail.com</a
          >
          <a
            v-magnetic
            href="https://github.com/Mateus2411"
            target="_blank"
            rel="noopener"
            class="glass rounded-full px-7 py-4 font-medium transition-colors hover:border-aqua"
            >GitHub</a
          >
          <a
            v-magnetic
            href="https://instagram.com/mateus_.hs"
            target="_blank"
            rel="noopener"
            class="glass rounded-full px-7 py-4 font-medium transition-colors hover:border-pink"
            >Instagram</a
          >
        </div>
      </div>
      <footer
        class="mx-auto mt-32 flex w-full max-w-6xl flex-wrap justify-between gap-4 border-t border-white/10 pt-6 font-mono text-xs text-mute"
      >
        <span>© 2026 Mateus Henrique da Silva</span>
        <span>Vue · Three.js · GSAP · Motion · Tailwind</span>
        <router-link to="/quiz" class="pointer-events-auto hover:text-aqua"
          >joga meu quiz →</router-link
        >
      </footer>
    </section>
  </main>
</template>
