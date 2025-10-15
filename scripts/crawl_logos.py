import asyncio
import httpx
from urllib.parse import quote_plus
from selectolax.parser import HTMLParser
from pathlib import Path
from slugify import slugify
from tenacity import retry, stop_after_attempt, wait_exponential
from rapidfuzz import fuzz
import re
import filetype
import os
from PIL import Image
from io import BytesIO

SEARCH_ENGINES = [
    # Query templates return HTML with image blocks
    ("bing", "https://www.bing.com/images/search?q={query}&qft=+filterui:imagesize-large+filterui:photo-transparent+filterui:aspect-square&form=IRFLTR"),
    ("google", "https://www.google.com/search?tbm=isch&q={query}")
]

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/125.0 Safari/537.36"
    )
}

LOGO_HINT_KEYWORDS = [
    "logo", "로고", "CI", "BI", "symbol mark", "심볼", "엠블럼"
]

IMAGE_EXT_WHITELIST = {"jpg", "jpeg", "png", "webp"}

TRANSPARENT_BG_MIN_ALPHA_PIXELS = 64


def build_queries(company: str) -> list[str]:
    base = company.strip()
    variants = {base}
    # Remove legal suffixes
    variants.add(re.sub(r"[㈜\(\)주]|\s*주식회사", "", base).strip())
    # Add English hint
    queries = []
    for v in variants:
        if not v:
            continue
        for hint in LOGO_HINT_KEYWORDS:
            queries.append(f"{v} {hint}")
        queries.append(f"{v} corporate logo")
    return list(dict.fromkeys(queries))


def looks_like_logo_filename(url: str) -> bool:
    url_l = url.lower()
    return any(k in url_l for k in ["logo", "logotype", "ci", "bi"]) or any(
        k in url_l for k in ["/ci/", "/bi/", "/brand/"]
    )


def score_alt_text(text: str, company: str) -> int:
    text = text or ""
    base = fuzz.partial_ratio(company, text)
    hints = 10 if any(h in text.lower() for h in ["logo", "ci", "bi"]) else 0
    return base + hints


def is_preferred_ext(url: str) -> bool:
    ext = url.split("?")[0].split("#")[0].rsplit(".", 1)[-1].lower()
    return ext in IMAGE_EXT_WHITELIST


async def fetch_html(client: httpx.AsyncClient, url: str) -> str | None:
    try:
        r = await client.get(url, timeout=30)
        if r.status_code == 200:
            return r.text
    except Exception:
        return None
    return None


def extract_image_candidates(engine: str, html: str) -> list[dict]:
    doc = HTMLParser(html)
    imgs: list[dict] = []
    # Try multiple selectors
    for sel in [
        "img",
        "a.iusc img",
        "div[jscontroller] img",
    ]:
        for node in doc.css(sel):
            src = node.attributes.get("src") or node.attributes.get("data-src") or node.attributes.get("data-iurl")
            if not src or src.startswith("data:"):
                continue
            alt = node.attributes.get("alt", "")
            imgs.append({"url": src, "alt": alt})
    # Deduplicate by url
    uniq = {}
    for it in imgs:
        uniq[it["url"]] = it
    return list(uniq.values())


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=6))
async def download_image(client: httpx.AsyncClient, url: str) -> bytes | None:
    r = await client.get(url, headers=HEADERS, timeout=30, follow_redirects=True)
    if r.status_code == 200 and r.content:
        return r.content
    return None


def has_transparency(img: Image.Image) -> bool:
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        if img.mode != "RGBA":
            img = img.convert("RGBA")
        alpha = img.split()[-1]
        alpha_bytes = alpha.tobytes()
        # Count transparent-ish pixels
        count = sum(1 for a in alpha_bytes if a < 16)
        return count >= TRANSPARENT_BG_MIN_ALPHA_PIXELS
    return False


async def search_and_download(company: str, out_dir: Path, max_images: int = 3) -> list[Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    saved: list[Path] = []
    async with httpx.AsyncClient(headers=HEADERS) as client:
        queries = build_queries(company)
        candidates: list[dict] = []
        for engine, tmpl in SEARCH_ENGINES:
            for q in queries:
                url = tmpl.format(query=quote_plus(q))
                html = await fetch_html(client, url)
                if not html:
                    continue
                extracted = extract_image_candidates(engine, html)
                for e in extracted:
                    score = score_alt_text(e.get("alt", ""), company)
                    score += 8 if looks_like_logo_filename(e["url"]) else 0
                    score += 5 if is_preferred_ext(e["url"]) else 0
                    e["score"] = score
                candidates.extend(extracted)
        # Sort best-first
        candidates.sort(key=lambda x: x.get("score", 0), reverse=True)

        for cand in candidates:
            if len(saved) >= max_images:
                break
            url = cand["url"]
            try:
                data = await download_image(client, url)
                if not data:
                    continue
                kind = filetype.guess(data)
                ext = (kind.extension if kind and kind.extension in IMAGE_EXT_WHITELIST else "png")
                # Load and post-process
                img = Image.open(BytesIO(data))
                # Prefer square, keep transparency
                if img.mode not in ("RGBA", "LA"):
                    img = img.convert("RGBA")
                # Simple center crop to square
                w, h = img.size
                if w != h:
                    side = min(w, h)
                    left = (w - side) // 2
                    top = (h - side) // 2
                    img = img.crop((left, top, left + side, top + side))
                # Reject if not likely logo (no transparency and busy)
                if not has_transparency(img) and min(img.size) > 80:
                    # Heuristic: keep some opaque small icons, skip big photos
                    continue
                filename = f"{slugify(company)}_{len(saved)+1}.{ext}"
                path = out_dir / filename
                img.save(path)
                saved.append(path)
            except Exception:
                continue
    return saved


async def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--companies", type=str, default="/workspace/data/companies_kr.txt")
    parser.add_argument("--out", type=str, default="/workspace/resource/images/logos")
    parser.add_argument("--limit", type=int, default=3)
    parser.add_argument("--max-companies", type=int, default=0, help="0 for all")
    args = parser.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)
    with open(args.companies, "r", encoding="utf-8") as f:
        companies = [l.strip() for l in f if l.strip()]
    if args.max_companies > 0:
        companies = companies[: args.max_companies]

    all_saved = 0
    for c in companies:
        saved = await search_and_download(c, out_dir / slugify(c), max_images=args.limit)
        all_saved += len(saved)
        print(f"{c}: saved {len(saved)} images")

    print(f"Total images saved: {all_saved}")


if __name__ == "__main__":
    asyncio.run(main())
