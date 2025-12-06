// 全局变量
let mainChart = null;
let currentData = [];
let currentChartType = 'bar';
let currentColorScheme = 'default';

// 优化配色方案定义
const colorSchemes = {
    default: ['#667eea', '#764ba2', '#f093fb', '#c471f5', '#fa709a', '#fee140', '#30cfd0', '#330867'],
    ocean: ['#2E3192', '#1BFFFF', '#00D4FF', '#0099CC', '#00557F', '#003D5C', '#002635', '#001219'],
    sunset: ['#FF6B6B', '#FFA07A', '#FFD700', '#FF8C00', '#FF6347', '#FF4500', '#DC143C', '#8B0000'],
    forest: ['#228B22', '#32CD32', '#00FF00', '#7CFC00', '#ADFF2F', '#9ACD32', '#6B8E23', '#556B2F'],
    rainbow: ['#FF1493', '#FF69B4', '#FFB6C1', '#FFA500', '#FFD700', '#ADFF2F', '#00CED1', '#9370DB'],
    monochrome: ['#2C3E50', '#34495E', '#7F8C8D', '#95A5A6', '#BDC3C7', '#ECF0F1', '#D5DBDB', '#ABB2B9']
};

// 样式预设配置
const stylePresets = {
    business: {
        chartType: 'bar',
        colorScheme: 'monochrome',
        animation: 'fade',
        gridLines: true,
        dataLabels: false,
        title: '商业智能分析'
    },
    creative: {
        chartType: 'pie',
        colorScheme: 'rainbow',
        animation: 'bounce',
        gridLines: false,
        dataLabels: true,
        title: '创意数据展示'
    },
    academic: {
        chartType: 'line',
        colorScheme: 'ocean',
        animation: 'fade',
        gridLines: true,
        dataLabels: false,
        title: '学术研究数据'
    },
    tech: {
        chartType: 'area',
        colorScheme: 'sunset',
        animation: 'slide',
        gridLines: true,
        dataLabels: true,
        title: '科技趋势分析'
    }
};

// 美观数据集设计
const dataSets = {
    revenue: {
        title: '收入增长分析',
        data: [
            { name: "2019", value: 2450, category: "年收入" },
            { name: "2020", value: 3120, category: "年收入" },
            { name: "2021", value: 3890, category: "年收入" },
            { name: "2022", value: 4670, category: "年收入" },
            { name: "2023", value: 5890, category: "年收入" },
            { name: "2019", value: 1890, category: "净利润" },
            { name: "2020", value: 2340, category: "净利润" },
            { name: "2021", value: 2980, category: "净利润" },
            { name: "2022", value: 3450, category: "净利润" },
            { name: "2023", value: 4230, category: "净利润" }
        ]
    },
    market: {
        title: '市场份额分布',
        data: [
            { name: "科技", value: 38.5, category: "市场份额" },
            { name: "金融", value: 24.2, category: "市场份额" },
            { name: "医疗", value: 18.7, category: "市场份额" },
            { name: "零售", value: 12.3, category: "市场份额" },
            { name: "其他", value: 6.3, category: "市场份额" }
        ]
    },
    performance: {
        title: '绩效指标评估',
        data: [
            { name: "Q1", value: 92, category: "客户满意度" },
            { name: "Q2", value: 88, category: "客户满意度" },
            { name: "Q3", value: 94, category: "客户满意度" },
            { name: "Q4", value: 96, category: "客户满意度" },
            { name: "Q1", value: 85, category: "运营效率" },
            { name: "Q2", value: 89, category: "运营效率" },
            { name: "Q3", value: 91, category: "运营效率" },
            { name: "Q4", value: 93, category: "运营效率" },
            { name: "Q1", value: 78, category: "创新能力" },
            { name: "Q2", value: 82, category: "创新能力" },
            { name: "Q3", value: 87, category: "创新能力" },
            { name: "Q4", value: 90, category: "创新能力" }
        ]
    },
    products: {
        title: '产品销售对比',
        data: [
            { name: "智能手机", value: 15600, category: "销量" },
            { name: "笔记本电脑", value: 8900, category: "销量" },
            { name: "平板电脑", value: 6700, category: "销量" },
            { name: "智能手表", value: 4500, category: "销量" },
            { name: "耳机音响", value: 3200, category: "销量" },
            { name: "智能手机", value: 4580, category: "营收" },
            { name: "笔记本电脑", value: 6230, category: "营收" },
            { name: "平板电脑", value: 2890, category: "营收" },
            { name: "智能手表", value: 1350, category: "营收" },
            { name: "耳机音响", value: 680, category: "营收" }
        ]
    },
    satisfaction: {
        title: '用户满意度调查',
        data: [
            { name: "产品质量", value: 4.2, category: "评分" },
            { name: "客户服务", value: 3.8, category: "评分" },
            { name: "价格合理性", value: 3.5, category: "评分" },
            { name: "用户体验", value: 4.5, category: "评分" },
            { name: "品牌信任", value: 4.1, category: "评分" },
            { name: "推荐意愿", value: 3.9, category: "评分" }
        ]
    }
};

