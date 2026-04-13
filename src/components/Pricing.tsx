'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Lightning, Buildings, Users } from '@phosphor-icons/react'

const plans = [
  {
    name: 'Prototyping',
    icon: Lightning,
    price: 'From $38',
    unit: 'per part',
    description: 'Fast-turn prototypes for engineers and product teams moving quickly.',
    highlight: false,
    features: [
      '36-hour standard turnaround',
      'FDM, SLA, and SLS available',
      'DFM feedback report included',
      'STL/STEP/OBJ file support',
      'Up to 5 materials per order',
      'Email support',
    ],
    cta: 'Get a Quote',
  },
  {
    name: 'Production',
    icon: Buildings,
    price: 'From $0.08',
    unit: 'per cm³',
    description: 'Volume manufacturing for end-use parts with full QA documentation.',
    highlight: true,
    features: [
      'Batch runs from 10 – 10,000 units',
      'CMM dimensional verification',
      'Material certificates included',
      'Priority production queue',
      'Dedicated account manager',
      'Net-30 invoicing available',
    ],
    cta: 'Start Production',
  },
  {
    name: 'Enterprise',
    icon: Users,
    price: 'Custom',
    unit: 'contact us',
    description: 'On-site capacity, dedicated machines, and NDA-covered IP protection.',
    highlight: false,
    features: [
      'Reserved machine capacity',
      'On-site deployment option',
      'ISO 9001 & AS9100D docs',
      'Full IP and NDA protection',
      'Custom SLA agreements',
      '24/7 engineering support',
    ],
    cta: 'Contact an expert',
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" ref={ref} className="bg-white dark:bg-[#0A0A0B] py-28 md:py-36 border-t border-black/[0.06] dark:border-white/[0.04]">
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
              — Pricing
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.02]"
            >
              Transparent pricing,<br />
              <span className="text-zinc-500">no surprises.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-zinc-500 text-[15px] leading-relaxed max-w-[40ch] mb-1"
          >
            All quotes include DFM analysis, material selection consultation, and shipping estimates.
          </motion.p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col rounded-[24px] p-8 overflow-hidden ${
                  plan.highlight
                    ? 'bg-[#00F5D1] border border-[#00F5D1]'
                    : 'glass-card bg-[#f5f5f7] dark:bg-[#111113] border border-black/[0.08] dark:border-white/[0.07] hover:border-black/[0.15] dark:hover:border-white/[0.13] transition-colors duration-300'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                )}

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${plan.highlight ? 'bg-white/20' : 'bg-black/[0.06] dark:bg-white/[0.06] border border-black/[0.1] dark:border-white/[0.08]'}`}>
                    <Icon size={18} weight="duotone" className={plan.highlight ? 'text-white' : 'text-zinc-600 dark:text-zinc-400'} />
                  </div>
                  <span className={`font-bold text-[15px] tracking-tight ${plan.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.name}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className={`font-bold text-[36px] tracking-tight leading-none ${plan.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.price}
                  </span>
                  <span className={`ml-2 text-[13px] font-medium ${plan.highlight ? 'text-white/70' : 'text-zinc-600'}`}>
                    {plan.unit}
                  </span>
                </div>

                <p className={`text-[13px] leading-relaxed mb-8 ${plan.highlight ? 'text-white/75' : 'text-zinc-500'}`}>
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        size={15}
                        weight="bold"
                        className={`flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-white' : 'text-[#00F5D1]'}`}
                      />
                      <span className={`text-[13px] leading-snug ${plan.highlight ? 'text-white/85' : 'text-zinc-600 dark:text-zinc-400'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`w-full text-center text-sm font-semibold px-5 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.97] ${
                    plan.highlight
                      ? 'bg-white text-[#00F5D1] hover:bg-zinc-100'
                      : 'bg-black/[0.06] dark:bg-white/[0.06] border border-black/[0.12] dark:border-white/[0.1] text-zinc-700 dark:text-zinc-200 hover:bg-black/[0.1] dark:hover:bg-white/[0.1] hover:border-black/20 dark:hover:border-white/[0.2]'
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-zinc-500 dark:text-zinc-700 text-[12px] mt-8"
        >
          All prices in USD. Volume discounts applied automatically. No setup fees.
        </motion.p>
      </div>
    </section>
  )
}
