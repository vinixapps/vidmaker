# processing/combine.py
from moviepy.editor import ImageClip, AudioFileClip, concatenate_videoclips, CompositeAudioClip

def create_video(slide_images, tts_audio, bgm_audio, output="output.mp4"):
    duration_per_slide = 7.5  # detik per slide
    clips = [ImageClip(img).set_duration(duration_per_slide) for img in slide_images]
    video = concatenate_videoclips(clips, method="compose")
    tts_clip = AudioFileClip(tts_audio)
    bgm_clip = AudioFileClip(bgm_audio).volumex(0.2)
    audio = CompositeAudioClip([tts_clip, bgm_clip.set_start(0)])
    final_video = video.set_audio(audio)
    final_video.write_videofile(output, fps=24)
    return output
