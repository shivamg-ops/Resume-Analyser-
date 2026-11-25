import json
import os
from pathlib import Path
from datetime import datetime

from parsers.parser import parse_resume
from models.ats_scorer import extract_skills
from utils.matcher import match_job

BASE_DIR = Path(__file__).resolve().parent

# Default test resume if available, fallback to sample
resume_path = os.environ.get("RESUME_PATH", str(BASE_DIR / "data" / "sample_resume.txt"))

if not os.path.exists(resume_path):
    print(f"Resume not found at {resume_path}. Please set RESUME_PATH environment variable.")
    exit(1)

# 1. Parse resume text
print("🔍 Parsing resume...")
text = parse_resume(resume_path)

# Default skill list
SKILL_LIST = [
    "python", "django", "flask", "react", "javascript",
    "html", "css", "sql", "machine learning", "deep learning",
    "nlp", "computer vision", "data science", "pandas",
    "numpy", "tensorflow", "pytorch", "ui", "figma"
]

# 2. Extract skills
print("🧠 Extracting skills...")
skills = extract_skills(text, SKILL_LIST)

# 3. Match jobs
print("📌 Matching suitable jobs...")
matches = match_job(skills)

# 4. Save JSON output
resume_json = {
    "id": "resume_001",
    "user_id": None,
    "original_filename": os.path.basename(resume_path),
    "text": text,
    "sections": {
        "education": "",
        "experience": "",
        "skills": ""
    },
    "extracted_skills": skills,
    "job_matches": matches,
    "parsed_date": datetime.now().strftime("%Y-%m-%d")
}

output_dir = BASE_DIR / "data" / "resumes"
os.makedirs(output_dir, exist_ok=True)

json_path = output_dir / "resume_001.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(resume_json, f, indent=4)

print("\n✅ Saved structured resume data to:", json_path)

# 5. Print output
print("\n🧠 Extracted Skills:", skills)
print("\n🏆 Top Job Recommendations:")
for item in matches[:5]:
    print(f"- {item['job']}: Semantic Score = {item['semantic_score']}%, ATS Score = {item['ats_score']}%")
