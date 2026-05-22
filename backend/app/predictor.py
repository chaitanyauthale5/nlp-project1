import os
import pickle
import logging

logger = logging.getLogger(__name__)

# Paths for the models - relative to the app directory if running from backend root
MODELS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models")
MODEL_PATH = os.path.join(MODELS_DIR, "best_model.pkl")
VECTORIZER_PATH = os.path.join(MODELS_DIR, "vectorizer.pkl")

# Keep models in memory once loaded
_model = None
_vectorizer = None
_models_loaded = False

def load_models():
    global _model, _vectorizer, _models_loaded
    if _models_loaded:
        return True
        
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        try:
            with open(MODEL_PATH, "rb") as f:
                _model = pickle.load(f)
            with open(VECTORIZER_PATH, "rb") as f:
                _vectorizer = pickle.load(f)
            _models_loaded = True
            logger.info("Machine Learning models loaded successfully.")
            return True
        except Exception as e:
            logger.error(f"Error loading models: {e}")
            return False
    else:
        logger.warning(f"Models not found at {MODELS_DIR}. Falling back to heuristics.")
        return False

import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

nltk.download('punkt', quiet=True)
nltk.download('punkt_tab', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def preprocess_text(text: str) -> str:
    # lowercase
    text = text.lower()
    # remove punctuation and digits
    text = re.sub(r'[^a-z\s]', '', text)
    # tokenize
    tokens = word_tokenize(text)
    # stopword removal and lemmatization
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in stop_words]
    return ' '.join(tokens)

def predict_match(resume_text: str, jd_text: str) -> dict:
    """
    Predicts match score using loaded model or falls back to heuristics.
    """
    if load_models():
        try:
            processed_resume = preprocess_text(resume_text)
            processed_jd = preprocess_text(jd_text)
            
            # The exact way to combine for inference depends on how the model was trained.
            # Usually, if it's a vectorizer taking [text], it might be trained on combined text.
            combined_text = processed_resume + " " + processed_jd
            features = _vectorizer.transform([combined_text])
            
            # Assuming model has predict_proba and the positive class is index 1
            if hasattr(_model, "predict_proba"):
                score_prob = _model.predict_proba(features)[0]
                # Assuming index 1 is "match"
                match_score = int(score_prob[1] * 100) if len(score_prob) > 1 else int(score_prob[0] * 100)
            else:
                # If it's a regression model or just predict()
                prediction = _model.predict(features)[0]
                match_score = int(prediction * 100) if prediction <= 1.0 else min(int(prediction), 100)
                
            prediction_label = "Excellent Match" if match_score > 80 else "Good Match" if match_score > 60 else "Poor Match"
            
            return {
                "match_score": match_score,
                "prediction": prediction_label
            }
        except Exception as e:
            logger.error(f"Inference error: {e}")
            # Fall through to heuristic if error
            
    # Heuristic Fallback
    from app.skill_matcher import extract_skills, get_missing_skills
    r_skills = extract_skills(resume_text)
    j_skills = extract_skills(jd_text)
    
    if not j_skills:
        match_score = 50
    else:
        matched = len(set(r_skills) & set(j_skills))
        match_score = int((matched / len(j_skills)) * 100)
        
    # Cap score
    match_score = min(max(match_score, 10), 98)
    
    prediction_label = "Excellent Match" if match_score > 80 else "Good Match" if match_score > 60 else "Poor Match"
    
    return {
        "match_score": match_score,
        "prediction": f"{prediction_label} (Heuristic)"
    }
