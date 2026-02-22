const MODEL_DATA = [
    {
        name: 'GPT-5.2 Pro',
        vendor: 'OpenAI',
        mmlu: 88.7,
        gpqa: 93.2,
        humaneval: 92.1,
        swebench: 65.8,
        math: 94.2,
        simplebench: 60.5,
        elo: 1402,
        costOutput: 30,
        color: '#22c55e'
    },
    {
        name: 'Claude Opus 4.6',
        vendor: 'Anthropic',
        mmlu: 88.2,
        gpqa: 89.0,
        humaneval: 91.8,
        swebench: 72.5,
        math: 93.5,
        simplebench: 67.6,
        elo: 1398,
        costOutput: 75,
        color: '#f59e0b'
    },
    {
        name: 'Gemini 3 Pro',
        vendor: 'Google',
        mmlu: 89.8,
        gpqa: 87.5,
        humaneval: 90.5,
        swebench: 63.2,
        math: 92.8,
        simplebench: 75.2,
        elo: 1389,
        costOutput: 20,
        color: '#38bdf8'
    },
    {
        name: 'Grok 4 Heavy',
        vendor: 'xAI',
        mmlu: 86.4,
        gpqa: 88.9,
        humaneval: 89.2,
        swebench: 61.0,
        math: 91.5,
        simplebench: 58.3,
        elo: 1375,
        costOutput: 25,
        color: '#a855f7'
    },
    {
        name: 'Claude Opus 4.5',
        vendor: 'Anthropic',
        mmlu: 87.1,
        gpqa: 86.5,
        humaneval: 90.8,
        swebench: 68.4,
        math: 92.1,
        simplebench: 62.0,
        elo: 1370,
        costOutput: 75,
        color: '#f97316'
    },
    {
        name: 'GPT-5',
        vendor: 'OpenAI',
        mmlu: 86.8,
        gpqa: 85.3,
        humaneval: 91.0,
        swebench: 58.5,
        math: 91.8,
        simplebench: 55.2,
        elo: 1358,
        costOutput: 15,
        color: '#06b6d4'
    },
    {
        name: 'DeepSeek V3.2',
        vendor: 'DeepSeek',
        mmlu: 85.5,
        gpqa: 82.1,
        humaneval: 90.2,
        swebench: 77.8,
        math: 93.0,
        simplebench: 52.8,
        elo: 1345,
        costOutput: 1.1,
        color: '#f43f5e'
    },
    {
        name: 'Gemini 2.5 Pro',
        vendor: 'Google',
        mmlu: 84.0,
        gpqa: 81.2,
        humaneval: 88.5,
        swebench: 55.3,
        math: 90.2,
        simplebench: 62.4,
        elo: 1335,
        costOutput: 10,
        color: '#10b981'
    },
    {
        name: 'Claude Sonnet 4.6',
        vendor: 'Anthropic',
        mmlu: 83.5,
        gpqa: 80.8,
        humaneval: 89.5,
        swebench: 62.1,
        math: 88.7,
        simplebench: 56.5,
        elo: 1328,
        costOutput: 15,
        color: '#eab308'
    },
    {
        name: 'Llama 4 405B',
        vendor: 'Meta',
        mmlu: 82.1,
        gpqa: 78.5,
        humaneval: 86.8,
        swebench: 48.2,
        math: 87.5,
        simplebench: 49.0,
        elo: 1310,
        costOutput: 0,
        color: '#64748b'
    },
    {
        name: 'Mistral Large 3',
        vendor: 'Mistral',
        mmlu: 80.5,
        gpqa: 76.2,
        humaneval: 85.0,
        swebench: 45.5,
        math: 85.2,
        simplebench: 47.5,
        elo: 1295,
        costOutput: 6,
        color: '#8b5cf6'
    },
    {
        name: 'Claude Haiku 4.5',
        vendor: 'Anthropic',
        mmlu: 78.2,
        gpqa: 72.0,
        humaneval: 84.5,
        swebench: 42.0,
        math: 82.0,
        simplebench: 44.2,
        elo: 1275,
        costOutput: 5,
        color: '#ec4899'
    }
];

