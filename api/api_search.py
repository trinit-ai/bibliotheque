"""
Bibliothèque Search API
Unified search across catalogue, living books, web, and wiki.
"""
from fastapi import APIRouter, Query
from typing import Optional

from search_service import get_search_service

router = APIRouter()


@router.get("")
async def search(
    q: str = Query(..., min_length=1, description="Search query"),
    source: Optional[str] = Query(None, description="Filter: catalogue, books, web, all"),
) -> dict:
    """
    Search across all content sources.
    ?source=catalogue — packs only
    ?source=books — living book passages only
    ?source=web — web search only
    ?source=all or omitted — everything
    """
    search = get_search_service()

    if source == "catalogue":
        return search.catalogue(q)
    elif source == "books":
        return search.book("tao_te_ching", q)  # TODO: search all books
    elif source == "web":
        return await search.web(q)
    else:
        return await search.search_all(q)


@router.get("/book/{book_id}")
async def search_book(
    book_id: str,
    q: str = Query(..., min_length=1),
    limit: int = Query(5, ge=1, le=20),
) -> dict:
    """Search within a specific living book."""
    search = get_search_service()
    return search.book(book_id, q, max_results=limit)


@router.get("/web")
async def search_web(
    q: str = Query(..., min_length=1),
    limit: int = Query(5, ge=1, le=10),
) -> dict:
    """Search the web via Brave Search API."""
    search = get_search_service()
    return await search.web(q, num_results=limit)


@router.get("/wiki/{entity}")
async def resolve_wiki(entity: str) -> dict:
    """Resolve a wiki entity to an expedition template."""
    search = get_search_service()
    return search.resolve_wiki(entity)
