import "../style/home.scss";

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {children}
  </svg>
);

const Home = () => (
  <main className="home-page">
    <header className="page-header">
      <h1>
        Create Your Custom <span>Interview Plan</span>
      </h1>
      <p>
        Analyze the job requirements and your unique profile to build
        a<br className="desktop-break" /> winning strategy.
      </p>
    </header>

    <form className="interview-card">
      <div className="interview-card__body">
        <section className="panel panel--left">
          <div className="panel__header">
            <span className="panel__icon">
              <Icon>
                <path d="M9 7V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8V7M4 9.2A2.2 2.2 0 0 1 6.2 7h11.6A2.2 2.2 0 0 1 20 9.2v8.6a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 17.8V9.2Z" />
                <path d="M4 12.5c4.56 2.18 11.44 2.18 16 0" />
              </Icon>
            </span>
            <h2>Target Job Description</h2>
            <span className="badge">Required</span>
          </div>
          <textarea
            className="panel__textarea"
            name="jobDescription"
            maxLength="5000"
            placeholder={
              "Paste the full job description here...\ne.g. “Senior Frontend Engineer at Google requires\nproficiency in React, TypeScript, and large-scale system\ndesign...”"
            }
          />
          <span className="char-counter">0 / 5000 chars</span>
        </section>

        <div className="panel-divider" />

        <section className="panel panel--right">
          <div className="panel__header">
            <span className="panel__icon">
              <Icon>
                <circle cx="12" cy="8" r="3" />
                <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
              </Icon>
            </span>
            <h2>Your Profile</h2>
          </div>
          <div className="upload-section">
            <label className="section-label" htmlFor="resume">
              Upload Resume <span className="badge">Best Results</span>
            </label>
            <label className="dropzone" htmlFor="resume">
              <span className="dropzone__icon">
                <Icon>
                  <path d="M12 16V5m0 0L8 9m4-4 4 4M5 15v2.5A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5V15" />
                </Icon>
              </span>
              <strong>Click to upload (or drag &amp; drop)</strong>
              <small>PDF (Max 5MB)</small>
            </label>
            <input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
            />
          </div>
          <div className="or-divider">
            <span>OR</span>
          </div>
          <div className="self-description">
            <label className="section-label" htmlFor="selfDescription">
              Quick Self-Description
            </label>
            <textarea
              className="panel__textarea panel__textarea--short"
              id="selfDescription"
              name="selfDescription"
              placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
            />
          </div>
          <div className="info-box">
            <span>i</span>
            <p>
              Either a <strong>Resume</strong> or a{" "}
              <strong>Self-Description</strong> is required to generate a
              personalized plan.
            </p>
          </div>
        </section>
      </div>
      <footer className="interview-card__footer">
        <span className="footer-info">
          AI-Powered Strategy Generation ~ Approx 30s
        </span>
        <button className="generate-btn" type="submit">
          <Icon>
            <path d="m12 3 1.35 5.65L19 10l-5.65 1.35L12 17l-1.35-5.65L5 10l5.65-1.35L12 3Z" />
          </Icon>
          Generate My Interview Strategy
        </button>
      </footer>
    </form>
    <nav className="page-footer">
      <a href="#privacy">Privacy Policy</a>
      <a href="#terms">Terms of Service</a>
      <a href="#help">Help Center</a>
    </nav>
  </main>
);

export default Home;
