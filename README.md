# 计算引擎前端

基于 Vue 3 + TypeScript + Element Plus 构建的高性能计算平台前端。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架 (Composition API)
- **TypeScript** - JavaScript 的超集，提供类型安全
- **Vite** - 下一代前端构建工具
- **Element Plus** - 基于 Vue 3 的组件库
- **Vue Router** - Vue.js 官方路由
- **Pinia** - Vue 3 官方状态管理
- **Axios** - HTTP 客户端
- **ECharts** - 数据可视化图表库

## 项目结构

```
compute-engine-frontend/
├── src/
│   ├── api/                    # API 接口层
│   │   ├── calculate.ts        # 简单计算接口
│   │   ├── algorithms.ts       # 算法接口
│   │   ├── tasks.ts            # 任务管理接口
│   │   ├── types.ts            # TypeScript 类型定义
│   │   └── index.ts
│   ├── components/              # 可复用组件
│   │   ├── common/            # 通用组件
│   │   │   ├── AppHeader.vue   # 页面头部导航
│   │   │   ├── StatCard.vue    # 统计卡片
│   │   │   └── FeatureCard.vue # 功能卡片
│   │   ├── calculator/         # 计算器组件
│   │   │   └── ArrayInputPanel.vue
│   │   ├── charts/            # 图表组件
│   │   │   ├── LineChart.vue   # 折线图
│   │   │   └── PieChart.vue    # 饼图
│   │   └── tasks/             # 任务相关组件
│   │       ├── CreateTaskForm.vue
│   │       └── TaskDetail.vue
│   ├── views/                  # 页面组件
│   │   ├── Home.vue            # 首页
│   │   ├── SimpleCalculate.vue # 简单计算
│   │   ├── StatisticalTools.vue # 统计工具
│   │   ├── MathTools.vue       # 数学工具
│   │   ├── FinancialAnalysis.vue # 金融分析
│   │   ├── TaskCenter.vue      # 任务中心
│   │   └── Dashboard.vue       # 数据面板
│   ├── router/                 # 路由配置
│   │   └── index.ts
│   ├── utils/                  # 工具函数
│   │   ├── request.ts         # Axios 封装
│   │   ├── format.ts          # 格式化工具
│   │   ├── validate.ts        # 验证工具
│   │   └── constants.ts       # 常量定义
│   ├── App.vue
│   └── main.ts
├── public/                    # 静态资源
├── docs/                      # 项目文档
├── .env.development           # 开发环境变量
├── .env.production            # 生产环境变量
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 功能模块

### 1. 首页
- 功能导航和快速入口
- 系统统计数据展示
- 快速操作入口

### 2. 简单计算器
- 基础四则运算（加减乘除）
- 实时计算结果显示
- 历史记录保存

### 3. 统计工具集
- 平均值计算
- 方差计算
- 相关系数计算

### 4. 数学工具
- 斐波那契数列计算
- 阶乘计算

### 5. 金融分析
- 最大回撤计算
- 时间加权收益率计算
- 支持每日数据表格输入

### 6. 任务中心
- 异步任务创建
- 任务状态查询
- 任务记录列表（分页、过滤）
- 任务详情查看
- 清理旧任务功能

### 7. 数据面板
- 任务统计数据
- 任务趋势图表（折线图）
- 算法分布图表（饼图）
- 各算法详细统计表格

## 开发指南

### 环境要求
- Node.js >= 16.x
- npm >= 8.x

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
cd d:/projects/compute-engine-frontend

npm run dev
```
访问 http://localhost:5173

### 生产构建
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

### 代码检查
```bash
npm run lint
```

### 代码格式化
```bash
npm run format
```

## 配置说明

### 环境变量

开发环境 (`.env.development`):
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

生产环境 (`.env.production`):
```env
VITE_API_BASE_URL=/api/v1
```

### API 代理配置

开发环境通过 Vite 代理将 `/api` 请求转发到后端 `http://localhost:8080/api/v1`。

## 后端接口对接

后端服务地址: `http://localhost:8080`
API文档地址: `http://localhost:8080/docs`
API基础路径: `/api/v1`

### 主要接口

| 功能 | 接口地址 | 方法 |
|------|---------|------|
| 简单计算 | `/calculate` | POST |
| 平均值 | `/algorithms/mean` | POST |
| 方差 | `/algorithms/variance` | POST |
| 相关系数 | `/algorithms/correlation` | POST |
| 斐波那契 | `/algorithms/fibonacci` | POST |
| 阶乘 | `/algorithms/factorial` | POST |
| 最大回撤 | `/algorithms/max-drawdown` | POST |
| 时间加权收益率 | `/algorithms/time-weighted-return` | POST |
| 波动率 | `/algorithms/volatility` | POST |
| 创建异步任务 | `/volatility/async` | POST |
| 查询任务状态 | `/task/{task_id}` | GET |
| 任务记录列表 | `/tasks/records` | GET |
| 任务详情 | `/tasks/{task_id}/record` | GET |
| 任务统计 | `/tasks/statistics` | GET |
| 任务面板 | `/tasks/dashboard` | GET |
| 清理旧任务 | `/tasks/cleanup` | DELETE |

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 运行
使用 PowerShell 运行（不会有乱码）
powershell -Command "cd d:/projects/compute-engine-frontend; npm run build"


## 许可证

MIT
