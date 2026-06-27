export default function Home() {
  return (
    <main className="bg-spruce text-paper relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative z-10">
        <p className="text-mint-bright font-mono text-xs tracking-[0.2em] uppercase">
          Independent AI for cannabis retail
        </p>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold sm:text-6xl">
          Golem <span className="text-gradient-mint">Intelligence</span>
        </h1>
        <p className="text-mint/70 mx-auto mt-5 max-w-md text-base">
          Scaffolding ready. The full experience is being crafted.
        </p>
      </div>
    </main>
  );
}
