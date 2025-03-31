import requests
from bs4 import BeautifulSoup
import json
import xml.etree.ElementTree as ET

SITEMAP_URL = "https://able.co/sitemap.xml"

def get_sitemap_urls(sitemap_url):
    """Fetches URLs from the sitemap."""
    response = requests.get(sitemap_url)
    if response.status_code != 200:
        print("Failed to fetch the sitemap")
        return []

    root = ET.fromstring(response.text)
    namespaces = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}  # Handle namespace if present
    urls = [elem.text for elem in root.findall(".//ns:loc", namespaces)]
    return urls

def scrape_page_text(url):
    """Scrapes all visible text from a webpage."""
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to fetch {url}")
        return ""

    soup = BeautifulSoup(response.text, "html.parser")
    return soup.get_text(separator="\n", strip=True)  # Extract all visible text

def scrape_able_website():
    """Scrapes all pages listed in the sitemap."""
    urls = get_sitemap_urls(SITEMAP_URL)
    faqs = []

    for url in urls:
        print(f"Scraping: {url}")
        text = scrape_page_text(url)
        if text:
            faqs.append({"question": f"What is on the page {url}?", "answer": text})  # No character limit

    return faqs

def save_to_json(data, filepath="../data/able_faqs.json"):
    """Saves data to a JSON file."""
    with open(filepath, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)
    print(f"Saved {len(data)} pages to {filepath}")

def main():
    faqs = scrape_able_website()
    if faqs:
        save_to_json(faqs)

if __name__ == "__main__":
    main()
