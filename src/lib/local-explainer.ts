import type { ReadingMaterial, ReadingQuestion } from "./reading-materials";
import { lookupWord } from "./dictionary";

export interface LocalExplainerResult {
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

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "of",
  "to",
  "in",
  "on",
  "at",
  "for",
  "with",
  "from",
  "by",
  "as",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "that",
  "this",
  "these",
  "those",
  "it",
  "its",
  "they",
  "them",
  "their",
  "he",
  "she",
  "his",
  "her",
  "we",
  "our",
  "you",
  "your",
  "which",
  "what",
  "when",
  "where",
  "who",
  "whom",
  "why",
  "how",
  "can",
  "could",
  "may",
  "might",
  "must",
  "should",
  "would",
  "will",
  "shall",
  "than",
  "then",
  "into",
  "about",
  "over",
  "under",
  "after",
  "before",
  "while",
  "through",
  "across",
  "more",
  "most",
  "very",
  "much",
  "many",
  "some",
  "any",
  "all",
  "each",
  "every",
  "not",
  "no",
  "only",
  "also",
  "such",
]);

const ABSOLUTE_WORDS = ["all", "only", "always", "never", "must", "entirely", "completely"];

interface SentenceMatch {
  paragraphIndex: number;
  sentenceIndex: number;
  text: string;
  translation: string;
  score: number;
}

function normalizeText(input: string): string {
  return input.replace(/[’]/g, "'").replace(/\s+/g, " ").trim();
}

function tokenize(input: string): string[] {
  return normalizeText(input)
    .toLowerCase()
    .match(/[a-z]+(?:-[a-z]+)*/g)?.filter((token) => token.length > 1 && !STOP_WORDS.has(token)) ?? [];
}

function splitEnglishSentences(text: string): string[] {
  const normalized = normalizeText(text);
  const sentences = normalized.match(/[^.!?]+[.!?]?/g)?.map((item) => item.trim()) ?? [];
  return sentences.filter(Boolean);
}

