import request from '@/utils/request'
import type {
  MeanRequest,
  MeanResponse,
  VarianceRequest,
  VarianceResponse,
  CorrelationRequest,
  CorrelationResponse,
  FibonacciRequest,
  FibonacciResponse,
  FactorialRequest,
  FactorialResponse,
  MaxDrawdownRequest,
  MaxDrawdownResponse,
  TimeWeightedReturnRequest,
  TimeWeightedReturnResponse,
  VolatilityRequest,
  VolatilityResponse
} from './types'

export const calculateMean = (data: MeanRequest) => {
  return request<MeanResponse>({
    url: '/algorithms/mean',
    method: 'post',
    data
  })
}

export const calculateVariance = (data: VarianceRequest) => {
  return request<VarianceResponse>({
    url: '/algorithms/variance',
    method: 'post',
    data
  })
}

export const calculateCorrelation = (data: CorrelationRequest) => {
  return request<CorrelationResponse>({
    url: '/algorithms/correlation',
    method: 'post',
    data
  })
}

export const calculateFibonacci = (data: FibonacciRequest) => {
  return request<FibonacciResponse>({
    url: '/algorithms/fibonacci',
    method: 'post',
    data
  })
}

export const calculateFactorial = (data: FactorialRequest) => {
  return request<FactorialResponse>({
    url: '/algorithms/factorial',
    method: 'post',
    data
  })
}

export const calculateMaxDrawdown = (data: MaxDrawdownRequest) => {
  return request<MaxDrawdownResponse>({
    url: '/algorithms/max-drawdown',
    method: 'post',
    data
  })
}

export const calculateTimeWeightedReturn = (data: TimeWeightedReturnRequest) => {
  return request<TimeWeightedReturnResponse>({
    url: '/algorithms/time-weighted-return',
    method: 'post',
    data
  })
}

export const calculateVolatility = (data: VolatilityRequest) => {
  return request<VolatilityResponse>({
    url: '/algorithms/volatility',
    method: 'post',
    data
  })
}
