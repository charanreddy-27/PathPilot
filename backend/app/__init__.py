from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from pymongo import MongoClient
import logging

from .config import Config
from .utils.error_handlers import register_error_handlers

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize extensions
jwt = JWTManager()
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["100 per minute"]
)

def create_app(config_class=Config):
    logger.info("Initializing Flask application...")
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    CORS(app, origins=app.config['CORS_ORIGINS'])
    jwt.init_app(app)
    limiter.init_app(app)
    
    # Initialize MongoDB
    app.mongo_client = MongoClient(app.config['MONGO_URI'])
    app.db = app.mongo_client.get_default_database()
    
    # Register error handlers
    register_error_handlers(app)
    
    # Register blueprints
    from .routes.api import api_bp
    app.register_blueprint(api_bp, url_prefix=app.config['API_PREFIX'])
    
    logger.info("Flask application initialization complete")
    return app
