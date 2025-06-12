from datetime import datetime
import bcrypt
from bson import ObjectId

class User:
    def __init__(self, db):
        self.collection = db.users
        
    def create_user(self, email, password, name):
        """Create a new user"""
        # Check if user exists
        if self.collection.find_one({"email": email}):
            raise ValueError("Email already exists")
            
        # Hash password
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        
        user = {
            "email": email,
            "password": hashed,
            "name": name,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        result = self.collection.insert_one(user)
        user['_id'] = result.inserted_id
        return user
        
    def authenticate(self, email, password):
        """Authenticate a user"""
        user = self.collection.find_one({"email": email})
        if not user:
            return None
            
        if bcrypt.checkpw(password.encode('utf-8'), user['password']):
            return user
        return None
        
    def get_user_by_id(self, user_id):
        """Get user by ID"""
        return self.collection.find_one({"_id": ObjectId(user_id)})
        
    def update_user(self, user_id, update_data):
        """Update user data"""
        update_data['updated_at'] = datetime.utcnow()
        result = self.collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )
        return result.modified_count > 0
        
    def delete_user(self, user_id):
        """Delete a user"""
        result = self.collection.delete_one({"_id": ObjectId(user_id)})
        return result.deleted_count > 0 