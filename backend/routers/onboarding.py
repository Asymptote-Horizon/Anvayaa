"""
Onboarding router — POST /onboarding/answers
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Any, Dict
import uuid

from database import get_db
from models import User, OnboardingResponse

router = APIRouter(prefix="/onboarding", tags=["onboarding"])


class OnboardingAnswersRequest(BaseModel):
    user_id: str | None = None
    answers: Dict[str, Any]


class OnboardingAnswersResponse(BaseModel):
    success: bool
    user_id: str


@router.post("/answers", response_model=OnboardingAnswersResponse)
def submit_onboarding_answers(body: OnboardingAnswersRequest, db: Session = Depends(get_db)):
    """Save onboarding answers to PostgreSQL."""
    # Create user if no user_id provided
    user_id = body.user_id
    if not user_id:
        user_id = str(uuid.uuid4())
        user = User(id=user_id, preferences=body.answers)
        db.add(user)
        db.flush()

    # Save answers
    response = OnboardingResponse(
        id=str(uuid.uuid4()),
        user_id=user_id,
        answers=body.answers
    )
    db.add(response)
    db.commit()

    return OnboardingAnswersResponse(success=True, user_id=user_id)
