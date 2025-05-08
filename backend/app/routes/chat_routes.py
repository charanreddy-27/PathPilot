# PATHPILOT-MAIN/backend/app/routes/chat_routes.py
from flask import Blueprint

bp = Blueprint('chat', __name__)

# We will add routes here later
@bp.route('/')
def index():
    return "Chat blueprint placeholder"