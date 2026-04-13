'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'

const stats = [
  { value: '0.05mm', label: 'Layer resolution' },
  { value: '47+', label: 'Material grades' },
  { value: '36hr', label: 'Avg. turnaround' },
  { value: '99.3%', label: 'QA pass rate' },
]

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
}

const fadeUp = {
  hidden: { y: 50, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} id="hero" className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-white dark:bg-[#0A0A0B]">


      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-[1] opacity-[0.032]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)',
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Glow orb */}
      <motion.div
        style={{ y: orbY }}
        className="hidden md:block absolute right-[-5%] top-[10%] w-[680px] h-[680px] rounded-full bg-[#00F5D1]/[0.07] dark:bg-[#00F5D1]/[0.09] blur-[130px] pointer-events-none z-0"
      />
      <div className="hidden md:block absolute left-[-10%] bottom-[5%] w-[500px] h-[500px] rounded-full bg-[#00F5D1]/[0.04] blur-[120px] pointer-events-none z-0" />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-10 pt-20 pb-14 md:pt-24 lg:pt-28 lg:pb-20 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1fr_780px] gap-12 xl:gap-20 items-center">

          {/* Left */}
          <motion.div variants={staggerContainer} initial="hidden" animate="show">

            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#00F5D1]/30 bg-[#00F5D1]/10 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D1] animate-pulse" />
              <span className="text-[#00F5D1] text-xs font-semibold tracking-widest uppercase">
                Industrial 3D Manufacturing
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-1 pb-1">
              <motion.h1
                variants={fadeUp}
                whileHover={{ scale: 1.04, x: 10 }}
                whileTap={{ scale: 1.04, x: 10 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="hero-precision font-bold leading-[0.95] tracking-[-0.04em] text-[#1d1d1f] dark:text-white dark:[background:none] dark:[-webkit-text-fill-color:inherit] dark:[filter:none] cursor-default origin-left"
                style={{ fontSize: 'clamp(52px, 8vw, 118px)' }}
              >
                Precision.
              </motion.h1>
            </div>
            <div className="mb-1 pb-2 relative z-10">
              <motion.h1
                variants={fadeUp}
                whileHover={{ scale: 1.04, x: 10 }}
                whileTap={{ scale: 1.04, x: 10 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="hero-engineered font-bold leading-[0.95] tracking-[-0.04em] text-[#00F5D1] dark:text-[#00F5D1] dark:[background:none] dark:[-webkit-text-fill-color:#00F5D1] dark:[filter:none] cursor-default origin-left"
                style={{ fontSize: 'clamp(52px, 8vw, 118px)' }}
              >
                Engineered.
              </motion.h1>
            </div>
            <div className="mb-10 pb-1 relative z-0">
              <motion.h1
                variants={fadeUp}
                whileHover={{ scale: 1.06, x: 10, y: -6 }}
                whileTap={{ scale: 1.06, x: 10, y: -6 }}
                transition={{ type: 'spring', stiffness: 500, damping: 12, mass: 0.6 }}
                className="hero-fast font-bold leading-[0.95] tracking-[-0.04em] text-zinc-500 dark:text-zinc-500 dark:[background:none] dark:[-webkit-text-fill-color:#71717a] dark:[filter:none] cursor-default origin-left"
                style={{ fontSize: 'clamp(52px, 8vw, 118px)' }}
              >
                Fast.
              </motion.h1>
            </div>

            <motion.p variants={fadeUp} className="text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-[54ch] mb-10">
              From aerospace-grade functional prototypes to end-use production parts — Tideon delivers
              industrial additive manufacturing with certified material science and sub-0.1mm accuracy
              at every layer.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3.5 mb-16">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-[#00897b] hover:bg-[#00f5d1] dark:bg-[#00F5D1] dark:hover:bg-[#00C2A0] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.97]"
              >
                Start a Project
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={17} />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white border border-black/[0.1] dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/[0.06] dark:hover:bg-white/[0.06] px-6 py-3.5 rounded-xl transition-all duration-200 font-medium text-sm"
              >
                View Portfolio
                <ArrowUpRight size={17} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 pt-8 border-t border-black/[0.07] dark:border-white/[0.07]">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-[22px] text-gray-900 dark:text-white font-semibold tracking-tight">{s.value}</div>
                  <div className="text-zinc-500 text-[11px] uppercase tracking-wider mt-0.5 font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D print visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative -mt-[30%]"
          >
            <PrinterViz />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-10 flex items-center gap-3 z-10"
      >
        <motion.div
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-transparent to-zinc-400 dark:to-zinc-700 origin-bottom"
        />
        <span className="text-zinc-400 dark:text-zinc-700 text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
      </motion.div>
    </section>
  )
}

function TypewriterBadge({ children, description, className }: { children: React.ReactNode; description: string; className: string }) {
  const [hovered, setHovered] = useState(false)
  const [displayed, setDisplayed] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function startTyping() {
    setHovered(true)
    setDisplayed('')
    let i = 0
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      i++
      setDisplayed(description.slice(0, i))
      if (i >= description.length && intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }, 22)
  }

  function stopTyping() {
    setHovered(false)
    setDisplayed('')
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null }
  }

  return (
    <div
      className={className}
      onMouseEnter={startTyping}
      onMouseLeave={stopTyping}
    >
      {children}
      {hovered && (
        <p className="mt-2 text-zinc-400 text-[11px] leading-relaxed font-light" style={{ maxWidth: '160px' }}>
          {displayed}<span className="animate-pulse">|</span>
        </p>
      )}
    </div>
  )
}

