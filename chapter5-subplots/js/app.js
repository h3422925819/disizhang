// 全局变量
let chartInstances = [];
let currentLayout = 'grid';
let currentRows = 2;
let currentCols = 2;
let currentDataSource = 'factory';
let chartsData = {};

// 布局预设配置
const layoutPresets = {
    dashboard: {
        layout: 'grid',
        rows: 2,
        cols: 3,
        charts: ['bar', 'line', 'pie', 'gauge', 'area', 'scatter'],
        titles: ['生产产量', '质量趋势', '合格率分布', '设备利用率', '成本分析', '质量散点图']
    },
    analysis: {
        layout: 'horizontal',
        rows: 1,
        cols: 3,
        charts: ['bar', 'line', 'area'],
        titles: ['对比分析', '趋势分析', '累计分析']
    },
    trend: {
        layout: 'vertical',
        rows: 3,
        cols: 1,
        charts: ['line', 'area', 'candlestick'],
        titles: ['日趋势', '周趋势', '月趋势']
    },
    comparison: {
        layout: 'grid',
        rows: 2,
        cols: 2,
        charts: ['bar', 'radar', 'pie', 'scatter'],
        titles: ['销量对比', '能力雷达', '市场份额', '价格分布']
    }
};

// 数据源定义
const dataSources = {
    factory: {
        name: '工厂生产数据',
        description: '生产、质量、设备等数据',
        data: null
    },
    climate: {
        name: '气候环境数据',
        description: '温度、湿度、气压等环境指标',
        data: null
    },
    sales: {
        name: '销售业绩数据',
        description: '销售额、客户、产品等销售数据',
        data: null
    },
    mixed: {
        name: '混合数据集',
        description: '多种类型的数据组合',
        data: null
    }
};

// 初始化函数
async function initializeApp() {
    setupEventListeners();
    await loadDataSources(); // 等待数据加载完成
    generateInitialLayout();
}

// 加载数据源
async function loadDataSources() {
    try {
        // 加载工厂数据
        const factoryResponse = await fetch('data/factory_data.csv');
        if (factoryResponse.ok) {
            const factoryText = await factoryResponse.text();
            chartsData.factory = parseCSV(factoryText);
        }
        
        // 加载气候数据
        const climateResponse = await fetch('data/climate_data.json');
        if (climateResponse.ok) {
            chartsData.climate = await climateResponse.json();
        }
        
        // 生成模拟数据（确保所有数据源都有数据）
        if (!chartsData.factory) {
            chartsData.factory = generateFactoryData();
        }
        if (!chartsData.climate) {
            chartsData.climate = generateClimateData();
        }
        if (!chartsData.sales) {
            chartsData.sales = generateSalesData();
        }
        if (!chartsData.mixed) {
            chartsData.mixed = generateMixedData();
        }
        
        console.log('数据加载完成:', Object.keys(chartsData));
        console.log('工厂数据:', chartsData.factory);
        console.log('气候数据:', chartsData.climate);
        console.log('销售数据:', chartsData.sales);
        console.log('混合数据:', chartsData.mixed);
    } catch (error) {
        console.error('数据加载失败:', error);
        // 使用模拟数据作为备用
        chartsData.factory = generateFactoryData();
        chartsData.climate = generateClimateData();
        chartsData.sales = generateSalesData();
        chartsData.mixed = generateMixedData();
        
    } catch (error) {
        console.error('数据加载失败:', error);
        // 使用模拟数据作为备用
        chartsData.factory = generateFactoryData();
        chartsData.climate = generateClimateData();
        chartsData.sales = generateSalesData();
        chartsData.mixed = generateMixedData();
    }
}

// CSV解析函数
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const row = {};
        headers.forEach((header, index) => {
            row[header] = isNaN(values[index]) ? values[index] : parseFloat(values[index]);
        });
        data.push(row);
    }
    
    return data;
}

// 生成工厂模拟数据
function generateFactoryData() {
    const departments = ['生产一部', '生产二部', '生产三部', '质量部', '包装部'];
    const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
    
    return {
        production: departments.map(dept => ({
            department: dept,
            output: Math.floor(Math.random() * 5000) + 3000,
            quality: Math.floor(Math.random() * 100) + 85,
            efficiency: Math.floor(Math.random() * 30) + 70
        })),
        monthly: months.map(month => ({
            month: month,
            production: Math.floor(Math.random() * 20000) + 15000,
            quality: Math.floor(Math.random() * 10) + 90,
            cost: Math.floor(Math.random() * 50000) + 30000
        }))
    };
}

