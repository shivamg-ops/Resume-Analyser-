# Resume Analyser 🚀  
**AI-Powered Resume Analysis & Career Matching Platform**

Resume Analyser is a full-stack application that intelligently analyzes resumes to:
- Extract technical and professional skills using NLP
- Calculate ATS (Applicant Tracking System) compatibility
- Identify missing skills for target roles
- Recommend best-fit job roles using semantic embedding similarity (`all-MiniLM-L6-v2`)

Built with a clean separation of **Frontend (React/Vite), Backend (Django REST Framework), and ML logic**.

---

## 🧱 Tech Stack

### Frontend
- **React (Vite)** + **TypeScript**
- **Tailwind CSS** + **Shadcn/UI**
- **Lucide Icons**

### Backend
- **Python 3.11+**
- **Django 5.2** & **Django REST Framework**
- **django-cors-headers**

### Machine Learning / NLP
- **Sentence Transformers** (`all-MiniLM-L6-v2`)
- **PyTorch** & **Transformers**
- **pdfminer.six** & **python-docx** for PDF/Word parsing

---

## ⚡ Quick Start (One Command)

### On macOS / Linux:
```bash
./run_project.sh
```

### On Windows:
```cmd
run_project.bat
```

Frontend will be available at: **http://localhost:8080**  
Backend API will be running at: **http://127.0.0.1:8000/api/analyze/**

---

## 🛠 Manual Setup & Run

### 1. Backend Setup
```bash
cd career-recommender
python3 -m venv venv
source venv/bin/activate       # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run migrations & check
cd backend
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

### 2. Frontend Setup
```bash
cd frontend/career-compass-3d-main
npm install
npm run dev -- --port 8080
```

---

## 🧪 Testing Standalone Scripts

- **Test Ingestion & Analysis**:
  ```bash
  cd career-recommender
  source venv/bin/activate
  python main.py
  ```
- **Test Ingestion with Role Matching**:
  ```bash
  cd career-recommender
  source venv/bin/activate
  python run_resume_ingestion.py
  ```
