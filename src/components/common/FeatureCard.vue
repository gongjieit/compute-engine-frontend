<template>
  <el-card class="feature-card" shadow="hover" @click="navigate">
    <div class="feature-content">
      <div class="feature-icon">{{ icon }}</div>
      <h3 class="feature-title">{{ title }}</h3>
      <p class="feature-description">{{ description }}</p>
      <el-button type="primary" plain class="feature-button">
        <el-icon><ArrowRight /></el-icon>
        进入
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

interface Props {
  icon: string
  title: string
  description: string
  route: string
}

const props = defineProps<Props>()

const router = useRouter()

const navigate = () => {
  router.push(props.route)
}
</script>

<style scoped>
.feature-card {
  cursor: pointer;
  transition: transform 0.3s;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-8px);
}

.feature-content {
  text-align: center;
  padding: 20px;
}

.feature-icon {
  font-size: 56px;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 20px;
  margin: 12px 0;
  color: #303133;
}

.feature-description {
  color: #909399;
  margin-bottom: 20px;
  min-height: 40px;
}

.feature-button {
  margin-top: 8px;
}
</style>
