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

export interface TranslationResult {
  word: string;
  phonetic: string;
  commonDefinitions: string[];
  contextDefinition: string;
  example: string;
  exampleTranslation: string;
}

export const translateWord = createServerFn({ method: "POST" })
  .validator(
    z.object({
      word: z.string(),
      context: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { word, context } = data;
    try {
      const ai = getAiClient();

      const systemInstruction = `You are a professional English-to-Chinese dictionary translator for Chinese students studying for English exams (like Kaoyan, CET-4/6, TOEFL, etc.).
Given an English word and its optional context sentence/passage, return a JSON response containing:
1. "word": the base form of the word.
2. "phonetic": standard IPA phonetic notation of the word (e.g. "[ˈbrɔːdə(r)]").
3. "commonDefinitions": a list of common Chinese definitions with their part of speech (e.g. ["adj. 宽阔的，广阔的", "adv. 宽阔地"]).
4. "contextDefinition": the specific definition of the word as used in the given context sentence/passage (e.g. "adj. 更广泛的，更宽的").
5. "example": an English example sentence using the word.
6. "exampleTranslation": the Chinese translation of the example sentence.

Provide a highly accurate, natural, and helpful translation. Keep the JSON structure clean.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Word: "${word}"\nContext: "${context || ""}"`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              phonetic: { type: Type.STRING },
              commonDefinitions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              contextDefinition: { type: Type.STRING },
              example: { type: Type.STRING },
              exampleTranslation: { type: Type.STRING },
            },
            required: [
              "word",
              "phonetic",
              "commonDefinitions",
              "contextDefinition",
              "example",
              "exampleTranslation",
            ],
          },
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error("No response from AI translation model.");
      }

      return JSON.parse(text) as TranslationResult;
    } catch (error) {
      console.error("AI Translation Error:", error);
      throw error;
    }
  });
