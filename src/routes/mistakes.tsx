import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/mistakes")({
  head: () => ({
    meta: [
      { title: "错题本 · WordMaster 词海刷题" },
      { name: "description", content: "错题自动归集，形成你的专属词库与复习计划。" },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="MISTAKE BOOK"
      title="智能错题本"
      description="刷题过程中的错题、生词自动沉淀，结合遗忘曲线智能安排复习，让每一次错题都成为进步的支点。"
    />
  ),
});
