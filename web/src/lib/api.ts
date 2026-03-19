import type {
  CatalogueEntry,
  CatalogueStats,
  SearchResults,
  SessionState,
  SessionTurnResponse,
  WikiExpedition,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Catalogue
// ---------------------------------------------------------------------------

export async function getCatalogue(): Promise<{
  entries: CatalogueEntry[];
  count: number;
}> {
  return request("/api/catalogue");
}

export async function getCatalogueEntry(id: string): Promise<CatalogueEntry> {
  return request(`/api/catalogue/${encodeURIComponent(id)}`);
}

export async function getFeatured(): Promise<{
  entries: CatalogueEntry[];
  count: number;
}> {
  return request("/api/catalogue/featured");
}

export async function getPortal(portal: string): Promise<{
  portal: string;
  entries: CatalogueEntry[];
  count: number;
}> {
  return request(`/api/catalogue/portal/${encodeURIComponent(portal)}`);
}

export async function getCatalogueStats(): Promise<CatalogueStats> {
  return request("/api/catalogue/stats");
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export async function search(query: string): Promise<SearchResults> {
  return request(`/api/search?q=${encodeURIComponent(query)}`);
}

// ---------------------------------------------------------------------------
// Sessions
// ---------------------------------------------------------------------------

export async function startSession(
  packId: string,
  visitorName?: string,
  metadata?: Record<string, unknown>
): Promise<SessionState> {
  return request("/api/session/start", {
    method: "POST",
    body: JSON.stringify({
      pack_id: packId,
      visitor_name: visitorName,
      metadata,
    }),
  });
}

export async function sendTurn(
  sessionId: string,
  message: string
): Promise<SessionTurnResponse> {
  return request("/api/session/turn", {
    method: "POST",
    body: JSON.stringify({
      session_id: sessionId,
      message,
    }),
  });
}

// ---------------------------------------------------------------------------
// Books
// ---------------------------------------------------------------------------

export async function getBook(bookId: string): Promise<CatalogueEntry> {
  return request(`/api/book/${encodeURIComponent(bookId)}`);
}

export async function queryBook(
  bookId: string,
  question: string,
  sessionId?: string
): Promise<SessionTurnResponse & { session_id: string }> {
  return request(`/api/book/${encodeURIComponent(bookId)}/query`, {
    method: "POST",
    body: JSON.stringify({ question, session_id: sessionId }),
  });
}

// ---------------------------------------------------------------------------
// Wiki
// ---------------------------------------------------------------------------

export async function getWikiEntity(entity: string): Promise<WikiExpedition> {
  return request(`/api/wiki/${encodeURIComponent(entity)}`);
}

export async function startWikiSession(
  entity: string,
  visitorName?: string
): Promise<SessionState> {
  return request(`/api/wiki/${encodeURIComponent(entity)}/start`, {
    method: "POST",
    body: JSON.stringify({ visitor_name: visitorName }),
  });
}
