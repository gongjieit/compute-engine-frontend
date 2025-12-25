// ==================== 计算相关类型 ====================
export interface CalculateRequest {
  a: number
  b: number
  operation: '+' | '-' | '*' | '/'
}

export interface CalculateResponse {
  result: number
  execution_time: number
}

// ==================== 算法相关类型 ====================
export interface MeanRequest {
  numbers?: number[]
  values?: number[]
}

export interface MeanResponse {
  result: number
  execution_time: number
}

export interface VarianceRequest {
  numbers?: number[]
  values?: number[]
}

export interface VarianceResponse {
  result: number
  execution_time: number
}

export interface CorrelationRequest {
  x: number[]
  y: number[]
}

export interface CorrelationResponse {
  result: number
  execution_time: number
}

export interface FibonacciRequest {
  n: number
}

export interface FibonacciResponse {
  result: number
  execution_time: number
}

export interface FactorialRequest {
  n: number
}

export interface FactorialResponse {
  result: number
  execution_time: number
}

export interface DailyData {
  date: string
  total_return?: number
  total_returns?: number
  avg_capital?: number
  total_scale?: number
}

export interface MaxDrawdownRequest {
  daily_data: DailyData[]
}

export interface MaxDrawdownResponse {
  result: number
  execution_time: number
}

export interface DailyDataForTWR {
  date: string
  total_scale?: number
  total_size?: number
  total_amount?: number
  total_return?: number
  return_value?: number
  profit?: number
}

export interface TimeWeightedReturnRequest {
  daily_data: DailyDataForTWR[]
}

export interface DailyCumulativeReturn {
  date: string
  cumulative_return: number
}

export interface TimeWeightedReturnResult {
  final_return: number
  daily_cumulative_returns: DailyCumulativeReturn[]
}

export interface TimeWeightedReturnResponse {
  result: TimeWeightedReturnResult
  execution_time: number
}

export interface VolatilityDataset {
  x_values?: number[]
  returns?: number[]
  values?: number[]
  trading_days_per_year?: number
}

export interface VolatilityRequest {
  datasets: VolatilityDataset[]
  default_trading_days_per_year?: number
}

export interface VolatilityResult {
  index: number
  volatility: number
  data_points: number
  trading_days_per_year: number
}

export interface VolatilityResponse {
  results: VolatilityResult[]
  total_count: number
  success_count: number
  failed_count: number
  execution_time: number
  errors: any[] | null
}

// ==================== 任务相关类型 ====================
export interface CreateAsyncTaskRequest {
  datasets: VolatilityDataset[]
  default_trading_days_per_year?: number
}

export interface CreateAsyncTaskResponse {
  task_id: string
  status: string
  message: string
  created_at: string
  links: {
    status: string
    record: string
  }
}

export interface TaskStatusResponse {
  task_id: string
  status: string
  result?: any
  error?: string
  message: string
  links?: {
    record: string
  }
}

export interface TaskRecord {
  id: number
  task_id: string
  task_name: string
  algorithm: string
  status: string
  result?: any
  error_message?: string | null
  execution_time?: number
  start_time?: string
  end_time?: string
  created_at: string
  updated_at: string
}

export interface TaskRecordsResponse {
  code: number
  message: string
  data: {
    records: TaskRecord[]
    total: number
    page: number
    page_size: number
    total_pages: number
  }
}

export interface TaskRecordResponse {
  code: number
  message: string
  data: TaskRecord
}

export interface AlgorithmStat {
  algorithm: string
  total_count: number
  success_count: number
  failure_count: number
  success_rate: number
  avg_execution_time: number
}

export interface TaskStatistics {
  total_count: number
  success_count: number
  failure_count: number
  pending_count: number
  running_count: number
  success_rate: number
  avg_execution_time: number
  min_execution_time: number
  max_execution_time: number
  algorithm_stats: AlgorithmStat[]
}

export interface TaskStatisticsResponse {
  code: number
  message: string
  data: TaskStatistics
}

export interface TaskDashboardData {
  statistics: TaskStatistics
  recent_tasks: TaskRecord[]
  summary: {
    total_tasks: number
    success_rate: number
    avg_execution_time: number
  }
}

export interface TaskDashboardResponse {
  code: number
  message: string
  data: TaskDashboardData
}

export interface CleanupResponse {
  code: number
  message: string
  data: {
    deleted_count: number
  }
}
