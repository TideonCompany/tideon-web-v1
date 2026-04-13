'use client'

import { motion } from 'framer-motion'

const items = [
  { label: 'FDM Printing' },
  { label: 'SLA Resin' },
  { label: 'SLS Nylon' },
  { label: 'Carbon Fiber Reinforced' },
  { label: 'Medical Grade PLA' },
  { label: 'ULTEM 9085' },
  { label: 'Metal Composite' },
  { label: 'Vapor Smoothing' },
  { label: 'ISO 9001:2015 Certified' },
  { label: 'AS9100D Aerospace' },
  { label: '0.05mm Accuracy' },
  { label: 'Same-Day Quoting' },
  { label: 'DFM Review Included' },
]

export default function TechMarquee() {
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-y border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#0D0D0F] py-4 z-10">
      <div className="flex">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex shrink-0"
        >
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-6 px-8 whitespace-nowrap">
              <span className="text-zinc-500 text-[13px] font-medium tracking-wide">
                {item.label}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#00F5D1] flex-shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>

    </div>
  )
}
