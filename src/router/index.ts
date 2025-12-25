import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/simple-calculate',
    name: 'SimpleCalculate',
    component: () => import('@/views/SimpleCalculate.vue')
  },
  {
    path: '/statistical-tools',
    name: 'StatisticalTools',
    component: () => import('@/views/StatisticalTools.vue')
  },
  {
    path: '/math-tools',
    name: 'MathTools',
    component: () => import('@/views/MathTools.vue')
  },
  {
    path: '/financial-analysis',
    name: 'FinancialAnalysis',
    component: () => import('@/views/FinancialAnalysis.vue')
  },
  {
    path: '/task-center',
    name: 'TaskCenter',
    component: () => import('@/views/TaskCenter.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
