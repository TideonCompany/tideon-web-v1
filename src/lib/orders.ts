import type { OrderRecord, Stage } from '@/types/order'

// ─── Seed data ────────────────────────────────────────────────────────────────
const SEED: OrderRecord[] = [
  {
    id: 'order_1',
    customerName: 'Peak Innovations',
    companyName: 'Peak Innovations',
    orderCode: 'TIDEON-RR1004C',
    currentStage: 'design',
    orderDate: '2025-05-08',
    estimatedCompletionDate: '2025-05-11',
    localDelivery: true,
    customerNote:
      'Our design team is currently reviewing your requirements and specifications. Pre-production is estimated to be complete by May 11.',
    lastUpdated: '2025-05-08T09:00:00',
    stageDates: {
      ordered: { start: '2025-05-08' },
      design: { start: '2025-05-08', end: '2025-05-11' },
    },
    internalNotes: 'Customer requested specific branding on the extruder housing.',
  },
]

// ─── Store ─────────────────────────────────────────────────────────────────────
// Simple module-level store. Resets on each serverless cold start.
// Replace with real DB calls (Supabase, Prisma, etc.) for production persistence.
let _store: OrderRecord[] = JSON.parse(JSON.stringify(SEED))

function getStore(): OrderRecord[] {
  return _store
}

// ─── CRUD helpers ─────────────────────────────────────────────────────────────
export function getAllOrders(): OrderRecord[] {
  return getStore()
}

export function getOrderByCode(code: string): OrderRecord | undefined {
  const normalized = code.trim().toUpperCase()
  return getStore().find((o) => o.orderCode.toUpperCase() === normalized)
}

export function getOrderById(id: string): OrderRecord | undefined {
  return getStore().find((o) => o.id === id)
}

export function createOrder(data: Omit<OrderRecord, 'id' | 'lastUpdated'>): OrderRecord {
  const order: OrderRecord = {
    ...data,
    id: `order_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    lastUpdated: new Date().toISOString(),
  }
  _store.push(order)
  return order
}

export function updateOrder(
  id: string,
  updates: Partial<Omit<OrderRecord, 'id'>>,
): OrderRecord | null {
  const idx = _store.findIndex((o) => o.id === id)
  if (idx === -1) return null
  _store[idx] = { ..._store[idx], ...updates, lastUpdated: new Date().toISOString() }
  return _store[idx]
}

export function generateOrderCode(companyName: string): string {
  const existing = _store.map((o) => o.orderCode)
  const slug = companyName
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .trim()
    .split(/\s+/)[0]
    .slice(0, 6)

  let code = ''
  let attempts = 0
  do {
    const digits = String(Math.floor(1000 + Math.random() * 9000))
    code = `TIDEON-${slug}-${digits}`
    attempts++
  } while (existing.includes(code) && attempts < 100)

  return code
}

export const STAGE_ORDER: Stage[] = [
  'ordered',
  'design',
  'pre-production',
  'production',
  'delivery',
]
