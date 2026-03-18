#!/usr/bin/env python3
import re

# Read app.js
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find CONTENT_T object
pattern = r"const CONTENT_T = ({[\s\S]*?^};\s*$)"
match = re.search(pattern, content, re.MULTILINE)

if not match:
    print("❌ Could not find CONTENT_T object")
    exit(1)

content_t_str = match.group(1)

# Extract all keys and check for 'ja' field
empty_ja_entries = []

# Pattern to find each translation object  - more precise
entry_pattern = r"'([^']+)':\s*\{\s*((?:[^}]|\n)*?)}\s*,"
entries = re.finditer(entry_pattern, content_t_str, re.MULTILINE)

for entry in entries:
    key = entry.group(1)
    translation_obj = entry.group(2)
    
    # Check if 'ja:' exists in the translation object
    if "ja:" in translation_obj:
        # Check if ja value is empty or just whitespace
        ja_match = re.search(r"ja:\s*['\"]([^'\"]*)['\"]", translation_obj)
        if ja_match:
            ja_value = ja_match.group(1).strip()
            if not ja_value:
                full_entry = entry.group(0)
                empty_ja_entries.append((key, full_entry[:200]))

print(f"\n{'='*80}")
print(f"日语 (ja) 翻译为空的条目（需要修复）")
print(f"{'='*80}\n")

if empty_ja_entries:
    print(f"找到 {len(empty_ja_entries)} 个日语翻译为空的条目:\n")
    for i, (key, snippet) in enumerate(empty_ja_entries, 1):
        print(f"{i}. 键: {key[:60]}...")
        print()
else:
    print("✅ 所有日语翻译都已填充！")

print(f"{'='*80}\n")