// 生成气候模拟数据
function generateClimateData() {
    const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
    const months = ['1月', '2月', '3月', '4月', '5月', '6月'];
    
    return {
        hourly: hours.map(hour => ({
            time: hour,
            temperature: Math.random() * 15 + 20,
            humidity: Math.random() * 40 + 40,
            pressure: Math.random() * 20 + 1000
        })),
        daily: Array.from({length: 7}, (_, i) => ({
            day: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][i],
            high: Math.random() * 10 + 25,
            low: Math.random() * 10 + 15,
            rainfall: Math.random() * 50
        })),
        // 添加月份数据以支持月度显示
        monthly: months.map(month => ({
            month: month,
            temperature: Math.random() * 15 + 20,
            humidity: Math.random() * 30 + 50,
            rainfall: Math.random() * 100
        }))
    };
}

// 生成销售模拟数据
function generateSalesData() {
    const products = ['产品A', '产品B', '产品C', '产品D', '产品E'];
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    
    return {
        quarterly: quarters.map(quarter => ({
            quarter: quarter,
            revenue: Math.floor(Math.random() * 100000) + 50000,
            profit: Math.floor(Math.random() * 30000) + 10000,
            customers: Math.floor(Math.random() * 500) + 200
        })),
        products: products.map(product => ({
            product: product,
            sales: Math.floor(Math.random() * 10000) + 5000,
            profit: Math.floor(Math.random() * 2000) + 500,
            satisfaction: Math.floor(Math.random() * 20) + 80
        })),
        // 添加月份数据以支持月度显示
        monthly: ['1月', '2月', '3月', '4月', '5月', '6月'].map(month => ({
            month: month,
            revenue: Math.floor(Math.random() * 80000) + 40000,
            profit: Math.floor(Math.random() * 20000) + 8000
        }))
    };
}

// 生成混合模拟数据
function generateMixedData() {
    const categories = ['类别A', '类别B', '类别C', '类别D', '类别E'];
    
    return {
        categories: categories.map(cat => ({
            name: cat,
            value1: Math.floor(Math.random() * 1000) + 200,
            value2: Math.floor(Math.random() * 800) + 100,
            value3: Math.floor(Math.random() * 600) + 50
        })),
        comparison: Array.from({length: 10}, (_, i) => ({
            index: i + 1,
            series1: Math.random() * 100,
            series2: Math.random() * 80,
            series3: Math.random() * 60
        }))
    };
}

