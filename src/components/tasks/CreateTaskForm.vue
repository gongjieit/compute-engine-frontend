<template>
  <div class="create-task-form">
    <el-alert
      title="创建异步波动率计算任务"
      type="info"
      :closable="false"
      style="margin-bottom: 20px"
    />

    <el-form :model="form" label-width="140px">
      <el-form-item label="数据集数量">
        <el-input-number v-model="datasetCount" :min="1" :max="10" @change="updateDatasets" />
      </el-form-item>
    </el-form>

    <div class="datasets-section">
      <div v-for="(dataset, index) in form.datasets" :key="index" class="dataset-item">
        <h4>数据集 {{ index + 1 }}</h4>
        <el-form-item label="收益率数据">
          <el-input
            v-model="dataset.input"
            type="textarea"
            :rows="3"
            placeholder="输入收益率，用逗号分隔，如: 0.01, 0.02, -0.01"
            @input="parseDataset(index)"
          />
        </el-form-item>
        <el-form-item label="年交易日天数">
          <el-input-number
            v-model="dataset.trading_days_per_year"
            :min="1"
            :max="365"
            :default-value="250"
          />
        </el-form-item>
      </div>
    </div>

    <el-form-item label="默认交易日天数">
      <el-input-number v-model="form.default_trading_days_per_year" :min="1" :max="365" />
    </el-form-item>

    <div class="form-actions">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        创建任务
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { createAsyncTask } from '@/api'
import { parseCSVNumbers } from '@/utils/validate'

interface DatasetInput {
  input: string
  x_values: number[]
  trading_days_per_year: number
}

interface Emits {
  (e: 'created'): void
  (e: 'cancel'): void
}

const emit = defineEmits<Emits>()

const datasetCount = ref(2)
const loading = ref(false)

const form = reactive({
  datasets: [] as DatasetInput[],
  default_trading_days_per_year: 250
})

const updateDatasets = () => {
  const currentLength = form.datasets.length
  if (datasetCount.value > currentLength) {
    for (let i = currentLength; i < datasetCount.value; i++) {
      form.datasets.push({
        input: '',
        x_values: [],
        trading_days_per_year: 250
      })
    }
  } else {
    form.datasets = form.datasets.slice(0, datasetCount.value)
  }
}

const parseDataset = (index: number) => {
  const result = parseCSVNumbers(form.datasets[index].input)
  if (!result.error) {
    form.datasets[index].x_values = result.numbers
  }
}

const handleSubmit = async () => {
  const validDatasets = form.datasets.filter((d) => d.x_values.length > 0)
  if (validDatasets.length === 0) {
    ElMessage.warning('请至少输入一个数据集')
    return
  }

  try {
    loading.value = true
    const requestData = {
      datasets: validDatasets.map((d) => ({
        x_values: d.x_values,
        trading_days_per_year: d.trading_days_per_year
      })),
      default_trading_days_per_year: form.default_trading_days_per_year
    }

    await createAsyncTask(requestData)
    emit('created')
  } catch (error) {
    ElMessage.error('创建任务失败')
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}

// 初始化数据集
updateDatasets()
</script>

<style scoped>
.create-task-form {
  padding: 20px 0;
}

.datasets-section {
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.dataset-item {
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 12px;
}

.dataset-item h4 {
  margin: 0 0 12px 0;
  color: #303133;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}
</style>
