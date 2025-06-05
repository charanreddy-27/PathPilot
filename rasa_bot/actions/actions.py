from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import requests

class ActionGetCareerRecommendations(Action):
    def name(self) -> Text:
        return "action_get_career_recommendations"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        skills = tracker.get_slot("skills") or []
        interests = tracker.get_slot("interests") or []
        
        # Call backend API for recommendations
        try:
            response = requests.post(
                "http://backend:5000/api/career-recommendations",
                json={"skills": skills, "interests": interests}
            )
            recommendations = response.json().get("recommendations", [])
            
            if recommendations:
                message = "Based on your profile, here are some career recommendations:\n\n"
                for i, rec in enumerate(recommendations, 1):
                    message += f"{i}. {rec['title']}\n"
                    message += f"   Description: {rec['description']}\n"
                    message += f"   Required Skills: {rec['skills_required']}\n\n"
            else:
                message = "I couldn't find specific recommendations. Try providing more details about your skills and interests."
                
            dispatcher.utter_message(text=message)
            
        except Exception as e:
            dispatcher.utter_message(text="I'm having trouble getting recommendations right now. Please try again later.")
        
        return []