// 设置事件监听器
function setupEventListeners() {
    document.getElementById('generateLayout').addEventListener('click', generateLayout);
    document.getElementById('layoutType').addEventListener('change', updateLayoutType);
    document.getElementById('rowsCount').addEventListener('input', updateLayoutDimensions);
    document.getElementById('colsCount').addEventListener('input', updateLayoutDimensions);
    document.getElementById('chartType').addEventListener('change', updateChartType);
    document.getElementById('dataSource').addEventListener('change', updateDataSource);
    document.getElementById('syncMode').addEventListener('change', updateSyncMode);
    
    // 颜色主题按钮
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            applyColorTheme(this.dataset.theme);
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// 生成初始布局
function generateInitialLayout() {
    currentLayout = 'grid';
    currentRows = 2;
    currentCols = 2;
    generateLayout();
}

// 生成布局
function generateLayout() {
    const container = document.getElementById('subplotsContainer');
    const layoutType = document.getElementById('layoutType').value;
    const rows = parseInt(document.getElementById('rowsCount').value);
    const cols = parseInt(document.getElementById('colsCount').value);
    
    // 清除现有图表
    destroyAllCharts();
    container.innerHTML = '';
    
    // 设置布局类
    container.className = 'subplots-container';
    
    let chartCount = 0;
    
    if (layoutType === 'grid') {
        container.classList.add('layout-grid');
        container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        chartCount = rows * cols;
    } else if (layoutType === 'horizontal') {
        container.classList.add('layout-horizontal');
        chartCount = cols;
    } else if (layoutType === 'vertical') {
        container.classList.add('layout-vertical');
        chartCount = rows;
    } else if (layoutType === 'mixed') {
        container.classList.add('layout-grid');
        container.style.gridTemplateColumns = '2fr 1fr 1fr';
        container.style.gridTemplateRows = '1fr 1fr';
        chartCount = 4;
    }
    
    // 生成子图
    for (let i = 0; i < chartCount; i++) {
        const subplot = createSubplot(i, layoutType);
        container.appendChild(subplot);
    }
    
    // 更新全局变量
    currentLayout = layoutType;
    currentRows = rows;
    currentCols = cols;
    
    // 应用数据
    setTimeout(() => {
        applyDataToCharts();
    }, 100);
}

// 创建子图
function createSubplot(index, layoutType) {
    const subplot = document.createElement('div');
    subplot.className = 'subplot';
    subplot.id = `subplot-${index}`;
    
    // 确定图表类型
    let chartType = getChartTypeForIndex(index, layoutType);
    console.log(`创建子图 ${index}: 布局=${layoutType}, 类型=${chartType}`);
    
    subplot.innerHTML = `
        <div class="subplot-header">
            <span class="subplot-title">${getChartTitle(chartType, index)}</span>
            <div class="subplot-actions">
                <button class="subplot-action" onclick="refreshChart(${index})" title="刷新">
                    🔄
                </button>
                <button class="subplot-action" onclick="exportChart(${index})" title="导出">
                    📥
                </button>
                <button class="subplot-action" onclick="maximizeChart(${index})" title="最大化">
                    🔍
                </button>
            </div>
        </div>
        <div id="chart-${index}" class="subplot-chart"></div>
    `;
    
    // 创建图表实例
    setTimeout(() => {
        const chartDom = document.getElementById(`chart-${index}`);
        if (chartDom) {
            const chart = echarts.init(chartDom);
            chartInstances.push({
                id: index,
                instance: chart,
                type: chartType
            });
            console.log(`图表实例创建成功: id=${index}, type=${chartType}`);
        } else {
            console.error(`图表容器未找到: chart-${index}`);
        }
    }, 50);
    
    return subplot;
}

// 根据索引确定图表类型
function getChartTypeForIndex(index, layoutType) {
    // 强制获取用户选择的图表类型
    try {
        const chartTypeSelect = document.getElementById('chartType');
        if (!chartTypeSelect) {
            console.error('图表类型选择器不存在');
            return 'bar';
        }
        
        const selectedChartType = chartTypeSelect.value;
        console.log(`图表类型选择: index=${index}, layout=${layoutType}, selected=${selectedChartType}`);
        
        // 如果用户选择了特定类型，强制使用该类型
        if (selectedChartType !== 'auto') {
            console.log(`返回用户选择的类型: ${selectedChartType}`);
            return selectedChartType;
        }
        
        // 自动分配模式
        const chartTypes = ['bar', 'line', 'pie', 'scatter', 'area', 'radar'];
        let autoType;
        
        if (layoutType === 'grid') {
            autoType = chartTypes[index % chartTypes.length];
        } else if (layoutType === 'horizontal') {
            autoType = ['bar', 'line', 'area'][index] || 'bar';
        } else if (layoutType === 'vertical') {
            autoType = ['line', 'area', 'candlestick'][index] || 'bar';
        } else if (layoutType === 'mixed') {
            autoType = ['bar', 'pie', 'line', 'radar'][index] || 'bar';
        } else {
            autoType = 'bar';
        }
        
        console.log(`返回自动分配的类型: ${autoType}`);
        return autoType;
        
    } catch (error) {
        console.error('获取图表类型时出错:', error);
        return 'bar';
    }
}

// 获取图表标题
function getChartTitle(chartType, index) {
    const titles = {
        bar: '柱状图',
        line: '折线图',
        pie: '饼图',
        scatter: '散点图',
        area: '面积图',
        radar: '雷达图',
        gauge: '仪表盘',
        candlestick: 'K线图'
    };
    
    return `${titles[chartType] || '图表'} ${index + 1}`;
}

// 应用数据到图表
function applyDataToCharts() {
    console.log('=== 开始应用数据到图表 ===');
    
    const dataSourceSelect = document.getElementById('dataSource');
    const chartTypeSelect = document.getElementById('chartType');
    
    if (!dataSourceSelect || !chartTypeSelect) {
        console.error('DOM元素不存在');
        return;
    }
    
    const dataSource = dataSourceSelect.value;
    const selectedChartType = chartTypeSelect.value;
    
    console.log('选择的数据源:', dataSource);
    console.log('选择的图表类型:', selectedChartType);
    
    let data = chartsData[dataSource];
    if (!data) {
        console.error('数据源不存在:', dataSource);
        // 创建默认数据
        data = { 
            monthly: [
                {month: '1月', value: 100},
                {month: '2月', value: 200}
            ]
        };
        chartsData[dataSource] = data;
    }
    
    console.log('使用的数据:', data);
    console.log('图表实例数量:', chartInstances.length);
    
    // 更新所有图表
    chartInstances.forEach(({id, instance}, index) => {
        console.log(`\n--- 处理图表 ${index} (ID: ${id}) ---`);
        
        // 获取最终图表类型
        const finalChartType = selectedChartType !== 'auto' ? selectedChartType : getChartTypeForIndex(id, currentLayout);
        console.log(`最终图表类型: ${finalChartType}`);
        
        // 生成图表配置
        const option = getChartOption(finalChartType, data, id);
        console.log(`生成的配置:`, option);
        
        // 应用配置
        try {
            instance.setOption(option, true);
            console.log(`图表 ${id} 更新成功`);
        } catch (error) {
            console.error(`图表 ${id} 更新失败:`, error);
        }
    });
    
    console.log('=== 数据应用完成 ===\n');
}

// 获取图表配置
function getChartOption(chartType, data, index) {
    const baseOption = {
        animation: document.getElementById('animationToggle').checked,
        grid: {
            left: '10%',
            right: '10%',
            top: '15%',
            bottom: '15%'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show: true,
            bottom: 5
        }
    };
    
    // 根据数据源获取合适的数据
    function getDataForChart(data) {
        console.log('处理数据结构:', data);
        
        if (data.production && Array.isArray(data.production)) {
            return {
                xData: data.production.map(item => item.department || '部门' + item.index),
                yData: data.production.map(item => item.output || 0),
                seriesName: '产量'
            };
        } else if (data.monthly && Array.isArray(data.monthly)) {
            return {
                xData: data.monthly.map(item => item.month || '月' + item.index),
                yData: data.monthly.map(item => item.production || item.temperature || item.revenue || 0),
                seriesName: data.monthly[0]?.production ? '月产量' : 
                         data.monthly[0]?.temperature ? '温度' : '收入'
            };
        } else if (data.hourly && Array.isArray(data.hourly)) {
            return {
                xData: data.hourly.map(item => item.time || '时' + item.index),
                yData: data.hourly.map(item => item.temperature || 0),
                seriesName: '温度'
            };
        } else if (data.daily && Array.isArray(data.daily)) {
            return {
                xData: data.daily.map(item => item.day || '日' + item.index),
                yData: data.daily.map(item => item.high || 0),
                seriesName: '最高温度'
            };
        } else if (data.quarterly && Array.isArray(data.quarterly)) {
            return {
                xData: data.quarterly.map(item => item.quarter || 'Q' + item.index),
                yData: data.quarterly.map(item => item.revenue || 0),
                seriesName: '收入'
            };
        } else if (data.categories && Array.isArray(data.categories)) {
            return {
                xData: data.categories.map(item => item.name || '类别' + item.index),
                yData: data.categories.map(item => item.value1 || item.value || 0),
                seriesName: '数值'
            };
        } else if (data.products && Array.isArray(data.products)) {
            return {
                xData: data.products.map(item => item.product || '产品' + item.index),
                yData: data.products.map(item => item.sales || 0),
                seriesName: '销量'
            };
        } else {
            // 默认数据 - 确保始终有数据
            const defaultX = ['A', 'B', 'C', 'D', 'E'];
            return {
                xData: defaultX,
                yData: defaultX.map(() => Math.floor(Math.random() * 100) + 50),
                seriesName: '数据'
            };
        }
    }
    
    const chartData = getDataForChart(data);
    
    switch (chartType) {
        case 'bar':
            return {
                ...baseOption,
                xAxis: {
                    type: 'category',
                    data: chartData.xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: chartData.seriesName,
                    type: 'bar',
                    data: chartData.yData
                }]
            };
            
        case 'line':
            return {
                ...baseOption,
                xAxis: {
                    type: 'category',
                    data: chartData.xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: chartData.seriesName,
                    type: 'line',
                    smooth: true,
                    data: chartData.yData
                }]
            };
            
        case 'pie':
            const pieData = data.categories ? 
                data.categories.map(item => ({ name: item.name, value: item.value1 || item.value || 100 })) :
                chartData.xData.map((name, i) => ({ name, value: chartData.yData[i] || 50 }));
            
            return {
                ...baseOption,
                tooltip: {
                    trigger: 'item'
                },
                series: [{
                    name: '占比',
                    type: 'pie',
                    radius: '65%',
                    data: pieData
                }]
            };
            
        case 'scatter':
            let scatterData;
            if (data.comparison) {
                scatterData = data.comparison.map(item => [item.series1, item.series2]);
            } else {
                // 使用现有数据生成散点数据
                scatterData = chartData.yData.map((value, i) => [i + 1, value]);
            }
            
            return {
                ...baseOption,
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '数据点',
                    type: 'scatter',
                    data: scatterData
                }]
            };
            
        case 'area':
            return {
                ...baseOption,
                xAxis: {
                    type: 'category',
                    data: chartData.xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: chartData.seriesName,
                    type: 'line',
                    smooth: true,
                    areaStyle: {},
                    data: chartData.yData
                }]
            };
            
        case 'radar':
            return {
                ...baseOption,
                radar: {
                    indicator: [
                        {name: '指标A', max: 100},
                        {name: '指标B', max: 100},
                        {name: '指标C', max: 100},
                        {name: '指标D', max: 100},
                        {name: '指标E', max: 100}
                    ]
                },
                series: [{
                    name: '雷达图',
                    type: 'radar',
                    data: [{
                        value: [80, 90, 75, 85, 70],
                        name: '数据组1'
                    }]
                }]
            };
            
        default:
            return baseOption;
    }
}

