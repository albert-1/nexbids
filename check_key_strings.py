#!/usr/bin/env python3
import re

# Read app.js
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract CONTENT_T
content_t_start = content.find('const CONTENT_T = {')
content_t_end = content.find('\n};', content_t_start) + 3
content_t_section = content[content_t_start:content_t_end]

# Strings to check from renderHome and other pages
test_strings = [
    'Power Your Growth with',
    'Intelligent Programmatic',
    'NexBids delivers a full-stack programmatic advertising ecosystem',
    'Get Started Free',
    'Explore Platforms',
    '150+ Countries',
    '50B+ Daily Auctions',
    '50K+ Active Advertisers',
    'Global Ad Tech Leader',
]

print("检查关键字符串是否在CONTENT_T中存在及有日语翻译:\n")
print(f"{'字符串':<50} {'存在':<5} {'日语':<5}")
print(f"{'─'*65}")

missing_ja_count = 0

for test_str in test_strings:
    # Look for this exact string as a key
    pattern = f"'{re.escape(test_str)}':"
    found = pattern in content_t_section or f'"{test_str}":' in content_t_section
    
    if found:
        # Check if it has ja translation
        entry_start = content_t_section.find(f"'{test_str}':")
        if entry_start == -1:
            entry_start = content_t_section.find(f'"{test_str}":')
        
        if entry_start != -1:
            entry_end = content_t_section.find('\n  },', entry_start)
            if entry_end == -1:
                entry_end = content_t_section.find('},', entry_start)
            
            entry = content_t_section[entry_start:entry_end]
            has_ja = 'ja:' in entry
            
            status_found = "✅"
            status_ja = "✅" if has_ja else "❌"
            if not has_ja:
                missing_ja_count += 1
        else:
            status_found = "✅"
            status_ja = "?"
    else:
        status_found = "❌"
        status_ja = "─"
    
    short_str = test_str[:48]
    print(f"{short_str:<50} {status_found:<5} {status_ja:<5}")

print(f"\n{'='*65}")
print(f"缺失日语翻译的条目: {missing_ja_count}")
print(f"{'='*65}\n")
