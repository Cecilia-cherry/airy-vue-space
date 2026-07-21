import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";

export interface TranslationResult {
  word: string;
  phonetic: string;
  commonDefinitions: string[];
  contextDefinition: string;
  example: string;
  exampleTranslation: string;
}

const InputSchema = z.object({
  word: z.string(),
  context: z.string().optional(),
});

export const translateWord = createServerFn({ method: "POST" })
  .validator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const { word, context } = data;
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const { createLovableAiGatewayProvider } = await import("./ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(apiKey);

    const systemPrompt = `你是面向中国英语考试（考研、四六级、托福、雅思、高考）学生的专业英汉词典。
根据给定的英文单词和上下文句子/段落，严格返回如下 JSON（不要包裹在 markdown 代码块中，不要多余文字）：
{
  "word": "单词原形",
  "phonetic": "国际音标，例如 [ˈbrɔːdə(r)]",
  "commonDefinitions": ["常见词性和中文释义，例如 adj. 宽阔的", "n. 广播"],
  "contextDefinition": "该单词在给定上下文中的具体中文含义（含词性）",
  "example": "一个使用该单词的英文例句",
  "exampleTranslation": "例句的中文翻译"
}
必须准确、地道，contextDefinition 必须紧扣上下文语境。`;

    const userPrompt = `Word: "${word}"\nContext: "${context || ""}"`;

    const { text } = await generateText({
      model: gateway("openai/gpt-5.5"),
      system: systemPrompt,
      prompt: userPrompt,
    });

    const cleaned = text
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "");
    return JSON.parse(cleaned) as TranslationResult;
  });
