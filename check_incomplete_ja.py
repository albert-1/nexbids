#!/usr/bin/env python3
import re

# Read the updated app.js
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all CONTENT_T entries and check for short/incomplete ja translations
pattern = r"'([^']+)':\s*\{([^}]+)\}"

matches = re.finditer(pattern, content)

print(f"\n{'='*90}")
print(f"检查可能的不完整日语翻译 (长度 < 8个字符)")
print(f"{'='*90}\n")

suspicious = []

for match in matches:
    key = match.group(1)
    entry = match.group(2)
    
    # Extract ja value
    ja_match = re.search(r"ja:\s*['\"]([^'\"]*)['\"]", entry)
    if ja_match:
        ja_value = ja_match.group(1).strip()
        # Check if it's suspiciously short (less than 8 chars for non-abbrev)
        # and doesn't look like it's supposed to be short
        if len(ja_value) < 8 and not any(x in ja_value.lower() for x in ['ssp', 'dsp', 'adx', 'rtb', 'cpa', 'roas', 'lmao', '©']):
            # Additional check: skip if it's clearly just a small word
            if not key.lower() in ['pmp deals', 'fill rate', 'dsp', 'adx', 'ssp', 'ctr', 'roas', 'cpa']:
                suspicious.append({
                    'key': key[:50],
                    'ja': ja_value,
                    'len': len(ja_value)
                })

if suspicious:
    print(f"找到 {len(suspicious)} 个可能不完整的日语翻译:\n")
    for i, item in enumerate(suspicious[:20], 1):
        print(f"{i:2}. 键: {item['key']:<45} | 日语: {item['ja']:<25} (长: {item['len']})")
    if len(suspicious) > 20:
        print(f"\n... 以及 {len(suspicious) - 20} 个其他条目")
else:
    print("✅ 没有发现明显不完整的日语翻译!")

print(f"\n{'='*90}\n")