const BENCHMARKS = {
    overall: {
        title: '종합 순위 비교',
        desc: '주요 AI 모델들의 종합 벤치마크 점수를 비교합니다',
        key: null,
        unit: 'Elo'
    },
    mmlu: {
        title: 'MMLU-Pro 점수 비교',
        desc: '다분야 지식 및 추론 능력 평가 (Massive Multitask Language Understanding)',
        key: 'mmlu',
        unit: '%'
    },
    gpqa: {
        title: 'GPQA Diamond 점수 비교',
        desc: '대학원 수준의 전문 과학 질의응답 성능 평가',
        key: 'gpqa',
        unit: '%'
    },
    humaneval: {
        title: 'HumanEval 점수 비교',
        desc: '코드 생성 능력 평가 (Python 함수 생성 정확도)',
        key: 'humaneval',
        unit: '%'
    },
    swebench: {
        title: 'SWE-Bench Verified 점수 비교',
        desc: '실제 GitHub 이슈 해결 능력 (소프트웨어 엔지니어링)',
        key: 'swebench',
        unit: '%'
    },
    math: {
        title: 'MATH 벤치마크 점수 비교',
        desc: '수학 경시대회 수준의 문제 해결 능력 평가',
        key: 'math',
        unit: '%'
    },
    simplebench: {
        title: 'SimpleBench 점수 비교',
        desc: '상식적 추론 능력 평가 (Common-Sense Reasoning)',
        key: 'simplebench',
        unit: '%'
    }
};

const CHART_DEFAULTS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: {
                color: '#9898a8',
                font: { family: 'Inter', size: 12, weight: 500 },
                padding: 16,
                usePointStyle: true,
                pointStyleWidth: 10
            }
        },
        tooltip: {
            backgroundColor: '#1c1c28',
            titleColor: '#f0f0f5',
            bodyColor: '#9898a8',
            borderColor: '#2a2a3a',
            borderWidth: 1,
            cornerRadius: 10,
            padding: 14,
            titleFont: { family: 'Inter', size: 13, weight: 700 },
            bodyFont: { family: 'Inter', size: 12 },
            displayColors: true,
            boxPadding: 6
        }
    }
};

let mainChart = null;
let radarChart = null;
let timelineChart = null;
let bubbleChart = null;
let currentBenchmark = 'overall';
let currentChartType = 'bar';
let selectedModels = [0, 1, 2, 3, 4];

function getScoreClass(score, maxScore) {
    const ratio = score / maxScore;
    if (ratio >= 0.92) return 'score-high';
    if (ratio >= 0.80) return 'score-mid';
    return 'score-low';
}

function initMainChart() {
    const ctx = document.getElementById('mainChart').getContext('2d');
    updateMainChart(ctx);
}

