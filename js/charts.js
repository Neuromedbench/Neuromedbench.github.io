// NeuroMedBench - 图表功能

// 初始化图表
function initChart() {
    // 如果 2.0 Coming Soon 可见，则不初始化图表
    const comingSoon = document.getElementById('leaderboard-coming-soon');
    if (comingSoon && !comingSoon.classList.contains('hidden')) {
        return;
    }

    const ctx = document.getElementById('performance-chart').getContext('2d');
    
    // 销毁已存在的图表
    if (window.performanceChart) {
        window.performanceChart.destroy();
    }
    
    // 准备图表数据
    const chartData = filteredModels.slice(0, 10).map(model => ({
        x: model.modelSize,
        y: model.resolved,
        label: model.name,
        organization: model.Accuracy_Pass5
    }));
    
    // 根据机构分组数据
    const organizationColors = {
        'OpenAI': '#06D6A0',
        'Anthropic': '#118AB2', 
        'Google': '#EF476F',
        'Alibaba': '#FFD166',
        'Moonshot AI': '#F78C6B'
    };
    
    const datasets = {};
    chartData.forEach(point => {
        const org = point.organization;
        if (!datasets[org]) {
            datasets[org] = {
                label: org,
                data: [],
                backgroundColor: organizationColors[org] || '#8B5CF6',
                borderColor: organizationColors[org] || '#8B5CF6',
                borderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            };
        }
        datasets[org].data.push(point);
    });
    
    window.performanceChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: Object.values(datasets)
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `${activeDataset === 'verified' ? 'Direct Diagnosis' : activeDataset === 'lite' ? 'Complex Diseases' : 'Multi-round Dialogue'} - Performance vs Model Size`,
                    color: 'rgba(255, 255, 255, 0.8)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(22, 26, 39, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: 'rgba(6, 214, 160, 0.5)',
                    borderWidth: 1,
                    callbacks: {
                        title: function(context) {
                            return context[0].raw.label;
                        },
                        label: function(context) {
                            return [
                                `Accuracy: ${context.parsed.y}%`,
                                `Model Size: ${context.parsed.x}B`,
                                `Organization: ${context.raw.organization}`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.6)'
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            }
        }
    });
}

// 打开模型详情模态框
function openModelModal(model, rank) {
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modelModal = document.getElementById('model-modal');
    
    modalTitle.textContent = `${model.name} Details`;
    
    // 生成模态框内容
    modalContent.innerHTML = `
        <div class="flex flex-col md:flex-row gap-6 mb-6">
            <div class="md:w-1/3">
                <div class="glass rounded-xl p-4 text-center">
                    <div class="text-4xl font-bold text-primary mb-1">${rank}</div>
                    <div class="text-sm text-gray-400 mb-3">Ranking</div>
                    <div class="text-3xl font-bold text-white mb-1">${model.resolved}%</div>
                    <div class="text-sm text-gray-400">Accuracy  Pass@1</div>
                </div>
            </div>
            <div class="md:w-2/3">
                <h4 class="text-lg font-semibold text-white mb-4">Model Information</h4>
                <div class="space-y-3">
                    <div class="flex">
                        <div class="w-24 text-gray-400">Model:</div>
                        <div class="text-white">${model.name}</div>
                    </div>
                    <div class="flex">
                        <div class="w-24 text-gray-400">Institution:</div>
                        <div class="text-white">${model.Accuracy_Pass5}</div>
                    </div>
                    <div class="flex">
                        <div class="w-24 text-gray-400">Model Size:</div>
                        <div class="text-white">${model.modelSize}B</div>
                    </div>
                    <div class="flex">
                        <div class="w-24 text-gray-400">Eval Date:</div>
                        <div class="text-white">${model.date}</div>
                    </div>
                    <div class="flex">
                        <div class="w-24 text-gray-400">Version:</div>
                        <div class="text-white">${model.version}</div>
                    </div>
                    <div class="flex flex-wrap gap-2 mt-2">
                        ${model.new ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-500/20">New Model</span>' : ''}
                        ${model.verified ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-500/20">Evaluated</span>' : ''}
                        ${model.trajs ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-gray-300">Recorded</span>' : ''}
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mb-6">
            <h4 class="text-lg font-semibold text-white mb-4">Performance</h4>
            <div class="glass rounded-xl p-4 h-60">
                <canvas id="model-detail-chart"></canvas>
            </div>
        </div>
        
        <div class="flex justify-end space-x-3">
            <button class="px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-white/5 transition-all duration-300" onclick="closeModelModal()">
                Close
            </button>
            <button class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-glow">
                <i class="fa fa-download mr-1"></i> Full Report
            </button>
        </div>
    `;
    
    // 显示模态框
    modelModal.classList.remove('opacity-0', 'pointer-events-none');
    modelModal.querySelector('div').classList.remove('scale-95');
    modelModal.querySelector('div').classList.add('scale-100');
    
    // 生成模型详情图表
    setTimeout(() => {
        const detailCtx = document.getElementById('model-detail-chart').getContext('2d');
        
        // 模拟不同类别的性能数据
        const categories = ['multi-step reasoning', 'fine-grained perception', 'vision-language grounding', 'Domain knowledge integration'];
        const scores = [
            Math.min(100, model.resolved + Math.random() * 10 - 5),
            Math.min(100, model.resolved + Math.random() * 10 - 5),
            Math.min(100, model.resolved + Math.random() * 10 - 8),
            Math.min(100, model.resolved + Math.random() * 10 - 10)
        ];
        
        new Chart(detailCtx, {
            type: 'radar',
            data: {
                labels: categories,
                datasets: [{
                    label: 'Score',
                    data: scores,
                    backgroundColor: 'rgba(6, 214, 160, 0.2)',
                    borderColor: '#06D6A0',
                    pointBackgroundColor: '#06D6A0',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#06D6A0'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }, 300);
}

// 关闭模型详情模态框
function closeModelModal() {
    const modelModal = document.getElementById('model-modal');
    modelModal.classList.add('opacity-0', 'pointer-events-none');
    modelModal.querySelector('div').classList.remove('scale-100');
    modelModal.querySelector('div').classList.add('scale-95');
}
