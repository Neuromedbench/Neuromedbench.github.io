// NeuroMedBench - 模拟数据
const modelData = {
    "1.0": {      //应该这里数据对应错了，1.0在html界面显示的是这个文件里的2.0列表的数值，我把1.0的真实数据全部更新在这里了
        verified: [
            { id: 1, name: "GPT-4o 2025-03-26", resolved: 20.0, pass5: 36.7, modelSize: 180, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Anthropic", date: "2025-08-02" },
            { id: 2, name: "Gemini 2.5-Flash", resolved: 26.7, pass5: 46.7, modelSize: 180, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Google", date: "2025-05-21" },
            { id: 3, name: "Gemini 2.0-Flash", resolved: 20.0, pass5: 30.0, modelSize: 120, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Anthropic", date: "2025-05-21" },
            { id: 4, name: "Claude 3.7 Sonnet", resolved: 16.7, pass5: 26.7, modelSize: 80, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "OpenAI", date: "2025-08-07" },
            { id: 5, name: "Claude 3.5 Sonnet", resolved: 6.7, pass5: 16.7, modelSize: 150, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Google", date: "2025-05-21" },
            { id: 6, name: "Qwen-VL-2.5-32B", resolved: 10.0, pass5: 30.0, modelSize: 110, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Alibaba", date: "2025-08-02" },
            { id: 7, name: "Doubao-1.5-vision-pro", resolved: 6.7, pass5: 40.0, modelSize: 130, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Google", date: "2025-05-21" },
            { id: 8, name: "LLaVA-Med-7B", resolved: 10.0, pass5: 16.7, modelSize: 90, version: "0.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Anthropic", date: "2025-05-21" },
            { id: 9, name: "RadFM-14B", resolved: 0.0, pass5: 20.0, modelSize: 60, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Google", date: "2025-05-21" },
            { id: 10, name: "Med-Flamingo-9B", resolved: 0.0, pass5: 16.7, modelSize: 75, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Moonshot AI", date: "2025-08-07" },
            { id: 11, name: "HuatuoGPT-7B", resolved: 10.0, pass5: 20.0, modelSize: 75, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Moonshot AI", date: "2025-08-07" },
            { id: 12, name: "MedGemma-27B-it", resolved: 16.7, pass5: 43.3, modelSize: 75, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Moonshot AI", date: "2025-08-07" },
            { id: 13, name: "Claude 4 Sonnet", resolved: 30.0, pass5: 36.7, modelSize: 75, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Moonshot AI", date: "2025-08-07" },
        ],
        lite: [
            { id: 1, name: "GPT-4 2025-03-26", resolved: 8.3, pass5: 40.0, bertscore: 0.70, modelSize: 220, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "OpenAI", date: "2025-03-26" },
            { id: 2, name: "Gemini 2.5-Flash", resolved: 13.3, pass5: 35.0, bertscore: 0.76, modelSize: 180, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Google", date: "2025-05-21" },
            { id: 3, name: "Gemini 2.0-Flash", resolved: 11.7, pass5: 23.3, bertscore: 0.68, modelSize: 130, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Google", date: "2025-05-21" },
            { id: 4, name: "Claude 3.7 Sonnet", resolved: 8.3, pass5: 31.7, bertscore: 0.73, modelSize: 120, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Anthropic", date: "2025-05-21" },
            { id: 5, name: "Claude 3.5 Sonnet", resolved: 8.3, pass5: 18.3, bertscore: 0.68, modelSize: 80, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Anthropic", date: "2025-05-21" },
            { id: 6, name: "Qwen-VL-2.5-32B", resolved: 5.0, pass5: 21.7, bertscore: 0.79, modelSize: 110, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Alibaba", date: "2025-08-02" },
            { id: 7, name: "Doubao-1.5-vision-pro", resolved: 10.0, pass5: 13.3, bertscore: 0.64, modelSize: 60, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Doubao", date: "2025-08-02" },
            { id: 8, name: "LLaVA-Med-7B", resolved: 10.0, pass5: 28.3, bertscore: 0.66, modelSize: 220, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "OpenAI", date: "2025-08-07" },
            { id: 9, name: "RadFM-14B", resolved: 3.3, pass5: 13.3, bertscore: 0.62, modelSize: 180, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "OpenAI", date: "2025-08-07" },
            { id: 10, name: "Med-Flamingo-9B", resolved: 3.3, pass5: 10.0, bertscore: 0.67, modelSize: 130, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "OpenAI", date: "2025-08-07" },
            { id: 11, name: "HuatouGPT-7B", resolved: 5.0, pass5: 13.3, bertscore: 0.60, modelSize: 160, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Huatuo", date: "2025-08-07" },
            { id: 12, name: "MedGemma-27B-it", resolved: 13.3, pass5: 31.6, bertscore: 0.78, modelSize: 75, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Moonshot AI", date: "2025-08-07" },
            { id: 13, name: "Claude 4 Sonnet", resolved: 18.3, pass5: 38.3, bertscore: 0.80, modelSize: 75, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Moonshot AI", date: "2025-08-07" },
        ],
        multimodal: [
            { id: 1, name: "GPT-4 2025-03-26", resolved: 8.5, pass5: 16.5, bertscore: 0.73, modelSize: 220, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "OpenAI", date: "2025-03-26" },
            { id: 2, name: "Gemini 2.5-Flash", resolved: 10.5, pass5: 18.5, bertscore: 0.68, modelSize: 180, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Google", date: "2025-05-21" },
            { id: 3, name: "Gemini 2.0-Flash", resolved: 9.0, pass5: 16.0, bertscore: 0.67, modelSize: 130, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Google", date: "2025-05-21" },
            { id: 4, name: "Claude 3.7 Sonnet", resolved: 7.5, pass5: 12.0, bertscore: 0.66, modelSize: 120, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Anthropic", date: "2025-05-21" },
            { id: 5, name: "Claude 3.5 Sonnet", resolved: 7.0, pass5: 10.5, bertscore: 0.66, modelSize: 80, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Anthropic", date: "2025-05-21" },
            { id: 6, name: "Qwen-VL-2.5-32B", resolved: 4.0, pass5: 10.0, bertscore: 0.69, modelSize: 110, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Alibaba", date: "2025-08-02" },
            { id: 7, name: "Doubao-1.5-vision-pro", resolved: 5.5, pass5: 11.5, bertscore: 0.63, modelSize: 60, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Doubao", date: "2025-08-02" },
            { id: 8, name: "LLaVA-Med-7B", resolved: 6.0, pass5: 13.0, bertscore: 0.69, modelSize: 220, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "OpenAI", date: "2025-08-07" },
            { id: 9, name: "RadFM-14B", resolved: 2.5, pass5: 6.0, bertscore: 0.67, modelSize: 180, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "OpenAI", date: "2025-08-07" },
            { id: 10, name: "Med-Flamingo-9B", resolved: 1.5, pass5: 10.0, bertscore: 0.66, modelSize: 130, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "OpenAI", date: "2025-08-07" },
            { id: 11, name: "HuatouGPT-7B", resolved: 3.0, pass5: 7.0, bertscore: 0.68, modelSize: 160, version: "1.0.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Huatuo", date: "2025-08-07" },
            { id: 12, name: "MedGemma-27B-it", resolved: 6.5, pass5: 18.0, bertscore: 0.77, modelSize: 75, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Moonshot AI", date: "2025-08-07" },
            { id: 13, name: "Claude 4 Sonnet", resolved: 10.5, pass5: 15.5, bertscore: 0.75, modelSize: 75, version: "1.7.0", logs: true, trajs: true, new: true, verified: true, Accuracy_Pass5: "Moonshot AI", date: "2025-08-07" },
        ]
    },
    "2.0": {            //这里是2.0的预存接口，可以写好代码放在这里，实际上和dataset那一栏一样，写一个“我们正在来的路上”
        verified: [
            { id: 1, name: "GPT-4o (20250326)", resolved: 61.20, pass5: 83.50, modelSize: 90, version: "1.5.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "OpenAI", date: "2024-06-15" },
            { id: 2, name: "Gemini 2.5-Flash", resolved: 59.80, pass5: 82.10, modelSize: 85, version: "1.0.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "Anthropic", date: "2024-05-20" },
            { id: 3, name: "Gemini Pro (20240215)", resolved: 56.40, pass5: 79.30, modelSize: 78, version: "1.0.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "Google", date: "2024-04-10" },
            { id: 4, name: "Claude 3 Sonnet (20240228)", resolved: 54.70, pass5: 77.60, modelSize: 65, version: "1.0.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "Anthropic", date: "2024-05-20" },
            { id: 5, name: "GPT-4o (20240513)", resolved: 53.20, pass5: 76.20, modelSize: 80, version: "1.6.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "OpenAI", date: "2024-06-15" },
        ],
        lite: [
            { id: 1, name: "GPT-4 (20240328)", resolved: 58.30, pass5: 81.20, bertscore: 0.85, modelSize: 90, version: "1.5.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "OpenAI", date: "2024-06-15" },
            { id: 2, name: "Claude 3 Opus (20240228)", resolved: 56.70, pass5: 79.80, bertscore: 0.84, modelSize: 85, version: "1.0.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "Anthropic", date: "2024-05-20" },
            { id: 3, name: "Gemini Pro (20240215)", resolved: 52.90, pass5: 76.50, bertscore: 0.82, modelSize: 78, version: "1.0.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "Google", date: "2024-04-10" },
            { id: 4, name: "Claude 3 Sonnet (20240228)", resolved: 51.20, pass5: 74.90, bertscore: 0.81, modelSize: 65, version: "1.0.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "Anthropic", date: "2024-05-20" },
            { id: 5, name: "GPT-4o (20240513)", resolved: 49.80, pass5: 73.50, bertscore: 0.80, modelSize: 80, version: "1.6.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "OpenAI", date: "2024-06-15" },
        ],
        multimodal: [
            { id: 1, name: "GPT-4o (20240513)", resolved: 54.60, pass5: 77.80, bertscore: 0.83, modelSize: 80, version: "1.6.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "OpenAI", date: "2024-06-15" },
            { id: 2, name: "Gemini Pro (20240215)", resolved: 51.80, pass5: 75.10, bertscore: 0.81, modelSize: 78, version: "1.0.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "Google", date: "2024-04-10" },
            { id: 3, name: "Claude 3 Opus (20240228)", resolved: 49.30, pass5: 72.60, bertscore: 0.80, modelSize: 85, version: "1.0.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "Anthropic", date: "2024-05-20" },
            { id: 4, name: "GPT-4 (20240328)", resolved: 47.50, pass5: 70.80, bertscore: 0.79, modelSize: 90, version: "1.5.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "OpenAI", date: "2024-06-15" },
            { id: 5, name: "Claude 3 Sonnet (20240228)", resolved: 45.20, pass5: 68.50, bertscore: 0.77, modelSize: 65, version: "1.0.0", logs: true, trajs: true, new: false, verified: true, Accuracy_Pass5: "Anthropic", date: "2024-05-20" },
        ]
    }
};
