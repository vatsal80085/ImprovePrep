# ImprovePrep

> AI-Powered Interview Preparation & Readiness Platform

ImprovePrep is a full-stack platform engineered to evaluate candidate readiness against target role requirements. By integrating Google Gemini generative models with strictly typed schema validation, ImprovePrep evaluates a candidate's resume, personal profile, and target job description to synthesize personalized technical assessments, behavioral coaching prompts, skill gap evaluations, and structured preparation roadmaps.

---

## Architecture & System Design

### High-Level System Architecture

```text
+----------------------------------------------------------------------------------+
|                                CLIENT APPLICATION                                |
|                                                                                  |
|   +------------------------------------+  +----------------------------------+   |
|   |          React 19 / Vite           |  |       Auth Context & Hooks       |   |
|   |  - Responsive SCSS Interface       |  |  - Session state preservation    |   |
|   |  - Role & profile input forms      |  |  - Route guard (Protected route) |   |
|   +-----------------+------------------+  +-----------------+----------------+   |
+---------------------|---------------------------------------|--------------------+
                      |                                       |
                      | HTTP/REST Requests (Credentials / CORS)
                      v                                       v
+----------------------------------------------------------------------------------+
|                               EXPRESS BACKEND CORE                               |
|                                                                                  |
|   +--------------------------------------------------------------------------+   |
|   |                         Middleware Pipeline                              |   |
|   |   - express.json()   - cookie-parser()   - cors(origin, credentials)     |   |
|   +-------------------------------------+------------------------------------+   |
|                                         |                                        |
|         +-------------------------------+-------------------------------+        |
|         |                                                               |        |
|         v                                                               v        |
|   +----------------------------+                          +------------------+   |
|   |    Auth Router & Guards    |                          |  Report Router   |   |
|   |  - auth.routes.js          |                          |  - Input payload |   |
|   |  - auth.middleware.js      |                          |    normalization |   |
|   +-------------+--------------+                          +--------+---------+   |
|                 |                                                  |             |
|                 v                                                  v             |
|   +----------------------------+                          +------------------+   |
|   |      Auth Controller       |                          |    AI Service    |   |
|   |  - bcrypt credential check |                          |  - Prompt eng.   |   |
|   |  - JWT issuance / clear    |                          |  - Gemini 3 SDK  |   |
|   +-------------+--------------+                          |  - Zod parser    |   |
|                 |                                         +--------+---------+   |
+-----------------|--------------------------------------------------|-------------+
                  |                                                  |
                  v                                                  v
+------------------------------------+             +-------------------------------+
|         DATABASE LAYER             |             |        EXTERNAL SERVICES      |
|                                    |             |                               |
|   MongoDB Cluster (Mongoose ODM)   |             |   Google Gemini Generative AI |
|   - Users (Credentials & metadata) |             |   - Model: gemini-3-flash     |
|   - Blacklist (Revoked tokens)     |             |   - Structured JSON output    |
|   - InterviewReports (AI schemas)  |             |   - Schema: Zod / JSON Schema |
+------------------------------------+             +-------------------------------+
```

---

### Interview Analysis & Generation Pipeline

```text
[ Candidate Inputs ]
  ├── Resume Text
  ├── Self Description
  └── Job Description
           │
           v
[ Express Application Layer ]
  ├── Sanitizes and structures input payloads
  └── Invokes AI Generation Service (`ai.service.js`)
           │
           v
[ Google Gemini Model (`gemini-3-flash-preview`) ]
  ├── Applies domain prompts tailored to technical assessment
  └── Enforces strict JSON Schema compiled from Zod contract
           │
           v
[ Validation & Parsing ]
  ├── Matches response with `interviewReportSchema`
  └── Handles parsing, normalization, and fallback safety
           │
           v
[ Persistence & Delivery ]
  ├── Writes structured document to MongoDB (`InterviewReport` collection)
  └── Dispatches formatted response back to React frontend
```

---

### Authentication & Token Lifecycle

