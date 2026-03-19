from fastapi import APIRouter
from pydantic import BaseModel

from catalogue import get_catalogue, ContentType
from engine_client import get_engine_client
from errors import NotFoundError

router = APIRouter()


class WikiStartRequest(BaseModel):
    visitor_name: str | None = None


@router.get("/{entity}")
async def get_wiki_entity(entity: str) -> dict:
    """Resolve a wiki entity. Looks up the entity slug in the catalogue
    and returns its metadata along with its content type."""
    catalogue = get_catalogue()
    entry = catalogue.by_slug(f"wiki_{entity}") or catalogue.by_slug(entity)

    if entry:
        return {
            "entity": entity,
            "found": True,
            "entry": entry.model_dump(),
            "session_type": entry.content_type.value,
        }

    # Entity not in catalogue — still allow expedition-style session
    return {
        "entity": entity,
        "found": False,
        "entry": None,
        "session_type": "expedition",
    }


@router.post("/{entity}/start")
async def start_wiki_session(entity: str, req: WikiStartRequest) -> dict:
    """Start an expedition session for a wiki entity. Uses the entity's
    pack_id if catalogued, otherwise falls back to a general expedition pack."""
    catalogue = get_catalogue()
    entry = catalogue.by_slug(f"wiki_{entity}") or catalogue.by_slug(entity)

    pack_id = "expedition"  # default fallback
    if entry and entry.pack_id:
        pack_id = entry.pack_id

    engine = get_engine_client()
    result = await engine.session_start(
        pack_id=pack_id,
        visitor_name=req.visitor_name,
        metadata={
            "source": "bibliotheque",
            "entity": entity,
            "expedition": True,
        },
    )
    return result
