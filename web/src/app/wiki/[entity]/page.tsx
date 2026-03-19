interface WikiPageProps {
  params: { entity: string };
}

export default function WikiPage({ params }: WikiPageProps) {
  const entity = decodeURIComponent(params.entity);
  const displayName = entity
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <p className="font-mono text-xs text-editorial-muted tracking-widest uppercase mb-4">
          Expedition
        </p>
        <h1 className="font-display text-5xl font-semibold tracking-tight text-editorial-text mb-4">
          {displayName}
        </h1>
        <p className="font-body text-lg text-editorial-muted mb-8">
          A guided exploration through {displayName.toLowerCase()}.
        </p>
        <div className="w-16 h-px bg-editorial-border mx-auto mb-8" />
        <p className="font-mono text-sm text-editorial-muted tracking-wide uppercase">
          Coming soon
        </p>
      </div>
    </main>
  );
}
