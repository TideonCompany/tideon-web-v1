'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ThermometerHot, Drop, Atom, Leaf, Gear, Flask } from '@phosphor-icons/react'

const materials = [
  {
    name: 'ULTEM 9085',
    category: 'High-Temp Thermoplastic',
    icon: ThermometerHot,
    color: '#00F5D1',
    swatch: '#8B3C10',
    specs: { tensile: '71 MPa', temp: '153°C', density: '1.34 g/cm³' },
    tags: ['Aerospace', 'Flame-retardant'],
    desc: 'FAR 25.853 certified flame-retardant resin for aerospace interior components.',
  },
  {
    name: 'PA12-CF',
    category: 'Carbon Fiber Nylon',
    icon: Gear,
    color: '#71717A',
    swatch: '#27272A',
    specs: { tensile: '124 MPa', temp: '185°C', density: '1.08 g/cm³' },
    tags: ['Structural', 'Stiff'],
    desc: 'Chopped carbon fiber reinforced nylon for high-stiffness functional parts.',
  },
  {
    name: 'Rigid 10K',
    category: 'SLA Resin',
    icon: Atom,
    color: '#2A8FD4',
    swatch: '#0D4C73',
    specs: { tensile: '68 MPa', temp: '218°C', density: '1.52 g/cm³' },
    tags: ['High-detail', 'Rigid'],
    desc: 'Glass-fiber reinforced resin with stiffness comparable to ABS and polycarbonate.',
  },
  {
    name: 'TPU 95A',
    category: 'Flexible Elastomer',
    icon: Drop,
    color: '#27A86A',
    swatch: '#0D5C3A',
    specs: { tensile: '34 MPa', temp: '90°C', density: '1.24 g/cm³' },
    tags: ['Flexible', 'Rubber-like'],
    desc: 'Shore 95A flexible polyurethane for seals, gaskets, and overmold inserts.',
  },
  {
    name: 'PA11 Biobased',
    category: 'Sustainable Nylon',
    icon: Leaf,
    color: '#5A8F27',
    swatch: '#2D4D12',
    specs: { tensile: '58 MPa', temp: '175°C', density: '1.03 g/cm³' },
    tags: ['Bio-sourced', 'SLS'],
    desc: 'Castor oil-derived nylon 11 for impact-resistant, bio-certified parts.',
  },
  {
    name: 'Copper Composite',
    category: 'Metal-Fill FDM',
    icon: Flask,
    color: '#C87F3A',
    swatch: '#7A4B1C',
    specs: { tensile: '28 MPa', temp: '60°C', density: '3.90 g/cm³' },
    tags: ['Metal-fill', 'Polishable'],
    desc: 'High copper-content filament for polishable, functional decorative metal parts.',
  },
]

export default function Materials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="materials" ref={ref} className="bg-white dark:bg-[#0D0D0F] py-28 md:py-36 border-t border-black/[0.06] dark:border-white/[0.04]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#00F5D1] text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            >
              — Material Library
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.02]"
            >
              47+ certified<br />
              <span className="text-zinc-500">material grades.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-zinc-500 text-[15px] leading-relaxed max-w-[40ch] mb-1"
          >
            Every material is batch-tested and traceable. Our materials engineers recommend the right
            grade for your mechanical and environmental requirements.
          </motion.p>
        </div>

        {/* Material cards — asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {materials.map((mat, i) => {
            const Icon = mat.icon
            return (
              <motion.div
                key={mat.name}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group relative glass-card bg-[#f5f5f7] dark:bg-[#111113] border border-black/[0.08] dark:border-white/[0.07] rounded-[20px] p-6 overflow-hidden hover:border-black/[0.14] dark:hover:border-white/[0.12] transition-all duration-300"
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    {/* Color swatch */}
                    <div
                      className="w-9 h-9 rounded-lg flex-shrink-0"
                      style={{ backgroundColor: mat.swatch, boxShadow: `0 0 0 1px ${mat.color}30` }}
                    />
                    <div>
                      <div className="text-gray-900 dark:text-white font-bold text-[15px] tracking-tight">{mat.name}</div>
                      <div className="text-zinc-600 text-[11px] mt-0.5 font-medium">{mat.category}</div>
                    </div>
                  </div>
                  <Icon size={18} weight="duotone" style={{ color: mat.color }} className="flex-shrink-0 mt-0.5 opacity-70" />
                </div>

                {/* Description */}
                <p className="text-zinc-500 text-[13px] leading-relaxed mb-5">{mat.desc}</p>

                {/* Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
                  {Object.entries(mat.specs).map(([key, val]) => (
                    <div key={key} className="bg-black/[0.03] dark:bg-white/[0.03] rounded-lg p-2.5">
                      <div className="font-mono text-gray-900 dark:text-white text-[13px] font-semibold">{val}</div>
                      <div className="text-zinc-600 text-[10px] uppercase tracking-wide mt-0.5 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex gap-1.5">
                  {mat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border"
                      style={{ color: mat.color, borderColor: `${mat.color}30`, background: `${mat.color}0f` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${mat.color}08, transparent 60%)` }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-black/[0.08] dark:border-white/[0.07] bg-black/[0.02] dark:bg-white/[0.02]"
        >
          <div>
            <div className="text-gray-900 dark:text-white font-semibold text-[15px]">Need a specific material grade?</div>
            <div className="text-zinc-500 text-[13px] mt-1">We source custom filament blends and resins on request.</div>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 bg-black/[0.06] dark:bg-white/[0.06] hover:bg-black/[0.1] dark:hover:bg-white/[0.1] border border-black/[0.1] dark:border-white/[0.08] text-zinc-700 dark:text-zinc-200 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            Talk to an engineer
          </a>
        </motion.div>
      </div>
    </section>
  )
}
