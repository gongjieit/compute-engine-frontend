# API 文档

## 后端地址
http://localhost:8000
文档地址：http://localhost:8000/docs
API 地址：http://localhost:8000/api/v1

## 1. 简单计算接口

### 1.1 同步计算接口

**接口地址**：`POST /calculate`

**功能描述**：实时计算接口，支持基本的数学运算（加、减、乘、除）

**请求参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| a | float | 是 | 第一个操作数 |
| b | float | 是 | 第二个操作数 |
| operation | string | 是 | 操作类型：`+`(加)、`-`(减)、`*`(乘)、`/`(除) |

**请求示例**：
```json
{
  "a": 10,
  "b": 5,
  "operation": "+"
}
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| result | float | 计算结果 |
| execution_time | float | 执行时间（秒） |

**响应示例**：
```json
{
  "result": 15.0,
  "execution_time": 0.000123
}
```

---

## 2. 复杂算法接口

### 2.1 平均值计算

**接口地址**：`POST /algorithms/mean`

**功能描述**：计算一组数字的平均值

**请求参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| numbers | array[float] | 是 | 数字列表 |
| values | array[float] | 否 | 数字列表（别名，与 numbers 二选一） |

**请求示例**：
```json
{
  "numbers": [1.0, 2.0, 3.0, 4.0, 5.0]
}
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| result | float | 平均值 |
| execution_time | float | 执行时间（秒） |

**响应示例**：
```json
{
  "result": 3.0,
  "execution_time": 0.0001
}
```

---

### 2.2 方差计算

**接口地址**：`POST /algorithms/variance`

**功能描述**：计算一组数字的方差（至少需要 2 个数字）

**请求参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| numbers | array[float] | 是 | 数字列表（至少 2 个） |
| values | array[float] | 否 | 数字列表（别名，与 numbers 二选一） |

**请求示例**：
```json
{
  "numbers": [1.0, 2.0, 3.0, 4.0, 5.0]
}
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| result | float | 方差值 |
| execution_time | float | 执行时间（秒） |

**响应示例**：
```json
{
  "result": 2.5,
  "execution_time": 0.00015
}
```

---

### 2.3 相关系数计算

**接口地址**：`POST /algorithms/correlation`

**功能描述**：计算两个变量之间的皮尔逊相关系数

**请求参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| x | array[float] | 是 | 第一个变量值列表（至少 2 个） |
| y | array[float] | 是 | 第二个变量值列表（必须与 x 长度相同） |

**请求示例**：
```json
{
  "x": [1.0, 2.0, 3.0, 4.0, 5.0],
  "y": [2.0, 4.0, 6.0, 8.0, 10.0]
}
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| result | float | 相关系数（范围：-1 到 1） |
| execution_time | float | 执行时间（秒） |

**响应示例**：
```json
{
  "result": 1.0,
  "execution_time": 0.0002
}
```

---

### 2.4 斐波那契数列计算

**接口地址**：`POST /algorithms/fibonacci`

**功能描述**：计算第 n 个斐波那契数

**请求参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| n | int | 是 | 非负整数，计算第 n 个斐波那契数 |

**请求示例**：
```json
{
  "n": 10
}
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| result | float | 第 n 个斐波那契数 |
| execution_time | float | 执行时间（秒） |

**响应示例**：
```json
{
  "result": 55.0,
  "execution_time": 0.00005
}
```

---

### 2.5 阶乘计算

**接口地址**：`POST /algorithms/factorial`

**功能描述**：计算 n 的阶乘

**请求参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| n | int | 是 | 非负整数，计算 n 的阶乘 |

**请求示例**：
```json
{
  "n": 5
}
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| result | float | 阶乘结果 |
| execution_time | float | 执行时间（秒） |

**响应示例**：
```json
{
  "result": 120.0,
  "execution_time": 0.00003
}
```

---

### 2.6 最大回撤计算

**接口地址**：`POST /algorithms/max-drawdown`

