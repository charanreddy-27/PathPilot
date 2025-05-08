# PATHPILOT-MAIN/backend/run.py
# NO sys.path modifications.

print("--- EXECUTING run.py (DEBUG VERSION V3) ---")

try:
    # Relative import because run.py is part of the 'backend' package when using 'python -m backend.run'
    from .app import create_app
    print(f"SUCCESSFULLY IMPORTED create_app: {create_app}")
except ImportError as e:
    print(f"IMPORT ERROR in run.py for 'from .app import create_app': {e}")
    raise
except Exception as e:
    print(f"UNEXPECTED ERROR in run.py during 'from .app import create_app': {e}")
    raise

if __name__ == '__main__':
    print("--- MAIN BLOCK IN RUN.PY (V3) ---")
    temp_app_instance_for_testing_create_app = create_app()
    print(f"Result of create_app() for testing: {temp_app_instance_for_testing_create_app}")
    print("--- FINISHED EXECUTING run.py (DEBUG VERSION V3) ---")