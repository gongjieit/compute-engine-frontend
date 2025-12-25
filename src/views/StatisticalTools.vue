<template>
  <div class="statistical-tools-container">
    <AppHeader />

    <div class="main-content">
      <h1 class="page-title">📊 统计工具集</h1>

      <el-tabs v-model="activeTab" type="border-card">
        <!-- 平均值 -->
        <el-tab-pane label="平均值" name="mean">
          <ArrayInputPanel
            ref="meanPanel"
            title="平均值计算"
            description="计算一组数字的算术平均值"
            placeholder="输入数字列表，用逗号、空格或换行分隔"
            :minLength="1"
            @calculate="handleCalculateMean"
          />
        </el-tab-pane>

        <!-- 方差 -->
        <el-tab-pane label="方差" name="variance">
          <ArrayInputPanel
            ref="variancePanel"
            title="方差计算"
            description="计算一组数字的方差（至少需要2个数字）"
            placeholder="输入数字列表，用逗号、空格或换行分隔"
            :minLength="2"
            @calculate="handleCalculateVariance"
          />
        </el-tab-pane>

        <!-- 相关系数 -->
        <el-tab-pane label="相关系数" name="correlation">
          <el-card>
            <template #header>
              <div class="card-header">
                <el-icon><TrendCharts /></el-icon>
                <span>相关系数计算</span>
              </div>
            </template>

            <el-alert
              title="计算两个变量之间的皮尔逊相关系数"
              type="info"
              :closable="false"
              style="margin-bottom: 20px"
            />

            <el-form :model="correlationForm" label-width="120px">
              <el-form-item label="X 变量值">
                <el-input
                  v-model="correlationForm.xInput"
                  type="textarea"
                  :rows="4"
                  placeholder="输入X变量的值，用逗号分隔"
                />
              </el-form-item>
              <el-form-item label="Y 变量值">
                <el-input
                  v-model="correlationForm.yInput"
                  type="textarea"
                  :rows="4"
                  placeholder="输入Y变量的值，用逗号分隔"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="handleCalculateCorrelation"
                  :loading="loading"
                  :disabled="!isCorrelationValid"
                >
                  计算相关系数
                </el-button>
                <el-button @click="resetCorrelation">清空</el-button>
              </el-form-item>
            </el-form>

            <div v-if="correlationResult !== null" class="result-section">
              <el-divider>计算结果</el-divider>
              <div class="result-item">
                <span class="result-label">相关系数:</span>
                <span class="result-value">{{ correlationResult.toFixed(6) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">执行时间:</span>
                <span class="result-value">{{ formatExecutionTime(correlationTime) }}</span>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { TrendCharts } from '@element-plus/icons-vue'
import { calculateMean, calculateVariance, calculateCorrelation } from '@/api'
import AppHeader from '@/components/common/AppHeader.vue'
import ArrayInputPanel from '@/components/calculator/ArrayInputPanel.vue'
import { parseCSVNumbers } from '@/utils/validate'
import { formatExecutionTime } from '@/utils/format'

const activeTab = ref('mean')
const loading = ref(false)

const meanPanel = ref()
const variancePanel = ref()

const correlationForm = reactive({
  xInput: '',
  yInput: ''
})

const correlationResult = ref<number | null>(null)
const correlationTime = ref(0)

const isCorrelationValid = computed(() => {
  const x = parseCSVNumbers(correlationForm.xInput)
  const y = parseCSVNumbers(correlationForm.yInput)
  return !x.error && !y.error && x.numbers.length >= 2 && y.numbers.length >= 2
})

const handleCalculateMean = async (numbers: number[]) => {
  try {
    loading.value = true
    const response = await calculateMean({ numbers })
    meanPanel.value.setResult(response.data.result, response.data.execution_time)
    ElMessage.success('计算成功')
  } catch (error) {
    ElMessage.error('计算失败')
  } finally {
    loading.value = false
  }
}

const handleCalculateVariance = async (numbers: number[]) => {
  try {
    loading.value = true
    const response = await calculateVariance({ numbers })
    variancePanel.value.setResult(response.data.result, response.data.execution_time)
    ElMessage.success('计算成功')
  } catch (error) {
    ElMessage.error('计算失败')
  } finally {
    loading.value = false
  }
}

const handleCalculateCorrelation = async () => {
  try {
    loading.value = true
    const xResult = parseCSVNumbers(correlationForm.xInput)
    const yResult = parseCSVNumbers(correlationForm.yInput)

    const response = await calculateCorrelation({ x: xResult.numbers, y: yResult.numbers })
    correlationResult.value = response.data.result
    correlationTime.value = response.data.execution_time
    ElMessage.success('计算成功')
  } catch (error) {
    ElMessage.error('计算失败')
  } finally {
    loading.value = false
  }
}

const resetCorrelation = () => {
  correlationForm.xInput = ''
  correlationForm.yInput = ''
  correlationResult.value = null
  correlationTime.value = 0
}
</script>

<style scoped>
.statistical-tools-container {
  min-height: 100vh;
}

.main-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 32px;
  margin-bottom: 24px;
  color: #303133;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
}

.result-section {
  margin-top: 20px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #ebeef5;
}

.result-label {
  color: #606266;
  font-weight: 500;
}

.result-value {
  color: #409eff;
  font-weight: bold;
  font-size: 18px;
}
</style>
