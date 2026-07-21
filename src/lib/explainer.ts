import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";

export interface OptionItem {
  key: string;
  text: string;
}

export interface ExplainerResult {
  detailedExplanation: string;
  sourceQuote: string;
  sourceQuoteTranslation: string;
  sourceLocation: string;
  optionAnalysis: {
    key: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  keyVocabulary: {
    word: string;
    definition: string;
  }[];
}

const InputSchema = z.object({
  passage: z.string().optional(),
  questionStem: z.string(),
  options: z.array(z.object({ key: z.string(), text: z.string() })),
  correctAnswer: z.string(),
  originalExplanation: z.string().optional(),
});

export const getDetailedExplanation = createServerFn({ method: "POST" })
  .validator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(apiKey);

    const systemPrompt = `你是一位面向中国英语考试（考研、四六级、托福、雅思等）学生的顶级英语解题老师。
请针对给定的题目、选项、正确答案和阅读原文，进行专业深度剖析。
严格以如下 JSON 结构返回（禁止使用 markdown 代码块，不要多余文字）：
{
  "detailedExplanation": "中文详细解题思路，说明为什么正确答案是正确的，学生应如何思考",
  "sourceQuote": "原文中承载答案依据的英文原句（必须逐字引用，不要改写；若无原文则使用题干中的关键句）",
  "sourceQuoteTranslation": "对 sourceQuote 的高质量中文翻译",
  "sourceLocation": "原文出处定位，例如 第2段第3句 / 第3段末句；若无原文写「题干句」",
  "optionAnalysis": [
    { "key": "A", "isCorrect": false, "explanation": "为什么错，是否为常见干扰陷阱，如何与原文比较" }
  ],
  "keyVocabulary": [
    { "word": "词/短语", "definition": "词性+中文释义" }
  ]
}
optionAnalysis 必须包含全部选项。语言温暖、专业、教学性强。`;

    const optionsStr = data.options.map((o) => `${o.key}. ${o.text}`).join("\n");
    const userPrompt = `[Passage]
${data.passage || "No passage text available."}

[Question]
${data.questionStem}

[Options]
${optionsStr}

[Correct Answer]
${data.correctAnswer}

[Original/Draft Explanation]
${data.originalExplanation || "None"}`;

    const { text } = await generateText({
      model: gateway("openai/gpt-5.5"),
      system: systemPrompt,
      prompt: userPrompt,
    });

    const cleaned = text
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "");
    return JSON.parse(cleaned) as ExplainerResult;
  });
