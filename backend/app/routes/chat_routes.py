# PATHPILOT-MAIN/backend/app/routes/chat_routes.py
from flask import Blueprint
from app.controllers.chat_controller import process_chat_message, get_chat_history

bp = Blueprint('chat', __name__)

@bp.route('/', methods=['GET'])
def index():
    return "Chat API is running"

@bp.route('/message', methods=['POST'])
def chat_message():
    return process_chat_message()

@bp.route('/history', methods=['GET'])
def chat_history():
    return get_chat_history()