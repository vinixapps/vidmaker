# processing/music_effect.py
import os
import random

def get_random_music():
    music_dir = "assets/music/"
    files = [os.path.join(music_dir, f) for f in os.listdir(music_dir) if f.endswith(('.mp3', '.wav'))]
    return random.choice(files) if files else None

def get_random_sfx():
    sfx_dir = "assets/sfx/"
    files = [os.path.join(sfx_dir, f) for f in os.listdir(sfx_dir) if f.endswith(('.mp3', '.wav'))]
    return random.choice(files) if files else None
