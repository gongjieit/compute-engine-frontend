<template>
  <div ref="chartRef" class="chart-container" :style="{ height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

interface Props {
  data: number[]
  xAxis: string[]
  title?: string
  height?: string
  color?: string
  smooth?: boolean
  showArea?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  height: '300px',
  color: '#409eff',
  smooth: true,
  showArea: true
})

const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chart) return

  const option: EChartsOption = {
    title: {
      text: props.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const param = params[0]
        return `${param.name}<br/>${param.seriesName}: ${param.value}`
      }
    },
    xAxis: {
      type: 'category',
      data: props.xAxis,
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      }
    },
    series: [
      {
        name: props.title || '数据',
        type: 'line',
        data: props.data,
        smooth: props.smooth,
        itemStyle: {
          color: props.color
        },
        lineStyle: {
          width: 2
        },
        ...(props.showArea && {
          areaStyle: {
            opacity: 0.2,
            color: props.color
          }
        }),
        emphasis: {
          focus: 'series'
        }
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    }
  }

  chart.setOption(option)
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', () => chart?.resize())
})

onUnmounted(() => {
  window.removeEventListener('resize', () => chart?.resize())
  chart?.dispose()
})

watch(
  () => [props.data, props.xAxis, props.title],
  () => {
    updateChart()
  },
  { deep: true }
)
</script>

<style scoped>
.chart-container {
  width: 100%;
}
</style>
