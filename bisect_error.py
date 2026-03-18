"""
Binary search for JS syntax error in CONTENT_T block.
We'll create a minimal test HTML that loads a partial app.js to find the bad entry.
"""
import re, os

with open('app.js') as f:
    content = f.read()

ct_start = content.find('const CONTENT_T = {')
ct_end = content.find('\n};', ct_start) + 3
ct_block = content[ct_start:ct_end]

before_ct = content[:ct_start]
after_ct = content[ct_end:]

# Extract all individual entry lines (top-level keys in CONTENT_T)
# Each entry is: '  KEY': { ... },\n
# Some span multiple lines

# Split entries at the top-level key boundaries
# Top-level entries start with exactly 2 spaces then a quote
entry_pattern = re.compile(r"(?=^  ')", re.MULTILINE)
# Split the inner content (skip first line 'const CONTENT_T = {')
inner_start = ct_block.find('\n') + 1
inner_content = ct_block[inner_start:-2]  # remove last '};\n'
entries = entry_pattern.split(inner_content)
entries = [e for e in entries if e.strip()]

print(f'Total CONTENT_T entries: {len(entries)}')

# Test: create minimal JS with first N entries and check syntax via
# a Python-based brace/string checker

def has_syntax_issue(entries_subset):
    """Quick check: look for unclosed strings or braces in entries"""
    code = "const CONTENT_T = {\n" + "".join(entries_subset) + "\n};\n"
    depth = 0
    in_str = False
    str_ch = None
    esc = False
    for i, ch in enumerate(code):
        if esc:
            esc = False
            continue
        if ch == '\\':
            esc = True
            continue
        if in_str:
            if ch == str_ch:
                in_str = False
        else:
            if ch in ("'", '"'):
                in_str = True
                str_ch = ch
            elif ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
    return depth != 0 or in_str

# Binary search
lo, hi = 0, len(entries)
while lo < hi - 1:
    mid = (lo + hi) // 2
    if has_syntax_issue(entries[lo:mid]):
        hi = mid
    elif has_syntax_issue(entries[mid:hi]):
        lo = mid
    else:
        print(f"No issue found in range [{lo}, {hi})")
        break
else:
    bad_entry = entries[lo]
    print(f"Bad entry at index {lo}:")
    print(bad_entry[:200])
