from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
from nltk.stem import PorterStemmer
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


# Create an instance of the FastAPI class
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*']
)

# Mount the 'videos' directory as '/videos' in the FastAPI app
app.mount("/final", StaticFiles(directory="final"), name="final")

# Define a route using a decorator


class Text(BaseModel):
    text: str


@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}


stemmer = PorterStemmer()

# Define a route to handle the POST request


@app.post("/message")
async def process_message(message: Text):
    # Split the message into a list of words
    print(message)
    words = message.text.split()
    print(words)

    # Stem the words
    stemmed_words = [stemmer.stem(word) for word in words]

    # Find video files matching the stemmed words in the 'videos' folder
    matching_videos = []
    for word in stemmed_words:
        video_file_name = f"{word}.mp4"
        if os.path.exists(os.path.join("SignAnimations", video_file_name)):
            matching_videos.append(video_file_name)

    # Check if any matching videos were found
    if not matching_videos:
        return {"error": "No videos found for the given message."}

    # Concatenate the matching videos
    concatenated_clip = concatenate_videos(matching_videos)

    # Write the concatenated video to a file
    output_file_path = "final/output_video.mp4"
    concatenated_clip.write_videofile(
        output_file_path, codec="libx264", fps=30)

    # Close the clips
    concatenated_clip.close()

    # Return the concatenated video file as a response
    return FileResponse(output_file_path, media_type="video/mp4")


def concatenate_videos(video_files):
    from moviepy.editor import VideoFileClip, concatenate_videoclips

    # List to store VideoClip objects
    video_clips = []

    # Load each video and create a VideoClip object
    for file in video_files:
        video_clip = VideoFileClip(os.path.join("SignAnimations", file))
        video_clips.append(video_clip)

    # Concatenate the VideoClip objects
    concatenated_clip = concatenate_videoclips(video_clips)

    return concatenated_clip
