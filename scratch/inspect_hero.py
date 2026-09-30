with open(r'C:\Users\hp\.gemini\antigravity\brain\09ace1a4-8920-4eae-b8b6-1d69efb04ad6\.user_uploaded\media_1790587329163.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

idx = content.find('class="hero')
if idx != -1:
    print(content[idx:idx+2500])
