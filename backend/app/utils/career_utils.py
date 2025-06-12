import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Sample career data (in a real application, this would come from a database)
CAREER_DATA = [
    {
        "career_title": "Software Developer",
        "skills": ["programming", "problem solving", "analytical thinking", "teamwork"],
        "interests": ["technology", "innovation", "coding", "problem solving"],
        "description": "Develop software applications and systems"
    },
    {
        "career_title": "Data Scientist",
        "skills": ["statistics", "programming", "machine learning", "data analysis"],
        "interests": ["data", "analytics", "research", "technology"],
        "description": "Analyze and interpret complex data"
    },
    {
        "career_title": "UX Designer",
        "skills": ["design", "user research", "creativity", "communication"],
        "interests": ["design", "user experience", "creativity", "technology"],
        "description": "Design user-friendly digital experiences"
    },
    {
        "career_title": "Marketing Manager",
        "skills": ["communication", "leadership", "analytics", "creativity"],
        "interests": ["marketing", "business", "communication", "strategy"],
        "description": "Develop and execute marketing strategies"
    },
    {
        "career_title": "Healthcare Professional",
        "skills": ["medical knowledge", "patient care", "communication", "empathy"],
        "interests": ["healthcare", "helping others", "science", "medicine"],
        "description": "Provide healthcare services to patients"
    },
    {
        "career_title": "Financial Analyst",
        "skills": ["analytical thinking", "financial modeling", "excel", "research"],
        "interests": ["finance", "business", "analytics", "economics"],
        "description": "Analyze financial data and trends"
    },
    {
        "career_title": "Content Creator",
        "skills": ["writing", "creativity", "social media", "communication"],
        "interests": ["content creation", "social media", "writing", "creativity"],
        "description": "Create engaging content for various platforms"
    },
    {
        "career_title": "Project Manager",
        "skills": ["leadership", "organization", "communication", "planning"],
        "interests": ["management", "leadership", "organization", "business"],
        "description": "Plan and execute projects successfully"
    }
]

def get_career_recommendations(skills, interests, top_n=3):
    """
    Get career recommendations based on skills and interests
    
    Args:
        skills (list): List of user skills
        interests (list): List of user interests
        top_n (int): Number of top recommendations to return
    
    Returns:
        list: List of recommended careers with scores
    """
    if not skills and not interests:
        return []
    
    # Combine skills and interests for analysis
    user_profile = " ".join(skills + interests).lower()
    
    # Create feature vectors for careers
    career_profiles = []
    for career in CAREER_DATA:
        career_profile = " ".join(career["skills"] + career["interests"]).lower()
        career_profiles.append(career_profile)
    
    # Use TF-IDF to vectorize the profiles
    vectorizer = TfidfVectorizer(stop_words='english')
    career_vectors = vectorizer.fit_transform(career_profiles)
    user_vector = vectorizer.transform([user_profile])
    
    # Calculate similarity scores
    similarity_scores = cosine_similarity(user_vector, career_vectors).flatten()
    
    # Get top recommendations
    top_indices = similarity_scores.argsort()[-top_n:][::-1]
    
    recommendations = []
    for idx in top_indices:
        if similarity_scores[idx] > 0:
            career = CAREER_DATA[idx].copy()
            career["match_score"] = round(similarity_scores[idx] * 100, 2)
            recommendations.append(career)
    
    return recommendations

def get_career_details(career_title):
    """
    Get detailed information about a specific career
    
    Args:
        career_title (str): Title of the career
    
    Returns:
        dict: Career details or None if not found
    """
    for career in CAREER_DATA:
        if career["career_title"].lower() == career_title.lower():
            return career
    return None

def get_all_careers():
    """
    Get all available careers
    
    Returns:
        list: List of all careers
    """
    return CAREER_DATA

def search_careers(query):
    """
    Search careers by title or description
    
    Args:
        query (str): Search query
    
    Returns:
        list: Matching careers
    """
    query = query.lower()
    matches = []
    
    for career in CAREER_DATA:
        if (query in career["career_title"].lower() or 
            query in career["description"].lower() or
            any(query in skill.lower() for skill in career["skills"]) or
            any(query in interest.lower() for interest in career["interests"])):
            matches.append(career)
    
    return matches 