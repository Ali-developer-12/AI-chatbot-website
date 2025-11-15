# AI Chatbot Website

> Simple AI chatbot web application — users can sign up, log in, and chat with an AI (OpenAI). Chat history is **not persisted**; responses are real-time only.

---

## Badges

- **Tech:** Node · Express · MongoDB · OpenAI · JWT · Vanilla JS
- **Status:** Draft / In development

---

## Table of contents

- [About](#about)
- [Features](#features)
- [Demo / Screenshots](#demo--screenshots)
- [Tech stack](#tech-stack)
- [Architecture & Flow](#architecture--flow)
- [Project structure](#project-structure)
- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Run the project (development)](#run-the-project-development)
- [API endpoints](#api-endpoints)
- [Developer roles & file ownership](#developer-roles--file-ownership)
- [Prompts (English & Roman Urdu)](#prompts-english--roman-urdu)
- [Testing & Common issues](#testing--common-issues)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## About

This repository contains a lightweight AI chatbot website. The goal is to provide a clean, minimal UI where users can sign up, log in, and chat with an AI (OpenAI or other providers). The app focuses on realtime interaction; chat messages are **not** stored in the database.

The README below is a polished, developer-friendly reference that includes a clearer flowchart (Mermaid), installation steps, and developer notes.

---

## Features

- User registration and login (JWT-based authentication)
- Protected chat route that calls the OpenAI API to get AI responses
- Simple, responsive frontend using HTML/CSS/Bootstrap and vanilla JS
- Backend built with Node.js, Express, MongoDB (Mongoose)
- No chat history persistence (stateless chat)

---

## Demo / Screenshots

> Add screenshots or a short GIF here showing: (1) homepage, (2) signup/login, (3) chat UI with user + AI messages.

> **Tip:** Put images in `/frontend/assets/` and reference them in the README using Markdown.

---

## Tech stack

- Frontend: HTML, CSS, JavaScript, Bootstrap (optional)
- Backend: Node.js, Express.js
- Database: MongoDB (Atlas or local)
- Auth: JWT (jsonwebtoken)
- AI: OpenAI API (or other API providers like Grok / Gemini)

---

## Architecture & Flow

## 📊 Project Flow (Dark Mode)

Below is the complete flow of the AI Chatbot system — from user interaction to backend processing and AI response.

![AI Chatbot Flowchart – Dark Mode](assets/images/flowchart-dark.png)


  subgraph Frontend_Scripts
    C --> F[frontend/js/signup.js]
    D --> G[frontend/js/login.js]
    E --> H[frontend/js/chat.js]
  end

  subgraph Backend
    I[POST /signup] --> J[backend/controllers/authController.signup]
    K[POST /login] --> L[backend/controllers/authController.login]
    M[POST /ask] --> N[backend/controllers/chatController.ask]
    N --> O[Call OpenAI API]
  end

  subgraph Auth
    L & J --> P[backend/models/User.js]
    P --> Q[MongoDB]
    H -->|attach JWT in header| R[backend/middleware/authMiddleware]
    R --> N
  end

  %% Connections between front and back
  F --> I
  G --> K
  H --> M
  O --> S[AI Response]
  S --> H
  H --> E
```

**Explanation (short):**

1. User navigates the frontend pages. Signup/login pages POST to `/signup` and `/login`.
2. Successful login returns a JWT that the frontend stores (localStorage) and uses to call protected `/ask` route.
3. `/ask` is protected by `authMiddleware` which verifies the JWT; `chatController` forwards the user message to the OpenAI API and returns the AI response to the frontend.

---

## Project structure

```
ai-chatbot-project/
├── assets/
│ └── images/
│ └── flowchart-dark.png
├── frontend/
│ ├── index.html
│ ├── login.html
│ ├── signup.html
│ ├── chat.html
│ ├── css/
│ │ └── style.css
│ └── js/
│ ├── login.js
│ ├── signup.js
│ └── chat.js
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── authController.js
│ │ └── chatController.js
│ ├── models/
│ │ └── User.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── chatRoutes.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ └── server.js
```

---

## Installation

> Works on macOS, Linux, Windows (WSL/Node environment). Use Node 18+ recommended.

1. Clone the repo

```bash
git clone https://github.com/<your-username>/ai-chatbot-project.git
cd ai-chatbot-project
```

2. Install backend dependencies

```bash
cd backend
npm install
```

(If you have a frontend build step or use a bundler, install frontend deps too — otherwise the frontend is static.)

3. Create `.env` in `backend/` (see next section for variables).

4. Start MongoDB (Atlas or local) and set the `MONGODB_URI` in `.env`.

5. Run the server

```bash
# in backend/
npm run dev    # or `node server.js` for production
```

6. Open `frontend/index.html` in browser (or serve the `frontend/` folder with a static server) and test signup/login/chat.

---

## Environment variables

Create a `backend/.env` file with the following variables:

```
PORT=5000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=some_strong_secret_here
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
```

**Security tip:** Never commit `.env` or API keys to the repo. Use GitHub Secrets or environment variables in deployment.

---

## Run the project (development)

- From `backend/`:

  - `npm run dev` — run server with nodemon (recommended)
  - `node server.js` — start server

- Frontend is static HTML; you can open `frontend/index.html` directly or serve using `live-server` / `http-server`.

**Ports:** Server defaults to `PORT` in `.env` (e.g., 5000). Frontend can be served from any static server or client port.

---

## API endpoints

**Auth**

- `POST /signup` — create a new user

  - Body: `{ name, email, password }`
  - Response: `{ success: true, message: 'User registered' }`

- `POST /login` — login user

  - Body: `{ email, password }`
  - Response: `{ success: true, token: 'JWT_TOKEN' }`

**Chat**

- `POST /ask` — ask the AI (protected)

  - Headers: `Authorization: Bearer <JWT_TOKEN>`
  - Body: `{ message: 'Hello AI' }`
  - Response: `{ success: true, reply: 'AI response text' }`

---

## Developer roles & file ownership

The following mapping is useful while collaborating; add/update as people change responsibilities.

- **Abdul-Saboor** — `server.js`, attach routes
- **Hammad Ali** — `config/db.js`, `models/User.js` (DB layer)
- **Tamoor** — `controllers/authController.js` (signup/login logic, hashing, JWT)
- **Naseer Nawaz** — `routes/authRoutes.js` (auth endpoints wiring)
- **M.Imran** — `controllers/chatController.js` (OpenAI integration)
- **M.Arslan** — `routes/chatRoutes.js`, `middleware/authMiddleware.js` (secure endpoints)
- **M.Abdul-Rasheed** — UI layout, design, testing, version control guidance
- **Ali Raza** — frontend JS and overall frontend integration

> Keep this list up to date in the repo so new contributors know who owns which part.

---

## Prompts (English & Roman Urdu)

Included below are ready-to-use prompt templates you can pass to a contributor or to a developer assistant bot.

### English prompt template

```
I am working on an AI Chatbot Project with the following structure:
ai-chatbot-project/
[...project structure omitted...]

I need help with [SPECIFIC SECTION/FILE YOU'RE WORKING ON].

Please provide:
- Complete code for that specific section
- Step-by-step implementation guide
- Testing instructions
- Common issues and solutions
- Integration points with other sections

Tech stack: Frontend: HTML/CSS/JS, Backend: Node/Express, DB: MongoDB, Auth: JWT, AI: OpenAI API
Note: We do NOT store chat history — only realtime AI responses.
```

### Roman Urdu prompt template

```
Main AI Chatbot Project par kaam kar raha hoon jiski structure yeh hai:
ai-chatbot-project/ [...project structure omitted...]

Mujhe [SPECIFIC SECTION/FILE NAME] mein help chahiye.

Kripya provide karein:
- Us specific section ka complete code
- Step-by-step implementation guide
- Testing ke instructions
- Common issues aur unke solutions
- Dusre sections ke saath integration points

Note: Hum chat history store nahi kar rahe, sirf real-time AI responses.
```

---

## Testing & Common issues

### Basic tests

1. **Signup flow**

   - Send `POST /signup` with valid data. Expect success.
   - Try to signup with same email — expect an error.

2. **Login flow**

   - `POST /login` with correct credentials — expect JWT token.
   - Wrong password — expect 401+ message.

3. **Protected chat**

   - Call `/ask` without token — expect 401.
   - Call `/ask` with valid token and body `{ message }` — expect AI reply.

4. **Frontend**

   - Signup and login via UI. Confirm token stored in `localStorage` and used in Chat requests.

### Common issues & fixes

- **MongoDB connection errors**: Check `MONGODB_URI`, network access, IP whitelist (Atlas).
- **JWT verify failing**: Confirm `JWT_SECRET` matches value used when signing token and that token is sent as `Authorization: Bearer <token>`.
- **CORS**: If frontend on a different origin, enable `cors()` on Express with appropriate origin or allow all in dev.
- **OpenAI errors**: Ensure `OPENAI_API_KEY` is valid, and that usage quotas are available. Handle rate limits and network errors gracefully.
- **Frontend not sending token**: Verify your fetch/XHR includes the `Authorization` header and that `localStorage` key name matches the JS code.

---

## Security & production notes

- Never commit API keys or `.env` files to source control.
- Use HTTPS and secure cookies if you move to cookie-based auth.
- Consider short-lived JWTs and refresh tokens for better security.
- Add rate limiting to `/ask` to prevent abuse of your OpenAI account.
- Consider logging, monitoring and error reporting for production.

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: short description"`
4. Push and open a PR

Add a `CONTRIBUTING.md` if you want a stricter workflow (code style, linting, tests).

---

## License

Add a `LICENSE` file. If you want a permissive license, use the **MIT License**. Example header for files:

```
MIT License
Copyright (c) YEAR <OWNER>
```

---

## Acknowledgments

- OpenAI for the language model API
- Collaborators listed above
- Any libraries / tutorials you used while building the project
