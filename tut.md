# Anvaya LMS — Accessible Learning Management System

An accessible Learning Management System for specially-abled students, built with Next.js, FastAPI, PostgreSQL, and ChromaDB.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router) + Tailwind CSS |
| Backend | Python + FastAPI |
| Primary DB | PostgreSQL (via SQLAlchemy) |
| Vector DB | ChromaDB (stub — initialized, no real embeddings) |
| Icons | Lucide React |

## Getting Started

### Prerequisites
- **Node.js** 18+
- **Python** 3.10+
- **PostgreSQL** running locally (or use Docker)

### Option 1: Docker (Recommended)

```bash
# Copy environment file
cp .env.example .env

# Start everything
docker-compose up --build
```

Services:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- PostgreSQL: localhost:5432

### Option 2: Manual Setup

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt

# Start PostgreSQL and set DATABASE_URL if needed
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

See `.env.example` for all variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://anvaya:anvaya_pass@localhost:5432/anvaya_db` | PostgreSQL connection |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | FastAPI backend URL |

## What's Working vs Stubs

### ✅ Working
- Next.js ↔ FastAPI communication (CORS configured)
- FastAPI ↔ PostgreSQL (all CRUD operations)
- Onboarding form submits answers to database
- Dashboard loads courses from database (6 seeded courses)
- Course progress auto-saves after 10 seconds
- Settings page: font size + dark mode persists via localStorage
- AI chat sends to endpoint (returns stub response)

### 🔜 Stubs (UI present, placeholder functionality)
- Text-to-Speech / audio playback
- Speech recognition / voice input
- Language switching
- Sign language overlay
- AI chat (returns hardcoded responses)
- Magic Transformer (returns placeholder)
- Voice navigation

Each stub has a `// TODO: implement [feature]` comment for easy discovery.

## Project Structure

```
anvaya/
├── frontend/                  # Next.js 15 App Router
│   ├── app/                   # Pages
│   │   ├── page.tsx           # Landing
│   │   ├── onboarding/       # Guided questions
│   │   ├── dashboard/        # Main dashboard
│   │   ├── course/[id]/      # Course player
│   │   ├── settings/         # Font size + theme
│   │   ├── activities/       # Coming soon stub
│   │   ├── preferences/      # Coming soon stub
│   │   └── know-your-rights/ # Static content
│   ├── components/           # Reusable components
│   └── lib/api.ts            # API client
├── backend/                   # FastAPI
│   ├── main.py               # App entry + seed data
│   ├── database.py           # PostgreSQL + ChromaDB
│   ├── models.py             # SQLAlchemy models
│   └── routers/              # API endpoints
└── docker-compose.yml
```

## Database Schema

| Table | Purpose |
|-------|---------|
| `users` | User profiles with JSONB preferences |
| `onboarding_responses` | Onboarding answers (JSONB) |
| `courses` | Course catalog (seeded with 6 courses) |
| `progress` | User progress per course |

## API Endpoints

| Method | Endpoint | Status |
|--------|----------|--------|
| `POST` | `/onboarding/answers` | ✅ Working |
| `GET` | `/courses` | ✅ Working |
| `GET` | `/courses/{id}` | ✅ Working |
| `GET` | `/progress/{user_id}/{course_id}` | ✅ Working |
| `POST` | `/progress` | ✅ Working |
| `POST` | `/ai/chat` | 🔜 Stub |
| `POST` | `/ai/transform` | 🔜 Stub |
