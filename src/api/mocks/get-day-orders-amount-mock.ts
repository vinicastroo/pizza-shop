import { http, HttpResponse } from 'msw'

import { GetDayOrderAmountResponse } from '../get-day-orders-amount'

export const getDayOrdersAmountMock = http.get<
  never,
  never,
  GetDayOrderAmountResponse
>('/metrics/day-orders-amount', () => {
  return HttpResponse.json({
    amount: 22,
    diffFromYesterday: -5,
  })
})
