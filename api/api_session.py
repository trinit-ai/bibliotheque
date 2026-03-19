from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

from engine_client import get_engine_client

router = APIRouter()


class SessionStartRequest(BaseModel):
    pack_id: str
    visitor_name: Optional[str] = None
    metadata: Optional[dict] = None


class SessionTurnRequest(BaseModel):
    session_id: str
    message: str


@router.post("/start")
async def start_session(req: SessionStartRequest) -> dict:
    """Start a new session. Proxies to TMOS13 engine."""
    engine = get_engine_client()
    result = await engine.session_start(
        pack_id=req.pack_id,
        visitor_name=req.visitor_name,
        metadata=req.metadata,
    )
    return result


@router.post("/turn")
async def session_turn(req: SessionTurnRequest) -> dict:
    """Send a message in an existing session. Proxies to TMOS13 engine."""
    engine = get_engine_client()
    result = await engine.session_turn(
        session_id=req.session_id,
        message=req.message,
    )
    return result
