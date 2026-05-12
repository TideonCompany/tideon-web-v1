import { Suspense } from 'react'
import type { Metadata } from 'next'
import OrderTrackingClient from './OrderTrackingClient'

export const metadata: Metadata = {
  title: 'Track Your Order — Tideon',
  description: 'Track your Tideon 3D manufacturing order status in real time.',
}

export default function OrderTrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
          <span className="text-zinc-400 text-sm">Loading…</span>
        </div>
      }
    >
      <OrderTrackingClient />
    </Suspense>
  )
}
