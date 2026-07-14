import { createFileRoute, Link, useNavigate, useLocation, Outlet } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { banks, categories, type BankCategory } from "@/lib/question-banks";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

const COLORS = [
  { id: "mint", name: "薄荷绿", value: "rgba(167, 243, 208, 0.5)" },
  { id: "sky", name: "天空蓝", value: "rgba(186, 230, 253, 0.5)" },
  { id: "butter", name: "奶油黄", value: "rgba(254, 240, 138, 0.5)" },
  { id: "blush", name: "蜜桃粉", value: "rgba(254, 215, 215, 0.5)" },
];

export const Route = createFileRoute("/question-bank")({
  head: () => ({
    meta: [
      { title: "题库中心 · WordMaster 词海刷题" },
      {
        name: "description",
        content: "高考、中考、考研、托福、雅思词汇题库，覆盖真题与高频考点。",
      },
    ],
  }),
  component: QuestionBankCenter,
});

interface CustomBank {
  id: string;
  name: string;
  desc: string;
  total: number;
  finished: number;
  updated: string;
  color: string;
  questions: unknown[];
}

function QuestionBankCenter() {
  const location = useLocation();
  const [active, setActive] = useState<BankCategory | "all" | "custom">("all");
  const [customName, setCustomName] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);
  const availableTags = ["高频", "熟词僻义", "长难句", "同义替换", "写作高分", "听力场景"];

  const navigate = useNavigate();
  const [customBanks, setCustomBanks] = useState<CustomBank[]>([]);
  const [isNewBankOpen, setIsNewBankOpen] = useState(false);
  const [newBankName, setNewBankName] = useState("");
  const [newBankDesc, setNewBankDesc] = useState("");
  const [newBankColor, setNewBankColor] = useState("mint");

  useEffect(() => {
    const raw = localStorage.getItem("wordmaster_custom_banks");
    if (raw) {
      try {
        setCustomBanks(JSON.parse(raw) as CustomBank[]);
      } catch (e) {
        console.error("Failed to parse custom banks", e);
      }
    }
  }, []);

  const handleCreateBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBankName.trim()) {
      toast.error("请输入题库名称");
      return;
    }
    const newBank = {
      id: `cb-${Date.now()}`,
      name: newBankName.trim(),
      desc: newBankDesc.trim() || "暂无题库描述",
      total: 0,
      finished: 0,
      updated: new Date().toISOString().split("T")[0],
      color: newBankColor,
      questions: [],
    };
    const updated = [newBank, ...customBanks];
    setCustomBanks(updated);
    localStorage.setItem("wordmaster_custom_banks", JSON.stringify(updated));
    setIsNewBankOpen(false);
    setNewBankName("");
    setNewBankDesc("");
    setNewBankColor("mint");
    toast.success(`成功创建题库「${newBank.name}」！`);

    // Navigate to custom questions detail
    navigate({ to: "/custom-questions", search: { bankId: newBank.id } });
  };

  const filtered = useMemo(
    () =>
      active === "all"
        ? banks
        : active === "custom"
          ? []
          : banks.filter((b) => b.category === active),
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

  const isExact = location.pathname === "/question-bank" || location.pathname === "/question-bank/";

  if (!isExact) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 12% 20%, var(--mint) 0%, transparent 42%), radial-gradient(circle at 88% 10%, var(--sky) 0%, transparent 46%), radial-gradient(circle at 60% 90%, var(--butter) 0%, transparent 50%)",
            }}
          />
          <div className="container-hero relative py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1 text-[11px] uppercase tracking-[0.28em] text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Question Bank Center
            </span>
            <h1 className="mt-5 font-display text-5xl text-ink md:text-6xl">题库中心</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
              覆盖高考、中考、考研、托福、雅思的历年真题库，按考试与年份分类整理，随时接续进度。
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="relative">
          <div className="container-hero -mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard label="题库数量" value={`${stats.count}`} suffix="套" tint="mint" />
            <StatCard
              label="题目总数"
              value={stats.total.toLocaleString()}
              suffix="题"
              tint="sky"
            />
            <StatCard
              label="已完成"
              value={stats.finished.toLocaleString()}
              suffix="题"
              tint="butter"
            />
            <StatCard label="整体进度" value={`${stats.progress}%`} suffix="" tint="blush" />
          </div>
        </section>

        {/* Category filter */}
        <section className="container-hero py-14">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <FilterChip active={active === "all"} onClick={() => setActive("all")}>
              全部
            </FilterChip>
            {categories.map((c) => (
              <FilterChip key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
                {c.name}
              </FilterChip>
            ))}
            <FilterChip active={active === "custom"} onClick={() => setActive("custom")}>
              自定义题目
            </FilterChip>
          </div>

          {active === "custom" ? (
            customBanks.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border/80 bg-card/10 p-16 text-center max-w-3xl mx-auto my-6 w-full">
                <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-6">
                  <span className="text-2xl font-bold">+</span>
                </div>
                <h3 className="font-display text-2xl text-ink">你还没有创建自定义题库</h3>
                <p className="mt-2 text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
                  自定义题库允许您自主添加词汇单选题，进行个性化定制刷题。
                </p>
                <button
                  onClick={() => setIsNewBankOpen(true)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-background px-6 py-3.5 text-sm font-semibold hover:bg-ink/90 transition shadow-soft hover:-translate-y-0.5"
                >
                  创建自定义题库
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                <AnimatePresence mode="popLayout">
                  {customBanks.map((b) => (
                    <motion.div
                      key={b.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Link
                        to="/custom-questions"
                        search={{ bankId: b.id }}
                        className="group relative block overflow-hidden rounded-3xl border border-border bg-background p-7 transition hover:-translate-y-1 hover:shadow-soft h-full cursor-pointer"
                      >
                        <div
                          className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-70 transition-transform group-hover:scale-125"
                          style={{ background: `var(--${b.color})` }}
                          aria-hidden
                        />
                        <div className="relative flex flex-col h-full justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-ink-soft">
                              CUSTOM BANK
                            </p>
                            <h3 className="mt-2 font-display text-2xl text-ink">{b.name}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-2">
                              {b.desc}
                            </p>
                          </div>

                          <div className="mt-8">
                            <div>
                              <div className="flex items-center justify-between text-xs text-ink-soft">
                                <span>
                                  {b.finished} / {b.total} 题已做
                                </span>
                                <span>
                                  {b.total > 0 ? Math.round((b.finished / b.total) * 100) : 0}%
                                </span>
                              </div>
                              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-primary"
                                  style={{
                                    width: `${b.total > 0 ? Math.round((b.finished / b.total) * 100) : 0}%`,
                                  }}
                                />
                              </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm">
                              <span className="text-ink-soft">更新 {b.updated}</span>
                              <span className="text-ink font-semibold transition-transform group-hover:translate-x-1 flex items-center gap-1">
                                管理并练习 →
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((b) => (
                  <motion.div
                    key={b.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Link
                      to="/question-bank/$bankId"
                      params={{ bankId: b.id }}
                      preload="intent"
                      className="group relative block overflow-hidden rounded-3xl border border-border bg-background p-7 transition hover:-translate-y-1 hover:shadow-soft h-full"
                    >
                      <div
                        className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-70 transition-transform group-hover:scale-125"
                        style={{ background: `var(--${b.color})` }}
                        aria-hidden
                      />
                      <div className="relative flex flex-col h-full justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-ink-soft">
                            {categories.find((c) => c.id === b.category)?.sub}
                          </p>
                          <h3 className="mt-2 font-display text-2xl text-ink">{b.name}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{b.desc}</p>
                        </div>

                        <div>
                          <div className="mt-6">
                            <div className="flex items-center justify-between text-xs text-ink-soft">
                              <span>
                                {b.finished} / {b.total} 题
                              </span>
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
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
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

      {/* Create Bank Dialog */}
      <AnimatePresence>
        {isNewBankOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewBankOpen(false)}
              className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-background p-8 shadow-2xl z-10"
            >
              <div className="flex flex-col text-left mb-6">
                <h3 className="font-display text-2xl text-ink">创建自定义题库</h3>
                <p className="text-sm text-ink-soft mt-1">设计你自用的生词或高频真题本。</p>
              </div>

              <form onSubmit={handleCreateBank} className="space-y-5">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-2">
                    题库名称 <span className="text-destructive">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="例如：CET-6 核心易错词集"
                    value={newBankName}
                    onChange={(e) => setNewBankName(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-2">
                    题库描述
                  </label>
                  <textarea
                    rows={3}
                    placeholder="简单说明一下这个题库的用途，如：收集近5年真题中遇到的生僻搭配..."
                    value={newBankDesc}
                    onChange={(e) => setNewBankDesc(e.target.value)}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-2">
                    卡片主题色
                  </label>
                  <div className="flex gap-4">
                    {COLORS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setNewBankColor(c.id)}
                        className={`flex-1 py-3 rounded-xl border text-xs font-medium transition-all ${
                          newBankColor === c.id
                            ? "border-ink text-ink font-bold shadow-soft"
                            : "border-border text-ink-soft"
                        }`}
                        style={{ backgroundColor: c.value }}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewBankOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-border text-sm text-ink-soft hover:text-ink hover:bg-muted"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-ink text-background text-sm font-semibold hover:bg-ink/90 transition"
                  >
                    确认创建
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  tint = "mint",
}: {
  label: string;
  value: string;
  suffix: string;
  tint?: "mint" | "sky" | "butter" | "blush";
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-background/90 p-6 shadow-soft backdrop-blur-sm">
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-70"
        aria-hidden
        style={{ background: `var(--${tint})` }}
      />
      <p className="relative text-[11px] uppercase tracking-[0.22em] text-ink-soft">{label}</p>
      <p className="relative mt-3 font-display text-3xl text-ink">
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
      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
        active
          ? "border-primary/30 bg-primary/10 text-primary shadow-sm"
          : "border-border/70 bg-card/60 text-ink-soft hover:border-primary/25 hover:bg-primary/5 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

