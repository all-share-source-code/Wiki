import os
import re
import sys
import time
import json
import shutil
import random
from typing import List, Optional

import requests
from urllib.parse import quote

# Simple Bing Image Search (public web) without API key by scraping
# Note: For robust/large-scale usage, consider the official Bing API.

USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
]

HEADERS = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "accept-language": "ko,en;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
}

BING_URL = "https://www.bing.com/images/search?q={query}&qft=+filterui:imagesize-large+filterui:photo-photo&form=IRFLTR"

IMG_EXTS = (".png", ".jpg", ".jpeg", ".webp", ".svg")

# Heuristics to keep only logo-like images
LOGO_KEYWORDS = [
    "logo", "로고", "ci", "심볼", "symbol", "브랜드마크", "brand mark",
]

BLOCK_KEYWORDS = [
    "building", "현장", "공사", "인물", "지도", "map", "location", "현수막",
    "포스터", "행사", "event", "뉴스", "기사", "썸네일", "배경", "wallpaper",
]


def read_companies(path: str) -> List[str]:
    with open(path, "r", encoding="utf-8") as f:
        names = [line.strip() for line in f if line.strip()]
    return names


def search_bing_image_urls(query: string, max_results: int = 10) -> List[str]:
    # type: ignore[name-defined]
    # Using string type annotation above intentionally causes mypy ignore in some environments.
    url = BING_URL.format(query=quote(query))
    headers = dict(HEADERS)
    headers["user-agent"] = random.choice(USER_AGENTS)

    resp = requests.get(url, headers=headers, timeout=20)
    resp.raise_for_status()
    html = resp.text

    # Extract murl or mediaurl entries from JSON blobs in Bing image results
    # Common patterns: "murl":"https://..."  or  "mediaurl":"https://..."
    urls = set()
    for key in ("murl", "mediaurl"):
        pattern = re.compile(rf'"{key}":\"(http[^\"]+)\"')
        for m in pattern.finditer(html):
            u = m.group(1)
            # Basic filtering: keep image file extensions
            if any(u.lower().split("?")[0].endswith(ext) for ext in IMG_EXTS):
                urls.add(u)
    return list(urls)[:max_results]


def likely_logo(url: str, query: str) -> bool:
    q = query.lower()
    u = url.lower()
    # must include some logo keyword either in url or query-expanded
    if not (any(k in u for k in LOGO_KEYWORDS) or any(k in q for k in LOGO_KEYWORDS)):
        return False
    if any(b in u for b in BLOCK_KEYWORDS):
        return False
    # Prefer svg/png over photos
    if u.endswith(".svg"):
        return True
    if u.endswith(".png") and ("logo" in u or "ci" in u):
        return True
    return True


def download_image(url: str, dest_path: str) -> bool:
    try:
        headers = dict(HEADERS)
        headers["user-agent"] = random.choice(USER_AGENTS)
        with requests.get(url, headers=headers, stream=True, timeout=25) as r:
            r.raise_for_status()
            with open(dest_path, "wb") as f:
                shutil.copyfileobj(r.raw, f)
        return True
    except Exception:
        return False


def sanitize_filename(name: str) -> str:
    s = re.sub(r"[\\/:*?\"<>|]", "_", name)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def crawl_logos(companies: List[str], out_dir: str, per_company: int = 5, delay: float = 1.0) -> None:
    os.makedirs(out_dir, exist_ok=True)
    for company in companies:
        query = f"{company} 로고"
        all_urls = search_bing_image_urls(query, max_results=50)
        # Filter likely logos
        filtered = [u for u in all_urls if likely_logo(u, query)]
        save_count = 0
        base = sanitize_filename(company)
        company_dir = os.path.join(out_dir, base)
        os.makedirs(company_dir, exist_ok=True)
        for idx, url in enumerate(filtered):
            ext = os.path.splitext(url.split("?")[0])[1].lower()
            if ext not in IMG_EXTS:
                ext = ".jpg"
            dest = os.path.join(company_dir, f"{base}_{idx+1}{ext}")
            if download_image(url, dest):
                save_count += 1
            if save_count >= per_company:
                break
        print(f"{company}: saved {save_count} logos")
        time.sleep(delay)


def main():
    if len(sys.argv) < 3:
        print("Usage: python scripts/logo_crawler.py <companies.txt> <out_dir> [per_company]", file=sys.stderr)
        sys.exit(2)
    companies_file = sys.argv[1]
    out_dir = sys.argv[2]
    per_company = int(sys.argv[3]) if len(sys.argv) >= 4 else 5
    companies = read_companies(companies_file)
    crawl_logos(companies, out_dir, per_company=per_company)


if __name__ == "__main__":
    main()
