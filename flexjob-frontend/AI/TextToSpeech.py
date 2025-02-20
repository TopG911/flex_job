import os
import random
import asyncio
import edge_tts
import pygame
from dotenv import dotenv_values

# Load environment variables
env_vars = dotenv_values(".env")
AssistantVoice = env_vars.get("AssistantVoice", "en-CA-LiamNeural") 

# Function to convert text to an audio file using edge_tts
async def TextToAudioFile(text) -> None:
    file_path = r"Data/speech.mp3"

    # Remove the file if it already exists
    if os.path.exists(file_path):
        os.remove(file_path)

    # Use the correct method name from edge_tts
    communicate = edge_tts.Communicate(text, AssistantVoice, pitch='+5Hz', rate='+13%')
    await communicate.save(file_path)

# Function to play the audio file using pygame
def TTS(Text, func=lambda r=None: True):
    try:
        # Convert text to an audio file
        asyncio.run(TextToAudioFile(Text))

        # Initialize pygame mixer
        pygame.mixer.init()
        
        # Load and play the audio file
        pygame.mixer.music.load(r"Data/speech.mp3")
        pygame.mixer.music.play()

        # Wait while the audio is playing
        while pygame.mixer.music.get_busy():
            if func() == False:
                break
            pygame.time.Clock().tick(10)

        return True

    except Exception as e:
        print(f"Error in TTS: {e}")

    finally:
        try:
            # Clean up pygame mixer
            func(False)
            if pygame.mixer.get_init():
                pygame.mixer.music.stop()
                pygame.mixer.quit()

        except Exception as e:
            print(f"Error in finally block: {e}")

# Function to handle text-to-speech logic with response handling
def TextToSpeech(Text, func=lambda r=None: True):
    # Split the input text into sentences
    Data = str(Text).split(".")
    responses = [
        "The rest of the result has been printed to the chat screen, kindly check it out, sir.",
        "The remaining part of the text is now on the chat screen, sir.",
        "Sir, you'll find more text on the chat screen.",
        "Please check the chat screen for the rest of the information, sir.",
    ]

    # Determine whether to split the text or play it directly
    if len(Data) > 4 and len(Text) >= 250:
        TTS("".join(Text.split(".")[0:2]) + "." + random.choice(responses), func)
    else:
        TTS(Text, func)

if __name__ == "__main__":
    while True:
        TextToSpeech(input("Enter the text to convert to speech: "))



