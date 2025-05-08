# PATHPILOT-MAIN/backend/app/__init__.py
print("<<<<< EXECUTING THE LATEST VERSION OF app/__init__.py - JANET DEBUG 12345 >>>>>") # UNIQUE PRINT
import sys
import os

print(f"--- EXECUTING app/__init__.py (DEBUG VERSION V2) ---") # Updated print
print(f"Current working directory in app/__init__.py: {os.getcwd()}")
print(f"sys.path in app/__init__.py BEFORE config import: {sys.path}")

try:
    print(f"Attempting in app/__init__.py: from ..config import Config")
    from ..config import Config  # RELATIVE IMPORT
    print(f"SUCCESSFULLY IMPORTED Config in app/__init__.py: {Config}")
except ImportError as e:
    print(f"IMPORT ERROR in app/__init__.py for 'from ..config import Config': {e}")
    print(f"sys.path ON ERROR during config import in app/__init__.py: {sys.path}")
    raise
except Exception as e:
    print(f"UNEXPECTED ERROR in app/__init__.py during 'from ..config import Config': {e}")
    print(f"sys.path ON UNEXPECTED ERROR during config import in app/__init__.py: {sys.path}")
    raise

# For now, comment out Flask and blueprint parts to focus ONLY on the config import
# from flask import Flask
# from flask_pymongo import PyMongo
# from flask_cors import CORS
# mongo = PyMongo()
# def create_app(config_class=Config):
    # ...
    # return app

# Define a dummy create_app so run.py can still import something named create_app
def create_app():
    print("Dummy create_app in app/__init__.py called.")
    # We could return a simple object or None, just to satisfy the import in run.py
    return "DummyAppInstance"

print(f"--- FINISHED EXECUTING app/__init__.py (DEBUG VERSION V2) ---")