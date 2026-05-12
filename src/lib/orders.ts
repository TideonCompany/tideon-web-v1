import type { OrderRecord, Stage } from '@/types/order'

// ─── Seed data ────────────────────────────────────────────────────────────────
const SEED: OrderRecord[] = [
  {
    id: 'order_1',
    customerName: 'Peak Innovations',
    companyName: 'Peak Innovations',
    orderCode: 'TIDEON-PEAK-1024',
    currentStage: 'pre-production',
    orderDate: '2025-04-24',
    estimatedCompletionDate: '2025-05-16',
    localDelivery: true,
    customerNote:
      'We are fine-tuning your design and creating test prototypes to ensure everything is perfect before we move into full production.',
    lastUpdated: '2025-04-24T10:15:00',
    stageDates: {
      ordered: { start: '2025-04-24' },
      design: { start: '2025-04-28', end: '2025-05-02' },
      'pre-production': { start: '2025-05-03', end: '2025-05-05' },
      production: { start: '2025-05-06', end: '2025-05-19' },
      delivery: { start: '2025-05-20', end: '2025-05-21' },
    },
    internalNotes: 'Customer requested specific branding on the extruder housing.',
  },
]

// ─── In-memory singleton ───────────────────────────────────────────────────────
// Works in Next.js dev (persists across HMR). In Vercel serverless, resets per
// cold start. Replace getStore() body with real DB calls for production.
declare global {
  // eslint-disable-next-line no-var
  var __tideonOrders: OrderRecord[] | undefined
}

function getStore(): OrderRecord[] {
  if (!globalThis.__tideonOrders) {
    globalThis.__tideonOrders = JSON.parse(JSON.stringify(SEED)) as OrderRecord[]
  }
  return globalThis.__tideonOrders
}

// ─── CRUD helpers ─────────────────────────────────────────────────────────────
export function getAllOrders(): OrderRecord[] {
  return getStore()
}

export function getOrderByCode(code: string): OrderRecord | undefined {
  return getStore().find((o) => o.orderCode === code.trim().toUpperCase())
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
  getStore().push(order)
  return order
}

export function updateOrder(
  id: string,
  updates: Partial<Omit<OrderRecord, 'id'>>,
): OrderRecord | null {
  const store = getStore()
  const idx = store.findIndex((o) => o.id === id)
  if (idx === -1) return null
  store[idx] = { ...store[idx], ...updates, lastUpdated: new Date().toISOString() }
  return store[idx]
}

// ─── Code generator ───────────────────────────────────────────────────────────
export function generateOrderCode(companyName: string): string {
  const existing = getStore().map((o) => o.orderCode)
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
