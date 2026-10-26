import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

const v3 = () => new THREE.Vector3()

/**
 * Cena 3D do portfólio: um cristal central, um cubo de gelo por linguagem
 * (arrastáveis e arremessáveis) e uma nevasca de partículas.
 * O scroll controla `state` via GSAP; os cubos seguem layouts misturados por pesos.
 */
export class World {
  constructor(canvas, langs, { onProgress, onSelect, onHover } = {}) {
    this.canvas = canvas
    this.langs = langs
    this.onSelect = onSelect || (() => {})
    this.onHover = onHover || (() => {})
    this.mobile = innerWidth < 768

    // tudo que o scroll anima
    this.state = {
      camX: 0,
      camY: 0,
      camZ: 10,
      crX: 2.4,
      crY: 0.2,
      crZ: 0,
      crS: 1,
      w0: 1,
      w1: 0,
      w2: 0,
      w3: 0,
      w4: 0,
      tint: 0,
      scrim: 0,
    }
    // no celular, a órbita do hero, o anel (stack) e o grupo do contato seguem um
    // elemento da página: fração da altura da tela onde está o centro dele
    // (null = usa o estado normal)
    this.anchors = { 0: null, 2: null, 4: null }
    this.prevAnchor = {}

    this.pointer = new THREE.Vector2(9, 9)
    this.mouse = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()
    this.clock = new THREE.Clock()
    this.selected = -1
    this.hovered = -1
    this.drag = null

    this.#setup()
    this.ready = this.#build(onProgress)
    this.#bind()
    this.renderer.setAnimationLoop(() => this.#tick())
  }

  #setup() {
    const r = (this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
    }))
    r.setPixelRatio(Math.min(devicePixelRatio, this.mobile ? 1.5 : 2))
    this.size = {
      w: this.canvas.clientWidth || innerWidth,
      h: this.canvas.clientHeight || innerHeight,
    }
    r.setSize(this.size.w, this.size.h, false)
    r.toneMapping = THREE.ACESFilmicToneMapping
    r.toneMappingExposure = 1.05

    this.scene = new THREE.Scene()
    this.bg = new THREE.Color().setStyle('#05060b', THREE.SRGBColorSpace)
    this.scene.background = this.bg
    this.scene.fog = new THREE.Fog('#05060b', 12, 30)

    const pm = new THREE.PMREMGenerator(r)
    this.scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture
    this.scene.environmentIntensity = 0.9

    this.camera = new THREE.PerspectiveCamera(
      this.mobile ? 55 : 40,
      this.size.w / this.size.h,
      0.1,
      100,
    )
    this.camera.position.set(0, 0, 10)

    const key = new THREE.DirectionalLight('#ffffff', 2)
    key.position.set(4, 6, 5)
    this.violet = new THREE.PointLight('#7c5cff', 40, 20)
    this.teal = new THREE.PointLight('#00e5c3', 40, 20)
    this.scene.add(key, this.violet, this.teal, new THREE.AmbientLight('#8899ff', 0.25))
  }

  async #build(onProgress) {
    // ---------- cristal ----------
    this.crystal = new THREE.Group()
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 0),
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0.04,
        metalness: 0,
        transmission: 1,
        thickness: 1.6,
        ior: 1.6,
        iridescence: 1,
        iridescenceIOR: 1.4,
        clearcoat: 1,
        flatShading: true,
        attenuationColor: new THREE.Color('#9a8cff'),
        attenuationDistance: 3,
      }),
    )
    this.wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.85, 1)),
      new THREE.LineBasicMaterial({ color: '#00e5c3', transparent: true, opacity: 0.8 }),
    )
    this.crystal.add(core, this.wire)
    this.crystalCore = core
    this.scene.add(this.crystal)

    // ---------- neve ----------
    const N = this.mobile ? 600 : 1400
    const pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4
    }
    const sg = new THREE.BufferGeometry()
    sg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    this.snow = new THREE.Points(
      sg,
      new THREE.PointsMaterial({
        color: '#cfe8ff',
        size: 0.045,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      }),
    )
    this.scene.add(this.snow)

    // ---------- cubos de gelo ----------
    const geo = new RoundedBoxGeometry(1, 1, 1, 5, 0.16)
    const face = new THREE.PlaneGeometry(0.6, 0.6)
    const faces = [
      [0, 0, 0.502, 0, 0],
      [0, 0, -0.502, 0, Math.PI],
      [0.502, 0, 0, 0, Math.PI / 2],
      [-0.502, 0, 0, 0, -Math.PI / 2],
      [0, 0.502, 0, -Math.PI / 2, 0],
      [0, -0.502, 0, Math.PI / 2, 0],
    ]
    let loaded = 0
    const textures = await Promise.all(
      this.langs.map((l) =>
        this.#logo(l).then((t) => {
          onProgress?.(++loaded / this.langs.length)
          return t
        }),
      ),
    )

    this.orbs = this.langs.map((l, i) => {
      const g = new THREE.Group()
      const mat = new THREE.MeshPhysicalMaterial({
        color: '#f4f9ff',
        roughness: 0.06,
        transmission: 1,
        thickness: 0.6,
        ior: 1.31,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        attenuationColor: new THREE.Color(l.color),
        attenuationDistance: 1.4,
        emissive: new THREE.Color(l.color),
        emissiveIntensity: 0,
      })
      const box = new THREE.Mesh(geo, mat)
      box.userData.index = i
      g.add(box)
      const fm = new THREE.MeshBasicMaterial({
        map: textures[i],
        transparent: true,
        depthWrite: false,
      })
      for (const [x, y, z, rx, ry] of faces) {
        const p = new THREE.Mesh(face, fm)
        p.position.set(x, y, z)
        p.rotation.set(rx, ry, 0)
        p.raycast = () => {}
        g.add(p)
      }
      const s = this.mobile ? 0.66 : 0.78
      g.scale.setScalar(s)
      g.rotation.set(Math.random() * 6, Math.random() * 6, 0)
      g.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 14, -10)
      this.scene.add(g)
      return {
        g,
        box,
        mat,
        base: s,
        scale: s,
        vel: v3(),
        spin: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, 0).multiplyScalar(0.6),
        home: v3(),
        seed: Math.random() * 100,
      }
    })
    this.hitTargets = [...this.orbs.map((o) => o.box), core]
  }

  // logo da linguagem desenhado num canvas -> textura nítida
  #logo(l) {
    return new Promise((resolve) => {
      const c = document.createElement('canvas')
      c.width = c.height = 256
      const ctx = c.getContext('2d')
      const done = () => {
        const t = new THREE.CanvasTexture(c)
        t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = 4
        resolve(t)
      }
      const text = () => {
        ctx.fillStyle = l.color
        ctx.font = 'bold 120px "Space Grotesk", sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(l.name.slice(0, 2).toLowerCase(), 128, 136)
        done()
      }
      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 20, 20, 216, 216)
        done()
      }
      img.onerror = text
      img.src = `${import.meta.env.BASE_URL}icons/${l.key}.svg`
    })
  }

  // ---------- layouts (posições-alvo dos cubos por seção) ----------
  #layouts(i, n, t) {
    const m = this.mobile
    const a = (i / n) * Math.PI * 2
    const out = []
    // 0 · hero: órbita em volta do cristal
    {
      const golden = Math.PI * (3 - Math.sqrt(5))
      const y = 1 - (i / (n - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = golden * i + t * 0.15
      // no celular: elipse estreita só na metade de cima, longe do texto
      const [rx, ry, rz] = m ? [1.9, 1.45, 1.6] : [4.1, 2.8, 3.3]
      out.push(
        new THREE.Vector3(Math.cos(th) * r * rx, y * ry, Math.sin(th) * r * rz).add(
          new THREE.Vector3(this.state.crX, this.#anchorY(0, this.state.crY), this.state.crZ),
        ),
      )
    }
    // 1 · sobre: espalhados ao fundo
    {
      const h = Math.sin(this.#seed(i) * 999)
      const side = i % 2 ? 1 : -1
      out.push(
        new THREE.Vector3(
          side * ((m ? 2.2 : 6.5) + (i % 3) * (m ? 0.8 : 1.4)) + Math.sin(t * 0.3 + i) * 0.4,
          h * (m ? 6 : 4) + Math.cos(t * 0.25 + i) * 0.4,
          (m ? -9 : -6) - (i % 4) * 1.8,
        ),
      )
    }
    // 2 · stack: anel girando ao lado do terminal
    {
      const R = m ? 1.95 : 2.7
      const th = a + t * 0.25
      const c = m ? new THREE.Vector3(0, this.#anchorY(2, 2.4), 0) : new THREE.Vector3(3.4, 0, 0)
      out.push(new THREE.Vector3(Math.cos(th) * R, Math.sin(th) * R, Math.sin(th * 2) * 0.4).add(c))
    }
    // 3 · projetos: hélice lá no fundo
    {
      const th = a * 1.5 + t * 0.2
      out.push(new THREE.Vector3(Math.cos(th) * 6, (i - n / 2) * 1.2, -12 + Math.sin(th) * 4))
    }
    // 4 · contato: todo mundo junto em volta do cristal
    {
      const golden = Math.PI * (3 - Math.sqrt(5))
      const y = 1 - (i / (n - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = golden * i - t * 0.3
      const R = m ? 1.7 : 2.3
      out.push(
        new THREE.Vector3(Math.cos(th) * r * R, y * R, Math.sin(th) * r * R).add(
          new THREE.Vector3(this.state.crX, this.#anchorY(4, this.state.crY), this.state.crZ),
        ),
      )
    }
    return out
  }

  #seed(i) {
    return this.orbs[i].seed
  }

  // ---------- interação ----------
  #bind() {
    this.handlers = {
      move: (e) => {
        this.#setPointer(e)
        if (this.drag) this.#dragTo()
      },
      down: (e) => {
        // só pega cubos quando o clique acontece no canvas (e não num botão/link)
        if (e.target !== this.canvas && !e.target.closest?.('[data-pass]')) return
        this.#setPointer(e)
        const hit = this.#pick()
        if (!hit) return
        if (hit.object === this.crystalCore) return this.#burst()
        const o = this.orbs[hit.object.userData.index]
        this.dragPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
          this.camera.getWorldDirection(v3()).negate(),
          o.g.position,
        )
        this.drag = {
          o,
          offset: o.g.position.clone().sub(hit.point),
          last: o.g.position.clone(),
          moved: 0,
          t: performance.now(),
        }
        document.body.classList.add('grabbing')
      },
      up: () => {
        if (!this.drag) return
        const { o, moved } = this.drag
        if (moved < 0.15) this.select(this.orbs.indexOf(o))
        o.vel.clampLength(0, 28)
        o.spin.add(new THREE.Vector3(-o.vel.y, o.vel.x, 0).multiplyScalar(0.35))
        this.drag = null
        document.body.classList.remove('grabbing')
      },
      cancel: () => {
        // o navegador assumiu o gesto (scroll no celular): solta sem selecionar
        this.drag = null
        document.body.classList.remove('grabbing')
      },
      touch: (e) => {
        // no celular: se o dedo pegou um cubo, bloqueia o scroll para poder arrastar
        if (this.drag) e.preventDefault()
      },
      resize: () => this.resize(),
      vis: () => (document.hidden ? this.clock.stop() : this.clock.start()),
    }
    addEventListener('pointermove', this.handlers.move)
    addEventListener('pointerdown', this.handlers.down)
    addEventListener('pointerup', this.handlers.up)
    addEventListener('pointercancel', this.handlers.cancel)
    addEventListener('touchmove', this.handlers.touch, { passive: false })
    addEventListener('resize', this.handlers.resize)
    document.addEventListener('visibilitychange', this.handlers.vis)
  }

  #setPointer(e) {
    this.pointer.set((e.clientX / this.size.w) * 2 - 1, -(e.clientY / this.size.h) * 2 + 1)
  }

  #pick() {
    if (!this.hitTargets) return null
    this.raycaster.setFromCamera(this.pointer, this.camera)
    return this.raycaster.intersectObjects(this.hitTargets, false)[0] || null
  }

  #dragTo() {
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const p = v3()
    if (!this.raycaster.ray.intersectPlane(this.dragPlane, p)) return
    const d = this.drag
    d.target = p.add(d.offset)
    d.moved += d.target.distanceTo(d.o.g.position)
  }

  // clicar no cristal empurra todos os cubos pra longe
  #burst() {
    const c = this.crystal.position
    for (const o of this.orbs) {
      const dir = o.g.position.clone().sub(c).normalize()
      o.vel.add(dir.multiplyScalar(14 + Math.random() * 8))
      o.spin.add(
        new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5,
        ).multiplyScalar(8),
      )
    }
    this.pulse = 1
  }

  select(i) {
    if (i < 0 || !this.orbs) return
    this.selected = i
    const o = this.orbs[i]
    o.spin.add(new THREE.Vector3(0, 9, 0))
    o.vel.add(new THREE.Vector3(0, 0, 6))
    this.orbs.forEach((x, j) => (x.glowTarget = j === i ? 0.55 : 0))
    this.onSelect(i)
  }

  resize() {
    const w = this.canvas.clientWidth
    const h = this.canvas.clientHeight
    if (w === this.size.w && h === this.size.h) return
    this.size = { w, h }
    this.mobile = innerWidth < 768
    this.camera.aspect = w / h
    this.camera.fov = this.mobile ? 55 : 40
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h, false)
  }

  // y do mundo (no plano z=0) que aparece na fração `fy` da altura da tela
  #worldY(fy) {
    const vis = 2 * this.state.camZ * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2))
    return this.state.camY + (0.5 - fy * (innerHeight / this.size.h)) * vis
  }

  #anchorY(k, fallback) {
    const a = this.anchors[k]
    return this.mobile && a != null ? this.#worldY(a) : fallback
  }

  // ---------- loop ----------
  #tick() {
    const dt = Math.min(this.clock.getDelta(), 1 / 30)
    const t = this.clock.elapsedTime
    const s = this.state
    // no celular o "ponteiro" é o dedo rolando a página: sem parallax
    const follow = this.pointer.x > 5 || this.mobile ? new THREE.Vector2() : this.pointer
    this.mouse.lerp(follow, 0.06)

    // câmera com parallax do mouse
    this.camera.position.x += (s.camX + this.mouse.x * 0.6 - this.camera.position.x) * 0.08
    this.camera.position.y += (s.camY + this.mouse.y * 0.4 - this.camera.position.y) * 0.08
    this.camera.position.z = s.camZ
    this.camera.lookAt(s.camX * 0.6, s.camY * 0.6, 0)

    // cristal
    this.pulse = Math.max(0, (this.pulse || 0) - dt * 1.5)
    let cy = s.crY
    for (const k of [0, 2, 4]) cy += s[`w${k}`] * (this.#anchorY(k, s.crY) - s.crY)
    this.crystal.position.set(s.crX, cy + Math.sin(t * 0.8) * 0.12, s.crZ)
    this.crystal.scale.setScalar(s.crS * (1 + this.pulse * 0.25))
    this.crystal.rotation.y += dt * (0.25 + this.pulse * 6)
    this.crystal.rotation.x = Math.sin(t * 0.3) * 0.3 + this.mouse.y * 0.4
    this.crystal.rotation.z = this.mouse.x * 0.3
    this.wire.rotation.y -= dt * 0.8
    this.wire.rotation.x += dt * 0.4

    // luzes orbitando e cor de fundo trocando com o scroll
    this.violet.position.set(Math.cos(t * 0.5) * 6, Math.sin(t * 0.7) * 4, 4)
    this.teal.position.set(Math.cos(t * 0.5 + Math.PI) * 6, Math.cos(t * 0.6) * 4, 3)
    this.bg.setHSL(0.68 + s.tint * 0.12, 0.45, 0.025 + s.tint * 0.012, THREE.SRGBColorSpace)
    this.scene.fog.color.copy(this.bg)

    // neve caindo
    const p = this.snow.geometry.attributes.position
    for (let i = 0; i < p.count; i++) {
      let y = p.getY(i) - dt * (0.25 + (i % 7) * 0.05)
      if (y < -15) y = 15
      p.setY(i, y)
      p.setX(i, p.getX(i) + Math.sin(t * 0.5 + i) * dt * 0.05)
    }
    p.needsUpdate = true
    this.snow.rotation.y = this.mouse.x * 0.08

    if (!this.orbs) return this.renderer.render(this.scene, this.camera)

    // hover
    const hit = this.drag ? null : this.#pick()
    const hv =
      hit && hit.object !== this.crystalCore ? hit.object.userData.index : hit ? 'crystal' : -1
    if (hv !== this.hovered) {
      this.hovered = hv
      this.onHover(hv === -1 ? null : hv === 'crystal' ? 'crystal' : this.langs[hv])
    }

    // física dos cubos
    const n = this.orbs.length
    const w = [s.w0, s.w1, s.w2, s.w3, s.w4]
    // quanto as âncoras andaram desde o último frame: os cubos andam junto, rígidos,
    // como se fossem parte da página (a mola cuida só do balanço)
    let shift = 0
    for (const k of [0, 2, 4]) {
      const y = this.#anchorY(k, null)
      if (y != null && this.prevAnchor[k] != null) shift += (y - this.prevAnchor[k]) * w[k]
      this.prevAnchor[k] = y
    }
    this.orbs.forEach((o, i) => {
      const L = this.#layouts(i, n, t)
      o.home.set(0, 0, 0)
      L.forEach((v, k) => o.home.addScaledVector(v, w[k]))
      o.home.y += Math.sin(t * 1.1 + o.seed) * 0.15

      if (this.drag?.o === o) {
        if (this.drag.target) {
          const prev = o.g.position.clone()
          o.g.position.lerp(this.drag.target, 0.35)
          o.vel
            .copy(o.g.position)
            .sub(prev)
            .divideScalar(dt || 1 / 60)
        }
      } else {
        o.g.position.y += shift
        // celular: mola mais firme para os cubos não ficarem para trás do texto
        const [k, c] = this.mobile ? [18, 5.8] : [7, 2.6]
        o.vel.addScaledVector(o.home.clone().sub(o.g.position), k * dt)
        o.vel.multiplyScalar(Math.exp(-c * dt))
        o.g.position.addScaledVector(o.vel, dt)
      }

      // cubos se empurram em vez de se atravessar
      for (let j = i + 1; j < n; j++) {
        const b = this.orbs[j]
        const d = o.g.position.clone().sub(b.g.position)
        const min = (o.scale + b.scale) * 0.75
        const len = d.length()
        if (len < min && len > 1e-4) {
          d.multiplyScalar(((min - len) / len) * 0.5)
          o.g.position.add(d)
          b.g.position.sub(d)
          o.vel.addScaledVector(d, 4)
          b.vel.addScaledVector(d, -4)
        }
      }

      // giro
      o.spin.multiplyScalar(Math.exp(-1.2 * dt))
      o.g.rotation.x += (o.spin.x + 0.15) * dt
      o.g.rotation.y += (o.spin.y + 0.25) * dt
      o.g.rotation.z += o.spin.z * dt

      // escala e brilho
      const target =
        o.base *
        (this.hovered === i || this.drag?.o === o ? 1.25 : 1) *
        (this.selected === i ? 1.15 : 1)
      o.scale += (target - o.scale) * 0.15
      o.g.scale.setScalar(o.scale)
      o.mat.emissiveIntensity +=
        ((o.glowTarget || 0) + (this.hovered === i ? 0.25 : 0) - o.mat.emissiveIntensity) * 0.1
    })

    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.renderer.setAnimationLoop(null)
    removeEventListener('pointermove', this.handlers.move)
    removeEventListener('pointerdown', this.handlers.down)
    removeEventListener('pointerup', this.handlers.up)
    removeEventListener('pointercancel', this.handlers.cancel)
    removeEventListener('touchmove', this.handlers.touch)
    removeEventListener('resize', this.handlers.resize)
    document.removeEventListener('visibilitychange', this.handlers.vis)
    this.scene.traverse((o) => {
      o.geometry?.dispose()
      const m = o.material
      if (m) (Array.isArray(m) ? m : [m]).forEach((x) => (x.map?.dispose(), x.dispose()))
    })
    this.renderer.dispose()
  }
}
