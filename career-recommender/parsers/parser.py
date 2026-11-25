from pdfminer.high_level import extract_text
import docx
import os
import re

def parse_pdf(path):
    return extract_text(path)

def parse_docx(path):
    doc = docx.Document(path)
    return "\n".join([p.text for p in doc.paragraphs])

def extract_contact_info(text):
    """Extract email, phone, links/github/linkedin from parsed resume text."""
    # Email regex
    email_match = re.search(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', text)
    email = email_match.group(0) if email_match else None

    # Phone regex (Indian/international/standard formats)
    phone_match = re.search(r'(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,5}\)?[-.\s]?\d{3,5}[-.\s]?\d{4,6}', text)
    phone = phone_match.group(0).strip() if phone_match else None

    # LinkedIn / GitHub regex
    linkedin_match = re.search(r'(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|profile)\/[a-zA-Z0-9_-]+', text, re.IGNORECASE)
    linkedin = linkedin_match.group(0) if linkedin_match else None

    github_match = re.search(r'(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9_-]+', text, re.IGNORECASE)
    github = github_match.group(0) if github_match else None

    # Clean lines to detect probable name from first few non-empty lines
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    candidate_name = None
    if lines:
        for line in lines[:5]:
            # Simple heuristic: first short line that isn't email, phone, or generic heading
            if 2 <= len(line.split()) <= 4 and not re.search(r'[@\/0-9]', line) and "resume" not in line.lower() and "curriculum" not in line.lower():
                candidate_name = line
                break

    return {
        "candidate_name": candidate_name or "Candidate",
        "email": email or "Not detected in text",
        "phone": phone or "Not detected in text",
        "linkedin": linkedin,
        "github": github,
    }

def parse_resume(path):
    ext = os.path.splitext(path)[1].lower()

    if ext == ".pdf":
        return parse_pdf(path)
    elif ext == ".docx":
        return parse_docx(path)
    elif ext == ".txt":
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    else:
        raise Exception("Unsupported file format")
