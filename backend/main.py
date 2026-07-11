"""
Anvaya LMS — FastAPI Application Entry Point
Includes CORS, router registration, DB table creation, and seed data.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, SessionLocal, Base, init_vector_db
from models import Course, User
from routers import onboarding, courses, progress, ai, transformer


# ──── Seed Data ────
SEED_COURSES = [
    {
        "id": "course-physics-101",
        "title": "Physics Fundamentals",
        "subject": "Physics",
        "description": "Explore the laws of motion, energy, and the universe around you.",
        "thumbnail_url": "/images/physics.jpg",
        "content_stub": "Welcome to Physics Fundamentals. This course introduces motion, force, and energy through intuitive examples from daily life. You will understand how objects move, why they stop, and how energy shifts between forms in the world around you.\n\nAs you progress, you will explore waves, light, electricity, and magnetism using visual explanations and simple experiments. Each chapter is designed to help you connect theory with real experiences, from sound vibrations to electric circuits.\n\nThe final modules focus on applying core concepts to practical scenarios like transport, machines, and natural phenomena. By the end, you will be able to reason scientifically, solve foundational numerical problems, and explain physical behavior with confidence.",
        "video_url": "https://www.youtube.com/embed/wHC245cVdHw?si=J3DQETYohI8F8BjO",
    },
    {
        "id": "course-chemistry-101",
        "title": "Chemistry Essentials",
        "subject": "Chemistry",
        "description": "Discover atoms, molecules, and the reactions that shape our world.",
        "thumbnail_url": "/images/chemistry.jpg",
        "content_stub": "Welcome to Chemistry Essentials. You will begin with atoms, elements, and compounds, and learn how tiny particles combine to create the materials we use every day. Concepts are explained with clear comparisons and guided practice.\n\nNext, the course covers bonding, reactions, acids and bases, and the basics of chemical equations. You will build confidence in balancing reactions and understanding why substances change under different conditions.\n\nIn later modules, you will explore introductory organic chemistry and simple lab-style observations. The course emphasizes safe scientific thinking, pattern recognition, and practical chemistry knowledge that supports school and everyday decision-making.",
        "video_url": "https://www.youtube.com/embed/bka20Q9TN6M?si=JJZSMo-dlVpxhfGj",
    },
    {
        "id": "course-math-101",
        "title": "Mathematics Made Easy",
        "subject": "Mathematics",
        "description": "Build confidence with numbers, from algebra to calculus.",
        "thumbnail_url": "/images/math.jpg",
        "content_stub": "Welcome to Mathematics Made Easy. This course starts with number sense, arithmetic fluency, and clear strategies for solving everyday math problems. You will learn to approach questions step by step with confidence.\n\nThe intermediate modules cover algebra, geometry, and trigonometry with visual methods and worked examples. Instead of memorizing blindly, you will understand why formulas work and when to apply each one.\n\nThe advanced section introduces foundational calculus ideas such as change, slope, and area in an accessible way. By the end, you will have stronger logic, better problem-solving habits, and practical tools for academics and life.",
        "video_url": "https://www.youtube.com/embed/LwCRRUa8yTU?si=E9IumYEord-spWR",
    },
    {
        "id": "course-english-101",
        "title": "English Literature",
        "subject": "English",
        "description": "Journey through classic and modern literature with guided analysis.",
        "thumbnail_url": "/images/english.jpg",
        "content_stub": "Welcome to English Literature. You will read stories, poems, and short dramatic pieces while learning how language creates meaning, emotion, and perspective. Lessons focus on interpretation without making the process overwhelming.\n\nYou will practice identifying themes, tone, character development, and writing style through guided reading activities. The course also strengthens vocabulary, comprehension, and expression through reflection and discussion prompts.\n\nCreative response tasks encourage you to summarize, analyze, and write in your own voice. By the end, you will be more confident in reading complex texts and communicating your ideas clearly and thoughtfully.",
        "video_url": "https://www.youtube.com/embed/Awc1h20Ja94?si=H6Pk8W_l0sVIXfHA",
    },
    {
        "id": "course-cs-101",
        "title": "Computer Science Basics",
        "subject": "Computer Science",
        "description": "Learn programming, logic, and computational thinking.",
        "thumbnail_url": "/images/cs.jpg",
        "content_stub": "Welcome to Computer Science Basics. This course introduces computational thinking, problem decomposition, and algorithmic logic through beginner-friendly activities. You will learn how computers process instructions and solve tasks.\n\nYou will then move into core programming concepts such as variables, conditions, loops, and functions with guided coding examples. Each concept is reinforced with practical exercises that build confidence gradually.\n\nLater modules introduce fundamental data structures and algorithm patterns in simple language. By the end, you will be able to read basic code, write small programs, and think systematically when solving technical or real-world problems.",
        "video_url": "https://www.youtube.com/embed/CNFK86hJRfE?si=2OxYXGO-JJdxsFnH",
    },
    {
        "id": "course-life-101",
        "title": "Life Skills",
        "subject": "Life Skills",
        "description": "Practical skills for independence, communication, and daily living.",
        "thumbnail_url": "/images/life.jpg",
        "content_stub": "Welcome to Life Skills. This course focuses on practical routines that support independent and confident daily living. You will learn structured approaches to planning, communication, and decision-making in common situations.\n\nModules include personal finance basics, time management, self-advocacy, and social communication. Lessons are designed to be realistic and actionable, with examples drawn from study, work, and home environments.\n\nYou will also explore goal-setting, emotional regulation strategies, and accessing community support systems. By the end, you will have a stronger toolkit for managing responsibilities and building long-term independence.",
        "video_url": "https://www.youtube.com/embed/jrK-dolcjvw?si=ObUf9naEzc3Fjnrc",
    },
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: create tables, seed data, init vector DB."""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("✓ Database tables created")

    # Seed or sync courses
    db = SessionLocal()
    try:
        existing_courses = {course.id: course for course in db.query(Course).all()}
        created_count = 0
        updated_count = 0

        for c in SEED_COURSES:
            existing = existing_courses.get(c["id"])
            if existing:
                existing.title = c["title"]
                existing.subject = c["subject"]
                existing.description = c["description"]
                existing.thumbnail_url = c["thumbnail_url"]
                existing.content_stub = c["content_stub"]
                existing.video_url = c["video_url"]
                updated_count += 1
            else:
                db.add(Course(**c))
                created_count += 1

        db.commit()
        print(f"✓ Courses synced (created: {created_count}, updated: {updated_count})")
    finally:
        db.close()

    # Init vector DB stub
    init_vector_db()

    yield  # App runs here
    print("Anvaya backend shutting down.")


# ──── FastAPI App ────
app = FastAPI(
    title="Anvaya LMS API",
    description="Backend for the Anvaya accessible Learning Management System",
    version="0.1.0",
    lifespan=lifespan,
)

# ──── CORS ────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://frontend:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──── Routers ────
app.include_router(onboarding.router)
app.include_router(courses.router)
app.include_router(progress.router)
app.include_router(ai.router)
app.include_router(transformer.router)


@app.get("/")
def root():
    return {"message": "Anvaya LMS API is running", "version": "0.1.0"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
