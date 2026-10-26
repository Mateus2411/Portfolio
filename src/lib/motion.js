import { reactive } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)

export const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

// Scroll liso: Lenis dirige o scroll e o GSAP usa o mesmo relógio
export const lenis = new Lenis({ duration: 1.2, smoothWheel: !reduced, wheelMultiplier: 0.9 })
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((t) => lenis.raf(t * 1000))
gsap.ticker.lagSmoothing(0)

export const scrollTo = (target) => lenis.scrollTo(target, { duration: 1.6, offset: 0 })

// estado do cursor customizado (texto que aparece ao passar em cima das coisas)
export const cursor = reactive({ label: '', big: false })

// v-magnetic: o elemento é puxado na direção do mouse
export const magnetic = {
  mounted(el, { value = 0.35 }) {
    if (matchMedia('(pointer: coarse)').matches) return
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    el._mm = (e) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - r.left - r.width / 2) * value)
      y((e.clientY - r.top - r.height / 2) * value)
    }
    el._ml = () => (x(0), y(0))
    el.addEventListener('pointermove', el._mm)
    el.addEventListener('pointerleave', el._ml)
  },
  unmounted(el) {
    el.removeEventListener('pointermove', el._mm)
    el.removeEventListener('pointerleave', el._ml)
  },
}

// v-cursor="'texto'": muda o cursor quando o mouse passa no elemento
export const cursorDirective = {
  mounted(el, { value }) {
    el.addEventListener('pointerenter', () =>
      Object.assign(cursor, { label: value || '', big: true }),
    )
    el.addEventListener('pointerleave', () => Object.assign(cursor, { label: '', big: false }))
  },
}

export { gsap, ScrollTrigger, SplitText }
