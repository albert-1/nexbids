import re
with open('app.js') as f:
    code = f.read()
ct_start = code.find('const CONTENT_T = {')
ct_end = code.find('\n};', ct_start) + 3
ct_block = code[ct_start:ct_end]

checks = [
    'Platform Uptime SLA', 'Countries & Territories', 'Daily Bid Requests',
    'Annual Ad Spend Managed', 'Our Platforms', 'For Advertisers',
    'Ready to Scale Your Campaigns?', 'Start for Free', 'Create Free Account',
    'Application Review', 'Partner Success First', 'Global Data Center Regions',
    'Not Sure Where to Start?', 'Data Centers', 'Bid Response Time',
]
ok = 0
for k in checks:
    if k in ct_block:
        ok += 1
        print(f'OK: {k}')
    else:
        print(f'MISSING: {k}')
print(f'\n{ok}/{len(checks)} found')
