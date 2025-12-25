<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo" @click="navigateTo('/')">
        <span class="logo-icon">🎯</span>
        <span class="logo-text">计算引擎</span>
      </div>

      <nav class="desktop-nav">
        <el-menu :default-active="currentPath" mode="horizontal" :ellipsis="false">
          <el-menu-item index="/" @click="navigateTo('/')">首页</el-menu-item>
          <el-menu-item index="/simple-calculate" @click="navigateTo('/simple-calculate')"
            >简单计算</el-menu-item
          >
          <el-menu-item index="/statistical-tools" @click="navigateTo('/statistical-tools')"
            >统计工具</el-menu-item
          >
          <el-menu-item index="/math-tools" @click="navigateTo('/math-tools')">数学工具</el-menu-item>
          <el-menu-item index="/financial-analysis" @click="navigateTo('/financial-analysis')"
            >金融分析</el-menu-item
          >
          <el-menu-item index="/task-center" @click="navigateTo('/task-center')">任务中心</el-menu-item>
          <el-menu-item index="/dashboard" @click="navigateTo('/dashboard')">数据面板</el-menu-item>
        </el-menu>
      </nav>

      <div class="header-actions">
        <a href="http://localhost:8000/docs" target="_blank" class="docs-link">
          <el-button type="primary" plain>
            <el-icon><Document /></el-icon>
            API文档
          </el-button>
        </a>
        <el-button class="mobile-menu-btn" @click="mobileMenuVisible = !mobileMenuVisible">
          <el-icon><Menu /></el-icon>
        </el-button>
      </div>
    </div>

    <el-drawer v-model="mobileMenuVisible" direction="rtl" size="70%" title="导航菜单">
      <el-menu @select="handleMobileMenuSelect">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/simple-calculate">简单计算</el-menu-item>
        <el-menu-item index="/statistical-tools">统计工具</el-menu-item>
        <el-menu-item index="/math-tools">数学工具</el-menu-item>
        <el-menu-item index="/financial-analysis">金融分析</el-menu-item>
        <el-menu-item index="/task-center">任务中心</el-menu-item>
        <el-menu-item index="/dashboard">数据面板</el-menu-item>
      </el-menu>
    </el-drawer>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const mobileMenuVisible = ref(false)
const currentPath = computed(() => route.path)

const navigateTo = (path: string) => {
  router.push(path)
}

const handleMobileMenuSelect = (index: string) => {
  navigateTo(index)
  mobileMenuVisible.value = false
}
</script>

<style scoped>
.app-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  color: #303133;
}

.desktop-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.docs-link {
  text-decoration: none;
}

.mobile-menu-btn {
  display: none;
}

@media (max-width: 1024px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>
