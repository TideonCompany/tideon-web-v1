'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { UploadSimple, PaperPlaneTilt, CircleNotch } from '@phosphor-icons/react'

const industries = ['Aerospace', 'Automotive', 'Medical', 'Consumer', 'Industrial', 'Other']

export default function ContactCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1400)
  }

  return (
    <section id="contact" ref={ref} className="bg-white dark:bg-[#0D0D0F] py-28 md:py-36 border-t border-black/[0.06] dark:border-white/[0.04]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_540px] gap-16 xl:gap-24">

          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-[#00F5D1] text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            >
              — Get in touch
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.02] mb-7"
            >
              Start your<br />
              <span className="text-[#00F5D1]">next project</span><br />
              <span className="text-zinc-500">today.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-zinc-500 text-[15px] leading-relaxed max-w-[46ch] mb-12"
            >
              Submit your 3D files and project requirements. Our engineering team will respond with a
              detailed quote, material recommendations, and DFM feedback within 2 hours.
            </motion.p>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-5"
            >
              {[
                { label: 'Email', value: 'Orders@Tideon.co' },
                { label: 'Phone', value: '+1 (616) 816-3321' },
                { label: 'Hours', value: 'Mon–Fri, 7am–7pm' },
                { label: 'Address', value: '5685 Comstock Park NW Dr' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="text-zinc-500 dark:text-zinc-700 text-[11px] uppercase tracking-widest font-semibold w-16 mt-0.5 flex-shrink-0">
                    {c.label}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-300 text-[14px]">{c.value}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card bg-[#f5f5f7] dark:bg-[#111113] border border-black/[0.08] dark:border-white/[0.07] rounded-[24px] p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#27A86A]/15 border border-[#27A86A]/30 flex items-center justify-center mb-2">
                  <PaperPlaneTilt size={24} weight="duotone" className="text-[#27A86A]" />
                </div>
                <div className="text-gray-900 dark:text-white font-bold text-xl tracking-tight">Quote request sent</div>
                <div className="text-zinc-500 text-[14px] max-w-[34ch] leading-relaxed">
                  Our engineering team will review your project and respond within 2 hours.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="First name" type="text" placeholder="Alex" required />
                  <FormField label="Last name" type="text" placeholder="Mercer" required />
                </div>
                <FormField label="Work email" type="email" placeholder="alex@company.com" required />
                <FormField label="Company" type="text" placeholder="Acme Engineering Ltd." />

                {/* Industry select */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-600 dark:text-zinc-400 text-[12px] font-medium uppercase tracking-wider">Industry</label>
                  <select
                    className="bg-gray-100 dark:bg-[#18181B] border border-black/[0.1] dark:border-white/[0.08] rounded-xl px-4 py-3 text-zinc-700 dark:text-zinc-200 text-[14px] focus:outline-none focus:border-[#00F5D1]/50 transition-colors cursor-pointer"
                    style={{ appearance: 'none' }}
                  >
                    <option value="">Select your industry…</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind.toLowerCase()}>{ind}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-zinc-600 dark:text-zinc-400 text-[12px] font-medium uppercase tracking-wider">Project details</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your part, required material, quantities, and timeline…"
                    className="bg-gray-100 dark:bg-[#18181B] border border-black/[0.1] dark:border-white/[0.08] rounded-xl px-4 py-3 text-zinc-700 dark:text-zinc-200 text-[14px] placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-[#00F5D1]/50 transition-colors resize-none"
                  />
                </div>

                {/* File upload */}
                <div className="border-2 border-dashed border-black/[0.1] dark:border-white/[0.08] rounded-xl p-5 flex flex-col items-center gap-2 cursor-pointer hover:border-[#00F5D1]/30 transition-colors duration-200">
                  <UploadSimple size={22} className="text-zinc-600" />
                  <div className="text-zinc-500 text-[13px]">
                    Drop 3D files here or <span className="text-[#00F5D1]">browse</span>
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-700 text-[11px]">STL, STEP, OBJ, 3MF — up to 50MB</div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 flex items-center justify-center gap-2 bg-[#00897b] hover:bg-[#00f5d1] dark:bg-[#00F5D1] dark:hover:bg-[#00C2A0] disabled:opacity-70 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.97]"
                >
                  {loading ? (
                    <>
                      <CircleNotch size={17} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <PaperPlaneTilt size={17} weight="duotone" />
                      Request Quote
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FormField({
  label,
  type,
  placeholder,
  required,
}: {
  label: string
  type: string
  placeholder: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-zinc-600 dark:text-zinc-400 text-[12px] font-medium uppercase tracking-wider">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="bg-gray-100 dark:bg-[#18181B] border border-black/[0.1] dark:border-white/[0.08] rounded-xl px-4 py-3 text-zinc-700 dark:text-zinc-200 text-[14px] placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-[#00F5D1]/50 transition-colors"
      />
    </div>
  )
}
