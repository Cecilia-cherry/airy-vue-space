const features = [
  {
    tag: "01",
    title: "智能错题本",
    desc: "答错的题自动归档为个性化词库，标注顽固错题，按艾宾浩斯曲线推送复习。",
    swatch: "mint",
    points: ["自动收录 · 手动标记 · 反复错题优先", "闪卡 / 拼写 / 听写 / 填空 五种复习"],
  },
  {
    tag: "02",
    title: "AI 深度讲解",
    desc: "不止告诉你答案。原文语境、考点分析、同义替换、词根词缀，一次讲透。",
    swatch: "butter",
    points: ["词义 · 语境 · 考点三段式", "相关词汇一键加入词库"],
  },
  {
    tag: "03",
    title: "涂写草稿纸",
    desc: "内置手写画布，圈画长难句、批注解题思路，答题笔迹永久保留可回看。",
    swatch: "blush",
    points: ["4 色荧光笔 · 钢笔 · 橡皮", "16ms 响应，支持 Apple Pencil"],
  },
  {
    tag: "04",
    title: "自定义题库",
    desc: "PDF、Word、拍照上传自己的真题，AI 自动切题、提取选项与解析。",
    swatch: "sky",
    points: ["OCR + 版面识别", "手动校对半自动界面"],
  },
];

export function Features() {
  return (
    <section className="container-hero py-28">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">
            Core Modules
          </span>
          <h2 className="mt-4 font-display text-5xl leading-tight text-ink">
            不是又一个刷题 App，
            <br />
            是会记住你薄弱项的
            <br />
            <span className="italic text-primary">学习伙伴</span>。
          </h2>
          <p className="mt-6 max-w-sm text-ink-soft">
            从答题到复习闭环，四个核心模块围绕"错题即词库"的理念构建。
          </p>
        </div>

        <div className="col-span-8 grid grid-cols-2 gap-6">
          {features.map((f) => (
            <article
              key={f.tag}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-float"
            >
              <div className="flex items-start justify-between">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl font-display text-lg text-ink"
                  style={{ background: `var(--${f.swatch})` }}
                >
                  {f.tag}
                </span>
                <span className="text-xs text-ink-soft opacity-0 transition-opacity group-hover:opacity-100">
                  了解详情 →
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl text-ink">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
              <ul className="mt-6 space-y-2 border-t border-border pt-5">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink-soft">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
