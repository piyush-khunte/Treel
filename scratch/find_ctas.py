with open('src/components/tmip/tmip-landing-page.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if any(k in l.lower() for k in ['openmodal', 'ismodalopen', '#demo', '/tmip/demo', 'book a demo', 'book my demo', 'cta']):
        print(f'{i+1}: {l.strip()[:120]}')
