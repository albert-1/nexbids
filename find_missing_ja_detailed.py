#!/usr/bin/env python3
import re
import json

# Read app.js
with open('app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find lines in CONTENT_T that have other language translations but NO 'ja' field
in_content_t = False
missing_ja = []
current_key = None
current_entry_start = None

for i, line in enumerate(lines, 1):
    if 'const CONTENT_T = {' in line:
        in_content_t = True
        continue
    if in_content_t and line.strip() == '};':
        break
    
    if in_content_t:
        # Check if this is a key line
        if match := re.match(r"\s*'([^']+)':\s*{", line):
            current_key = match.group(1)
            current_entry_start = i
        
        # Check if line ends an entry with }
        if line.strip() == '},' or line.strip().endswith('},'):
            if current_key and current_entry_start:
                # Get the full entry from current_entry_start to i
                entry_text = ''.join(lines[current_entry_start-1:i])
                
                # Check if there's at least one language (es, ar, hi, pt, fr) BUT no 'ja'
                has_other_langs = any(lang in entry_text for lang in ['es:', 'ar:', 'hi:', 'pt:', 'fr:'])
                has_ja = 'ja:' in entry_text
                
                if has_other_langs and not has_ja:
                    missing_ja.append({
                        'key': current_key[:60],
                        'line': current_entry_start
                    })
                
                current_key = None

print(f"\n{'='*80}")
print(f"CONTENT_T 中缺失日语(ja)翻译的条目")
print(f"{'='*80}\n")

if missing_ja:
    print(f"找到 {len(missing_ja)} 个缺失日语的条目:\n")
    for i, item in enumerate(missing_ja[:30], 1):
        print(f"{i:2}. 行 {item['line']:5} - {item['key']}")
    if len(missing_ja) > 30:
        print(f"\n... 以及 {len(missing_ja) - 30} 个其他条目")
else:
    print("✅ 所有CONTENT_T条目都有日语翻译!")

print(f"\n{'='*80}\n")

# Save results to file
with open('missing_ja_translations.json', 'w', encoding='utf-8') as f:
    json.dump(missing_ja, f, ensure_ascii=False, indent=2)

print(f"详细信息已保存到 missing_ja_translations.json")
