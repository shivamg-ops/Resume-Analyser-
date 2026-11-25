# AI Resume Analyser — Team Logic & Model Explanation Script

**Team:** Utsav, Sapna, Shivam, Ankush, Kalpana, Aditya  
**Purpose:** Understand the logic behind every file, what models are used, why they were chosen, and how data flows end-to-end.  
**Format:** 6-person presentation / onboarding script (~25–30 minutes total)

---

## PRESENTER ASSIGNMENTS

| # | Name | Section | Topic |
|---|------|---------|-------|
| 1 | **Utsav** | Project Overview & Architecture | What the app is, high-level flow, tech stack |
| 2 | **Sapna** | Backend — Core Logic | `views.py`, `settings.py`, `models.py`, `urls.py` |
| 3 | **Shivam** | Backend — Parsing, Scoring & Matching | `parser.py`, `ats_scorer.py`, `matcher.py`, data files |
| 4 | **Ankush** | Frontend — Types, State & Main Page | `result.ts`, `AnalysisContext.tsx`, `Index.tsx` |
| 5 | **Kalpana** | Frontend — UI Components & Advisor | `UploadZone`, `ResultsDashboard`, UI primitives, `resumeAdvisor.ts` |
| 6 | **Aditya** | Data Flow, Models Table & How to Run | End-to-end flow, what/why models table, run instructions, git safety |

---

## 1. PROJECT OVERVIEW — PRESENTER: UTSAV (3 min)

### What it is
A full-stack AI-powered Resume Analyser. Users upload a resume (PDF/DOCX), the system parses it, extracts skills, matches against job roles, and shows an ATS score with improvement suggestions.

### What it does — step by step
1. User uploads a resume file.
2. Backend parses the file, extracts text, identifies skills, and matches against job roles.
3. Frontend displays ATS score, extracted skills, missing skills, and job matches.
4. User can edit their profile (name, email, phone, location, experience, target role).
5. Results and profile persist across page refresh via browser `localStorage` — **no login, no accounts, everything stays on the user's device**.

### Tech stack
| Layer | Technology |
|-------|------------|
| Backend | Django + Django REST Framework (Python) |
| Frontend | React + Vite + TypeScript |
| Storage | SQLite (Django default), `localStorage` (browser), local JSON files |

---

## 2. BACKEND — CORE LOGIC — PRESENTER: SAPNA (5 min)

### `career-recommender/backend/backend/settings.py`
Django project configuration.

Key settings and why:
- **`DATABASES` → SQLite3 (`db.sqlite3`)**: Zero-config, file-based, perfect for open-source local use. No database server to install.
- **`MEDIA_ROOT` → `BASE_DIR / "data"`**: Where uploaded resumes and generated JSON results are stored on disk.
- **`CORS_ALLOW_ALL_ORIGINS → True`**: Frontend runs on Vite (port 5173), backend on Django (port 8000). Allows cross-origin requests during development.
- **`INSTALLED_APPS` → `corsheaders`, `rest_framework`, `api`**: Enables CORS, REST API building, and our custom `api` app.
- **`SECRET_KEY`**: Hardcoded dev key. In production this must come from an environment variable (never commit real secrets).

### `career-recommender/backend/api/models.py`
**Current state:** Empty placeholder (`# Create your models here.`).

**Why:** No user authentication exists (per requirement — open source, no accounts). There is no `User` or `Profile` Django model because data is stored in browser `localStorage`, not the database. If accounts are added later, this is where `Profile` and `AnalysisRecord` models would go.

### `career-recommender/backend/api/views.py` — THE CORE LOGIC
**Class:** `AnalyzeResumeView(APIView)`  
**Endpoint:** `POST /api/analyze/`

