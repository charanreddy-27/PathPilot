import random
from datetime import datetime

class SimpleChatBot:
    def __init__(self):
        self.responses = {
            'greeting': [
                "Hello! I'm your career counselor. How can I help you today?",
                "Hi there! I'm here to help you with your career questions.",
                "Welcome! I'm excited to help you explore your career options."
            ],
            'career_advice': [
                "Based on your interests, I'd recommend exploring careers in technology, healthcare, or creative fields.",
                "Consider your strengths and passions when choosing a career path.",
                "It's important to research different career options and talk to professionals in those fields."
            ],
            'skills': [
                "Some valuable skills for today's job market include: communication, problem-solving, adaptability, and technical skills.",
                "Focus on developing both hard skills (technical) and soft skills (interpersonal).",
                "Continuous learning and skill development are key to career success."
            ],
            'education': [
                "Education requirements vary by career. Some careers require degrees, while others focus on experience and certifications.",
                "Consider both traditional education and alternative learning paths like online courses and bootcamps.",
                "Research the educational requirements for your desired career path."
            ],
            'job_search': [
                "Start by updating your resume and building a professional online presence.",
                "Network with professionals in your desired field and attend industry events.",
                "Use job boards, LinkedIn, and company websites to find opportunities."
            ],
            'default': [
                "That's an interesting question! Could you tell me more about your specific situation?",
                "I'd be happy to help you with that. What aspects would you like to explore further?",
                "That's a great topic to discuss. Let me know if you have any specific questions about it."
            ]
        }
        
    def get_response(self, message):
        """Get a response based on the user's message"""
        message = message.lower()
        
        # Simple keyword matching
        if any(word in message for word in ['hello', 'hi', 'hey', 'greetings']):
            return random.choice(self.responses['greeting'])
        elif any(word in message for word in ['career', 'job', 'profession', 'work']):
            return random.choice(self.responses['career_advice'])
        elif any(word in message for word in ['skill', 'ability', 'learn', 'develop']):
            return random.choice(self.responses['skills'])
        elif any(word in message for word in ['education', 'degree', 'school', 'study']):
            return random.choice(self.responses['education'])
        elif any(word in message for word in ['find', 'search', 'apply', 'hiring']):
            return random.choice(self.responses['job_search'])
        else:
            return random.choice(self.responses['default'])
            
    def save_chat_history(self, database, user_id, message, response):
        """Save chat history to database"""
        try:
            chat_collection = database.get_collection('chat_history')
            chat_record = {
                'user_id': user_id,
                'user_message': message,
                'bot_response': response,
                'timestamp': datetime.utcnow()
            }
            chat_collection.insert_one(chat_record)
        except Exception as e:
            print(f"Error saving chat history: {e}")
            
    def get_chat_history(self, database, user_id, limit=10):
        """Get chat history for a user"""
        try:
            chat_collection = database.get_collection('chat_history')
            history = chat_collection.find(
                {'user_id': user_id}
            ).sort('timestamp', -1).limit(limit)
            return list(history)
        except Exception as e:
            print(f"Error getting chat history: {e}")
            return [] 