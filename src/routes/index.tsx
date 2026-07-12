import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { QuestionBanks } from "@/components/site/QuestionBanks";
import { Workflow } from "@/components/site/Workflow";
import { Pricing } from "@/components/site/Pricing";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <QuestionBanks />
        <Workflow />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
