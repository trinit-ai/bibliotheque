from fastapi import HTTPException


class NotFoundError(HTTPException):
    """Resource not found."""

    def __init__(self, detail: str = "Not found"):
        super().__init__(status_code=404, detail=detail)


class AuthError(HTTPException):
    """Authentication or authorization failure."""

    def __init__(self, detail: str = "Unauthorized"):
        super().__init__(status_code=401, detail=detail)


class RateLimitError(HTTPException):
    """Rate limit exceeded."""

    def __init__(self, detail: str = "Rate limit exceeded"):
        super().__init__(status_code=429, detail=detail)


class ValidationError(HTTPException):
    """Request validation failure."""

    def __init__(self, detail: str = "Invalid request"):
        super().__init__(status_code=400, detail=detail)


class EngineError(HTTPException):
    """TMOS13 engine communication failure."""

    def __init__(self, detail: str = "Engine unavailable"):
        super().__init__(status_code=502, detail=detail)
