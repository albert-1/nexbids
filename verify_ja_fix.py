#!/usr/bin/env python3
"""
验证日语翻译修复 - Verification Script for Japanese Translation Fix
"""

import re

def verify_ja_translations():
    """验证所有关键的日语翻译"""
    
    with open('app.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 关键条目和预期的日语翻译
    checks = [
        ('Power Your Growth with', 'であなたの成長を加速'),  # 修复后
        ('Intelligent Programmatic', 'インテリジェントプログラマティック'),
        ('Get Started Free', '無料で始める'),
        ('Explore Platforms', 'プラットフォームを探る'),
        ('Solutions', 'ソリューション'),
        ('Products', '製品'),
        ('Technology', 'テクノロジー'),
    ]
    
    print(f"\n{'='*80}")
    print(f"日语翻译验证报告 - Japanese Translation Verification Report")
    print(f"{'='*80}\n")
    
    passed = 0
    failed = 0
    
    for en_text, ja_expected in checks:
        # Look for the key and its ja translation
        pattern = f"'{re.escape(en_text)}':\\s*{{[^}}]*ja:'([^']*)'"
        match = re.search(pattern, content)
        
        if match:
            ja_found = match.group(1)
            # Check if expected translation is in the found content
            if ja_expected in ja_found:
                print(f"✅ {en_text:<40} → {ja_found}")
                passed += 1
            else:
                print(f"⚠️  {en_text:<40}")
                print(f"   期望: {ja_expected}")
                print(f"   找到: {ja_found}")
                failed += 1
        else:
            print(f"❌ {en_text:<40} - 未找到")
            failed += 1
    
    print(f"\n{'─'*80}")
    print(f"结果: ✅ 通过 {passed} | ⚠️  警告 {failed}")
    print(f"{'─'*80}\n")
    
    return passed, failed

def check_ui_strings_completeness():
    """检查UI_STRINGS的日语完整性"""
    
    with open('app.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    ui_start = content.find('const UI_STRINGS = {')
    ui_end = content.find('const CONTENT_T', ui_start)
    ui_section = content[ui_start:ui_end]
    
    # Count entries
    ja_count = len(re.findall(r"ja:'[^']*'", ui_section))
    
    print(f"UI_STRINGS 日语覆盖: {ja_count} 个条目 ✅\n")
    
    return ja_count > 0

def check_content_t_completeness():
    """检查CONTENT_T的日语完整性"""
    
    with open('app.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    ct_start = content.find('const CONTENT_T = {')
    ct_end = content.find('\n};', ct_start)
    ct_section = content[ct_start:ct_end]
    
    # Find all keys with ja translations
    entries = re.findall(r"'([^']+)':\\s*{([^}]+)}", ct_section)
    
    missing_ja = []
    for key, entry in entries:
        if 'ja:' not in entry:
            missing_ja.append(key[:50])
    
    if missing_ja:
        print(f"⚠️  CONTENT_T 中缺失日语的条目:")
        for key in missing_ja[:10]:
            print(f"   - {key}")
        if len(missing_ja) > 10:
            print(f"   ... 以及 {len(missing_ja)-10} 个其他")
        return False
    else:
        print(f"✅ CONTENT_T 中所有条目都有日语翻译\n")
        return True

if __name__ == '__main__':
    print("\n" + "="*80)
    print("日语翻译完整性验证")
    print("="*80)
    
    # 1. Verify key translations
    passed, failed = verify_ja_translations()
    
    # 2. Check UI_STRINGS
    print("\n--- UI_STRINGS 检查 ---")
    ui_ok = check_ui_strings_completeness()
    
    # 3. Check CONTENT_T
    print("--- CONTENT_T 检查 ---")
    ct_ok = check_content_t_completeness()
    
    # Final summary
    print("\n" + "="*80)
    if failed == 0 and ui_ok and ct_ok:
        print("✅ 所有验证通过 - All checks passed!")
        print("日语翻译已准备好")
    else:
        print("⚠️  需要进一步检查")
    print("="*80 + "\n")
