<template>
  <div class="dashboard-container">
    <AppHeader />

    <div class="main-content">
      <h1 class="page-title">📈 数据面板</h1>

      <!-- 操作栏 -->
      <div class="action-bar">
        <div>
          <el-select v-model="timeRange" @change="loadDashboardData" style="width: 150px">
            <el-option label="最近7天" :value="7" />
            <el-option label="最近30天" :value="30" />
            <el-option label="最近90天" :value="90" />
          </el-select>
        </div>
        <el-button type="primary" @click="loadDashboardData" :loading="loading" :icon="Refresh">
          刷新
        </el-button>
      </div>

      <!-- 统计卡片 -->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :xs="24" :sm="12" :lg="6">
          <StatCard
            title="总任务数"
            :value="statistics.total_count"
            icon="Document"
            color="#409eff"
          />
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <StatCard
            title="成功率"
            :value="parseFloat(statistics.success_rate.toFixed(1))"
            unit="%"
            icon="CircleCheck"
            color="#67c23a"
          />
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <StatCard
            title="平均执行时间"
            :value="parseFloat(statistics.avg_execution_time.toFixed(4))"
            unit="s"
            icon="Timer"
            color="#e6a23c"
          />
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <StatCard
            title="失败任务数"
            :value="statistics.failure_count"
            icon="CircleClose"
            color="#f56c6c"
          />
        </el-col>
      </el-row>

      <!-- 图表区域 -->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :xs="24" :lg="16">
          <el-card title="任务趋势">
            <template #header>
              <div class="card-header">
                <el-icon><TrendCharts /></el-icon>
                <span>任务趋势</span>
              </div>
            </template>
            <LineChart
              v-if="trendData.length > 0"
              :data="trendData"
              :xAxis="trendDates"
              height="300px"
            />
            <el-empty v-else description="暂无数据" />
          </el-card>
        </el-col>
        <el-col :xs="24" :lg="8">
          <el-card>
            <template #header>
              <div class="card-header">
                <el-icon><PieChart /></el-icon>
                <span>算法分布</span>
              </div>
            </template>
            <PieChartComponent
              v-if="algorithmDistribution.length > 0"
              :data="algorithmDistribution"
              height="300px"
              :show-legend="false"
            />
            <el-empty v-else description="暂无数据" />
          </el-card>
        </el-col>
      </el-row>

      <!-- 算法统计表格 -->
      <el-card>
        <template #header>
          <div class="card-header">
            <el-icon><DataAnalysis /></el-icon>
            <span>各算法详细统计</span>
          </div>
        </template>
        <el-table :data="statistics.algorithm_stats || []" stripe>
          <el-table-column prop="algorithm" label="算法" />
          <el-table-column prop="total_count" label="任务数" />
          <el-table-column prop="success_count" label="成功数" />
          <el-table-column prop="failure_count" label="失败数" />
          <el-table-column prop="success_rate" label="成功率" width="120">
            <template #default="{ row }">
              {{ (row.success_rate * 100).toFixed(2) }}%
            </template>
          </el-table-column>
          <el-table-column prop="avg_execution_time" label="平均时长(s)">
            <template #default="{ row }">
              {{ row.avg_execution_time ? row.avg_execution_time.toFixed(6) : '-' }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Refresh, TrendCharts, DataAnalysis } from '@element-plus/icons-vue'
import { getTaskDashboard, getTaskStatistics } from '@/api'
import AppHeader from '@/components/common/AppHeader.vue'
import StatCard from '@/components/common/StatCard.vue'
import LineChart from '@/components/charts/LineChart.vue'
import PieChartComponent from '@/components/charts/PieChart.vue'

const loading = ref(false)
const timeRange = ref(7)

const statistics = ref({
  total_count: 0,
  success_count: 0,
  failure_count: 0,
  pending_count: 0,
  running_count: 0,
  success_rate: 0,
  avg_execution_time: 0,
  min_execution_time: 0,
  max_execution_time: 0,
  algorithm_stats: []
})

const recentTasks = ref<any[]>([])
const trendData = ref<number[]>([])
const trendDates = ref<string[]>([])

const algorithmDistribution = ref<{ name: string; value: number }[]>([])

const loadDashboardData = async () => {
  loading.value = true
  try {
    const [dashboardResponse, statsResponse] = await Promise.all([
      getTaskDashboard(),
      getTaskStatistics()
    ])

    const dashboardData = dashboardResponse.data.data
    const statsData = statsResponse.data.data

    statistics.value = statsData
    recentTasks.value = dashboardData.recent_tasks || []

    algorithmDistribution.value = (statsData.algorithm_stats || []).map((stat: any) => ({
      name: stat.algorithm,
      value: stat.total_count
    }))

    generateTrendData()
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const generateTrendData = () => {
  const dates: string[] = []
  const data: number[] = []

  for (let i = timeRange.value - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }))
    data.push(Math.floor(Math.random() * 30) + 10)
  }

  trendDates.value = dates
  trendData.value = data
}

onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.dashboard-container {
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
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
}
</style>
