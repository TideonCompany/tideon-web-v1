'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from '@phosphor-icons/react'

const projects = [
  {
    id: 5,
    title: 'Branded Badges',
    client: 'Peak Heating, Cooling & Electrical',
    category: 'Industrial',
    material: 'PLA + TPU',
    process: 'FDM',
    image: '/peak-badge.jpg',
    tall: true,
  },
  {
    id: 2,
    title: 'Custom Computer Components',
    client: 'Tideon Labs',
    category: 'Industrial',
    material: 'PLA + ABS',
    process: 'FDM',
    image: '/PC-Parts.png',
    tall: true,
  },
  {
    id: 4,
    title: 'Turbine Precision Blades',
    client: 'Aerospace Tideon',
    category: 'Aerospace',
    material: 'Carbon Fiber ASA',
    process: 'FDM',
    image: '/aerospace-components.png',
    tall: true,
  },
]

const filters = ['All', 'Aerospace', 'Medical', 'Automotive', 'Industrial']

const categoryColors: Record<string, string> = {
  Aerospace: '#2A8FD4',
  Medical: '#27A86A',
  Automotive: '#00F5D1',
  Industrial: '#7C6AF2',
}

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="portfolio" ref={ref} className="bg-white dark:bg-[#0D0D0F] py-28 md:py-36 border-t border-black/[0.06] dark:border-white/[0.04]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#00F5D1] text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            >
              — Case Studies
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.02]"
            >
              Built by Tideon,<br />
              <span className="text-zinc-500">deployed everywhere.</span>
            </motion.h2>
          </div>

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`text-[12px] font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  active === f
                    ? 'bg-[#00F5D1] border-[#00F5D1] text-white'
                    : 'border-black/[0.12] dark:border-white/[0.1] text-zinc-500 hover:text-gray-900 dark:hover:text-zinc-200 hover:border-black/20 dark:hover:border-white/[0.2]'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-[20px] glass-card bg-[#f5f5f7] dark:bg-[#111113] border border-black/[0.08] dark:border-white/[0.07] cursor-pointer ${
                  project.tall ? 'sm:row-span-2' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative w-full overflow-hidden ${project.tall ? 'h-[320px] sm:h-full min-h-[380px]' : 'h-[220px]'}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent opacity-80" />
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div
                        className="text-[10px] font-bold tracking-widest uppercase mb-2 px-2 py-0.5 rounded-full border inline-block"
                        style={{
                          color: categoryColors[project.category],
                          borderColor: `${categoryColors[project.category]}30`,
                          background: `${categoryColors[project.category]}14`,
                        }}
                      >
                        {project.category}
                      </div>
                      <div className="text-white font-bold text-[15px] leading-tight">{project.title}</div>
                      <div className="text-zinc-500 text-[12px] mt-1">{project.client}</div>
                    </div>
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-black/[0.08] dark:bg-white/[0.08] border border-black/[0.1] dark:border-white/[0.1] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight size={15} className="text-white" />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <span className="font-mono text-zinc-600 text-[11px] bg-black/[0.04] dark:bg-white/[0.04] px-2 py-0.5 rounded">{project.material}</span>
                    <span className="font-mono text-zinc-600 text-[11px] bg-black/[0.04] dark:bg-white/[0.04] px-2 py-0.5 rounded">{project.process}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