function updateMainChart(ctx) {
    if (mainChart) mainChart.destroy();

    const benchmark = BENCHMARKS[currentBenchmark];
    const sorted = [...MODEL_DATA].sort((a, b) => {
        if (benchmark.key) return b[benchmark.key] - a[benchmark.key];
        return b.elo - a.elo;
    });

    const labels = sorted.map(m => m.name);
    const data = sorted.map(m => benchmark.key ? m[benchmark.key] : m.elo);
    const colors = sorted.map(m => m.color);

    document.getElementById('chartTitle').textContent = benchmark.title;
    document.getElementById('chartDescription').textContent = benchmark.desc;

    if (currentChartType === 'radar') {
        mainChart = new Chart(ctx || document.getElementById('mainChart'), {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: benchmark.title,
                    data: data,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.15)',
                    borderWidth: 2,
                    pointBackgroundColor: colors,
                    pointBorderColor: colors,
                    pointRadius: 5,
                    pointHoverRadius: 8
                }]
            },
            options: {
                ...CHART_DEFAULTS,
                scales: {
                    r: {
                        grid: { color: 'rgba(42, 42, 58, 0.5)' },
                        angleLines: { color: 'rgba(42, 42, 58, 0.5)' },
                        pointLabels: {
                            color: '#9898a8',
                            font: { family: 'Inter', size: 10, weight: 500 }
                        },
                        ticks: {
                            color: '#6a6a7a',
                            backdropColor: 'transparent',
                            font: { size: 10 }
                        }
                    }
                },
                plugins: {
                    ...CHART_DEFAULTS.plugins,
                    legend: { display: false }
                }
            }
        });
    } else if (currentChartType === 'polar') {
        mainChart = new Chart(ctx || document.getElementById('mainChart'), {
            type: 'polarArea',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.map(c => c + '55'),
                    borderColor: colors,
                    borderWidth: 2
                }]
            },
            options: {
                ...CHART_DEFAULTS,
                scales: {
                    r: {
                        grid: { color: 'rgba(42, 42, 58, 0.5)' },
                        ticks: {
                            color: '#6a6a7a',
                            backdropColor: 'transparent',
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    } else {
        const maxVal = Math.max(...data);
        mainChart = new Chart(ctx || document.getElementById('mainChart'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: benchmark.key ? `${benchmark.title} (${benchmark.unit})` : 'Chatbot Arena Elo',
                    data: data,
                    backgroundColor: colors.map(c => c + '88'),
                    borderColor: colors,
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                    barPercentage: 0.7,
                    categoryPercentage: 0.85
                }]
            },
            options: {
                ...CHART_DEFAULTS,
                indexAxis: 'y',
                scales: {
                    x: {
                        grid: { color: 'rgba(42, 42, 58, 0.3)', drawBorder: false },
                        ticks: {
                            color: '#6a6a7a',
                            font: { family: 'Inter', size: 11 },
                            callback: v => benchmark.key ? `${v}%` : v
                        },
                        min: benchmark.key ? Math.max(0, Math.min(...data) - 10) : Math.min(...data) - 50
                    },
                    y: {
                        grid: { display: false },
                        ticks: {
                            color: '#f0f0f5',
                            font: { family: 'Inter', size: 12, weight: 600 },
                            padding: 8
                        }
                    }
                },
                plugins: {
                    ...CHART_DEFAULTS.plugins,
                    legend: { display: false },
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        color: '#f0f0f5',
                        font: { family: 'Inter', size: 11, weight: 700 },
                        formatter: v => benchmark.key ? `${v}%` : v,
                        padding: { left: 8 }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }
}

function initRadarChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    updateRadarChart(ctx);
}

function updateRadarChart(ctx) {
    if (radarChart) radarChart.destroy();

    const benchmarkKeys = ['mmlu', 'gpqa', 'humaneval', 'swebench', 'math', 'simplebench'];
    const benchmarkLabels = ['MMLU-Pro', 'GPQA Diamond', 'HumanEval', 'SWE-Bench', 'MATH', 'SimpleBench'];

    const datasets = selectedModels.map(idx => {
        const model = MODEL_DATA[idx];
        return {
            label: model.name,
            data: benchmarkKeys.map(k => model[k]),
            borderColor: model.color,
            backgroundColor: model.color + '18',
            borderWidth: 2.5,
            pointBackgroundColor: model.color,
            pointBorderColor: model.color,
            pointRadius: 4,
            pointHoverRadius: 7
        };
    });

    radarChart = new Chart(ctx || document.getElementById('radarChart'), {
        type: 'radar',
        data: { labels: benchmarkLabels, datasets },
        options: {
            ...CHART_DEFAULTS,
            scales: {
                r: {
                    grid: { color: 'rgba(42, 42, 58, 0.5)' },
                    angleLines: { color: 'rgba(42, 42, 58, 0.5)' },
                    pointLabels: {
                        color: '#f0f0f5',
                        font: { family: 'Inter', size: 12, weight: 600 },
                        padding: 16
                    },
                    ticks: {
                        color: '#6a6a7a',
                        backdropColor: 'transparent',
                        font: { size: 10 },
                        stepSize: 10
                    },
                    suggestedMin: 40,
                    suggestedMax: 100
                }
            },
            plugins: {
                ...CHART_DEFAULTS.plugins,
                legend: {
                    ...CHART_DEFAULTS.plugins.legend,
                    position: 'bottom'
                }
            }
        }
    });
}

function initTimelineChart() {
    const ctx = document.getElementById('timelineChart').getContext('2d');

    const timelineData = {
        labels: ['2023 Q1', '2023 Q3', '2024 Q1', '2024 Q3', '2025 Q1', '2025 Q3', '2026 Q1'],
        datasets: [
            {
                label: 'OpenAI (GPT 시리즈)',
                data: [70.2, 78.5, 83.1, 85.8, 86.8, 87.5, 88.7],
                borderColor: '#22c55e',
                backgroundColor: '#22c55e22',
                borderWidth: 2.5,
                pointRadius: 5,
                pointHoverRadius: 8,
                tension: 0.3,
                fill: false
            },
            {
                label: 'Anthropic (Claude 시리즈)',
                data: [65.8, 73.2, 78.5, 82.0, 85.5, 87.1, 88.2],
                borderColor: '#f59e0b',
                backgroundColor: '#f59e0b22',
                borderWidth: 2.5,
                pointRadius: 5,
                pointHoverRadius: 8,
                tension: 0.3,
                fill: false
            },
            {
                label: 'Google (Gemini 시리즈)',
                data: [62.5, 68.0, 74.5, 80.2, 84.0, 87.0, 89.8],
                borderColor: '#38bdf8',
                backgroundColor: '#38bdf822',
                borderWidth: 2.5,
                pointRadius: 5,
                pointHoverRadius: 8,
                tension: 0.3,
                fill: false
            },
            {
                label: 'Meta (Llama 시리즈)',
                data: [45.0, 55.0, 62.0, 68.5, 75.0, 79.5, 82.1],
                borderColor: '#64748b',
                backgroundColor: '#64748b22',
                borderWidth: 2.5,
                pointRadius: 5,
                pointHoverRadius: 8,
                tension: 0.3,
                fill: false
            },
            {
                label: 'DeepSeek',
                data: [null, null, 50.0, 62.0, 72.0, 80.5, 85.5],
                borderColor: '#f43f5e',
                backgroundColor: '#f43f5e22',
                borderWidth: 2.5,
                pointRadius: 5,
                pointHoverRadius: 8,
                tension: 0.3,
                fill: false,
                spanGaps: true
            }
        ]
    };

    timelineChart = new Chart(ctx, {
        type: 'line',
        data: timelineData,
        options: {
            ...CHART_DEFAULTS,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    grid: { color: 'rgba(42, 42, 58, 0.3)' },
                    ticks: {
                        color: '#9898a8',
                        font: { family: 'Inter', size: 11, weight: 500 }
                    }
                },
                y: {
                    grid: { color: 'rgba(42, 42, 58, 0.3)' },
                    ticks: {
                        color: '#9898a8',
                        font: { family: 'Inter', size: 11 },
                        callback: v => `${v}%`
                    },
                    suggestedMin: 40,
                    suggestedMax: 95
                }
            },
            plugins: {
                ...CHART_DEFAULTS.plugins,
                legend: {
                    ...CHART_DEFAULTS.plugins.legend,
                    position: 'bottom'
                }
            }
        }
    });
}

