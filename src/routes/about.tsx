import { createFileRoute } from "@tanstack/react-router";
import { PagePlaceholder } from "@/components/site/PagePlaceholder";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "关于 · WordMaster 词海刷题" },
      { name: "description", content: "了解 WordMaster 词海刷题的产品理念与团队。" },
    ],
  }),
  component: () => (
    <PagePlaceholder
      eyebrow="ABOUT"
      title="关于我们"
      description="WordMaster 词海刷题致力于用刷题即积累的产品理念，为中国英语考生提供高效、优雅的学习体验。"
    />
  ),
});
