from pydantic import BaseModel
from typing import List, Optional

class ResumeUploadResponse(BaseModel):
    text: str
    skills: List[str]
    education: List[str]
    projects: List[str]

class MatchRequest(BaseModel):
    resume_text: str
    job_description: str

class MatchResponse(BaseModel):
    match_score: int
    prediction: str
    missing_skills: List[str]
    suggestions: List[str]

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
