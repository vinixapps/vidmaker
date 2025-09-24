# utils/helper.py
import os

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def delete_file(path):
    if os.path.exists(path):
        os.remove(path)

def list_files(directory, ext=(".png", ".jpg", ".mp4", ".wav", ".mp3")):
    return [
        os.path.join(directory, f)
        for f in os.listdir(directory)
        if f.endswith(ext)
    ]
