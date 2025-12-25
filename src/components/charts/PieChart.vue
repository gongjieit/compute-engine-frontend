<template>
  <div ref="chartRef" class="chart-container" :style="{ height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

interface PieData {
  name: string
  value: number
}

interface Props {
  data: PieData[]
  title?: string
  height?: string
  colors?: string[]
  showLegend?: boolean
  donut?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  height: '300px',
  colors: [
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4'
  ],
  showLegend: true,
  donut: false
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
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: props.showLegend
      ? {
          orient: 'vertical',
          left: 'left',
          top: 'middle'
        }
      : undefined,
    series: [
      {
        name: props.title || '分布',
        type: 'pie',
        radius: props.donut ? ['40%', '70%'] : ['0%', '70%'],
        center: props.showLegend ? ['60%', '50%'] : ['50%', '50%'],
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: true,
          formatter: '{b}: {d}%'
        }
      }
    ],
    color: props.colors
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
  () => [props.data, props.title],
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
