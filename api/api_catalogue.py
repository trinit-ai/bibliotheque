from fastapi import APIRouter
from catalogue import get_catalogue, CatalogueEntry
from http_errors import NotFoundError

router = APIRouter()


@router.get("")
async def list_catalogue() -> dict:
    """List all catalogue entries."""
    catalogue = get_catalogue()
    entries = catalogue.all_entries()
    return {
        "entries": [e.model_dump() for e in entries],
        "count": len(entries),
    }


@router.get("/featured")
async def list_featured() -> dict:
    """List featured catalogue entries."""
    catalogue = get_catalogue()
    featured = catalogue.featured(limit=10)
    return {
        "entries": [e.model_dump() for e in featured],
        "count": len(featured),
    }


@router.get("/stats")
async def catalogue_stats() -> dict:
    """Return catalogue statistics."""
    return get_catalogue().stats()


@router.get("/portal/{portal}")
async def list_by_portal(portal: str) -> dict:
    """List catalogue entries within a portal (category)."""
    catalogue = get_catalogue()
    entries = catalogue.by_portal(portal)
    return {
        "portal": portal,
        "entries": [e.model_dump() for e in entries],
        "count": len(entries),
    }


@router.get("/{entry_id}")
async def get_entry(entry_id: str) -> dict:
    """Get a single catalogue entry by ID or slug."""
    catalogue = get_catalogue()
    entry = catalogue.get(entry_id) or catalogue.by_slug(entry_id)
    if not entry:
        raise NotFoundError(detail=f"Catalogue entry '{entry_id}' not found")
    return entry.model_dump()
