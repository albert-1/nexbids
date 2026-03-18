import re, json

with open('app.js') as f:
    code = f.read()

ct_start = code.find('const CONTENT_T = {')
ct_end = code.find('\n};', ct_start) + 3
ct_block = code[ct_start:ct_end]
ct_keys = set(re.findall(r"'((?:[^'\\]|\\.)+)':\s*\{", ct_block))

# All t() calls - capture both en and zh args
# Pattern: t('en_text', 'zh_text')
pairs = re.findall(r"\bt\('((?:[^'\\]|\\.)+)'\s*,\s*'((?:[^'\\]|\\.)*)'", code)
unique_pairs = {}
for en, zh in pairs:
    if en not in unique_pairs:
        unique_pairs[en] = zh

missing = {en: zh for en, zh in unique_pairs.items() if en not in ct_keys}
# Remove dynamic keys
missing = {k: v for k, v in missing.items() if 'c.title' not in k}

print(f"Missing keys: {len(missing)}")
with open('missing_keys.json', 'w', encoding='utf-8') as f:
    json.dump(missing, f, ensure_ascii=False, indent=2)
print("Saved to missing_keys.json")
for k, v in list(missing.items())[:5]:
    print(f"  '{k}' -> zh:'{v}'")