**功能描述**：计算投资组合的最大回撤

**计算步骤**：
1. 计算每日累计收益率 = (当日收益 / 当日资金) × 100
2. 计算每日累计收益率最大值（截止当日的历史最高点）
3. 计算当日回撤 = 历史最高点 - 当日累计收益率
4. 最大回撤 = 所有回撤中的最大值

**请求参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| daily_data | array[object] | 是 | 每日数据列表 |
| daily_data[].date | string | 是 | 日期（格式：YYYY-MM-DD） |
| daily_data[].total_return | float | 否 | 当日综合收益 |
| daily_data[].total_returns | float | 否 | 当日综合收益（别名） |
| daily_data[].avg_capital | float | 否 | 当日平均资金占用 |
| daily_data[].total_scale | float | 否 | 当日资金规模（别名） |

**请求示例**：
```json
{
  "daily_data": [
    {"date": "2024-01-01", "total_return": 1000.5, "avg_capital": 100000.0},
    {"date": "2024-01-02", "total_return": -500.0, "avg_capital": 100500.0},
    {"date": "2024-01-03", "total_return": 800.0, "avg_capital": 100000.0}
  ]
}
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| result | float | 最大回撤值（百分比） |
| execution_time | float | 执行时间（秒） |

**响应示例**：
```json
{
  "result": 1.4925373134328358,
  "execution_time": 0.001
}
```

---

### 2.7 时间加权收益率计算

**接口地址**：`POST /algorithms/time-weighted-return`

**功能描述**：计算投资组合的时间加权收益率

**计算步骤**：
1. 计算每日单期收益率因子 Ri = 当日资产规模 / (当日资产规模 - 当日净收益)
2. 计算每日对数收益率 Yi = ln(Ri)
3. 按日期累计求和 ΣYi
4. 计算累计时间加权收益率 rtw = exp(ΣYi) - 1

**请求参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| daily_data | array[object] | 是 | 每日数据列表 |
| daily_data[].date | string | 是 | 日期（格式：YYYY-MM-DD） |
| daily_data[].total_scale | float | 否 | 当日资产规模（必须 > 0） |
| daily_data[].total_size | float | 否 | 当日资产规模（别名） |
| daily_data[].total_amount | float | 否 | 当日资产规模（别名） |
| daily_data[].total_return | float | 否 | 当日净收益 |
| daily_data[].return_value | float | 否 | 当日净收益（别名） |
| daily_data[].profit | float | 否 | 当日净收益（别名） |

**请求示例**：
```json
{
  "daily_data": [
    {"date": "2024-01-01", "total_scale": 100000.0, "total_return": 1000.5},
    {"date": "2024-01-02", "total_scale": 101000.5, "total_return": 500.0},
    {"date": "2024-01-03", "total_scale": 101500.5, "total_return": -200.0}
  ]
}
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| result | object | 计算结果对象 |
| result.final_return | float | 最终时间加权收益率 |
| result.daily_cumulative_returns | array | 每日累计时间加权收益率列表 |
| execution_time | float | 执行时间（秒） |

**响应示例**：
```json
{
  "result": {
    "final_return": 0.029804,
    "daily_cumulative_returns": [
      {"date": "2024-01-01", "cumulative_return": 0.0100945},
      {"date": "2024-01-02", "cumulative_return": 0.015017},
      {"date": "2024-01-03", "cumulative_return": 0.029804}
    ]
  },
  "execution_time": 0.002
}
```

---

### 2.8 波动率批量计算

**接口地址**：`POST /algorithms/volatility`

**功能描述**：批量计算多组数据的波动率

**计算步骤**：
1. 计算对数收益率 Yi = ln(1 + Xi)
2. 计算对数收益率总和 ΣYi
3. 计算平均对数收益率 Ya = ΣYi / T
4. 计算收益率离差 Ysi = Yi - Ya
5. 计算收益率离差平方 Yssi = Ysi²
6. 计算收益率离差平方和 ΣYssi
7. 计算样本标准差 S = sqrt(ΣYssi / (T - 1))
8. 计算周期转换因子 P = sqrt(年交易日天数)
9. 计算波动率 σ = S × P

