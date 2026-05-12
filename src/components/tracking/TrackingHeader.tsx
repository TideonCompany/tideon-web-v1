'use client'

import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react'

export default function TrackingHeader() {
  return (
    <header className="w-full bg-white border-b border-zinc-200 px-6 md:px-10 py-4 flex items-center justify-between">
      <Link href="/" className="flex flex-col leading-none select-none group">
        <span
          className="font-black text-[#1d1d1f] tracking-tight"
          style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(16px, 3.5vw, 22px)', fontWeight: 900 }}
        >
          TIDEON
        </span>
        <span
          className="text-[9px] font-bold tracking-[0.22em] uppercase"
          style={{
            background: 'linear-gradient(135deg, #004d40 0%, #00897b 45%, #00f5d1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          PRINTS
        </span>
      </Link>

      <Link
        href="/"
        className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 text-[13px] font-medium transition-colors duration-150 group"
      >
        <ArrowLeft size={13} weight="bold" className="transition-transform duration-150 group-hover:-translate-x-0.5" />
        Back to Home
      </Link>
    </header>
  )
}
