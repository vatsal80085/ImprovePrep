import { useEffect, useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {children}
  </svg>
);

const QuestionCard = ({ item, index }) => (
  <details className="question-card">
    <summary>
      <span className="question-card__number">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="question-card__question">{item.question}</span>
      <span className="question-card__chevron" aria-hidden="true">
        ⌄
      </span>
    </summary>
    <div className="question-card__content">
      <div className="question-card__detail">
        <span className="detail-label">What this tests</span>
        <p>{item.intention}</p>
      </div>
      <div className="question-card__detail question-card__detail--answer">
        <span className="detail-label">Suggested answer</span>
        <p>{item.answer}</p>
      </div>
    </div>
  </details>
);

// main component
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  // Rehydrate the current report from the URL ID after navigation or refresh.
  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId, getReportById]);

  if (loading || !report) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  const scoreColor =
    report.matchScore >= 80
      ? "score--high"
      : report.matchScore >= 60
        ? "score--mid"
        : "score--low";

  return (
    <main className="interview-page">
      <div className="interview-shell">
        <aside className="interview-nav">
          <div className="interview-brand">
            <span>IP</span>
            <strong>ImprovePrep</strong>
          </div>
          <div className="interview-nav__role">
            <span className="eyebrow">Interview plan</span>
            <h1>{report.title || "Your interview plan"}</h1>
          </div>
          <nav aria-label="Interview sections">
            <button
              className={`nav-item ${activeNav === "technical" ? "nav-item--active" : ""}`}
              onClick={() => setActiveNav("technical")}
              type="button"
            >
              Technical Questions
            </button>
            <button
              className={`nav-item ${activeNav === "behavioral" ? "nav-item--active" : ""}`}
              onClick={() => setActiveNav("behavioral")}
              type="button"
            >
              Behavioral Questions
            </button>
            <button
              className={`nav-item ${activeNav === "roadmap" ? "nav-item--active" : ""}`}
              onClick={() => setActiveNav("roadmap")}
              type="button"
            >
              Roadmap
            </button>
            <button onClick={()=>{
              getResumePdf({ interviewId });
            }} className="button primary-button">
              <svg height={"0.77rem"} style={{marginRight:"0.5rem"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4356 3.21188C16.8261 2.82185 17.4592 2.82157 17.8496 3.21188L20.6777 6.04099C21.0681 6.43152 21.0682 7.06457 20.6777 7.45505L7.2422 20.8896H3.00001V16.6475L16.4356 3.21188ZM5.00001 17.4756V18.8896H6.41407L15.7276 9.57615L14.3135 8.16208L5.00001 17.4756ZM4.5293 1.3193C4.70583 0.893505 5.29418 0.893508 5.47071 1.3193L5.72364 1.93063C6.15555 2.97342 6.96155 3.80613 7.97462 4.2568L8.69239 4.57614C9.10267 4.75896 9.10262 5.35616 8.69239 5.53903L7.93263 5.87692C6.94497 6.3162 6.15339 7.11943 5.71387 8.1279L5.4668 8.69334C5.28636 9.10747 4.71366 9.10747 4.53321 8.69334L4.28614 8.1279C3.84661 7.11943 3.05506 6.3162 2.06739 5.87692L1.30762 5.53903C0.897483 5.35617 0.897435 4.75896 1.30762 4.57614L2.0254 4.2568C3.03845 3.80614 3.84446 2.97344 4.27637 1.93063L4.5293 1.3193ZM15.7276 6.74802L17.1426 8.16208L18.5567 6.74802L17.1426 5.33395L15.7276 6.74802Z"></path></svg>
              Download Optimized Resume
            </button>
          </nav>
        </aside>

        <section className="interview-main">
          <header className="interview-hero">
            <div>
              <span className="eyebrow">Your personalized interview plan</span>
              <h1>{report.title || "Interview preparation"}</h1>
              <p>Focused preparation based on your profile and target role.</p>
            </div>
            <div className="match-score" aria-label={`${report.matchScore}% job match`}>
              <span className="match-score__value">{report.matchScore}%</span>
              <span className="match-score__label">Job match</span>
            </div>
          </header>

          {activeNav === "technical" && (
            <section className="interview-section" id="technical-questions">
              <div className="section-heading">
                <div className="section-heading__icon section-heading__icon--pink">
                  <Icon>
                    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4.18A2.5 2.5 0 0 1 4 14.5v-9Z" />
                  </Icon>
                </div>
                <div>
                  <h2>Technical questions</h2>
                  <p>Demonstrate your technical depth and problem-solving approach.</p>
                </div>
                <span className="count-badge">
                  {report.technicalQuestions.length} questions
                </span>
              </div>
              <div className="question-grid">
                {report.technicalQuestions.map((item, index) => (
                  <QuestionCard key={item.question} item={item} index={index} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section className="interview-section" id="behavioral-questions">
              <div className="section-heading">
                <div className="section-heading__icon section-heading__icon--purple">
                  <Icon>
                    <path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 11a3 3 0 1 0 0-6M17 14.5a4 4 0 0 1 4 4V20" />
                  </Icon>
                </div>
                <div>
                  <h2>Behavioral questions</h2>
                  <p>Prepare clear stories that show how you work with others.</p>
                </div>
                <span className="count-badge count-badge--purple">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>
              <div className="question-grid question-grid--behavioral">
                {report.behavioralQuestions.map((item, index) => (
                  <QuestionCard key={item.question} item={item} index={index} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <div className="interview-columns">
              <section className="interview-section interview-section--compact" id="skill-gaps">
                <div className="section-heading">
                  <div className="section-heading__icon section-heading__icon--orange">
                    <Icon>
                      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
                    </Icon>
                  </div>
                  <div>
                    <h2>Skill gaps</h2>
                    <p>Topics worth prioritizing before your interview.</p>
                  </div>
                </div>
                <div className="skill-list">
                  {report.skillGaps.map((gap) => (
                    <div className="skill-item" key={gap.skill}>
                      <span>{gap.skill}</span>
                      <span className={`severity severity--${gap.severity}`}>
                        {gap.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="interview-section interview-section--compact" id="roadmap">
                <div className="section-heading">
                  <div className="section-heading__icon section-heading__icon--green">
                    <Icon>
                      <path d="M6 3h12a2 2 0 0 1 2 2v16l-8-3-8 3V5a2 2 0 0 1 2-2Z" />
                      <path d="m9 10 2 2 4-4" />
                    </Icon>
                  </div>
                  <div>
                    <h2>Preparation plan</h2>
                    <p>A practical path to interview readiness.</p>
                  </div>
                </div>
                <div className="plan-list">
                  {report.preparationPlan.map((day) => (
                    <div className="plan-item" key={day.day}>
                      <span className="plan-item__day">Day {day.day}</span>
                      <div>
                        <h3>{day.focus}</h3>
                        <ul>
                          {day.tasks.map((task) => (
                            <li key={task}>{task}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </section>

        <aside className="interview-insights">
          <section className="insight-block insight-block--score">
            <span className="insight-label">Match score</span>
            <strong>{report.matchScore}%</strong>
            <div className={`score-track ${scoreColor}`}>
              <span style={{ width: `${report.matchScore}%` }} />
            </div>
            <small>Strong alignment with this role</small>
          </section>
          <section className="insight-block">
            <span className="insight-label">Skill gaps</span>
            <div className="skill-list">
              {report.skillGaps.map((gap) => (
                <div className="skill-item" key={gap.skill}>
                  <span>{gap.skill}</span>
                  <span className={`severity severity--${gap.severity}`}>
                    {gap.severity}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
};

export default Interview;
