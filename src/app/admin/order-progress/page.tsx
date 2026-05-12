'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Plus, FloppyDisk, ArrowLeft, Spinner, ArrowsClockwise, Lock,
} from '@phosphor-icons/react'
import type { OrderRecord, Stage } from '@/types/order'

const ADMIN_CODE = 'Tideon-RR1004C'

function PasscodeGate({ onUnlock }: { onUnlock: () => void }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  function attempt(e: React.FormEvent) {
    e.preventDefault()
    if (input === ADMIN_CODE) {
      onUnlock()
    } else {
      setError(true)
      setInput('')
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <div className="bg-white border border-zinc-200 rounded-[20px] p-8 w-full max-w-sm shadow-sm">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#00897b]/10 flex items-center justify-center">
            <Lock size={20} weight="duotone" className="text-[#00897b]" />
          </div>
          <div className="text-center">
            <div className="font-black text-[#1d1d1f] text-lg" style={{ fontFamily: 'var(--font-outfit)' }}>
              TIDEON Admin
            </div>
            <div className="text-zinc-400 text-[13px] mt-1">Enter your access code to continue</div>
          </div>
        </div>
        <form onSubmit={attempt} className="flex flex-col gap-3">
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false) }}
            placeholder="Access code"
            autoFocus
            className={`w-full border rounded-xl px-4 py-3 text-[14px] font-mono focus:outline-none transition-colors ${
              error ? 'border-red-300 bg-red-50' : 'border-zinc-200 bg-zinc-50 focus:border-[#00897b]'
            }`}
          />
          {error && <p className="text-red-500 text-[12px]">Incorrect code. Try again.</p>}
          <button
            type="submit"
            className="bg-[#00897b] hover:bg-[#007a6e] text-white font-semibold text-[14px] py-3 rounded-xl transition-colors"
          >
            Unlock
          </button>
        </form>
      </div>
    </div>
  )
}

const STAGES: { value: Stage; label: string }[] = [
  { value: 'ordered',          label: 'Ordered' },
  { value: 'design',           label: 'Design Team' },
  { value: 'pre-production',   label: 'Pre-Production' },
  { value: 'production',       label: 'Production' },
  { value: 'delivery',         label: 'Delivery' },
]

const STAGE_COLORS: Record<Stage, string> = {
  ordered:          'bg-zinc-100 text-zinc-600',
  design:           'bg-blue-50 text-blue-600',
  'pre-production': 'bg-amber-50 text-amber-600',
  production:       'bg-teal-50 text-[#00897b]',
  delivery:         'bg-green-50 text-green-600',
}

