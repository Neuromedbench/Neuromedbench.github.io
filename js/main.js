// NeuroMedBench - 主要JavaScript功能

// 全局变量
let activeDataset = 'verified';
let activeVersion = '1.0';
let filteredModels = (modelData[activeVersion] && modelData[activeVersion][activeDataset])
    ? [...modelData[activeVersion][activeDataset]]
    : [];
let currentSortField = 'resolved';
let currentSortDirection = 'desc';

// DOM元素
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const datasetTabs = document.querySelectorAll('.dataset-tab');
const benchVersion = document.getElementById('bench-version');
const tableSearch = document.getElementById('table-search');
const globalSearch = document.getElementById('global-search');
const clearSearch = document.getElementById('clear-search');
const tableBody = document.getElementById('ranking-table');
const loadingIndicator = document.getElementById('loading-indicator');
const noResults = document.getElementById('no-results');
const modelModal = document.getElementById('model-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const bertScoreColumn = document.querySelector('.bert-score-column');
const sortableHeaders = document.querySelectorAll('.sortable');
const leaderboardTableCard = document.getElementById('leaderboard-table-card');
const leaderboardChartCard = document.getElementById('leaderboard-chart-card');
const leaderboardComingSoon = document.getElementById('leaderboard-coming-soon');
const leaderboardControls = document.getElementById('leaderboard-controls');

function isVersionComingSoon() {
    // 仅当选择 2.0 时显示 Coming soon
    return activeVersion === '2.0';
}

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 用下拉框值作为初始化版本，确保首次渲染正确
    if (benchVersion) {
        activeVersion = benchVersion.value || '1.0';
    }
    filteredModels = (modelData[activeVersion] && modelData[activeVersion][activeDataset])
        ? [...modelData[activeVersion][activeDataset]]
        : [];

    renderTable();
    initChart();
    setupEventListeners();
    updateColumnsVisibility();
    // 初始化导航栏活跃状态
    updateActiveNavOnScroll();
    // 初始化滚动动画
    initScrollReveal();
});

// 设置事件监听器
function setupEventListeners() {
    // 移动端菜单切换
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // 平滑滚动 - 重写跳转逻辑
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 获取导航栏的实际高度
                const header = document.querySelector('header');
                const headerHeight = header.getBoundingClientRect().height;
                
                // 计算目标位置：section顶部 - 导航栏高度 - 一些缓冲空间
                const elementRect = targetElement.getBoundingClientRect();
                const elementTop = elementRect.top + window.pageYOffset;
                const targetPosition = elementTop - headerHeight - 10; // 10px缓冲空间
                
                // 执行平滑滚动
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                // 更新导航栏活跃状态
                updateActiveNavItem(targetId);
                
                // 关闭移动菜单
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // 数据集标签切换
    datasetTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 更新活跃标签样式
            datasetTabs.forEach(t => {
                t.classList.remove('active', 'text-primary', 'border-primary', 'border-b-2');
                t.classList.add('text-gray-400');
            });
            
            tab.classList.add('active', 'text-primary', 'border-b-2', 'border-primary');
            tab.classList.remove('text-gray-400');
            
            // 切换数据集
            activeDataset = tab.dataset.dataset;
            console.log('Switching to dataset:', activeDataset);
            
            // 清空搜索框
            tableSearch.value = '';
            globalSearch.value = '';
            
            // 重新加载数据（2.0无数据时为空）
            filteredModels = (modelData[activeVersion] && modelData[activeVersion][activeDataset])
                ? [...modelData[activeVersion][activeDataset]]
                : [];
            sortModels();
            updateColumnsVisibility();
            renderTable();
            initChart();
        });
    });
    
    // 排行榜版本切换
    benchVersion.addEventListener('change', () => {
        activeVersion = benchVersion.value;
        console.log('Switching to version:', activeVersion);
        
        // 清空搜索框
        tableSearch.value = '';
        globalSearch.value = '';
        
        // 重新加载数据（2.0无数据时为空）
        filteredModels = (modelData[activeVersion] && modelData[activeVersion][activeDataset])
            ? [...modelData[activeVersion][activeDataset]]
            : [];
        sortModels();
        updateColumnsVisibility();
        renderTable();
        initChart();
    });
    
    // 排序表头点击事件
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const sortField = header.dataset.sort;
            
            // 如果点击的是当前排序字段，则切换排序方向
            if (sortField === currentSortField) {
                currentSortDirection = currentSortDirection === 'desc' ? 'asc' : 'desc';
            } else {
                currentSortField = sortField;
                currentSortDirection = 'desc';
            }
            
            // 更新排序图标
            updateSortIcons();
            
            // 排序并重新渲染表格
            sortModels();
            renderTable();
        });
    });
    
    // 表格搜索
    tableSearch.addEventListener('input', (e) => {
        filterModels(e.target.value);
        // 同步到全局搜索框
        globalSearch.value = e.target.value;
    });
    
    // 全局搜索
    globalSearch.addEventListener('input', (e) => {
        filterModels(e.target.value);
        // 同步到表格搜索框
        tableSearch.value = e.target.value;
    });
    
    // 清除搜索
    clearSearch.addEventListener('click', () => {
        tableSearch.value = '';
        globalSearch.value = '';
        filterModels('');
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', closeModelModal);
    
    // 点击模态框外部关闭
    modelModal.addEventListener('click', (e) => {
        if (e.target === modelModal) {
            closeModelModal();
        }
    });
    
    // 数据集下载功能
    document.querySelectorAll('[data-download]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const dataset = button.getAttribute('data-download');
            downloadDataset(dataset);
        });
    });
    
    // 右上角Downloads按钮
    const headerDownloadBtn = document.getElementById('header-download-btn');
    if (headerDownloadBtn) {
        headerDownloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadCompleteDataset();
        });
    }
    
    // Dataset版本切换
    const datasetVersion = document.getElementById('dataset-version');
    if (datasetVersion) {
        datasetVersion.addEventListener('change', () => {
            const selectedVersion = datasetVersion.value;
            toggleDatasetVersion(selectedVersion);
        });
    }
    
    // 导航栏滚动效果和活跃状态更新
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'shadow-lg');
            header.classList.remove('py-3', 'shadow-sm');
        } else {
            header.classList.add('py-3', 'shadow-sm');
            header.classList.remove('py-2', 'shadow-lg');
        }
        
        // 更新导航栏活跃状态
        updateActiveNavOnScroll();
    });
}

