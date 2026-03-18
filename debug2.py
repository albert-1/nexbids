with open('app.js') as f:
    content = f.read()

ct_start = content.find('const CONTENT_T = {')
ct_end = content.find('\n};', ct_start) + 3
code_after = content[ct_end:]

# Find all template literal backtick strings in the code after CONTENT_T
# and check they're properly closed
# We need a proper parser that handles nested template expressions

lines = code_after.split('\n')

# Look for lines that start a template literal (backtick) 
# and check if they end properly
in_template = False
template_start_line = -1
template_depth = 0  # for nested ${}
paren_depth = 0

for i, line in enumerate(lines):
    stripped = line.strip()
    
    # Simple check: count backticks on lines that aren't inside strings
    # This is a rough heuristic
    
    j = 0
    while j < len(line):
        ch = line[j]
        if ch == '\\':
            j += 2
            continue
        if not in_template:
            if ch == '`':
                in_template = True
                template_start_line = i
                template_depth = 0
        else:
            if ch == '\\':
                j += 2
                continue
            if ch == '`' and template_depth == 0:
                in_template = False
            elif ch == '$' and j+1 < len(line) and line[j+1] == '{':
                template_depth += 1
                j += 2
                continue
            elif ch == '{' and template_depth > 0:
                template_depth += 1
            elif ch == '}' and template_depth > 0:
                template_depth -= 1
                if template_depth < 0:
                    template_depth = 0
        j += 1
    
    # After processing line: if we're still in a template that started many lines ago
    if in_template and i - template_start_line > 200:
        print(f'WARNING: Template literal open for 200+ lines, started at line {template_start_line+1}')
        print(f'  Start: {lines[template_start_line][:100]}')
        in_template = False  # reset

print(f'Finished. In template at end: {in_template}')
if in_template:
    print(f'  Started at line: {template_start_line+1}')
    print(f'  Line content: {lines[template_start_line][:100]}')
