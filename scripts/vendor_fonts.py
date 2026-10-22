"""Download only the Latin WOFF2 faces used by the invitation."""
import re
import subprocess
from pathlib import Path

QUERY = ('https://fonts.googleapis.com/css2?'
         'family=Playfair+Display:wght@500;700;900&'
         'family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&'
         'family=Cinzel+Decorative:wght@400;700&'
         'family=Lato:wght@400;700&'
         'family=Great+Vibes&display=swap')
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
css = subprocess.check_output(['curl', '-fsSL', '-A', UA, QUERY], text=True)
output = Path('public/fonts')
output.mkdir(exist_ok=True)
rules = []
for block in re.findall(r'/\* latin \*/\s*(@font-face\s*\{[^}]+\})', css):
    family = re.search(r"font-family:\s*'([^']+)'", block).group(1)
    style = re.search(r'font-style:\s*([^;]+)', block).group(1)
    weight = re.search(r'font-weight:\s*([^;]+)', block).group(1)
    url = re.search(r'url\((https://[^)]+\.woff2)\)', block).group(1)
    filename = f"{family.lower().replace(' ', '-')}-{style}-{weight}.woff2"
    subprocess.run(['curl', '-fsSL', url, '-o', str(output / filename)], check=True)
    rules.append(f"@font-face {{ font-family: '{family}'; font-style: {style}; font-weight: {weight}; font-display: swap; src: url('/fonts/{filename}') format('woff2'); }}")
Path('src/fonts.css').write_text('\n'.join(rules) + '\n')
print(f'Vendored {len(rules)} Latin font faces')
