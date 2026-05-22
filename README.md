# Campus AI Placement Copilot

A modern AI-powered student placement assistant.

## Features
- **Resume Analyzer**: Upload a PDF resume and extract text, skills, and projects.
- **Job Matcher**: Compare your resume against a job description.
- **Interview Coach**: Chat with an AI mock interviewer.
- **Premium UI**: Built with React, Vite, Tailwind CSS, Framer Motion, and shadcn-like UI.

## Project Structure
- `frontend/`: React + Vite frontend
- `backend/`: FastAPI backend
- `backend/models/`: Drop your machine learning `.pkl` models here (`best_model.pkl`, `vectorizer.pkl`)

## How to Run

### Backend
1. Activate your python environment (e.g. `nlp-project` env)
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The backend will be running on `http://localhost:8000`

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be running on `http://localhost:5173`
