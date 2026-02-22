# AI 성능 비교 그래프

## 1. 개요

**AI 성능 비교 그래프**는 다양한 인공지능 모델의 성능을 시각적으로 비교하여 보여주는 도구입니다.  
LLM(Large Language Model), 이미지 생성 모델, 음성 인식 모델 등 다양한 AI 시스템의 벤치마크 결과를 한눈에 비교할 수 있게 해줍니다.

## 2. 주요 비교 지표

### 2.1 LLM(대규모 언어 모델) 성능 지표
* **MMLU** (Massive Multitask Language Understanding): 다양한 분야의 지식 이해도 평가
* **HumanEval**: 코드 생성 능력 평가
* **GSM8K**: 수학적 추론 능력 평가
* **TruthfulQA**: 사실적 정확도 평가
* **토큰 처리 속도**: 응답 생성 속도 (tokens/second)

### 2.2 이미지 생성 모델 지표
* **FID** (Fréchet Inception Distance): 이미지 품질 평가
* **CLIP Score**: 텍스트-이미지 일치도
* **생성 속도**: 이미지당 소요 시간

### 2.3 음성/멀티모달 지표
* **WER** (Word Error Rate): 음성 인식 정확도
* **BLEU/ROUGE**: 번역 및 요약 품질

## 3. 그래프 유형

### 3.1 레이더 차트 (Radar Chart)
* 여러 지표를 동시에 비교할 때 유용
* 모델별 강점/약점을 직관적으로 파악 가능

### 3.2 막대 그래프 (Bar Chart)
* 특정 벤치마크에서 모델별 점수 비교
* 가장 일반적으로 사용되는 시각화 방식

### 3.3 라인 차트 (Line Chart)
* 시간에 따른 모델 성능 향상 추이 분석
* 모델 버전별 성능 비교에 적합

### 3.4 산점도 (Scatter Plot)
* 성능 vs 비용, 속도 vs 정확도 등 2차원 비교
* 가성비 분석에 활용

## 4. 참고 자료

* [Chatbot Arena](https://chat.lmsys.org/) - LLM 실시간 비교 플랫폼
* [Hugging Face Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard) - 오픈소스 LLM 순위
* [Stanford HELM](https://crfm.stanford.edu/helm/) - 종합 AI 벤치마크

## 5. 활용 사례

* **모델 선정**: 프로젝트 요구사항에 맞는 AI 모델 선택
* **트렌드 분석**: AI 기술 발전 추이 파악
* **비용 최적화**: 성능 대비 비용 효율적인 모델 탐색
* **연구/개발**: 벤치마크 개선 목표 수립
