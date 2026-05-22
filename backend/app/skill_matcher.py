import re
from typing import List, Set

import os
import json

# Paths for the models - relative to the app directory if running from backend root
MODELS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models")
SKILLS_DB_PATH = os.path.join(MODELS_DIR, "skills_db.json")

def load_skills():
    if os.path.exists(SKILLS_DB_PATH):
        try:
            with open(SKILLS_DB_PATH, "r") as f:
                data = json.load(f)
            skills = set()
            for cat in data.values():
                skills.update(cat)
            return skills
        except Exception as e:
            print(f"Error loading skills_db.json: {e}")
            return {"python", "java", "sql", "react"} # fallback
    else:
        return {"python", "java", "sql", "react"}

CURATED_SKILLS = load_skills()

def extract_skills(text: str) -> List[str]:
    """
    Extracts skills from text using a curated skills dictionary.
    """
    text_lower = text.lower()
    
    # Remove some punctuation
    text_clean = re.sub(r'[^\w\s\+]', ' ', text_lower)
    
    found_skills = set()
    for skill in CURATED_SKILLS:
        # Check for whole word match
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_clean):
            found_skills.add(skill)
            
    return list(found_skills)

def get_missing_skills(resume_skills: List[str], jd_text: str) -> List[str]:
    """
    Finds skills present in JD but missing in Resume.
    """
    jd_skills = extract_skills(jd_text)
    resume_skills_set = set(resume_skills)
    
    missing = [skill for skill in jd_skills if skill not in resume_skills_set]
    return missing
