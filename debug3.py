with open('app.js') as f:
    content = f.read()

ct_start = content.find('const CONTENT_T = {')
ct_end = content.find('\n};', ct_start) + 3
ct_block = content[ct_start:ct_end]

import re

# Find all entries with multiline values or special chars
# Look for backticks in values (would break template literals)
lines = ct_block.split('\n')

problems = []
for i, line in enumerate(lines, 1):
    # Check for backtick inside a value (dangerous in JS)
    if '`' in line and 'CONTENT_T' not in line:
        problems.append(('backtick', i, line[:120]))
    # Check for </script> or <script in values
    if '<script' in line.lower() or '</script' in line.lower():
        problems.append(('script-tag', i, line[:120]))

print(f'Backtick in value: {sum(1 for t,_,_ in problems if t=="backtick")}')
print(f'Script tag in value: {sum(1 for t,_,_ in problems if t=="script-tag")}')
for typ, lineno, text in problems:
    print(f'  [{typ}] Line {lineno}: {repr(text)}')

# Also check: are there any lines that look like entry start but 
# have non-standard structure (e.g. missing closing })
print('\nChecking entry structure...')
entry_pat = re.compile(r"^\s{2}'(?:[^'\\]|\\.)*'\s*:\s*\{(.*)$")
bad_entries = []
for i, line in enumerate(lines, 1):
    m = entry_pat.match(line)
    if m:
        rest = m.group(1).strip()
        # Should end with }, or } or just be { (multiline)
        if rest and not rest.endswith('},') and not rest.endswith('}') and rest != '{':
            bad_entries.append((i, line[:120]))

print(f'Bad entry endings: {len(bad_entries)}')
for lineno, text in bad_entries[:10]:
    print(f'  Line {lineno}: {repr(text)}')
