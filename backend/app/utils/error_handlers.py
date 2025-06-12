from flask import jsonify
from werkzeug.exceptions import HTTPException

class APIError(Exception):
    """Base API Exception"""
    def __init__(self, message, status_code=400, payload=None):
        super().__init__()
        self.message = message
        self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        rv['status'] = 'error'
        return rv

class ValidationError(APIError):
    """Validation Exception"""
    def __init__(self, message):
        super().__init__(message, status_code=422)

class AuthenticationError(APIError):
    """Authentication Exception"""
    def __init__(self, message):
        super().__init__(message, status_code=401)

class AuthorizationError(APIError):
    """Authorization Exception"""
    def __init__(self, message):
        super().__init__(message, status_code=403)

def register_error_handlers(app):
    @app.errorhandler(APIError)
    def handle_api_error(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    @app.errorhandler(HTTPException)
    def handle_http_error(error):
        response = jsonify({
            'status': 'error',
            'message': error.description,
        })
        response.status_code = error.code
        return response

    @app.errorhandler(Exception)
    def handle_generic_error(error):
        response = jsonify({
            'status': 'error',
            'message': 'An unexpected error occurred',
        })
        response.status_code = 500
        return response 