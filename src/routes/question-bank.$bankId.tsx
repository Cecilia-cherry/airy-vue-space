import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  getBank,
  getQuestions,
  loadFavorites,
  saveFavorites,
} from "@/lib/question-banks";
import { toast } from "sonner";

export const Route = createFileRoute("/question-bank/$bankId")({
  loader: ({ params }) => {
    const bank = getBank(params.bankId);
    if (!bank) throw notFound();
    return { bank, questions: getQuestions(params.bankId) };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.bank.name} · 题库 · WordMaster`
          : "题库 · WordMaster",
      },
      {
        name: "description",
        content: loaderData?.bank.desc ?? "英语词汇刷题题库",
      },
    ],
  }),
  notFoundComponent: BankNotFound,
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-hero py-24 text-center">
        <h1 className="font-display text-3xl text-ink">题库加载失败</h1>
        <p className="mt-3 text-sm text-ink-soft">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 rounded-full border border-ink/15 px-5 py-2 text-sm"
        >
          重试
        </button>
      </main>
      <Footer />
    </div>
  ),
  component: BankDetail,
});

const PAGE_SIZE = 8;

function BankDetail() {
  const { bank, questions } = Route.useLoaderData() as {
    bank: NonNullable<ReturnType<typeof getBank>>;
    questions: ReturnType<typeof getQuestions>;
  };
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [onlyFav, setOnlyFav] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState<Record<string, string>>({});

  useEffect(() => setFavorites(loadFavorites()), []);
  useEffect(() => setPage(1), [query, onlyFav]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return questions.filter((it) => {
      if (onlyFav && !favorites.has(it.id)) return false;
      if (!q) return true;
      return (
        it.word.toLowerCase().includes(q) ||
        it.stem.toLowerCase().includes(q) ||
        it.tag.toLowerCase().includes(q)
      );
    });
  }, [questions, query, onlyFav, favorites]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("已取消收藏");
      } else {
        next.add(id);
        toast.success("已加入收藏");
      }
      saveFavorites(next);
      return next;
    });
  };

  const choose = (qid: string, key: string) => {
    setRevealed((prev) => ({ ...prev, [qid]: key }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-hero py-14">
        {/* Breadcrumb + header */}
        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <Link to="/question-bank" className="hover:text-ink">题库中心</Link>
          <span>/</span>
          <span className="text-ink">{bank.name}</span>
        </div>

        <div className="mt-6 flex flex-col gap-6 rounded-3xl border border-border bg-card/40 p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-primary">
              {bank.id.toUpperCase()}
            </span>
            <h1 className="mt-2 font-display text-4xl text-ink">{bank.name}</h1>
            <p className="mt-2 text-sm text-ink-soft">{bank.desc}</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-ink-soft">
            <div>
              <div className="text-xs uppercase tracking-widest">总题量</div>
              <div className="mt-1 font-display text-2xl text-ink">{bank.total}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest">已收藏</div>
              <div className="mt-1 font-display text-2xl text-ink">{favorites.size}</div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索单词、题干或分组..."
              className="w-full rounded-full border border-border bg-background px-5 py-3 pr-10 text-sm outline-none focus:border-primary"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft">⌕</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOnlyFav((v) => !v)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                onlyFav
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card text-ink-soft hover:text-ink"
              }`}
            >
              ★ 只看收藏 ({favorites.size})
            </button>
            <span className="text-sm text-ink-soft">
              共 {filtered.length} 题
            </span>
          </div>
        </div>

        {/* Questions */}
        <div className="mt-8 space-y-4">
          {current.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-ink-soft">
              没有匹配的题目
            </div>
          )}
          {current.map((q, idx) => {
            const isFav = favorites.has(q.id);
            const picked = revealed[q.id];
            return (
              <article
                key={q.id}
                className="rounded-2xl border border-border bg-background p-6 shadow-soft"
              >
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink-soft">
                      第 {(page - 1) * PAGE_SIZE + idx + 1} 题 · {q.tag}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-ink">
                      {q.word}
                      <span className="ml-2 text-sm text-ink-soft">{q.phonetic}</span>
                    </h3>
                  </div>
                  <button
                    onClick={() => toggleFav(q.id)}
                    aria-label={isFav ? "取消收藏" : "收藏"}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
                      isFav
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-ink-soft hover:text-ink"
                    }`}
                  >
                    {isFav ? "★" : "☆"}
                  </button>
                </header>

                <p className="mt-4 text-sm leading-relaxed text-ink">{q.stem}</p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {q.options.map((opt) => {
                    const isPicked = picked === opt.key;
                    const isRight = q.answer === opt.key;
                    const state =
                      picked === undefined
                        ? "idle"
                        : isRight
                          ? "right"
                          : isPicked
                            ? "wrong"
                            : "muted";
                    return (
                      <button
                        key={opt.key}
                        onClick={() => choose(q.id, opt.key)}
                        disabled={picked !== undefined}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                          state === "right"
                            ? "border-primary bg-primary/10 text-ink"
                            : state === "wrong"
                              ? "border-accent bg-accent/10 text-ink"
                              : state === "muted"
                                ? "border-border bg-card text-ink-soft"
                                : "border-border bg-card text-ink hover:border-primary"
                        }`}
                      >
                        <span className="font-display text-base">{opt.key}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {picked !== undefined && (
                  <div className="mt-4 rounded-xl bg-muted/60 px-4 py-3 text-sm text-ink-soft">
                    {q.explain}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <PageBtn disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              上一页
            </PageBtn>
            {buildPages(page, totalPages).map((p, i) =>
              p === "…" ? (
                <span key={i} className="px-2 text-sm text-ink-soft">…</span>
              ) : (
                <button
                  key={i}
                  onClick={() => setPage(p as number)}
                  className={`h-9 min-w-9 rounded-full px-3 text-sm ${
                    page === p
                      ? "bg-ink text-background"
                      : "border border-border text-ink-soft hover:text-ink"
                  }`}
                >
                  {p}
                </button>
              ),
            )}
            <PageBtn
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              下一页
            </PageBtn>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function PageBtn({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-border px-4 py-2 text-sm text-ink-soft disabled:opacity-40 enabled:hover:text-ink"
    >
      {children}
    </button>
  );
}

function buildPages(page: number, total: number): (number | "…")[] {
  const pages: (number | "…")[] = [];
  const push = (v: number | "…") => pages.push(v);
  const add = new Set<number>([1, total, page - 1, page, page + 1]);
  const sorted = [...add].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  let prev = 0;
  for (const n of sorted) {
    if (n - prev > 1) push("…");
    push(n);
    prev = n;
  }
  return pages;
}

function BankNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-hero py-24 text-center">
        <h1 className="font-display text-4xl text-ink">题库不存在</h1>
        <p className="mt-3 text-sm text-ink-soft">该题库可能已下线或链接有误。</p>
        <Link
          to="/question-bank"
          className="mt-6 inline-flex rounded-full border border-ink/15 px-5 py-2 text-sm"
        >
          返回题库中心
        </Link>
      </main>
      <Footer />
    </div>
  );
}
