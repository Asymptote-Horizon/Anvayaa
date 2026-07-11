"""
Courses router — GET /courses, GET /courses/{id}
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from models import Course

router = APIRouter(prefix="/courses", tags=["courses"])


class CourseOut(BaseModel):
    id: str
    title: str
    subject: str
    description: str
    thumbnail_url: str
    video_url: str

    class Config:
        from_attributes = True


class CourseDetailOut(CourseOut):
    content_stub: str
    video_url: str

    class Config:
        from_attributes = True


@router.get("/", response_model=list[CourseOut])
def list_courses(db: Session = Depends(get_db)):
    """Return all courses."""
    return db.query(Course).all()


@router.get("/{course_id}", response_model=CourseDetailOut)
def get_course(course_id: str, db: Session = Depends(get_db)):
    """Return a single course by ID."""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course
