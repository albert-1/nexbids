#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
手动修复重复zh字段 - 只修复最关键的导致用户问题的那些
"""

import re

# 关键需要修复的重复zh字段（根据用户截图）
critical_duplicates = [
    ('req/s', 'zh:\'所有合格竞价者之间的二价拍卖\''),
    ('countries', 'zh:\'100ms以内的竞价处理\''),
    ('formats', 'zh:\'AI/ML优化引擎\''),
    ('response', 'zh:\'98.2%质量\''),
    ('<100ms', 'zh:\'<80ms为隐私合规的未来准备的无Cookie定向解决方案。\''),
    ('For Buyers', 'zh:\'为买方\''),
    ('RTB Auction Flow', 'zh:\'RTB竞价流程\''),
    ('Mission & Values', 'zh:\'使命与价值观\''),
    ('Ad Formats Supported', 'zh:\'支持的广告格式\''),
    ('Integrated Partners', 'zh:\'集成合作伙伴\''),
    ('Global Data Center Regions', 'zh:\'全球数据中心区域\''),
    ('Start for Free', 'zh:\'免费开始\''),
    ('Fill Rate', 'zh:\'填充率\''),
    ('LTV Positive', 'zh:\'LTV为正\''),
    ('Tripled', 'zh:\'增至三倍\''),
    ('Markets', 'zh:\'市场\''),
    ('Revenue +400%', 'zh:\'收入+400%\''),
    ('Revenue +145%', 'zh:\'收入+145%\''),
]

def fix_critical_duplicates(content):
    """只修复关键的重复zh字段"""
    fixed_count = 0
    
    for key, zh_to_remove in critical_duplicates:
        # 构建模式：'key': { ... zh:'value_to_remove' ... }
        pattern = f"'{re.escape(key)}':\\s*\\{{([^}}]*zh:\\s*{re.escape(zh_to_remove)}[^}}]*\\}})"
        
        match = re.search(pattern, content, re.DOTALL)
        if match:
            print(f"修复键: {key}")
            print(f"  删除: {zh_to_remove}")
            
            # 删除这个重复的zh行
            obj_content = match.group(1)
            new_obj_content = obj_content.replace(f"zh:{zh_to_remove}", "")
            
            # 替换整个对象
            old_obj = match.group(0)
            new_obj = f"'{key}': {{{new_obj_content}}}"
            
            content = content.replace(old_obj, new_obj, 1)
            fixed_count += 1
        else:
            print(f"⚠️  键 '{key}' 未找到或没有此重复zh: {zh_to_remove}")
    
    return content, fixed_count

if __name__ == '__main__':
    with open('app.js', 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    print("开始修复关键的重复zh字段...\n")
    fixed_content, fixed_count = fix_critical_duplicates(original_content)
    
    if fixed_count > 0:
        # 备份原文件
        with open('app.js.backup', 'w', encoding='utf-8') as f:
            f.write(original_content)
        
        # 写入修复后的文件
        with open('app.js', 'w', encoding='utf-8') as f:
            f.write(fixed_content)
        
        print(f"\n✅ 成功修复了 {fixed_count} 个键")
        print("📁 备份已保存到: app.js.backup")
    else:
        print("\n⚠️  没有需要修复的键")
