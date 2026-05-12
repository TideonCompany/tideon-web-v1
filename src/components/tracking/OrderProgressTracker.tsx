'use client'

import { useState } from 'react'
import { Copy, Check, Clock, MapPin } from '@phosphor-icons/react'
import type { PublicOrderRecord } from '@/types/order'
import OrderStageBar from './OrderStageBar'
import OrderMediaPanel from './OrderMediaPanel'

const STAGE_LABELS: Record<string, string> = {
  ordered:          'Order Received',
  design:           'Design Review',
  'pre-production': 'Mockup Approval',
  production:       'In Production',
  delivery:         'Ready for Delivery',
}

const STAGE_DESCRIPTIONS: Record<string, string> = {
  ordered:
    'Your order has been received and added to our production queue.',
  design:
    'Our design team is reviewing the details, measurements, and branding requirements.',
  'pre-production':
    'Your product mockup is being prepared for review. Once approved, your order will move into full production.',
  production:
    'Your order is now being produced. This is usually the longest stage of the process.',
  delivery:
    'Your order is ready for delivery or final handoff. Local Grand Rapids delivery usually takes 24–48 hours.',
}

function fmtDate(iso: string) {
  const d = new Date(iso)
  const base = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const isEndOfDay = d.getHours() === 23 && d.getMinutes() === 59
  return isEndOfDay ? `${base} · End of Day` : base
}

function fmtDateTime(iso: string) {
  const d = new Date(iso)
  return (
    d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  )
}

function daysUntil(iso: string) {
  const diff = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000)
  if (diff < 0) return null
  if (diff === 0) return 'Today'
  return `In ${diff} days`
}

export default function OrderProgressTracker({ order }: { order: PublicOrderRecord }) {
  const [copied, setCopied] = useState(false)

  function copyCode() {
    navigator.clipboard.writeText(order.orderCode).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const countdown = daysUntil(order.estimatedCompletionDate)

  return (
    <div className="bg-white border border-zinc-200 rounded-[24px] shadow-sm overflow-hidden">

      {/* ── Top two-column: media + details ── */}
      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-0">

        {/* Media panel */}
        <div className="p-5 border-b md:border-b-0 md:border-r border-zinc-100">
          <OrderMediaPanel assetUrl={order.extruderAssetUrl} />
        </div>

        {/* Order details */}
        <div className="p-6 md:p-8">
          <div className="text-zinc-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
            Order for
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1d1d1f] tracking-tight mb-2">
            {order.companyName}
          </h2>

          {/* Code + copy */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-zinc-400 text-[12px] font-mono tracking-wide">
              Order Code: {order.orderCode}
            </span>
            <button
              onClick={copyCode}
              aria-label="Copy order code"
              className="text-zinc-400 hover:text-[#00897b] transition-colors"
            >
              {copied
                ? <Check size={13} weight="bold" className="text-[#00897b]" />
                : <Copy size={13} />}
            </button>
          </div>

          {/* Estimated completion */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-6 text-[13px]">
            <div className="flex items-center gap-1.5 text-zinc-600">
              <Clock size={13} className="text-[#00897b]" />
              <span>Estimated Completion:</span>
              <span className="font-semibold text-[#1d1d1f]">{fmtDate(order.estimatedCompletionDate)}</span>
              {countdown && (
                <span className="text-[#00897b] font-medium text-[12px]">({countdown})</span>
              )}
            </div>
            {order.localDelivery && (
              <div className="flex items-center gap-1 text-zinc-400 text-[12px]">
                <MapPin size={12} className="text-[#00897b]" />
                Local Grand Rapids delivery
              </div>
            )}
          </div>

          {/* Status pill */}
          <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Current Status
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 bg-[#00897b]/10 border border-[#00897b]/25 text-[#00897b] font-semibold text-[13px] px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00897b] animate-pulse" aria-hidden="true" />
              {STAGE_LABELS[order.currentStage]}
            </span>
          </div>
          <p className="text-zinc-500 text-[13px] leading-relaxed">
            {STAGE_DESCRIPTIONS[order.currentStage]}
          </p>
        </div>
      </div>

      {/* ── Full-width progress tracker ── */}
      <div className="border-t border-zinc-100 px-6 md:px-10 py-8">
        <OrderStageBar currentStage={order.currentStage} stageDates={order.stageDates} />
      </div>

      {/* ── Customer note + last updated ── */}
      {order.customerNote && (
        <div className="border-t border-zinc-100 px-6 md:px-8 py-5 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-start">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#00897b]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <rect x="1" y="1" width="11" height="8.5" rx="1.5" stroke="#00897b" strokeWidth="1.3" />
                <path d="M3.5 4.5h6M3.5 7h4" stroke="#00897b" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-zinc-600 text-[13px] leading-relaxed">{order.customerNote}</p>
          </div>
          <div className="text-zinc-400 text-[11px] sm:text-right whitespace-nowrap">
            <div className="font-medium text-zinc-500 mb-0.5">Last Updated</div>
            {fmtDateTime(order.lastUpdated)}
          </div>
        </div>
      )}
    </div>
  )
}
