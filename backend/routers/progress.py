"""
Progress router — GET/POST /progress
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime, timezone
import uuid

from database import get_db
from models import Progress

router = APIRouter(prefix="/progress", tags=["progress"])


class ProgressRequest(BaseModel):
    user_id: str
    course_id: str
    last_position: float = 0
    timestamp: str | None = None


class ProgressOut(BaseModel):
    id: str
    user_id: str
    course_id: str
    last_position: float
    updated_at: datetime

    class Config:
        from_attributes = True


@router.get("/{user_id}/{course_id}", response_model=ProgressOut | None)
def get_progress(user_id: str, course_id: str, db: Session = Depends(get_db)):
    """Get progress for a user + course combo."""
    record = (
        db.query(Progress)
        .filter(Progress.user_id == user_id, Progress.course_id == course_id)
        .first()
    )
    if not record:
        return None
    return record


@router.post("/", response_model=ProgressOut)
def save_progress(body: ProgressRequest, db: Session = Depends(get_db)):
    """Upsert progress for a user + course combo."""
    record = (
        db.query(Progress)
        .filter(Progress.user_id == body.user_id, Progress.course_id == body.course_id)
        .first()
    )
    if record:
        record.last_position = body.last_position
        record.updated_at = datetime.now(timezone.utc)
    else:
        record = Progress(
            id=str(uuid.uuid4()),
            user_id=body.user_id,
            course_id=body.course_id,
            last_position=body.last_position,
            updated_at=datetime.now(timezone.utc),
        )
        db.add(record)
    db.commit()
    db.refresh(record)
    return record
