const banks = [
  {
    name: "考研英语",
    sub: "Postgraduate",
    tags: ["英一 2010–2026", "英二 2010–2026", "高频 5500", "熟词僻义"],
    color: "mint",
  },
  {
    name: "托福 TOEFL",
    sub: "TPO 1–75",
    tags: ["词汇题", "学术 3000", "同义替换"],
    color: "sky",
  },
  {
    name: "雅思 IELTS",
    sub: "Cambridge 4–19",
    tags: ["剑雅词汇", "听力场景", "写作高分"],
    color: "butter",
  },
  {
    name: "四六级",
    sub: "CET-4 / CET-6",
    tags: ["高频 2500", "考前突击"],
    color: "blush",
  },
];

export function QuestionBanks() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="container-hero py-24">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-primary">Question Banks</span>
            <h2 className="mt-3 font-display text-5xl text-ink">六大题库，一次订阅</h2>
          </div>
          <p className="max-w-sm text-sm text-ink-soft">
            所有题目均来自公开真题，配套人工审校的解析与词根词缀说明。
          </p>
        </div>

        <div className="mt-14 grid grid-cols-4 gap-6">
          {banks.map((b) => (
            <div
              key={b.name}
              className="group relative overflow-hidden rounded-3xl border border-border bg-background p-7 transition hover:-translate-y-1"
            >
              <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-70 transition-transform group-hover:scale-125"
                style={{ background: `var(--${b.color})` }}
                aria-hidden
              />
              <div className="relative">
                <p className="text-xs uppercase tracking-widest text-ink-soft">{b.sub}</p>
                <h3 className="mt-2 font-display text-3xl text-ink">{b.name}</h3>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border bg-card px-3 py-1 text-xs text-ink-soft"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-4 text-sm">
                  <span className="text-ink-soft">进入题库</span>
                  <span className="text-ink transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
