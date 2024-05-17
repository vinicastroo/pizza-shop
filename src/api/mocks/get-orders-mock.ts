import { http, HttpResponse } from 'msw'

import type { GetOrderResponse } from '../get-orders'

type Orders = GetOrderResponse['orders']

type OrderStatus = GetOrderResponse['orders'][number]['status']

const statuses: OrderStatus[] = [
  'canceled',
  'pending',
  'processing',
  'delivering',
  'delivered',
]

const orders: Orders = Array.from({ length: 60 }).map((_, i) => {
  return {
    orderId: `order-${i}`,
    customerName: `Customer ${i}`,
    createdAt: new Date().toISOString(),
    status: statuses[i % 5],
    total: 100,
  }
})

export const getOrdersMock = http.get<never, never, GetOrderResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)
    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0

    const customerName = searchParams.get('customerName')
    const orderId = searchParams.get('orderId')
    const status = searchParams.get('status')

    let filteredOrders = orders

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      )
    }

    if (status && status !== 'all') {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    const paginatedOrder = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrder,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)
