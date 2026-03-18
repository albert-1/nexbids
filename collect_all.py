import re, json

with open('app.js') as f:
    code = f.read()

ct_start = code.find('const CONTENT_T = {')
ct_end = code.find('\n};', ct_start) + 3
ct_block = code[ct_start:ct_end]
ct_keys = set(re.findall(r"'((?:[^'\\]|\\.)+)':\s*\{", ct_block))

missing = {}  # en -> zh

# 1. Direct t('en', 'zh') calls
pairs = re.findall(r"\bt\('((?:[^'\\]|\\.)+?)'\s*,\s*'((?:[^'\\]|\\.)*?)'", code)
for en, zh in pairs:
    if en and en not in ct_keys and 'c.title' not in en and '+' not in en[:10]:
        missing[en] = zh

# 2. sectionTag('en', 'zh') calls  
st_pairs = re.findall(r"sectionTag\('((?:[^'\\]|\\.)+?)'\s*,\s*'((?:[^'\\]|\\.)*?)'", code)
for en, zh in st_pairs:
    if en and en not in ct_keys:
        missing[en] = zh

# 3. metricsBand items: [num, 'en', 'zh']
mb_items = re.findall(r"\['[^']*'\s*,\s*'((?:[^'\\]|\\.)+?)'\s*,\s*'((?:[^'\\]|\\.)*?)'", code)
for en, zh in mb_items:
    if en and en not in ct_keys:
        missing[en] = zh

# 4. ctaBand arguments: ctaBand('enH', 'zhH', 'enP', 'zhP', 'cta1en', 'cta1zh', ...)
# Just catch all consecutive string pairs used in helper functions
helper_pairs = re.findall(r"(?:ctaBand|techStatCard)\('((?:[^'\\]|\\.)+?)'\s*,\s*'((?:[^'\\]|\\.)*?)'", code)
for en, zh in helper_pairs:
    if en and en not in ct_keys:
        missing[en] = zh

# Also get the sub-args of ctaBand more broadly - look for lines with ctaBand
ctaband_calls = re.findall(r"ctaBand\(([\s\S]*?)\)", code)
for call in ctaband_calls:
    args = re.findall(r"'((?:[^'\\]|\\.)+?)'", call)
    # args: [enH, zhH, enP, zhP, cta1en, cta1zh, cta2en, cta2zh]
    for i in range(0, len(args)-1, 2):
        en, zh = args[i], args[i+1]
        if en and en not in ct_keys and not any(c in en for c in ['{','}']):
            missing[en] = zh

print(f"Total missing keys found: {len(missing)}")
with open('missing_all.json', 'w', encoding='utf-8') as f:
    json.dump(missing, f, ensure_ascii=False, indent=2)
print("Saved to missing_all.json")
for k in list(missing.keys())[:20]:
    print(f"  '{k}' -> '{missing[k]}'")