// 更新排序图标
function updateSortIcons() {
    sortableHeaders.forEach(header => {
        const icon = header.querySelector('.sort-icon');
        if (header.dataset.sort === currentSortField) {
            icon.classList.toggle('desc', currentSortDirection === 'desc');
        } else {
            icon.classList.remove('desc');
        }
    });
}

// 根据数据集类型更新列的可见性
function updateColumnsVisibility() {
    if (activeDataset === 'verified') {
        // Direct Diagnosis 数据集不显示BertScore列
        bertScoreColumn.style.display = 'none';
    } else {
        // Complex Diseases 和 Multi-round Dialogue 数据集显示BertScore列
        bertScoreColumn.style.display = 'table-cell';
    }
}

// 过滤模型
function filterModels(searchTerm) {
    if (!searchTerm.trim()) {
        filteredModels = [...modelData[activeVersion][activeDataset]];
        sortModels();
        renderTable();
        return;
    }
    
    const term = searchTerm.toLowerCase();
    filteredModels = modelData[activeVersion][activeDataset].filter(model => 
        model.name.toLowerCase().includes(term) || 
        model.Accuracy_Pass5.toLowerCase().includes(term) ||
        model.version.toLowerCase().includes(term)
    );
    
    sortModels();
    renderTable();
}

// 排序模型
function sortModels() {
    filteredModels.sort((a, b) => {
        let valueA, valueB;
        
        switch (currentSortField) {
            case 'resolved':
                valueA = a.resolved;
                valueB = b.resolved;
                break;
            case 'pass5':
                valueA = a.pass5;
                valueB = b.pass5;
                break;
            case 'bertscore':
                valueA = a.bertscore || 0;
                valueB = b.bertscore || 0;
                break;
            case 'model-size':
                valueA = a.modelSize;
                valueB = b.modelSize;
                break;
            default:
                valueA = a.resolved;
                valueB = b.resolved;
        }
        
        if (currentSortDirection === 'desc') {
            return valueB - valueA;
        } else {
            return valueA - valueB;
        }
    });
}