// 应用预设
function applyPreset(presetName) {
    const preset = layoutPresets[presetName];
    if (!preset) return;
    
    document.getElementById('layoutType').value = preset.layout;
    document.getElementById('rowsCount').value = preset.rows;
    document.getElementById('colsCount').value = preset.cols;
    
    generateLayout();
    
    // 等待图表创建完成后设置标题
    setTimeout(() => {
        preset.titles.forEach((title, index) => {
            const titleElement = document.querySelector(`#subplot-${index} .subplot-title`);
            if (titleElement) {
                titleElement.textContent = title;
            }
        });
    }, 200);
}

// 刷新单个图表
function refreshChart(index) {
    const chartInfo = chartInstances.find(c => c.id === index);
    if (chartInfo) {
        applyDataToCharts();
    }
}

// 导出单个图表
function exportChart(index) {
    const chartInfo = chartInstances.find(c => c.id === index);
    if (chartInfo) {
        const url = chartInfo.instance.getDataURL({
            pixelRatio: 2,
            backgroundColor: '#fff'
        });
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `chart-${index}.png`;
        a.click();
    }
}

// 最大化单个图表
function maximizeChart(index) {
    const subplot = document.getElementById(`subplot-${index}`);
    if (subplot) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            subplot.requestFullscreen();
        }
    }
}

