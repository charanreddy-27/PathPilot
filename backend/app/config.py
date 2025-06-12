# PATHPILOT-MAIN/backend/config.py
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("--- EXECUTING config.py (DEBUG VERSION V3) ---")

class Config:
    print("--- Defining Config class in config.py (V3) ---")
    # Flask Configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
    DEBUG = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    # MongoDB Configuration
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/pathpilot')
    
    # API Configuration
    API_PREFIX = '/api'
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')
    
    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'your-jwt-secret-key-here')
    JWT_ACCESS_TOKEN_EXPIRES = 3600  # 1 hour
    
    # Rasa Configuration
    RASA_URL = os.getenv('RASA_URL', 'http://localhost:5005')
    
    # Rate Limiting
    RATELIMIT_DEFAULT = "100 per minute"
    RATELIMIT_STORAGE_URL = "memory://"

print("--- FINISHED EXECUTING config.py (DEBUG VERSION V3) ---")