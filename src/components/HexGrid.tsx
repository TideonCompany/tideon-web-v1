'use client'

import { useEffect, useRef } from 'react'

const S = 22          // hex radius (center → vertex)
const MAX_H = 48      // max column height (px before projection)
const WAVE_SPEED = 0.007

// Isometric projection: 3D world (wx, wy, wz) → 2D screen (sx, sy)
const ISO_AX = Math.cos(Math.PI / 6)  // 0.866
const ISO_AY = Math.sin(Math.PI / 6)  // 0.5

function iso(wx: number, wy: number, wz: number): [number, number] {
  return [
    (wx - wy) * ISO_AX,
    (wx + wy) * ISO_AY - wz,
  ]
}

// Flat-top hex world-space corners
function hexWorld(wx: number, wy: number, s: number): Array<[number, number]> {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i
    return [wx + s * Math.cos(a), wy + s * Math.sin(a)] as [number, number]
  })
}

export default function HexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let raf: number
    let mouseX = 0.5
    let mouseY = 0.5
    let t = 0

    function build() {
      const W = canvas!.offsetWidth
      const H = canvas!.offsetHeight
      canvas!.width = W * devicePixelRatio
      canvas!.height = H * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)

      // Flat-top hex spacing
      const colStep = S * 1.5
      const rowStep = S * Math.sqrt(3)

      // How many cols/rows to fill the screen in iso space
      const COLS = Math.ceil(W / (colStep * ISO_AX)) + 6
      const ROWS = Math.ceil(H / (rowStep * ISO_AY)) + 6

      type Hex = { wx: number; wy: number; phase: number }
      const hexes: Hex[] = []

      for (let c = -3; c < COLS; c++) {
        for (let r = -3; r < ROWS; r++) {
          hexes.push({
            wx: c * colStep,
            wy: r * rowStep + (c % 2 === 0 ? 0 : rowStep / 2),
            phase: (c * 3.7 + r * 2.3) % (Math.PI * 2),
          })
        }
      }

      // Painter's sort: back hexes drawn first (larger wx+wy = further away)
      hexes.sort((a, b) => (a.wx + a.wy) - (b.wx + b.wy))

      return { W, H, hexes }
    }

    let { W, H, hexes } = build()

    function frame() {
      t += WAVE_SPEED
      ctx.clearRect(0, 0, W, H)

      const cx = W / 2
      const cy = H * 0.52

      // Mouse shifts the world origin slightly for parallax tilt
      const dx = (mouseX - 0.5) * 60
      const dy = (mouseY - 0.5) * 40

      for (const hex of hexes) {
        const wx = hex.wx + dx
        const wy = hex.wy + dy

        // Height: travelling sine wave
        const wz = ((Math.sin(t + hex.phase) + 1) / 2) * MAX_H
        const glow = wz / MAX_H  // 0 → 1

        // Project corners at top (z = wz) and bottom (z = 0)
        const wCorners = hexWorld(wx, wy, S - 1.2)

        const top = wCorners.map(([x, y]) => {
          const [sx, sy] = iso(x, y, wz)
          return [sx + cx, sy + cy] as [number, number]
        })
        const bot = wCorners.map(([x, y]) => {
          const [sx, sy] = iso(x, y, 0)
          return [sx + cx, sy + cy] as [number, number]
        })

        // ── Side faces (painter's order: back faces first) ──────────
        // Visible side faces in isometric view (looking from front-right-top):
        // face indices that face the viewer: edges 2-3, 3-4, 4-5
        const SIDE_FACES: Array<[number, number, string]> = [
          [2, 3, `rgba(0,60,55,${glow * 0.55})`],
          [3, 4, `rgba(0,45,42,${glow * 0.45})`],
          [4, 5, `rgba(0,55,50,${glow * 0.5})`],
        ]

        if (wz > 0.5) {
          for (const [i1, i2, fill] of SIDE_FACES) {
            ctx.beginPath()
            ctx.moveTo(top[i1][0], top[i1][1])
            ctx.lineTo(top[i2][0], top[i2][1])
            ctx.lineTo(bot[i2][0], bot[i2][1])
            ctx.lineTo(bot[i1][0], bot[i1][1])
            ctx.closePath()
            ctx.fillStyle = fill
            ctx.fill()
            ctx.strokeStyle = `rgba(0,245,209,${glow * 0.15})`
            ctx.lineWidth = 0.4
            ctx.stroke()
          }
        }

        // ── Top face ────────────────────────────────────────────────
        ctx.beginPath()
        ctx.moveTo(top[0][0], top[0][1])
        for (let i = 1; i < top.length; i++) ctx.lineTo(top[i][0], top[i][1])
        ctx.closePath()

        if (glow > 0.35) {
          ctx.fillStyle = `rgba(0,245,209,${glow * 0.07})`
          ctx.fill()
          ctx.strokeStyle = `rgba(0,245,209,${0.15 + glow * 0.3})`
          ctx.lineWidth = 0.7
        } else {
          ctx.fillStyle = `rgba(14,14,16,${0.4 + glow * 0.1})`
          ctx.fill()
          ctx.strokeStyle = `rgba(255,255,255,${0.03 + glow * 0.02})`
          ctx.lineWidth = 0.4
        }
        ctx.stroke()
      }

      raf = requestAnimationFrame(frame)
    }

    frame()

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth
      mouseY = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouse)

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      ({ W, H, hexes } = build())
      frame()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouse)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 100% 0%, black 20%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse 60% 70% at 100% 0%, black 20%, transparent 75%)',
      }}
    />
  )
}
