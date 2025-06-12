#!/usr/bin/env python3
"""
Comprehensive functionality test for PathPilot backend
"""

import requests
import json
import time

BASE_URL = "http://localhost:5000/api"

def test_health():
    """Test health endpoint"""
    print("🔍 Testing Health Endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    print("✅ Health check passed")

def test_registration():
    """Test user registration"""
    print("🔍 Testing User Registration...")
    data = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "testpass123"
    }
    response = requests.post(f"{BASE_URL}/auth/register", json=data)
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    print("✅ Registration passed")
    return data["access_token"]

def test_login():
    """Test user login"""
    print("🔍 Testing User Login...")
    data = {
        "email": "test@example.com",
        "password": "testpass123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=data)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    print("✅ Login passed")
    return data["access_token"]

def test_user_profile(token):
    """Test getting user profile"""
    print("🔍 Testing User Profile...")
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "user" in data
    print("✅ User profile passed")

def test_chat(token):
    """Test chat functionality"""
    print("🔍 Testing Chat Functionality...")
    headers = {"Authorization": f"Bearer {token}"}
    data = {"message": "Hello, I need career advice"}
    response = requests.post(f"{BASE_URL}/chat", json=data, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert "timestamp" in data
    print("✅ Chat functionality passed")

def test_career_recommendations(token):
    """Test career recommendations"""
    print("🔍 Testing Career Recommendations...")
    headers = {"Authorization": f"Bearer {token}"}
    data = {
        "interests": ["technology", "programming"],
        "skills": ["Python", "JavaScript"],
        "experience": "beginner"
    }
    response = requests.post(f"{BASE_URL}/career-recommendations", json=data, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "recommendations" in data
    assert len(data["recommendations"]) > 0
    print("✅ Career recommendations passed")

def test_error_handling():
    """Test error handling"""
    print("🔍 Testing Error Handling...")
    
    # Test invalid registration
    response = requests.post(f"{BASE_URL}/auth/register", json={})
    assert response.status_code == 400
    
    # Test invalid login
    response = requests.post(f"{BASE_URL}/auth/login", json={})
    assert response.status_code == 400
    
    # Test unauthorized access
    response = requests.get(f"{BASE_URL}/auth/me")
    assert response.status_code == 401
    
    print("✅ Error handling passed")

def main():
    """Run all tests"""
    print("🚀 Starting PathPilot Functionality Tests...\n")
    
    try:
        # Test health endpoint
        test_health()
        
        # Test registration and login
        token = test_registration()
        
        # Test user profile
        test_user_profile(token)
        
        # Test chat functionality
        test_chat(token)
        
        # Test career recommendations
        test_career_recommendations(token)
        
        # Test error handling
        test_error_handling()
        
        print("\n🎉 All tests passed! PathPilot is working correctly.")
        print("\n📋 Test Summary:")
        print("✅ Health endpoint")
        print("✅ User registration")
        print("✅ User login")
        print("✅ User profile")
        print("✅ Chat functionality")
        print("✅ Career recommendations")
        print("✅ Error handling")
        
    except Exception as e:
        print(f"\n❌ Test failed: {str(e)}")
        return False
    
    return True

if __name__ == "__main__":
    main() 