```text
[ Client ]                        [ Server API ]                    [ Database / Cache ]
    │                                   │                                     │
    │─── 1. POST /api/auth/login ──────>│                                     │
    │    { email, password }            │─── 2. Query user record ───────────>│
    │                                   │<── 3. Return hashed document ───────│
    │                                   │                                     │
    │                                   │─── 4. bcrypt.compare()              │
    │                                   │─── 5. Sign JWT token                │
    │<── 6. Set HTTP-Only Cookie ───────│                                     │
    │    (Token attached to domain)     │                                     │
    │                                   │                                     │
    │─── 7. Authenticated Request ─────>│                                     │
    │    (Cookie auto-sent)             │─── 8. Check token in blacklist ────>│
    │                                   │<── 9. Not blacklisted ──────────────│
    │                                   │─── 10. Verify signature & pass req  │
    │                                   │                                     │
    │─── 11. GET /api/auth/logout ─────>│                                     │
    │                                   │─── 12. Write token to Blacklist ───>│
    │<── 13. Clear cookie header ───────│                                     │
```

---

## Features

- **Profile Match Scoring**: Deterministic algorithmic and contextual rating (0–100) quantifying candidate alignment against target job requirements.
- **Targeted Technical Assessment**: Curated technical questions based on the candidate's declared experience level, including the interviewer's strategic intention and recommended answer structure.
- **Behavioral & Situational Analysis**: Scenarios evaluating leadership, conflict resolution, and cultural fit, mapped to structured response models (e.g., STAR technique).
- **Skill Gap & Severity Categorization**: Granular detection of missing technical proficiencies categorized by impact severity (`low`, `medium`, `high`).
- **Personalized Preparation Roadmap**: Day-by-day structured curriculum providing targeted focus areas and actionable revision tasks.
- **Secure Authentication & Session Management**: Stateless JSON Web Token authentication using HTTP-only cookies, salted password hashing via `bcryptjs`, and active token blacklisting on logout.

---

## Technology Stack

| Layer | Component | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19 | Declarative user interface library |
| | Vite 8 | High-performance build tool and local dev server |
| | React Router 8 | Declarative client-side routing and protected boundaries |
| | Sass (SCSS) | Modular and maintainable styling architecture |
| | Axios | Promise-based HTTP client configured with cookie credentials |
| **Backend** | Node.js | Asynchronous JavaScript server runtime |
| | Express.js 5 | Minimalist web application and API framework |
| | Mongoose 9 | Object Document Mapper for MongoDB modeling |
| | Zod | TypeScript-first schema declaration and runtime validation |
| **AI / Machine Learning** | Google Gen AI SDK | Official `@google/genai` library powering LLM workflows |
| | Gemini 3 Flash | Low-latency inference model with native structured output |
| **Security** | JSON Web Tokens | Stateless session badges signed using HMAC SHA-256 |
| | bcryptjs | Secure one-way adaptive password hashing |
| | Cookie-Parser | Middleware to parse and sign HTTP-only cookies |

---

## Project Structure

