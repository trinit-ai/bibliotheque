export enum ContentType {
  LivingBook = "living_book",
  Expedition = "expedition",
  Pack = "pack",
  Oracle = "oracle",
  Game = "game",
  Form = "form",
  News = "news",
}

export interface CatalogueEntry {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  content_type: ContentType;
  portal: string;
  tags: string[];
  featured: number | null;
  cover_image: string | null;
  pack_id: string | null;
  source: string;
  metadata: Record<string, unknown>;
}

export interface SessionState {
  session_id: string;
  pack_id: string;
  greeting: string;
  turn_count: number;
  metadata: Record<string, unknown>;
}

export interface SessionTurnResponse {
  response: string;
  session_id: string;
  turn_count: number;
  actions?: SessionAction[];
}

export interface SessionAction {
  type: "datarail" | "navigate" | "site" | "external";
  label: string;
  target: string;
}

export interface WikiExpedition {
  entity: string;
  found: boolean;
  entry: CatalogueEntry | null;
  session_type: string;
}

export interface CatalogueStats {
  total_entries: number;
  portals: Record<string, number>;
  by_type: Record<string, number>;
  featured_count: number;
}

export interface SearchResults {
  query: string;
  results: CatalogueEntry[];
  count: number;
}

export interface AuthUser {
  id: string;
  email: string;
  display_name: string;
  created_at: string | null;
}
