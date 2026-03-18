import re

with open('app.js', 'rb') as f:
    raw = f.read()

# Fix line 5549: world\\'s -> world\'s
# In raw bytes: b"world\\\\'s" -> b"world\\'s"
# That is: b'world\\\\' + b"'s" -> b'world\\' + b"'s"
old = b"world\\\\'s best demand sources"
new = b"world\\'s best demand sources"

if old in raw:
    fixed = raw.replace(old, new, 1)
    with open('app.js', 'wb') as f:
        f.write(fixed)
    print(f"Fixed! Replaced {repr(old)} -> {repr(new)}")
else:
    print("Pattern not found")
    # Show what's around line 5549
    lines = raw.split(b'\n')
    print(repr(lines[5548][:200]))
