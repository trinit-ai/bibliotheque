import os
import glob
from enum import Enum
from typing import Optional
from pathlib import Path

import yaml
from pydantic import BaseModel, Field

from config import logger

# ---------------------------------------------------------------------------
# Types
# ---------------------------------------------------------------------------

class ContentType(str, Enum):
    living_book = "living_book"
    expedition = "expedition"
    pack = "pack"
    oracle = "oracle"
    game = "game"
    form = "form"
    news = "news"


class CatalogueEntry(BaseModel):
    id: str
    slug: str
    title: str
    subtitle: str = ""
    description: str = ""
    content_type: ContentType
    portal: str  # top-level category e.g. "philosophy", "religion"
    tags: list[str] = Field(default_factory=list)
    featured: Optional[int] = None  # rank 1-N, None = not featured
    cover_image: Optional[str] = None
    pack_id: Optional[str] = None  # engine pack_id if applicable
    source: str = "static"  # "static", "engine", "living_book"
    metadata: dict = Field(default_factory=dict)


# ---------------------------------------------------------------------------
# Catalogue
# ---------------------------------------------------------------------------

ENTRIES_DIR = Path(__file__).parent / "catalogue" / "entries"
BOOKS_DIR = Path(__file__).parent / "protocols" / "books"


class Catalogue:
    """Unified content catalogue. Loads from static YAML, engine packs,
    and living book protocol directories. Builds indices for fast lookup."""

    def __init__(self) -> None:
        self._entries: dict[str, CatalogueEntry] = {}
        self._by_slug: dict[str, CatalogueEntry] = {}
        self._by_portal: dict[str, list[CatalogueEntry]] = {}
        self._by_type: dict[ContentType, list[CatalogueEntry]] = {}
        self._featured: list[CatalogueEntry] = []

    # -----------------------------------------------------------------
    # Loading
    # -----------------------------------------------------------------

    def load(self) -> None:
        """Load all catalogue sources and build indices."""
        self._entries.clear()
        self._load_static_entries()
        self._load_living_books()
        self._build_indices()
        logger.info(
            f"Catalogue loaded: {len(self._entries)} entries, "
            f"{len(self._by_portal)} portals, "
            f"{len(self._featured)} featured"
        )

    async def load_from_engine(self, engine_packs: list[dict]) -> None:
        """Merge engine packs into the catalogue. Called after engine client
        is available."""
        for pack in engine_packs:
            pack_id = pack.get("id") or pack.get("pack_id", "")
            if not pack_id or pack_id in self._entries:
                continue
            entry = CatalogueEntry(
                id=pack_id,
                slug=pack_id,
                title=pack.get("name", pack_id),
                subtitle=pack.get("subtitle", ""),
                description=pack.get("description", ""),
                content_type=ContentType.pack,
                portal=pack.get("category", "general"),
                tags=pack.get("tags", []),
                pack_id=pack_id,
                source="engine",
            )
            self._entries[entry.id] = entry
        self._build_indices()
        logger.info(f"Catalogue updated with engine packs: {len(self._entries)} total")

    def _load_static_entries(self) -> None:
        """Load entries from catalogue/entries/*.yaml files."""
        if not ENTRIES_DIR.exists():
            logger.warning(f"Entries directory not found: {ENTRIES_DIR}")
            return
        for yaml_path in sorted(ENTRIES_DIR.glob("*.yaml")):
            try:
                with open(yaml_path) as f:
                    data = yaml.safe_load(f)
                if not data:
                    continue
                entries = data if isinstance(data, list) else data.get("entries", [data])
                for raw in entries:
                    entry = CatalogueEntry(**raw)
                    self._entries[entry.id] = entry
            except Exception as exc:
                logger.error(f"Failed to load {yaml_path}: {exc}")

    def _load_living_books(self) -> None:
        """Load living books from protocols/books/ directories.
        Each subdirectory with a manifest.yaml becomes a living_book entry."""
        if not BOOKS_DIR.exists():
            return
        for manifest_path in BOOKS_DIR.glob("*/manifest.yaml"):
            try:
                with open(manifest_path) as f:
                    data = yaml.safe_load(f)
                if not data or data.get("id") in self._entries:
                    continue
                entry = CatalogueEntry(
                    id=data["id"],
                    slug=data.get("slug", data["id"]),
                    title=data.get("title", data["id"]),
                    subtitle=data.get("subtitle", ""),
                    description=data.get("description", ""),
                    content_type=ContentType.living_book,
                    portal=data.get("portal", "literature"),
                    tags=data.get("tags", []),
                    featured=data.get("featured"),
                    source="living_book",
                    metadata=data.get("metadata", {}),
                )
                self._entries[entry.id] = entry
            except Exception as exc:
                logger.error(f"Failed to load {manifest_path}: {exc}")

    # -----------------------------------------------------------------
    # Index building
    # -----------------------------------------------------------------

    def _build_indices(self) -> None:
        """Rebuild all lookup indices from the entries dict."""
        self._by_slug.clear()
        self._by_portal.clear()
        self._by_type.clear()
        self._featured.clear()

        for entry in self._entries.values():
            self._by_slug[entry.slug] = entry

            self._by_portal.setdefault(entry.portal, []).append(entry)

            self._by_type.setdefault(entry.content_type, []).append(entry)

            if entry.featured is not None:
                self._featured.append(entry)

        self._featured.sort(key=lambda e: e.featured or 999)

    # -----------------------------------------------------------------
    # Queries
    # -----------------------------------------------------------------

    def get(self, entry_id: str) -> CatalogueEntry | None:
        """Get an entry by its ID."""
        return self._entries.get(entry_id)

    def by_slug(self, slug: str) -> CatalogueEntry | None:
        """Get an entry by its slug."""
        return self._by_slug.get(slug)

    def by_portal(self, portal: str) -> list[CatalogueEntry]:
        """Get all entries in a portal (category)."""
        return self._by_portal.get(portal, [])

    def by_type(self, content_type: ContentType) -> list[CatalogueEntry]:
        """Get all entries of a given content type."""
        return self._by_type.get(content_type, [])

    def featured(self, limit: int = 10) -> list[CatalogueEntry]:
        """Get featured entries, ordered by rank."""
        return self._featured[:limit]

    def search(self, query: str) -> list[CatalogueEntry]:
        """Simple text search across title, subtitle, description, and tags."""
        q = query.lower()
        results: list[CatalogueEntry] = []
        for entry in self._entries.values():
            searchable = " ".join([
                entry.title,
                entry.subtitle,
                entry.description,
                " ".join(entry.tags),
                entry.portal,
            ]).lower()
            if q in searchable:
                results.append(entry)
        return results

    def portals(self) -> dict[str, int]:
        """Return a dict of portal names to entry counts."""
        return {portal: len(entries) for portal, entries in self._by_portal.items()}

    def stats(self) -> dict:
        """Return catalogue statistics."""
        return {
            "total_entries": len(self._entries),
            "portals": self.portals(),
            "by_type": {
                ct.value: len(entries) for ct, entries in self._by_type.items()
            },
            "featured_count": len(self._featured),
        }

    def all_entries(self) -> list[CatalogueEntry]:
        """Return all entries as a list."""
        return list(self._entries.values())


# ---------------------------------------------------------------------------
# Singleton
# ---------------------------------------------------------------------------

_catalogue: Catalogue | None = None


def init_catalogue() -> Catalogue:
    """Create, load, and store the singleton catalogue."""
    global _catalogue
    _catalogue = Catalogue()
    _catalogue.load()
    return _catalogue


def get_catalogue() -> Catalogue:
    """Return the singleton catalogue. Raises if not initialized."""
    if _catalogue is None:
        raise RuntimeError("Catalogue not initialized — call init_catalogue() first")
    return _catalogue
