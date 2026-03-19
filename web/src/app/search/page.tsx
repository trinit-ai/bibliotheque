"use client";

import { useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="editorial-container">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-editorial-text mb-8">
          Search
        </h1>
        <div className="max-w-xl mb-12">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the library..."
            className="w-full px-4 py-3 border border-editorial-border rounded-none font-body text-lg text-editorial-text bg-editorial-bg placeholder:text-editorial-muted focus:outline-none focus:border-editorial-accent"
          />
        </div>
        {query ? (
          <p className="font-body text-editorial-muted">
            Search results for &ldquo;{query}&rdquo; will appear here.
          </p>
        ) : (
          <p className="font-body text-editorial-muted">
            Enter a query to search across living books, expeditions, and the
            full catalogue.
          </p>
        )}
      </div>
    </main>
  );
}
