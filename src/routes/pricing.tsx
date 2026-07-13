import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "定价 · WordMaster 词海刷题" },
      { name: "description", content: "灵活的订阅方案，按需选择适合你的学习计划。" },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="PRICING"
      title="定价方案"
      description="从免费体验到进阶订阅，多档灵活方案，适配备考不同阶段的学习强度与预算。"
    />
  ),
});