Step-by-step logic:
1. **File presence check** — If no `resume` in `request.FILES`, return `400` with a friendly error. Prevents crashes on empty requests.
2. **File size validation** — Rejects files larger than 15 MB. Prevents memory exhaustion from oversized uploads.
3. **Save uploaded file to disk** — Writes to `settings.MEDIA_ROOT` (`career-recommender/data/`). The parser needs a real file path.
4. **Parse the resume** — Calls `parse_resume(resume_path)` from `parsers/parser.py`. Wrapped in `try/except` — if parsing fails, returns `422` with an empathetic message asking the user to save as standard PDF/DOCX.
5. **Extract contact info** — Calls `extract_contact_info(resume_text)` to get name, email, phone, LinkedIn, GitHub.
6. **Skill extraction** — Defines `SKILL_LIST` (Python, Django, React, SQL, etc.). Calls `extract_skills(resume_text, SKILL_LIST)` from `models/ats_scorer.py`. Turns unstructured text into structured skills.
7. **Job matching** — Calls `match_job(extracted_skills)` from `utils/matcher.py`. Maps skills to job roles and computes ATS scores.
8. **Save result as JSON file (newly added)** — Writes `result_data` to `career-recommender/data/results/resume_result_<YYYYMMDD_HHMMSS>.json`. Even without a database, the user's analysis history is persisted as files on their machine.
9. **Return JSON response** — Sends `extracted_skills`, `job_matches`, `resume_text`, `contact_info` back to the frontend.

### `career-recommender/backend/api/urls.py`
Routes `analyze/` → `AnalyzeResumeView`. Keeps API endpoints organized under `/api/`.

### Other backend files
- `admin.py`, `apps.py`, `tests.py`, `migrations/`: Standard Django boilerplate. No custom admin models yet (no DB models).
- `backend/urls.py`, `wsgi.py`, `asgi.py`: Standard Django entry points for production servers.

---

## 3. BACKEND — PARSING, SCORING & MATCHING — PRESENTER: SHIVAM (5 min)

### `career-recommender/backend/parsers/parser.py`
**Purpose:** Extract raw text from PDF/DOCX/TXT resume files.  
**Logic:** Detects file extension, uses the appropriate library to convert the file into a plain string.  
**Why:** The rest of the pipeline works on text, not binary files.

### `career-recommender/models/ats_scorer.py`
**Purpose:** Skill extraction and ATS scoring logic.  
**Key function:** `extract_skills(text, skill_list)`  
**Logic:** Scans resume text for keywords from `SKILL_LIST`, returns matches.  
**Why:** This is the "AI" layer — rule-based keyword matching that turns unstructured resume text into structured skills. Fully explainable, no training data needed.

### `career-recommender/utils/matcher.py`
**Purpose:** Match skills to job roles.  
**Key function:** `match_job(extracted_skills)`  
**Logic:** Compares user skills against a job database and returns ranked job matches with `semantic_score`, `ats_score`, and `missing_skills`.  
**Why:** Tells the user which jobs they fit and exactly what skills they are missing.

### `career-recommender/data/`
- `custom_jobs.json`, `onet_skills.json`, `sample_resume.txt`: Reference data for job matching and testing.
- `data_pipeline/sample_linkedin_jobs.py`: Example script to ingest job postings.
- `run_resume_ingestion.py`: Batch processing helper.

---

## 4. FRONTEND — TYPES, STATE & MAIN PAGE — PRESENTER: ANKUSH (5 min)

### `frontend/career-compass-3d-main/src/types/result.ts`
**Purpose:** TypeScript type definitions — the "contract" between backend and frontend.

Types and why:
- **`JobMatch`**: `job`, `semantic_score`, `ats_score`, `missing_skills` — structure of one job recommendation from the backend.
- **`ResultData`**: `extracted_skills`, `job_matches`, optional `resume_text`, optional `contact_info` — full API response shape.
- **`UserProfile`** (newly added): `name`, `email`, `phone`, `location`, `experience`, `targetRole` — the user's editable profile.
- **`DEFAULT_PROFILE`**: Empty starter profile.
- **`PROFILE_STORAGE_KEY` / `RESULTS_STORAGE_KEY`**: `localStorage` keys so data survives refresh.
- **`loadProfile()` / `saveProfile()` / `loadSavedResults()` / `saveResults()`**: Wrapper functions that read/write `localStorage` safely with `try/catch`.

**Why TypeScript:** Catches bugs at compile time, gives IDE autocomplete, and documents the data shape for the team.

### `frontend/career-compass-3d-main/src/context/AnalysisContext.tsx`
**Purpose:** Global React context for analysis state and history.

Key pieces:
- **`AnalysisRecord`**: One past analysis (file name, size, target role, ATS score, skills, job matches, timestamp).
- **`useAnalysis()` hook**: Gives any component access to `currentAnalysis`, `analysisHistory`, `analyzeResume()`, etc.
- **`localStorage` persistence**: `useEffect` saves `analysisHistory` whenever it changes. On load, it hydrates from `localStorage`.
- **Default mock history**: Two sample records so the dashboard isn't empty on first visit.

