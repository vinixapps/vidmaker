# processing/text_to_image.py
import requests
import base64

def generate_image(prompt, negative_prompt=""):
    payload = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "steps": 20,
        "width": 512,
        "height": 768
    }
    url = "http://localhost:7860/sdapi/v1/txt2img"
    res = requests.post(url, json=payload)
    res.raise_for_status()
    img_base64 = res.json()["images"][0]
    img_data = base64.b64decode(img_base64)
    filename = f"slide_{abs(hash(prompt))}.png"
    with open(filename, "wb") as f:
        f.write(img_data)
    return filename
