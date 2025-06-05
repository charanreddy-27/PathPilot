# PATHPILOT-MAIN/backend/app/routes/career_data_routes.py
from flask import Blueprint

bp = Blueprint('careers', __name__)

# We will add routes here later
@bp.route('/')
def index():
    return "Career data blueprint placeholder"