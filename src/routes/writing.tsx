import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "涂写练习 · WordMaster 词海刷题" },
      { name: "description", content: "手写涂写练习，强化词汇拼写与肌肉记忆。" },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="WRITING PRACTICE"
      title="涂写练习"
      description="手写涂写模式，让你在书写中记忆单词与短语，强化拼写与肌肉记忆，随时随地保持手感。"
    />
  ),
});
