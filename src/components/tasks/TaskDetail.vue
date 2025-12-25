<template>
  <div class="task-detail">
    <el-descriptions :column="2" border>
      <el-descriptions-item label="任务ID" :span="2">
        <el-text type="primary" style="font-family: monospace">{{ task.task_id }}</el-text>
      </el-descriptions-item>
      <el-descriptions-item label="任务名称">
        {{ task.task_name }}
      </el-descriptions-item>
      <el-descriptions-item label="算法类型">
        {{ task.algorithm }}
      </el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag :type="getStatusType(task.status)">
          {{ getStatusText(task.status) }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{ formatDateTime(task.created_at) }}
      </el-descriptions-item>
      <el-descriptions-item label="开始时间">
        {{ task.start_time ? formatDateTime(task.start_time) : '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="结束时间">
        {{ task.end_time ? formatDateTime(task.end_time) : '-' }}
      </el-descriptions-item>
      <el-descriptions-item label="执行时间">
        {{ task.execution_time ? task.execution_time.toFixed(6) + ' 秒' : '-' }}
      </el-descriptions-item>
    </el-descriptions>

    <el-divider />

    <div v-if="task.error_message" class="error-section">
      <h4>错误信息</h4>
      <el-alert type="error" :closable="false">
        {{ task.error_message }}
      </el-alert>
    </div>

    <div v-if="task.result" class="result-section">
      <h4>计算结果</h4>
      <el-card>
        <pre class="result-json">{{ JSON.stringify(task.result, null, 2) }}</pre>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskRecord } from '@/api/types'
import { TASK_STATUS_TEXT, TASK_STATUS_COLOR } from '@/utils/constants'
import { formatDateTime } from '@/utils/format'

interface Props {
  task: TaskRecord
}

defineProps<Props>()

const getStatusType = (status: string) => {
  return TASK_STATUS_COLOR[status as keyof typeof TASK_STATUS_COLOR] || 'info'
}

const getStatusText = (status: string) => {
  return TASK_STATUS_TEXT[status as keyof typeof TASK_STATUS_TEXT] || status
}
</script>

<style scoped>
.task-detail {
  padding: 20px;
}

.error-section {
  margin-bottom: 20px;
}

.error-section h4 {
  margin: 0 0 12px 0;
  color: #303133;
}

.result-section h4 {
  margin: 0 0 12px 0;
  color: #303133;
}

.result-json {
  white-space: pre-wrap;
  word-break: break-all;
  background: #f5f7fa;
  padding: 16px;
  border-radius: 4px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
