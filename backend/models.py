"""
SQLAlchemy models for Anvaya LMS.
Tables: users, onboarding_responses, courses, progress
Note: JSON type works for both PostgreSQL (JSONB) and SQLite.
"""

import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, Float, ForeignKey
from sqlalchemy.types import JSON
from database import Base


def _uuid():
    return str(uuid.uuid4())


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=_uuid)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    preferences = Column(JSON, default=dict)


class OnboardingResponse(Base):
    __tablename__ = "onboarding_responses"

    id = Column(String, primary_key=True, default=_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    answers = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class Course(Base):
    __tablename__ = "courses"

    id = Column(String, primary_key=True, default=_uuid)
    title = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    description = Column(Text, default="")
    thumbnail_url = Column(String, default="")
    content_stub = Column(Text, default="")
    video_url = Column(String, default="")


class Progress(Base):
    __tablename__ = "progress"

    id = Column(String, primary_key=True, default=_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)
    last_position = Column(Float, default=0)
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
