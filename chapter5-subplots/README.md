# 第5章 子图绘制 - 数据可视化项目

## 项目简介

本项目是基于"第5章 子图绘制"内容开发的数据可视化网站，专注于多图表布局与子图组合可视化技术。项目提供了强大的子图绘制功能，支持多种布局模式、数据源和图表类型组合，帮助用户创建专业的数据仪表盘和分析报告。

## 功能特性

### 🎯 多布局模式
- **网格布局 (Grid)** - 灵活的行列组合布局
- **水平排列 (Horizontal)** - 并排展示多个图表
- **垂直排列 (Vertical)** - 纵向堆叠显示
- **混合布局 (Mixed)** - 不规则的多尺寸组合

### 📊 丰富的图表类型
- **柱状图** - 数据对比分析
- **折线图** - 趋势变化展示  
- **饼图** - 占比关系可视化
- **散点图** - 数据分布分析
- **面积图** - 累积效果展示
- **雷达图** - 多维度对比
- **仪表盘** - 实时指标监控
- **K线图** - 金融数据展示

### 🎨 预设布局模板
- **仪表盘布局** - 2x3网格，综合数据展示
- **分析对比** - 水平三图，重点对比分析
- **趋势分析** - 垂直三图，时间序列展示
- **对比分析** - 2x2网格，多角度对比

### 💾 多数据源支持
- **工厂生产数据** - 生产量、质量、效率等指标
- **气候环境数据** - 温度、湿度、气压等环境参数
- **销售业绩数据** - 营收、利润、客户等业务指标
- **混合数据集** - 多种类型数据的组合展示

### 🔄 图表同步功能
- **无同步** - 各图表独立操作
- **X轴同步** - 横轴联动缩放
- **Y轴同步** - 纵轴联动缩放
- **双向同步** - 完全联动控制

### 🎨 主题与样式
- **默认主题** - 清新蓝绿色系
- **深色主题** - 专业深色配色
- **复古主题** - 怀旧暖色调
- **马卡龙主题** - 活泼色彩搭配

## 项目结构

```
chapter5-subplots/
├── index.html              # 入口页面，包含所有可视化容器
├── css/                    # 样式文件目录
│   └── style.css          # 主样式文件，包含响应式设计和布局系统
├── js/                     # JavaScript脚本目录
│   └── app.js             # 核心逻辑文件，包含子图管理和交互控制
├── data/                   # 数据文件目录
│   ├── factory_data.csv   # 工厂生产数据（CSV格式）
│   └── climate_data.json  # 气候环境数据（JSON格式）
└── README.md              # 项目说明文档
```

## 技术栈

### 前端框架
- **HTML5** - 语义化页面结构
- **CSS3** - 现代样式设计，Grid/Flexbox布局
- **JavaScript ES6+** - 核心交互逻辑

### 图表库
- **ECharts v5.4.3** - 主要图表渲染引擎
- **多图表联动** - 自定义同步机制

### 设计特点
- **响应式设计** - 适配桌面和移动设备
- **模块化架构** - 清晰的代码组织结构
- **动态布局** - 运行时布局调整
- **性能优化** - 高效的图表渲染和管理

## 使用指南

### 快速开始

1. **打开网页**
   ```
   直接在浏览器中打开 index.html 文件
   ```

2. **选择布局类型**
   - 在控制面板中选择布局模式
   - 设置行列数（网格布局时）
   - 点击"生成布局"按钮

3. **应用数据源**
   - 选择合适的数据源
   - 系统自动应用数据到各图表

4. **使用预设模板**
   - 在预设面板中选择布局模板
   - 快速生成专业布局

### 布局配置

#### 网格布局
```javascript
// 配置参数
layoutType: 'grid',
rows: 2,        // 行数 (1-4)
cols: 2,        // 列数 (1-4)
totalCharts: 4  // 总图表数 = rows × cols
```

#### 水平布局
```javascript
// 配置参数
layoutType: 'horizontal',
cols: 3,        // 并排图表数
chartTypes: ['bar', 'line', 'area']
```

#### 垂直布局
```javascript
// 配置参数
layoutType: 'vertical',
rows: 3,        // 垂直堆叠数
chartTypes: ['line', 'area', 'candlestick']
```

### 数据格式

#### CSV格式（工厂数据）
```csv
部门,产量,质量分数,效率,成本,合格率
生产一部,4500,92,85,120000,95.5
生产二部,3800,88,82,98000,94.2
```

#### JSON格式（气候数据）
```json
{
  "hourly": [
    {"time": "00:00", "temperature": 22.5, "humidity": 65, "pressure": 1013},
    {"time": "01:00", "temperature": 22.1, "humidity": 67, "pressure": 1012}
  ]
}
```

### 高级功能

#### 图表同步
```javascript
// 设置同步模式
document.getElementById('syncMode').value = 'x-axis';
updateSyncMode();  // 应用同步设置
```

