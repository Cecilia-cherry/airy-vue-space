import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion, AnimatePresence } from "motion/react";
import {
  Trash2,
  Volume2,
  BookOpen,
  FileText,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Check,
  X,
  Languages,
  Inbox,
  Layers,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import { banks, getQuestions } from "@/lib/question-banks";
import { loadFavorites, saveFavorites } from "@/lib/question-banks";
import { loadFavoriteWords, saveFavoriteWords, type FavoriteWord } from "@/lib/dictionary";

interface QuestionWithBankInfo {
  id: string;
  bankId: string;
  word?: string;
  phonetic?: string;
  stem: string;
  options: { key: string; text: string }[];
  answer: string;
  explain: string;
  tag: string;
  bankName: string;
  category: string;
}

export const Route = createFileRoute("/mistakes")({
  head: () => ({
    meta: [
      { title: "错题生词本 · WordMaster 词海刷题" },
      { name: "description", content: "错题与生词自动归集，形成你的专属词库与智能复习计划。" },
    ],
  }),
  component: MistakesPage,
});

function MistakesPage() {
  const [activeTab, setActiveTab] = useState<"words" | "questions">("words");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [favoriteWords, setFavoriteWords] = useState<FavoriteWord[]>([]);

  // Practice state for favorited questions
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, string>>({});

  // Flashcards (Memory Card) mode states for words
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rememberedCount, setRememberedCount] = useState(0);

  // Load data on mount
  useEffect(() => {
    setFavorites(loadFavorites());
    setFavoriteWords(loadFavoriteWords());
  }, []);

  // Text-to-Speech pronunciation helper
  const handlePronounce = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      toast.error("您的浏览器暂不支持语音合成朗读");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85; // slightly slower for clearer academic focus
    window.speechSynthesis.speak(utterance);
  };

  // Remove word helper
  const handleRemoveWord = (word: string) => {
    const updated = favoriteWords.filter((w) => w.word.toLowerCase() !== word.toLowerCase());
    setFavoriteWords(updated);
    saveFavoriteWords(updated);
    toast(`已将单词 "${word}" 移出生词本`);

    // Reset flashcard state if we run out of words
    if (updated.length === 0) {
      setIsFlashcardMode(false);
    } else if (flashcardIndex >= updated.length) {
      setFlashcardIndex(Math.max(0, updated.length - 1));
    }
  };

  // Remove question helper
  const handleRemoveQuestion = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.delete(id);
      saveFavorites(next);
      toast("已取消收藏该题目");
      return next;
    });
  };

  // Extract all favorited questions from all banks
  const collectedQuestions = useMemo<QuestionWithBankInfo[]>(() => {
    const list: QuestionWithBankInfo[] = [];
    if (!banks) return list;

    for (const bank of banks) {
      const qs = getQuestions(bank.id);
      for (const q of qs) {
        if (favorites.has(q.id)) {
          list.push({
            id: q.id,
            bankId: q.bankId,
            word: q.word,
            phonetic: q.phonetic,
            stem: q.stem,
            options: q.options,
            answer: q.answer,
            explain: q.explain,
            tag: q.tag,
            bankName: bank.name,
            category: bank.category,
          });
        }
      }
    }
    return list;
  }, [favorites]);

  // Flashcards navigation
  const handleFlashcardNext = (remembered: boolean) => {
    if (remembered) {
      setRememberedCount((prev) => prev + 1);
    }
    setIsFlipped(false);
    setTimeout(() => {
      if (flashcardIndex < favoriteWords.length - 1) {
        setFlashcardIndex((prev) => prev + 1);
      } else {
        // Finished round
        toast.success(
          `自测结束！你记住了 ${rememberedCount + (remembered ? 1 : 0)} / ${favoriteWords.length} 个生词！`,
          {
            duration: 4000,
          },
        );
        setIsFlashcardMode(false);
        setFlashcardIndex(0);
        setRememberedCount(0);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container-hero py-8 md:py-12 space-y-8">
        {/* Header Board */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border/40 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-primary tracking-wider uppercase">
              <GraduationCap className="h-4.5 w-4.5" />
              <span>Personal Workspace</span>
            </div>
            <h1 className="text-3xl font-display font-semibold text-ink tracking-tight">
              智能错题生词本
            </h1>
            <p className="text-sm text-ink-soft max-w-2xl">
              精读研析中收藏的考纲生词与重点考题在此自动汇聚，为您量身定制高效遗忘复习，攻克薄弱环节。
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center rounded-xl bg-muted/60 p-1 border border-border/40 self-start md:self-auto">
            <button
              onClick={() => {
                setActiveTab("words");
                setIsFlashcardMode(false);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                activeTab === "words"
                  ? "bg-background text-ink shadow-xs"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              <Languages className="h-3.5 w-3.5" />
              <span>我的专属生词库 ({favoriteWords.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("questions")}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                activeTab === "questions"
                  ? "bg-background text-ink shadow-xs"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>收藏的重点考题 ({collectedQuestions.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Words Section */}
        {activeTab === "words" && (
          <div className="space-y-6">
            {favoriteWords.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center max-w-xl mx-auto space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-muted/40 flex items-center justify-center text-ink-soft mx-auto">
                  <Inbox className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-ink">暂无收藏的生词</h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    在「真题刷题」的精读模式下，点击文章中的任意单词即可即时查看官方权威释义，并能一键将其收藏到生词本。
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    to="/question-bank"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-primary px-4 py-2 rounded-xl hover:bg-primary/90 transition shadow-sm"
                  >
                    <span>去真题库精读研析</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ) : isFlashcardMode ? (
              /* Flashcard Mode Widget */
              <div className="max-w-md mx-auto space-y-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setIsFlashcardMode(false)}
                    className="text-xs text-ink-soft hover:text-ink font-semibold flex items-center gap-1 transition cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>退出自测模式</span>
                  </button>
                  <span className="text-xs text-ink-soft font-mono">
                    进度: {flashcardIndex + 1} / {favoriteWords.length}
                  </span>
                </div>

                {/* Card itself */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`h-64 rounded-3xl border border-primary/20 bg-[#FAF7EE] p-8 shadow-md flex flex-col justify-between cursor-pointer transition-all duration-300 relative select-none transform hover:-translate-y-1 hover:shadow-lg ${
                    isFlipped ? "border-primary/40 bg-white" : ""
                  }`}
                >
                  <div className="absolute right-4 top-4 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                    {isFlipped ? "释义页" : "单词页"}
                  </div>

                  {/* Word and phonetic - Front */}
                  {!isFlipped ? (
                    <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                      <h2 className="text-3xl font-display font-bold text-ink tracking-tight">
                        {favoriteWords[flashcardIndex].word}
                      </h2>
                      {favoriteWords[flashcardIndex].phonetic && (
                        <span className="font-mono text-sm text-ink-soft">
                          {favoriteWords[flashcardIndex].phonetic}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePronounce(favoriteWords[flashcardIndex].word);
                        }}
                        className="rounded-full p-2 bg-primary/5 hover:bg-primary/10 text-primary transition"
                        title="朗读发音"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    /* Translation/Definition - Back */
                    <div className="flex-1 flex flex-col justify-center space-y-4">
                      <div>
                        <span className="text-[10px] font-bold text-primary tracking-wider block mb-1 uppercase">
                          【中文释义】
                        </span>
                        <p className="text-base font-semibold text-ink leading-relaxed">
                          {favoriteWords[flashcardIndex].definition}
                        </p>
                      </div>
                      {favoriteWords[flashcardIndex].example && (
                        <div>
                          <span className="text-[10px] font-bold text-ink-soft tracking-wider block mb-1 uppercase">
                            【情境例句】
                          </span>
                          <p className="text-xs text-ink-soft leading-relaxed italic bg-muted/40 p-2.5 rounded-xl border border-border/20">
                            {favoriteWords[flashcardIndex].example}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="text-center text-[11px] text-ink-soft/80 border-t border-border/40 pt-3">
                    点击卡片翻转显示释义
                  </div>
                </div>

                {/* Self evaluation controls */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => handleFlashcardNext(false)}
                    className="flex-1 rounded-xl border border-border bg-card py-3 text-xs font-semibold text-ink-soft hover:bg-muted transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <X className="h-4 w-4 text-rose-500" />
                    <span>没记住 / 再看看</span>
                  </button>
                  <button
                    onClick={() => handleFlashcardNext(true)}
                    className="flex-1 rounded-xl bg-primary py-3 text-xs font-semibold text-white hover:bg-primary/90 transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="h-4 w-4 text-emerald-300" />
                    <span>记住了 / 斩除</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Grid List Mode */
              <div className="space-y-6">
                {/* Flashcard Entry trigger banner */}
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Layers className="h-5 w-5 animate-pulse" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-ink">生词自测背诵卡片模式</h4>
                      <p className="text-xs text-ink-soft">
                        隐藏中文译义与情意例句，像抽词卡一样逐个检测记忆，加深认知。
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsFlashcardMode(true);
                      setFlashcardIndex(0);
                      setIsFlipped(false);
                      setRememberedCount(0);
                    }}
                    className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/90 transition shadow-xs cursor-pointer inline-flex items-center gap-1"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>开始自测 ({favoriteWords.length} 词)</span>
                  </button>
                </div>

                {/* Grid List of Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favoriteWords.map((item) => (
                    <div
                      key={item.word}
                      className="rounded-2xl border border-border bg-card p-5 space-y-4 hover:shadow-soft hover:border-primary/20 transition-all group flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        {/* Title and pronunciation */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <h3 className="text-lg font-display font-bold text-ink tracking-tight flex items-center gap-1.5">
                              <span>{item.word}</span>
                              <button
                                onClick={() => handlePronounce(item.word)}
                                className="rounded-full p-1 text-ink-soft hover:bg-primary/10 hover:text-primary transition"
                                title="点击发音"
                              >
                                <Volume2 className="h-3.5 w-3.5" />
                              </button>
                            </h3>
                            {item.phonetic && (
                              <span className="font-mono text-xs text-ink-soft">
                                {item.phonetic}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleRemoveWord(item.word)}
                            className="rounded-lg p-1.5 text-ink-soft hover:text-rose-500 hover:bg-rose-50 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
                            title="删除词条"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {/* Definition details */}
                        <div className="rounded-xl bg-muted/40 px-3 py-2 text-xs text-ink-soft font-semibold">
                          {item.definition}
                        </div>

                        {/* Context Example */}
                        {item.example && (
                          <p className="text-xs text-ink-soft leading-relaxed italic border-l-2 border-border pl-2.5 pt-1">
                            {item.example}
                          </p>
                        )}
                      </div>

                      {/* Saved timestamp */}
                      <div className="text-[10px] text-ink-soft/60 font-mono flex items-center justify-between border-t border-border/40 pt-3">
                        <span>收藏时间</span>
                        <span>{new Date(item.savedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Questions Section */}
        {activeTab === "questions" && (
          <div className="space-y-6">
            {collectedQuestions.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center max-w-xl mx-auto space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-muted/40 flex items-center justify-center text-ink-soft mx-auto">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-ink">暂无收藏的重点题目</h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    在「真题刷题」的答题与研析界面，点击考题右上角的「收藏考题」按钮，重点难点好题即可全自动汇聚于此进行集中演练。
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    to="/question-bank"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-primary px-4 py-2 rounded-xl hover:bg-primary/90 transition shadow-sm"
                  >
                    <span>去真题库收藏好题</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              /* List of Interactive collected questions */
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="text-xs text-ink-soft flex items-center justify-between border-b border-border/40 pb-2">
                  <span>共收藏了 {collectedQuestions.length} 道重点经典考题</span>
                  <button
                    onClick={() => {
                      setRevealedAnswers({});
                      toast("答题卡进度已重置，您可以重新演练");
                    }}
                    className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>全部重新演练</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {collectedQuestions.map((q, idx) => {
                    const picked = revealedAnswers[q.id];
                    const isAnswered = picked !== undefined;
                    const isRight = q.answer === picked;

                    return (
                      <div
                        key={q.id}
                        className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-5 relative group"
                      >
                        {/* Question Metadata Info */}
                        <div className="flex items-center justify-between border-b border-border/40 pb-3">
                          <span className="text-[10px] font-semibold text-primary bg-primary/5 border border-primary/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {q.bankName} · {q.tag}
                          </span>

                          <button
                            onClick={() => handleRemoveQuestion(q.id)}
                            className="text-xs text-ink-soft hover:text-rose-500 flex items-center gap-1 transition cursor-pointer"
                            title="取消收藏"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">取消收藏</span>
                          </button>
                        </div>

                        {/* Question Stem */}
                        <p className="text-sm font-semibold leading-relaxed text-ink">
                          {idx + 1}. {q.stem}
                        </p>

                        {/* Interactive Options list */}
                        <div className="grid grid-cols-1 gap-2.5">
                          {q.options.map((opt: { key: string; text: string }) => {
                            const isPicked = picked === opt.key;
                            const isRightOption = q.answer === opt.key;
                            const state = !isAnswered
                              ? "idle"
                              : isRightOption
                                ? "right"
                                : isPicked
                                  ? "wrong"
                                  : "muted";

                            return (
                              <button
                                key={opt.key}
                                onClick={() => {
                                  if (isAnswered) return;
                                  setRevealedAnswers((prev) => ({
                                    ...prev,
                                    [q.id]: opt.key,
                                  }));
                                  if (isRightOption) {
                                    toast.success("回答正确！太棒了 🎉");
                                  } else {
                                    toast.error(`回答错误，正确答案是 ${q.answer}`);
                                  }
                                }}
                                disabled={isAnswered}
                                className={`flex w-full items-start gap-3 rounded-2xl border p-3.5 text-left text-xs transition-all cursor-pointer ${
                                  state === "right"
                                    ? "border-emerald-500 bg-emerald-50/70 text-ink ring-2 ring-emerald-500/10"
                                    : state === "wrong"
                                      ? "border-rose-500 bg-rose-50/70 text-ink ring-2 ring-rose-500/10"
                                      : state === "muted"
                                        ? "border-border/40 bg-muted/20 text-ink-soft opacity-60"
                                        : "border-border bg-background text-ink hover:border-primary/60 hover:bg-muted/10 hover:shadow-xs"
                                }`}
                              >
                                <span
                                  className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md border text-xs font-mono font-bold transition-colors ${
                                    state === "right"
                                      ? "bg-emerald-500 border-emerald-500 text-white"
                                      : state === "wrong"
                                        ? "bg-rose-500 border-rose-500 text-white"
                                        : "border-border bg-card text-ink-soft"
                                  }`}
                                >
                                  {opt.key}
                                </span>
                                <span className="pt-0.5 leading-snug font-medium">{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Interactive Explanation card - always collapsed until answered */}
                        {isAnswered && (
                          <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4.5 space-y-2 animate-in fade-in duration-300">
                            <div className="flex items-center gap-1 text-xs font-bold text-primary">
                              <Sparkles className="h-3.5 w-3.5" />
                              <span>官方深度解析与思路指引</span>
                            </div>
                            <p className="text-xs leading-relaxed text-ink-soft pt-2 border-t border-primary/10">
                              {q.explain}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