// 默认美观基础数据
const basicData = [
    { name: "一月", value: 1250, category: "销售额" },
    { name: "二月", value: 1890, category: "销售额" },
    { name: "三月", value: 2340, category: "销售额" },
    { name: "四月", value: 2890, category: "销售额" },
    { name: "五月", value: 3450, category: "销售额" },
    { name: "六月", value: 4120, category: "销售额" },
    { name: "一月", value: 890, category: "成本" },
    { name: "二月", value: 1020, category: "成本" },
    { name: "三月", value: 1180, category: "成本" },
    { name: "四月", value: 1350, category: "成本" },
    { name: "五月", value: 1520, category: "成本" },
    { name: "六月", value: 1780, category: "成本" }
];

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    initializeChart();
    loadBasicData();
    setupEventListeners();
});

// 初始化主图表
function initializeChart() {
    const mainChartDom = document.getElementById('mainChart');
    if (mainChartDom) {
        mainChart = echarts.init(mainChartDom);
        
        // 响应式处理
        window.addEventListener('resize', function() {
            if (mainChart) mainChart.resize();
        });
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 应用样式按钮
    const applyStylesBtn = document.getElementById('applyStyles');
    if (applyStylesBtn) {
        applyStylesBtn.addEventListener('click', applyStyles);
    }

    // 图表类型改变
    const chartTypeSelect = document.getElementById('chartType');
    if (chartTypeSelect) {
        chartTypeSelect.addEventListener('change', function() {
            currentChartType = this.value;
            updateChart();
        });
    }

    // 配色方案改变
    const colorSchemeSelect = document.getElementById('colorScheme');
    if (colorSchemeSelect) {
        colorSchemeSelect.addEventListener('change', function() {
            currentColorScheme = this.value;
            updateChart();
        });
    }

    // 动画效果改变
    const animationSelect = document.getElementById('animation');
    if (animationSelect) {
        animationSelect.addEventListener('change', updateChart);
    }

    // 网格线改变
    const gridLinesCheckbox = document.getElementById('gridLines');
    if (gridLinesCheckbox) {
        gridLinesCheckbox.addEventListener('change', updateChart);
    }

    // 数据标签改变
    const dataLabelsCheckbox = document.getElementById('dataLabels');
    if (dataLabelsCheckbox) {
        dataLabelsCheckbox.addEventListener('change', updateChart);
    }

    // 字体设置改变
    const fontFamilySelect = document.getElementById('fontFamily');
    if (fontFamilySelect) {
        fontFamilySelect.addEventListener('change', function() {
            updateFontFamily(this.value);
        });
    }

    // 字体大小改变
    const fontSizeSelect = document.getElementById('fontSize');
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', function() {
            updateFontSize(this.value);
        });
    }
}

// 加载基础数据
function loadBasicData() {
    currentData = [...basicData];
    
    // 更新图表标题
    const chartTitle = document.getElementById('chartTitle');
    if (chartTitle) {
        chartTitle.textContent = '月度财务数据分析';
    }

    updateChart();
}

