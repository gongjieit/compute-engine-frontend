import request from '@/utils/request'
import type {
  CreateAsyncTaskRequest,
  CreateAsyncTaskResponse,
  TaskStatusResponse,
  TaskRecordsResponse,
  TaskRecordResponse,
  TaskStatisticsResponse,
  TaskDashboardResponse,
  CleanupResponse
} from './types'

export const createAsyncTask = (data: CreateAsyncTaskRequest) => {
  return request<CreateAsyncTaskResponse>({
    url: '/volatility/async',
    method: 'post',
    data
  })
}

export const getTaskStatus = (taskId: string) => {
  return request<TaskStatusResponse>({
    url: `/task/${taskId}`,
    method: 'get'
  })
}

export const getTaskRecords = (params?: {
  page?: number
  page_size?: number
  algorithm?: string
  status?: string
  start_date?: string
  end_date?: string
}) => {
  return request<TaskRecordsResponse>({
    url: '/tasks/records',
    method: 'get',
    params
  })
}

export const getTaskDetail = (taskId: string) => {
  return request<TaskRecordResponse>({
    url: `/tasks/${taskId}/record`,
    method: 'get'
  })
}

export const getTaskStatistics = (params?: {
  start_date?: string
  end_date?: string
  algorithm?: string
}) => {
  return request<TaskStatisticsResponse>({
    url: '/tasks/statistics',
    method: 'get',
    params
  })
}

export const getTaskDashboard = () => {
  return request<TaskDashboardResponse>({
    url: '/tasks/dashboard',
    method: 'get'
  })
}

export const cleanupOldTasks = (days?: number) => {
  return request<CleanupResponse>({
    url: '/tasks/cleanup',
    method: 'delete',
    params: { days }
  })
}
