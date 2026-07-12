const steps = [
  {
    n: "01",
    t: "选择题库开始刷题",
    d: "顺序 / 随机 / 专项 / 模考 / 每日一练，五种模式覆盖每个复习阶段。",
  },
  {
    n: "02",
    t: "答题即时判分",
    d: "计时、标记、草稿纸随时切换，提交后即刻看到答案与考点解析。",
  },
  {
    n: "03",
    t: "错题自动进词库",
    d: "答错的单词连带原文语境、翻译、词典释义一同入库，形成上下文词卡。",
  },
  {
    n: "04",
    t: "艾宾浩斯循环复习",
    d: "系统按遗忘曲线推送闪卡与拼写，把顽固错题变成真正掌握的词汇。",
  },
];

export function Workflow() {
  return (
    <section className="container-hero py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-primary">
          How it works
        </span>
        <h2 className="mt-3 font-display text-5xl leading-tight text-ink">
          从答题到掌握，
          <br />
          只需要一个闭环。
        </h2>
      </div>

      <div className="relative mt-20">
        <div
          className="absolute left-0 right-0 top-8 hidden h-px border-t border-dashed border-border md:block"
          aria-hidden
        />
        <div className="grid grid-cols-4 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background font-display text-xl text-primary">
                {s.n}
              </div>
              <h3 className="mt-6 font-display text-xl text-ink">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
