<template>
  <el-card class="array-input-panel">
    <template #header>
      <div class="panel-header">
        <el-icon><DataAnalysis /></el-icon>
        <span>{{ title }}</span>
      </div>
    </template>

    <el-alert :title="description" type="info" :closable="false" style="margin-bottom: 20px" />

    <el-input
      v-model="inputValue"
      type="textarea"
      :rows="6"
      :placeholder="placeholder"
      clearable
      @input="handleInput"
    />

    <div class="panel-actions">
      <el-button type="primary" @click="handleCalculate" :loading="loading" :disabled="!isValid">
        <el-icon><Calculator /></el-icon>
        计算{{ title }}
      </el-button>
      <el-button @click="handleClear">
        <el-icon><Delete /></el-icon>
        清空
      </el-button>
    </div>

    <div v-if="result !== null" class="result-section">
      <el-divider>计算结果</el-divider>
      <div class="result-item">
        <span class="result-label">结果:</span>
        <span class="result-value">{{ formatResult(result) }}</span>
      </div>
      <div v-if="executionTime !== null" class="result-item">
        <span class="result-label">执行时间:</span>
        <span class="result-value">{{ formatExecutionTime(executionTime) }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { DataAnalysis, Grid as Calculator, Delete } from '@element-plus/icons-vue'
import { parseCSVNumbers } from '@/utils/validate'
import { formatExecutionTime } from '@/utils/format'

interface Props {
  title?: string
  description?: string
  placeholder?: string
  minLength?: number
}

interface Emits {
  (e: 'calculate', numbers: number[]): void
  (e: 'clear'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '计算',
  description: '请输入数字列表',
  placeholder: '输入数字列表，用逗号、空格或换行分隔',
  minLength: 1
})

const emit = defineEmits<Emits>()

const inputValue = ref('')
const numbers = ref<number[]>([])
const result = ref<number | null>(null)
const executionTime = ref<number | null>(null)
const loading = ref(false)

const isValid = computed(() => {
  return numbers.value.length >= props.minLength
})

const handleInput = () => {
  const { numbers: nums, error } = parseCSVNumbers(inputValue.value)
  if (error) {
    numbers.value = []
  } else {
    numbers.value = nums
  }
}

const handleCalculate = () => {
  if (!isValid.value) {
    ElMessage.warning(`至少需要 ${props.minLength} 个数字`)
    return
  }
  emit('calculate', numbers.value)
}

const setResult = (res: number, execTime: number) => {
  result.value = res
  executionTime.value = execTime
}

const handleClear = () => {
  inputValue.value = ''
  numbers.value = []
  result.value = null
  executionTime.value = null
  emit('clear')
}

const formatResult = (value: number) => {
  if (Number.isInteger(value)) {
    return value.toString()
  }
  return value.toFixed(6)
}

defineExpose({
  setResult,
  setLoading: (value: boolean) => {
    loading.value = value
  }
})
</script>

<style scoped>
.array-input-panel {
  max-width: 800px;
  margin: 0 auto;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
}

.panel-actions {
  margin-top: 16px;
  display: flex;
  gap: 12px;
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

.result-item:last-child {
  border-bottom: none;
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