// 重置所有图表
function resetAllCharts() {
    generateInitialLayout();
}

// 导出所有图表
function exportAllCharts() {
    chartInstances.forEach(({id}) => {
        setTimeout(() => {
            exportChart(id);
        }, id * 200);
    });
}

// 全屏显示
function toggleFullscreen() {
    const container = document.querySelector('.subplots-section');
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        container.requestFullscreen();
    }
}

// 更新图表类型
function updateChartType() {
    console.log('图表类型变更，重新生成布局');
    // 强制重新生成布局以确保图表类型正确
    generateLayout();
}

// 更新布局类型
function updateLayoutType() {
    generateLayout();
}

// 更新布局尺寸
function updateLayoutDimensions() {
    if (currentLayout === 'grid') {
        generateLayout();
    }
}

// 更新数据源
function updateDataSource() {
    applyDataToCharts();
}

// 更新同步模式
function updateSyncMode() {
    // 实现图表同步逻辑
    const syncMode = document.getElementById('syncMode').value;
    
    if (syncMode !== 'none') {
        // 启用同步逻辑
        setupChartSync(syncMode);
    } else {
        // 禁用同步
        removeChartSync();
    }
}

// 设置图表同步
function setupChartSync(mode) {
    // 实现图表同步逻辑
    chartInstances.forEach(({instance}) => {
        // 根据同步模式配置相应的同步行为
        if (mode === 'x-axis' || mode === 'both') {
            // X轴同步逻辑
        }
        if (mode === 'y-axis' || mode === 'both') {
            // Y轴同步逻辑
        }
    });
}

