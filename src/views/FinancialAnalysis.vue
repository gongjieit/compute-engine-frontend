<template>
  <div class="financial-analysis-container">
    <AppHeader />

    <div class="main-content">
      <h1 class="page-title">📉 金融分析工具</h1>

      <el-tabs v-model="activeTab" type="border-card">
        <!-- 最大回撤 -->
        <el-tab-pane label="最大回撤" name="max-drawdown">
          <el-card>
            <template #header>
              <div class="card-header">
                <el-icon><TrendCharts /></el-icon>
                <span>最大回撤计算</span>
              </div>
            </template>

            <el-alert
              title="计算投资组合从历史最高点到当前的低点之间最大的跌幅"
              type="info"
              :closable="false"
              style="margin-bottom: 20px"
            />

            <div class="input-section">
              <div class="section-header">
                <h3>每日数据</h3>
                <el-button type="primary" @click="addDailyData" :icon="Plus">添加一行</el-button>
              </div>

              <el-table :data="dailyData" border style="margin-bottom: 20px">
                <el-table-column label="日期" width="180">
                  <template #default="{ row }">
                    <el-date-picker
                      v-model="row.date"
                      type="date"
                      placeholder="选择日期"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      style="width: 100%"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="当日收益">
                  <template #default="{ row }">
                    <el-input-number v-model="row.total_return" :precision="2" style="width: 100%" />
                  </template>
                </el-table-column>
                <el-table-column label="当日资金占用">
                  <template #default="{ row }">
                    <el-input-number v-model="row.avg_capital" :precision="2" style="width: 100%" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                  <template #default="{ $index }">
                    <el-button type="danger" link @click="removeDailyData($index)" :icon="Delete" />
                  </template>
                </el-table-column>
              </el-table>

              <el-button type="primary" @click="handleCalculateMaxDrawdown" :loading="loading">
                计算最大回撤
              </el-button>
              <el-button @click="clearDailyData">清空数据</el-button>
            </div>

            <div v-if="maxDrawdownResult !== null" class="result-section">
              <el-divider>计算结果</el-divider>
              <div class="result-item">
                <span class="result-label">最大回撤:</span>
                <span class="result-value">{{ formatPercentage(maxDrawdownResult / 100) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">执行时间:</span>
                <span class="result-value">{{ formatExecutionTime(maxDrawdownTime) }}</span>
              </div>
            </div>
          </el-card>
        </el-tab-pane>

        <!-- 时间加权收益率 -->
        <el-tab-pane label="时间加权收益率" name="twr">
          <el-card>
            <template #header>
              <div class="card-header">
                <el-icon><TrendCharts /></el-icon>
                <span>时间加权收益率计算</span>
              </div>
            </template>

            <el-alert
              title="计算投资组合的时间加权收益率，消除资金流入流出的影响"
              type="info"
              :closable="false"
              style="margin-bottom: 20px"
            />

            <div class="input-section">
              <div class="section-header">
                <h3>每日数据</h3>
                <el-button type="primary" @click="addTWRData" :icon="Plus">添加一行</el-button>
              </div>

              <el-table :data="twrData" border style="margin-bottom: 20px">
                <el-table-column label="日期" width="180">
                  <template #default="{ row }">
                    <el-date-picker
                      v-model="row.date"
                      type="date"
                      placeholder="选择日期"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      style="width: 100%"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="资产规模">
                  <template #default="{ row }">
                    <el-input-number v-model="row.total_scale" :precision="2" style="width: 100%" />
                  </template>
                </el-table-column>
                <el-table-column label="当日净收益">
                  <template #default="{ row }">
                    <el-input-number v-model="row.total_return" :precision="2" style="width: 100%" />
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="80">
                  <template #default="{ $index }">
                    <el-button type="danger" link @click="removeTWRData($index)" :icon="Delete" />
                  </template>
                </el-table-column>
              </el-table>

              <el-button type="primary" @click="handleCalculateTWR" :loading="loading">
                计算时间加权收益率
              </el-button>
              <el-button @click="clearTWRData">清空数据</el-button>
            </div>

            <div v-if="twrResult !== null" class="result-section">
              <el-divider>计算结果</el-divider>
              <div class="result-item">
                <span class="result-label">时间加权收益率:</span>
                <span class="result-value">{{ formatPercentage(twrResult.final_return) }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">执行时间:</span>
                <span class="result-value">{{ formatExecutionTime(twrTime) }}</span>
              </div>
              <div v-if="twrResult.daily_cumulative_returns && twrResult.daily_cumulative_returns.length > 0">
                <el-divider>每日累计收益率</el-divider>
                <el-table :data="twrResult.daily_cumulative_returns" border>
                  <el-table-column label="日期" prop="date" width="180" />
                  <el-table-column label="累计收益率">
                    <template #default="{ row }">
                      {{ formatPercentage(row.cumulative_return) }}
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-card>
        </el-tab-pane>

        <!-- 波动率 -->
        <el-tab-pane label="波动率" name="volatility">
          <el-card>
            <template #header>
              <div class="card-header">
                <el-icon><TrendCharts /></el-icon>
                <span>波动率计算</span>
              </div>
            </template>

            <el-alert
              title="计算投资组合的波动率（年化标准差），用于衡量投资风险"
              type="info"
              :closable="false"
              style="margin-bottom: 20px"
            />

            <div class="input-section">
              <el-form label-width="150px" style="max-width: 600px; margin-bottom: 20px">
                <el-form-item label="交易日天数/年">
                  <el-input-number v-model="tradingDaysPerYear" :min="1" :max="365" />
                </el-form-item>
              </el-form>

              <div class="section-header">
                <h3>数据集</h3>
                <el-button type="primary" @click="addVolatilityDataset" :icon="Plus">添加数据集</el-button>
              </div>

              <div v-for="(dataset, index) in volatilityDatasets" :key="index" class="dataset-card">
                <div class="dataset-header">
                  <span>数据集 {{ index + 1 }}</span>
                  <el-button type="danger" link @click="removeVolatilityDataset(index)" :icon="Delete" />
                </div>
                <el-form label-width="120px">
                  <el-form-item label="收益率序列">
                    <el-input
                      :model-value="dataset.inputString"
                      @update:model-value="(val) => handleInputVolatility(index, val)"
                      type="textarea"
                      :rows="3"
                      placeholder="输入收益率（如：0.05, -0.03, 0.02），用逗号、空格或换行分隔"
                      clearable
                    />
                    <div class="input-preview">
                      <span v-if="dataset.returns.length > 0" class="preview-text">
                        已解析: [{{ dataset.returns.map(n => n.toFixed(4)).join(', ') }}]
                      </span>
                      <span v-else class="preview-text">等待输入...</span>
                    </div>
                  </el-form-item>
                </el-form>
              </div>

              <div class="button-group" style="margin-top: 20px">
                <el-button type="primary" @click="handleCalculateVolatility" :loading="loading">
                  计算波动率
                </el-button>
                <el-button @click="clearVolatilityData">清空数据</el-button>
              </div>
            </div>

            <div v-if="volatilityResults.length > 0" class="result-section">
              <el-divider>计算结果</el-divider>
              <div v-for="(result, index) in volatilityResults" :key="index" class="result-item">
                <span class="result-label">数据集 {{ result.index + 1 }} 波动率:</span>
                <span class="result-value">{{ formatPercentage(result.volatility) }}</span>
                <span class="result-detail">（数据点: {{ result.data_points }}，交易日/年: {{ result.trading_days_per_year }}）</span>
              </div>
              <div class="result-item">
                <span class="result-label">执行时间:</span>
                <span class="result-value">{{ formatExecutionTime(volatilityTime) }}</span>
              </div>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { TrendCharts, Plus, Delete } from '@element-plus/icons-vue'
import { calculateMaxDrawdown, calculateTimeWeightedReturn, calculateVolatility } from '@/api'
import type { DailyData, DailyDataForTWR } from '@/api/types'
import AppHeader from '@/components/common/AppHeader.vue'
import { formatExecutionTime, formatPercentage } from '@/utils/format'
import { parseCSVNumbers } from '@/utils/validate'

const activeTab = ref('max-drawdown')
const loading = ref(false)

const dailyData = ref<DailyData[]>([
  { date: '2024-01-01', total_return: 1000, avg_capital: 100000 },
  { date: '2024-01-02', total_return: -500, avg_capital: 100500 }
])

const twrData = ref<DailyDataForTWR[]>([
  { date: '2024-01-01', total_scale: 100000, total_return: 1000 },
  { date: '2024-01-02', total_scale: 101000, total_return: 500 }
])

const maxDrawdownResult = ref<number | null>(null)
const maxDrawdownTime = ref(0)

const twrResult = ref<any>(null)
const twrTime = ref(0)

const tradingDaysPerYear = ref(252)
const volatilityDatasets = ref<{ inputString: string; returns: number[] }[]>([
  { inputString: '0.05, -0.03, 0.02, 0.01, -0.02, 0.04, -0.01', returns: [0.05, -0.03, 0.02, 0.01, -0.02, 0.04, -0.01] }
])
const volatilityResults = ref<any[]>([])
const volatilityTime = ref(0)

// 解析输入字符串为数字数组
const parseReturns = (input: string): number[] => {
  const { numbers, error } = parseCSVNumbers(input)
  return error ? [] : numbers
}

// 监听输入变化，实时解析数字（使用 nextTick 避免递归）
const handleInputVolatility = (index: number, value: string) => {
  const numbers = parseReturns(value)
  volatilityDatasets.value[index].returns = numbers
  // 更新 inputString 以显示用户输入的值
  volatilityDatasets.value[index].inputString = value
}

const addDailyData = () => {
  const lastDate = dailyData.value[dailyData.value.length - 1]?.date || '2024-01-01'
  const newDate = new Date(lastDate)
  newDate.setDate(newDate.getDate() + 1)
  dailyData.value.push({
    date: newDate.toISOString().split('T')[0],
    total_return: 0,
    avg_capital: 0
  })
}

const removeDailyData = (index: number) => {
  dailyData.value.splice(index, 1)
}

const clearDailyData = () => {
  dailyData.value = []
  maxDrawdownResult.value = null
  maxDrawdownTime.value = 0
}

const addTWRData = () => {
  const lastDate = twrData.value[twrData.value.length - 1]?.date || '2024-01-01'
  const newDate = new Date(lastDate)
  newDate.setDate(newDate.getDate() + 1)
  twrData.value.push({
    date: newDate.toISOString().split('T')[0],
    total_scale: 0,
    total_return: 0
  })
}

const removeTWRData = (index: number) => {
  twrData.value.splice(index, 1)
}

const clearTWRData = () => {
  twrData.value = []
  twrResult.value = null
  twrTime.value = 0
}

const handleCalculateMaxDrawdown = async () => {
  if (dailyData.value.length < 2) {
    ElMessage.warning('至少需要2天的数据')
    return
  }

  try {
    loading.value = true
    const response = await calculateMaxDrawdown({ daily_data: dailyData.value })
    maxDrawdownResult.value = response.data.result
    maxDrawdownTime.value = response.data.execution_time
    ElMessage.success('计算成功')
  } catch (error) {
    ElMessage.error('计算失败')
  } finally {
    loading.value = false
  }
}

const handleCalculateTWR = async () => {
  if (twrData.value.length < 2) {
    ElMessage.warning('至少需要2天的数据')
    return
  }

  try {
    loading.value = true
    const response = await calculateTimeWeightedReturn({ daily_data: twrData.value })
    twrResult.value = response.data.result
    twrTime.value = response.data.execution_time
    ElMessage.success('计算成功')
  } catch (error) {
    ElMessage.error('计算失败')
  } finally {
    loading.value = false
  }
}

const addVolatilityDataset = () => {
  volatilityDatasets.value.push({ inputString: '', returns: [] })
}

const removeVolatilityDataset = (index: number) => {
  volatilityDatasets.value.splice(index, 1)
}

const clearVolatilityData = () => {
  volatilityDatasets.value = [{ inputString: '', returns: [] }]
  volatilityResults.value = []
  volatilityTime.value = 0
}

const handleCalculateVolatility = async () => {
  if (volatilityDatasets.value.length === 0) {
    ElMessage.warning('请至少添加一个数据集')
    return
  }

  const validDatasets = volatilityDatasets.value.filter(d => d.returns && d.returns.length > 1)
  if (validDatasets.length === 0) {
    ElMessage.warning('每个数据集至少需要2个收益率数据')
    return
  }

  try {
    loading.value = true
    const response = await calculateVolatility({
      datasets: validDatasets.map(d => ({ returns: d.returns, trading_days_per_year: tradingDaysPerYear.value })),
      default_trading_days_per_year: tradingDaysPerYear.value
    })
    volatilityResults.value = response.data.results
    volatilityTime.value = response.data.execution_time
    ElMessage.success('计算成功')
  } catch (error) {
    ElMessage.error('计算失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.financial-analysis-container {
  min-height: 100vh;
}

.main-content {
  max-width: 1000px;
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

.input-section {
  padding: 20px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h3 {
  margin: 0;
  color: #303133;
}

.button-group {
  display: flex;
  gap: 12px;
  align-items: center;
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

.result-detail {
  color: #909399;
  font-size: 14px;
  margin-left: 10px;
}

.dataset-card {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f9fafc;
}

.dataset-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-weight: bold;
  color: #303133;
}

.input-preview {
  margin-top: 8px;
  padding: 8px 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 13px;
}

.preview-text {
  color: #909399;
}
</style>
