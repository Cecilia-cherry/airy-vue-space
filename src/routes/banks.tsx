import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const banks = [
  {
    id: "postgrad",
    name: "考研英语",
    sub: "Postgraduate",
    tags: ["英一 2010–2026", "英二 2010–2026", "高频 5500", "熟词僻义"],
    color: "mint",
  },
  {
    id: "toefl",
    name: "托福 TOEFL",
    sub: "TPO 1–75",
    tags: ["词汇题", "学术 3000", "同义替换"],
    color: "sky",
  },
  {
    id: "ielts",
    name: "雅思 IELTS",
    sub: "Cambridge 4–19",
    tags: ["剑雅词汇", "听力场景", "写作高分"],
    color: "butter",
  },
  {
    id: "cet",
    name: "四六级",
    sub: "CET-4 / CET-6",
    tags: ["高频 2500", "考前突击"],
    color: "blush",
  },
];

export const Route = createFileRoute("/banks")({
  component: BanksPage,
});

function BanksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-hero py-24">
        <div className="max-w-2xl">
          <h1 className="font-display text-5xl text-ink">选择你的题库</h1>
          <p className="mt-4 text-ink-soft">
            根据你的考试目标选择对应的真题库。所有题目均配备详细解析。
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {banks.map((b) => (
            <Link
              key={b.id}
              to="/practice"
              search={{ bankId: b.id }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-60 transition-transform group-hover:scale-125"
                style={{ background: `var(--color-${b.color})` }}
              />
              <div className="relative">
                <p className="text-xs uppercase tracking-widest text-ink-soft">{b.sub}</p>
                <h3 className="mt-2 font-display text-3xl text-ink">{b.name}</h3>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs text-ink-soft"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-4 text-sm">
                  <span className="text-ink-soft">开始刷题</span>
                  <span className="text-ink transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