// 移除图表同步
function removeChartSync() {
    // 移除同步设置
}

// 应用颜色主题
function applyColorTheme(theme) {
    const themes = {
        default: ['#00d2d3', '#54a0ff', '#48dbfb', '#0abde3', '#006ba6', '#1e3799', '#3c6382', '#40739e'],
        bright: ['#f368e0', '#ff9ff3', '#54a0ff', '#48dbfb', '#1dd1a1', '#feca57', '#ff6b6b', '#ff9ff3'],
        vibrant: ['#ee5a24', '#f79f1f', '#a29bfe', '#6c5ce7', '#fd79a8', '#fdcb6e', '#e17055', '#00b894'],
        neon: ['#00f5ff', '#ff00ff', '#ffff00', '#00ff00', '#ff1493', '#00bfff', '#ff4500', '#32cd32']
    };
    
    const colors = themes[theme] || themes.default;
    
    chartInstances.forEach(({instance}) => {
        const option = instance.getOption();
        if (option.color) {
            option.color = colors;
            instance.setOption(option);
        }
    });
}

// 切换配置标签
function switchTab(tabName) {
    // 切换标签激活状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}Tab`).classList.add('active');
}

// 销毁所有图表
function destroyAllCharts() {
    chartInstances.forEach(({instance}) => {
        instance.dispose();
    });
    chartInstances = [];
}

// 窗口大小改变时重新调整图表
window.addEventListener('resize', () => {
    chartInstances.forEach(({instance}) => {
        instance.resize();
    });
});

// 调试函数
function debugChartTypes() {
    console.log('=== 图表类型调试 ===');
    const chartTypeSelect = document.getElementById('chartType');
    console.log('图表类型选择器:', chartTypeSelect);
    if (chartTypeSelect) {
        console.log('当前选择的图表类型:', chartTypeSelect.value);
    }
    
    console.log('图表实例数量:', chartInstances.length);
    chartInstances.forEach(({id, type, instance}) => {
        console.log(`实例 ${id}: 类型=${type}, 实例存在=${!!instance}`);
    });
    
    // 测试强制更新为折线图
    const layoutType = document.getElementById('layoutType').value;
    console.log('当前布局类型:', layoutType);
    
    // 重新应用数据
    applyDataToCharts();
}

function debugDataSources() {
    console.log('=== 数据源调试 ===');
    console.log('所有数据源:', Object.keys(chartsData));
    
    Object.keys(chartsData).forEach(key => {
        const data = chartsData[key];
        console.log(`数据源 ${key}:`, data);
        if (data && typeof data === 'object') {
            console.log(`  可用字段: ${Object.keys(data)}`);
            Object.keys(data).forEach(field => {
                if (Array.isArray(data[field])) {
                    console.log(`  ${field}: 数组，长度=${data[field].length}`);
                    if (data[field].length > 0) {
                        console.log(`    第一项:`, data[field][0]);
                    }
                }
            });
        }
    });
    
    // 测试当前选择的数据源
    const dataSourceSelect = document.getElementById('dataSource');
    if (dataSourceSelect) {
        const selectedSource = dataSourceSelect.value;
        console.log('当前选择的数据源:', selectedSource);
        console.log('选择的数据源数据:', chartsData[selectedSource]);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializeApp);