from groq import Groq
from json import load, dump
import datetime
from dotenv import dotenv_values


# Load environment variables from the .env file
env_vars = dotenv_values(".env")

# Retrieve specific environment variables for the username, assistant name, and API key
Username = env_vars.get("Username")
Assistantname = env_vars.get("Assistantname")
GorqAPIKey = env_vars.get("GorqAPIKey")

# Initialize a Groq client using the provided API key
client = Groq(api_key=GorqAPIKey)

# Initialize an empty list to store chat messages
messages = []

# Define a system message to guide the AI chatbot about its role and behavior
System = f"""Hello, I am {Username}, You are a very accurate and advanced AI chatbot named {Assistantname} which also has real-time up-to-date information from the internet.
*** Do not tell time until I ask, do not talk too much, just answer the question.***
*** Reply in only English, even if the question is in Hindi, reply in English.***
*** Do not provide notes in the output, just answer the question and never mention your training data. ***
"""

# A list of system instructions for the character
SystemChatBot = [
    {"role": "system", "content": System}
]

# Attempt to load the chat log from a JSON file
try:
    with open(r"ChatHistory.json", "r") as f:
        messages = load(f)
except FileNotFoundError:
    with open(r"Data\ChatLog.json", "w") as f:
        dump([], f)

# Function to get the current date and time
def RealtimeInformation():
    current_date_time= datetime.datetime.now()#get the current date and time
    day = current_date_time.strftime("%A")#get the current day
    date = current_date_time.strftime("%d")#get the current date
    month = current_date_time.strftime("%B")#get the current month
    year = current_date_time.strftime("%Y")#get the current year
    hour = current_date_time.strftime("%H")#get the current hour
    minute = current_date_time.strftime("%M")#get the current minute
    second = current_date_time.strftime("%S")#get the current second

    #format the information into a string
    data = f"Please ise this real-time information if needed,\n"
    data += f"Day: {day}\n date: {date}\n month: {month}\n year: {year}\n"
    data += f"Time: {hour}hours:{minute}minuites:{second}seconds.\n"
    return data
    

# Function to modify the chatbot's response for better formatting
def AnswerModifier(Answer):
    lines = Answer.split("\n")
    non_empty_lines = [line for line in lines if line.strip()]
    modified_Answer = "\n".join(non_empty_lines)
    return modified_Answer

# Main chatbot function to handle user queries
def ChatBot(query):
    """This function sends the user's query to the chatbot and returns the AI's response."""
    try:
        # Load the existing chat history from the JSON file
        with open(r"Data\ChatLog.json", "r") as f:
            messages = load(f)

        # Append the user's query to the chat history
        messages.append({"role": "user", "content": f"{query}"})

        # Make a request to the Groq API for the response
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=SystemChatBot + [{"role": "system", "content": RealtimeInformation()}] + messages,
            max_tokens=1024,
            temperature=0.7,
            top_p=1,
            stream=True,
            stop=None
        )

        Answer = "" # Initialize an empty string to store the AI's response

        # Process the streamed response chunks
        for chunk in completion:
            if chunk.choices[0].delta.content:
                Answer += chunk.choices[0].delta.content

        Answer = Answer.replace("</s>", "")
        messages.append({"role": "assistant", "content": Answer})

        # Save the updated chat history
        with open(r"Data\ChatLog.json", "w") as f:
            dump(messages, f, indent=4)

        return AnswerModifier(Answer=Answer)

    except Exception as e:
        print(f"Error: {e}")
        with open(r"Data\ChatLog.json", "w") as f:
            dump([], f, indent=4)
        return ChatBot(query)

# Main program entry point
if __name__ == "__main__":
    while True:
        user_input = input("Enter your question: ")
        print(ChatBot(user_input))

