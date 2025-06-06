from flask import Flask
from flask_cors import CORS
import logging

logger = logging.getLogger(__name__)

def create_app():
    logger.info("Initializing Flask application...")
    app = Flask(__name__)
    logger.info("Configuring CORS...")
    CORS(app)
    
    logger.info("Registering blueprints...")
    from .routes.api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')
    
    logger.info("Flask application initialization complete")
    return app
