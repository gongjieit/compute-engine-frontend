<template>
  <el-card class="stat-card" shadow="hover">
    <div class="stat-content">
      <div class="stat-icon" :style="{ backgroundColor: `${iconColor}20`, color: iconColor }">
        <el-icon :size="24">
          <component :is="iconComponent" />
        </el-icon>
      </div>
      <div class="stat-info">
        <div class="stat-value">{{ formattedValue }}{{ unit }}</div>
        <div class="stat-title">{{ title }}</div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Document,
  CircleCheck,
  Timer,
  CircleClose,
  TrendCharts,
  DataAnalysis
} from '@element-plus/icons-vue'

interface Props {
  title: string
  value: number | string
  unit?: string
  icon?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  unit: '',
  icon: 'Document',
  color: '#409eff'
})

const iconComponent = computed(() => {
  const iconMap: Record<string, any> = {
    Document,
    CircleCheck,
    Timer,
    CircleClose,
    TrendCharts,
    DataAnalysis
  }
  return iconMap[props.icon] || Document
})

const iconColor = computed(() => props.color)

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})
</script>

<style scoped>
.stat-card {
  height: 100%;
}

.stat-card :deep(.el-card__body) {
  padding: 20px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  line-height: 1.2;
}

.stat-title {
  font-size: 14px;
  color: #909399;
  margin-top: 4px;
}
</style>
