import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Trash2,
  BookOpen,
  ChevronLeft,
  ArrowRight,
  Check,
  X,
  Sparkles,
  Play,
  FileText,
  Search,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { loadFavorites, saveFavorites } from "@/lib/question-banks";

export interface CustomQuestion {
  id: string;
  word: string;
  phonetic: string;
  stem: string;
  options: { key: string; text: string }[];
  answer: string;
  explain: string;
  tag: string;
}

export interface CustomBank {
  id: string;
  name: string;
  desc: string;
  total: number;
  finished: number;
  updated: string;
  color: string; // e.g. "mint", "sky", "butter", "blush"
  questions: CustomQuestion[];
}

const COLORS = [
  { id: "mint", name: "薄荷绿", value: "rgba(167, 243, 208, 0.5)" },
  { id: "sky", name: "天空蓝", value: "rgba(186, 230, 253, 0.5)" },
  { id: "butter", name: "奶油黄", value: "rgba(254, 240, 138, 0.5)" },
  { id: "blush", name: "蜜桃粉", value: "rgba(254, 215, 215, 0.5)" },
];

export const Route = createFileRoute("/custom-questions")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      bankId: (search.bankId as string) || undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "自定义题目 · WordMaster 词海刷题" },
      { name: "description", content: "创建并管理你自己的专属英语单词题库。" },
    ],
  }),
  component: CustomQuestionsPage,
});

