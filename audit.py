import re, json

with open('app.js') as f:
    code = f.read()

# Get CONTENT_T keys
ct_start = code.find('const CONTENT_T = {')
ct_end = code.find('\n};', ct_start) + 3
ct_block = code[ct_start:ct_end]
ct_keys = set(re.findall(r"'((?:[^'\\]|\\.)+)':\s*\{", ct_block))

# Get all t() first args
t_calls = re.findall(r"\bt\('((?:[^'\\]|\\.)+)'", code)
unique_calls = list(dict.fromkeys(t_calls))

# Which t() keys are NOT in CONTENT_T (exact match)
missing_exact = [k for k in unique_calls if k not in ct_keys]

# For each missing key, find the closest CONTENT_T key
print(f"=== {len(missing_exact)} keys missing from CONTENT_T (exact match) ===\n")
for k in missing_exact:
    # Skip if it's a dynamic key (contains +)
    if '+' in k or 'c.' in k:
        continue
    # Find partial matches
    partial = [ck for ck in ct_keys if k[:20] in ck or ck[:20] in k]
    print(f'MISSING: "{k}"')
    if partial:
        for p in partial[:2]:
            print(f'  ~similar CONTENT_T key: "{p[:80]}"')

# Also check for keys that ARE in CONTENT_T but missing specific lang
print("\n\n=== Checking existing CONTENT_T keys for missing languages ===")
target_langs = ['es','ar','hi','pt','fr','ja']
missing_lang_count = 0

# Parse CONTENT_T more carefully
entries = re.findall(r"'((?:[^'\\]|\\.)+)':\s*\{([^}]+)\}", ct_block, re.DOTALL)
for key, val in entries:
    missing_langs = [l for l in target_langs if f"{l}:" not in val]
    if missing_langs:
        missing_lang_count += 1
        if missing_lang_count <= 20:
            print(f'  KEY: "{key[:60]}" MISSING: {missing_langs}')

print(f"\nTotal entries missing at least one target lang: {missing_lang_count}")
