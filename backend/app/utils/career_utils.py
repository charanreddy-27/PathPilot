import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def load_career_data():
    return pd.read_csv('career_recommender.csv')

def get_career_recommendations(skills, interests, top_n=5):
    df = load_career_data()
    
    # Combine skills and interests for comparison
    user_profile = ' '.join(skills + interests)
    
    # Create TF-IDF vectors
    tfidf = TfidfVectorizer(stop_words='english')
    career_vectors = tfidf.fit_transform(df['skills'].fillna('') + ' ' + df['description'].fillna(''))
    user_vector = tfidf.transform([user_profile])
    
    # Calculate similarities
    similarities = cosine_similarity(user_vector, career_vectors)
    
    # Get top recommendations
    top_indices = similarities[0].argsort()[-top_n:][::-1]
    
    recommendations = []
    for idx in top_indices:
        recommendations.append({
            'title': df.iloc[idx]['title'],
            'description': df.iloc[idx]['description'],
            'skills_required': df.iloc[idx]['skills'],
            'similarity_score': float(similarities[0][idx])
        })
    
    return recommendations 