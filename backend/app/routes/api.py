from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import pandas as pd
from app.utils.career_utils import get_career_recommendations
from app.utils.chat_bot import SimpleChatBot
from app.utils.error_handlers import ValidationError

api_bp = Blueprint('api', __name__)
chat_bot = SimpleChatBot()

@api_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend API is running"})

@api_bp.route('/chat', methods=['POST'])
@jwt_required()
def chat():
    data = request.get_json()
    user_message = data.get('message')
    
    if not user_message:
        raise ValidationError('Message is required')
    
    # Get user ID from JWT token
    user_id = get_jwt_identity()
    
    # Get response from chat bot
    bot_response = chat_bot.get_response(user_message)
    
    # Save chat history
    if current_app.database:
        chat_bot.save_chat_history(current_app.database, user_id, user_message, bot_response)
    
    return jsonify({
        "response": bot_response,
        "timestamp": pd.Timestamp.now().isoformat()
    })

@api_bp.route('/chat/history', methods=['GET'])
@jwt_required()
def get_chat_history():
    user_id = get_jwt_identity()
    
    if not current_app.database:
        return jsonify({"history": []})
    
    history = chat_bot.get_chat_history(current_app.database, user_id)
    
    # Convert ObjectId to string for JSON serialization
    for record in history:
        record['_id'] = str(record['_id'])
        record['timestamp'] = record['timestamp'].isoformat()
    
    return jsonify({"history": history})

@api_bp.route('/career-recommendations', methods=['POST'])
@jwt_required()
def get_recommendations():
    data = request.get_json()
    skills = data.get('skills', [])
    interests = data.get('interests', [])
    
    if not skills and not interests:
        raise ValidationError('Skills or interests are required')
    
    recommendations = get_career_recommendations(skills, interests)
    return jsonify({"recommendations": recommendations}) 