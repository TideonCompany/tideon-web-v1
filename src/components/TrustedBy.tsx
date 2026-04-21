'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const logos = [
  { name: 'Luna Heating & Cooling', file: '/logos/6983aaf27181b9ea0f440098_luna-heating-cooling-logo.png', desc: 'HVAC Services', scale: 1 },
  { name: 'Service Plus Heating & Cooling', file: '/logos/6983aab2f2141b43d1bd7da4_service-plus-logo.png', desc: 'Mechanical Systems', scale: 1 },
  { name: 'Peak Illinois Heating & Cooling', file: '/logos/PEAK-CHICAGO.png', desc: 'HVAC Services', scale: 2.25 },
  { name: 'Peak Heating & Electrical', file: '/logos/PEAK-LOGO.png', desc: 'Multi-Trade Services', scale: 1.0 },
  { name: 'Harbor Lane', file: '/logos/harbor-lane-logo.png', desc: 'Tech Accessories', scale: 1.4 },
  { name: 'Northline Works', file: '/logos/Northline-Logo.png', desc: 'General Contracting', scale: 1.0 },
]

const looped = logos

function TiltCard({
  logo,
  onClick,
  expanded,
}: {
  logo: (typeof logos)[number]
  onClick: () => void
  expanded: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springCfg = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springCfg)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springCfg)
  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%'])

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ perspective: '1000px' }}
      animate={{ scale: expanded ? 1.1 : 1, zIndex: expanded ? 20 : 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{ rotateX: expanded ? 0 : rotateX, rotateY: expanded ? 0 : rotateY, transformStyle: 'preserve-3d' }}
        className={`relative glass-card bg-[#f5f5f7] dark:bg-[#111113] rounded-[24px] p-8 cursor-pointer group overflow-hidden transition-all duration-300 ${
          expanded
            ? 'border-2 border-[#00F5D1] shadow-[0_0_40px_rgba(0,245,209,0.15)]'
            : 'border border-black/[0.1] dark:border-white/[0.08]'
        }`}
      >
        {/* Glare */}
        <motion.div
          style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.07), transparent 65%)` }}
          className="absolute inset-0 rounded-[24px] pointer-events-none z-10"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] dark:via-white/[0.15] to-transparent rounded-t-[24px]" />

        {/* Logo — identical fixed box for every logo */}
        <div
          className="flex items-center justify-center mb-6"
          style={{ transform: 'translateZ(20px)', height: '130px' }}
        >
          <div style={{ width: '210px', height: '130px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '210px', height: '130px', transform: `scale(${logo.scale})`, transformOrigin: 'center center', flexShrink: 0 }}>
              <Image
                src={logo.file}
                alt={logo.name}
                fill
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                sizes="210px"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-black/[0.08] dark:border-white/[0.06] mb-5" />

        <div style={{ transform: 'translateZ(10px)' }}>
          <div className="text-gray-900 dark:text-white font-semibold text-[15px] tracking-tight">{logo.name}</div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${expanded ? 'bg-[#00F5D1]' : 'bg-[#00F5D1]/60'}`} />
            <span className="text-zinc-600 text-[12px] font-medium">{logo.desc}</span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#00F5D1]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-[24px] pointer-events-none" />
      </motion.div>
    </motion.div>
  )
}

export default function TrustedBy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expanded, setExpanded] = useState<string | null>(null)
  const [paused, setPaused] = useState(true)

  function handleCardClick(name: string) {
    setExpanded((prev) => (prev === name ? null : name))
  }

  return (
    <section ref={ref} className="bg-white dark:bg-[#0D0D0F] border-t border-black/[0.06] dark:border-white/[0.04] py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-14">

        {/* Header */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#00F5D1] text-xs font-semibold tracking-[0.18em] uppercase mb-4"
          >
            — Our Partners
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.02]"
          >
            Companies we&apos;ve<br />
            <span className="text-zinc-500">worked with.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-zinc-500 text-[15px] leading-relaxed max-w-[50ch] mt-5"
          >
            Trusted by forward-thinking companies across HVAC, mechanical, and climate technology industries.
          </motion.p>
        </div>
      </div>

      {/* Draggable scroll strip */}
      <div className="relative">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -(280 + 20) * (looped.length - 1) }}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          dragElastic={0.1}
          whileDrag={{ cursor: 'grabbing' }}
          className="flex gap-5 px-10 cursor-grab"
          style={{ width: 'max-content' }}
        >
          {looped.map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="w-[280px] flex-shrink-0">
              <TiltCard
                logo={logo}
                onClick={() => handleCardClick(`${logo.name}-${i}`)}
                expanded={expanded === `${logo.name}-${i}`}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
        className="text-center text-zinc-500 dark:text-zinc-700 text-[11px] tracking-widest uppercase mt-8"
      >
        Drag to scroll · Click to expand
      </motion.p>
    </section>
  )
}
