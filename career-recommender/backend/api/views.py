from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import os
import json
from datetime import datetime

from parsers.parser import parse_resume, extract_contact_info
from models.ats_scorer import extract_skills
from utils.matcher import match_job


class AnalyzeResumeView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        if 'resume' not in request.FILES:
            return Response(
                {
                    "error": "Please select a resume file (PDF, DOCX, or TXT) to begin your analysis.",
                    "code": "MISSING_FILE"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        resume_file = request.FILES['resume']

        # File size check (e.g. 15MB)
        if resume_file.size > 15 * 1024 * 1024:
            return Response(
                {
                    "error": "The uploaded file is larger than 15MB. Please upload a more compact version of your resume.",
                    "code": "FILE_TOO_LARGE"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Save resume
        os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
        resume_path = os.path.join(settings.MEDIA_ROOT, resume_file.name)

        with open(resume_path, "wb+") as f:
            for chunk in resume_file.chunks():
                f.write(chunk)

        # Parse resume with empathetic error handling
        try:
            resume_text = parse_resume(resume_path)
        except Exception as e:
            return Response(
                {
                    "error": f"We encountered trouble reading this file format. Please try saving your resume as a standard PDF or Word (.docx) file.",
                    "details": str(e)
                },
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        contact_info = extract_contact_info(resume_text)

        SKILL_LIST = [
            "python", "django", "flask", "react", "javascript",
            "html", "css", "sql", "machine learning", "deep learning",
            "nlp", "computer vision", "data science", "pandas",
            "numpy", "tensorflow", "pytorch", "ui", "figma"
        ]

        extracted_skills = extract_skills(resume_text, SKILL_LIST)

        # 🔥 ALL scoring happens here now
        job_matches = match_job(extracted_skills)

        # Save analysis result as JSON file on user's system
        result_data = {
            "extracted_skills": extracted_skills,
            "job_matches": job_matches,
            "resume_file": resume_file.name,
            "resume_text": resume_text,
            "contact_info": contact_info,
            "analyzed_at": datetime.now().isoformat()
        }

        results_dir = os.path.join(settings.MEDIA_ROOT, "results")
        os.makedirs(results_dir, exist_ok=True)
        result_filename = f"resume_result_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        result_path = os.path.join(results_dir, result_filename)
        with open(result_path, "w", encoding="utf-8") as f:
            json.dump(result_data, f, indent=2, ensure_ascii=False)

        return Response({
            "extracted_skills": extracted_skills,
            "job_matches": job_matches,
            "resume_text": resume_text,
            "contact_info": contact_info
        })
