🚀 HirePilot – Agentic Resume & Job Application Optimizer

HirePilot is an AI-powered, agentic resume builder that automatically analyzes your resume, tailors it to job descriptions, generates ATS-friendly versions, produces recruiter-friendly creative versions, writes cover letters, and keeps version history — all in one place.

This project includes:

Frontend (React + Vite)

Backend (Node.js + Express)

GCP Deployment (Cloud Run, Firestore, Cloud Storage, Firebase Hosting)

AI Agent Integration (Vertex AI / Gemini Pro)

✨ Features
🔹 Resume Processing

Upload PDF resume

Extract resume text using AI

Edit and refine resume in the UI

🔹 Job Description Input

Paste JD text

Or paste job URL

🔹 AI-Powered Agent Workflow

Skill overlap analysis

Gaps & missing skills

ATS optimization

Creative resume writer

Auto-generated cover letters

🔹 Versioning & Tracking

Saves ATS + creative resume versions

Saves cover letters

Linked to the job you applied to

🧱 Folder Structure
hirepilot/
│
├── hirepilot-frontend/       # React + Vite UI
│   ├── src/
│   ├── public/
│   └── index.html
│
└── hirepilot-backend/        # Node.js + Express API
    ├── index.js
    ├── Dockerfile
    ├── package.json
    └── /agent routes

🖥️ Frontend – React + Vite
Run Development Server
cd hirepilot-frontend
npm install
npm run dev

Build for Production
npm run build


Outputs static files in /dist.

⚙️ Backend – Node.js + Express
Install Dependencies
cd hirepilot-backend
npm install

Run Local Server
npm run dev     # nodemon

Production Mode
npm start

📡 Backend API Endpoints
1. Parse Resume PDF

POST /agent/parse-resume-pdf
form-data: file = resume.pdf

Returns extracted text.

2. Analyze Resume vs Job

POST /agent/analyze-fit

{
  "resumeText": "...",
  "jobDescription": "...",
  "jobUrl": "..."
}

3. Generate ATS + Creative Resume

POST /agent/generate-resumes

{
  "resumeText": "...",
  "jobDescription": "..."
}

4. Generate Cover Letter

POST /agent/generate-cover-letter

{
  "resumeText": "...",
  "jobDescription": "..."
}

🤖 AI Integration (Vertex AI / Gemini)

HirePilot uses Gemini models for:

PDF → text conversion

Job understanding

Resume rewriting

Cover letter writing

Skill extraction

Scoring candidate–job alignment

Agents may use tools like:

fetch_job_description(url)

parse_resume_pdf(file)

generate_ats_resume()

generate_cover_letter()

☁️ Deployment – GCP
🔹 Backend → Cloud Run
gcloud builds submit --tag gcr.io/PROJECT_ID/hirepilot-backend
gcloud run deploy hirepilot-backend \
  --image gcr.io/PROJECT_ID/hirepilot-backend \
  --platform managed \
  --region REGION \
  --allow-unauthenticated

🔹 Frontend → Firebase Hosting
cd hirepilot-frontend
npm run build

firebase init hosting
firebase deploy

🗄 Firestore Collections
users/
resumes/
jobs/
resumeVersions/
applications/


Cloud Storage stores uploaded resume PDFs & exported files.

🧪 Future Enhancements

AI interview question generator

Job application tracker

Dashboard analytics

Chrome extension for auto-apply

Gmail integration for track replies

🤝 Contributing

PRs, suggestions, and improvements are welcome!
To contribute:

git checkout -b feature/my-feature
git commit -m "Add feature"
git push origin feature/my-feature

📜 License

MIT License.
Free for personal & commercial use.

👩‍💻 Author

Built by Jaahnavi Yeturi,Preeti lata sahoo
HirePilot – an agentic solution for effortless job applications 🚀
