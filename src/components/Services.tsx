'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cube, Atom, Wind, Wrench, SealCheck, ArrowRight } from '@phosphor-icons/react'

const services = [
  {
    id: 'fdm',
    title: 'Industrial FDM',
    description:
      'High-performance engineering thermoplastics for structural prototypes, jigs, fixtures, and end-use parts. Build volume up to 500×500×500mm with dual-material capability.',
    icon: Cube,
    specs: ['ULTEM 9085', 'Nylon CF', 'ABS-M30', 'PC-ISO', 'ASA'],
    tag: 'Most popular',
    wide: true,
    color: '#00F5D1',
  },
  {
    id: 'sla',
    title: 'SLA Resin',
    description:
      'Photopolymer precision for complex geometries, smooth surfaces, and dental/medical applications with 25μm layer resolution.',
    icon: Atom,
    specs: ['ABS-Like White', 'Rigid 10K', 'Dental SG', 'Tough 2000'],
    tag: null,
    wide: false,
    color: '#7C6AF2',
  },
  {
    id: 'sls',
    title: 'SLS Nylon',
    description:
      'Powder-bed fusion for snap-fit assemblies, interlocking parts, and batch production without support material.',
    icon: Wind,
    specs: ['PA12 GF', 'PA11 Bio', 'TPU 90A', 'Alumide'],
    tag: null,
    wide: false,
    color: '#2A8FD4',
  },
  {
    id: 'post',
    title: 'Post-Processing',
    description:
      'Vapor smoothing, sandblasting, priming, painting, electroplating, and hardware insertion — full finishing in-house.',
    icon: Wrench,
    specs: [],
    tag: null,
    wide: false,
    color: '#00F5D1',
  },
  {
    id: 'qa',
    title: 'Quality Assurance',
    description:
      'CMM dimensional verification, material certs, and full traceability. ISO 9001:2015 and AS9100D certified operations.',
    icon: SealCheck,
    specs: [],
    tag: null,
    wide: false,
    color: '#27A86A',
  },
]

const fadeUp = {
  hidden: { y: 32, opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" ref={ref} className="bg-white dark:bg-[#0A0A0B] py-28 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#00F5D1] text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            >
              — Capabilities
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.02]"
            >
              Every process,<br />
              <span className="text-zinc-500">one partner.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-zinc-500 text-[15px] leading-relaxed max-w-[42ch] mb-1"
          >
            Industrial-grade additive manufacturing across all major technologies — with materials
            engineering consultation included on every order.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Wide card — FDM */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="md:col-span-2 group relative glass-card bg-[#f5f5f7] dark:bg-[#111113] border border-black/[0.08] dark:border-white/[0.07] rounded-[24px] p-8 overflow-hidden hover:border-[#00F5D1]/25 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00F5D1]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-[#00F5D1]/15 flex items-center justify-center">
                  <Cube size={22} weight="duotone" className="text-[#00F5D1]" />
                </div>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[#00F5D1] bg-[#00F5D1]/10 border border-[#00F5D1]/20 px-2.5 py-1 rounded-full">
                  Most popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">Industrial FDM</h3>
              <p className="text-zinc-500 text-[14px] leading-relaxed mb-7 max-w-[52ch]">
                High-performance engineering thermoplastics for structural prototypes, jigs, fixtures, and end-use
                parts. Build volume up to 500×500×500mm with dual-material capability and soluble support.
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {services[0].specs.map((s) => (
                  <span key={s} className="text-[12px] font-mono text-zinc-600 dark:text-zinc-400 bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.07] px-3 py-1 rounded-lg">
                    {s}
                  </span>
                ))}
              </div>
              <a href="#contact" className="inline-flex items-center gap-1.5 text-[#00F5D1] text-sm font-semibold group/link">
                Request this process
                <ArrowRight size={15} className="transition-transform duration-200 group-hover/link:translate-x-1" />
              </a>
            </div>
            {/* Decorative corner */}
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#00F5D1]/[0.05] rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" />
          </motion.div>

          {/* SLA */}
          <ServiceCard service={services[1]} index={1} inView={inView} />

          {/* SLS */}
          <ServiceCard service={services[2]} index={2} inView={inView} />

          {/* Post Processing */}
          <ServiceCard service={services[3]} index={3} inView={inView} />

          {/* QA */}
          <ServiceCard service={services[4]} index={4} inView={inView} />
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  inView,
}: {
  service: (typeof services)[number]
  index: number
  inView: boolean
}) {
  const Icon = service.icon
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className="group glass-card bg-[#f5f5f7] dark:bg-[#111113] border border-black/[0.08] dark:border-white/[0.07] rounded-[24px] p-7 overflow-hidden relative hover:border-black/[0.15] dark:hover:border-white/[0.13] transition-all duration-300"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[24px]"
        style={{ background: `radial-gradient(circle at 0 0, ${service.color}08, transparent 70%)` }}
      />
      <div className="relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
          style={{ background: `${service.color}18` }}
        >
          <Icon size={20} weight="duotone" style={{ color: service.color }} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mb-2.5">{service.title}</h3>
        <p className="text-zinc-500 text-[13px] leading-relaxed mb-5">{service.description}</p>
        {service.specs.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {service.specs.map((s) => (
              <span key={s} className="text-[11px] font-mono text-zinc-500 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.08] dark:border-white/[0.06] px-2.5 py-0.5 rounded-md">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
