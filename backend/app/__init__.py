# PATHPILOT-MAIN/backend/app/__init__.py
print("<<<<< EXECUTING THE LATEST VERSION OF app/__init__.py - JANET DEBUG 12345 >>>>>") # UNIQUE PRINT
import sys
import os

print(f"--- EXECUTING app/__init__.py (DEBUG VERSION V3) ---")
print(f"Current working directory in app/__init__.py: {os.getcwd()}")
print(f"sys.path in app/__init__.py BEFORE config import: {sys.path}")

try:
    print(f"Attempting in app/__init__.py: from ..config import Config")
    from ..config import Config  # This relative import should be correct
    print(f"SUCCESSFULLY IMPORTED Config in app/__init__.py: {Config}")
except ImportError as e:
    print(f"IMPORT ERROR in app/__init__.py for 'from ..config import Config': {e}")
    print(f"sys.path ON ERROR during config import in app/__init__.py: {sys.path}")
    raise
except Exception as e:
    print(f"UNEXPECTED ERROR in app/__init__.py during 'from ..config import Config': {e}")
    print(f"sys.path ON UNEXPECTED ERROR during config import in app/__init__.py: {sys.path}")
    raise

# Dummy create_app for now
def create_app():
    print("Dummy create_app in app/__init__.py called.")
    return "DummyAppInstance"

print(f"--- FINISHED EXECUTING app/__init__.py (DEBUG VERSION V3) ---")