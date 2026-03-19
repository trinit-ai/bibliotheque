interface BookPageProps {
  params: { book_id: string };
}

export default function BookPage({ params }: BookPageProps) {
  const bookId = params.book_id;
  const displayName = bookId
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      data-mode="session"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <div className="text-center max-w-2xl">
        <p
          className="font-mono text-xs tracking-widest uppercase mb-4"
          style={{ color: "var(--color-muted)" }}
        >
          Living Book
        </p>
        <h1 className="font-display text-5xl font-semibold tracking-tight mb-4">
          {displayName}
        </h1>
        <p
          className="font-body text-lg mb-8"
          style={{ color: "var(--color-muted)" }}
        >
          A living conversation with {displayName}.
        </p>
        <div
          className="w-16 h-px mx-auto mb-8"
          style={{ backgroundColor: "var(--color-border)" }}
        />
        <p
          className="font-mono text-sm tracking-wide uppercase"
          style={{ color: "var(--color-muted)" }}
        >
          Coming soon
        </p>
      </div>
    </main>
  );
}
