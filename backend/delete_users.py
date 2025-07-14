import os
from app.utils.database import Database
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def delete_all_users():
    mongo_uri = os.getenv("MONGO_URI")
    if not mongo_uri:
        logger.error("MONGO_URI environment variable not set.")
        return

    db_instance = None
    try:
        db_instance = Database(mongo_uri)
        if db_instance.test_connection():
            users_collection = db_instance.get_collection("users")
            result = users_collection.delete_many({})
            logger.info(f"Successfully deleted {result.deleted_count} users from the database.")
        else:
            logger.error("Could not connect to the database.")
    except Exception as e:
        logger.error(f"An error occurred: {e}")
    finally:
        if db_instance:
            db_instance.close()

if __name__ == "__main__":
    logger.info("Starting script to delete all users...")
    delete_all_users()
    logger.info("Script finished.") 