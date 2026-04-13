'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X, Sun, Moon, Monitor, CaretDown, House } from '@phosphor-icons/react'
import { useTheme } from 'next-themes'

const links = ['Services', 'Materials', 'Process', 'Portfolio', 'Pricing']

const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

function ThemeDropdown() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = themeOptions.find((o) => o.value === theme) ?? themeOptions[2]
  const Icon = current.icon

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-zinc-400 hover:text-white text-xs font-medium transition-colors duration-200 px-2 py-1"
      >
        <Icon size={13} />
        <CaretDown size={9} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-32 bg-[#111113]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-xl overflow-hidden z-50"
          >
            {themeOptions.map((opt) => {
              const OptIcon = opt.icon
              return (
                <button
                  key={opt.value}
                  onClick={() => { setTheme(opt.value); setOpen(false) }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors duration-150 ${
                    theme === opt.value
                      ? 'text-[#00F5D1] bg-[#00F5D1]/10'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <OptIcon size={12} />
                  {opt.label}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Show nav after scrolling past 80% of viewport height (past the video intro)
      setVisible(window.scrollY > window.innerHeight * 1.2)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Logo — top left, appears with nav */}
      <motion.a
        href="#"
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -16 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-6 z-50 flex items-center gap-2 group"
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
      >
        <div className="w-6 h-6 bg-[#00F5D1] rounded-[5px] transition-transform duration-300 group-hover:rotate-12" />
        <span className="hidden sm:inline text-gray-900 dark:text-white font-semibold tracking-tight text-[16px]">Tideon</span>
      </motion.a>

      {/* Pill nav — top right, desktop */}
      <motion.nav
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 right-5 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full
          bg-black/60 dark:bg-black/70 backdrop-blur-xl
          border border-white/[0.07]
          shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
      >
        {/* Home icon */}
        <a
          href="#"
          className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
          aria-label="Home"
        >
          <House size={15} weight="fill" />
        </a>

        <div className="w-px h-4 bg-white/[0.08] mx-0.5" />

        {/* Nav links */}
        {links.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="px-3 py-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.07] text-[13px] font-medium transition-all duration-200"
          >
            {item}
          </a>
        ))}

        <div className="w-px h-4 bg-white/[0.08] mx-0.5" />

        {/* CTA */}
        <a
          href="#contact"
          className="ml-1 bg-[#00897b] hover:bg-[#00f5d1] dark:bg-[#00F5D1] dark:hover:bg-[#00C2A0] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200 active:scale-95 whitespace-nowrap"
        >
          Get a Quote
        </a>
      </motion.nav>

      {/* Mobile toggle */}
      <motion.button
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => setOpen(!open)}
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
        className="fixed top-4 right-5 z-50 md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.07] text-zinc-600 dark:text-zinc-300 shadow-sm transition-colors"
        aria-label="Toggle menu"
      >
        {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
      </motion.button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 right-5 z-50 md:hidden w-56 bg-white/95 dark:bg-[#0f0f10]/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.07] rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="px-3 py-3 flex flex-col gap-1">
              {[...links, 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-sm font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-1 bg-[#00897b] hover:bg-[#00f5d1] dark:bg-[#00F5D1] dark:hover:bg-[#00C2A0] text-white text-sm font-semibold px-4 py-2.5 rounded-xl text-center transition-colors duration-200"
              >
                Get a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
