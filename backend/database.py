"""
Database connections for Anvaya LMS.
- Primary: PostgreSQL via SQLAlchemy (for Docker / production)
- Fallback: SQLite for local development (no Postgres needed)
- ChromaDB: Optional vector DB stub (install separately with: pip install chromadb)
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

# ──── Database URL ────
# Uses PostgreSQL when DATABASE_URL is set and reachable, otherwise falls back to SQLite
DATABASE_URL = os.getenv("DATABASE_URL", "")

engine = None

if DATABASE_URL:
    from sqlalchemy.exc import OperationalError
    try:
        # PostgreSQL (Docker / production)
        temp_engine = create_engine(DATABASE_URL, echo=False)
        # Test connection
        with temp_engine.connect() as conn:
            pass
        engine = temp_engine
        print(f"✓ Using PostgreSQL: {DATABASE_URL.split('@')[-1]}")
    except (OperationalError, Exception) as e:
        print(f"⚠ PostgreSQL connection failed: {e}. Falling back to SQLite.")

if engine is None:
    # SQLite fallback for local development (no Postgres install needed)
    import pathlib
    db_path = pathlib.Path(__file__).parent / "anvaya_dev.db"
    SQLITE_URL = f"sqlite:///{db_path}"
    engine = create_engine(SQLITE_URL, connect_args={"check_same_thread": False}, echo=False)
    print(f"✓ Using SQLite fallback: {db_path}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """FastAPI dependency – yields a DB session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ──── ChromaDB (Vector DB Stub) ────
def init_vector_db():
    """
    Initialize ChromaDB client and create a stub collection.
    No real embeddings yet – just ensures the connection works.
    Install with: pip install chromadb
    TODO: implement real vector embeddings for course content search
    """
    try:
        import chromadb  # type: ignore
        chroma_client = chromadb.Client()  # in-memory for skeleton
        collection = chroma_client.get_or_create_collection(
            name="course_content",
            metadata={"description": "Stub collection for course content embeddings"}
        )
        print(f"✓ ChromaDB: collection '{collection.name}' ready ({collection.count()} docs)")
        return chroma_client, collection
    except ImportError:
        print("⚠ ChromaDB not installed (optional). Run: pip install chromadb")
        return None, None
    except Exception as e:
        print(f"⚠ ChromaDB init skipped: {e}")
        return None, None
