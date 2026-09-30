import glob, os

for f in glob.glob(r'C:\Users\hp\.gemini\antigravity\brain\09ace1a4-8920-4eae-b8b6-1d69efb04ad6\.user_uploaded\*.html'):
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    if 'predict breakdowns' in c.lower() or 'see tmip on your fleet' in c.lower() or 'tmip-modal' in c.lower():
        print(f"Found match: {os.path.basename(f)} ({os.path.getsize(f)} bytes)")