function fmtUpdated(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

const EMPTY_FORM: Omit<OrderRecord, 'id' | 'lastUpdated'> = {
  customerName: '',
  companyName: '',
  orderCode: '',
  currentStage: 'ordered',
  orderDate: new Date().toISOString().slice(0, 10),
  estimatedCompletionDate: '',
  localDelivery: false,
  customerNote: '',
  extruderAssetUrl: '',
  internalNotes: '',
  stageDates: {},
}

export default function AdminOrderProgress() {
  const [unlocked, setUnlocked] = useState(false)
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [selected, setSelected] = useState<OrderRecord | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [form, setForm] = useState<typeof EMPTY_FORM>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState('')
  const [loadingOrders, setLoadingOrders] = useState(true)

  const fetchOrders = useCallback(async () => {
    setLoadingOrders(true)
    const res = await fetch('/api/orders')
    if (res.ok) setOrders(await res.json())
    setLoadingOrders(false)
  }, [])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  function selectOrder(o: OrderRecord) {
    setSelected(o)
    setIsNew(false)
    setForm({
      customerName: o.customerName,
      companyName: o.companyName,
      orderCode: o.orderCode,
      currentStage: o.currentStage,
      orderDate: o.orderDate,
      estimatedCompletionDate: o.estimatedCompletionDate,
      localDelivery: o.localDelivery,
      customerNote: o.customerNote,
      extruderAssetUrl: o.extruderAssetUrl ?? '',
      internalNotes: o.internalNotes ?? '',
      stageDates: o.stageDates ?? {},
    })
    setSavedMsg('')
  }

  function newOrder() {
    setSelected(null)
    setIsNew(true)
    setForm(EMPTY_FORM)
    setSavedMsg('')
  }

  async function generateCode() {
    if (!form.companyName.trim()) return
    const res = await fetch('/api/orders')
    // Use the companyName to generate a code client-side (matches server logic)
    const slug = form.companyName
      .toUpperCase().replace(/[^A-Z0-9\s]/g, '').trim().split(/\s+/)[0].slice(0, 6)
    const digits = String(Math.floor(1000 + Math.random() * 9000))
    setForm((f) => ({ ...f, orderCode: `TIDEON-${slug}-${digits}` }))
    void res
  }

  function setStageDate(stage: Stage, field: 'start' | 'end', value: string) {
    setForm((f) => ({
      ...f,
      stageDates: {
        ...f.stageDates,
        [stage]: { ...(f.stageDates[stage] ?? {}), [field]: value },
      },
    }))
  }

  async function save() {
    setSaving(true)
    setSavedMsg('')
    try {
      if (isNew) {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const created: OrderRecord = await res.json()
          setOrders((prev) => [...prev, created])
          setSelected(created)
          setIsNew(false)
          setSavedMsg('Order created successfully.')
        }
      } else if (selected) {
        const res = await fetch(`/api/orders/${selected.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const updated: OrderRecord = await res.json()
          setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)))
          setSelected(updated)
          setSavedMsg('Saved. Last updated: ' + new Date(updated.lastUpdated).toLocaleTimeString())
        }
      }
    } finally {
      setSaving(false)
    }
  }

  const hasForm = isNew || selected !== null

  if (!unlocked) return <PasscodeGate onUnlock={() => setUnlocked(true)} />

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="font-black text-[#1d1d1f] text-lg tracking-tight"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            TIDEON
          </span>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-200 px-2 py-0.5 rounded-md">
            Admin
          </span>
          <span className="text-zinc-300 text-sm hidden sm:inline">/</span>
          <span className="text-zinc-600 text-[13px] hidden sm:inline">Order Progress</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-700 text-[12px] transition-colors"
            title="Refresh orders"
          >
            <ArrowsClockwise size={14} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 text-[13px] transition-colors"
          >
            <ArrowLeft size={13} />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">

        {/* ── Sidebar: order list ── */}
        <aside className="w-full md:w-72 lg:w-80 bg-white border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col">
          <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
            <span className="text-[12px] font-semibold text-zinc-500 uppercase tracking-wider">
              Orders {!loadingOrders && `(${orders.length})`}
            </span>
            <button
              onClick={newOrder}
              className="flex items-center gap-1 bg-[#00897b] hover:bg-[#007a6e] text-white text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              <Plus size={13} weight="bold" />
              New
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loadingOrders ? (
              <div className="flex items-center justify-center py-10">
                <Spinner size={20} className="text-zinc-300 animate-spin" />
              </div>
            ) : orders.length === 0 ? (
              <p className="text-zinc-400 text-[13px] text-center py-8">No orders yet.</p>
            ) : (
              orders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => selectOrder(o)}
                  className={`w-full text-left px-4 py-3.5 border-b border-zinc-50 transition-colors ${
                    selected?.id === o.id
                      ? 'bg-[#00897b]/5 border-l-2 border-l-[#00897b]'
                      : 'hover:bg-zinc-50 border-l-2 border-l-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[#1d1d1f] font-semibold text-[13px] truncate">{o.companyName}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${STAGE_COLORS[o.currentStage]}`}>
                      {STAGES.find(s => s.value === o.currentStage)?.label}
                    </span>
                  </div>
                  <div className="text-zinc-400 text-[11px] font-mono">{o.orderCode}</div>
                  <div className="text-zinc-300 text-[10px] mt-0.5">Updated {fmtUpdated(o.lastUpdated)}</div>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* ── Main: edit form ── */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {!hasForm ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-20">
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">
                <ArrowLeft size={20} className="text-zinc-300" />
              </div>
              <p className="text-zinc-400 text-[14px]">Select an order or create a new one.</p>
            </div>
          ) : (
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-[#1d1d1f] tracking-tight mb-6">
                {isNew ? 'New Order' : 'Edit Order'}
              </h2>

              <div className="flex flex-col gap-6">

                {/* Customer info */}
                <Section title="Customer Info">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Customer Name">
                      <Input value={form.customerName} onChange={(v) => setForm(f => ({ ...f, customerName: v }))} placeholder="Alex Mercer" />
                    </Field>
                    <Field label="Company Name">
                      <Input value={form.companyName} onChange={(v) => setForm(f => ({ ...f, companyName: v }))} placeholder="Peak Innovations" />
                    </Field>
                  </div>
                  <Field label="Order Code">
                    <div className="flex gap-2">
                      <Input
                        value={form.orderCode}
                        onChange={(v) => setForm(f => ({ ...f, orderCode: v.toUpperCase() }))}
                        placeholder="TIDEON-PEAK-1024"
                        mono
                        className="flex-1"
                      />
                      <button
                        type="button"
                        onClick={generateCode}
                        className="px-3 py-2.5 text-[12px] font-semibold text-[#00897b] border border-[#00897b]/30 rounded-lg hover:bg-[#00897b]/5 transition-colors whitespace-nowrap"
                      >
                        Generate
                      </button>
                    </div>
                  </Field>
                  <div className="flex items-center gap-2">
                    <input
                      id="local-delivery"
                      type="checkbox"
                      checked={form.localDelivery}
                      onChange={(e) => setForm(f => ({ ...f, localDelivery: e.target.checked }))}
                      className="w-4 h-4 accent-[#00897b]"
                    />
                    <label htmlFor="local-delivery" className="text-zinc-600 text-[13px]">Local Grand Rapids delivery</label>
                  </div>
                </Section>

                {/* Order status */}
                <Section title="Order Status">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Current Stage">
                      <select
                        value={form.currentStage}
                        onChange={(e) => setForm(f => ({ ...f, currentStage: e.target.value as Stage }))}
                        className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1d1d1f] focus:outline-none focus:border-[#00897b] transition-colors"
                      >
                        {STAGES.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Order Date">
                      <Input type="date" value={form.orderDate} onChange={(v) => setForm(f => ({ ...f, orderDate: v }))} />
                    </Field>
                    <Field label="Est. Completion Date">
                      <Input type="date" value={form.estimatedCompletionDate} onChange={(v) => setForm(f => ({ ...f, estimatedCompletionDate: v }))} />
                    </Field>
                  </div>
                  <Field label="Customer Note (visible to customer)">
                    <textarea
                      rows={3}
                      value={form.customerNote}
                      onChange={(e) => setForm(f => ({ ...f, customerNote: e.target.value }))}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1d1d1f] placeholder-zinc-400 focus:outline-none focus:border-[#00897b] transition-colors resize-none"
                      placeholder="We are fine-tuning your design…"
                    />
                  </Field>
                </Section>

                {/* Stage dates */}
                <Section title="Stage Dates">
                  <div className="flex flex-col gap-3">
                    {STAGES.map(({ value: stageKey, label }) => (
                      <div key={stageKey} className="grid grid-cols-[120px_1fr_1fr] gap-3 items-center">
                        <span className="text-zinc-600 text-[12px] font-medium">{label}</span>
                        <Input
                          type="date"
                          value={form.stageDates[stageKey]?.start ?? ''}
                          onChange={(v) => setStageDate(stageKey, 'start', v)}
                          placeholder="Start"
                        />
                        <Input
                          type="date"
                          value={form.stageDates[stageKey]?.end ?? ''}
                          onChange={(v) => setStageDate(stageKey, 'end', v)}
                          placeholder="End"
                        />
                      </div>
                    ))}
                  </div>
                </Section>

                {/* Admin only */}
                <Section title="Admin Only">
                  <Field label="Internal Notes (not visible to customer)">
                    <textarea
                      rows={3}
                      value={form.internalNotes ?? ''}
                      onChange={(e) => setForm(f => ({ ...f, internalNotes: e.target.value }))}
                      className="w-full bg-white border border-zinc-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1d1d1f] placeholder-zinc-400 focus:outline-none focus:border-[#00897b] transition-colors resize-none"
                      placeholder="Internal notes…"
                    />
                  </Field>
                </Section>

                {/* Save */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={save}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#00897b] hover:bg-[#007a6e] disabled:opacity-60 text-white font-semibold text-[13px] px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-[0.97]"
                  >
                    {saving
                      ? <Spinner size={15} className="animate-spin" />
                      : <FloppyDisk size={15} weight="bold" />}
                    {isNew ? 'Create Order' : 'Save Changes'}
                  </button>
                  {savedMsg && (
                    <span className="text-[#00897b] text-[12px] font-medium">{savedMsg}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

// ─── Mini UI helpers ───────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-[16px] p-5 flex flex-col gap-4">
      <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-zinc-500 text-[11px] font-semibold uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}

function Input({
  value, onChange, placeholder, type = 'text', mono = false, className = '',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  mono?: boolean
  className?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-white border border-zinc-200 rounded-lg px-3 py-2.5 text-[13px] text-[#1d1d1f] placeholder-zinc-400 focus:outline-none focus:border-[#00897b] transition-colors ${mono ? 'font-mono' : ''} ${className}`}
    />
  )
}
