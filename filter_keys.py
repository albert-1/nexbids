import re, json

with open('missing_all.json') as f:
    raw = json.load(f)

# Filter: only keys that are actual English phrases (not numbers, not Chinese, not page IDs, not short codes)
def needs_translation(k):
    if not k or len(k) < 3:
        return False
    # Skip if contains Chinese characters
    if re.search(r'[\u4e00-\u9fff]', k):
        return False
    # Skip if it's just numbers/symbols/percentages
    if re.match(r'^[\d\s%+\-<>$.,×/]+$', k):
        return False
    # Skip page IDs like 'products-dsp'
    if re.match(r'^[a-z-]+$', k):
        return False
    # Skip if already looks like a non-translatable code
    if k in ['Prebid.js', 'Kubernetes', 'OpenRTB 2.6 Native', 'iOS/Android/Unity',
             'San Francisco', 'Barcelona', 'London', 'Singapore', 'Tokyo', 'Dubai',
             'Beijing', 'San Francisco, CA', 'Barcelona, Spain', 'London, UK',
             'Tokyo, Japan', 'Beijing, China']:
        return False
    # Skip pure numeric/stat values
    if re.match(r'^[\d.,+\-<>%$×]+$', k.replace(' ', '')):
        return False
    # Skip years
    if re.match(r'^\d{4}$', k.strip()):
        return False
    # Skip garbled keys
    if k.startswith("'") or k.startswith(',') or 't Find What' in k or "t See a Role" in k:
        return False
    return True

filtered = {k: v for k, v in raw.items() if needs_translation(k)}
print(f"Keys needing translation: {len(filtered)}")
for k in filtered.keys():
    print(f"  {repr(k)}")

with open('need_translate.json', 'w', encoding='utf-8') as f:
    json.dump(filtered, f, ensure_ascii=False, indent=2)
