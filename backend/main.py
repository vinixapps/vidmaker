# backend/main.py
from fastapi import FastAPI, UploadFile, Form
from typing import List
from processing.text_to_image import generate_image
from processing.tts import synthesize
from processing.combine import create_video
from processing.music_effect import get_random_music
import os

app = FastAPI()

@app.post("/generate_slide/")
def api_generate_slide(text: str = Form(...)):
    filename = generate_image(text)
    return {"image_path": filename}

@app.post("/tts/")
def api_tts(text: str = Form(...)):
    path = synthesize(text, "tts.wav")
    return {"tts_path": path}

@app.post("/make_video/")
def api_make_video(
    slide_paths: List[str] = Form(...), 
    narration_text: str = Form(...)
):
    tts_path = synthesize(narration_text, "tts.wav")
    music_path = get_random_music()
    output = "output.mp4"
    video_path = create_video(slide_paths, tts_path, music_path, output)
    return {"video_path": video_path}
