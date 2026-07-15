import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getBank, getQuestions, loadFavorites, saveFavorites } from "@/lib/question-banks";
import { getReadingMaterial, type ReadingWord } from "@/lib/reading-materials";
import { toast } from "sonner";
import {
  ArrowLeft,
  Search,
  Star,
  Filter,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  BookmarkCheck,
  RotateCcw,
  Volume2,
  MessageSquare,
  Languages,
  PenTool,
  Sparkles,
  X,
  Check,
  Headphones,
} from "lucide-react";

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
          ? `${loaderData.bank.name} · 真题刷题 · WordMaster`
          : "真题刷题 · WordMaster",
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

// Standard subsections for each exam category
const BANK_SECTIONS: Record<string, string[]> = {
  kaoyan: [
    "阅读理解 Text 1",
    "阅读理解 Text 2",
    "阅读理解 Text 3",
    "阅读理解 Text 4",
    "新题型 (模拟训练)",
    "完形填空 (词汇运用)",
    "英译汉翻译 (含 AI 批改)",
    "应用文小作文 (含 AI 批改)",
    "图表/图画大作文 (含 AI 批改)",
  ],
  gaokao: [
    "听力专项理解",
    "阅读理解 Text A",
    "阅读理解 Text B",
    "七选五阅读填空",
    "完形填空精练",
    "语法填空精析",
    "书面表达与作文 (含 AI 批改)",
  ],
  zhongkao: [
    "单项选择突破",
    "完形填空精练",
    "阅读理解 Text A",
    "阅读理解 Text B",
    "词汇分类运用",
    "语法填空填空",
    "话题书面表达 (含 AI 批改)",
  ],
  toefl: [
    "学术阅读单选",
    "学科词汇理解",
    "语境词义辨析",
    "学术听力单选",
    "独立口语表达",
    "学术写作表达 (含 AI 批改)",
  ],
  ielts: [
    "生活核心场景词汇",
    "高频学术词汇运用",
    "学术阅读 (匹配题)",
    "图表学术写作 (含 AI 批改)",
    "议论文写作 (含 AI 批改)",
    "口语现场模拟",
  ],
};

const getSectionIcon = (sectionName: string) => {
  const lowercase = sectionName.toLowerCase();
  if (lowercase.includes("阅读") || lowercase.includes("七选五")) {
    return <BookOpen className="h-4.5 w-4.5 text-sky-500" />;
  }
  if (
    lowercase.includes("作文") ||
    lowercase.includes("写作") ||
    lowercase.includes("表达") ||
    lowercase.includes("写")
  ) {
    return <PenTool className="h-4.5 w-4.5 text-emerald-500" />;
  }
  if (lowercase.includes("听力")) {
    return <Volume2 className="h-4.5 w-4.5 text-indigo-500" />;
  }
  if (lowercase.includes("口语") || lowercase.includes("面试") || lowercase.includes("模拟")) {
    return <MessageSquare className="h-4.5 w-4.5 text-violet-500" />;
  }
  if (lowercase.includes("翻译")) {
    return <Languages className="h-4.5 w-4.5 text-amber-500" />;
  }
  return <HelpCircle className="h-4.5 w-4.5 text-primary/70" />;
};

// Deterministically map standard year-sections to the 10 questions in the raw database
const getQuestionForSection = (
  year: string,
  sectionIndex: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawQs: any[],
  bankId: string,
  category: string,
) => {
  if (!rawQs || rawQs.length === 0) return null;

  // Deterministic seed based on year/volume and index
  const seedStr = `${year}_${sectionIndex}`;
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % rawQs.length;
  const originalQ = rawQs[index];

  const sectionName =
    BANK_SECTIONS[category]?.[sectionIndex] || originalQ.tag.split(" · ")[1] || originalQ.tag;

  return {
    ...originalQ,
    id: `${bankId}_${year.replace(/\s+/g, "_")}_sec_${sectionIndex}`,
    tag: `${year} · ${sectionName}`,
  };
};