**请求参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| datasets | array[object] | 是 | 多组数据集列表 |
| datasets[].x_values | array[float] | 否 | 收益率列表（至少 2 个） |
| datasets[].returns | array[float] | 否 | 收益率列表（别名） |
| datasets[].values | array[float] | 否 | 收益率列表（别名） |
| datasets[].trading_days_per_year | int | 否 | 年交易日天数，默认 250 |
| default_trading_days_per_year | int | 否 | 默认年交易日天数，默认 250 |

**请求示例**：
```json
{
  "datasets": [
    {"x_values": [0.01, 0.02, -0.01, 0.03]},
    {"x_values": [0.02, 0.03, 0.05], "trading_days_per_year": 252},
    {"x_values": [-0.01, 0.01, 0.02, -0.02, 0.01]}
  ],
  "default_trading_days_per_year": 250
}
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| results | array[object] | 每个数据集的计算结果 |
| results[].index | int | 数据集索引 |
| results[].volatility | float | 波动率 |
| results[].data_points | int | 数据点数量 |
| results[].trading_days_per_year | int | 年交易日天数 |
| total_count | int | 总数据集数量 |
| success_count | int | 成功计算数量 |
| failed_count | int | 失败计算数量 |
| execution_time | float | 总执行时间（秒） |
| errors | array[object] | 失败的错误信息列表 |

**响应示例**：
```json
{
  "results": [
    {"index": 0, "volatility": 0.0185, "data_points": 4, "trading_days_per_year": 250},
    {"index": 1, "volatility": 0.0223, "data_points": 3, "trading_days_per_year": 252},
    {"index": 2, "volatility": 0.0156, "data_points": 5, "trading_days_per_year": 250}
  ],
  "total_count": 3,
  "success_count": 3,
  "failed_count": 0,
  "execution_time": 0.0023,
  "errors": null
}
```

---

## 3. 异步计算接口

### 3.1 波动率异步计算

**接口地址**：`POST /volatility/async`

**功能描述**：创建波动率异步计算任务并返回任务ID

**请求参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| datasets | array[object] | 是 | 多组数据集列表 |
| datasets[].x_values | array[float] | 否 | 收益率列表 |
| datasets[].returns | array[float] | 否 | 收益率列表（别名） |
| datasets[].trading_days_per_year | int | 否 | 年交易日天数 |
| default_trading_days_per_year | int | 否 | 默认年交易日天数，默认 250 |

**请求示例**：
```json
{
  "datasets": [
    {"x_values": [0.01, 0.02, -0.01, 0.03]},
    {"x_values": [0.02, 0.03, 0.05]}
  ],
  "default_trading_days_per_year": 250
}
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| task_id | string | 任务ID |
| status | string | 任务状态 |
| message | string | 响应消息 |
| created_at | string | 任务创建时间 |
| links | object | 相关链接 |
| links.status | string | 查询任务状态链接 |
| links.record | string | 查询任务详细记录链接 |

**响应示例**：
```json
{
  "task_id": "65535f38-2d01-4c1d-bc79-7b5c98b6a2c4",
  "status": "PENDING",
  "message": "波动率异步计算任务已创建",
  "created_at": "2024-01-01T10:30:00",
  "links": {
    "status": "/task/65535f38-2d01-4c1d-bc79-7b5c98b6a2c4",
    "record": "/tasks/65535f38-2d01-4c1d-bc79-7b5c98b6a2c4/record"
  }
}
```

---

## 4. 任务管理接口

### 4.1 查询异步任务状态

**接口地址**：`GET /task/{task_id}`

**功能描述**：获取异步任务状态

**路径参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| task_id | string | 是 | 任务ID |

