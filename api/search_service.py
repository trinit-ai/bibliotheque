"""
Bibliothèque Search Service
Unified search across: web (Brave), living books, catalogue, wiki expeditions.

Usage:
    from search_service import SearchService

    search = SearchService()
    results = await search.web("latest AI regulation news")
    results = search.book("tao_te_ching", "water")
    results = search.catalogue("stoicism")
    wiki = search.resolve_wiki("octopus")
"""
import os
import json
import logging
from pathlib import Path
from typing import Optional

logger = logging.getLogger("bibliotheque.search")

BOOKS_DIR = Path(__file__).parent.parent / "protocols" / "books"
LIBRARY_DIR = Path(__file__).parent.parent / "protocols" / "library"


class SearchService:
    """Unified search across all Bibliothèque content sources."""

    def __init__(self):
        self._brave_key = os.environ.get("BRAVE_SEARCH_API_KEY", "")
        self._web_enabled = os.environ.get("WEB_SEARCH_ENABLED", "true").lower() == "true"

    # ── Web Search (Brave API) ────────────────────────────────────────

    async def web(self, query: str, num_results: int = 5) -> dict:
        """
        Search the web via Brave Search API.
        Returns structured results: [{title, snippet, url}]
        """
        if not self._web_enabled:
            return {"success": False, "message": "Web search is disabled."}
        if not self._brave_key:
            return {"success": False, "message": "Web search not configured (missing BRAVE_SEARCH_API_KEY)."}
        if not query.strip():
            return {"success": False, "message": "Empty query."}

        import httpx

        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get(
                    "https://api.search.brave.com/res/v1/web/search",
                    params={"q": query, "count": min(num_results, 10)},
                    headers={
                        "Accept": "application/json",
                        "Accept-Encoding": "gzip",
                        "X-Subscription-Token": self._brave_key,
                    },
                )
                resp.raise_for_status()
                data = resp.json()

            web_results = data.get("web", {}).get("results", [])
            results = []
            for item in web_results[:num_results]:
                results.append({
                    "title": item.get("title", ""),
                    "snippet": (item.get("description", "") or "")[:500],
                    "url": item.get("url", ""),
                })

            return {
                "success": True,
                "results": results,
                "query": query,
                "count": len(results),
            }

        except httpx.HTTPStatusError as e:
            logger.warning("Brave Search API error: %s", e.response.status_code)
            return {"success": False, "message": f"Search API error ({e.response.status_code})."}
        except httpx.TimeoutException:
            return {"success": False, "message": "Search request timed out."}
        except Exception as e:
            logger.error("Web search failed: %s", e)
            return {"success": False, "message": f"Search failed: {e}"}

    # ── Living Book Search ────────────────────────────────────────────

    def book(self, book_id: str, query: str, max_results: int = 5) -> dict:
        """
        Search a living book's indexed text by keyword.
        Returns matched passages with chapter citations.
        """
        book_dir = BOOKS_DIR / book_id
        chunks_path = book_dir / "text" / "chunks.json"

        if not chunks_path.exists():
            return {"success": False, "message": f"Book '{book_id}' not found or not indexed."}

        try:
            data = json.loads(chunks_path.read_text())
            chunks = data.get("chunks", [])
        except Exception as e:
            return {"success": False, "message": f"Failed to load book: {e}"}

        query_lower = query.lower()
        query_words = set(query_lower.split())
        scored = []

        for chunk in chunks:
            text_lower = chunk.get("text", "").lower()
            keywords = set(k.lower() for k in chunk.get("keywords", []))

            # Score: keyword overlap + text match
            keyword_score = len(query_words & keywords) * 2
            text_score = sum(1 for w in query_words if w in text_lower)
            total = keyword_score + text_score

            if total > 0:
                scored.append({
                    "score": total,
                    "cite": chunk.get("label", chunk.get("id", "")),
                    "text": chunk.get("text", "")[:500],
                    "chapter": chunk.get("number"),
                })

        scored.sort(key=lambda x: x["score"], reverse=True)
        results = scored[:max_results]

        return {
            "success": True,
            "book_id": book_id,
            "query": query,
            "results": results,
            "count": len(results),
        }

    # ── Catalogue Search ──────────────────────────────────────────────

    def catalogue(self, query: str, max_results: int = 20) -> dict:
        """
        Search the protocol library by pack name, description, tags.
        Scans manifest.json files across the library.
        """
        query_lower = query.lower()
        results = []

        # Search system library
        system_dir = LIBRARY_DIR / "system"
        if system_dir.exists():
            for cat_dir in system_dir.iterdir():
                if not cat_dir.is_dir():
                    continue
                for pack_dir in cat_dir.iterdir():
                    if not pack_dir.is_dir():
                        continue
                    manifest_path = pack_dir / "manifest.json"
                    if not manifest_path.exists():
                        continue
                    try:
                        m = json.loads(manifest_path.read_text())
                        name = m.get("name", pack_dir.name).lower()
                        desc = m.get("description", "").lower()
                        cat = m.get("category", "").lower()
                        score = 0
                        if query_lower in name:
                            score += 5
                        if query_lower in desc:
                            score += 2
                        if query_lower in cat:
                            score += 1
                        if query_lower == pack_dir.name:
                            score += 10
                        if score > 0:
                            results.append({
                                "score": score,
                                "pack_id": pack_dir.name,
                                "name": m.get("name", pack_dir.name),
                                "category": cat_dir.name,
                                "description": m.get("description", "")[:200],
                            })
                    except Exception:
                        continue

        results.sort(key=lambda x: x["score"], reverse=True)

        return {
            "success": True,
            "query": query,
            "results": results[:max_results],
            "count": len(results),
        }

    # ── Wiki Resolution ───────────────────────────────────────────────

    def resolve_wiki(self, entity: str) -> dict:
        """
        Resolve a wiki entity to an expedition template.
        Uses the wiki resolver from the embedded engine.
        """
        try:
            import sys
            sys.path.insert(0, str(Path(__file__).parent / "engine"))
            from wiki_resolver import resolve_wiki_pack
            return resolve_wiki_pack(entity)
        except Exception as e:
            logger.warning("Wiki resolution failed: %s", e)
            return {
                "entity_slug": entity,
                "entity_type": "concept",
                "entity_name": entity.replace("_", " ").title(),
                "error": str(e),
            }

    # ── RAG Context Builder ───────────────────────────────────────────

    def build_rag_context(
        self,
        book_id: Optional[str] = None,
        query: str = "",
        max_chunks: int = 3,
    ) -> str:
        """
        Build a RAG context string for injection into the session prompt.
        For living books: retrieves relevant passages.
        Returns formatted text ready for system prompt injection.
        """
        if not book_id or not query:
            return ""

        results = self.book(book_id, query, max_results=max_chunks)
        if not results.get("success") or not results.get("results"):
            return ""

        lines = ["[Retrieved passages relevant to your question]\n"]
        for r in results["results"]:
            lines.append(f"[{r['cite']}]")
            lines.append(r["text"])
            lines.append("")

        lines.append("[End of retrieved passages]")
        return "\n".join(lines)

    # ── Combined Search ───────────────────────────────────────────────

    async def search_all(self, query: str) -> dict:
        """
        Search across all sources: catalogue + books + web.
        Returns combined results grouped by source.
        """
        catalogue_results = self.catalogue(query, max_results=10)

        # Search all available books
        book_results = []
        if BOOKS_DIR.exists():
            for book_dir in BOOKS_DIR.iterdir():
                if book_dir.is_dir() and (book_dir / "text" / "chunks.json").exists():
                    br = self.book(book_dir.name, query, max_results=2)
                    if br.get("results"):
                        for r in br["results"]:
                            r["book_id"] = book_dir.name
                        book_results.extend(br["results"])

        # Web search (async)
        web_results = await self.web(query, num_results=3)

        return {
            "query": query,
            "catalogue": catalogue_results.get("results", []),
            "books": sorted(book_results, key=lambda x: x["score"], reverse=True)[:5],
            "web": web_results.get("results", []) if web_results.get("success") else [],
        }


# ── Singleton ────────────────────────────────────────────────────────────

_search: Optional[SearchService] = None


def get_search_service() -> SearchService:
    global _search
    if _search is None:
        _search = SearchService()
    return _search
