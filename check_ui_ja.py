#!/usr/bin/env python3
import re

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find UI_STRINGS
ui_start = content.find('const UI_STRINGS = {')
ui_end = content.find('const CONTENT_T', ui_start)
ui_section = content[ui_start:ui_end]

# Check key entries
keys = ['solutions', 'products', 'technology', 'resources', 'contactUs', 'login', 'getStarted', 'copyright', 'tagline']

print("检查UI_STRINGS日语支持:\n")
missing = []
for key in keys:
    if key in ui_section:
        entry_start = ui_section.find(key + ':')
        entry_end = ui_section.find('},', entry_start) + 2
        entry = ui_section[entry_start:entry_end]
        if 'ja:' not in entry:
            missing.append(key)
            print(f"❌ {key} - 缺失日语")
        else:
            print(f"✅ {key}")

if missing:
    print(f"\n需要添加日语翻译的条目: {missing}")
else:
    print(f"\n✅ 所有UI_STRINGS都有日语翻译!")
