# processing/tts.py
from TTS.api import TTS

tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")

def synthesize(text, out_path="tts.wav"):
    tts.tts_to_file(text=text, file_path=out_path)
    return out_path
