#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AIP_HW.txt 파일 분석 프로그램
- 이메일과 URL 추출
- 영어 단어 빈도 분석
"""

import re
import collections
from collections import Counter

def read_file(filename):
    """파일을 읽어서 내용을 반환"""
    try:
        with open(filename, 'r', encoding='utf-8') as file:
            content = file.read()
        return content
    except FileNotFoundError:
        print(f"파일 {filename}을 찾을 수 없습니다.")
        return None
    except Exception as e:
        print(f"파일 읽기 중 오류 발생: {e}")
        return None

def extract_emails(text):
    """정규표현식을 사용하여 이메일 주소 추출"""
    # 이메일 패턴: 알파벳, 숫자, 점, 하이픈, 언더스코어로 구성된 사용자명 + @ + 도메인
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    emails = re.findall(email_pattern, text)
    return emails

def extract_urls(text):
    """정규표현식을 사용하여 URL 추출"""
    # URL 패턴: http/https로 시작하거나 도메인.확장자 형태
    url_pattern = r'(?:https?://)?(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?'
    urls = re.findall(url_pattern, text)
    
    # 필터링: 실제 URL 형태만 남기기
    filtered_urls = []
    seen = set()  # 중복 제거용
    
    for url in urls:
        # http로 시작하거나 도메인.확장자 형태인 것만 포함
        if url.startswith('http') or '.' in url:
            # 불필요한 문자 제거
            url = url.rstrip('.,;:!?)')
            if len(url) > 3:  # 최소 길이 체크
                # 중복 제거
                if url not in seen:
                    filtered_urls.append(url)
                    seen.add(url)
    
    return filtered_urls

def extract_english_words(text):
    """영어 단어만 추출"""
    # 영어 단어 패턴 (최소 2글자 이상)
    word_pattern = r'\b[a-zA-Z]{2,}\b'
    words = re.findall(word_pattern, text)
    return words

def remove_stopwords(words, stopwords):
    """불용어 제거"""
    filtered_words = []
    for word in words:
        if word.lower() not in stopwords:
            filtered_words.append(word.lower())
    return filtered_words

def analyze_word_frequency(words, top_n=5):
    """단어 빈도 분석"""
    word_count = Counter(words)
    return word_count.most_common(top_n)

def main():
    # 파일 읽기
    filename = "AIP_HW.txt"
    content = read_file(filename)
    
    if content is None:
        return
    
    # 1. 이메일 추출
    emails = extract_emails(content)
    
    # 2. URL 추출
    urls = extract_urls(content)
    
    # 3. 불용어 목록 생성 (추출된 이메일과 URL)
    stopwords = set()
    
    # 이메일에서 불용어 추출
    for email in emails:
        # @ 앞부분과 @ 뒷부분을 분리
        parts = email.split('@')
        if len(parts) == 2:
            stopwords.add(parts[0].lower())  # 사용자명
            domain_parts = parts[1].split('.')
            for part in domain_parts:
                if len(part) > 1:  # 1글자 단어 제외
                    stopwords.add(part.lower())
    
    # URL에서 불용어 추출
    for url in urls:
        # 도메인 부분만 추출
        if '://' in url:
            domain = url.split('://')[1]
        else:
            domain = url
        
        # 경로 제거
        if '/' in domain:
            domain = domain.split('/')[0]
        
        # 도메인을 점으로 분리
        domain_parts = domain.split('.')
        for part in domain_parts:
            if len(part) > 1:  # 1글자 단어 제외
                stopwords.add(part.lower())
    
    # 4. 영어 단어 추출 및 빈도 분석
    english_words = extract_english_words(content)
    filtered_words = remove_stopwords(english_words, stopwords)
    
    # 5. 단어 빈도 분석
    word_freq = analyze_word_frequency(filtered_words, 5)
    
    # 결과 출력
    print("[제거할 이메일과 사이트]")
    print(f"이메일 {len(emails)}개 추출")
    for email in emails:
        print(f"- {email}")
    
    print(f"사이트 {len(urls)}개 추출")
    for url in urls:
        print(f"- {url}")
    
    print(f"\n영어 단어 빈도 상위 5개:")
    for i, (word, count) in enumerate(word_freq, 1):
        print(f"{i}. {word}: {count}회")

if __name__ == "__main__":
    main()