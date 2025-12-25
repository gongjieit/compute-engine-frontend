<template>
  <div class="math-tools-container">
    <AppHeader />

    <div class="main-content">
      <h1 class="page-title">🔢 数学工具集</h1>

      <el-row :gutter="20">
        <el-col :xs="24" :md="12">
          <el-card class="math-card">
            <template #header>
              <div class="card-header">
                <el-icon><Memo /></el-icon>
                <span>斐波那契数列</span>
              </div>
            </template>

            <el-form :model="fibonacciForm" label-width="100px">
              <el-form-item label="序号 n">
                <el-input-number
                  v-model="fibonacciForm.n"
                  :min="0"
                  :max="1000"
                  style="width: 100%"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="handleCalculateFibonacci"
                  :loading="fibonacciLoading"
                >
                  计算斐波那契数
                </el-button>
              </el-form-item>
            </el-form>

            <div v-if="fibonacciResult !== null" class="result-section">
              <el-divider>计算结果</el-divider>
              <div class="result-item">
                <span class="result-label">第 n 个斐波那契数:</span>
                <span class="result-value">{{ fibonacciResult.toLocaleString() }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">执行时间:</span>
                <span class="result-value">{{ formatExecutionTime(fibonacciTime) }}</span>
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :xs="24" :md="12">
          <el-card class="math-card">
            <template #header>
              <div class="card-header">
                <el-icon><Tickets /></el-icon>
                <span>阶乘计算</span>
              </div>
            </template>

            <el-form :model="factorialForm" label-width="100px">
              <el-form-item label="数值 n">
                <el-input-number
                  v-model="factorialForm.n"
                  :min="0"
                  :max="100"
                  style="width: 100%"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleCalculateFactorial" :loading="factorialLoading">
                  计算阶乘
                </el-button>
              </el-form-item>
            </el-form>

            <div v-if="factorialResult !== null" class="result-section">
              <el-divider>计算结果</el-divider>
              <div class="result-item">
                <span class="result-label">n 的阶乘:</span>
                <span class="result-value">{{ factorialResult.toLocaleString() }}</span>
              </div>
              <div class="result-item">
                <span class="result-label">执行时间:</span>
                <span class="result-value">{{ formatExecutionTime(factorialTime) }}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Memo, Tickets } from '@element-plus/icons-vue'
import { calculateFibonacci, calculateFactorial } from '@/api'
import AppHeader from '@/components/common/AppHeader.vue'
import { formatExecutionTime } from '@/utils/format'

const fibonacciForm = reactive({
  n: 10
})

const factorialForm = reactive({
  n: 5
})

const fibonacciResult = ref<number | null>(null)
const fibonacciTime = ref(0)
const fibonacciLoading = ref(false)

const factorialResult = ref<number | null>(null)
const factorialTime = ref(0)
const factorialLoading = ref(false)

const handleCalculateFibonacci = async () => {
  try {
    fibonacciLoading.value = true
    const response = await calculateFibonacci({ n: fibonacciForm.n })
    fibonacciResult.value = response.data.result
    fibonacciTime.value = response.data.execution_time
    ElMessage.success('计算成功')
  } catch (error) {
    ElMessage.error('计算失败')
  } finally {
    fibonacciLoading.value = false
  }
}

const handleCalculateFactorial = async () => {
  try {
    factorialLoading.value = true
    const response = await calculateFactorial({ n: factorialForm.n })
    factorialResult.value = response.data.result
    factorialTime.value = response.data.execution_time
    ElMessage.success('计算成功')
  } catch (error) {
    ElMessage.error('计算失败')
  } finally {
    factorialLoading.value = false
  }
}
</script>

<style scoped>
.math-tools-container {
  min-height: 100vh;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-title {
  font-size: 32px;
  margin-bottom: 24px;
  color: #303133;
}

.math-card {
  margin-bottom: 20px;
  height: 100%;
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
  word-break: break-all;
}
</style>
