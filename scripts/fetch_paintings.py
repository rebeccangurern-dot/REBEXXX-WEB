import sys
import urllib.request
import os

files = {
    'vis-painting-01': ('13zufL8oEgsdvMH_e7uzgsK6TCFc0kuDw', 'public/images/painting_hue_of_blue_01.jpg'),
    'vis-painting-02': ('1bJilIhtyMnQHnOVfo485BWeacdx2CvKi', 'public/images/painting_hue_of_blue_02.jpg')
}

os.makedirs('public/images', exist_ok=True)

success_count = 0
for key, (file_id, dest) in files.items():
    urls = [
        f"https://drive.google.com/uc?export=download&id={file_id}",
        f"https://drive.usercontent.google.com/download?id={file_id}&export=download&confirm=t",
        f"https://lh3.googleusercontent.com/d/{file_id}=s2048"
    ]
    downloaded = False
    for url in urls:
        try:
            req = urllib.request.Request(
                url,
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            )
            with urllib.request.urlopen(req, timeout=10) as response:
                content = response.read()
                # Check if it's an image (JPEG starts with \xff\xd8\xff, PNG with \x89PNG, WebP with RIFF...WEBP)
                if content.startswith(b'\xff\xd8\xff') or content.startswith(b'\x89PNG') or (b'WEBP' in content[:16]):
                    with open(dest, 'wb') as f:
                        f.write(content)
                    print(f"SUCCESS: Downloaded {key} to {dest} ({len(content)} bytes)")
                    downloaded = True
                    success_count += 1
                    break
                else:
                    # Likely HTML login page
                    first_line = content[:200].decode('utf-8', errors='ignore')
                    # print(f"Not an image ({url}): {first_line}")
        except Exception as e:
            # print(f"Error {url}: {e}")
            pass

    if not downloaded:
        print(f"RESTRICTED: File {file_id} ({key}) requires 'Anyone with the link' access.")

if success_count == len(files):
    print("ALL_DOWNLOADED")
else:
    print(f"COMPLETED_{success_count}_OF_{len(files)}")
