import { useState } from "react";
import "../style/interview.scss";

const interviewData = {
  title: "Full Stack Developer",
  matchScore: 88,
  technicalQuestions: [
    {
      question:
        "How do you handle authentication and token expiration securely using JWT in a Node.js and Express application?",
      intention:
        "To evaluate the candidate's understanding of secure authentication practices, which is explicitly mentioned in the job description.",
      answer:
        "Explain the use of access tokens and refresh tokens. Access tokens should have a short lifespan and be stored securely (e.g., HTTP-only cookies to prevent XSS), while refresh tokens can be used to issue new access tokens. Mention hashing passwords with bcrypt before storing them in MongoDB.",
    },
    {
      question:
        "Can you explain how you design efficient database schemas in MongoDB, especially when dealing with relationships between collections?",
      intention:
        "To test database design skills, specifically regarding MongoDB document modeling, normalization vs. denormalization, and querying efficiency.",
      answer:
        "Discuss embedding vs. referencing documents based on access patterns and document size limits (16MB). Mention indexing frequently queried fields to ensure optimal performance for REST APIs.",
    },
    {
      question:
        "How do you manage state and handle asynchronous data fetching in a large-scale React application?",
      intention:
        "To assess frontend proficiency with React, asynchronous operations, and state management strategies.",
      answer:
        "Talk about using React's built-in hooks (useState, useEffect, useContext) or modern data-fetching libraries like React Query/Redux Toolkit. Explain how to handle loading states, error boundaries, and race conditions.",
    },
  ],
  behavioralQuestions: [
    {
      question:
        "Tell me about a time when you had to lead a team or take charge during a tight deadline, such as in your hackathon experience.",
      intention:
        "To gauge leadership, teamwork, delegation, and performance under pressure.",
      answer:
        "Use the STAR method. Describe the context of the Smart India Hackathon, the specific challenge faced by your team of 6, how you delegated tasks and managed backend development, and the successful outcome of reaching the top 15 teams.",
    },
    {
      question:
        "How do you handle disagreements with a team member regarding architectural choices or technical implementation?",
      intention:
        "To evaluate communication skills, collaboration, and openness to feedback.",
      answer:
        "Emphasize listening to the other person's perspective, relying on data or industry standards to make objective decisions, and focusing on what is best for the project rather than personal ego.",
    },
  ],
  skillGaps: [
    { skill: "Advanced System Design for Large-Scale Applications", severity: "medium" },
    { skill: "Deep Production-Level MongoDB Optimization and Indexing", severity: "low" },
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "MERN Stack Deep Dive & Architecture",
      tasks: [
        "Review advanced Express.js middleware patterns and error handling.",
        "Practice designing clean RESTful API directory structures.",
        "Refresh concepts on React component lifecycle, hooks, and performance optimization.",
      ],
    },
    {
      day: 2,
      focus: "Database Design & Security",
      tasks: [
        "Study MongoDB indexing strategies, aggregation pipelines, and schema design best practices.",
        "Revise JWT authentication flows, including secure cookie storage and token revocation strategies.",
        "Review common web vulnerabilities like OWASP Top 10 and how to prevent them in Node.js.",
      ],
    },
    {
      day: 3,
      focus: "System Design & Mock Interviews",
      tasks: [
        "Study fundamental system design concepts such as load balancing, caching (Redis), and database scaling.",
        "Conduct a mock technical interview focusing on building a full-stack application from scratch.",
        "Review past projects (ImprovePrep and Beacon) to articulate architectural decisions clearly.",
      ],
    },
  ],
};

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {children}
  </svg>
);