function splitChineseSentences(text: string): string[] {
  return text
    .split(/(?<=[。！？；])/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function extractQuotedFragments(text: string): string[] {
  const quoted: string[] = [];
  for (const match of text.matchAll(/['"]([^'"]{4,})['"]/g)) {
    const value = match[1].trim();
    if (/[A-Za-z]/.test(value)) quoted.push(value);
  }
  return quoted;
}

function sentenceOverlapScore(sentence: string, keywords: string[], fragments: string[]): number {
  const lowerSentence = sentence.toLowerCase();
  let score = 0;

  for (const fragment of fragments) {
    if (lowerSentence.includes(fragment.toLowerCase())) {
      score += Math.max(8, tokenize(fragment).length * 4);
    }
  }

  const sentenceTokens = new Set(tokenize(sentence));
  for (const keyword of keywords) {
    if (sentenceTokens.has(keyword)) {
      score += keyword.length > 6 ? 3 : 2;
    }
  }

  return score;
}

function locateBestSentence(material: ReadingMaterial, question: ReadingQuestion): SentenceMatch | null {
  const fragments = [
    ...extractQuotedFragments(question.explain),
    ...extractQuotedFragments(question.stem),
  ];
  const correctOption = question.options.find((option) => option.key === question.answer)?.text ?? "";
  const keywords = Array.from(
    new Set([
      ...tokenize(question.stem),
      ...tokenize(correctOption),
      ...tokenize(question.explain),
      ...fragments.flatMap((fragment) => tokenize(fragment)),
    ]),
  );

  let bestMatch: SentenceMatch | null = null;

  material.paragraphs.forEach((paragraph, paragraphIndex) => {
    const englishSentences = splitEnglishSentences(paragraph.text);
    const chineseSentences = splitChineseSentences(paragraph.translation);

    englishSentences.forEach((sentence, sentenceIndex) => {
      const score = sentenceOverlapScore(sentence, keywords, fragments);
      if (!bestMatch || score > bestMatch.score) {
        bestMatch = {
          paragraphIndex,
          sentenceIndex,
          text: sentence,
          translation:
            chineseSentences[sentenceIndex] ??
            chineseSentences[0] ??
            paragraph.translation ??
            "暂无对应译文。",
          score,
        };
      }
    });
  });

  return bestMatch;
}

function summarizeQuestionType(type: string): string {
  if (type.includes("细节")) return "先锁定题干中的关键信息，再回原文做一一对应";
  if (type.includes("推理")) return "先找原文依据，再做最小幅度推断，避免过度脑补";
  if (type.includes("词汇")) return "优先看目标词所在句，再结合上下文判断词义和感情色彩";
  if (type.includes("主旨")) return "通读段落重点句，优先归纳反复出现的中心信息";
  return "先定位原文依据，再用排除法核对各选项";
}

function buildWrongOptionReason(optionText: string, sourceQuote: string): string {
  const lowerOption = optionText.toLowerCase();
  const lowerSource = sourceQuote.toLowerCase();
  const optionTokens = tokenize(optionText);
  const sourceTokens = new Set(tokenize(sourceQuote));
  const overlap = optionTokens.filter((token) => sourceTokens.has(token)).length;

  if (ABSOLUTE_WORDS.some((token) => lowerOption.includes(token)) && !ABSOLUTE_WORDS.some((token) => lowerSource.includes(token))) {
    return "该项用了更绝对的说法，但定位句并没有给出这么强的限定，属于程度放大。";
  }

  if (overlap === 0) {
    return "该项和定位句缺少直接对应信息，属于原文未提及或无中生有。";
  }

  return "该项和定位句看似相关，但关键信息点没有与原文准确对齐，属于偷换概念或推断过度。";
}

function buildKeyVocabulary(sourceQuote: string, material: ReadingMaterial) {
  const selected: { word: string; definition: string }[] = [];
  const seen = new Set<string>();

  for (const token of tokenize(sourceQuote)) {
    const found = lookupWord(token, material.vocabulary);
    if (!found.definition.includes("点击右侧星号可一键收藏到生词本")) {
      const key = found.word.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        selected.push({ word: found.word, definition: found.definition });
      }
    }
    if (selected.length >= 4) break;
  }

  return selected;
}

export function buildLocalQuestionExplanation(
  material: ReadingMaterial,
  question: ReadingQuestion,
): LocalExplainerResult {
  const match = locateBestSentence(material, question);
  const correctOption = question.options.find((option) => option.key === question.answer);

  const sourceQuote = match?.text ?? question.stem;
  const sourceLocation = match
    ? `${material.paragraphs[match.paragraphIndex]?.pId ?? `第${match.paragraphIndex + 1}段`} 第${match.sentenceIndex + 1}句`
    : "题干定位";
  const sourceQuoteTranslation = match?.translation ?? "暂无对应定位译文，请结合上方段落翻译理解。";

  const detailedExplanation = [
    summarizeQuestionType(question.type),
    question.explain.replace(/^正确答案\s*[A-D][：:]\s*/, ""),
    correctOption ? `本题最终应落到选项 ${correctOption.key}，因为它和定位句中的核心信息对应最完整。` : "",
  ]
    .filter(Boolean)
    .join("。");

  const optionAnalysis = question.options.map((option) => ({
    key: option.key,
    isCorrect: option.key === question.answer,
    explanation:
      option.key === question.answer
        ? `该项与定位句中的关键信息直接对应，且与题干问法保持一致，所以应选 ${option.key}。`
        : buildWrongOptionReason(option.text, sourceQuote),
  }));

  return {
    detailedExplanation,
    sourceQuote,
    sourceQuoteTranslation,
    sourceLocation,
    optionAnalysis,
    keyVocabulary: buildKeyVocabulary(sourceQuote, material),
  };
}
