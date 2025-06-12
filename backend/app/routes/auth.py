from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from ..models.user import User
from ..utils.error_handlers import ValidationError, AuthenticationError

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate input
    if not all(k in data for k in ('email', 'password', 'name')):
        raise ValidationError('Missing required fields')
        
    try:
        user_model = User(current_app.db)
        user = user_model.create_user(
            email=data['email'],
            password=data['password'],
            name=data['name']
        )
        
        # Create access token
        access_token = create_access_token(identity=str(user['_id']))
        
        return jsonify({
            'status': 'success',
            'message': 'User registered successfully',
            'access_token': access_token
        }), 201
        
    except ValueError as e:
        raise ValidationError(str(e))

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate input
    if not all(k in data for k in ('email', 'password')):
        raise ValidationError('Missing email or password')
        
    user_model = User(current_app.db)
    user = user_model.authenticate(data['email'], data['password'])
    
    if not user:
        raise AuthenticationError('Invalid email or password')
        
    # Create access token
    access_token = create_access_token(identity=str(user['_id']))
    
    return jsonify({
        'status': 'success',
        'access_token': access_token
    })

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user_id = get_jwt_identity()
    user_model = User(current_app.db)
    user = user_model.get_user_by_id(current_user_id)
    
    if not user:
        raise AuthenticationError('User not found')
        
    # Remove sensitive data
    user.pop('password', None)
    
    return jsonify({
        'status': 'success',
        'user': user
    }) 