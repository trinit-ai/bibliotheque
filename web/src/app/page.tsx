export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <h1 className="font-display text-6xl font-semibold tracking-tight text-editorial-text mb-4">
          Biblioth&egrave;que
        </h1>
        <p className="font-body text-xl text-editorial-muted mb-8">
          The living library. Read by asking.
        </p>
        <div className="w-16 h-px bg-editorial-border mx-auto mb-8" />
        <p className="font-mono text-sm text-editorial-muted tracking-wide uppercase">
          Coming soon
        </p>
      </div>
    </main>
  );
}
