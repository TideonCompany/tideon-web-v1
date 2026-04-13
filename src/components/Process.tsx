'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { UploadSimple, ChartBar, Rocket, CheckCircle } from '@phosphor-icons/react'

const steps = [
  {
    num: '01',
    title: 'Upload & Quote',
    desc: 'Submit your 3D files (STL, STEP, OBJ). Our automated DFM analysis delivers a detailed quote with material recommendations within 2 hours.',
    icon: UploadSimple,
    time: '~2hr',
  },
  {
    num: '02',
    title: 'Engineering Review',
    desc: 'A materials engineer reviews your design for printability, structural integrity, and tolerance requirements before production begins.',
    icon: ChartBar,
    time: '~4hr',
  },
  {
    num: '03',
    title: 'Production',
    desc: 'Your parts are manufactured on industrial-grade machines with real-time process monitoring and automated layer inspection.',
    icon: Rocket,
    time: '24–36hr',
  },
  {
    num: '04',
    title: 'QA & Delivery',
    desc: 'CMM dimensional verification, surface finish inspection, and material certification. Parts shipped same day or available for pickup.',
    icon: CheckCircle,
    time: 'Same day',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" ref={ref} className="bg-white dark:bg-[#0A0A0B] py-28 md:py-36 border-t border-black/[0.06] dark:border-white/[0.04]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[#00F5D1] text-xs font-semibold tracking-[0.18em] uppercase mb-4"
          >
            — How it works
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.02]"
          >
            From file to part<br />
            <span className="text-zinc-500">in 36 hours.</span>
          </motion.h2>
        </div>

        {/* Steps — horizontal on desktop */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">

          {/* Connecting line */}
          <div className="hidden md:block absolute top-[46px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-black/[0.1] dark:via-white/[0.1] to-transparent" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1 + 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative px-6 pt-0 pb-10 md:pb-0"
              >
                {/* Step number node */}
                <div className="relative z-10 flex items-center gap-4 md:flex-col md:items-start md:gap-0 mb-5 md:mb-6">
                  <div className={`w-[46px] h-[46px] rounded-xl flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${
                    i === 0
                      ? 'bg-[#00F5D1] border-[#00F5D1]'
                      : 'glass-card bg-[#f5f5f7] dark:bg-[#111113] border-black/[0.12] dark:border-white/[0.1]'
                  }`}>
                    <Icon size={20} weight="duotone" className={i === 0 ? 'text-white' : 'text-zinc-600 dark:text-zinc-400'} />
                  </div>
                  <div className="md:mt-4">
                    <div className="font-mono text-[#00F5D1] text-[11px] font-semibold tracking-widest uppercase mb-1">
                      Step {step.num}
                    </div>
                    <div className="text-gray-900 dark:text-white font-bold text-[16px] md:text-[18px] tracking-tight leading-tight">
                      {step.title}
                    </div>
                  </div>
                </div>

                <p className="text-zinc-500 text-[13px] leading-relaxed mb-4 md:pr-4">{step.desc}</p>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.07]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D1]" />
                  <span className="font-mono text-zinc-600 dark:text-zinc-400 text-[11px] font-medium">{step.time}</span>
                </div>

                {/* Mobile connector line */}
                {i < steps.length - 1 && (
                  <div className="md:hidden absolute bottom-0 left-[34px] w-px h-6 bg-black/[0.1] dark:bg-white/[0.08]" />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center glass-card bg-[#f5f5f7] dark:bg-[#111113] border border-black/[0.08] dark:border-white/[0.07] rounded-[20px] px-8 py-7"
        >
          <div>
            <div className="text-gray-900 dark:text-white font-bold text-[17px] tracking-tight mb-1.5">
              Ready to submit your first project?
            </div>
            <div className="text-zinc-500 text-[14px]">
              Upload STEP, STL, or OBJ files — instant wall-thickness and printability analysis included.
            </div>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 bg-[#00897b] hover:bg-[#00f5d1] dark:bg-[#00F5D1] dark:hover:bg-[#00C2A0] text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 text-center"
          >
            Upload Files
          </a>
        </motion.div>
      </div>
    </section>
  )
}
