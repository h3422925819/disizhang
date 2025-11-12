// 数据可视化交互平台核心逻辑
class DataVisualizationPlatform {
    constructor() {
        this.chart = null;
        this.currentData = null;
        this.currentChartType = 'line';
        this.init();
    }

    init() {
        this.initChart();
        this.bindEvents();
        this.loadDefaultData();
        this.updateChart();
        this.renderDataTable(); // 初始化数据表格
    }

    initChart() {
        const chartDom = document.getElementById('mainChart');
        this.chart = echarts.init(chartDom);
        
        // 响应窗口大小变化
        window.addEventListener('resize', () => {
            this.chart.resize();
        });
    }

    bindEvents() {
        // 图表类型切换
        document.getElementById('chartType').addEventListener('change', (e) => {
            this.currentChartType = e.target.value;
            this.updateChart();
        });

        // 样式控制
        document.getElementById('colorScheme').addEventListener('change', () => this.updateChart());
        document.getElementById('fontFamily').addEventListener('change', () => this.updateChart());
        document.getElementById('fontSize').addEventListener('input', (e) => {
            document.getElementById('fontSizeValue').textContent = e.target.value + 'px';
            this.updateChart();
        });
        document.getElementById('showDataLabels').addEventListener('change', () => this.updateChart());
        document.getElementById('showGrid').addEventListener('change', () => this.updateChart());
        document.getElementById('lineWidth').addEventListener('input', (e) => {
            document.getElementById('lineWidthValue').textContent = e.target.value + 'px';
            this.updateChart();
        });

        // 按钮事件
        document.getElementById('resetBtn').addEventListener('click', () => this.resetSettings());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportChart());
        document.getElementById('loadDataBtn').addEventListener('click', () => this.loadCustomData());
        document.getElementById('randomDataBtn').addEventListener('click', () => this.generateRandomData());
        document.getElementById('updateFromTableBtn').addEventListener('click', () => this.updateFromTable());

