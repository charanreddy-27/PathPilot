# PATHPILOT-MAIN/backend/config.py
import os
# from dotenv import load_dotenv # Comment out for now to reduce variables

print("--- EXECUTING config.py (DEBUG VERSION V2) ---")

# load_dotenv()

class Config:
    print("--- Defining Config class in config.py (V2) ---")
    SECRET_KEY = "test_secret" # Hardcode for now
    MONGO_URI = "test_mongo_uri"
    RASA_SERVER_URL = "test_rasa_url"

print("--- FINISHED EXECUTING config.py (DEBUG VERSION V2) ---")