**Why Context:** Avoids prop-drilling through many component layers. Any page can read analysis history without passing props manually.

### `frontend/career-compass-3d-main/src/pages/Index.tsx` — MAIN PAGE (modified by team)
**Purpose:** Landing → Loading → Results flow.

Logic:
1. **State:** `currentScreen` ("landing" \| "loading" \| "results"), `results`, `profile`, `showProfileEdit`.
2. **`useEffect` on mount:** Loads `profile` and any saved results from `localStorage`. If a saved result exists, jumps straight to results screen (refresh-safe).
3. **`useEffect` on profile change:** Auto-saves `profile` to `localStorage` whenever the user edits a field.
4. **`simulateProcessing(file)`:** Shows 4 loading steps (parsing, analyzing, calculating, matching) with 500 ms delays each. POSTs the file as `FormData` to `http://127.0.0.1:8000/api/analyze/`. On success, saves results to React state **and** `localStorage`, then shows results. On failure, shows a friendly alert and returns to landing.
5. **Profile Editor UI:** Form (name, email, phone, location, experience, target role) with a Save button. Changes auto-save via `localStorage` — no backend account needed.

**Why this design:** No login, no server-side user table. Everything is client-side, works offline after the first analysis, and respects the open-source no-auth requirement.

---

## 5. FRONTEND — UI COMPONENTS & ADVISOR — PRESENTER: KALPANA (5 min)

### `frontend/career-compass-3d-main/src/components/UploadZone.tsx`
**Purpose:** Drag-and-drop + click file upload.  
**Logic:** Listens to `dragOver`, `dragLeave`, `drop`, and input `onChange`. Calls `onFileSelect(file)` from parent. Accepts `.pdf` and `.docx`.  
**Why:** Modern upload experience instead of a bare `<input type="file">`.

### `frontend/career-compass-3d-main/src/components/ResultsDashboard.tsx`
**Purpose:** Display analysis results.  
**Logic:** Receives `data: ResultData`. Pulls `bestJob = data.job_matches[0]`. Renders:
- **`HeroCard`**: ATS score and top role.
- **`SkillsCard` (extracted)**: Skills found in the resume.
- **`SkillsCard` (missing)**: Skills the top job wants but the resume lacks.
- **`JobMatchesCard`**: Full list of job recommendations.

**Why:** One clear dashboard so the user immediately sees score, strengths, and gaps.

### `frontend/career-compass-3d-main/src/utils/resumeAdvisor.ts`
**Purpose:** Generate actionable resume improvement suggestions.  
**Logic:** `generateResumeSuggestions()` takes extracted skills, missing skills, target role, and ATS score, then returns suggestions in categories:
- **`critical`**: Missing keywords.
- **`power-words`**: Replace weak verbs with high-impact action verbs.
- **`warning`**: Inject quantified metrics (X-Y-Z formula).
- **`formatting`**: ATS parser layout guidelines.
- **`summary`**: Tailor profile summary to target role.

**Why:** Moves beyond "here's your score" to "here's exactly how to improve your resume."

### Remaining UI files
- `src/components/ui/*`, `src/components/layout/*`, `src/components/ui-custom/*`: Presentational UI primitives (buttons, cards, dialogs, sidebars, navbars). No business logic — only layout and styling.
- `src/pages/*.tsx` (other pages): `DashboardPage`, `HistoryPage`, `ATSAnalysisPage`, `ResumeUploadPage`, `SkillGapPage`, `JobRecommendationsPage`, `SettingsPage`, `LandingPage`, `NotFound`. Multi-page views within the single-page app.

---

## 6. DATA FLOW, MODELS TABLE & HOW TO RUN — PRESENTER: ADITYA (4 min)

### End-to-end data flow