        // 表格控制按钮
        document.getElementById('addRowBtn').addEventListener('click', () => this.addRow());
        document.getElementById('addColumnBtn').addEventListener('click', () => this.addColumn());
        document.getElementById('removeRowBtn').addEventListener('click', () => this.removeRow());
        document.getElementById('removeColumnBtn').addEventListener('click', () => this.removeColumn());
    }

    loadDefaultData() {
        // 示例数据
        this.currentData = {
            categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            series: [
                {
                    name: '销售额',
                    data: [820, 932, 901, 934, 1290, 1330, 1320, 801, 102, 230, 432, 789],
                    type: 'line'
                },
                {
                    name: '用户数',
                    data: [120, 132, 101, 134, 290, 230, 220, 182, 191, 234, 290, 330],
                    type: 'line'
                }
            ]
        };
    }

    // 渲染数据表格
    renderDataTable() {
        if (!this.currentData) return;

        const table = document.getElementById('dataTable');
        const thead = table.querySelector('thead tr');
        const tbody = table.querySelector('tbody');

        // 清空表格
        thead.innerHTML = '<th>分类</th>';
        tbody.innerHTML = '';

        // 添加列标题
        this.currentData.series.forEach(series => {
            const th = document.createElement('th');
            th.textContent = series.name;
            thead.appendChild(th);
        });

        // 添加数据行
        this.currentData.categories.forEach((category, rowIndex) => {
            const tr = document.createElement('tr');
            
            // 分类单元格
            const categoryCell = document.createElement('td');
            const categoryInput = document.createElement('input');
            categoryInput.type = 'text';
            categoryInput.value = category;
            categoryInput.addEventListener('input', (e) => {
                this.currentData.categories[rowIndex] = e.target.value;
                this.updateChart();
            });
            categoryCell.appendChild(categoryInput);
            tr.appendChild(categoryCell);

            // 数据单元格
            this.currentData.series.forEach(series => {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.value = series.data[rowIndex];
                input.addEventListener('input', (e) => {
                    series.data[rowIndex] = parseFloat(e.target.value) || 0;
                    this.updateChart();
                });
                td.appendChild(input);
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });
    }

    // 从表格更新数据
    updateFromTable() {
        this.updateChart();
        this.showMessage('图表已更新！', 'success');
    }

    // 添加行
    addRow() {
        const newCategory = `新分类${this.currentData.categories.length + 1}`;
        this.currentData.categories.push(newCategory);
        
        this.currentData.series.forEach(series => {
            series.data.push(Math.floor(Math.random() * 1000) + 100); // 随机数据
        });

        this.renderDataTable();
        this.updateChart();
        this.showMessage('行添加成功！', 'success');
    }

    // 添加列
    addColumn() {
        const newSeriesName = `新系列${this.currentData.series.length + 1}`;
        const newData = this.currentData.categories.map(() => Math.floor(Math.random() * 1000) + 100);
        
        this.currentData.series.push({
            name: newSeriesName,
            data: newData,
            type: 'line'
        });

        this.renderDataTable();
        this.updateChart();
        this.showMessage('列添加成功！', 'success');
    }

    // 删除行
    removeRow() {
        if (this.currentData.categories.length > 1) {
            this.currentData.categories.pop();
            this.currentData.series.forEach(series => {
                series.data.pop();
            });

            this.renderDataTable();
            this.updateChart();
            this.showMessage('行删除成功！', 'success');
        } else {
            this.showMessage('至少需要保留一行数据！', 'error');
        }
    }

    // 删除列
    removeColumn() {
        if (this.currentData.series.length > 1) {
            this.currentData.series.pop();
            this.renderDataTable();
            this.updateChart();
            this.showMessage('列删除成功！', 'success');
        } else {
            this.showMessage('至少需要保留一列数据！', 'error');
        }
    }

    getColorScheme() {
        const scheme = document.getElementById('colorScheme').value;
        const colorSchemes = {
            default: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
            warm: ['#ff6b6b', '#ffa726', '#ffca28', '#d4e157', '#9ccc65', '#66bb6a', '#26a69a', '#29b6f6', '#5c6bc0'],
            cool: ['#42a5f5', '#7e57c2', '#5c6bc0', '#26c6da', '#26a69a', '#66bb6a', '#9ccc65', '#d4e157', '#ffca28'],
            pastel: ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94', '#a2d2ff', '#bde0fe', '#ffafcc', '#cdb4db'],
            vibrant: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ff6b6b', '#4ecdc4', '#f7fff7', '#ffe66d']
        };
        return colorSchemes[scheme] || colorSchemes.default;
    }

    getChartOptions() {
        const fontSize = parseInt(document.getElementById('fontSize').value);
        const fontFamily = document.getElementById('fontFamily').value;
        const showDataLabels = document.getElementById('showDataLabels').checked;
        const showGrid = document.getElementById('showGrid').checked;
        const lineWidth = parseInt(document.getElementById('lineWidth').value);
        const colorScheme = this.getColorScheme();

        const baseOptions = {
            textStyle: {
                fontFamily: fontFamily,
                fontSize: fontSize
            },
            color: colorScheme,
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderColor: '#ddd',
                borderWidth: 1,
                textStyle: {
                    color: '#333',
                    fontSize: fontSize
                }
            },
            legend: {
                data: this.currentData.series.map(s => s.name),
                textStyle: {
                    fontSize: fontSize
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
                show: showGrid,
                borderColor: showGrid ? '#eee' : 'transparent'
            },
            xAxis: {
                type: 'category',
                data: this.currentData.categories,
                axisLine: {
                    lineStyle: {
                        color: '#666',
                        width: lineWidth
                    }
                },
                axisLabel: {
                    fontSize: fontSize
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#666',
                        width: lineWidth
                    }
                },
                axisLabel: {
                    fontSize: fontSize
                },
                splitLine: {
                    show: showGrid,
                    lineStyle: {
                        color: '#f0f0f0',
                        type: 'dashed'
                    }
                }
            }
        };

        // 根据图表类型调整配置
        switch (this.currentChartType) {
            case 'line':
                baseOptions.series = this.currentData.series.map(series => ({
                    ...series,
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        width: lineWidth
                    },
                    itemStyle: {
                        borderWidth: 2,
                        borderColor: '#fff'
                    },
                    label: {
                        show: showDataLabels,
                        fontSize: fontSize - 2
                    }
                }));
                break;

            case 'bar':
                baseOptions.series = this.currentData.series.map(series => ({
                    ...series,
                    type: 'bar',
                    barWidth: '60%',
                    label: {
                        show: showDataLabels,
                        fontSize: fontSize - 2
                    }
                }));
                break;

            case 'pie':
                baseOptions.series = [{
                    type: 'pie',
                    radius: '50%',
                    data: this.currentData.categories.map((category, index) => ({
                        value: this.currentData.series[0].data[index],
                        name: category
                    })),
                    label: {
                        show: showDataLabels,
                        fontSize: fontSize
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }];
                baseOptions.legend.data = this.currentData.categories;
                delete baseOptions.xAxis;
                delete baseOptions.yAxis;
                break;

            case 'scatter':
                baseOptions.series = this.currentData.series.map(series => ({
                    ...series,
                    type: 'scatter',
                    symbolSize: (value) => Math.sqrt(value) * 2,
                    label: {
                        show: showDataLabels,
                        fontSize: fontSize - 2
                    }
                }));
                break;

            case 'radar':
                baseOptions.radar = {
                    indicator: this.currentData.categories.map(category => ({ name: category, max: Math.max(...this.currentData.series.flatMap(s => s.data)) * 1.2 }))
                };
                baseOptions.series = [{
                    type: 'radar',
                    data: this.currentData.series.map(series => ({
                        value: series.data,
                        name: series.name
                    }))
                }];
                delete baseOptions.xAxis;
                delete baseOptions.yAxis;
                break;
        }

        return baseOptions;
    }

    updateChart() {
        if (!this.chart || !this.currentData) return;

        const options = this.getChartOptions();
        this.chart.setOption(options, true);

        // 更新统计信息
        this.updateStats();
    }

    updateStats() {
        const dataPoints = this.currentData.series.reduce((sum, series) => sum + series.data.length, 0);
        document.getElementById('dataPoints').textContent = dataPoints;
        document.getElementById('updateTime').textContent = new Date().toLocaleTimeString();
    }

    resetSettings() {
        document.getElementById('chartType').value = 'line';
        document.getElementById('colorScheme').value = 'default';
        document.getElementById('fontFamily').value = 'Arial, sans-serif';
        document.getElementById('fontSize').value = '14';
        document.getElementById('fontSizeValue').textContent = '14px';
        document.getElementById('showDataLabels').checked = true;
        document.getElementById('showGrid').checked = true;
        document.getElementById('lineWidth').value = '2';
        document.getElementById('lineWidthValue').textContent = '2px';
        
        this.currentChartType = 'line';
        this.loadDefaultData();
        this.renderDataTable();
        this.updateChart();
        this.showMessage('设置已重置！', 'success');
    }

    exportChart() {
        const imageData = this.chart.getDataURL({
            pixelRatio: 2,
            backgroundColor: '#fff'
        });
        
        const link = document.createElement('a');
        link.download = `chart-${new Date().getTime()}.png`;
        link.href = imageData;
        link.click();
    }

    loadCustomData() {
        const customDataText = document.getElementById('customData').value;
        
        try {
            const parsedData = JSON.parse(customDataText);
            
            // 验证数据格式
            if (parsedData.categories && parsedData.series) {
                this.currentData = parsedData;
                this.renderDataTable();
                this.updateChart();
                this.showMessage('数据加载成功！', 'success');
            } else {
                throw new Error('数据格式不正确');
            }
        } catch (error) {
            this.showMessage('数据格式错误，请检查JSON格式', 'error');
        }
    }

    generateRandomData() {
        const categories = ['Q1', 'Q2', 'Q3', 'Q4'];
        const seriesCount = Math.floor(Math.random() * 3) + 2; // 2-4个系列
        
        const series = [];
        for (let i = 0; i < seriesCount; i++) {
            series.push({
                name: `系列 ${i + 1}`,
                data: categories.map(() => Math.floor(Math.random() * 1000) + 100),
                type: 'line'
            });
        }

        this.currentData = { categories, series };
        this.renderDataTable();
        this.updateChart();
        this.showMessage('随机数据生成成功！', 'success');
    }

    showMessage(message, type) {
        // 简单的消息提示
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            background: ${type === 'success' ? '#51cf66' : '#ff6b6b'};
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new DataVisualizationPlatform();
});