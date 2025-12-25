export const TASK_STATUS = {
  PENDING: 'PENDING',
  STARTED: 'STARTED',
  RETRY: 'RETRY',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  REVOKED: 'REVOKED'
} as const

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS]

export const TASK_STATUS_TEXT: Record<TaskStatus, string> = {
  PENDING: '等待中',
  STARTED: '进行中',
  RETRY: '重试中',
  SUCCESS: '成功',
  FAILURE: '失败',
  REVOKED: '已撤销'
}

export const TASK_STATUS_COLOR: Record<TaskStatus, any> = {
  PENDING: 'info',
  STARTED: 'warning',
  RETRY: 'warning',
  SUCCESS: 'success',
  FAILURE: 'danger',
  REVOKED: 'info'
}

export const ALGORITHM_TYPES = {
  MEAN: 'mean',
  VARIANCE: 'variance',
  CORRELATION: 'correlation',
  FIBONACCI: 'fibonacci',
  FACTORIAL: 'factorial',
  MAX_DRAWDOWN: 'max-drawdown',
  TIME_WEIGHTED_RETURN: 'time-weighted-return',
  VOLATILITY: 'volatility'
} as const

export type AlgorithmType = (typeof ALGORITHM_TYPES)[keyof typeof ALGORITHM_TYPES]

export const ALGORITHM_TEXT: Record<AlgorithmType, string> = {
  mean: '平均值',
  variance: '方差',
  correlation: '相关系数',
  fibonacci: '斐波那契',
  factorial: '阶乘',
  'max-drawdown': '最大回撤',
  'time-weighted-return': '时间加权收益率',
  volatility: '波动率'
}
