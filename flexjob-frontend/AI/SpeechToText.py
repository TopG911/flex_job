
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from dotenv import dotenv_values
import os
import mtranslate as mt
import time

# Load environment variables
env_vars = dotenv_values(".env")
DefaultLanguage = env_vars.get("DefaultLanguage", "en")  # Default language for output translation

# HTML code for speech recognition with language selection
HtmlCode = '''<!DOCTYPE html>
<html lang="en">
<head>
    <title>Multilingual Speech Recognition</title>
</head>
<body>
    <label for="language">Choose Language:</label>
    <select id="language">
        <option value="en-US">English (US)</option>
        <option value="es-ES">Spanish</option>
        <option value="fr-FR">French</option>
        <option value="de-DE">German</option>
        <option value="zh-CN">Chinese (Simplified)</option>
        <option value="ja-JP">Japanese</option>
        <option value="hi-IN">Hindi</option>
    </select>
    <button id="start" onclick="startRecognition()">Start Recognition</button>
    <button id="end" onclick="stopRecognition()">Stop Recognition</button>
    <p id="output"></p>
    <script>
        const output = document.getElementById('output');
        const languageSelector = document.getElementById('language');
        let recognition;

        function startRecognition() {
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = languageSelector.value;
            recognition.continuous = false;

            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                output.textContent = transcript;
            };

            recognition.onerror = function(event) {
                output.textContent = 'Error: ' + event.error;
            };

            recognition.start();
        }

        function stopRecognition() {
            if (recognition) recognition.stop();
        }
    </script>
</body>
</html>'''

# Save the HTML file
os.makedirs("Data", exist_ok=True)
with open(r"Data/Voice.html", "w") as f:
    f.write(HtmlCode)

# Get the file path for the Voice.html
current_dir = os.getcwd()
Link = f"file:///{current_dir}/Data/Voice.html"

# Configure Chrome options for Selenium
chrome_options = Options()
chrome_options.add_argument("--use-fake-ui-for-media-stream")
chrome_options.add_argument("--use-fake-device-for-media-stream")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Initialize the Selenium WebDriver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

def QueryModifier(query):
    """Modify the query for proper grammar and punctuation."""
    query = query.strip().capitalize()
    if not query.endswith(('.', '?', '!')):
        query += '.'
    return query

def UniversalTranslator(text, target_language="en"):
    """Translate text to the target language using the mtranslate library."""
    return mt.translate(text, target_language, "auto").capitalize()

def SpeechRecognition(timeout=10):
    """Perform speech recognition and return the recognized text."""
    driver.get(Link)  # Load the HTML file in the browser
    driver.find_element(by=By.ID, value="start").click()
    end_time = time.time() + timeout

    while time.time() < end_time:
        try:
            # Check for recognized text in the output element
            Text = driver.find_element(by=By.ID, value="output").text
            if Text:
                driver.find_element(by=By.ID, value="end").click()
                return QueryModifier(UniversalTranslator(Text, DefaultLanguage))
        except Exception:
            pass  # Ignore errors and continue

    driver.find_element(by=By.ID, value="end").click()  # Stop recognition
    return "No speech detected within the timeout period."

if __name__ == "__main__":
    try:
        while True:
            print("Starting speech recognition...")
            result = SpeechRecognition()
            print(f"Recognized Speech: {result}")
    except KeyboardInterrupt:
        print("Exiting...")
        driver.quit()