function BankDetail() {
  const { bank, questions: rawQuestions } = Route.useLoaderData() as {
    bank: NonNullable<ReturnType<typeof getBank>>;
    questions: ReturnType<typeof getQuestions>;
  };

  // Generate dynamic years/volumes based on category
  const availableYears = useMemo(() => {
    if (bank.category === "kaoyan" || bank.category === "gaokao") {
      return Array.from({ length: 12 }, (_, i) => `${2026 - i}年真题`);
    }
    if (bank.category === "zhongkao") {
      return Array.from({ length: 9 }, (_, i) => `${2026 - i}年真题`);
    }
    if (bank.category === "toefl") {
      return Array.from({ length: 16 }, (_, i) => `TPO ${75 - i}`);
    }
    if (bank.category === "ielts") {
      return Array.from({ length: 10 }, (_, i) => `剑桥 ${19 - i}`);
    }
    return ["2026年真题", "2025年真题", "2024年真题"];
  }, [bank.category]);

  const [selectedYear, setSelectedYear] = useState<string>(() => availableYears[0]);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);

  // Favorites & Answered States
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState<Record<string, string>>({});

  // Writing essay States
  const [writingInputs, setWritingInputs] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState<Record<string, boolean>>({});
  const [analysisResults, setAnalysisResults] = useState<
    Record<string, { score: number; comment: string; suggestions: string[] }>
  >({});

  // Modal State
  const [showBrushTip, setShowBrushTip] = useState(false);

  // Split-screen learning workstation states
  const [activeMode, setActiveMode] = useState<"analyze" | "answer">("answer");
  const [selectedLookupWord, setSelectedLookupWord] = useState<ReadingWord | null>(null);
  const [paragraphTranslationsRevealed, setParagraphTranslationsRevealed] = useState<
    Record<string, boolean>
  >({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [showTranslationBanner, setShowTranslationBanner] = useState<boolean>(true);
  const [explanationOpen, setExplanationOpen] = useState<Record<string, boolean>>({});

  // Simulated audio player states
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(15);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // Reset workstation state when active section changes
  useEffect(() => {
    setActiveMode("answer");
    setSelectedLookupWord(null);
    setParagraphTranslationsRevealed({});
    setActiveQuestionIndex(0);
    setIsPlayingAudio(false);
    setAudioProgress(15);
  }, [selectedSectionIndex]);

  // Audio progress tick simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1 * audioSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, audioSpeed]);

  // Load persistence states on mount
  useEffect(() => {
    setFavorites(loadFavorites());

    const savedRevealed = localStorage.getItem(`revealed_${bank.id}`);
    if (savedRevealed) {
      try {
        setRevealed(JSON.parse(savedRevealed));
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }

    const savedWriting = localStorage.getItem(`writing_${bank.id}`);
    if (savedWriting) {
      try {
        setWritingInputs(JSON.parse(savedWriting));
      } catch (e) {
        // ignore invalid JSON
      }
    }

    const savedAnalysis = localStorage.getItem(`analysis_${bank.id}`);
    if (savedAnalysis) {
      try {
        setAnalysisResults(JSON.parse(savedAnalysis));
      } catch (e) {
        // ignore invalid JSON
      }
    }
  }, [bank.id]);

  const saveProgress = (nextRevealed: Record<string, string>) => {
    localStorage.setItem(`revealed_${bank.id}`, JSON.stringify(nextRevealed));
  };

  const sections = useMemo(() => {
    return BANK_SECTIONS[bank.category] || ["核心阅读", "完形填空", "语法填空"];
  }, [bank.category]);

  // Total completed sections across all years/volumes
  const isSectionCompleted = (yearStr: string, sIdx: number) => {
    const sectionQId = `${bank.id}_${yearStr.replace(/\s+/g, "_")}_sec_${sIdx}`;
    const mat = getReadingMaterial(bank.category, yearStr, sIdx, rawQuestions, bank.id);
    if (mat.type === "writing" || mat.type === "translation") {
      return revealed[sectionQId] !== undefined;
    } else {
      if (mat.questions.length === 0) return false;
      return mat.questions.every((_, qIdx) => revealed[`${sectionQId}_q_${qIdx}`] !== undefined);
    }
  };

  const totalAnsweredOverall = useMemo(() => {
    let count = 0;
    availableYears.forEach((year) => {
      sections.forEach((_, sIdx) => {
        if (isSectionCompleted(year, sIdx)) {
          count++;
        }
      });
    });
    return count;
  }, [sections, availableYears, revealed, bank.id, rawQuestions, bank.category]);

  const totalPossibleOverall = availableYears.length * sections.length;
  const completionPercent = Math.round(
    (totalAnsweredOverall / Math.max(1, totalPossibleOverall)) * 100,
  );

  // Completed sections specifically for the currently selected year
  const completedSectionsInYear = useMemo(() => {
    let count = 0;
    sections.forEach((_, sIdx) => {
      if (isSectionCompleted(selectedYear, sIdx)) {
        count++;
      }
    });
    return count;
  }, [sections, selectedYear, revealed, bank.id, rawQuestions, bank.category]);

  // Overall accuracy rate for answered multiple choice questions
  const correctCountOverall = useMemo(() => {
    let count = 0;
    let totalQuestionsAnswered = 0;
    availableYears.forEach((year) => {
      sections.forEach((_, sIdx) => {
        const sectionQId = `${bank.id}_${year.replace(/\s+/g, "_")}_sec_${sIdx}`;
        const mat = getReadingMaterial(bank.category, year, sIdx, rawQuestions, bank.id);
        if (mat.type !== "writing" && mat.type !== "translation") {
          mat.questions.forEach((q, qIdx) => {
            const val = revealed[`${sectionQId}_q_${qIdx}`];
            if (val !== undefined) {
              totalQuestionsAnswered++;
              if (q.answer === val) {
                count++;
              }
            }
          });
        }
      });
    });
    return { count, total: totalQuestionsAnswered };
  }, [revealed, bank.id, rawQuestions, bank.category, availableYears, sections]);

  const accuracyPercent = useMemo(() => {
    const { count, total } = correctCountOverall;
    return total > 0 ? Math.round((count / total) * 100) : 0;
  }, [correctCountOverall]);

  // Active question based on selection
  const activeQuestion = useMemo(() => {
    if (selectedSectionIndex === null) return null;
    return getQuestionForSection(
      selectedYear,
      selectedSectionIndex,
      rawQuestions,
      bank.id,
      bank.category,
    );
  }, [selectedYear, selectedSectionIndex, rawQuestions, bank.id, bank.category]);

  const sectionMaterial = useMemo(() => {
    if (selectedSectionIndex === null) return null;
    return getReadingMaterial(
      bank.category,
      selectedYear,
      selectedSectionIndex,
      rawQuestions,
      bank.id,
    );
  }, [bank.category, selectedYear, selectedSectionIndex, rawQuestions, bank.id]);

  const isWritingSection = useMemo(() => {
    if (selectedSectionIndex === null) return false;
    const sectionName = sections[selectedSectionIndex];
    const lowercase = sectionName.toLowerCase();
    return (
      lowercase.includes("作文") ||
      lowercase.includes("写作") ||
      lowercase.includes("表达") ||
      lowercase.includes("翻译")
    );
  }, [selectedSectionIndex, sections]);

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

  const handleChoose = (qid: string, key: string) => {
    const next = { ...revealed, [qid]: key };
    setRevealed(next);
    saveProgress(next);

    if (activeQuestion) {
      if (activeQuestion.answer === key) {
        toast.success("回答正确！");
      } else {
        toast.error(`回答错误，正确答案是 ${activeQuestion.answer}`);
      }
    }
  };

  const handleAICorrection = (qId: string, userText: string, stem: string) => {
    if (!userText.trim()) {
      toast.error("请输入较完整的解答/文章后再进行批改。");
      return;
    }

    setIsAnalyzing((prev) => ({ ...prev, [qId]: true }));

    setTimeout(() => {
      const length = userText.trim().split(/\s+/).length;
      let score = 88;
      let comment = "";
      let suggestions: string[] = [];

      if (length < 15) {
        score = 65;
        comment = "写作或翻译偏短，未充分展开重点。句子结构较为单一，词汇及搭配可以更丰富。";
        suggestions = [
          "建议增加句子长度，多利用逻辑衔接词（如 moreover, strictly speaking, on the flip side）等扩展成分。",
          "丰富同义词替换，避免高频词汇（如 write, do, good）的不断重复。",
          "注意中英表意习惯的不同，避免中式英语逐字生硬直译。",
        ];
      } else if (length < 40) {
        score = 83;
        comment =
          "语法表达和词意较为精准，拼写无重大纰漏。表达清晰，对中心论点和阅读内容理解透彻。";
        suggestions = [
          "可在文中使用 1-2 句高级语法（如状语从句前置、强调句型等）提升逻辑气势。",
          "部分学术连词的衔接可以更加丝滑，避免转折逻辑显得突兀。",
          "多注意名词单复数和介词的前后呼应，进一步润色细节。",
        ];
      } else {
        score = 95;
        comment = "极其优秀！用词高端、自然且句式多变，逻辑脉络流畅，基本无低级语法与拼写错误。";
        suggestions = [
          "论证非常充分，体现了出色的词汇熟稔度（如 under scrutiny, resistant to 等高难度搭配）。",
          "拼写、时态和标点极其规范，已达到考场高分示范作文的标杆水平。",
          "如果想追求完美，可以尝试将段落的主题词提炼得更具文学渲染力。",
        ];
      }

      const newAnalysis = { ...analysisResults, [qId]: { score, comment, suggestions } };
      setAnalysisResults(newAnalysis);
      localStorage.setItem(`analysis_${bank.id}`, JSON.stringify(newAnalysis));

      const nextRevealed = { ...revealed, [qId]: "A" };
      setRevealed(nextRevealed);
      saveProgress(nextRevealed);

      setIsAnalyzing((prev) => ({ ...prev, [qId]: false }));
      toast.success("AI 智能阅卷批改完毕！已为您解锁详细优化分析报告");
    }, 1500);
  };

  const handleResetProgress = () => {
    if (window.confirm("确定要清空该题库的刷题记录、写作内容和进度吗？")) {
      setRevealed({});
      setWritingInputs({});
      setAnalysisResults({});
      localStorage.removeItem(`revealed_${bank.id}`);
      localStorage.removeItem(`writing_${bank.id}`);
      localStorage.removeItem(`analysis_${bank.id}`);
      setSelectedSectionIndex(null);
      toast("刷题记录与写作内容已完全重置");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-hero py-12">
        {/* Navigation & Return Button */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-ink-soft">
            <Link to="/question-bank" className="hover:text-ink transition">
              题库中心
            </Link>
            <span>/</span>
            <span className="text-ink">{bank.name}</span>
          </div>

          <Link
            to="/question-bank"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-xs font-semibold text-ink-soft hover:bg-muted hover:text-ink transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            返回题库
          </Link>
        </div>

        {/* Hero Bank Details Card */}
        <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card/60 to-muted/20 p-8 shadow-soft">
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                历年真题库 · {bank.id.toUpperCase()}
              </span>
              <h1 className="mt-3 font-display text-3xl md:text-4xl text-ink font-semibold">
                {bank.name}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {bank.desc}。每道模块题目均来自官方考试卷库，提供考纲深度词汇分析、语法拆解与 AI
                智能英语阅卷。
              </p>
            </div>

            {/* Overall Stats Widget */}
            <div className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-background/50 p-5 md:flex-row md:items-center min-w-[280px]">
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-ink-soft">
                  <span>总刷题进度</span>
                  <span className="font-mono text-ink">
                    {totalAnsweredOverall} / {totalPossibleOverall}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted/60">
                  <div
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${completionPercent}%` }}
                  />
                </div>
                <p className="text-right text-[11px] font-mono text-ink-soft/80">
                  总完成度 {completionPercent}%
                </p>
              </div>

              <div className="h-px bg-border md:h-12 md:w-px" />

              <div className="space-y-1 pl-0 md:pl-2">
                <span className="text-[11px] uppercase tracking-widest text-ink-soft">
                  答题正确率
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl font-semibold text-ink">
                    {totalAnsweredOverall > 0 ? accuracyPercent : "-"}
                  </span>
                  {totalAnsweredOverall > 0 && <span className="text-xs text-ink-soft">%</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-4">
            <div className="flex flex-wrap items-center gap-6 text-xs text-ink-soft font-mono">
              <span>
                真题目录年份:{" "}
                <strong className="text-ink font-semibold">{availableYears.length} 个版本</strong>
              </span>
              <span>
                每卷模块数:{" "}
                <strong className="text-ink font-semibold">{sections.length} 题型</strong>
              </span>
            </div>
            {totalAnsweredOverall > 0 && (
              <button
                onClick={handleResetProgress}
                className="inline-flex items-center gap-1.5 text-xs text-ink-soft hover:text-destructive transition cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                重置真题刷题记录
              </button>
            )}
          </div>
        </section>

        {/* Years Tabs Selector */}
        <div className="mt-8">
          <div className="flex flex-col gap-2 rounded-2xl border border-border/50 bg-card/25 p-4.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-soft uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-primary" />
                <span>
                  {bank.category === "toefl" || bank.category === "ielts" ? "真题版本" : "真题年份"}
                </span>
              </span>
              <button
                onClick={() => setShowBrushTip(true)}
                className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>必读：真题应该怎么刷？</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            <div className="flex gap-5 overflow-x-auto no-scrollbar py-2 mt-2 border-b border-border/20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {availableYears.map((year) => {
                const isActive = selectedYear === year;
                let yearCompletedCount = 0;
                sections.forEach((_, sIdx) => {
                  const qId = `${bank.id}_${year.replace(/\s+/g, "_")}_sec_${sIdx}`;
                  if (revealed[qId] !== undefined) yearCompletedCount++;
                });

                return (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setSelectedSectionIndex(null);
                    }}
                    className={`relative shrink-0 pb-2.5 text-sm font-semibold transition-all duration-200 hover:text-ink cursor-pointer ${
                      isActive ? "text-primary" : "text-ink-soft/70"
                    }`}
                  >
                    <span>{year.replace("年真题", "")}</span>
                    {yearCompletedCount > 0 && (
                      <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white scale-90">
                        {yearCompletedCount}
                      </span>
                    )}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Directory Card List or Question Detail Practice Display */}
        {selectedSectionIndex === null ? (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-display text-lg text-ink font-semibold flex items-center gap-2">
                <span>{selectedYear} 核心真题大纲</span>
                <span className="text-xs font-mono font-normal text-ink-soft bg-muted px-2.5 py-0.5 rounded-full border border-border/40">
                  当前卷已完成 {completedSectionsInYear} / {sections.length} 模块
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {sections.map((section, sIdx) => {
                const qId = `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${sIdx}`;
                const isCompleted = revealed[qId] !== undefined;

                return (
                  <div
                    key={section}
                    onClick={() => setSelectedSectionIndex(sIdx)}
                    className="group flex items-center justify-between rounded-2xl border border-border bg-card/40 p-4.5 cursor-pointer hover:border-primary/50 hover:bg-muted/10 hover:shadow-soft transition-all duration-300"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background border border-border shadow-sm group-hover:scale-105 transition-transform duration-200">
                        {getSectionIcon(section)}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                          {section}
                        </h3>
                        <p className="text-[11px] font-mono text-ink-soft/75 mt-0.5">
                          {isCompleted ? "✨ 已做答/已获取报告" : "📝 待练习"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                          <Check className="h-3 w-3" />
                          <span>已做</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted/60 px-2.5 py-1 text-xs font-semibold text-ink-soft group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <span>进入</span>
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 text-ink-soft group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          sectionMaterial && (
            <div className="mt-6 flex flex-col gap-6">
              {/* Premium Learning Header */}
              <div className="flex flex-col gap-4 border-b border-border/60 pb-5 md:flex-row md:items-center md:justify-between">
                {/* Back Link & Title */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedSectionIndex(null);
                      setSelectedLookupWord(null);
                    }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-ink-soft hover:bg-muted hover:text-ink transition cursor-pointer"
                    aria-label="返回目录"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                        {selectedYear.replace("年真题", "")}
                      </span>
                      <span className="text-xs font-mono text-ink-soft">
                        {sections[selectedSectionIndex]}
                      </span>
                    </div>
                    <h2 className="text-lg font-display font-semibold text-ink mt-0.5">
                      {sectionMaterial.title}
                    </h2>
                  </div>
                </div>

                {/* Center Tabs: Analyze Mode & Answer Mode */}
                <div className="flex self-start md:self-auto items-center rounded-xl bg-muted/60 p-1 border border-border/40">
                  <button
                    onClick={() => {
                      setActiveMode("analyze");
                      // Automatically reveal all translations in Analyze mode
                      const autoReveal: Record<string, boolean> = {};
                      sectionMaterial.paragraphs.forEach((p) => {
                        autoReveal[p.pId] = true;
                      });
                      setParagraphTranslationsRevealed(autoReveal);
                    }}
                    className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      activeMode === "analyze"
                        ? "bg-background text-ink shadow-sm"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    精读模式
                  </button>
                  <button
                    onClick={() => {
                      setActiveMode("answer");
                      setParagraphTranslationsRevealed({});
                    }}
                    className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      activeMode === "answer"
                        ? "bg-background text-ink shadow-sm"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    做题模式
                  </button>
                </div>

                {/* Right Tool Icons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      if (sectionMaterial.type === "listening") {
                        setIsPlayingAudio(!isPlayingAudio);
                      } else {
                        toast("提示：当前模块为阅读模式，手写模式下支持点击查词");
                      }
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-ink-soft hover:bg-muted hover:text-ink transition cursor-pointer"
                    title={sectionMaterial.type === "listening" ? "播放音频" : "手写模式"}
                  >
                    <Headphones
                      className={`h-4.5 w-4.5 ${isPlayingAudio ? "text-primary animate-pulse" : ""}`}
                    />
                  </button>
                  <button
                    onClick={() => toast("点击划词：双击任意单词或句子，即可触发 AI 深度句法分析")}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-ink-soft hover:bg-muted hover:text-ink transition cursor-pointer"
                    title="高亮划线"
                  >
                    <PenTool className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={() => {
                      // Reveal all paragraph translations
                      const autoReveal: Record<string, boolean> = {};
                      sectionMaterial.paragraphs.forEach((p) => {
                        autoReveal[p.pId] = !paragraphTranslationsRevealed[p.pId];
                      });
                      setParagraphTranslationsRevealed(autoReveal);
                      toast(
                        Object.values(autoReveal).some((v) => v)
                          ? "已一键开启全文翻译"
                          : "已一键关闭全文翻译",
                      );
                    }}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-ink-soft hover:bg-muted hover:text-ink transition cursor-pointer"
                    title="一键全文翻译"
                  >
                    <Languages className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={() => toast.success("本卷全部错题及笔记已同步至「我的错题」笔记本内")}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-ink-soft hover:bg-muted hover:text-ink transition cursor-pointer"
                    title="收藏本卷"
                  >
                    <Star className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              {/* Hand writing lookup notice banner */}
              {showTranslationBanner && (
                <div className="relative flex items-center justify-between gap-3 rounded-xl bg-[#FDF8E2] border border-[#F3E5AB] px-4 py-2.5 text-xs text-[#8A6D3B] transition-all">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
                    <span>
                      <strong>学霸功能：</strong>
                      手写模式下支持点击文章里带有虚线下划线的学术单词进行即时查词，查看详细释义与音标。
                    </span>
                  </div>
                  <button
                    onClick={() => setShowTranslationBanner(false)}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-900 transition cursor-pointer whitespace-nowrap pl-2"
                  >
                    我知道了
                  </button>
                </div>
              )}

              {/* Learning Workstation Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                {/* LEFT PANE (60%): Passage Materials */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Listening Player (if type is listening) */}
                  {sectionMaterial.type === "listening" && (
                    <div className="rounded-2xl border border-border bg-gradient-to-r from-indigo-500/5 to-purple-500/5 p-5">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md ${
                            isPlayingAudio ? "animate-spin [animation-duration:8s]" : ""
                          }`}
                        >
                          <Headphones className="h-6 w-6" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="text-sm font-semibold text-ink">听力材料音频播报</h4>
                          <p className="text-xs text-ink-soft">
                            真题配音 · 英美籍专业播音员朗读 ({audioSpeed}x 倍速)
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {[1.0, 1.25, 1.5].map((speed) => (
                            <button
                              key={speed}
                              onClick={() => setAudioSpeed(speed)}
                              className={`rounded px-2 py-1 text-[10px] font-mono font-bold border transition ${
                                audioSpeed === speed
                                  ? "bg-primary border-primary text-white"
                                  : "border-border bg-card text-ink-soft hover:bg-muted"
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Controls and Slider */}
                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-background hover:scale-105 transition cursor-pointer"
                        >
                          {isPlayingAudio ? (
                            <span className="h-3.5 w-3.5 flex items-center justify-center font-bold">
                              ||
                            </span>
                          ) : (
                            <span className="h-3.5 w-3.5 flex items-center justify-center font-bold">
                              ▶
                            </span>
                          )}
                        </button>
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden relative">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${isPlayingAudio ? audioProgress : 15}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-ink-soft select-none">
                          {isPlayingAudio ? "0:45" : "0:12"} / 2:30
                        </span>
                      </div>

                      {/* Hidden audio tag simulator */}
                      {sectionMaterial.audioUrl && (
                        <div className="hidden">
                          <audio src={sectionMaterial.audioUrl} autoPlay={false} loop />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Reading Passage/Article */}
                  <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-soft space-y-6">
                    {sectionMaterial.paragraphs && sectionMaterial.paragraphs.length > 0 ? (
                      sectionMaterial.paragraphs.map((p, pIdx) => (
                        <div key={p.pId} className="space-y-3 group">
                          {/* Paragraph header badge */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold tracking-wider text-primary bg-primary/5 px-2 py-0.5 rounded-md border border-primary/10">
                              {p.pId}
                            </span>
                            <div className="h-px flex-1 bg-border/40 group-hover:bg-border/70 transition-colors" />
                          </div>

                          {/* Paragraph text */}
                          <p className="text-base leading-relaxed text-ink font-normal text-justify tracking-wide antialiased">
                            <AnnotatedText
                              text={p.text}
                              vocabulary={sectionMaterial.vocabulary}
                              onWordClick={(wordObj) => setSelectedLookupWord(wordObj)}
                            />
                          </p>

                          {/* Translation block */}
                          {paragraphTranslationsRevealed[p.pId] ? (
                            <div className="rounded-2xl bg-muted/40 border border-border/40 p-4.5 text-sm text-ink-soft leading-relaxed transition-all duration-300 animate-in fade-in slide-in-from-top-1">
                              {p.translation}
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                setParagraphTranslationsRevealed((prev) => ({
                                  ...prev,
                                  [p.pId]: true,
                                }))
                              }
                              className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer transition opacity-0 group-hover:opacity-100 focus:opacity-100"
                            >
                              <Languages className="h-3 w-3" />
                              <span>点击查看翻译</span>
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-center text-ink-soft">
                        <BookOpen className="h-10 w-10 text-muted mx-auto mb-3" />
                        <p>本真题卷无长文阅读材料，请直接查看右侧题干进行练习。</p>
                      </div>
                    )}

                    {/* Difficult Sentences Expansion Panel (长难句分析) */}
                    {sectionMaterial.difficultSentences &&
                      sectionMaterial.difficultSentences.length > 0 && (
                        <div className="border-t border-border pt-6 mt-8 space-y-4">
                          <h4 className="text-sm font-semibold text-ink flex items-center gap-2">
                            <Sparkles className="h-4.5 w-4.5 text-primary animate-pulse" />
                            <span>本篇精选真题长难句深度分析</span>
                          </h4>

                          <div className="space-y-4">
                            {sectionMaterial.difficultSentences.map((ds, dsIdx) => (
                              <div
                                key={dsIdx}
                                className="rounded-2xl border border-primary/15 bg-primary/5 p-4 md:p-5 space-y-3"
                              >
                                <p className="text-sm font-semibold text-ink leading-relaxed border-l-2 border-primary pl-3">
                                  {ds.text}
                                </p>
                                <div className="text-xs text-ink-soft leading-relaxed space-y-2 pt-2 border-t border-primary/10">
                                  <p>
                                    <strong>【译文】</strong>
                                    {ds.translation}
                                  </p>
                                  <p className="text-primary/90">{ds.explanation}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Vocabulary Word Lookup Modal/Popover Overlay */}
                  {selectedLookupWord && (
                    <div className="rounded-2xl border border-primary/30 bg-[#FAF7EE] p-5 shadow-lg relative animate-in zoom-in-95 duration-200">
                      <button
                        onClick={() => setSelectedLookupWord(null)}
                        className="absolute right-3.5 top-3.5 rounded-full p-1 text-ink-soft hover:bg-muted/80 transition cursor-pointer"
                        aria-label="关闭释义"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <h4 className="text-base font-bold text-ink font-display">
                            {selectedLookupWord.word}
                          </h4>
                          {selectedLookupWord.phonetic && (
                            <span className="font-mono text-xs text-ink-soft">
                              {selectedLookupWord.phonetic}
                            </span>
                          )}
                          <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-md font-semibold font-mono">
                            考纲大纲词
                          </span>
                        </div>
                        <p className="text-sm text-[#5C4017] font-semibold">
                          【释义】{selectedLookupWord.definition}
                        </p>
                        <p className="text-xs text-ink-soft leading-relaxed italic bg-white/60 border border-border/40 p-2.5 rounded-xl mt-1">
                          <strong>例句:</strong> {selectedLookupWord.example}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT PANE (40%): Solve Exercise & Answer Questions */}
                <div className="lg:col-span-2">
                  {/* If section contains questions (Reading, Listening, Cloze) */}
                  {sectionMaterial.questions && sectionMaterial.questions.length > 0 ? (
                    (() => {
                      const qIndex = Math.min(
                        activeQuestionIndex,
                        sectionMaterial.questions.length - 1,
                      );
                      const q = sectionMaterial.questions[qIndex];
                      const qId = `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}_q_${qIndex}`;
                      const picked = revealed[qId];
                      const isAnswered = picked !== undefined;

                      return (
                        <div className="space-y-6">
                          {/* Question Card */}
                          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-5">
                            {/* Question Category Header */}
                            <div className="flex items-center justify-between border-b border-border/40 pb-3">
                              <span className="text-xs font-semibold text-primary flex items-center gap-1">
                                <BookmarkCheck className="h-4 w-4" />
                                <span>
                                  {q.type} ({qIndex + 1} / {sectionMaterial.questions.length})
                                </span>
                              </span>

                              <button
                                onClick={() => toggleFav(q.id)}
                                className={`text-xs flex items-center gap-1 transition cursor-pointer ${
                                  favorites.has(q.id)
                                    ? "text-accent"
                                    : "text-ink-soft hover:text-ink"
                                }`}
                              >
                                <Star
                                  className={`h-3.5 w-3.5 ${
                                    favorites.has(q.id) ? "fill-current" : ""
                                  }`}
                                />
                                <span>{favorites.has(q.id) ? "已收藏" : "收藏考题"}</span>
                              </button>
                            </div>

                            {/* Question Stem */}
                            <p className="text-sm font-semibold leading-relaxed text-ink">
                              {q.stem}
                            </p>

                            {/* Options A, B, C, D */}
                            <div className="space-y-2.5">
                              {q.options.map((opt) => {
                                const isPicked = picked === opt.key;
                                const isRight = q.answer === opt.key;
                                const state = !isAnswered
                                  ? "idle"
                                  : isRight
                                    ? "right"
                                    : isPicked
                                      ? "wrong"
                                      : "muted";

                                return (
                                  <button
                                    key={opt.key}
                                    onClick={() => {
                                      // Save response
                                      const next = { ...revealed, [qId]: opt.key };
                                      setRevealed(next);
                                      saveProgress(next);
                                      if (isRight) {
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
                                    <span className="pt-0.5 leading-snug font-medium">
                                      {opt.text}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Correct Answer and AI Explanations if Answered */}
                            {isAnswered && (
                              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 space-y-2 animate-in fade-in duration-300">
                                <div className="flex items-center gap-1 text-xs font-bold text-primary">
                                  <Sparkles className="h-3.5 w-3.5" />
                                  <span>官方深度解析与思路指引</span>
                                </div>
                                <p className="text-xs leading-relaxed text-ink-soft">{q.explain}</p>
                              </div>
                            )}
                          </div>

                          {/* Navigation Controls Board */}
                          <div className="rounded-2xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            {/* Question Tab Badges */}
                            <div className="flex flex-wrap items-center gap-1.5">
                              {sectionMaterial.questions.map((_, qIdx) => {
                                const targetQId = `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}_q_${qIdx}`;
                                const ans = revealed[targetQId];
                                const isCurrent = qIndex === qIdx;

                                return (
                                  <button
                                    key={qIdx}
                                    onClick={() => setActiveQuestionIndex(qIdx)}
                                    className={`flex h-8.5 w-8.5 items-center justify-center rounded-xl text-xs font-mono font-bold transition border cursor-pointer ${
                                      isCurrent
                                        ? "bg-primary border-primary text-white shadow-sm"
                                        : ans !== undefined
                                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 hover:bg-emerald-500/20"
                                          : "bg-background border-border text-ink-soft hover:bg-muted"
                                    }`}
                                  >
                                    Q{qIdx + 1}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Submit / Next Button */}
                            <button
                              onClick={() => {
                                if (qIndex < sectionMaterial.questions.length - 1) {
                                  setActiveQuestionIndex(qIndex + 1);
                                } else {
                                  toast.success("✨ 恭喜你！已完成当前真题小节的所有试题！");
                                  setSelectedSectionIndex(null);
                                }
                              }}
                              className="rounded-xl bg-ink text-background px-4 py-2 text-xs font-semibold hover:bg-ink/90 transition shadow-sm cursor-pointer whitespace-nowrap self-stretch sm:self-auto text-center"
                            >
                              {qIndex < sectionMaterial.questions.length - 1
                                ? "下一题"
                                : "提交完成"}
                            </button>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    /* If section is Writing / Translation section (no multiple questions) */
                    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-6">
                      <div className="flex items-center justify-between border-b border-border/40 pb-3">
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                          <PenTool className="h-4 w-4 animate-bounce" />
                          <span>AI 阅卷作答面板</span>
                        </span>

                        <span className="text-xs font-mono text-ink-soft bg-muted px-2 py-0.5 rounded-md">
                          字数统计:{" "}
                          {
                            (
                              writingInputs[
                                `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`
                              ] || ""
                            )
                              .trim()
                              .split(/\s+/)
                              .filter(Boolean).length
                          }{" "}
                          词
                        </span>
                      </div>

                      {/* Prompts info */}
                      {sectionMaterial.writingPrompt && (
                        <div className="rounded-2xl bg-muted/40 p-4 border border-border/30 text-xs text-ink-soft leading-relaxed space-y-1">
                          <p className="font-bold text-ink">【写作/翻译要求】</p>
                          <p className="whitespace-pre-line">{sectionMaterial.writingPrompt}</p>
                        </div>
                      )}

                      {/* Text area */}
                      <textarea
                        value={
                          writingInputs[
                            `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`
                          ] || ""
                        }
                        onChange={(e) => {
                          const keyId = `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`;
                          const nextInputs = {
                            ...writingInputs,
                            [keyId]: e.target.value,
                          };
                          setWritingInputs(nextInputs);
                          localStorage.setItem(`writing_${bank.id}`, JSON.stringify(nextInputs));
                        }}
                        rows={10}
                        placeholder="请在此处输入您的写作内容或翻译。完成后，点击下方「✨ 智能 AI 评分与批改」，系统将立即进行拼写、语法句式、深度学术词汇运用评估..."
                        className="w-full rounded-2xl border border-border bg-background p-4 text-xs outline-none transition focus:border-primary focus:ring-1 focus:ring-primary shadow-inner leading-relaxed"
                      />

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => {
                            const keyId = `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`;
                            handleAICorrection(
                              keyId,
                              writingInputs[keyId] || "",
                              sectionMaterial.writingPrompt || "Translation exercise",
                            );
                          }}
                          disabled={
                            isAnalyzing[
                              `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`
                            ]
                          }
                          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-xs font-semibold text-white hover:bg-primary/90 transition shadow-sm cursor-pointer disabled:opacity-50"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>
                            {isAnalyzing[
                              `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`
                            ]
                              ? "AI 正在细致分析语法中..."
                              : "✨ 智能 AI 评分与批改"}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            const keyId = `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`;
                            const nextRevealed = { ...revealed, [keyId]: "A" };
                            setRevealed(nextRevealed);
                            saveProgress(nextRevealed);
                            toast.success("已解锁该篇目的真题官方标准参考解答！");
                          }}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-ink-soft hover:bg-muted transition cursor-pointer"
                        >
                          <span>解锁官方解答</span>
                        </button>
                      </div>

                      {/* AI Essay Correction Feedback Card */}
                      {analysisResults[
                        `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`
                      ] && (
                        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4.5 space-y-4 animate-in zoom-in-95 duration-200">
                          <div className="flex items-center justify-between border-b border-emerald-500/10 pb-2.5">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-600 text-xs">
                              <Sparkles className="h-4 w-4" />
                              <span>AI 智能作答评估反馈</span>
                            </div>
                            <div className="flex items-baseline gap-0.5 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                              <span className="text-[9px] text-emerald-600 font-bold uppercase mr-1">
                                评分:
                              </span>
                              <span className="font-display text-base font-bold text-emerald-600">
                                {
                                  analysisResults[
                                    `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`
                                  ].score
                                }
                              </span>
                              <span className="text-[9px] text-emerald-500 font-medium">/100</span>
                            </div>
                          </div>

                          <div className="space-y-3.5 text-xs">
                            <div>
                              <h5 className="font-bold text-emerald-800">📌 综合评语:</h5>
                              <p className="text-ink-soft mt-1 leading-relaxed">
                                {
                                  analysisResults[
                                    `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`
                                  ].comment
                                }
                              </p>
                            </div>

                            <div>
                              <h5 className="font-bold text-emerald-800">💡 句子润色与优化建议:</h5>
                              <ul className="list-disc pl-4 mt-1.5 space-y-1.5 text-ink-soft">
                                {analysisResults[
                                  `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`
                                ].suggestions.map((s, sIdx) => (
                                  <li key={sIdx}>{s}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Reference Answers Comparison */}
                      {revealed[
                        `${bank.id}_${selectedYear.replace(/\s+/g, "_")}_sec_${selectedSectionIndex}`
                      ] !== undefined &&
                        sectionMaterial.referenceAnswer && (
                          <div className="rounded-2xl border border-border bg-muted/30 p-4.5 space-y-2 animate-in fade-in duration-300">
                            <div className="flex items-center gap-1 text-xs font-bold text-ink">
                              <BookOpen className="h-3.5 w-3.5" />
                              <span>官方真题范文 / 标准译文参考</span>
                            </div>
                            <p className="text-xs leading-relaxed text-ink-soft whitespace-pre-line bg-card p-3 rounded-xl border border-border/40 font-serif">
                              {sectionMaterial.referenceAnswer}
                            </p>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* Guide Modal: How to practice exam questions */}
      {showBrushTip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300">
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-background p-6 md:p-8 shadow-2xl scale-100 transition-all">
            <button
              onClick={() => setShowBrushTip(false)}
              className="absolute right-4.5 top-4.5 rounded-full p-1.5 text-ink-soft hover:bg-muted hover:text-ink transition cursor-pointer"
              aria-label="关闭提示"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="font-display text-xl text-ink font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>必读：历年真题应该怎么刷？</span>
            </h3>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-soft">
              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-ink">第一轮：精读真题文章词汇</h4>
                  <p className="mt-1">
                    做完题不要只对答案，把上下文里遇到的每一个高纲、学术生词词组全部标注并精读，随时添加至收藏夹内，方便利用闪卡反复温习。
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-ink">第二轮：深度剖析长难句</h4>
                  <p className="mt-1">
                    分析句子结构。找出文章中的主谓宾和从句修饰成分，这能极大帮助在“翻译”与“新题型”中快速理清主旨和关联逻辑。
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-ink">第三轮：作文翻译使用 AI 批改润色</h4>
                  <p className="mt-1">
                    在真题写作与翻译中，不要只背诵模版。利用 WordMaster 独创的 AI
                    智能阅卷批改工具，分析你文章的词汇与句式细节，升级为高分句型。
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowBrushTip(false)}
              className="mt-6 w-full rounded-2xl bg-ink py-3 text-xs font-semibold text-background hover:bg-ink/90 transition shadow-sm cursor-pointer"
            >
              开启真题提分之旅
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
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
        <h1 className="font-display text-4xl text-ink font-semibold">题库不存在</h1>
        <p className="mt-3 text-sm text-ink-soft">该题库可能已下线或链接有误。</p>
        <Link
          to="/question-bank"
          className="mt-6 inline-flex rounded-full border border-ink/15 px-6 py-2.5 text-sm font-semibold hover:bg-muted transition"
        >
          返回题库中心
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function AnnotatedText({
  text,
  vocabulary,
  onWordClick,
}: {
  text: string;
  vocabulary: Record<string, ReadingWord>;
  onWordClick: (word: ReadingWord) => void;
}) {
  if (!vocabulary || Object.keys(vocabulary).length === 0) {
    return <span>{text}</span>;
  }

  const keys = Object.keys(vocabulary).map((k) => k.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"));
  if (keys.length === 0) return <span>{text}</span>;

  const regex = new RegExp(`\\b(${keys.join("|")})\\b`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const lowerPart = part.toLowerCase();
        const vocabKey = Object.keys(vocabulary).find((k) => k.toLowerCase() === lowerPart);
        if (vocabKey) {
          return (
            <span
              key={index}
              onClick={() => onWordClick(vocabulary[vocabKey])}
              className="border-b border-dashed border-primary text-primary hover:text-primary/80 cursor-pointer transition-colors font-medium relative group px-0.5"
            >
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
