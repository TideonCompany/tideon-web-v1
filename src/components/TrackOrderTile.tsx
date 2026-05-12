'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { Package, Lock, ArrowRight, Medal, Timer, Crosshair, ShieldCheck } from '@phosphor-icons/react'

const features = [
  {
    icon: Medal,
    title: 'Industrial Grade Materials',
    desc: 'We use certified materials that meet the highest industry standards.',
  },
  {
    icon: Timer,
    title: 'Fast Turnaround',
    desc: 'Average 3 week turnaround from design to delivery.',
  },
  {
    icon: Crosshair,
    title: 'Precision Accuracy',
    desc: 'Sub-0.1mm precision on every layer of every part.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Guaranteed',
    desc: 'Every part is inspected and tested before it leaves our facility.',
  },
]

export default function TrackOrderTile() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const normalized = code.trim().toUpperCase()
    if (!normalized) {
      setError('Please enter your order code.')
      return
    }
    setError('')
    router.push(`/order-tracking?code=${encodeURIComponent(normalized)}`)
  }

  return (
    <section
      ref={ref}
      className="bg-white dark:bg-[#0A0A0B] py-28 md:py-36 border-t border-black/[0.06] dark:border-white/[0.04]"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[#00F5D1] text-xs font-semibold tracking-[0.18em] uppercase mb-12"
        >
          — Order Tracking
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* Left — Tile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card bg-[#f5f5f7] dark:bg-[#111113] border border-black/[0.08] dark:border-white/[0.07] rounded-[24px] p-8"
          >
            {/* Icon + heading */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#00F5D1]/15 flex items-center justify-center flex-shrink-0">
                <Package size={20} weight="duotone" className="text-[#00F5D1]" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                <span className="text-gray-900 dark:text-white">Track </span>
                <span className="text-[#00897b] dark:text-[#00F5D1]">Your Order.</span>
              </h2>
            </div>

            <p className="text-zinc-500 text-[14px] leading-relaxed mb-7">
              Enter your Tideon order code to view your current production status.
            </p>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* Input */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="order-code"
                  className="text-zinc-600 dark:text-zinc-400 text-[12px] font-medium uppercase tracking-wider"
                >
                  Order Code
                </label>
                <input
                  id="order-code"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value)
                    if (error) setError('')
                  }}
                  placeholder="Tideon-Order-Number"
                  autoComplete="off"
                  spellCheck={false}
                  className={`bg-white dark:bg-[#18181B] border rounded-xl px-4 py-3 text-zinc-800 dark:text-zinc-200 text-[14px] placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none transition-colors ${
                    error
                      ? 'border-red-400 focus:border-red-400'
                      : 'border-black/[0.1] dark:border-white/[0.08] focus:border-[#00897b] dark:focus:border-[#00F5D1]'
                  }`}
                />
                {error && (
                  <p role="alert" className="text-red-500 text-[12px] mt-0.5">
                    {error}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-[#00897b] hover:bg-[#007a6e] dark:bg-[#00F5D1] dark:hover:bg-[#00C2A0] text-white dark:text-[#0A0A0B] font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.97]"
              >
                Track Order
                <ArrowRight size={16} weight="bold" />
              </button>
            </form>

            {/* Helper text */}
            <div className="flex items-center gap-1.5 mt-5">
              <Lock size={12} className="text-zinc-400 flex-shrink-0" />
              <span className="text-zinc-400 text-[12px]">Each code is unique to your company.</span>
            </div>
          </motion.div>

          {/* Right — Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#00F5D1]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} weight="duotone" className="text-[#00897b] dark:text-[#00F5D1]" />
                  </div>
                  <div>
                    <div className="text-gray-900 dark:text-white font-semibold text-[14px] tracking-tight mb-1">
                      {f.title}
                    </div>
                    <div className="text-zinc-500 text-[13px] leading-relaxed">{f.desc}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
