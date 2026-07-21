import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";

// Initialize Gemini client lazily on the server
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

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

export const getDetailedExplanation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      passage: z.string().optional(),
      questionStem: z.string(),
      options: z.array(
        z.object({
          key: z.string(),
          text: z.string(),
        }),
      ),
      correctAnswer: z.string(),
      originalExplanation: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { passage, questionStem, options, correctAnswer, originalExplanation } = data;
    try {
      const ai = getAiClient();

      const systemInstruction = `You are an elite English exam preparation tutor for Chinese students (preparing for exams like CET-4, CET-6, Postgraduate Entrance Exam / Kaoyan, TOEFL, IELTS).
Your task is to analyze the provided English question, its options, and the passage context, then return a detailed, professional explanation in Chinese in a clean JSON format.

Specifically, your JSON response must contain:
1. "detailedExplanation": A rich, comprehensive analysis in Chinese explaining why the correct answer is indeed correct and how a student should think to arrive at this answer.
2. "sourceQuote": The EXACT original English sentence or phrase from the passage where this answer's evidence is found. Do not summarize this; quote it literally from the passage text. If no passage is available, use the context sentence from the question stem.
3. "sourceQuoteTranslation": A highly polished, professional Chinese translation of the "sourceQuote".
4. "sourceLocation": The precise location of the quote in the passage, expressed naturally in Chinese (e.g. "第1段第3句", "第3段最后一句"). If there is no passage, say "题干句".
5. "optionAnalysis": A list containing an analysis for EVERY single option (A, B, C, D). For each option, provide:
   - "key": The option letter (e.g. "A").
   - "isCorrect": true if it's the correct answer, false otherwise.
   - "explanation": A detailed, friendly explanation in Chinese of why this specific option is correct or incorrect (e.g. why it's a trap, how it distorts the original text, or what it means).
6. "keyVocabulary": A list of 2-3 key words or expressions found in the question or the local sentence, with:
   - "word": The word or expression.
   - "definition": Its part of speech and Chinese definition (e.g. "v. 承认，认可").

Ensure the tone is warm, encouraging, authoritative, and educational. Use clear and precise Chinese. Do not include markdown tags inside JSON string fields.`;

      const optionsStr = options.map((opt) => `${opt.key}. ${opt.text}`).join("\n");
      const userPrompt = `
[Passage]
${passage || "No passage text available."}

[Question]
${questionStem}

[Options]
${optionsStr}

[Correct Answer]
${correctAnswer}

[Original/Draft Explanation]
${originalExplanation || "None"}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              detailedExplanation: { type: Type.STRING },
              sourceQuote: { type: Type.STRING },
              sourceQuoteTranslation: { type: Type.STRING },
              sourceLocation: { type: Type.STRING },
              optionAnalysis: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    key: { type: Type.STRING },
                    isCorrect: { type: Type.BOOLEAN },
                    explanation: { type: Type.STRING },
                  },
                  required: ["key", "isCorrect", "explanation"],
                },
              },
              keyVocabulary: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    definition: { type: Type.STRING },
                  },
                  required: ["word", "definition"],
                },
              },
            },
            required: [
              "detailedExplanation",
              "sourceQuote",
              "sourceQuoteTranslation",
              "sourceLocation",
              "optionAnalysis",
              "keyVocabulary",
            ],
          },
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error("No response from AI explainer model.");
      }

      return JSON.parse(text) as ExplainerResult;
    } catch (error) {
      console.error("AI Explainer Error:", error);
      throw error;
    }
  });
