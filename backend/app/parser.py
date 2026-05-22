import fitz  # PyMuPDF
import io
import re

def parse_resume_pdf(file_bytes: bytes) -> dict:
    """
    Parses a PDF resume from bytes and extracts text, pseudo-education, and pseudo-projects.
    """
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text() + "\n"
    
    # Heuristics for education and projects
    education = []
    projects = []
    
    lines = text.split("\n")
    current_section = None
    
    for line in lines:
        clean_line = line.strip()
        if not clean_line:
            continue
            
        lower_line = clean_line.lower()
        if "education" in lower_line and len(clean_line) < 20:
            current_section = "education"
            continue
        elif ("project" in lower_line or "portfolio" in lower_line) and len(clean_line) < 20:
            current_section = "projects"
            continue
        elif len(clean_line) < 20 and current_section and clean_line.isupper():
            # Potentially another section
            current_section = None
            
        if current_section == "education" and len(clean_line) > 10:
            if len(education) < 3: # keep it short
                education.append(clean_line)
        elif current_section == "projects" and len(clean_line) > 10:
            if len(projects) < 3:
                projects.append(clean_line)
                
    # If not found using heuristics, return some generic ones or empty
    if not education:
        # Let's see if we can find university names
        for line in lines:
            if "university" in line.lower() or "college" in line.lower() or "b.s" in line.lower() or "b.tech" in line.lower():
                education.append(line.strip())
                if len(education) >= 2: break
                
    return {
        "text": text,
        "education": education,
        "projects": projects
    }
