export type Stage = 'ordered' | 'design' | 'pre-production' | 'production' | 'delivery'

export interface StageDate {
  start: string  // ISO date e.g. "2025-04-24"
  end?: string   // ISO date, omit for single-day stages
}

export interface OrderRecord {
  id: string
  customerName: string
  companyName: string
  orderCode: string
  currentStage: Stage
  orderDate: string
  estimatedCompletionDate: string
  localDelivery: boolean
  customerNote: string
  lastUpdated: string
  extruderAssetUrl?: string
  stageDates: Partial<Record<Stage, StageDate>>
  internalNotes?: string // admin-only — never sent to public API
}

// Safe public type — strips admin-only fields
export type PublicOrderRecord = Omit<OrderRecord, 'internalNotes'>
