#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
修复重复zh字段的问题
找到每个键中的第一个zh:字段，删除后续的重复zh:字段
"""

import re
import sys

def fix_duplicate_zh(content):
    """修复重复的zh字段"""
    
    # 找到所有的对象定义模式
    # pattern: 'key': { ... }
    pattern = r"'([^']+)':\s*\{([^}]+)\}"
    
    matches = list(re.finditer(pattern, content, re.DOTALL))
    print(f"找到 {len(matches)} 个键值对象")
    
    modified_count = 0
    for match in matches:
        key = match.group(1)
        obj_content = match.group(2)
        
        # 统计zh:出现的次数
        zh_count = obj_content.count("zh:")
        
        if zh_count > 1:
            print(f"\n处理键: {key}")
            print(f"  原始zh:出现次数 = {zh_count}")
            print(f"  内容: {obj_content[:150]}...")
            
            # 找到第一个zh:的位置
            first_zh_pos = obj_content.find("zh:")
            if first_zh_pos == -1:
                print(f"  警告: 未找到zh:字段")
                continue
            
            # 找到第一个zh:后面的值（单引号或双引号）
            first_zh_match = re.search(r"zh:\s*['\"]([^'\"]+)['\"]", obj_content)
            if not first_zh_match:
                print(f"  警告: 无法解析第一个zh:的值")
                continue
            
            first_zh_value = first_zh_match.group(1)
            print(f"  保留第一个zh值: '{first_zh_value}'")
            
            # 查找并删除所有后续的zh:字段
            # 策略：将整个zh:'value'替换为空字符串（从第二个开始）
            new_obj_content = obj_content
            
            # 找到所有zh:字段
            zh_pattern = r"zh:\s*['\"][^'\"]*['\"]"
            all_zh_matches = list(re.finditer(zh_pattern, new_obj_content))
            
            if len(all_zh_matches) > 1:
                # 从第二个开始删除
                # 需要从后往前删除，避免位置变化
                for zh_match in reversed(all_zh_matches[1:]):
                    start, end = zh_match.span()
                    deleted = new_obj_content[start:end]
                    print(f"  删除重复: {deleted}")
                    new_obj_content = new_obj_content[:start] + new_obj_content[end:]
                
                # 替换整个对象内容
                old_obj = f"'{key}': {{{obj_content}}}"
                new_obj = f"'{key}': {{{new_obj_content}}}"
                
                # 确保只替换一次
                content = content.replace(old_obj, new_obj, 1)
                modified_count += 1
    
    print(f"\n总共修改了 {modified_count} 个键")
    return content

if __name__ == '__main__':
    with open('app.js', 'r', encoding='utf-8') as f:
        original_content = f.read()
    
    print("开始修复重复zh字段...\n")
    fixed_content = fix_duplicate_zh(original_content)
    
    # 保存到新文件
    with open('app_fixed.js', 'w', encoding='utf-8') as f:
        f.write(fixed_content)
    
    print("\n✅ 修复完成！")
    print("📁 修复后的文件已保存到: app_fixed.js")
    print("📋 请检查修复后的文件，确认无误后替换app.js")