```text
ImprovePrep/
├── Client/
│   ├── public/                      # Static client assets
│   ├── src/
│   │   ├── features/
│   │   │   ├── auth/                # Authentication domain
│   │   │   │   ├── components/      # Route guards and UI components
│   │   │   │   ├── hooks/           # useAuth and session hooks
│   │   │   │   ├── pages/           # Login and Registration views
│   │   │   │   ├── services/        # Axios API transport for auth
│   │   │   │   └── auth.context.jsx # Session provider and state
│   │   │   └── ai/                  # AI report views and report components
│   │   ├── styles/                  # Modular SCSS component stylesheets
│   │   ├── app.routes.jsx           # Client router hierarchy
│   │   ├── App.jsx                  # Root application component
│   │   └── main.jsx                 # Application entry point
│   ├── package.json
│   └── vite.config.js
│
├── Server/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # MongoDB connection initialization
│   │   ├── controllers/
│   │   │   └── auth.controller.js   # Authentication controller methods
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js   # JWT validation and blacklist guard
│   │   ├── models/
│   │   │   ├── user.model.js        # User entity schema definition
│   │   │   ├── blacklist.model.js   # Revoked token tracking
│   │   │   └── InterviewReport.model.js # Structured AI report schema
│   │   ├── routes/
│   │   │   └── auth.routes.js       # Route mapping for /api/auth
│   │   ├── services/
│   │   │   ├── ai.service.js        # Gemini SDK client & prompt builder
│   │   │   └── temp.js              # Mock fixtures and evaluation sets
│   │   └── app.js                   # Express application setup
│   ├── .env.example                 # Environment variables template
│   ├── server.js                    # Server startup script
│   ├── JOURNAL.md                   # System design notes and reference manual
│   └── package.json
│
└── README.md                        # Master repository documentation
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **MongoDB**: Active MongoDB database instance (local or Atlas)
- **Google AI Studio API Key**: Valid API token from Google AI Studio

---

### Installation & Environment Setup

#### 1. Clone Repository

```bash
git clone https://github.com/vatsal80085/ImprovePrep.git
cd ImprovePrep
```

#### 2. Backend Setup (`Server/`)

```bash
cd Server
npm install
```

Copy the example environment configuration:

```bash
cp .env.example .env
```

Populate `.env` with appropriate credentials:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/improveprep
JWT_SECRET=your_secure_random_jwt_secret
CLIENT_URL=http://localhost:5173
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

Start the backend service:

```bash
npm run dev
```

The server will initialize on `http://localhost:3000`.

#### 3. Frontend Setup (`Client/`)

In a new terminal window:

```bash
cd Client
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Access the frontend user interface at `http://localhost:5173`.

---

## API Reference

### Authentication Routes

All authentication routes are prefixed with `/api/auth`.

#### Register User
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "username": "developer_pro",
    "email": "candidate@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Success Response** (`201 Created`):
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "670c5e7b...",
      "username": "developer_pro",
      "email": "candidate@example.com"
    }
  }
  ```

#### Login User
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "candidate@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Success Response** (`200 OK`): Sets HTTP-only `token` cookie and returns user profile payload.

#### Logout User
- **Endpoint**: `GET /api/auth/logout`
- **Access**: Private (Authenticated)
- **Action**: Invalidates cookie and persists current token into revocation blacklist.

#### Current User Profile
- **Endpoint**: `GET /api/auth/get-me`
- **Access**: Private (Authenticated)
- **Success Response** (`200 OK`): Returns sanitized profile of currently authenticated user.

---

## Data Contracts & Schemas

### Structured Interview Report Contract (Zod Schema)

The AI integration guarantees compliance with the following schema:

```json
{
  "title": "Senior Backend Engineer",
  "matchScore": 84,
  "technicalQuestions": [
    {
      "question": "How do you mitigate database connection exhaustion under spike loads in Node.js?",
      "intention": "Validates understanding of connection pooling, connection limits, and queuing mechanisms.",
      "answer": "Detail Mongoose poolSize tuning, queue-based throttling, circuit breakers, and read replicas."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Describe a scenario where you negotiated a technical trade-off with cross-functional stakeholders.",
      "intention": "Assesses business prioritization, communication clarity, and stakeholder alignment.",
      "answer": "Utilize STAR methodology: outline the constraint, competing priorities, consensus reached, and technical outcome."
    }
  ],
  "skillGaps": [
    {
      "skill": "Kubernetes Orchestration",
      "severity": "medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Distributed Systems & Caching",
      "tasks": [
        "Review Redis caching eviction strategies and TTL policies",
        "Implement a cache-aside pattern demonstration in Express"
      ]
    }
  ]
}
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/issue-reference`.
3. Commit changes following conventional commit syntax: `git commit -m 'feat(auth): add password strength validator'`.
4. Push to branch: `git push origin feature/issue-reference`.
5. Open a Pull Request detailing changes, test results, and rationale.

---