'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from '@phosphor-icons/react'

const reviews = [
  {
    name: 'Marcus Theron',
    title: 'Lead Structures Engineer',
    company: 'Axiom Aerospace',
    avatar: 'MT',
    color: '#2A8FD4',
    text: 'The ULTEM 9085 parts came out perfectly to spec. Our certification team was impressed with both the dimensional accuracy and the material certificates provided. Zero rework required.',
  },
  {
    name: 'Priya Okonkwo',
    title: 'Senior Product Designer',
    company: 'Volta Dynamics',
    avatar: 'PO',
    color: '#27A86A',
    text: 'Submitted files at 9pm, had a detailed quote with DFM notes by 11pm, and parts in hand 34 hours later. This is what rapid prototyping should actually look like.',
  },
  {
    name: 'James Ridgeway',
    title: 'Mechanical Engineer',
    company: 'TerraMotion EV',
    avatar: 'JR',
    color: '#00F5D1',
    text: 'The PA12-CF battery brackets we ordered have been running in a production vehicle for 9 months without a single failure. Tideon is now our default supplier for structural composite parts.',
  },
  {
    name: 'Sofia Navarro',
    title: 'R&D Director',
    company: 'MedTronix Labs',
    avatar: 'SN',
    color: '#7C6AF2',
    text: "Their DFM review caught a wall-thickness issue that would have caused warping in our surgical guides. Saved us two weeks of iteration and a lot of resin costs.",
  },
  {
    name: 'Carl Detterman',
    title: 'VP Engineering',
    company: 'Skyrion Systems',
    avatar: 'CD',
    color: '#C87F3A',
    text: 'Best post-processing work we have seen anywhere. The vapor-smoothed SLS drone frames look and feel injection-molded. Our clients cannot believe they are 3D printed.',
  },
  {
    name: 'Aisha Pemberton',
    title: 'Regulatory Affairs Lead',
    company: 'NovaMobility',
    avatar: 'AP',
    color: '#27A86A',
    text: 'The ISO documentation package was thorough enough to satisfy our FDA pre-submission requirements. We will be using Tideon for every medical device prototype going forward.',
  },
  {
    name: 'Derek Lau',
    title: 'Prototype Lead',
    company: 'Helix Robotics',
    avatar: 'DL',
    color: '#2A8FD4',
    text: 'Ordered 47 unique SLS components for a robot chassis in one batch. Every single part was within tolerance and labeled correctly. Turnaround was 38 hours. Genuinely impressive.',
  },
  {
    name: 'Renata Briggs',
    title: 'Industrial Designer',
    company: 'Form & Function Studio',
    avatar: 'RB',
    color: '#00F5D1',
    text: "The Rigid 10K resin finish on our client's consumer product mock-ups was stunning. Smooth, stiff, and paintable straight off the build plate after a light sand.",
  },
]

const row1 = reviews.slice(0, 4)
const row2 = reviews.slice(4, 8)

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} weight="fill" className="text-[#00F5D1]" />
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div className="flex-shrink-0 w-[300px] sm:w-[340px] glass-card bg-[#f5f5f7] dark:bg-[#111113] border border-black/[0.08] dark:border-white/[0.07] rounded-[20px] p-6 mx-2">
      <Stars />
      <p className="text-zinc-600 dark:text-zinc-400 text-[13px] leading-relaxed mt-4 mb-5">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-black/[0.08] dark:border-white/[0.06]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-bold flex-shrink-0"
          style={{ background: `${review.color}20`, color: review.color }}
        >
          {review.avatar}
        </div>
        <div>
          <div className="text-gray-900 dark:text-white text-[13px] font-semibold leading-tight">{review.name}</div>
          <div className="text-zinc-600 text-[11px] mt-0.5">{review.title} · {review.company}</div>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ items, reverse = false }: { items: typeof reviews; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="flex"
      >
        {doubled.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Reviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="reviews" ref={ref} className="bg-white dark:bg-[#0A0A0B] py-28 md:py-36 border-t border-black/[0.06] dark:border-white/[0.04] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#00F5D1] text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            >
              — Client Reviews
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.02]"
            >
              Trusted by engineers<br />
              <span className="text-zinc-500">who ship real products.</span>
            </motion.h2>
          </div>

          {/* Aggregate rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0 flex flex-col items-start md:items-end gap-2"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={22} weight="fill" className="text-[#00F5D1]" />
              ))}
            </div>
            <div className="font-mono text-gray-900 dark:text-white text-4xl font-bold tracking-tight">4.97</div>
            <div className="text-zinc-600 text-[12px]">Based on 214 verified orders</div>
          </motion.div>
        </div>
      </div>

      {/* Scrolling rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col gap-4"
      >
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </motion.div>

    </section>
  )
}