**响应示例**（任务成功）：
```json
{
  "task_id": "65535f38-2d01-4c1d-bc79-7b5c98b6a2c4",
  "status": "SUCCESS",
  "result": 15.0,
  "message": "任务执行成功",
  "links": {
    "record": "/tasks/65535f38-2d01-4c1d-bc79-7b5c98b6a2c4/record"
  }
}
```

**响应示例**（任务失败）：
```json
{
  "task_id": "65535f38-2d01-4c1d-bc79-7b5c98b6a2c4",
  "status": "FAILURE",
  "error": "错误详情",
  "message": "任务执行失败",
  "links": {
    "record": "/tasks/65535f38-2d01-4c1d-bc79-7b5c98b6a2c4/record"
  }
}
```

**响应示例**（任务等待中）：
```json
{
  "task_id": "65535f38-2d01-4c1d-bc79-7b5c98b6a2c4",
  "status": "PENDING",
  "message": "任务等待执行",
  "links": {
    "record": "/tasks/65535f38-2d01-4c1d-bc79-7b5c98b6a2c4/record"
  }
}
```

---

### 4.2 获取任务记录列表（分页）

**接口地址**：`GET /tasks/records`

**功能描述**：获取任务记录列表，支持多种过滤条件和分页

**查询参数**：

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| algorithm | string | 否 | - | 算法类型过滤 |
| status | string | 否 | - | 任务状态过滤（PENDING、STARTED、SUCCESS、FAILURE、RETRY、REVOKED） |
| start_date | string | 否 | - | 开始日期，格式：YYYY-MM-DD |
| end_date | string | 否 | - | 结束日期，格式：YYYY-MM-DD |
| page | int | 否 | 1 | 页码，最小值为 1 |
| page_size | int | 否 | 20 | 每页数量，范围：1-100 |

**请求示例**：
```
GET /tasks/records?algorithm=mean&status=SUCCESS&start_date=2024-01-01&end_date=2024-01-31&page=1&page_size=20
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| code | int | 状态码 |
| message | string | 响应消息 |
| data.records | array | 任务记录列表 |
| data.total | int | 总记录数 |
| data.page | int | 当前页码 |
| data.page_size | int | 每页数量 |
| data.total_pages | int | 总页数 |

**响应示例**：
```json
{
  "code": 200,
  "message": "获取任务记录成功",
  "data": {
    "records": [
      {
        "id": 1,
        "task_id": "abc-123",
        "task_name": "async_compute",
        "algorithm": "mean",
        "status": "SUCCESS",
        "result": 3.0,
        "execution_time": 0.123,
        "created_at": "2024-01-23T10:00:00"
      }
    ],
    "total": 100,
    "page": 1,
    "page_size": 20,
    "total_pages": 5
  }
}
```

---

### 4.3 获取任务详细记录

**接口地址**：`GET /tasks/{task_id}/record`

**功能描述**：获取单个任务的详细记录

**路径参数**：

| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| task_id | string | 是 | 任务ID |

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| code | int | 状态码 |
| message | string | 响应消息 |
| data | object | 任务详细记录 |

**响应示例**：
```json
{
  "code": 200,
  "message": "获取任务记录成功",
  "data": {
    "id": 1,
    "task_id": "abc-123",
    "task_name": "async_compute",
    "algorithm": "mean",
    "status": "SUCCESS",
    "result": 3.0,
    "error_message": null,
    "execution_time": 0.123,
    "start_time": "2024-01-23T10:00:00",
    "end_time": "2024-01-23T10:00:00",
    "created_at": "2024-01-23T10:00:00",
    "updated_at": "2024-01-23T10:00:00"
  }
}
```

---

### 4.4 获取任务统计信息

**接口地址**：`GET /tasks/statistics`

**功能描述**：获取任务统计信息，支持按时间范围和算法过滤

**查询参数**：

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| start_date | string | 否 | - | 开始日期，格式：YYYY-MM-DD |
| end_date | string | 否 | - | 结束日期，格式：YYYY-MM-DD |
| algorithm | string | 否 | - | 算法类型过滤 |

**请求示例**：
```
GET /tasks/statistics?start_date=2024-01-01&end_date=2024-01-31&algorithm=mean
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| code | int | 状态码 |
| message | string | 响应消息 |
| data.total_count | int | 总任务数 |
| data.success_count | int | 成功任务数 |
| data.failure_count | int | 失败任务数 |
| data.pending_count | int | 等待中任务数 |
| data.running_count | int | 运行中任务数 |
| data.success_rate | float | 成功率（百分比） |
| data.avg_execution_time | float | 平均执行时间（秒） |
| data.min_execution_time | float | 最小执行时间（秒） |
| data.max_execution_time | float | 最大执行时间（秒） |
| data.algorithm_stats | array | 按算法分组的统计信息 |

