"""Create the social preview from the couple portrait; requires Pillow."""
from PIL import Image, ImageDraw, ImageFont

portrait = Image.open('images/Couple.jpg').convert('RGB').resize((900, 1501), Image.Resampling.LANCZOS)
card = Image.new('RGB', (1200, 630), '#f6efe2')
photo = portrait.crop((0, 120, 900, 1320)).resize((450, 600), Image.Resampling.LANCZOS)
card.paste(photo, (15, 15))
draw = ImageDraw.Draw(card)
draw.rectangle((480, 15, 1185, 615), outline='#ae8a68', width=2)
serif = '/System/Library/Fonts/Supplemental/Georgia.ttf'
bold = '/System/Library/Fonts/Supplemental/Georgia Bold.ttf'
draw.text((535, 105), 'WITH OUR FAMILIES’ BLESSINGS', fill='#775b4e', font=ImageFont.truetype(serif, 18))
draw.text((535, 190), 'Bhakti', fill='#63353a', font=ImageFont.truetype(bold, 72))
draw.text((535, 274), '& Dhananjay', fill='#63353a', font=ImageFont.truetype(bold, 62))
draw.line((535, 385, 1120, 385), fill='#ae8a68', width=2)
draw.text((535, 425), 'MARCH 11 – 14, 2027', fill='#6c5048', font=ImageFont.truetype(serif, 27))
draw.text((535, 476), 'BENGALURU', fill='#6c5048', font=ImageFont.truetype(serif, 25))
card.save('public/og-couple-2026.jpg', quality=86, optimize=True, progressive=True)