// 加载数据集
function loadDataSet(dataSetName) {
    const dataSet = dataSets[dataSetName];
    if (!dataSet) {
        showMessage('数据集不存在', 'error');
        return;
    }

    currentData = dataSet.data;
    
    // 更新按钮状态
    const buttons = document.querySelectorAll('.data-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }

    // 更新图表标题
    const chartTitle = document.getElementById('chartTitle');
    if (chartTitle) {
        chartTitle.textContent = dataSet.title;
    }

    updateChart();
    showMessage(`已加载${dataSet.title}`, 'success');
}

// 数据处理函数 - 确保数据对应正确
function processDataForMultiSeries(data, categories, names) {
    const result = {};
    
    // 初始化数据结构
    categories.forEach(category => {
        result[category] = [];
        names.forEach(name => {
            result[category].push(null);
        });
    });
    
    // 填充数据
    data.forEach(item => {
        const nameIndex = names.indexOf(item.name);
        if (nameIndex !== -1 && result[item.category]) {
            result[item.category][nameIndex] = item.value;
        }
    });
    
    return result;
}

// 获取图表配置选项
function getChartOptions(chartType, colorScheme, animation, gridLines, dataLabels) {
    const colors = colorSchemes[colorScheme] || colorSchemes.default;
    const categories = [...new Set(currentData.map(item => item.category))];
    const names = [...new Set(currentData.map(item => item.name))].sort();

    // 动画配置
    let animationConfig = {
        animation: animation !== 'none',
        animationDuration: animation === 'bounce' ? 1800 : 1200,
        animationEasing: getAnimationEasing(animation),
        animationDelay: function (idx) {
            return animation === 'slide' ? idx * 150 : 0;
        }
    };

    // 基础配置
    const baseOptions = {
        color: colors,
        tooltip: {
            trigger: chartType === 'pie' ? 'item' : 'axis',
            formatter: function(params) {
                if (chartType === 'pie') {
                    return `<div style="padding: 8px;">
                        <strong>${params.name}</strong><br/>
                        数值: <span style="color: ${params.color}; font-weight: bold;">${params.value}</span><br/>
                        占比: <span style="color: ${params.color}; font-weight: bold;">${params.percent}%</span>
                    </div>`;
                }
                if (Array.isArray(params)) {
                    return `<div style="padding: 8px;">
                        <strong>${params[0].name}</strong><br/>
                        ${params.map(p => `${p.marker}${p.seriesName}: <span style="color: ${p.color}; font-weight: bold;">${p.value.toLocaleString()}</span>`).join('<br/>')}
                    </div>`;
                }
                return `<div style="padding: 8px;">
                    <strong>${params.name}</strong><br/>
                    数值: <span style="color: ${params.color}; font-weight: bold;">${params.value.toLocaleString()}</span>
                </div>`;
            },
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            borderColor: colors[0],
            borderWidth: 1,
            textStyle: {
                color: '#fff',
                fontSize: 13
            },
            extraCssText: 'border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);'
        },
        ...animationConfig
    };

    // 根据图表类型返回不同配置
    switch(chartType) {
        case 'bar':
            const barData = processDataForMultiSeries(currentData, categories, names);
            return {
                ...baseOptions,
                title: {
                    text: '',
                    left: 'center',
                    top: '2%',
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#2c3e50'
                    }
                },
                legend: {
                    data: categories,
                    bottom: '5%',
                    textStyle: { color: '#666', fontSize: 13 },
                    itemGap: 25
                },
                grid: {
                    top: '15%',
                    left: '8%',
                    right: '8%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: names,
                    axisLabel: { 
                        rotate: 0,
                        color: '#666',
                        fontSize: 12,
                        interval: 0,
                        margin: 15,
                        fontWeight: 500
                    },
                    axisLine: { 
                        lineStyle: { 
                            color: '#ddd',
                            width: 2
                        } 
                    },
                    axisTick: { 
                        alignWithLabel: true,
                        lineStyle: {
                            color: '#ddd'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { 
                        show: gridLines,
                        lineStyle: { 
                            color: '#f0f0f0', 
                            type: 'dashed',
                            width: 1
                        }
                    },
                    axisLine: { 
                        lineStyle: { 
                            color: '#ddd',
                            width: 2
                        } 
                    },
                    axisLabel: { 
                        color: '#666', 
                        fontSize: 12,
                        formatter: function(value) {
                            return value >= 1000 ? (value/1000).toFixed(1) + 'K' : value;
                        }
                    }
                },
                series: categories.map((category, index) => ({
                    name: category,
                    type: 'bar',
                    data: barData[category],
                    label: {
                        show: dataLabels,
                        position: 'top',
                        color: '#333',
                        fontSize: 11,
                        fontWeight: 'bold',
                        formatter: '{c}',
                        distance: 10
                    },
                    itemStyle: {
                        borderRadius: [6, 6, 0, 0],
                        borderWidth: 0,
                        emphasis: {
                            shadowBlur: 15,
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowOffsetY: 3
                        }
                    },
                    barWidth: categories.length > 1 ? '35%' : '50%',
                    barGap: '25%'
                }))
            };

        case 'line':
            const lineData = processDataForMultiSeries(currentData, categories, names);
            return {
                ...baseOptions,
                title: {
                    text: '',
                    left: 'center',
                    top: '2%',
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#2c3e50'
                    }
                },
                legend: {
                    data: categories,
                    bottom: '5%',
                    textStyle: { color: '#666', fontSize: 13 },
                    itemGap: 25
                },
                grid: {
                    top: '15%',
                    left: '8%',
                    right: '8%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: names,
                    boundaryGap: false,
                    axisLabel: { 
                        color: '#666',
                        fontSize: 12,
                        interval: 0,
                        margin: 15,
                        fontWeight: 500
                    },
                    axisLine: { 
                        lineStyle: { 
                            color: '#ddd',
                            width: 2
                        } 
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { 
                        show: gridLines,
                        lineStyle: { 
                            color: '#f0f0f0', 
                            type: 'dashed',
                            width: 1
                        }
                    },
                    axisLine: { 
                        lineStyle: { 
                            color: '#ddd',
                            width: 2
                        } 
                    },
                    axisLabel: { 
                        color: '#666', 
                        fontSize: 12,
                        formatter: function(value) {
                            return value >= 1000 ? (value/1000).toFixed(1) + 'K' : value;
                        }
                    }
                },
                series: categories.map((category, index) => ({
                    name: category,
                    type: 'line',
                    data: lineData[category],
                    label: {
                        show: dataLabels,
                        position: 'top',
                        color: colors[index % colors.length],
                        fontSize: 11,
                        fontWeight: 'bold',
                        formatter: '{c}',
                        distance: 10
                    },
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 8,
                    lineStyle: { 
                        width: 3,
                        shadowColor: 'rgba(0,0,0,0.2)',
                        shadowBlur: 4,
                        shadowOffsetY: 2
                    },
                    emphasis: {
                        lineStyle: {
                            width: 5,
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.4)'
                        },
                        symbolSize: 12
                    }
                }))
            };

        case 'pie':
            return {
                ...baseOptions,
                title: {
                    text: '',
                    left: 'center',
                    top: '2%',
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#2c3e50'
                    }
                },
                series: [{
                    name: '数据分布',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '55%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 3,
                        shadowColor: 'rgba(0,0,0,0.2)',
                        shadowBlur: 10,
                        shadowOffsetY: 3
                    },
                    label: {
                        show: dataLabels,
                        formatter: function(params) {
                            return `${params.name}\n${params.value.toLocaleString()}\n${params.percent}%`;
                        },
                        color: '#333',
                        fontSize: 12,
                        fontWeight: 'bold',
                        margin: 15,
                        lineHeight: 16
                    },
                    labelLine: {
                        show: dataLabels,
                        length: 20,
                        length2: 15,
                        lineStyle: {
                            width: 2,
                            color: '#999'
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '14',
                            fontWeight: 'bold'
                        },
                        itemStyle: {
                            shadowBlur: 20,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            borderWidth: 0
                        },
                        scale: true,
                        scaleSize: 5
                    },
                    data: currentData.map(item => ({
                        name: item.name,
                        value: item.value
                    }))
                }]
            };

        case 'scatter':
            const scatterData = processDataForMultiSeries(currentData, categories, names);
            return {
                ...baseOptions,
                title: {
                    text: '',
                    left: 'center',
                    top: '2%',
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#2c3e50'
                    }
                },
                legend: {
                    data: categories,
                    bottom: '5%',
                    textStyle: { color: '#666', fontSize: 13 },
                    itemGap: 25
                },
                grid: {
                    top: '15%',
                    left: '8%',
                    right: '8%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    splitLine: { 
                        show: gridLines,
                        lineStyle: { 
                            color: '#f0f0f0', 
                            type: 'dashed',
                            width: 1
                        }
                    },
                    axisLine: { 
                        lineStyle: { 
                            color: '#ddd',
                            width: 2
                        } 
                    },
                    axisLabel: { 
                        color: '#666', 
                        fontSize: 12 
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { 
                        show: gridLines,
                        lineStyle: { 
                            color: '#f0f0f0', 
                            type: 'dashed',
                            width: 1
                        }
                    },
                    axisLine: { 
                        lineStyle: { 
                            color: '#ddd',
                            width: 2
                        } 
                    },
                    axisLabel: { 
                        color: '#666', 
                        fontSize: 12 
                    }
                },
                series: categories.map((category, index) => ({
                    name: category,
                    type: 'scatter',
                    data: scatterData[category].map((value, i) => {
                        return value !== null ? [i * 1.5 + Math.random() * 0.5, value] : null;
                    }).filter(item => item !== null),
                    label: {
                        show: dataLabels,
                        position: 'top',
                        color: colors[index % colors.length],
                        fontSize: 10,
                        fontWeight: 'bold',
                        formatter: '{c[1]}',
                        distance: 8
                    },
                    symbolSize: function (data) {
                        return Math.sqrt(Math.abs(data[1])) * 8 + 5;
                    },
                    itemStyle: {
                        opacity: 0.8,
                        borderWidth: 2,
                        borderColor: '#fff',
                        emphasis: {
                            shadowBlur: 15,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                            opacity: 1
                        }
                    }
                }))
            };

        case 'radar':
            const radarData = processDataForMultiSeries(currentData, categories, names);
            return {
                ...baseOptions,
                title: {
                    text: '',
                    left: 'center',
                    top: '2%',
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#2c3e50'
                    }
                },
                legend: {
                    data: categories,
                    bottom: '5%',
                    textStyle: { color: '#666', fontSize: 13 },
                    itemGap: 25
                },
                radar: {
                    indicator: names.map(name => ({
                        name: name,
                        max: Math.max(...currentData.map(d => d.value)) * 1.3,
                        axisLabel: {
                            show: true,
                            fontSize: 11,
                            color: '#666'
                        }
                    })),
                    shape: 'polygon',
                    splitNumber: 5,
                    axisName: { 
                        color: '#666',
                        fontSize: 12,
                        fontWeight: 'bold'
                    },
                    splitLine: { 
                        lineStyle: { 
                            color: '#ddd',
                            width: 1
                        } 
                    },
                    splitArea: {
                        show: gridLines,
                        areaStyle: {
                            color: ['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.05)']
                        }
                    }
                },
                series: [{
                    name: '雷达图数据',
                    type: 'radar',
                    data: categories.map((category, index) => ({
                        name: category,
                        value: radarData[category],
                        areaStyle: { 
                            opacity: 0.3,
                            color: colors[index % colors.length]
                        },
                        lineStyle: { 
                            width: 3,
                            color: colors[index % colors.length]
                        },
                        itemStyle: {
                            color: colors[index % colors.length],
                            borderWidth: 2,
                            borderColor: '#fff'
                        },
                        label: {
                            show: dataLabels,
                            position: 'top',
                            color: '#333',
                            fontSize: 10,
                            fontWeight: 'bold'
                        }
                    }))
                }]
            };

        case 'area':
            const areaData = processDataForMultiSeries(currentData, categories, names);
            return {
                ...baseOptions,
                title: {
                    text: '',
                    left: 'center',
                    top: '2%',
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#2c3e50'
                    }
                },
                legend: {
                    data: categories,
                    bottom: '5%',
                    textStyle: { color: '#666', fontSize: 13 },
                    itemGap: 25
                },
                grid: {
                    top: '15%',
                    left: '8%',
                    right: '8%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: names,
                    boundaryGap: false,
                    axisLabel: { 
                        color: '#666',
                        fontSize: 12,
                        interval: 0,
                        margin: 15,
                        fontWeight: 500
                    },
                    axisLine: { 
                        lineStyle: { 
                            color: '#ddd',
                            width: 2
                        } 
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: { 
                        show: gridLines,
                        lineStyle: { 
                            color: '#f0f0f0', 
                            type: 'dashed',
                            width: 1
                        }
                    },
                    axisLine: { 
                        lineStyle: { 
                            color: '#ddd',
                            width: 2
                        } 
                    },
                    axisLabel: { 
                        color: '#666', 
                        fontSize: 12,
                        formatter: function(value) {
                            return value >= 1000 ? (value/1000).toFixed(1) + 'K' : value;
                        }
                    }
                },
                series: categories.map((category, index) => ({
                    name: category,
                    type: 'line',
                    areaStyle: { 
                        opacity: 0.4,
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, 
                                color: colors[index % colors.length]
                            }, {
                                offset: 1, 
                                color: colors[index % colors.length] + '20'
                            }]
                        }
                    },
                    data: areaData[category],
                    label: {
                        show: dataLabels,
                        position: 'top',
                        color: colors[index % colors.length],
                        fontSize: 11,
                        fontWeight: 'bold',
                        formatter: '{c}',
                        distance: 10
                    },
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 6,
                    lineStyle: { 
                        width: 3,
                        color: colors[index % colors.length]
                    },
                    emphasis: {
                        areaStyle: { 
                            opacity: 0.6
                        },
                        lineStyle: {
                            width: 4,
                            shadowBlur: 8,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        },
                        symbolSize: 10
                    }
                }))
            };

        default:
            return baseOptions;
    }
}

