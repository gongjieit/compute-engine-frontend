<template>
  <div class="home-container">
    <AppHeader />

    <div class="main-content">
      <!-- Hero Section -->
      <div class="hero-section">
        <h1 class="hero-title">🎯 计算引擎</h1>
        <p class="hero-subtitle">高性能实时计算与异步任务处理平台</p>
      </div>

      <!-- Feature Grid -->
      <div class="feature-grid">
        <FeatureCard
          v-for="feature in features"
          :key="feature.id"
          :icon="feature.icon"
          :title="feature.title"
          :description="feature.description"
          :route="feature.route"
        />
      </div>

      <!-- Statistics Section -->
      <div class="stats-section">
        <h2 class="section-title">📊 系统统计</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="6">
            <StatCard
              title="总任务数"
              :value="statistics.totalTasks"
              icon="Document"
              color="#409eff"
            />
          </el-col>
          <el-col :xs="24" :sm="12" :lg="6">
            <StatCard
              title="成功率"
              :value="statistics.successRate"
              unit="%"
              icon="CircleCheck"
              color="#67c23a"
            />
          </el-col>
          <el-col :xs="24" :sm="12" :lg="6">
            <StatCard
              title="平均执行时间"
              :value="statistics.avgExecutionTime"
              unit="s"
              icon="Timer"
              color="#e6a23c"
            />
          </el-col>
          <el-col :xs="24" :sm="12" :lg="6">
            <StatCard
              title="今日任务"
              :value="statistics.todayTasks"
              icon="TrendCharts"
              color="#909399"
            />
          </el-col>
        </el-row>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2 class="section-title">🚀 快速开始</h2>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card class="action-card" shadow="hover" @click="navigateTo('/simple-calculate')">
              <div class="action-content">
                <span class="action-icon">🧮</span>
                <h3>简单计算</h3>
                <p>进行基础的四则运算</p>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card class="action-card" shadow="hover" @click="navigateTo('/statistical-tools')">
              <div class="action-content">
                <span class="action-icon">📊</span>
                <h3>统计工具</h3>
                <p>计算平均值、方差等</p>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card class="action-card" shadow="hover" @click="navigateTo('/task-center')">
              <div class="action-content">
                <span class="action-icon">📋</span>
                <h3>任务中心</h3>
                <p>管理异步计算任务</p>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="6">
            <el-card class="action-card" shadow="hover" @click="navigateTo('/dashboard')">
              <div class="action-content">
                <span class="action-icon">📈</span>
                <h3>数据面板</h3>
                <p>查看统计分析图表</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getTaskDashboard } from '@/api'
import AppHeader from '@/components/common/AppHeader.vue'
import StatCard from '@/components/common/StatCard.vue'
import FeatureCard from '@/components/common/FeatureCard.vue'

const router = useRouter()

const features = [
  {
    id: 1,
    title: '简单计算器',
    description: '基础的四则运算',
    icon: '🧮',
    route: '/simple-calculate'
  },
  {
    id: 2,
    title: '统计工具集',
    description: '平均值、方差等',
    icon: '📊',
    route: '/statistical-tools'
  },
  {
    id: 3,
    title: '金融分析',
    description: '回撤、收益率等',
    icon: '📉',
    route: '/financial-analysis'
  },
  {
    id: 4,
    title: '数学工具',
    description: '斐波那契、阶乘等',
    icon: '🔢',
    route: '/math-tools'
  },
  {
    id: 5,
    title: '任务中心',
    description: '管理异步任务',
    icon: '📋',
    route: '/task-center'
  },
  {
    id: 6,
    title: '数据面板',
    description: '可视化统计分析',
    icon: '📈',
    route: '/dashboard'
  }
]

const statistics = ref({
  totalTasks: 0,
  successRate: 0,
  avgExecutionTime: 0,
  todayTasks: 0
})

onMounted(async () => {
  try {
    const response = await getTaskDashboard()
    const data = response.data.data
    statistics.value = {
      totalTasks: data.summary.total_tasks || 0,
      successRate: parseFloat(data.summary.success_rate.toFixed(1)) || 0,
      avgExecutionTime: parseFloat(data.summary.avg_execution_time.toFixed(3)) || 0,
      todayTasks: data.recent_tasks?.length || 0
    }
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error)
  }
})

const navigateTo = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
}

.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero-section {
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  margin-bottom: 40px;
  color: white;
}

.hero-title {
  font-size: 48px;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.9;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}

.section-title {
  font-size: 24px;
  margin-bottom: 24px;
  color: #303133;
}

.stats-section {
  margin-bottom: 60px;
}

.quick-actions {
  margin-bottom: 60px;
}

.action-card {
  cursor: pointer;
  transition: transform 0.3s;
  height: 100%;
}

.action-card:hover {
  transform: translateY(-8px);
}

.action-content {
  text-align: center;
  padding: 20px;
}

.action-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.action-content h3 {
  margin: 12px 0;
  color: #303133;
}

.action-content p {
  color: #909399;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-section {
    padding: 40px 20px;
  }
}
</style>
