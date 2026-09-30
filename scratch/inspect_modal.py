with open(r'C:\Users\hp\.gemini\antigravity\brain\09ace1a4-8920-4eae-b8b6-1d69efb04ad6\.user_uploaded\media_1788781480219.html', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

idx = content.find('tmip-modal')
if idx != -1:
    print(content[idx-100:idx+2000])
else:
    print("tmip-modal not found, searching for modal:")
    for line in content.splitlines():
        if 'modal' in line.lower():
            print(line[:120])