#### 主题切换
```javascript
// 应用主题
applyColorTheme('dark');  // 可选: default, dark, vintage, macarons
```

#### 导出功能
```javascript
// 导出单个图表
exportChart(chartIndex);

// 导出所有图表
exportAllCharts();
```

## 布局系统详解

### CSS Grid布局
```css
/* 2x2网格 */
.layout-grid-2x2 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}

/* 3x3网格 */
.layout-grid-3x3 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
}

/* 混合布局 */
.layout-mixed {
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}
```

### 响应式断点
- **桌面端** (>1200px) - 完整功能布局
- **平板端** (768px-1200px) - 适度简化布局
- **手机端** (<768px) - 单列垂直布局

## 预设模板详解

### 仪表盘布局
- **布局**: 2x3网格
- **图表**: 柱状图 + 折线图 + 饼图 + 仪表盘 + 面积图 + 散点图
- **适用**: 综合数据监控面板

### 分析对比
- **布局**: 水平三图
- **图表**: 柱状图 + 折线图 + 面积图
- **适用**: 多维度对比分析

### 趋势分析
- **布局**: 垂直三图
- **图表**: 折线图 + 面积图 + K线图
- **适用**: 时间序列分析

### 对比分析
- **布局**: 2x2网格
- **图表**: 柱状图 + 雷达图 + 饼图 + 散点图
- **适用**: 多角度对比展示

## 性能优化

### 图表渲染优化
```javascript
// 延迟渲染策略
setTimeout(() => {
    const chart = echarts.init(chartDom);
    chart.setOption(option);
}, 50);

// 防抖处理
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        chartInstances.forEach(({instance}) => {
            instance.resize();
        });
    }, 200);
});
```

### 内存管理
```javascript
// 销毁图表实例
function destroyAllCharts() {
    chartInstances.forEach(({instance}) => {
        instance.dispose();
    });
    chartInstances = [];
}
```

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ IE 11 (部分功能)

## 开发说明

### 核心模块

1. **布局管理模块** (`generateLayout`)
   - 动态创建子图容器
   - 应用CSS Grid/Flexbox布局
   - 响应式布局切换

2. **图表管理模块** (`createSubplot`)
   - 图表实例创建和管理
   - 图表类型分配
   - 生命周期控制

3. **数据处理模块** (`getChartOption`)
   - 多数据源适配
   - 图表配置生成
   - 数据格式转换

4. **交互控制模块** (`setupEventListeners`)
   - 用户操作响应
   - 图表同步控制
   - 主题切换

### 自定义扩展

#### 添加新布局类型
```javascript
// 在generateLayout函数中添加新的布局逻辑
if (layoutType === 'yourLayout') {
    container.classList.add('layout-your');
    container.style.gridTemplateColumns = '...';
    // 其他布局设置
}
```

#### 添加新图表类型
```javascript
// 在getChartOption函数中添加新的图表类型
case 'yourChartType':
    return {
        // 图表配置
    };
```

#### 添加新数据源
```javascript
// 在dataSources对象中添加新数据源
yourData: {
    name: '你的数据源',
    description: '数据描述',
    data: null
}
```

## 常见问题

### Q: 图表不显示怎么办？
A: 检查以下几点：
- 确保ECharts库正确加载
- 检查容器元素是否存在
- 验证数据格式是否正确
- 查看浏览器控制台错误信息

### Q: 如何自定义布局比例？
A: 修改CSS中的Grid模板：
```css
/* 自定义比例 */
.custom-layout {
    grid-template-columns: 2fr 1fr 1fr; /* 2:1:1比例 */
    grid-template-rows: 1fr 2fr;       /* 1:2比例 */
}
```

### Q: 如何实现图表间的联动？
A: 使用ECharts的联动API：
```javascript
// 设置分组联动
myChart.group = 'group1';
myChart2.group = 'group1';
echarts.connect('group1');
```

## 更新日志

### v1.0.0 (2024-12-06)
- ✨ 初始版本发布
- 🎯 支持4种布局模式
- 📊 集成8种图表类型
- 🎨 提供4种预设模板
- 💾 支持多数据源
- 🔄 实现图表同步功能
- 🎨 多主题配色方案
- 📱 完整响应式支持

## 贡献指南

欢迎提交Issue和Pull Request来改进项目！

### 开发环境设置
1. 克隆项目到本地
2. 使用现代浏览器打开 `index.html`
3. 开始开发测试

### 代码规范
- 使用ES6+语法
- 遵循语义化HTML
- 采用BEM命名规范
- 添加必要注释

## 许可证

MIT License

## 联系方式

如有问题或建议，请通过以下方式联系：
- 项目Issues页面
- 邮箱联系

---

**第5章 子图绘制项目** - 让数据可视化更专业！ 📊✨