from fastapi import APIRouter, Header
from pydantic import BaseModel
from typing import Optional

from config import REGISTRATION_OPEN
from db import get_db
from http_errors import AuthError, ValidationError

router = APIRouter()


class RegisterRequest(BaseModel):
    email: str
    password: str
    display_name: Optional[str] = None


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/register")
async def register(req: RegisterRequest) -> dict:
    """Register a new user account."""
    if not REGISTRATION_OPEN:
        raise ValidationError(detail="Registration is currently closed")

    db = get_db()
    if not db:
        raise ValidationError(detail="Auth service not configured")

    try:
        result = db.auth.sign_up({
            "email": req.email,
            "password": req.password,
            "options": {
                "data": {"display_name": req.display_name or req.email.split("@")[0]}
            },
        })
        return {
            "status": "registered",
            "user_id": result.user.id if result.user else None,
            "email": req.email,
        }
    except Exception as exc:
        raise ValidationError(detail=f"Registration failed: {str(exc)}")


@router.post("/login")
async def login(req: LoginRequest) -> dict:
    """Log in with email and password."""
    db = get_db()
    if not db:
        raise ValidationError(detail="Auth service not configured")

    try:
        result = db.auth.sign_in_with_password({
            "email": req.email,
            "password": req.password,
        })
        return {
            "status": "authenticated",
            "access_token": result.session.access_token if result.session else None,
            "refresh_token": result.session.refresh_token if result.session else None,
            "user": {
                "id": result.user.id if result.user else None,
                "email": req.email,
            },
        }
    except Exception as exc:
        raise AuthError(detail="Invalid credentials")


@router.get("/me")
async def get_me(authorization: Optional[str] = Header(None)) -> dict:
    """Get the current authenticated user's profile."""
    if not authorization:
        raise AuthError(detail="No authorization header")

    token = authorization.replace("Bearer ", "")
    db = get_db()
    if not db:
        raise ValidationError(detail="Auth service not configured")

    try:
        result = db.auth.get_user(token)
        user = result.user
        if not user:
            raise AuthError()
        return {
            "id": user.id,
            "email": user.email,
            "display_name": (user.user_metadata or {}).get("display_name", ""),
            "created_at": str(user.created_at) if user.created_at else None,
        }
    except AuthError:
        raise
    except Exception:
        raise AuthError(detail="Invalid or expired token")
