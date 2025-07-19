from flask import request, jsonify, current_app
from app.utils.chat_bot import SimpleChatBot

# Initialize the chat bot
chat_bot = SimpleChatBot()

def process_chat_message():
    """Process a chat message and return a response"""
    try:
        # Get the request data
        data = request.get_json()
        
        # Check if we have the expected data structure
        if not data:
            return jsonify({'error': 'Missing request data'}), 400
        
        # Handle both message formats (direct message or messages array)
        user_message = ""
        if 'message' in data:
            # Direct message format
            user_message = data['message']
        elif 'messages' in data and isinstance(data['messages'], list):
            # Messages array format from frontend
            messages = data['messages']
            if messages:
                # Get the last user message
                for msg in reversed(messages):
                    if msg.get('role') == 'user' and 'content' in msg:
                        user_message = msg['content']
                        break
        
        if not user_message:
            return jsonify({'error': 'No user message found in request'}), 400
            
        # Get user_id if provided, otherwise use a default
        user_id = data.get('user_id', 'anonymous')
        
        # Get a response from the chat bot
        response = chat_bot.get_response(user_message)
        
        # Save chat history if database is provided
        if 'db' in current_app.config and current_app.config['db']:
            chat_bot.save_chat_history(
                current_app.config['db'], 
                user_id, 
                user_message, 
                response
            )
            
        # Return the response
        return jsonify({
            'message': response,
            'timestamp': str(current_app.config.get('current_time', ''))
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_chat_history():
    """Get chat history for a user"""
    try:
        # Get the user_id from query parameters
        user_id = request.args.get('user_id', 'anonymous')
        
        # Get limit from query parameters, default to 10
        limit = int(request.args.get('limit', 10))
        
        # Check if database is available
        if 'db' not in current_app.config or not current_app.config['db']:
            return jsonify({'error': 'Database not available'}), 503
            
        # Get chat history from the database
        history = chat_bot.get_chat_history(
            current_app.config['db'], 
            user_id, 
            limit
        )
        
        # Return the chat history
        return jsonify({
            'history': history,
            'user_id': user_id
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
