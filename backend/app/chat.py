import random

MOCK_RESPONSES = [
    "That's a great point. Can you elaborate on your experience with that technology?",
    "Interesting! How did you handle conflicts within your team during that project?",
    "Could you walk me through your problem-solving process when facing a difficult bug?",
    "What would you say was your biggest achievement in that role?",
    "That sounds challenging. How did you ensure the project was delivered on time?",
    "I see. Where do you see your technical skills heading in the next few years?",
    "Thanks for sharing. Let's move on to a technical question. How would you design a scalable web application?",
    "Excellent answer. One more thing: how do you stay updated with the latest industry trends?"
]

def generate_chat_response(message: str) -> str:
    """
    Generates a mock response for the AI interview coach.
    """
    message_lower = message.lower()
    
    if "hello" in message_lower or "hi" in message_lower:
        return "Hello! I am your AI Interview Coach. Ready to start our mock interview? Tell me about a recent project you worked on."
    
    if "bye" in message_lower:
        return "Thank you for practicing. Good luck with your real interviews!"
        
    return random.choice(MOCK_RESPONSES)
