import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/question-bank")({
  head: () => ({
    meta: [
      { title: "题库 · WordMaster 词海刷题" },
      { name: "description", content: "覆盖考研、四六级、托福、雅思等主流考试的高质量英语题库。" },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="QUESTION BANK"
      title="题库中心"
      description="覆盖考研、四六级、托福、雅思等主流考试的高质量真题与模拟题，按考试、题型、难度多维筛选。"
    />
  ),
});
