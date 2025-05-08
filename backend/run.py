# PATHPILOT-MAIN/backend/run.py
# NO sys.path modifications needed here when running with 'python -m backend.run' from root

print("--- EXECUTING run.py (DEBUG VERSION V2) ---") # Updated print

try:
    # This import works because 'backend' is a package visible when
    # PATHPILOT-MAIN is on sys.path (which 'python -m' does).
    from backend.app import create_app
    print(f"SUCCESSFULLY IMPORTED create_app: {create_app}")
except ImportError as e:
    print(f"IMPORT ERROR in run.py for 'from backend.app import create_app': {e}")
    raise # Re-raise to see the full traceback
except Exception as e:
    print(f"UNEXPECTED ERROR in run.py during 'from backend.app import create_app': {e}")
    raise

# This is the app instance we will eventually run
# app = create_app() # We'll uncomment this once imports in app/__init__.py are fixed

if __name__ == '__main__':
    print("--- MAIN BLOCK IN RUN.PY (V2) ---")
    # For now, just call create_app to trigger its imports and print statements
    # We are not starting the full Flask server yet, to isolate the import issues
    # in app/__init__.py
    temp_app_instance_for_testing_create_app = create_app()
    print(f"Result of create_app() for testing: {temp_app_instance_for_testing_create_app}")
    print("--- FINISHED EXECUTING run.py (DEBUG VERSION V2) ---")
    # Once everything is working, we'll uncomment the actual app.run:
    # print("Attempting to start Flask app...")
    # app.run(debug=True, host='0.0.0.0', port=5001)