function CustomQuestionsPage() {
  const [banks, setBanks] = useState<CustomBank[]>([]);
  const [activeBankId, setActiveBankId] = useState<string | null>(null);

  // Dialog States
  const [isNewBankOpen, setIsNewBankOpen] = useState(false);
  const [isNewQuestionOpen, setIsNewQuestionOpen] = useState(false);

  // New Bank Form States
  const [newBankName, setNewBankName] = useState("");
  const [newBankDesc, setNewBankDesc] = useState("");
  const [newBankColor, setNewBankColor] = useState("mint");

  // New Question Form States
  const [qWord, setQWord] = useState("");
  const [qPhonetic, setQPhonetic] = useState("");
  const [qStem, setQStem] = useState("");
  const [qOptA, setQOptA] = useState("");
  const [qOptB, setQOptB] = useState("");
  const [qOptC, setQOptC] = useState("");
  const [qOptD, setQOptD] = useState("");
  const [qAnswer, setQAnswer] = useState("A");
  const [qExplain, setQExplain] = useState("");
  const [qTag, setQTag] = useState("第一组");

  // Interactive Answering States
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, string>>({});

  // Practice session states
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceSelected, setPracticeSelected] = useState<string | null>(null);
  const [practiceAnswered, setPracticeAnswered] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);

  const { bankId } = Route.useSearch();

  // Load Banks from LocalStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("wordmaster_custom_banks");
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CustomBank[];
        setBanks(parsed);
        if (bankId && parsed.some((b) => b.id === bankId)) {
          setActiveBankId(bankId);
        }
      } catch (e) {
        console.error("Failed to parse custom banks", e);
      }
    }
  }, [bankId]);

  // Save Banks helper
  const saveBanks = (updatedBanks: CustomBank[]) => {
    setBanks(updatedBanks);
    localStorage.setItem("wordmaster_custom_banks", JSON.stringify(updatedBanks));
  };

  const activeBank = useMemo(() => {
    return banks.find((b) => b.id === activeBankId) || null;
  }, [banks, activeBankId]);

  // Search, pagination and favorites states
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [onlyFav, setOnlyFav] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load favorites on mount
  useEffect(() => {
    setFavorites(loadFavorites());
  }, []);

  // Reset page when query or onlyFav changes
  useEffect(() => {
    setPage(1);
  }, [query, onlyFav]);

  // Favorite toggle handler
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

  const filteredQuestions = useMemo(() => {
    if (!activeBank) return [];
    const q = query.trim().toLowerCase();
    return activeBank.questions.filter((it) => {
      if (onlyFav && !favorites.has(it.id)) return false;
      if (!q) return true;
      return (
        it.word.toLowerCase().includes(q) ||
        it.stem.toLowerCase().includes(q) ||
        it.tag.toLowerCase().includes(q)
      );
    });
  }, [activeBank, query, onlyFav, favorites]);

  const PAGE_SIZE = 6;
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const currentQuestions = useMemo(() => {
    return filteredQuestions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  }, [filteredQuestions, page]);

  // Create Bank Handler
  const handleCreateBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBankName.trim()) {
      toast.error("请输入题库名称");
      return;
    }
    const newBank: CustomBank = {
      id: `cb-${Date.now()}`,
      name: newBankName.trim(),
      desc: newBankDesc.trim() || "暂无题库描述",
      total: 0,
      finished: 0,
      updated: new Date().toISOString().split("T")[0],
      color: newBankColor,
      questions: [],
    };
    const updated = [newBank, ...banks];
    saveBanks(updated);
    setIsNewBankOpen(false);
    setNewBankName("");
    setNewBankDesc("");
    setNewBankColor("mint");
    toast.success(`成功创建题库「${newBank.name}」！`);
    setActiveBankId(newBank.id);
  };

  // Delete Bank Handler
  const handleDeleteBank = (bankId: string, name: string) => {
    if (confirm(`确定要删除题库「${name}」及其包含的所有题目吗？此操作无法撤销。`)) {
      const updated = banks.filter((b) => b.id !== bankId);
      saveBanks(updated);
      if (activeBankId === bankId) {
        setActiveBankId(null);
        setIsPracticeMode(false);
      }
      toast.success("题库已成功删除");
    }
  };

  // Create Question Handler
  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBankId || !activeBank) return;
    if (!qWord.trim()) {
      toast.error("请输入考查单词/短语");
      return;
    }
    if (!qStem.trim()) {
      toast.error("请输入题干或例句");
      return;
    }
    if (!qOptA.trim() || !qOptB.trim() || !qOptC.trim() || !qOptD.trim()) {
      toast.error("请完整填写 A、B、C、D 四个选项");
      return;
    }

    const newQuestion: CustomQuestion = {
      id: `cq-${Date.now()}`,
      word: qWord.trim(),
      phonetic: qPhonetic.trim()
        ? `[${qPhonetic.trim().replace(/\[/g, "").replace(/\]/g, "")}]`
        : "",
      stem: qStem.trim(),
      options: [
        { key: "A", text: qOptA.trim() },
        { key: "B", text: qOptB.trim() },
        { key: "C", text: qOptC.trim() },
        { key: "D", text: qOptD.trim() },
      ],
      answer: qAnswer,
      explain: qExplain.trim() || "正确答案是 " + qAnswer + "。恭喜掌握！",
      tag: qTag.trim() || "自定义",
    };

    const updatedBanks = banks.map((b) => {
      if (b.id === activeBankId) {
        const updatedQuestions = [...b.questions, newQuestion];
        return {
          ...b,
          total: updatedQuestions.length,
          updated: new Date().toISOString().split("T")[0],
          questions: updatedQuestions,
        };
      }
      return b;
    });

    saveBanks(updatedBanks);
    setIsNewQuestionOpen(false);

    // Reset Form
    setQWord("");
    setQPhonetic("");
    setQStem("");
    setQOptA("");
    setQOptB("");
    setQOptC("");
    setQOptD("");
    setQAnswer("A");
    setQExplain("");
    setQTag("第一组");

    toast.success("题目已成功添加到当前题库！");
  };

  // Delete Question Handler
  const handleDeleteQuestion = (qId: string) => {
    if (!activeBankId || !activeBank) return;
    if (confirm("确定要删除这道题吗？")) {
      const updatedBanks = banks.map((b) => {
        if (b.id === activeBankId) {
          const updatedQuestions = b.questions.filter((q) => q.id !== qId);
          return {
            ...b,
            total: updatedQuestions.length,
            questions: updatedQuestions,
          };
        }
        return b;
      });
      saveBanks(updatedBanks);
      toast.success("题目已成功删除");
    }
  };

  // Single Question Pick
  const handlePickAnswer = (qId: string, key: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [qId]: key }));
  };

  // Practice Modes Handlers
  const startPractice = () => {
    if (!activeBank || activeBank.questions.length === 0) {
      toast.error("当前题库暂无题目，请先添加题目！");
      return;
    }
    setPracticeIndex(0);
    setPracticeSelected(null);
    setPracticeAnswered(false);
    setPracticeScore(0);
    setIsPracticeMode(true);
  };

  const handlePracticeSelect = (key: string) => {
    if (practiceAnswered) return;
    setPracticeSelected(key);
  };

  const submitPracticeAnswer = () => {
    if (!practiceSelected || !activeBank) return;
    const currentQ = activeBank.questions[practiceIndex];
    const isCorrect = practiceSelected === currentQ.answer;

    setPracticeAnswered(true);
    if (isCorrect) {
      setPracticeScore((prev) => prev + 1);
      toast.success("回答正确！");
    } else {
      toast.error(`回答错误，正确答案是 ${currentQ.answer}`);
    }

    // Update finished count in bank
    const updatedBanks = banks.map((b) => {
      if (b.id === activeBank.id) {
        return {
          ...b,
          finished: Math.min(b.total, b.finished + 1),
        };
      }
      return b;
    });
    saveBanks(updatedBanks);
  };

  const nextPracticeQuestion = () => {
    if (!activeBank) return;
    if (practiceIndex < activeBank.questions.length - 1) {
      setPracticeIndex((prev) => prev + 1);
      setPracticeSelected(null);
      setPracticeAnswered(false);
    } else {
      // Finished all
      toast.success(`恭喜完成练习！得分: ${practiceScore}/${activeBank.questions.length}`, {
        icon: "🎉",
      });
      setIsPracticeMode(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="container-hero py-14 flex-grow">
        {/* Detail view of a bank */}
        {activeBankId && activeBank ? (
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-ink-soft mb-6">
              <button
                onClick={() => {
                  setActiveBankId(null);
                  setIsPracticeMode(false);
                }}
                className="hover:text-ink flex items-center gap-1 transition"
              >
                <ChevronLeft className="h-4 w-4" /> 自定义题库列表
              </button>
              <span>/</span>
              <span className="text-ink">{activeBank.name}</span>
            </div>

            {/* Practice Mode */}
            {isPracticeMode ? (
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-2xl text-ink">正在练习：{activeBank.name}</h2>
                  <button
                    onClick={() => setIsPracticeMode(false)}
                    className="text-sm text-ink-soft hover:text-ink"
                  >
                    退出练习
                  </button>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden mb-8">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{
                      width: `${((practiceIndex + 1) / activeBank.questions.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="text-xs uppercase tracking-widest text-ink-soft mb-2">
                  第 {practiceIndex + 1} / {activeBank.questions.length} 题
                </div>

                <div className="rounded-3xl border border-border bg-background p-8 shadow-soft">
                  <h3 className="font-display text-3xl text-ink mb-2">
                    {activeBank.questions[practiceIndex].word}
                    {activeBank.questions[practiceIndex].phonetic && (
                      <span className="ml-2 text-base font-normal text-ink-soft">
                        {activeBank.questions[practiceIndex].phonetic}
                      </span>
                    )}
                  </h3>

                  <p className="text-base text-ink leading-relaxed mb-8 mt-4 bg-muted/35 p-4 rounded-2xl">
                    {activeBank.questions[practiceIndex].stem}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {activeBank.questions[practiceIndex].options.map((opt) => {
                      const isSelected = practiceSelected === opt.key;
                      const isCorrect = activeBank.questions[practiceIndex].answer === opt.key;

                      let btnStyle = "border-border hover:bg-muted/40";
                      if (isSelected && !practiceAnswered) {
                        btnStyle = "border-primary bg-primary/5 text-primary-foreground";
                      } else if (practiceAnswered) {
                        if (isCorrect) {
                          btnStyle = "border-primary bg-primary/10 text-ink";
                        } else if (isSelected) {
                          btnStyle = "border-destructive bg-destructive/5 text-destructive";
                        } else {
                          btnStyle = "border-border opacity-50";
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          onClick={() => handlePracticeSelect(opt.key)}
                          disabled={practiceAnswered}
                          className={`flex items-center gap-3 rounded-2xl border px-5 py-4 text-left text-sm transition-all ${btnStyle}`}
                        >
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-xs font-semibold ${
                              isSelected
                                ? "border-primary bg-primary text-background"
                                : "border-border text-ink-soft"
                            }`}
                          >
                            {opt.key}
                          </span>
                          <span className="text-ink">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {practiceAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-6 rounded-2xl border border-border bg-muted/20"
                      >
                        <h4 className="font-display font-semibold text-ink flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-accent" />
                          解析与说明
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          {activeBank.questions[practiceIndex].explain}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-8 pt-6 border-t border-border flex justify-end">
                    {!practiceAnswered ? (
                      <button
                        onClick={submitPracticeAnswer}
                        disabled={!practiceSelected}
                        className="inline-flex items-center gap-2 bg-ink text-background px-6 py-3 rounded-full text-sm font-semibold hover:bg-ink/90 transition disabled:opacity-40"
                      >
                        确认答案 <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={nextPracticeQuestion}
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-primary/90 transition"
                      >
                        {practiceIndex === activeBank.questions.length - 1 ? "完成练习" : "下一题"}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* Bank Banner */}
                <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card/40 p-8 md:flex-row md:items-end md:justify-between mb-8">
                  <div>
                    <span className="text-xs uppercase tracking-[0.25em] text-primary">
                      CUSTOM QUESTION BANK
                    </span>
                    <h1 className="mt-2 font-display text-4xl text-ink">{activeBank.name}</h1>
                    <p className="mt-2 text-sm text-ink-soft">{activeBank.desc}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={startPractice}
                      disabled={activeBank.questions.length === 0}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
                    >
                      <Play className="h-4 w-4" /> 开始刷题 ({activeBank.questions.length})
                    </button>
                    <button
                      onClick={() => setIsNewQuestionOpen(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-background transition hover:bg-ink/90"
                    >
                      <Plus className="h-4 w-4" /> 添加题目
                    </button>
                    <button
                      onClick={() => handleDeleteBank(activeBank.id, activeBank.name)}
                      className="inline-flex items-center gap-2 rounded-full border border-destructive/20 hover:bg-destructive/5 text-destructive px-5 py-3 text-sm font-semibold transition"
                    >
                      <Trash2 className="h-4 w-4" /> 删除题库
                    </button>
                  </div>
                </div>

                {/* Search, Filter Toolbar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 bg-card/20 p-4 rounded-2xl border border-border/60">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/60" />
                    <input
                      type="text"
                      placeholder="搜索自定义题目、选项、释义或标签..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setOnlyFav((f) => !f)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                        onlyFav
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-border bg-background hover:bg-muted text-ink-soft"
                      }`}
                    >
                      <Star className={`h-4 w-4 ${onlyFav ? "fill-current" : ""}`} />
                      仅显示收藏 ({favorites.size})
                    </button>
                    <span className="text-xs text-ink-soft font-mono">
                      筛选后: {filteredQuestions.length} 题
                    </span>
                  </div>
                </div>

                {/* Question Cards */}
                <div className="space-y-4">
                  {currentQuestions.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-border p-16 text-center">
                      <BookOpen className="h-10 w-10 text-ink-soft/40 mx-auto mb-4" />
                      <h3 className="font-display text-lg text-ink">当前条件下未找到题目</h3>
                      <p className="mt-1 text-sm text-ink-soft max-w-sm mx-auto">
                        {onlyFav
                          ? "目前没有收藏任何该题库的题目。点击题目右上角五角星可收藏题目！"
                          : "尝试更换搜索词，或者点击上方“添加题目”增加新词汇题。"}
                      </p>
                      {activeBank.questions.length === 0 && (
                        <button
                          onClick={() => setIsNewQuestionOpen(true)}
                          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-background hover:bg-ink/90 transition"
                        >
                          <Plus className="h-3.5 w-3.5" /> 立即添加
                        </button>
                      )}
                    </div>
                  ) : (
                    currentQuestions.map((q, idx) => {
                      const picked = revealedAnswers[q.id];
                      const isFavorited = favorites.has(q.id);
                      const displayIdx = (page - 1) * PAGE_SIZE + idx + 1;
                      return (
                        <article
                          key={q.id}
                          className="rounded-2xl border border-border bg-background p-6 shadow-soft transition-all hover:border-border/80"
                        >
                          <header className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-widest text-ink-soft">
                                题目 {displayIdx} · {q.tag}
                              </p>
                              <h3 className="mt-2 font-display text-xl text-ink">
                                {q.word}
                                {q.phonetic && (
                                  <span className="ml-2 text-sm text-ink-soft font-normal">
                                    {q.phonetic}
                                  </span>
                                )}
                              </h3>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => toggleFav(q.id)}
                                className={`transition p-2 rounded-full hover:bg-muted/60 ${
                                  isFavorited ? "text-accent" : "text-ink-soft hover:text-ink"
                                }`}
                                title={isFavorited ? "取消收藏" : "加入收藏"}
                              >
                                <Star className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                              </button>
                              <button
                                onClick={() => handleDeleteQuestion(q.id)}
                                className="text-ink-soft hover:text-destructive transition p-2 hover:bg-destructive/5 rounded-full"
                                title="删除题目"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </header>

                          <p className="mt-4 text-sm leading-relaxed text-ink bg-muted/15 p-3 rounded-xl border border-border/40">
                            {q.stem}
                          </p>

                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt) => {
                              const isPicked = picked === opt.key;
                              const isRight = q.answer === opt.key;

                              let state = "idle";
                              if (picked !== undefined) {
                                if (isRight) state = "right";
                                else if (isPicked) state = "wrong";
                                else state = "muted";
                              }

                              return (
                                <button
                                  key={opt.key}
                                  onClick={() => handlePickAnswer(q.id, opt.key)}
                                  disabled={picked !== undefined}
                                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                                    state === "right"
                                      ? "border-primary bg-primary/10 text-ink"
                                      : state === "wrong"
                                        ? "border-destructive bg-destructive/10 text-destructive font-medium"
                                        : state === "muted"
                                          ? "border-border/40 opacity-50"
                                          : "border-border bg-card hover:bg-muted/30 text-ink"
                                  }`}
                                >
                                  <span
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-semibold ${
                                      isPicked
                                        ? "border-ink bg-ink text-background"
                                        : "border-border text-ink-soft"
                                    }`}
                                  >
                                    {opt.key}
                                  </span>
                                  <span>{opt.text}</span>
                                  {state === "right" && (
                                    <Check className="ml-auto h-4 w-4 text-primary shrink-0" />
                                  )}
                                  {state === "wrong" && (
                                    <X className="ml-auto h-4 w-4 text-destructive shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          <AnimatePresence>
                            {picked !== undefined && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-ink-soft">
                                  <span className="font-semibold text-ink block mb-1 flex items-center gap-1.5">
                                    <Sparkles className="h-4 w-4 text-accent" /> 解析说明：
                                  </span>
                                  {q.explain}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </article>
                      );
                    })
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="mt-8 flex justify-center">
                    <ul className="inline-flex items-center gap-1.5 rounded-2xl border border-border bg-card/20 p-1.5">
                      <li>
                        <button
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink transition hover:bg-muted disabled:opacity-40"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                      </li>
                      {buildPages(page, totalPages).map((p, idx) => (
                        <li key={idx}>
                          {p === "…" ? (
                            <span className="flex h-9 w-9 items-center justify-center text-xs text-ink-soft font-mono">
                              …
                            </span>
                          ) : (
                            <button
                              onClick={() => setPage(p as number)}
                              className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-2.5 text-xs font-mono font-medium transition ${
                                page === p ? "bg-ink text-background" : "text-ink hover:bg-muted"
                              }`}
                            >
                              {p}
                            </button>
                          )}
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages}
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink transition hover:bg-muted disabled:opacity-40"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                CUSTOM QUESTIONS
              </span>
              <h1 className="font-display text-5xl text-ink mt-2">自定义题库中心</h1>
              <p className="mt-4 text-ink-soft text-base">
                自主设计专属真题本、整理易错高频词，或为自己定制针对性强的复习题。
              </p>
            </div>

            {banks.length === 0 ? (
              /* Beautiful empty state */
              <div className="rounded-3xl border border-dashed border-border/80 bg-card/10 p-16 text-center max-w-3xl mx-auto my-6">
                <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary mb-6">
                  <BookOpen className="h-8 w-8" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground font-bold">
                    +
                  </span>
                </div>
                <h3 className="font-display text-2xl text-ink">你还没有创建自定义题库</h3>
                <p className="mt-2 text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
                  自定义题库允许您定制个性化测试。点击下方按钮，只需输入名称和简要描述，即可开启您的专属练习空间！
                </p>

                <button
                  onClick={() => setIsNewBankOpen(true)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-background hover:bg-ink/90 transition shadow-soft hover:-translate-y-0.5"
                >
                  <Plus className="h-4 w-4" /> 创建自定义题库
                </button>
              </div>
            ) : (
              /* Custom Bank Grid */
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-2xl text-ink">我的专属题库 ({banks.length})</h2>
                  <button
                    onClick={() => setIsNewBankOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-background hover:bg-ink/90 transition"
                  >
                    <Plus className="h-3.5 w-3.5" /> 新建题库
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {banks.map((b) => (
                      <motion.div
                        key={b.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div
                          onClick={() => setActiveBankId(b.id)}
                          className="group relative block overflow-hidden rounded-3xl border border-border bg-background p-7 transition cursor-pointer hover:-translate-y-1 hover:shadow-soft h-full"
                        >
                          <div
                            className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-60 transition-transform group-hover:scale-125"
                            style={{
                              background:
                                b.color === "mint"
                                  ? COLORS[0].value
                                  : b.color === "sky"
                                    ? COLORS[1].value
                                    : b.color === "butter"
                                      ? COLORS[2].value
                                      : COLORS[3].value,
                            }}
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
                                  管理并练习 <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        )}

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
                className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-background p-8 shadow-2xl"
              >
                <DialogHeader className="mb-6">
                  <h3 className="font-display text-2xl text-ink">创建自定义题库</h3>
                  <p className="text-sm text-ink-soft mt-1">设计你自用的生词或高频真题本。</p>
                </DialogHeader>

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

        {/* Create Question Dialog */}
        <AnimatePresence>
          {isNewQuestionOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsNewQuestionOpen(false)}
                className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl overflow-y-auto max-h-[90vh] rounded-3xl border border-border bg-background p-8 shadow-2xl"
              >
                <DialogHeader className="mb-6">
                  <h3 className="font-display text-2xl text-ink">添加新题目</h3>
                  <p className="text-sm text-ink-soft mt-1">
                    向「{activeBank?.name}」添加一道自定义词汇单选题。
                  </p>
                </DialogHeader>

                <form onSubmit={handleCreateQuestion} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-2">
                        单词/短语 <span className="text-destructive">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="例如：meticulous"
                        value={qWord}
                        onChange={(e) => setQWord(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-2">
                        音标 (可选)
                      </label>
                      <input
                        type="text"
                        placeholder="例如：/məˈtɪkjələs/"
                        value={qPhonetic}
                        onChange={(e) => setQPhonetic(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-2">
                      题干或例句 <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="使用 ___ 表示空格。例如：The scientist's ___ approach to the problem impressed the entire committee."
                      value={qStem}
                      onChange={(e) => setQStem(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-1">
                      选项设置 <span className="text-destructive">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-ink-soft shrink-0">A</span>
                        <input
                          required
                          type="text"
                          placeholder="选项 A 内容"
                          value={qOptA}
                          onChange={(e) => setQOptA(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-ink-soft shrink-0">B</span>
                        <input
                          required
                          type="text"
                          placeholder="选项 B 内容"
                          value={qOptB}
                          onChange={(e) => setQOptB(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-ink-soft shrink-0">C</span>
                        <input
                          required
                          type="text"
                          placeholder="选项 C 内容"
                          value={qOptC}
                          onChange={(e) => setQOptC(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-ink-soft shrink-0">D</span>
                        <input
                          required
                          type="text"
                          placeholder="选项 D 内容"
                          value={qOptD}
                          onChange={(e) => setQOptD(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-2">
                        正确答案 <span className="text-destructive">*</span>
                      </label>
                      <select
                        value={qAnswer}
                        onChange={(e) => setQAnswer(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-2">
                        分组标签
                      </label>
                      <input
                        type="text"
                        placeholder="如：高频核心、第一组"
                        value={qTag}
                        onChange={(e) => setQTag(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-ink-soft block mb-2">
                      解析与翻译说明
                    </label>
                    <textarea
                      rows={3}
                      placeholder="输入该单词题的详细解析，如意思、语境搭配和例句翻译，方便后续复习..."
                      value={qExplain}
                      onChange={(e) => setQExplain(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-border flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsNewQuestionOpen(false)}
                      className="px-5 py-2.5 rounded-full border border-border text-sm text-ink-soft hover:text-ink hover:bg-muted"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-ink text-background text-sm font-semibold hover:bg-ink/90 transition"
                    >
                      确认添加
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-col text-left ${className}`}>{children}</div>;
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
