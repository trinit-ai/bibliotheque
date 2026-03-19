import httpx
from typing import Any
from config import TMOS13_ENGINE_URL, TMOS13_ENGINE_API_KEY, logger
from errors import EngineError

_client: "EngineClient | None" = None


class EngineClient:
    """HTTP client for the TMOS13 engine. All session and pack logic
    lives in the engine — Bibliothèque never duplicates it."""

    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip("/")
        self.api_key = api_key
        self._http = httpx.AsyncClient(
            base_url=self.base_url,
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            },
            timeout=30.0,
        )
        logger.info(f"EngineClient initialized → {self.base_url}")

    async def _request(self, method: str, path: str, **kwargs: Any) -> dict:
        """Make a request to the engine and return the JSON response."""
        try:
            resp = await self._http.request(method, path, **kwargs)
            resp.raise_for_status()
            return resp.json()
        except httpx.HTTPStatusError as exc:
            logger.error(f"Engine HTTP {exc.response.status_code}: {exc.response.text}")
            raise EngineError(
                detail=f"Engine returned {exc.response.status_code}"
            )
        except httpx.RequestError as exc:
            logger.error(f"Engine connection error: {exc}")
            raise EngineError(detail="Engine connection failed")

    # -----------------------------------------------------------------
    # Packs
    # -----------------------------------------------------------------
    async def list_packs(self) -> list[dict]:
        """List available packs from the engine."""
        data = await self._request("GET", "/api/packs")
        return data.get("packs", data) if isinstance(data, dict) else data

    async def get_pack(self, pack_id: str) -> dict:
        """Get a single pack's metadata."""
        return await self._request("GET", f"/api/packs/{pack_id}")

    # -----------------------------------------------------------------
    # Sessions
    # -----------------------------------------------------------------
    async def session_start(
        self,
        pack_id: str,
        visitor_name: str | None = None,
        metadata: dict | None = None,
    ) -> dict:
        """Start a new session on the engine."""
        payload: dict[str, Any] = {"pack_id": pack_id}
        if visitor_name:
            payload["visitor_name"] = visitor_name
        if metadata:
            payload["metadata"] = metadata
        return await self._request("POST", "/api/session/start", json=payload)

    async def session_turn(
        self,
        session_id: str,
        message: str,
    ) -> dict:
        """Send a turn in an existing session."""
        return await self._request(
            "POST",
            "/api/session/turn",
            json={"session_id": session_id, "message": message},
        )

    # -----------------------------------------------------------------
    # Catalogue / Search
    # -----------------------------------------------------------------
    async def catalogue_search(self, query: str) -> list[dict]:
        """Search the engine's pack catalogue."""
        data = await self._request("GET", "/api/packs", params={"q": query})
        return data.get("packs", data) if isinstance(data, dict) else data

    # -----------------------------------------------------------------
    # Lifecycle
    # -----------------------------------------------------------------
    async def close(self) -> None:
        await self._http.aclose()


def init_engine_client() -> EngineClient:
    """Create and store the singleton engine client."""
    global _client
    _client = EngineClient(TMOS13_ENGINE_URL, TMOS13_ENGINE_API_KEY)
    return _client


def get_engine_client() -> EngineClient:
    """Return the singleton engine client. Raises if not initialized."""
    if _client is None:
        raise RuntimeError("EngineClient not initialized — call init_engine_client() first")
    return _client
