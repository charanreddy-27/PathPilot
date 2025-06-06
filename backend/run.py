from app import create_app
import os
import logging
import sys

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stdout
)
logger = logging.getLogger(__name__)

try:
    logger.info("Creating Flask application...")
    app = create_app()
    
    if __name__ == '__main__':
        port = int(os.environ.get('PORT', 5000))
        logger.info(f"Starting Flask app on port {port}")
        app.run(host='0.0.0.0', port=port, debug=True)
except Exception as e:
    logger.error(f"Failed to start application: {str(e)}")
    raise
