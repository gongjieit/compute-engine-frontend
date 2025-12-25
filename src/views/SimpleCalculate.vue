<template>
  <div class="simple-calculate-container">
    <AppHeader />

    <div class="main-content">
      <el-card class="calculator-card">
        <template #header>
          <div class="card-header">
            <el-icon><Calculator /></el-icon>
            <span>简单计算器</span>
          </div>
        </template>

        <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
          <el-form-item label="第一个数" prop="a">
            <el-input-number v-model="form.a" :precision="4" :step="0.1" style="width: 100%" />
          </el-form-item>

          <el-form-item label="操作符" prop="operation">
            <el-select v-model="form.operation" style="width: 100%">
              <el-option label="加 (+)" value="+" />
              <el-option label="减 (-)" value="-" />
              <el-option label="乘 (×)" value="*" />
              <el-option label="除 (÷)" value="/" />
            </el-select>
          </el-form-item>

          <el-form-item label="第二个数" prop="b">
            <el-input-number v-model="form.b" :precision="4" :step="0.1" style="width: 100%" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleCalculate" :loading="loading" size="large" style="width: 100%">
              计算
            </el-button>
          </el-form-item>
        </el-form>

        <el-divider />

        <div v-if="result !== null" class="result-section">
          <el-result icon="success" :title="`计算结果: ${formatResult(result)}`">
            <template #sub-title>
              <span>执行时间: {{ formatExecutionTime(executionTime) }}</span>
            </template>
          </el-result>
        </div>

        <el-divider content-position="left">📜 历史记录</el-divider>
        <el-table :data="history" style="width: 100%" size="small" max-height="300">
          <el-table-column prop="expression" label="计算表达式" />
          <el-table-column prop="result" label="结果" width="120" />
          <el-table-column prop="time" label="时间" width="160" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Grid as Calculator } from '@element-plus/icons-vue'
import { calculate } from '@/api'
import AppHeader from '@/components/common/AppHeader.vue'
import { formatExecutionTime } from '@/utils/format'

const formRef = ref()
const form = reactive({
  a: 0,
  b: 0,
  operation: '+'
})

const rules = {
  a: [{ required: true, message: '请输入第一个数', trigger: 'blur' }],
  b: [{ required: true, message: '请输入第二个数', trigger: 'blur' }],
  operation: [{ required: true, message: '请选择操作符', trigger: 'change' }]
}

const result = ref<number | null>(null)
const executionTime = ref(0)
const history = ref<Array<any>>([])
const loading = ref(false)

const handleCalculate = async () => {
  try {
    await formRef.value.validate()

    loading.value = true
    const response = await calculate({ a: form.a, b: form.b, operation: form.operation })
    result.value = response.data.result
    executionTime.value = response.data.execution_time

    history.value.unshift({
      expression: `${form.a} ${form.operation} ${form.b}`,
      result: result.value,
      time: new Date().toLocaleString()
    })

    ElMessage.success('计算成功')
  } catch (error: any) {
    if (error?.response?.data?.detail) {
      ElMessage.error(error.response.data.detail)
    } else {
      ElMessage.error('计算失败，请检查输入')
    }
  } finally {
    loading.value = false
  }
}

const formatResult = (value: number) => {
  if (Number.isInteger(value)) {
    return value.toString()
  }
  return value.toFixed(6)
}
</script>

<style scoped>
.simple-calculate-container {
  min-height: 100vh;
}

.main-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: bold;
}

.result-section {
  margin: 20px 0;
}
</style>
