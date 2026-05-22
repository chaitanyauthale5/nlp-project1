from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import ResumeUploadResponse, MatchRequest, MatchResponse, ChatRequest, ChatResponse
from app.parser import parse_resume_pdf
from app.skill_matcher import extract_skills, get_missing_skills
from app.predictor import predict_match
from app.chat import generate_chat_response

app = FastAPI(title="Campus AI Placement Copilot API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Campus AI Placement Copilot API"}

@app.post("/upload-resume", response_model=ResumeUploadResponse)
async def upload_resume(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    try:
        content = await file.read()
        parsed_data = parse_resume_pdf(content)
        skills = extract_skills(parsed_data["text"])
        
        return ResumeUploadResponse(
            text=parsed_data["text"],
            skills=skills,
            education=parsed_data["education"],
            projects=parsed_data["projects"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze-match", response_model=MatchResponse)
def analyze_match(request: MatchRequest):
    try:
        # Get predictions
        prediction_data = predict_match(request.resume_text, request.job_description)
        
        # Calculate missing skills
        resume_skills = extract_skills(request.resume_text)
        missing_skills = get_missing_skills(resume_skills, request.job_description)
        
        # Generate some mock suggestions based on missing skills
        suggestions = []
        if missing_skills:
            suggestions.append(f"Consider learning or highlighting these skills: {', '.join(missing_skills[:3])}")
        
        if prediction_data["match_score"] < 60:
            suggestions.append("Tailor your resume more closely to the job description terminology.")
            suggestions.append("Add more quantifiable achievements.")
        else:
            suggestions.append("Your resume aligns well with this role!")
            
        return MatchResponse(
            match_score=prediction_data["match_score"],
            prediction=prediction_data["prediction"],
            missing_skills=missing_skills,
            suggestions=suggestions
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat", response_model=ChatResponse)
def chat_with_coach(request: ChatRequest):
    try:
        response = generate_chat_response(request.message)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
