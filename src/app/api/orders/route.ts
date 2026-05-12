import { NextResponse } from 'next/server'
import { getAllOrders, createOrder, generateOrderCode } from '@/lib/orders'
import type { OrderRecord } from '@/types/order'

export async function GET() {
  return NextResponse.json(getAllOrders())
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<OrderRecord>
  if (!body.orderCode) {
    body.orderCode = generateOrderCode(body.companyName ?? 'CUSTOM')
  }
  const order = createOrder(body as Omit<OrderRecord, 'id' | 'lastUpdated'>)
  return NextResponse.json(order, { status: 201 })
}
