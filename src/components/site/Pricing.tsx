const plans = [
  {
    name: "免费版",
    price: "¥0",
    period: "永久免费",
    desc: "适合尝鲜和轻度刷题",
    features: ["全题库刷题（每日 50 题）", "基础错题本（收藏 100 条）", "基础解析", "每日一练推送"],
    cta: "开始使用",
    featured: false,
  },
  {
    name: "会员版",
    price: "¥29",
    period: "/ 月，年付更优惠",
    desc: "刷题主力，功能全解锁",
    features: [
      "无限刷题 & 无限收藏",
      "AI 深度讲解 · 长难句翻译",
      "错题本词根词缀分析",
      "自定义题库 PDF / Word 上传",
      "涂写画布全功能",
    ],
    cta: "立即开通会员",
    featured: true,
  },
  {
    name: "机构版",
    price: "面议",
    period: "教师 / 培训机构",
    desc: "班级管理与学情分析",
    features: ["多学员账号管理", "自定义题库分发", "学情数据看板", "专属客服支持"],
    cta: "联系我们",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section className="container-hero py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-primary">Pricing</span>
        <h2 className="mt-3 font-display text-5xl text-ink">
          先免费刷起来，<span className="italic">觉得好用</span>再升级
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-3xl border p-8 transition ${
              p.featured
                ? "border-primary/40 bg-primary-soft/50 shadow-float"
                : "border-border bg-card"
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-8 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                最受欢迎
              </span>
            )}
            <div>
              <h3 className="font-display text-2xl text-ink">{p.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">{p.desc}</p>
            </div>
            <div className="mt-8 flex items-baseline gap-2">
              <span className="font-display text-5xl text-ink">{p.price}</span>
              <span className="text-sm text-ink-soft">{p.period}</span>
            </div>
            <ul className="mt-8 flex-1 space-y-3 border-t border-border pt-6">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                      p.featured ? "bg-primary text-primary-foreground" : "bg-muted text-ink-soft"
                    }`}
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition ${
                p.featured
                  ? "bg-ink text-background hover:-translate-y-0.5"
                  : "border border-border bg-background text-ink hover:bg-muted"
              }`}
            >
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
