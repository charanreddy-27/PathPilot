from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import logging

logger = logging.getLogger(__name__)

class Database:
    def __init__(self, uri):
        self.client = MongoClient(uri)
        self.db = self.client.get_default_database()
        
    def test_connection(self):
        """Test the database connection"""
        try:
            # The ismaster command is cheap and does not require auth
            self.client.admin.command('ismaster')
            logger.info("Database connection successful")
            return True
        except ConnectionFailure:
            logger.error("Database connection failed")
            return False
            
    def init_collections(self):
        """Initialize database collections with indexes"""
        try:
            # Users collection
            users = self.db.users
            users.create_index("email", unique=True)
            
            # Chat history collection
            chat_history = self.db.chat_history
            chat_history.create_index([("user_id", 1), ("timestamp", -1)])
            
            # Career recommendations collection
            career_data = self.db.career_data
            career_data.create_index("career_title")
            
            logger.info("Database collections initialized successfully")
            return True
        except Exception as e:
            logger.error(f"Failed to initialize collections: {e}")
            return False
            
    def get_collection(self, name):
        """Get a collection by name"""
        return self.db[name]
        
    def close(self):
        """Close the database connection"""
        self.client.close() 