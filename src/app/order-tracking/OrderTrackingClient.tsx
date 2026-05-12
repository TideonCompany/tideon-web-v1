'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Package, Lock, ArrowRight, EnvelopeSimple } from '@phosphor-icons/react'
import TrackingHeader from '@/components/tracking/TrackingHeader'
import OrderProgressTracker from '@/components/tracking/OrderProgressTracker'
import OrderFeatureStrip from '@/components/tracking/OrderFeatureStrip'
import type { PublicOrderRecord } from '@/types/order'

export default function OrderTrackingClient() {
  const searchParams = useSearchParams()
  const [code, setCode] = useState(searchParams.get('code') ?? '')
  const [inputError, setInputError] = useState('')
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<PublicOrderRecord | null>(null)

  // Auto-lookup when code is present in URL
  useEffect(() => {
    const urlCode = searchParams.get('code')
    if (urlCode) {
      setCode(urlCode)
      doLookup(urlCode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function doLookup(rawCode?: string) {
    const target = (rawCode ?? code).trim().toUpperCase()
    if (!target) {
      setInputError('Please enter your order code.')
      return
    }
    setInputError('')
    setNotFound(false)
    setLoading(true)
    try {
      const res = await fetch(`/api/orders/lookup?code=${encodeURIComponent(target)}`)
      if (res.ok) {
        setOrder(await res.json())
        setNotFound(false)
      } else {
        setOrder(null)
        setNotFound(true)
      }
    } catch {
      setOrder(null)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    doLookup()
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col">
      <TrackingHeader />

      <div className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-10 md:py-14">

        <div className={`grid gap-8 items-start ${order ? 'grid-cols-1 lg:grid-cols-[360px_1fr]' : 'grid-cols-1'}`}>

          {/* ── Left: lookup panel ── */}
          <div className="flex flex-col gap-4 w-full max-w-[440px]">

            {/* Pill */}
            <div className="inline-flex w-fit items-center gap-1.5 bg-[#00897b]/10 border border-[#00897b]/20 text-[#00897b] text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00897b]" aria-hidden="true" />
              Industrial 3D Manufacturing
            </div>

            {/* Heading */}
            <div>
              <h1
                className="text-3xl md:text-4xl font-black tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                <span className="text-[#1d1d1f]">Track </span>
                <span className="text-[#00897b]">Your Order.</span>
              </h1>
              <p className="text-zinc-500 text-[14px] leading-relaxed mt-2 max-w-[38ch]">
                Enter your Tideon order code to view your current production status.
              </p>
            </div>

            {/* Input card */}
            <div className="bg-white border border-zinc-200 rounded-[20px] p-6 shadow-sm">
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="order-code"
                    className="text-zinc-600 text-[12px] font-semibold uppercase tracking-wider"
                  >
                    Enter Order Code
                  </label>
                  <input
                    id="order-code"
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value)
                      setInputError('')
                      setNotFound(false)
                    }}
                    placeholder="TIDEON-PEAK-1024"
                    autoComplete="off"
                    spellCheck={false}
                    className={`bg-zinc-50 border rounded-xl px-4 py-3 text-[#1d1d1f] text-[14px] placeholder-zinc-400 font-mono tracking-wide focus:outline-none focus:bg-white transition-colors ${
                      inputError || notFound
                        ? 'border-red-300 focus:border-red-400'
                        : 'border-zinc-200 focus:border-[#00897b]'
                    }`}
                  />
                  {inputError && (
                    <p role="alert" className="text-red-500 text-[12px]">{inputError}</p>
                  )}
                  {notFound && (
                    <p role="alert" className="text-red-500 text-[12px]">
                      We couldn&apos;t find an order with that code. Please check the code and try again.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-[#00897b] hover:bg-[#007a6e] disabled:opacity-60 text-white font-semibold text-[14px] px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-[0.97]"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" opacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      Looking up…
                    </>
                  ) : (
                    <>
                      View Order Status
                      <ArrowRight size={15} weight="bold" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-1.5">
              <Lock size={11} className="text-zinc-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-zinc-400 text-[12px]">
                Each order code is unique and specific to your company.
              </span>
            </div>

            {/* Help card */}
            <div className="bg-white border border-zinc-200 rounded-[16px] px-4 py-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00897b]/10 flex items-center justify-center flex-shrink-0">
                <EnvelopeSimple size={15} weight="duotone" className="text-[#00897b]" />
              </div>
              <div>
                <div className="text-[#1d1d1f] text-[13px] font-semibold">Need help?</div>
                <a
                  href="mailto:hello@tideon.co"
                  className="text-[#00897b] text-[12px] hover:underline"
                >
                  Contact us at hello@tideon.co
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: tracker card ── */}
          {order && (
            <div className="min-w-0 w-full">
              <OrderProgressTracker order={order} />
            </div>
          )}
        </div>

        {/* Feature strip */}
        <OrderFeatureStrip />

        {/* Footer */}
        <p className="text-center text-zinc-400 text-[13px] py-6 border-t border-zinc-200">
          Questions? Contact us at{' '}
          <a href="mailto:hello@tideon.co" className="text-[#00897b] hover:underline">
            hello@tideon.co
          </a>
        </p>
      </div>
    </div>
  )
}
