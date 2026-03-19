from fastapi import APIRouter, Query
from catalogue import get_catalogue

router = APIRouter()


@router.get("")
async def search(q: str = Query(..., min_length=1, description="Search query")) -> dict:
    """Search the catalogue by text query. Searches titles, descriptions,
    tags, and portal names."""
    catalogue = get_catalogue()
    results = catalogue.search(q)
    return {
        "query": q,
        "results": [e.model_dump() for e in results],
        "count": len(results),
    }
