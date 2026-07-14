import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, ArrowRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";

type PracticeSearchParams = {
  bankId: string;
};

export const Route = createFileRoute("/practice")({
  validateSearch: (search: Record<string, unknown>): PracticeSearchParams => {
    return {
      bankId: (search.bankId as string) || "postgrad",
    };
  },
  component: PracticePage,
});

// Mock questions for UI development
const mockQuestions: Question[] = [
  {
    id: "q1",
    bankId: "postgrad",
    type: "vocabulary",
    category: "Postgraduate",
    subCategory: "Vocabulary",
    difficulty: 3,
    content: {
      question: "The word 'tenuous' in the passage most nearly means:",
      options: [
        { id: "A", text: "Strong and robust" },
        { id: "B", text: "Weak and fragile" },
        { id: "C", text: "Long and winding" },
        { id: "D", text: "Clear and obvious" },
      ],
      correctAnswer: "B",
    },
    explanation: {
      text: "'Tenuous' means very weak or slight. In context, it refers to a link or connection that is not substantial.",
      keyPoints: ["Tenuous: 脆弱的，微弱的", "Fragile: 易碎的，脆弱的"],
      relatedWords: [
        { word: "tenuous", meaning: "weak", partOfSpeech: "adj", relation: "root" },
        { word: "fragile", meaning: "breakable", partOfSpeech: "adj", relation: "synonym" },
      ],
    },
    keyWords: [],
    tags: ["Vocabulary"],
    stats: { totalAttempts: 100, correctCount: 80, correctRate: 0.8, avgTimeSpent: 15 },
    status: "active",
    createdBy: "system",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "q2",
    bankId: "postgrad",
    type: "vocabulary",
    category: "Postgraduate",
    subCategory: "Vocabulary",
    difficulty: 4,
    content: {
      question: "Which of the following is the antonym of 'ephemeral'?",
      options: [
        { id: "A", text: "Transient" },
        { id: "B", text: "Momentary" },
        { id: "C", text: "Perpetual" },
        { id: "D", text: "Brief" },
      ],
      correctAnswer: "C",
    },
    explanation: {
      text: "'Ephemeral' means lasting for a very short time. 'Perpetual' means never ending or changing, which is the antonym.",
      keyPoints: ["Ephemeral: 朝生暮死的，短暂的", "Perpetual: 永久的，不断的"],
      relatedWords: [],
    },
    keyWords: [],
    tags: ["Vocabulary"],
    stats: { totalAttempts: 100, correctCount: 70, correctRate: 0.7, avgTimeSpent: 12 },
    status: "active",
    createdBy: "system",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function PracticePage() {
  const { bankId } = Route.useSearch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (id: string) => {
    if (isAnswered) return;
    setSelectedOption(id);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-hero py-12">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => history.back()}
              className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
            >
              <ChevronLeft className="h-4 w-4" />
              返回
            </button>
            <div className="flex items-center gap-4">
              <div className="h-2 w-48 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-ink-soft">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="rounded-3xl border border-border bg-card p-10 shadow-soft">
                <div className="mb-6 flex gap-2">
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {currentQuestion.type}
                  </span>
                  <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                    Level {currentQuestion.difficulty}
                  </span>
                </div>

                <h2 className="font-display text-2xl leading-relaxed text-ink">
                  {currentQuestion.content.question}
                </h2>

                <div className="mt-10 space-y-3">
                  {currentQuestion.content.options.map((option) => {
                    const isSelected = selectedOption === option.id;
                    const isCorrect = option.id === currentQuestion.content.correctAnswer;
                    const showResult = isAnswered;

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        disabled={isAnswered}
                        className={cn(
                          "group relative flex w-full items-center gap-4 rounded-2xl border p-5 text-left transition-all",
                          isSelected
                            ? "border-ink bg-ink/5"
                            : "border-border hover:border-ink/30 hover:bg-ink/5",
                          showResult && isCorrect && "border-primary bg-primary/10",
                          showResult &&
                            isSelected &&
                            !isCorrect &&
                            "border-destructive bg-destructive/10",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-bold transition-colors",
                            isSelected
                              ? "border-ink bg-ink text-background"
                              : "border-border text-ink-soft",
                            showResult && isCorrect && "border-primary bg-primary text-background",
                            showResult &&
                              isSelected &&
                              !isCorrect &&
                              "border-destructive bg-destructive text-background",
                          )}
                        >
                          {showResult ? (
                            isCorrect ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <X className="h-4 w-4" />
                            )
                          ) : (
                            option.id
                          )}
                        </div>
                        <span className="text-lg text-ink">{option.text}</span>
                      </button>
                    );
                  })}
                </div>

                {!isAnswered ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedOption}
                    className="mt-10 inline-flex h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-medium text-background transition-transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    确认答案
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="mt-10 inline-flex h-12 w-full items-center justify-center rounded-full bg-ink text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
                  >
                    下一题
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                )}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-border bg-card p-10"
                >
                  <h3 className="font-display text-xl text-ink">详解分析</h3>
                  <p className="mt-4 leading-relaxed text-ink-soft">
                    {currentQuestion.explanation.text}
                  </p>

                  {currentQuestion.explanation.keyPoints.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-ink">
                        关键考点
                      </h4>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {currentQuestion.explanation.keyPoints.map((point) => (
                          <li
                            key={point}
                            className="rounded-full bg-muted px-4 py-1.5 text-xs text-ink-soft"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {currentQuestion.explanation.relatedWords.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-ink">
                        相关词汇
                      </h4>
                      <div className="mt-3 grid grid-cols-2 gap-4">
                        {currentQuestion.explanation.relatedWords.map((word) => (
                          <div key={word.word} className="rounded-2xl border border-border p-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-ink">{word.word}</span>
                              <span className="text-[10px] text-ink-soft">
                                {word.partOfSpeech}.
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-ink-soft">{word.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