**响应示例**：
```json
{
  "code": 200,
  "message": "获取任务统计成功",
  "data": {
    "total_count": 100,
    "success_count": 80,
    "failure_count": 20,
    "pending_count": 0,
    "running_count": 0,
    "success_rate": 80.0,
    "avg_execution_time": 0.25,
    "min_execution_time": 0.01,
    "max_execution_time": 5.0,
    "algorithm_stats": [
      {
        "algorithm": "mean",
        "total_count": 50,
        "success_count": 45,
        "failure_count": 5,
        "success_rate": 90.0,
        "avg_execution_time": 0.15
      }
    ]
  }
}
```

---

### 4.5 获取任务面板数据

**接口地址**：`GET /tasks/dashboard`

**功能描述**：获取任务面板数据，包含最近7天的统计和最近的任务记录

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| code | int | 状态码 |
| message | string | 响应消息 |
| data.statistics | object | 最近7天的统计信息 |
| data.recent_tasks | array | 最近的10条任务记录 |
| data.summary | object | 汇总信息 |
| data.summary.total_tasks | int | 总任务数 |
| data.summary.success_rate | float | 成功率 |
| data.summary.avg_execution_time | float | 平均执行时间 |

**响应示例**：
```json
{
  "code": 200,
  "message": "获取面板数据成功",
  "data": {
    "statistics": {
      "total_count": 100,
      "success_count": 80,
      "success_rate": 80.0
    },
    "recent_tasks": [
      {
        "task_id": "abc-123",
        "algorithm": "mean",
        "status": "SUCCESS",
        "created_at": "2024-01-23T10:00:00"
      }
    ],
    "summary": {
      "total_tasks": 100,
      "success_rate": 80.0,
      "avg_execution_time": 0.25
    }
  }
}
```

---

### 4.6 清理旧任务记录

**接口地址**：`DELETE /tasks/cleanup`

**功能描述**：清理指定天数之前的旧任务记录（只清理已完成的任务）

**查询参数**：

| 参数 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| days | int | 否 | 30 | 保留天数，最小值为 1 |

**请求示例**：
```
DELETE /tasks/cleanup?days=30
```

**响应参数**：

| 参数 | 类型 | 描述 |
|------|------|------|
| code | int | 状态码 |
| message | string | 响应消息 |
| data.deleted_count | int | 删除的记录数 |

**响应示例**：
```json
{
  "code": 200,
  "message": "清理完成，删除了 50 条记录",
  "data": {
    "deleted_count": 50
  }
}
```

---

## 5. 任务状态说明

| 状态 | 描述 |
|------|------|
| PENDING | 任务等待执行 |
| STARTED | 任务已开始执行 |
| RETRY | 任务正在重试 |
| SUCCESS | 任务执行成功 |
| FAILURE | 任务执行失败 |
| REVOKED | 任务已被撤销 |

---

## 6. 错误响应格式

所有接口在发生错误时都会返回以下格式：

```json
{
  "detail": "错误详情信息"
}
```

常见的 HTTP 状态码：
- `200` - 请求成功
- `400` - 请求参数错误
- `404` - 资源不存在
- `500` - 服务器内部错误