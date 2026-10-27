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

export { gsap, ScrollTrigger, SplitText }
