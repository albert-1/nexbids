with open('app.js') as f:
    content = f.read()

# Find renderHome function and check for issues
rh_start = content.find('function renderHome()')
rh_next = content.find('\nfunction ', rh_start + 1)
rh_block = content[rh_start:rh_next]
print(f'renderHome size: {len(rh_block)} chars')

# Check for t() calls referencing keys that dont exist - not critical

# More importantly: check for syntax issues in the whole file
# Look for specific patterns that break JS:
# 1. Unclosed template literals
# 2. Mismatched braces in functions

# Count all top-level function definitions
import re
funcs = re.findall(r'^function (\w+)\(', content, re.MULTILINE)
print(f'Total functions: {len(funcs)}')

# Check if there are any lines with obvious JS errors
# specifically look for lines that have unmatched ` in template strings
# outside of CONTENT_T

ct_start = content.find('const CONTENT_T = {')
ct_end = content.find('\n};', ct_start) + 3

# Check code outside CONTENT_T
code_before = content[:ct_start]
code_after = content[ct_end:]

# Look for obvious problems in code sections
for section_name, section in [('before_CT', code_before), ('after_CT', code_after)]:
    lines = section.split('\n')
    for i, line in enumerate(lines):
        # Look for lines with t() calls that have unusual patterns
        if "t('" in line and line.count("'") % 2 != 0:
            if '//' not in line.split("'")[0]:  # not a comment
                print(f'{section_name} line {i+1}: odd quotes: {line[:100]}')
