# AI 모델 성능 비교 그래프

주요 AI 모델들의 벤치마크 성능을 비교하는 인터랙티브 그래프 페이지입니다.

## 비교 대상 모델

| 모델 | 개발사 | 출시 시기 |
|------|--------|-----------|
| GPT-4o | OpenAI | 2024 |
| GPT-4.5 | OpenAI | 2025 |
| Claude 3.5 Sonnet | Anthropic | 2024 |
| Claude 3.5 Opus | Anthropic | 2025 |
| Gemini 2.0 Pro | Google | 2025 |
| Gemini 2.0 Ultra | Google | 2025 |
| Llama 3.1 405B | Meta | 2024 |
| DeepSeek-V3 | DeepSeek | 2025 |
| Grok-3 | xAI | 2025 |
| Mistral Large 2 | Mistral AI | 2024 |

## 벤치마크 항목

### 1. 전체 비교
- **MMLU** — 다양한 학문 분야의 지식 평가
- **HumanEval** — 코드 생성 능력 평가
- **MATH** — 수학 문제 해결 능력
- **GPQA** — 대학원 수준 과학 문제
- **ARC-Challenge** — 과학적 추론 능력
- **HellaSwag** — 상식 추론 능력

### 2. 추론 능력
GPQA, ARC-Challenge, HellaSwag, WinoGrande, BoolQ

### 3. 코딩 능력
HumanEval, MBPP, CodeContests, SWE-bench, LiveCodeBench

### 4. 수학 능력
MATH, GSM8K, MGSM, MathVista, Minerva MATH

### 5. 언어 이해
MMLU, MMLU-Pro, TriviaQA, NaturalQA, DROP

## 인터랙티브 그래프

아래 링크를 통해 인터랙티브 그래프를 확인할 수 있습니다:

- [AI 성능 비교 그래프 (HTML)](ai-comparison-graph.html)

## 주요 분석 결과

1. **Gemini 2.0 Ultra**가 대부분의 벤치마크에서 가장 높은 점수를 기록
2. **Claude 3.5 Opus**가 코딩 벤치마크(SWE-bench, LiveCodeBench)에서 특히 강세
3. **DeepSeek-V3**가 비용 대비 성능(가성비)에서 압도적 우위
4. **GPT-4.5**는 추론과 언어 이해 분야에서 균형 잡힌 성능 제공
5. 오픈소스 모델(**Llama 3.1 405B**)도 상업 모델과의 격차를 빠르게 좁히는 중

## 참고

- 벤치마크 점수는 각 모델의 공식 기술 보고서 및 공개 벤치마크 결과를 기준으로 합니다.
- 실제 사용 환경에서의 성능은 벤치마크 점수와 다를 수 있습니다.
- 데이터 기준: 2025-2026년
