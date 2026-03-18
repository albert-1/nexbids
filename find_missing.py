import re

with open('app.js') as f:
    code = f.read()

# Get CONTENT_T keys
ct_start = code.find('const CONTENT_T = {')
ct_end = code.find('\n};', ct_start) + 3
ct_block = code[ct_start:ct_end]
ct_keys = set(re.findall(r"'((?:[^'\\]|\\.){2,})':\s*\{", ct_block))

# Get all t() first args (static strings only, no concatenation)
t_calls = re.findall(r"\bt\('((?:[^'\\]|\\.)+)'", code)
unique_calls = list(dict.fromkeys(t_calls))

missing = [k for k in unique_calls if k not in ct_keys]
print(f"Total t() keys: {len(unique_calls)}, CONTENT_T keys: {len(ct_keys)}")
print(f"Missing from CONTENT_T: {len(missing)}\n")
for k in missing:
    print(f'  "{k}"')
