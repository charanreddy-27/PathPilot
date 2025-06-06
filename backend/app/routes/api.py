from flask import Blueprint, request, jsonify
import requests
import os
import pandas as pd
from app.utils.career_utils import get_career_recommendations

api_bp = Blueprint('api', __name__)

@api_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend API is running"})

@api_bp.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    
    # Forward the message to Rasa
    rasa_url = os.environ.get('RASA_URL', 'http://rasa:5005')
    response = requests.post(
        f"{rasa_url}/webhooks/rest/webhook",
        json={"sender": "user", "message": user_message}
    )
    
    return jsonify(response.json())

@api_bp.route('/career-recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    skills = data.get('skills', [])
    interests = data.get('interests', [])
    
    recommendations = get_career_recommendations(skills, interests)
    return jsonify({"recommendations": recommendations}) 