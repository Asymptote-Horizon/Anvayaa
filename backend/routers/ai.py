"""
AI router — Endpoints for AI integration (Chat and Transform).
POST /ai/chat, POST /ai/transform
"""

from fastapi import APIRouter
from pydantic import BaseModel
from chat import get_llm_response

router = APIRouter(prefix="/ai", tags=["ai"])


class ChatRequest(BaseModel):
    message: str
    course_id: str | None = None


class ChatResponse(BaseModel):
    reply: str


class TransformRequest(BaseModel):
    content: str


class TransformResponse(BaseModel):
    transformed: str

@router.post("/chat", response_model=ChatResponse)
async def ai_chat(body: ChatRequest):
    """
    AI chat endpoint with OpenRouter integration and fallback logic.
    """
    reply = get_llm_response(body.message)
    if not reply:
        reply = "my wisdom is clouded right now. wait and ill help you soon."
    return ChatResponse(reply=reply)


@router.post("/transform", response_model=TransformResponse)
async def ai_transform(body: TransformRequest):
    """
    AI content transformation endpoint with LLM integration.
    """
    transformed = get_llm_response(
        "Transform this content into a simpler and more accessible version: "
        + body.content
    )
    if not transformed:
        transformed = "my wisdom is clouded right now. wait and ill help you soon."
    return TransformResponse(transformed=transformed)