// 渲染表格
function renderTable() {
    // 根据版本切换可见性（2.0：Coming soon）
    if (isVersionComingSoon()) {
        if (leaderboardComingSoon) leaderboardComingSoon.classList.remove('hidden');
        if (leaderboardTableCard) leaderboardTableCard.classList.add('hidden');
        if (leaderboardChartCard) leaderboardChartCard.classList.add('hidden');
        if (leaderboardControls) leaderboardControls.classList.add('hidden');
        return;
    } else {
        if (leaderboardComingSoon) leaderboardComingSoon.classList.add('hidden');
        if (leaderboardTableCard) leaderboardTableCard.classList.remove('hidden');
        if (leaderboardChartCard) leaderboardChartCard.classList.remove('hidden');
        if (leaderboardControls) leaderboardControls.classList.remove('hidden');
    }

    // 确保完全清空表格内容
    tableBody.innerHTML = '';
    loadingIndicator.classList.remove('hidden');
    noResults.classList.add('hidden');

    // 调试信息：输出当前要渲染的数据
    console.log('Rendering table with data:', {
        activeVersion,
        activeDataset,
        filteredModelsLength: filteredModels.length,
        filteredModels: filteredModels.map(m => ({ id: m.id, name: m.name, resolved: m.resolved }))
    });

    // 模拟加载延迟
    setTimeout(() => {
        loadingIndicator.classList.add('hidden');

        if (filteredModels.length === 0) {
            noResults.classList.remove('hidden');
            return;
        }

        // 再次确保表格为空，防止重复渲染
        tableBody.innerHTML = '';

        // 渲染表格内容
        filteredModels.forEach((model, index) => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-white/5 transition-all duration-300 cursor-pointer';
            row.addEventListener('click', () => openModelModal(model, index + 1));

            // 决定解决率的颜色
            let resolvedColor = 'text-gray-400';
            if (model.resolved >= 60) resolvedColor = 'text-primary font-semibold';
            else if (model.resolved >= 40) resolvedColor = 'text-secondary font-medium';

            // Pass5颜色
            let pass5Color = 'text-gray-400';
            if (model.pass5 >= 80) pass5Color = 'text-primary font-semibold';
            else if (model.pass5 >= 60) pass5Color = 'text-secondary font-medium';

            // BertScore颜色
            let bertScoreColor = 'text-gray-400';
            if (model.bertscore) {
                if (model.bertscore >= 0.85) bertScoreColor = 'text-primary font-semibold';
                else if (model.bertscore >= 0.75) bertScoreColor = 'text-secondary font-medium';
            }

            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <span class="text-sm font-medium ${index < 3 ? 'text-primary' : 'text-gray-400'}">
                            ${index + 1}
                        </span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center flex-wrap gap-2">
                        ${model.new ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-500/20">新</span>' : ''}
                        ${model.verified ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-500/20">已验证</span>' : ''}
                        <span class="text-sm font-medium text-white">${model.name}</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-300">${model.modelSize}B</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="w-24 bg-white/5 rounded-full h-2 mr-2">
                            <div class="bg-primary h-2 rounded-full" style="width: ${model.resolved}%"></div>
                        </div>
                        <span class="text-sm ${resolvedColor}">${model.resolved}%</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="w-24 bg-white/5 rounded-full h-2 mr-2">
                            <div class="bg-secondary h-2 rounded-full" style="width: ${model.pass5}%"></div>
                        </div>
                        <span class="text-sm ${pass5Color}">${model.pass5}%</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap bert-score-column">
                    ${model.bertscore ? `
                        <div class="flex items-center">
                            <div class="w-24 bg-white/5 rounded-full h-2 mr-2">
                                <div class="bg-accent h-2 rounded-full" style="width: ${model.bertscore * 100}%"></div>
                            </div>
                            <span class="text-sm ${bertScoreColor}">${model.bertscore.toFixed(2)}</span>
                        </div>
                    ` : ''}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-400">${model.version}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button class="text-primary hover:text-primary/80 transition-colors">
                        <i class="fa fa-angle-right"></i>
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        // 初始化排序图标
        updateSortIcons();
    }, 500);
}

// 下载数据集函数
function downloadDataset(datasetKey) {
    // 按当前 datasets 目录实际文件映射
    const datasetFiles = {
        'direct-diagnosis': 'datasets/direct-diagnosis.json',
        'complex-diseases': 'datasets/complex-diseases.json',
        'multi-round-dialogue': 'datasets/multi-round-dialogue.json'
    };

    const filePath = datasetFiles[datasetKey];
    if (!filePath) {
        console.error('未找到对应的数据集文件');
        return;
    }

    const fileName = filePath.split('/').pop();

    // 创建下载链接
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName; // 使用实际文件名与后缀
    link.style.display = 'none';

    // 添加到页面并触发下载
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);

    // 显示下载提示
    showDownloadNotification(fileName);
}

// 下载完整数据集函数
function downloadCompleteDataset() {
    // 注意：文件名以 datasets 目录现有文件为准（含命名中的拼写）
    const filePath = 'datasets/neuromedben-complete-dateset.zip';
    const fileName = filePath.split('/').pop();

    // 创建下载链接
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.style.display = 'none';

    // 添加到页面并触发下载
    document.body.appendChild(link);
    link.click();

    // 清理
    document.body.removeChild(link);

    // 显示下载提示
    showDownloadNotification(fileName);
}

// Dataset版本切换函数
function toggleDatasetVersion(version) {
    const datasetV1 = document.getElementById('dataset-v1');
    const datasetV2 = document.getElementById('dataset-v2');
    
    if (version === '2.0') {
        // 显示v2.0内容，隐藏v1.0内容
        datasetV1.classList.add('hidden');
        datasetV2.classList.remove('hidden');
    } else {
        // 显示v1.0内容，隐藏v2.0内容
        datasetV1.classList.remove('hidden');
        datasetV2.classList.add('hidden');
    }
}

// 显示下载通知
function showDownloadNotification(fileName) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-glow z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fa fa-download mr-2"></i>
            <span>正在下载 ${fileName}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // 3秒后隐藏通知
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
