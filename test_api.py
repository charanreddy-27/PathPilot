import requests
import json
import time

# Base URL for the API
BASE_URL = "http://localhost:5000/api"

def test_health_check():
    """Test the health check endpoint"""
    print("=== Testing Health Check ===")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_user_registration():
    """Test user registration"""
    print("\n=== Testing User Registration ===")
    try:
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword123"
        }
        response = requests.post(f"{BASE_URL}/auth/register", json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 201
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_user_login():
    """Test user login"""
    print("\n=== Testing User Login ===")
    try:
        data = {
            "email": "test@example.com",
            "password": "testpassword123"
        }
        response = requests.post(f"{BASE_URL}/auth/login", json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        if response.status_code == 200:
            token = response.json().get('token')
            return token
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

def test_chat_endpoint(token):
    """Test chat endpoint"""
    print("\n=== Testing Chat Endpoint ===")
    try:
        headers = {"Authorization": f"Bearer {token}"}
        data = {
            "message": "Hello, I need career advice"
        }
        response = requests.post(f"{BASE_URL}/chat", json=data, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_career_recommendations(token):
    """Test career recommendations endpoint"""
    print("\n=== Testing Career Recommendations ===")
    try:
        headers = {"Authorization": f"Bearer {token}"}
        data = {
            "interests": ["technology", "programming"],
            "skills": ["Python", "JavaScript"],
            "experience": "beginner"
        }
        response = requests.post(f"{BASE_URL}/career/recommendations", json=data, headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_protected_endpoint(token):
    """Test protected endpoint"""
    print("\n=== Testing Protected Endpoint ===")
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}/user/profile", headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def main():
    """Run all tests"""
    print("Starting API Tests...")
    print("Make sure the Flask server is running on http://localhost:5000")
    
    # Test health check
    health_ok = test_health_check()
    if not health_ok:
        print("❌ Health check failed. Server might not be running.")
        return
    
    # Test registration
    registration_ok = test_user_registration()
    
    # Test login
    token = test_user_login()
    if not token:
        print("❌ Login failed. Cannot proceed with authenticated tests.")
        return
    
    # Test authenticated endpoints
    chat_ok = test_chat_endpoint(token)
    career_ok = test_career_recommendations(token)
    protected_ok = test_protected_endpoint(token)
    
    # Summary
    print("\n=== Test Summary ===")
    print(f"Health Check: {'✅' if health_ok else '❌'}")
    print(f"Registration: {'✅' if registration_ok else '❌'}")
    print(f"Login: {'✅' if token else '❌'}")
    print(f"Chat: {'✅' if chat_ok else '❌'}")
    print(f"Career Recommendations: {'✅' if career_ok else '❌'}")
    print(f"Protected Endpoint: {'✅' if protected_ok else '❌'}")

if __name__ == "__main__":
    main() 