```
1. USER ACTION
   - User edits profile fields → auto-saved to localStorage (Profile key)
   - User uploads resume → file sent as FormData to Django

2. BACKEND RECEIVES
   - views.py validates file (exists, <15MB)
   - Saves file to disk (MEDIA_ROOT/data/)
   - parser.py extracts text from PDF/DOCX
   - extract_contact_info() gets name/email/phone/LinkedIn/GitHub
   - ats_scorer.py extracts skills from SKILL_LIST
   - matcher.py matches skills → job roles + ATS scores

3. BACKEND PERSISTS
   - Writes result JSON to MEDIA_ROOT/data/results/resume_result_<ts>.json
   - Returns JSON to frontend

4. FRONTEND RECEIVES
   - Index.tsx saves result to React state AND localStorage (Results key)
   - Renders ResultsDashboard with HeroCard, SkillsCard, JobMatchesCard

5. REFRESH PROTECTION
   - On page reload, Index.tsx reads localStorage
   - If saved results exist → shows results screen immediately
   - Profile always loads from localStorage
```

### Models & libraries — what and why

| Layer | Model / Library | What it does | Why chosen |
|-------|----------------|--------------|------------|
| Backend framework | Django | Web framework, request/response, settings | Batteries-included, easy to deploy, ORM ready if accounts added later |
| API layer | Django REST Framework | Builds `/api/analyze/` endpoint, parses FormData | Industry standard for Django APIs, handles file uploads cleanly |
| CORS | `django-cors-headers` | Allows React (port 5173) to call Django (port 8000) | Required because frontend and backend run on different ports |
| Database | SQLite3 | Local file-based database | Zero setup, works out of the box for open-source users |
| File parsing | `parser.py` (PDF/DOCX/TXT) | Converts resume binaries to text | Fast, dependency-light, no ML model needed yet |
| Skill extraction | `ats_scorer.py` (`extract_skills`) | Keyword matching against SKILL_LIST | Deterministic, explainable, no training data required |
| Job matching | `utils/matcher.py` (`match_job`) | Scores skills against job database | Simple scoring logic, easy to tune and extend |
| Frontend framework | React + Vite | UI rendering, dev server, build | Fast, component-based, huge ecosystem |
| Type safety | TypeScript | Compile-time type checking | Prevents data-shape bugs between backend JSON and frontend UI |
| State management | React Context + `useState`/`useEffect` | Global analysis history + local profile | Lightweight, no Redux needed for this scale |
| Client persistence | Browser `localStorage` | Profile + results survive refresh | No backend user table, no auth, zero server cost |
| Styling | Tailwind CSS | Utility-first CSS | Rapid UI development, consistent design |
| UI components | shadcn/ui-style primitives | Buttons, cards, dialogs | Accessible, no heavy component library lock-in |

**What is NOT used (and why):**
- No machine learning model (no scikit-learn, no transformers, no spaCy NLP). Keyword matching is sufficient for an MVP, runs offline, needs no GPU, and is fully explainable.
- No Django User model. No authentication requested — open source, runs on the user's machine.
- No backend database for analysis history. History lives in local JSON files and browser `localStorage`.

### How to run it

**Backend:**
```bash
cd career-recommender/backend
python manage.py runserver 8000
```

**Frontend:**
```bash
cd frontend/career-compass-3d-main
npm install
npm run dev   # usually http://localhost:5173
```

**Test the flow:**
1. Open frontend in browser.
2. Click "Edit Profile" and fill in details — saved locally.
3. Upload a PDF/DOCX resume.
4. Watch loading steps, then see ATS score, skills, and job matches.
5. Refresh the page — your profile and last result are still there.

### Git safety (unwanted files not committed)
All generated artifacts are in `.gitignore` and will **not** be committed:
- `venv/`, `myenv/`, `__pycache__/`, `*.pyc` — Python cache & env
- `node_modules/`, `dist/` — Frontend deps & build
- `.env` — Environment secrets
- `db.sqlite3`, `*.sqlite3` — Database
- `career-recommender/backend/data/` — Uploaded resumes + JSON results
- `*.pdf`, `*.docx` — Resume files (except `sample_resume.txt`)
- `*.pkl`, `*.joblib` — ML models
- `.DS_Store` — OS junk

---

## TEAM TAKEAWAYS (30 sec — all together)

- **Backend (`views.py`)** parses, scores, and saves resume results as JSON.
- **Frontend (`Index.tsx` + `result.ts`)** handles UI and persists everything in `localStorage` — no login required.
- **No models were trained.** The "AI" is rule-based keyword matching + scoring, transparent and easy for new contributors to modify.
- **All generated artifacts** are gitignored and safe to exclude from commits.

---

**End of script.** Each presenter should open their assigned files while speaking so the team can follow along live in the codebase.