from flask import Flask
from flask_cors import CORS
from app.routes import api_bp
import os

app = Flask(__name__)
CORS(app)

# Register blueprints
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)