// 获取动画效果
function getAnimationEasing(animation) {
    switch(animation) {
        case 'bounce': return 'elasticOut';
        case 'fade': return 'cubicInOut';
        case 'slide': return 'quartInOut';
        default: return 'linear';
    }
}

// 更新图表
function updateChart() {
    if (!mainChart || !currentData || currentData.length === 0) {
        return;
    }

    const chartType = currentChartType;
    const colorScheme = currentColorScheme;
    const animation = document.getElementById('animation')?.value || 'none';
    const gridLines = document.getElementById('gridLines')?.checked || false;
    const dataLabels = document.getElementById('dataLabels')?.checked || false;

    const options = getChartOptions(chartType, colorScheme, animation, gridLines, dataLabels);
    
    // 清空并重新设置图表
    mainChart.clear();
    mainChart.setOption(options, true);
}

// 应用样式
function applyStyles() {
    const chartType = document.getElementById('chartType').value;
    const colorScheme = document.getElementById('colorScheme').value;
    const animation = document.getElementById('animation').value;
    const gridLines = document.getElementById('gridLines').checked;
    const dataLabels = document.getElementById('dataLabels').checked;

    currentChartType = chartType;
    currentColorScheme = colorScheme;

    updateChart();
    showMessage('样式已应用', 'success');
}

