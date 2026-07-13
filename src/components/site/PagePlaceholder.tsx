import { Header } from "./Header";
import { Footer } from "./Footer";

export function PagePlaceholder({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-hero py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-ink/10 bg-background px-3 py-1 text-xs tracking-[0.2em] text-ink-soft">
            {eyebrow}
          </span>
          <h1 className="mt-6 font-display text-4xl text-ink md:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{description}</p>
          <p className="mt-8 text-sm text-ink-soft/70">该模块正在建设中，敬请期待。</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
