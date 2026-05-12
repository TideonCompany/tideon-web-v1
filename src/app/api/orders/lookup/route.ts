import { NextRequest, NextResponse } from 'next/server'
import { getOrderByCode } from '@/lib/orders'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code') ?? ''
  const order = getOrderByCode(code)

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  // Strip internalNotes — never expose to public
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { internalNotes: _removed, ...publicOrder } = order
  return NextResponse.json(publicOrder)
}
