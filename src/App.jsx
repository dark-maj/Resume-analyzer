import React, { useState } from "react";
import axios from "axios";

const API_BASE = " https://hirepilot-orchestrator-105590933896.us-central1.run.app "; // TODO: change when backend is ready

const App = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [atsResume, setAtsResume] = useState("");
  const [creativeResume, setCreativeResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis");
  const [versions, setVersions] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeSource, setResumeSource] = useState("text"); // "text" or "pdf"

  // Helper: fake delay for mock responses (while backend isn’t ready)
  const fakeDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const ensureInputs = () => {
    if (!resumeText.trim() || (!jobDescription.trim() && !jobUrl.trim())) {
      alert("Please add both resume text and job description/job link.");
      return false;
    }
    return true;
  };

  // 🔹 Extract text from uploaded PDF (stubbed for now)
  const handleExtractFromPdf = async () => {
    if (!resumeFile) {
      alert("Please select a PDF first.");
      return;
    }

    setLoading(true);
    setResumeSource("pdf");

    try {
      // When backend is ready, uncomment this and remove fakeDelay block

      // const formData = new FormData();
      // formData.append("file", resumeFile);
      // const res = await axios.post(
      //   `${API_BASE}/agent/parse-resume-pdf`,
      //   formData,
      //   { headers: { "Content-Type": "multipart/form-data" } }
      // );
      // setResumeText(res.data.text || "");

      await fakeDelay(800);
      setResumeText(
        (prev) =>
          prev ||
          "// TODO: connect backend: this is where parsed PDF resume text will appear."
      );
    } catch (err) {
      console.error(err);
      alert("Could not extract text from PDF. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeFit = async () => {
    if (!ensureInputs()) return;
    setLoading(true);
    setActiveTab("analysis");

    try {
      // TODO: When backend is ready, call Cloud Run endpoint here:
      // const res = await axios.post(`${API_BASE}/agent/analyze-fit`, {
      //   resumeText,
      //   jobDescription,
      //   jobUrl,
      // });
      // setAnalysis(res.data);

      // Mocked response for now:
      await fakeDelay(1000);
      setAnalysis({
        overlapScore: 78,
        strengths: [
          "Strong alignment with backend / cloud skills",
          "Good experience with React and frontend tooling",
        ],
        gaps: [
          "Explicit mention of Kubernetes / container orchestration",
          "More quantified impact on previous projects",
        ],
        recommendedSkills: [
          "Kubernetes",
          "CI/CD pipelines",
          "System design basics",
        ],
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong during analysis.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateResumes = async () => {
    if (!ensureInputs()) return;
    setLoading(true);
    setActiveTab("ats");

    try {
      // TODO: Replace with backend call later:
      // const res = await axios.post(`${API_BASE}/agent/generate-resumes`, {
      //   resumeText,
      //   jobDescription,
      //   jobUrl,
      // });
      // setAtsResume(res.data.atsResume);
      // setCreativeResume(res.data.creativeResume);

      await fakeDelay(1200);

      const ats = `ATS-Optimized Resume

SUMMARY
Results-driven developer with experience in React, JavaScript, and cloud-based architectures. Skilled in building scalable, responsive user interfaces and integrating with AI-driven backends.

KEY SKILLS
- React, JavaScript, HTML, CSS
- REST APIs, JSON
- Git, GitHub, Agile
- GCP (Cloud Run, Firestore)

EXPERIENCE
- Built a portfolio of real-world projects including dashboards, planners, and agentic UIs.
- Collaborated on AI-backed features for resume and job optimization.`;

      const creative = `Creative Resume

Hey there! I'm a developer obsessed with turning ideas into working products. From AI-powered assistants to productivity dashboards, I ship fast and iterate even faster.

Highlights
• Designed and built multi-section frontends (React) with clean UX.
• Explored agentic systems using cloud + LLMs.
• Led small teams for college fests, handling both tech and coordination.

Tech I Love
React • JavaScript • GCP • APIs • Automation • AI`;

      setAtsResume(ats);
      setCreativeResume(creative);

      const newVersion = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        jobUrl: jobUrl || "Custom JD",
        tags: ["ATS", "Creative"],
      };
      setVersions((prev) => [newVersion, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Error generating resumes.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!ensureInputs()) return;
    setLoading(true);
    setActiveTab("cover");

    try {
      // TODO: Replace with backend call later:
      // const res = await axios.post(`${API_BASE}/agent/generate-cover-letter`, {
      //   resumeText,
      //   jobDescription,
      //   jobUrl,
      // });
      // setCoverLetter(res.data.coverLetter);

      await fakeDelay(1000);

      const cl = `Dear Hiring Manager,

I am excited to apply for this role and believe my experience in React development, cloud platforms, and building AI-enhanced user experiences aligns strongly with your requirements.

In my recent projects, I have:
- Built responsive and intuitive frontends that integrate with AI/LLM-based backends.
- Worked with cloud-native architectures and modern deployment workflows.
- Focused heavily on usability, clarity, and performance.

I would love the opportunity to contribute to your team and grow with this role.

Sincerely,
[Your Name]`;

      setCoverLetter(cl);
    } catch (err) {
      console.error(err);
      alert("Error generating cover letter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>HirePilot</h1>
          <p>Agentic Resume & Job Application Optimizer (Frontend)</p>
        </div>
        <button
          className="primary-btn"
          onClick={() => {
            setResumeText("");
            setJobDescription("");
            setJobUrl("");
            setAnalysis(null);
            setAtsResume("");
            setCreativeResume("");
            setCoverLetter("");
            setVersions([]);
            setResumeFile(null);
            setResumeSource("text");
          }}
        >
          Reset Session
        </button>
      </header>

      <main className="layout">
        {/* Left column – Resume */}
        <section className="card">
          <h2>Your Resume</h2>
          <p className="hint">
            Upload a PDF or paste your resume text. If you upload a PDF, click{" "}
            <b>Extract from PDF</b> to convert it to text.
          </p>

          {/* PDF upload */}
          <div style={{ marginBottom: "8px" }}>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setResumeFile(file || null);
                if (file) setResumeSource("pdf");
              }}
            />
            {resumeFile && (
              <p className="hint">
                Selected: <b>{resumeFile.name}</b>{" "}
                ({(resumeFile.size / 1024).toFixed(1)} KB)
              </p>
            )}
            <button
              className="secondary-btn"
              style={{ marginTop: "4px" }}
              onClick={handleExtractFromPdf}
              disabled={!resumeFile || loading}
            >
              {loading && resumeSource === "pdf"
                ? "Extracting from PDF..."
                : "Extract from PDF"}
            </button>
          </div>

          {/* Resume text area */}
          <textarea
            className="textarea"
            placeholder="Paste your resume here, or extract it from a PDF above..."
            value={resumeText}
            onChange={(e) => {
              setResumeText(e.target.value);
              if (e.target.value) setResumeSource("text");
            }}
          />
        </section>

        {/* Middle column – Job Info */}
        <section className="card">
          <h2>Job Description</h2>
          <input
            className="input"
            type="text"
            placeholder="Job link (optional, e.g., https://careers.spotify.com/...)"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
          />
          <textarea
            className="textarea"
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <div className="btn-row">
            <button
              className="secondary-btn"
              onClick={handleAnalyzeFit}
              disabled={loading}
            >
              {loading && activeTab === "analysis"
                ? "Analyzing..."
                : "Analyze Fit"}
            </button>
            <button
              className="primary-btn"
              onClick={handleGenerateResumes}
              disabled={loading}
            >
              {loading && activeTab === "ats"
                ? "Generating Resumes..."
                : "Generate Resumes"}
            </button>
            <button
              className="secondary-btn"
              onClick={handleGenerateCoverLetter}
              disabled={loading}
            >
              {loading && activeTab === "cover"
                ? "Writing Cover Letter..."
                : "Generate Cover Letter"}
            </button>
          </div>
        </section>

        {/* Right column – Results */}
        <section className="card">
          <div className="tabs">
            <button
              className={`tab-btn ${
                activeTab === "analysis" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("analysis")}
            >
              Analysis
            </button>
            <button
              className={`tab-btn ${
                activeTab === "ats" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("ats")}
            >
              Resumes
            </button>
            <button
              className={`tab-btn ${
                activeTab === "cover" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("cover")}
            >
              Cover Letter
            </button>
            <button
              className={`tab-btn ${
                activeTab === "history" ? "tab-active" : ""
              }`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "analysis" && (
              <div>
                <h3>Job–Resume Match Analysis</h3>
                {!analysis && (
                  <p className="hint">
                    Click <b>Analyze Fit</b> to see overlap, gaps, and suggested
                    skills.
                  </p>
                )}
                {analysis && (
                  <>
                    <p className="score">
                      Match Score: <span>{analysis.overlapScore}%</span>
                    </p>
                    <h4>Strengths</h4>
                    <ul>
                      {analysis.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                    <h4>Gaps / Missing Areas</h4>
                    <ul>
                      {analysis.gaps.map((g, i) => (
                        <li key={i}>{g}</li>
                      ))}
                    </ul>
                    <h4>Recommended Skills to Add</h4>
                    <div className="chips">
                      {analysis.recommendedSkills.map((sk, i) => (
                        <span key={i} className="chip">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "ats" && (
              <div className="split">
                <div className="split-column">
                  <h3>ATS Resume</h3>
                  {!atsResume && (
                    <p className="hint">
                      Click <b>Generate Resumes</b> to create an ATS-optimized
                      version.
                    </p>
                  )}
                  <pre className="code-block">{atsResume}</pre>
                </div>
                <div className="split-column">
                  <h3>Creative / Recruiter Resume</h3>
                  <pre className="code-block">{creativeResume}</pre>
                </div>
              </div>
            )}

            {activeTab === "cover" && (
              <div>
                <h3>Cover Letter</h3>
                {!coverLetter && (
                  <p className="hint">
                    Click <b>Generate Cover Letter</b> after adding resume +
                    job.
                  </p>
                )}
                <pre className="code-block">{coverLetter}</pre>
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <h3>Generated Versions History</h3>
                {versions.length === 0 ? (
                  <p className="hint">
                    Once you generate resumes, they’ll show up here with
                    timestamps.
                  </p>
                ) : (
                  <ul className="history-list">
                    {versions.map((v) => (
                      <li key={v.id} className="history-item">
                        <div>
                          <p className="history-job">{v.jobUrl}</p>
                          <p className="history-time">{v.timestamp}</p>
                        </div>
                        <div className="history-tags">
                          {v.tags.map((t) => (
                            <span key={t} className="chip">
                              {t}
                            </span>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