// 应用预设样式
function applyPreset(presetName) {
    const preset = stylePresets[presetName];
    if (!preset) {
        showMessage('预设不存在', 'error');
        return;
    }

    // 更新控件状态
    document.getElementById('chartType').value = preset.chartType;
    document.getElementById('colorScheme').value = preset.colorScheme;
    document.getElementById('animation').value = preset.animation;
    document.getElementById('gridLines').checked = preset.gridLines;
    document.getElementById('dataLabels').checked = preset.dataLabels;

    // 更新当前状态
    currentChartType = preset.chartType;
    currentColorScheme = preset.colorScheme;

    // 更新图表标题
    const chartTitle = document.getElementById('chartTitle');
    if (chartTitle) {
        chartTitle.textContent = preset.title;
    }

    // 应用样式
    applyStyles();
    
    showMessage(`已应用${presetName}预设`, 'success');
}

// 重置图表
function resetChart() {
    loadBasicData();
    
    // 重置控件状态
    document.getElementById('chartType').value = 'bar';
    document.getElementById('colorScheme').value = 'default';
    document.getElementById('animation').value = 'none';
    document.getElementById('gridLines').checked = true;
    document.getElementById('dataLabels').checked = false;
    
    currentChartType = 'bar';
    currentColorScheme = 'default';
    
    updateChart();
    showMessage('图表已重置', 'success');
}