function initBubbleChart() {
    const ctx = document.getElementById('bubbleChart').getContext('2d');

    const costModels = MODEL_DATA.filter(m => m.costOutput > 0);
    const datasets = costModels.map(m => {
        const avgScore = (m.mmlu + m.gpqa + m.humaneval + m.math + m.simplebench) / 5;
        return {
            label: m.name,
            data: [{
                x: m.costOutput,
                y: avgScore,
                r: Math.max(m.swebench / 5, 6)
            }],
            backgroundColor: m.color + '66',
            borderColor: m.color,
            borderWidth: 2,
            hoverBackgroundColor: m.color + 'aa'
        };
    });

    bubbleChart = new Chart(ctx, {
        type: 'bubble',
        data: { datasets },
        options: {
            ...CHART_DEFAULTS,
            scales: {
                x: {
                    type: 'logarithmic',
                    grid: { color: 'rgba(42, 42, 58, 0.3)' },
                    ticks: {
                        color: '#9898a8',
                        font: { family: 'Inter', size: 11 },
                        callback: v => `$${v}`
                    },
                    title: {
                        display: true,
                        text: '출력 비용 ($/1M tokens, 로그 스케일)',
                        color: '#9898a8',
                        font: { family: 'Inter', size: 12, weight: 600 }
                    }
                },
                y: {
                    grid: { color: 'rgba(42, 42, 58, 0.3)' },
                    ticks: {
                        color: '#9898a8',
                        font: { family: 'Inter', size: 11 },
                        callback: v => `${v}%`
                    },
                    title: {
                        display: true,
                        text: '평균 벤치마크 점수',
                        color: '#9898a8',
                        font: { family: 'Inter', size: 12, weight: 600 }
                    },
                    suggestedMin: 70,
                    suggestedMax: 92
                }
            },
            plugins: {
                ...CHART_DEFAULTS.plugins,
                legend: {
                    ...CHART_DEFAULTS.plugins.legend,
                    position: 'bottom'
                },
                tooltip: {
                    ...CHART_DEFAULTS.plugins.tooltip,
                    callbacks: {
                        label: (context) => {
                            const model = costModels[context.datasetIndex];
                            return [
                                `${model.name}`,
                                `출력 비용: $${model.costOutput}/1M tokens`,
                                `평균 점수: ${context.parsed.y.toFixed(1)}%`,
                                `SWE-Bench: ${model.swebench}%`
                            ];
                        }
                    }
                }
            }
        }
    });
}