const QuestionCard = ({ item, index }) => (
  <details className="question-card">
    <summary>
      <span className="question-card__number">{String(index + 1).padStart(2, "0")}</span>
      <span className="question-card__question">{item.question}</span>
      <span className="question-card__chevron" aria-hidden="true">⌄</span>
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

const RoadMapDay = ({ day }) => (
  <article className="roadmap-day">
    <div className="roadmap-day__header">
      <span className="roadmap-day__badge">Day {day.day}</span>
      <h3>{day.focus}</h3>
    </div>
    <ul className="roadmap-day__tasks">
      {day.tasks.map((task) => <li key={task}>{task}</li>)}
    </ul>
  </article>
);

const Interview = () => {
  const data = interviewData;
  const [activeNav, setActiveNav] = useState("technical");

  return (
    <main className="interview-page">
      <div className="interview-shell">
      <aside className="interview-nav">
        <div className="interview-brand"><span>IP</span><strong>ImprovePrep</strong></div>
        <div className="interview-nav__role">
          <span className="eyebrow">Interview plan</span>
          <h1>{data.title}</h1>
        </div>
        <nav aria-label="Interview sections">
          <button className={`nav-item ${activeNav === "technical" ? "nav-item--active" : ""}`} onClick={() => setActiveNav("technical")} type="button">Technical Questions</button>
          <button className={`nav-item ${activeNav === "behavioral" ? "nav-item--active" : ""}`} onClick={() => setActiveNav("behavioral")} type="button">Behavioural Questions</button>
          <button className={`nav-item ${activeNav === "roadmap" ? "nav-item--active" : ""}`} onClick={() => setActiveNav("roadmap")} type="button">Roadmap</button>
        </nav>
      </aside>
      <section className="interview-main">
      <header className="interview-hero">
        <div>
          <span className="eyebrow">Your personalized interview plan</span>
          <h1>{data.title}</h1>
          <p>Focused preparation based on your profile and target role.</p>
        </div>
        <div className="match-score" aria-label={`${data.matchScore}% job match`}>
          <span className="match-score__value">{data.matchScore}%</span>
          <span className="match-score__label">Job match</span>
        </div>
      </header>

      {activeNav === "technical" && <section className="interview-section" id="technical-questions">
        <div className="section-heading">
          <div className="section-heading__icon section-heading__icon--pink">
            <Icon><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4.18A2.5 2.5 0 0 1 4 14.5v-9Z" /></Icon>
          </div>
          <div><h2>Technical questions</h2><p>Demonstrate your technical depth and problem-solving approach.</p></div>
          <span className="count-badge">{data.technicalQuestions.length} questions</span>
        </div>
        <div className="question-grid">
          {data.technicalQuestions.map((item, index) => <QuestionCard key={item.question} item={item} index={index} />)}
        </div>
      </section>}

      {activeNav === "behavioral" && <section className="interview-section" id="behavioral-questions">
        <div className="section-heading">
          <div className="section-heading__icon section-heading__icon--purple">
            <Icon><path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM17 11a3 3 0 1 0 0-6M17 14.5a4 4 0 0 1 4 4V20" /></Icon>
          </div>
          <div><h2>Behavioral questions</h2><p>Prepare clear stories that show how you work with others.</p></div>
          <span className="count-badge count-badge--purple">{data.behavioralQuestions.length} questions</span>
        </div>
        <div className="question-grid question-grid--behavioral">
          {data.behavioralQuestions.map((item, index) => <QuestionCard key={item.question} item={item} index={index} />)}
        </div>
      </section>}

      {activeNav === "roadmap" && <div className="interview-columns">
        <section className="interview-section interview-section--compact" id="skill-gaps">
          <div className="section-heading">
            <div className="section-heading__icon section-heading__icon--orange">
              <Icon><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></Icon>
            </div>
            <div><h2>Skill gaps</h2><p>Topics worth prioritizing before your interview.</p></div>
          </div>
          <div className="skill-list">
            {data.skillGaps.map((gap) => (
              <div className="skill-item" key={gap.skill}><span>{gap.skill}</span><span className={`severity severity--${gap.severity}`}>{gap.severity}</span></div>
            ))}
          </div>
        </section>

        <section className="interview-section interview-section--compact" id="roadmap">
          <div className="section-heading">
            <div className="section-heading__icon section-heading__icon--green">
              <Icon><path d="M6 3h12a2 2 0 0 1 2 2v16l-8-3-8 3V5a2 2 0 0 1 2-2Z" /><path d="m9 10 2 2 4-4" /></Icon>
            </div>
            <div><h2>Preparation plan</h2><p>A practical path to interview readiness.</p></div>
          </div>
          <div className="plan-list">
            {data.preparationPlan.map((plan) => (
              <div className="plan-item" key={plan.day}>
                <span className="plan-item__day">Day {plan.day}</span>
                <div><h3>{plan.focus}</h3><ul>{plan.tasks.map((task) => <li key={task}>{task}</li>)}</ul></div>
              </div>
            ))}
          </div>
        </section>
      </div>}
      </section>
      <aside className="interview-insights">
        <section className="insight-block insight-block--score">
          <span className="insight-label">Match score</span>
          <strong>{data.matchScore}%</strong>
          <div className="score-track"><span style={{ width: `${data.matchScore}%` }} /></div>
          <small>Strong alignment with this role</small>
        </section>
        <section className="insight-block">
          <span className="insight-label">Skill gaps</span>
          <div className="skill-list">
            {data.skillGaps.map((gap) => (
              <div className="skill-item" key={gap.skill}>
                <span>{gap.skill}</span>
                <span className={`severity severity--${gap.severity}`}>{gap.severity}</span>
              </div>
            ))}
          </div>
        </section>
      </aside>
      </div>
    </main>
  );
};

export default Interview