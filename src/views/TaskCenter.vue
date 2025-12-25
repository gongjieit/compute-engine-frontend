<template>
  <div class="task-center-container">
    <AppHeader />

    <div class="main-content">
      <h1 class="page-title">📋 任务中心</h1>

      <!-- 操作栏 -->
      <div class="action-bar">
        <div class="left-actions">
          <el-button type="primary" @click="showCreateDialog" :icon="Plus">
            创建任务
          </el-button>
          <el-button @click="fetchTasks" :icon="Refresh" :loading="loading">
            刷新
          </el-button>
          <el-button @click="showCleanupDialog" :icon="Delete">
            清理旧任务
          </el-button>
        </div>

        <div class="filters">
          <el-radio-group v-model="statusFilter" @change="fetchTasks">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="SUCCESS">成功</el-radio-button>
            <el-radio-button label="FAILURE">失败</el-radio-button>
            <el-radio-button label="PENDING">等待中</el-radio-button>
            <el-radio-button label="STARTED">进行中</el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <!-- 任务列表 -->
      <el-card>
        <el-table :data="filteredTasks" v-loading="loading" stripe>
          <el-table-column prop="task_id" label="任务ID" width="300">
            <template #default="{ row }">
              <el-tooltip :content="row.task_id" placement="top">
                <el-text type="primary" style="font-family: monospace; font-size: 12px">
                  {{ row.task_id }}
                </el-text>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column prop="algorithm" label="算法类型" width="200">
            <template #default="{ row }">
              {{ getAlgorithmText(row.algorithm) }} ({{ row.algorithm }})
            </template>
          </el-table-column>

          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)">
                {{ getStatusText(row.status) }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="created_at" label="创建时间" width="180">
            <template #default="{ row }">
              {{ formatDateTime(row.created_at) }}
            </template>
          </el-table-column>

          <el-table-column prop="execution_time" label="执行时间(s)" width="120">
            <template #default="{ row }">
              {{ row.execution_time ? row.execution_time.toFixed(4) : '-' }}
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150">
            <template #default="{ row }">
              <el-button link type="primary" @click="viewDetail(row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @change="fetchTasks"
          style="margin-top: 20px; justify-content: center"
        />
      </el-card>

      <!-- 创建任务对话框 -->
      <el-dialog v-model="createDialogVisible" title="创建波动率异步计算任务" width="700px">
        <CreateTaskForm @created="handleTaskCreated" @cancel="createDialogVisible = false" />
      </el-dialog>

      <!-- 任务详情对话框 -->
      <el-dialog v-model="detailDialogVisible" title="任务详情" width="800px">
        <TaskDetail v-if="currentTask" :task="currentTask" />
      </el-dialog>

      <!-- 清理任务对话框 -->
      <el-dialog v-model="cleanupDialogVisible" title="清理旧任务" width="500px">
        <el-form label-width="120px">
          <el-form-item label="保留天数">
            <el-input-number v-model="cleanupDays" :min="1" :max="365" style="width: 200px" />
            <div class="form-tip">将删除 {{ cleanupDays }} 天之前的已完成任务记录</div>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="cleanupDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="handleCleanup" :loading="cleanupLoading">
            确认清理
          </el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Refresh, Delete } from '@element-plus/icons-vue'
import { getTaskRecords, cleanupOldTasks } from '@/api'
import type { TaskRecord } from '@/api/types'
import AppHeader from '@/components/common/AppHeader.vue'
import CreateTaskForm from '@/components/tasks/CreateTaskForm.vue'
import TaskDetail from '@/components/tasks/TaskDetail.vue'
import { TASK_STATUS_TEXT, TASK_STATUS_COLOR, ALGORITHM_TEXT } from '@/utils/constants'
import { formatDateTime } from '@/utils/format'

const loading = ref(false)
const tasks = ref<TaskRecord[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const statusFilter = ref('')

const createDialogVisible = ref(false)
const detailDialogVisible = ref(false)
const cleanupDialogVisible = ref(false)
const currentTask = ref<TaskRecord | null>(null)
const cleanupDays = ref(30)
const cleanupLoading = ref(false)

const filteredTasks = computed(() => {
  if (!statusFilter.value) return tasks.value
  return tasks.value.filter((task) => task.status === statusFilter.value)
})

const fetchTasks = async () => {
  loading.value = true
  try {
    const response = await getTaskRecords({
      page: currentPage.value,
      page_size: pageSize.value,
      status: statusFilter.value || undefined
    })
    tasks.value = response.data.data.records
    total.value = response.data.data.total
  } catch (error) {
    ElMessage.error('获取任务列表失败')
  } finally {
    loading.value = false
  }
}

const showCreateDialog = () => {
  createDialogVisible.value = true
}

const handleTaskCreated = () => {
  createDialogVisible.value = false
  ElMessage.success('任务创建成功')
  fetchTasks()
}

const viewDetail = (task: TaskRecord) => {
  currentTask.value = task
  detailDialogVisible.value = true
}

const showCleanupDialog = () => {
  cleanupDialogVisible.value = true
}

const handleCleanup = async () => {
  try {
    cleanupLoading.value = true
    const response = await cleanupOldTasks(cleanupDays.value)
    ElMessage.success(`清理完成，删除了 ${response.data.data.deleted_count} 条记录`)
    cleanupDialogVisible.value = false
    fetchTasks()
  } catch (error) {
    ElMessage.error('清理失败')
  } finally {
    cleanupLoading.value = false
  }
}

const getStatusType = (status: string) => {
  return TASK_STATUS_COLOR[status as keyof typeof TASK_STATUS_COLOR] || 'info'
}

const getStatusText = (status: string) => {
  return TASK_STATUS_TEXT[status as keyof typeof TASK_STATUS_TEXT] || status
}

const getAlgorithmText = (algorithm: string) => {
  return ALGORITHM_TEXT[algorithm as keyof typeof ALGORITHM_TEXT] || algorithm
}

onMounted(() => {
  fetchTasks()
})
</script>

<style scoped>
.task-center-container {
  min-height: 100vh;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 32px;
  margin-bottom: 24px;
  color: #303133;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.left-actions {
  display: flex;
  gap: 12px;
}

.filters {
  display: flex;
  align-items: center;
}

.form-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .action-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .left-actions,
  .filters {
    flex-direction: column;
  }
}
</style>