function initDataTable() {
    const tbody = document.getElementById('tableBody');

    const sorted = [...MODEL_DATA].sort((a, b) => b.elo - a.elo);

    const allScores = {
        mmlu: sorted.map(m => m.mmlu),
        gpqa: sorted.map(m => m.gpqa),
        humaneval: sorted.map(m => m.humaneval),
        swebench: sorted.map(m => m.swebench),
        math: sorted.map(m => m.math),
        simplebench: sorted.map(m => m.simplebench)
    };
    const maxScores = {};
    for (const key of Object.keys(allScores)) {
        maxScores[key] = Math.max(...allScores[key]);
    }

    tbody.innerHTML = sorted.map((m, i) => {
        const rank = i + 1;
        let rankClass = '';
        if (rank <= 3) rankClass = `rank-${rank}`;

        const scoreCell = (val, key) => {
            const cls = getScoreClass(val, maxScores[key]);
            const isMax = val === maxScores[key];
            return `<td class="${cls}">${val}%${isMax ? ' ★' : ''}</td>`;
        };

        return `<tr>
            <td><span class="rank-badge ${rankClass}">${rank}</span></td>
            <td style="color:${m.color};font-weight:700">${m.name}</td>
            <td>${m.vendor}</td>
            ${scoreCell(m.mmlu, 'mmlu')}
            ${scoreCell(m.gpqa, 'gpqa')}
            ${scoreCell(m.humaneval, 'humaneval')}
            ${scoreCell(m.swebench, 'swebench')}
            ${scoreCell(m.math, 'math')}
            ${scoreCell(m.simplebench, 'simplebench')}
            <td style="font-weight:700;color:var(--accent-light)">${m.elo}</td>
        </tr>`;
    }).join('');
}

function initModelSelector() {
    const container = document.getElementById('modelSelector');
    container.innerHTML = MODEL_DATA.map((m, i) => {
        const active = selectedModels.includes(i) ? 'active' : '';
        return `<button class="model-chip ${active}" data-index="${i}">
            <span class="dot" style="background:${m.color}"></span>
            ${m.name}
        </button>`;
    }).join('');

    container.querySelectorAll('.model-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            if (selectedModels.includes(idx)) {
                if (selectedModels.length > 2) {
                    selectedModels = selectedModels.filter(i => i !== idx);
                    btn.classList.remove('active');
                }
            } else {
                if (selectedModels.length < 6) {
                    selectedModels.push(idx);
                    btn.classList.add('active');
                }
            }
            updateRadarChart();
        });
    });
}

function setupEventListeners() {
    document.querySelectorAll('#benchmarkTabs .tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('#benchmarkTabs .tab.active').classList.remove('active');
            tab.classList.add('active');
            currentBenchmark = tab.dataset.benchmark;
            updateMainChart();
        });
    });

    document.querySelectorAll('.chart-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.chart-toggle.active').classList.remove('active');
            btn.classList.add('active');
            currentChartType = btn.dataset.type;
            updateMainChart();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    Chart.defaults.font.family = 'Inter';

    initMainChart();
    initRadarChart();
    initTimelineChart();
    initBubbleChart();
    initDataTable();
    initModelSelector();
    setupEventListeners();
});
