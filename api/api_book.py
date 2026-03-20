from fastapi import APIRouter
from pydantic import BaseModel

from catalogue import get_catalogue, ContentType
# engine_client removed — use local engine
from errors import NotFoundError

router = APIRouter()


class BookQueryRequest(BaseModel):
    question: str
    session_id: str | None = None


@router.get("/{book_id}")
async def get_book(book_id: str) -> dict:
    """Get a living book's metadata from the catalogue."""
    catalogue = get_catalogue()
    entry = catalogue.get(book_id) or catalogue.by_slug(book_id)
    if not entry:
        raise NotFoundError(detail=f"Book '{book_id}' not found")
    if entry.content_type != ContentType.living_book:
        raise NotFoundError(detail=f"'{book_id}' is not a living book")
    return entry.model_dump()


@router.post("/{book_id}/query")
async def query_book(book_id: str, req: BookQueryRequest) -> dict:
    """Query a living book. If no session_id is provided, starts a new
    session. If session_id is provided, sends a turn in the existing session."""
    catalogue = get_catalogue()
    entry = catalogue.get(book_id) or catalogue.by_slug(book_id)
    if not entry:
        raise NotFoundError(detail=f"Book '{book_id}' not found")

    # TODO: wire to embedded engine
    pack_id = entry.pack_id or entry.id

    if req.session_id:
        result = await engine.session_turn(
            session_id=req.session_id,
            message=req.question,
        )
    else:
        result = await engine.session_start(
            pack_id=pack_id,
            metadata={"source": "bibliotheque", "book_id": book_id},
        )
        if "session_id" in result:
            turn_result = await engine.session_turn(
                session_id=result["session_id"],
                message=req.question,
            )
            result.update(turn_result)

    return result
