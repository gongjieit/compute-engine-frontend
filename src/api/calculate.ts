import request from '@/utils/request'
import type { CalculateRequest, CalculateResponse } from './types'

export const calculate = (data: CalculateRequest) => {
  return request<CalculateResponse>({
    url: '/calculate',
    method: 'post',
    data
  })
}
