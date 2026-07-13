export type BankCategory = "gaokao" | "zhongkao" | "kaoyan" | "toefl" | "ielts";

export const categories: { id: BankCategory; name: string; sub: string }[] = [
  { id: "gaokao", name: "高考", sub: "College Entrance" },
  { id: "zhongkao", name: "中考", sub: "High School Entrance" },
  { id: "kaoyan", name: "考研", sub: "Postgraduate" },
  { id: "toefl", name: "托福", sub: "TOEFL" },
  { id: "ielts", name: "雅思", sub: "IELTS" },
];

export type Bank = {
  id: string;
  category: BankCategory;
  name: string;
  desc: string;
  total: number;
  finished: number;
  updated: string;
  color: "mint" | "sky" | "butter" | "blush";
};

export const banks: Bank[] = [
  { id: "gaokao-3500", category: "gaokao", name: "高考核心 3500", desc: "教育部大纲词汇 · 高频真题精编", total: 3500, finished: 1240, updated: "2026-07-01", color: "mint" },
  { id: "gaokao-quzhen", category: "gaokao", name: "高考真题 2015–2026", desc: "全国卷 + 新高考卷完形与阅读", total: 1800, finished: 560, updated: "2026-06-20", color: "sky" },
  { id: "zhongkao-1600", category: "zhongkao", name: "中考核心 1600", desc: "初中新课标词汇同步", total: 1600, finished: 320, updated: "2026-05-11", color: "butter" },
  { id: "kaoyan-yi", category: "kaoyan", name: "考研英语一", desc: "2010–2026 真题词汇 + 长难句", total: 5500, finished: 2130, updated: "2026-07-10", color: "mint" },
  { id: "kaoyan-er", category: "kaoyan", name: "考研英语二", desc: "MBA/MPA 常考题源", total: 4200, finished: 890, updated: "2026-07-05", color: "blush" },
  { id: "toefl-tpo", category: "toefl", name: "TOEFL TPO 精选", desc: "TPO 1–75 词汇题与同义替换", total: 3800, finished: 410, updated: "2026-06-30", color: "sky" },
  { id: "ielts-cambridge", category: "ielts", name: "剑桥雅思 4–19", desc: "剑雅真题词汇 · 场景归类", total: 4600, finished: 780, updated: "2026-07-08", color: "butter" },
];

export type Question = {
  id: string;
  bankId: string;
  word: string;
  phonetic: string;
  stem: string;
  options: { key: string; text: string }[];
  answer: string;
  explain: string;
  tag: string;
};

const stems = [
  "The scientist's ___ approach to the problem impressed the entire committee.",
  "Despite the heavy rain, the team remained ___ about finishing the project on time.",
  "Her ___ knowledge of ancient languages made her invaluable to the museum.",
  "The company decided to ___ its operations to reduce unnecessary costs.",
  "The professor gave a ___ lecture that fascinated every student in the hall.",
  "He tried to ___ the difficulty of the exam, but everyone knew it was hard.",
  "The two nations reached a ___ agreement after weeks of negotiation.",
  "She showed a ___ interest in classical music from a very early age.",
];

const words = [
  { w: "meticulous", p: "/məˈtɪkjələs/", tag: "adj." },
  { w: "optimistic", p: "/ˌɒptɪˈmɪstɪk/", tag: "adj." },
  { w: "profound", p: "/prəˈfaʊnd/", tag: "adj." },
  { w: "streamline", p: "/ˈstriːmlaɪn/", tag: "v." },
  { w: "captivating", p: "/ˈkæptɪveɪtɪŋ/", tag: "adj." },
  { w: "downplay", p: "/ˌdaʊnˈpleɪ/", tag: "v." },
  { w: "tentative", p: "/ˈtentətɪv/", tag: "adj." },
  { w: "keen", p: "/kiːn/", tag: "adj." },
];

const distractors = ["superficial", "reluctant", "trivial", "expand", "boring", "exaggerate", "hostile", "vague"];

export function getBank(id: string): Bank | undefined {
  return banks.find((b) => b.id === id);
}

export function getQuestions(bankId: string): Question[] {
  const bank = getBank(bankId);
  if (!bank) return [];
  const count = Math.min(48, Math.max(24, Math.floor(bank.total / 80)));
  const list: Question[] = [];
  for (let i = 0; i < count; i++) {
    const w = words[i % words.length];
    const s = stems[i % stems.length];
    const answerIdx = i % 4;
    const opts = ["A", "B", "C", "D"].map((k, idx) => ({
      key: k,
      text: idx === answerIdx ? w.w : distractors[(i + idx) % distractors.length],
    }));
    list.push({
      id: `${bankId}-${i + 1}`,
      bankId,
      word: w.w,
      phonetic: w.p,
      stem: s.replace("___", "______"),
      options: opts,
      answer: opts[answerIdx].key,
      explain: `正确答案 ${opts[answerIdx].key}：${w.w} ${w.p} 意为「${["细致的", "乐观的", "深刻的", "精简", "引人入胜的", "淡化", "试探性的", "热衷的"][i % 8]}」，符合语境。`,
      tag: `${bank.name} · 第 ${Math.floor(i / 10) + 1} 组`,
    });
  }
  return list;
}

const FAV_KEY = "wm.favorites";

export function loadFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(FAV_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

export function saveFavorites(favs: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAV_KEY, JSON.stringify([...favs]));
}
