import re

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Find CONTENT_T end
ct_start = code.find('const CONTENT_T = {')
ct_end = code.find('\n};', ct_start)

# New translations - handle single-quote keys carefully
# Key: "Who It's For" (has apostrophe)
# Key: "Whether you're looking..."

new_entries_raw = [
    # Who It's For - apostrophe key
    (
        "Who It\\'s For",
        {'es':"Para Quién Es",'ar':"لمن هو",'hi':"यह किसके लिए है",'pt':"Para Quem É",'fr':"Pour Qui C\\'est",'ja':"対象ユーザー"}
    ),
    # Whether you're looking...
    (
        "Whether you\\'re looking to start a campaign, monetize your traffic, or partner with us — we\\'d love to hear from you.",
        {
            'es': "Ya sea que quiera iniciar una campaña, monetizar su tráfico o asociarse — nos encantaría saber de usted.",
            'ar': "سواء كنت تتطلع إلى بدء حملة أو تحقيق الدخل من حركة مرورك أو الشراكة معنا — نود أن نسمع منك.",
            'hi': "चाहे आप अभियान शुरू करना, ट्रैफिक से कमाई करना, या साझेदारी करना चाहते हों — हम आपसे सुनना चाहेंगे।",
            'pt': "Seja para iniciar uma campanha, monetizar seu tráfego ou se tornar parceiro — adoraríamos ouvir de você.",
            'fr': "Que vous souhaitiez lancer une campagne, monétiser votre trafic ou nous rejoindre — nous serions ravis de vous entendre.",
            'ja': "キャンペーン開始、トラフィックの収益化、パートナーシップなど — ぜひご連絡ください。"
        }
    ),
]

parts = []
for en_key, langs in new_entries_raw:
    lang_parts = []
    for lang, val in langs.items():
        lang_parts.append(f"    {lang}:'{val}'")
    entry = f"  '{en_key}': {{\n" + ',\n'.join(lang_parts) + "\n  }"
    parts.append(entry)

insert_text = ',\n' + ',\n'.join(parts)
new_code = code[:ct_end] + insert_text + code[ct_end:]

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(new_code)

print("Inserted apostrophe-key translations")

# Verify
with open('app.js') as f:
    c = f.read()
idx = c.find("Who It\\'s For")
if idx > 0:
    print(f"Found 'Who It's For' key at position {idx}")
    print(c[idx:idx+150])
