# NeuroMedBench - 神经医学VLM模型性能排行榜

## 项目简介

NeuroMedBench于神经医学领域的视觉语言模型（VLM）性能评估平台。


## 项目结构

```
neuromedben/
├── index.html              # 主HTML文件
├── css/
│   └── styles.css          # 自定义样式文件
├── js/
│   ├── data.js             # 模型数据和配置
│   ├── main.js             # 主要功能逻辑
│   ├── navigation.js       # 导航和动画功能
│   └── charts.js           # 图表和模态框功能
├── datasets/               # 数据集文件
│   ├── complex-diseases.json           # 复杂疾病数据集
│   ├── direct-diagnosis.json           # 直接诊断数据集
│   ├── multi-round-dialogue.json       # 多轮对话数据集
│   └── neuromedben-complete-dateset.zip  # 完整数据集（压缩包）
└── README.md               # 项目说明文档
```

数据集更新时需要和原来的文件名保持一致（前端下载映射依赖当前文件名与后缀）。
