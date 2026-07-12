export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grain-bg opacity-60" aria-hidden />
      <div className="container-hero relative grid grid-cols-12 gap-8 pb-28 pt-24">
        <div className="col-span-7 flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs tracking-wide text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            v2.0 · 面向考研 / 托福 / 雅思 / 四六级
          </span>

          <h1 className="mt-7 font-display text-[76px] leading-[1.02] tracking-tight text-ink">
            刷题即积累，
            <br />
            错题就是你的
            <span className="relative mx-2 inline-block">
              <span className="relative z-10 italic text-primary">专属词库</span>
              <span
                className="absolute bottom-1.5 left-0 z-0 h-4 w-full rounded-full bg-butter"
                aria-hidden
              />
            </span>
            。
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            WordMaster 把每一次答题都变成词汇积累。答错自动收录、艾宾浩斯智能复习、
            AI 深度讲解，让考研英语、TPO、剑雅真题里的每个生词，都真正留在脑子里。
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-float transition-transform hover:-translate-y-0.5">
              免费开始今日一练
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm text-ink transition-colors hover:bg-muted">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-accent">
                ▶
              </span>
              看看错题本长什么样
            </button>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-8">
            {[
              { k: "12,580+", v: "真题词汇" },
              { k: "98%", v: "复习记忆率" },
              { k: "6 大", v: "考试题库" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-3xl text-ink">{s.k}</dt>
                <dd className="mt-1 text-sm text-ink-soft">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="col-span-5 relative">
          <PracticeCard />
        </div>
      </div>
    </section>
  );
}

function PracticeCard() {
  return (
    <div className="relative">
      {/* Back card - mistake collection */}
      <div className="absolute -left-6 top-14 w-72 rotate-[-4deg] rounded-2xl border border-border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between text-xs text-ink-soft">
          <span>📒 今日待复习</span>
          <span>12</span>
        </div>
        <div className="mt-4 space-y-3">
          {[
            { w: "abundant", m: "plentiful · 形容词", c: "mint" },
            { w: "scarce", m: "insufficient · 反义", c: "blush" },
            { w: "ambiguous", m: "unclear · 高频", c: "butter" },
          ].map((r) => (
            <div key={r.w} className="flex items-center justify-between">
              <div>
                <div className="font-display text-base text-ink">{r.w}</div>
                <div className="text-xs text-ink-soft">{r.m}</div>
              </div>
              <span
                className="h-6 w-6 rounded-full border border-border"
                style={{ background: `var(--${r.c})` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Front card - question */}
      <div className="relative ml-16 rounded-3xl border border-border bg-card p-7 shadow-float">
        <div className="flex items-center justify-between text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            题目 12 / 50
          </span>
          <span className="tabular-nums">⏱ 02:34</span>
        </div>

        <div className="mt-5 rounded-2xl bg-muted/70 p-5">
          <p className="text-[13px] uppercase tracking-wider text-ink-soft">
            TOEFL · TPO 75 · Reading
          </p>
          <p className="mt-3 leading-relaxed text-ink">
            The word{" "}
            <span className="relative inline-block">
              <span className="relative z-10 font-medium">"abundant"</span>
              <span
                className="absolute inset-x-0 bottom-0.5 z-0 h-2.5 rounded-sm bg-butter"
                aria-hidden
              />
            </span>{" "}
            in the passage is closest in meaning to
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { k: "A", t: "plentiful", correct: true },
            { k: "B", t: "scarce" },
            { k: "C", t: "ordinary" },
            { k: "D", t: "expensive" },
          ].map((o) => (
            <div
              key={o.k}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                o.correct
                  ? "border-primary/50 bg-primary-soft text-ink"
                  : "border-border bg-card text-ink-soft"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                  o.correct
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-ink-soft"
                }`}
              >
                {o.k}
              </span>
              {o.t}
              {o.correct && <span className="ml-auto text-primary">✓</span>}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
          <button className="text-sm text-ink-soft hover:text-ink">← 上一题</button>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-accent-foreground">
            🏷 加入错题本
          </button>
          <button className="text-sm text-ink hover:text-primary">下一题 →</button>
        </div>
      </div>
    </div>
  );
}
