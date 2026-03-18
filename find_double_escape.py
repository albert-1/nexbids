with open('app.js') as f:
    content = f.read()

ct_start = content.find('const CONTENT_T = {')
ct_end = content.find('\n};', ct_start) + 3
ct_block = content[ct_start:ct_end]

import re

# Find all entry keys and values with double-escaped backslash before quote
# Pattern: \\' inside a single-quoted string context (should be \' only)
# In the file: \\\\ means two backslashes, \\' means one backslash + quote
# The problem: \\\\'  in source = \\' in JS = literal backslash then closes string

# Find entries with \\' in the KEY (most dangerous)
bad_keys = re.findall(r"^\s{2}'(.*?\\\\'.*?)'", ct_block, re.MULTILINE)
print(f"Keys with \\\\': {len(bad_keys)}")
for k in bad_keys:
    print(f"  KEY: {k[:80]}")

# Find entries with \\' in VALUES that are in single-quoted strings
# Format: lang:'value'
# Values: es:'...\\'...' 
lines = ct_block.split('\n')
for i, line in enumerate(lines, 1):
    if "\\\\'" in line:
        print(f"Line {i} has \\\\': {line[:120]}")