function PrinterViz() {
  return (
    <div className="relative w-full aspect-square ml-auto">

      {/* Outer ring pulse */}
      <div className="absolute inset-[15%] rounded-full border border-[#00F5D1]/10">
        <div
          className="absolute inset-[-2px] rounded-full border border-[#00F5D1]/20"
          style={{ animation: 'pulse-ring 3s ease-out infinite' }}
        />
      </div>

      {/* Product image — sized relative to outer container */}
      <motion.img
        src="/tideon-logo.png"
        alt="Tideon Printer"
        className="absolute inset-0 w-full h-full object-contain z-10 cursor-default"
        whileHover={{ scale: 1.04, x: 10 }}
        whileTap={{ scale: 1.04, x: 10 }}
        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
        style={{ filter: 'drop-shadow(0 8px 40px rgba(0,245,209,0.20))' }}
      />

      {/* Floating spec badges */}
      <TypewriterBadge
        description="Ultra-fine layer resolution for sharper detail, smoother surfaces, and higher print accuracy."
        className="float-a absolute top-[28%] right-[15%] bg-white dark:bg-[#111113] border border-black/[0.08] dark:border-white/10 rounded-2xl px-4 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] cursor-default transition-all duration-200 z-20"
      >
        <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1 font-medium">Resolution</div>
        <div className="font-mono text-gray-900 dark:text-white text-xl font-semibold">0.05mm</div>
      </TypewriterBadge>

      <TypewriterBadge
        description="Large-format print capacity for bigger parts or multiple components in one run."
        className="float-b absolute bottom-[18%] left-[15%] bg-white dark:bg-[#111113] border border-black/[0.08] dark:border-white/10 rounded-2xl px-4 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] cursor-default transition-all duration-200 z-20"
      >
        <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1 font-medium">Build Volume</div>
        <div className="font-mono text-gray-900 dark:text-white text-xl font-semibold">500³mm</div>
      </TypewriterBadge>

      <div className="float-c absolute top-[42%] left-[8%] bg-[#00F5D1]/14 border border-[#00F5D1]/30 rounded-2xl px-4 py-3">
        <div className="text-[#00F5D1]/80 text-[10px] uppercase tracking-wider mb-1.5 font-medium">Status</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00F5D1] animate-pulse" />
          <span className="font-mono text-[#00F5D1] text-sm font-semibold">Printing</span>
        </div>
      </div>

      <TypewriterBadge
        description="The total number of printed layers used to complete the part with precision and consistency."
        className="float-a absolute bottom-[4%] right-[20%] bg-white dark:bg-[#111113] border border-black/[0.08] dark:border-white/10 rounded-2xl px-4 py-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] cursor-default transition-all duration-200 z-20"
      >
        <div className="text-zinc-500 text-[10px] uppercase tracking-wider mb-1 font-medium">Layer Count</div>
        <div className="font-mono text-gray-900 dark:text-white text-xl font-semibold">
          <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}>
            1,847
          </motion.span>
        </div>
      </TypewriterBadge>
    </div>
  )
}