// 导出图表
function exportChart() {
    if (!mainChart) {
        showMessage('图表不存在', 'error');
        return;
    }

    try {
        const url = mainChart.getDataURL({
            type: 'png',
            pixelRatio: 3,
            backgroundColor: '#fff'
        });

        const link = document.createElement('a');
        link.href = url;
        link.download = 'chart_' + new Date().getTime() + '.png';
        link.click();

        showMessage('图表已导出', 'success');
    } catch (error) {
        showMessage('导出失败: ' + error.message, 'error');
    }
}

// 全屏显示
function toggleFullscreen() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;

    if (!document.fullscreenElement) {
        chartContainer.requestFullscreen().then(() => {
            setTimeout(() => {
                if (mainChart) mainChart.resize();
            }, 100);
        });
    } else {
        document.exitFullscreen();
    }
}

// 显示消息
function showMessage(text, type = 'info') {
    // 移除现有消息
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // 创建新消息
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);

    // 3秒后自动移除
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

// 更新字体族
function updateFontFamily(fontFamily) {
    const body = document.body;
    
    // 移除所有字体类
    body.classList.remove('font-inter', 'font-roboto', 'font-opensans', 'font-system', 'font-noto', 'font-lato', 'font-montserrat');
    
    // 添加新字体类
    switch(fontFamily) {
        case 'inter':
            body.classList.add('font-inter');
            break;
        case 'roboto':
            body.classList.add('font-roboto');
            break;
        case 'opensans':
            body.classList.add('font-opensans');
            break;
        case 'system':
            body.classList.add('font-system');
            break;
        case 'noto':
            body.classList.add('font-noto');
            break;
        case 'lato':
            body.classList.add('font-lato');
            break;
        case 'montserrat':
            body.classList.add('font-montserrat');
            break;
        default:
            // 默认字体，移除所有自定义字体类
            break;
    }
    
    // 重新渲染图表以应用新字体
    updateChart();
    showMessage('字体已更新', 'success');
}

// 更新字体大小
function updateFontSize(fontSize) {
    const body = document.body;
    
    // 移除所有字体大小类
    body.classList.remove('font-size-small', 'font-size-medium', 'font-size-large', 'font-size-xlarge');
    
    // 添加新字体大小类
    switch(fontSize) {
        case 'small':
            body.classList.add('font-size-small');
            break;
        case 'large':
            body.classList.add('font-size-large');
            break;
        case 'xlarge':
            body.classList.add('font-size-xlarge');
            break;
        case 'medium':
        default:
            body.classList.add('font-size-medium');
            break;
    }
    
    // 重新渲染图表以应用新字体大小
    setTimeout(() => {
        if (mainChart) {
            mainChart.resize();
        }
    }, 100);
    showMessage('字体大小已更新', 'success');
}

// 导出全局函数供HTML调用
window.applyPreset = applyPreset;
window.loadDataSet = loadDataSet;
window.resetChart = resetChart;
window.exportChart = exportChart;
window.toggleFullscreen = toggleFullscreen;
window.updateFontFamily = updateFontFamily;
window.updateFontSize = updateFontSize;