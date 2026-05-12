import { NextRequest, NextResponse } from 'next/server'
import { updateOrder } from '@/lib/orders'
import type { OrderRecord } from '@/types/order'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = (await req.json()) as Partial<Omit<OrderRecord, 'id'>>
  const updated = updateOrder(params.id, body)
  if (!updated) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }
  return NextResponse.json(updated)
}
