from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import logging

from .config import Config
from .utils.error_handlers import register_error_handlers
from .utils.database import Database

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
    
    # Initialize database
    try:
        app.database = Database(app.config['MONGO_URI'])
        if app.database.test_connection():
            app.database.init_collections()
            logger.info("Database initialized successfully")
        else:
            logger.error("Failed to connect to database")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        app.database = None
    
    # Register error handlers
    register_error_handlers(app)
    
    # Register blueprints
    from .routes.api import api_bp
    from .routes.auth import auth_bp
    app.register_blueprint(api_bp, url_prefix=app.config['API_PREFIX'])
    app.register_blueprint(auth_bp, url_prefix=f"{app.config['API_PREFIX']}/auth")
    
    logger.info("Flask application initialization complete")
    return app
