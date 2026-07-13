import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { banks, categories, type BankCategory } from "@/lib/question-banks";
import { toast } from "sonner";

export const Route = createFileRoute("/question-bank")({
  head: () => ({
    meta: [
      { title: "题库中心 · WordMaster 词海刷题" },
      { name: "description", content: "高考、中考、考研、托福、雅思词汇题库，覆盖真题与高频考点。" },
    ],
  }),
  component: QuestionBankCenter,
});

function QuestionBankCenter() {
  const [active, setActive] = useState<BankCategory | "all">("all");
  const [customName, setCustomName] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);
  const availableTags = ["高频", "熟词僻义", "长难句", "同义替换", "写作高分", "听力场景"];

  const filtered = useMemo(
    () => (active === "all" ? banks : banks.filter((b) => b.category === active)),
    [active],
  );

  const stats = useMemo(() => {
    const total = banks.reduce((s, b) => s + b.total, 0);
    const finished = banks.reduce((s, b) => s + b.finished, 0);
    return {
      total,
      finished,
      count: banks.length,
      progress: Math.round((finished / total) * 100),
    };
  }, []);

  const toggleTag = (t: string) =>
    setCustomTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const createCustom = () => {
    if (!customName.trim()) return toast.error("请填写自定义题库名称");
    if (customTags.length === 0) return toast.error("至少选择一个标签");
    toast.success(`已创建「${customName}」，包含 ${customTags.length} 个标签`);
    setCustomName("");
    setCustomTags([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="container-hero py-16">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">Question Bank Center</span>
          <h1 className="mt-3 font-display text-5xl text-ink md:text-6xl">题库中心</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            覆盖主流英语考试的题库，按分类快速定位，实时查看学习进度。
          </p>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-card/40">
          <div className="container-hero grid grid-cols-4 gap-6 py-10">
            <StatCard label="题库数量" value={`${stats.count}`} suffix="套" />
            <StatCard label="题目总数" value={stats.total.toLocaleString()} suffix="题" />
            <StatCard label="已完成" value={stats.finished.toLocaleString()} suffix="题" />
            <StatCard label="整体进度" value={`${stats.progress}%`} suffix="" />
          </div>
        </section>

        {/* Category filter */}
        <section className="container-hero py-14">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <FilterChip active={active === "all"} onClick={() => setActive("all")}>
              全部
            </FilterChip>
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                active={active === c.id}
                onClick={() => setActive(c.id)}
              >
                {c.name}
              </FilterChip>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-3 gap-6">
            {filtered.map((b) => (
              <Link
                key={b.id}
                to="/question-bank/$bankId"
                params={{ bankId: b.id }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-background p-7 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-70 transition-transform group-hover:scale-125"
                  style={{ background: `var(--${b.color})` }}
                  aria-hidden
                />
                <div className="relative">
                  <p className="text-xs uppercase tracking-widest text-ink-soft">
                    {categories.find((c) => c.id === b.category)?.sub}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-ink">{b.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{b.desc}</p>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs text-ink-soft">
                      <span>{b.finished} / {b.total} 题</span>
                      <span>{Math.round((b.finished / b.total) * 100)}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.round((b.finished / b.total) * 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                    <span className="text-ink-soft">更新 {b.updated}</span>
                    <span className="text-ink transition-transform group-hover:translate-x-1">
                      进入 →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Custom bank */}
        <section className="border-t border-border bg-card/40">
          <div className="container-hero grid grid-cols-[1fr_1.2fr] gap-16 py-20">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-primary">Custom Bank</span>
              <h2 className="mt-3 font-display text-4xl text-ink">自定义题库</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                根据你的目标考试、薄弱标签、错题组合，一键生成专属题库；系统会持续注入新题保持难度。
              </p>
              <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                <li>· 支持按考试、难度、词根词缀混合筛选</li>
                <li>· 与错题本双向同步，错误自动补题</li>
                <li>· 每周自动生成学习报告</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-border bg-background p-8 shadow-soft">
              <label className="text-xs uppercase tracking-widest text-ink-soft">题库名称</label>
              <input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="例如：考前 30 天冲刺"
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
              />

              <p className="mt-6 text-xs uppercase tracking-widest text-ink-soft">选择标签</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      customTags.includes(t)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-ink-soft hover:text-ink"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <button
                onClick={createCustom}
                className="mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                创建自定义题库
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <p className="text-xs uppercase tracking-widest text-ink-soft">{label}</p>
      <p className="mt-3 font-display text-3xl text-ink">
        {value}
        <span className="ml-1 text-sm text-ink-soft">{suffix}</span>
      </p>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm transition-colors ${
        active
          ? "border-ink bg-ink text-background"
          : "border-border bg-card text-ink-soft hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
