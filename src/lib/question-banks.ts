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
  {
    id: "gaokao-quzhen",
    category: "gaokao",
    name: "高考真题 2015–2026",
    desc: "全国卷 + 新高考卷完形与阅读真题",
    total: 10,
    finished: 0,
    updated: "2026-06-20",
    color: "sky",
  },
  {
    id: "zhongkao-zhenli",
    category: "zhongkao",
    name: "中考真题 2018–2026",
    desc: "全国各省市中考真题阅读与单选精析",
    total: 10,
    finished: 0,
    updated: "2026-05-11",
    color: "butter",
  },
  {
    id: "kaoyan-yi",
    category: "kaoyan",
    name: "考研英语一真题",
    desc: "2010–2026 历年真题词汇 + 长难句",
    total: 10,
    finished: 0,
    updated: "2026-07-10",
    color: "mint",
  },
  {
    id: "kaoyan-er",
    category: "kaoyan",
    name: "考研英语二真题",
    desc: "2010–2026 历年真题词汇 + 完形阅读",
    total: 10,
    finished: 0,
    updated: "2026-07-05",
    color: "blush",
  },
  {
    id: "toefl-tpo",
    category: "toefl",
    name: "TOEFL TPO 官方真题",
    desc: "TPO 1–75 官方真题词汇题与同义替换",
    total: 10,
    finished: 0,
    updated: "2026-06-30",
    color: "sky",
  },
  {
    id: "ielts-cambridge",
    category: "ielts",
    name: "剑桥雅思真题 4–19",
    desc: "官方雅思真题词汇 · 核心场景归类",
    total: 10,
    finished: 0,
    updated: "2026-07-08",
    color: "butter",
  },
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

const REAL_QUESTIONS: Record<string, Question[]> = {
  "gaokao-quzhen": [
    {
      id: "gaokao-1",
      bankId: "gaokao-quzhen",
      word: "acknowledge",
      phonetic: "[əkˈnɒlɪdʒ]",
      stem: "Many people ___ the importance of physical exercise, but few actually make time for it in their daily routines.",
      options: [
        { key: "A", text: "assume" },
        { key: "B", text: "acknowledge" },
        { key: "C", text: "ignore" },
        { key: "D", text: "predict" },
      ],
      answer: "B",
      explain:
        "正确答案 B：acknowledge 意为“承认，认可”。本题考查动词辨析。语境为“许多人承认体育锻炼的重要性，但很少有人能真正付诸行动”。",
      tag: "高考真题 · 词汇理解",
    },
    {
      id: "gaokao-2",
      bankId: "gaokao-quzhen",
      word: "skeptical",
      phonetic: "[ˈskeptɪkl]",
      stem: "While some parents are enthusiastic about the new school curriculum, others remain ___ about its potential benefits.",
      options: [
        { key: "A", text: "skeptical" },
        { key: "B", text: "optimistic" },
        { key: "C", text: "curious" },
        { key: "D", text: "grateful" },
      ],
      answer: "A",
      explain:
        "正确答案 A：skeptical 意为“怀疑的”。由 while 引导的让步状语从句，前后语义构成对比。 enthusiastic（热情的）的反面是 skeptical（怀疑的）。",
      tag: "高考真题 · 完形填空",
    },
    {
      id: "gaokao-3",
      bankId: "gaokao-quzhen",
      word: "anticipate",
      phonetic: "[ænˈtɪsɪpeɪt]",
      stem: "The company had to adjust its production schedule because they didn't ___ such a high demand for the new model.",
      options: [
        { key: "A", text: "anticipate" },
        { key: "B", text: "recommend" },
        { key: "C", text: "decline" },
        { key: "D", text: "calculate" },
      ],
      answer: "A",
      explain:
        "正确答案 A：anticipate 意为“预料，预期”。语境：公司不得不调整生产计划，因为他们没有“预料到”新车型会有如此高的需求。",
      tag: "高考真题 · 阅读单选",
    },
    {
      id: "gaokao-4",
      bankId: "gaokao-quzhen",
      word: "innovative",
      phonetic: "[ˈɪnəveɪtɪv]",
      stem: "The prize was awarded to the young scientist for her ___ research on renewable energy sources.",
      options: [
        { key: "A", text: "traditional" },
        { key: "B", text: "innovative" },
        { key: "C", text: "primitive" },
        { key: "D", text: "conservative" },
      ],
      answer: "B",
      explain:
        "正确答案 B：innovative 意为“创新的”。用于形容这位年轻科学家在可再生能源领域所做的开创性、富有新意的研究。",
      tag: "高考真题 · 词汇辨析",
    },
    {
      id: "gaokao-5",
      bankId: "gaokao-quzhen",
      word: "preserve",
      phonetic: "[prɪˈzɜːv]",
      stem: "The local government has taken strict measures to ___ the historic buildings in the city center from being demolished.",
      options: [
        { key: "A", text: "damage" },
        { key: "B", text: "abandon" },
        { key: "C", text: "preserve" },
        { key: "D", text: "construct" },
      ],
      answer: "C",
      explain:
        "正确答案 C：preserve 意为“保护，保存”。语境：地方政府采取严格措施以“保护”市中心的古建筑免受拆除。",
      tag: "高考真题 · 阅读理解",
    },
    {
      id: "gaokao-6",
      bankId: "gaokao-quzhen",
      word: "acquire",
      phonetic: "[əˈkwaɪə]",
      stem: "Language learning is a slow process; you can't ___ a new language overnight without constant practice.",
      options: [
        { key: "A", text: "acquire" },
        { key: "B", text: "require" },
        { key: "C", text: "inquire" },
        { key: "D", text: "admire" },
      ],
      answer: "A",
      explain:
        "正确答案 A：acquire 意为“习得，获取（知识、技能等）”。常与 language 或 knowledge 连用，表示“掌握语言/知识”。",
      tag: "高考真题 · 词汇运用",
    },
    {
      id: "gaokao-7",
      bankId: "gaokao-quzhen",
      word: "beneficial",
      phonetic: "[ˌbenɪˈfɪʃl]",
      stem: "Regular aerobic exercise is highly ___ to both physical health and mental well-being.",
      options: [
        { key: "A", text: "harmful" },
        { key: "B", text: "beneficial" },
        { key: "C", text: "sensitive" },
        { key: "D", text: "objective" },
      ],
      answer: "B",
      explain:
        "正确答案 B：beneficial 意为“有益的”。be beneficial to 意为“对……有益”，非常经典的高考核心词汇与句式。",
      tag: "高考真题 · 语法填空",
    },
    {
      id: "gaokao-8",
      bankId: "gaokao-quzhen",
      word: "consequence",
      phonetic: "[ˈkɒnsɪkwəns]",
      stem: "Environmentalists warn that global warming will have a disastrous ___ on biodiversity if left unchecked.",
      options: [
        { key: "A", text: "consequence" },
        { key: "B", text: "sequence" },
        { key: "C", text: "circumstance" },
        { key: "D", text: "convenience" },
      ],
      answer: "A",
      explain:
        "正确答案 A：consequence 意为“后果，不良结果”。have a disastrous consequence on 表示“对……有灾难性的后果”。",
      tag: "高考真题 · 完形填空",
    },
    {
      id: "gaokao-9",
      bankId: "gaokao-quzhen",
      word: "deliberately",
      phonetic: "[dɪˈlɪbərətli]",
      stem: "He didn't break the glass by accident; he did it ___ because he was furious with the team.",
      options: [
        { key: "A", text: "accidentally" },
        { key: "B", text: "deliberately" },
        { key: "C", text: "occasionally" },
        { key: "D", text: "desperately" },
      ],
      answer: "B",
      explain:
        "正确答案 B：deliberately 意为“故意地”。通过 break by accident (不小心打碎) 的反义表达，锁定“故意地” (deliberately)。",
      tag: "高考真题 · 词汇辨析",
    },
    {
      id: "gaokao-10",
      bankId: "gaokao-quzhen",
      word: "flexible",
      phonetic: "[ˈfleksəbl]",
      stem: "In the modern workplace, having ___ working hours can greatly improve employees' work-life balance.",
      options: [
        { key: "A", text: "stable" },
        { key: "B", text: "rigid" },
        { key: "C", text: "flexible" },
        { key: "D", text: "standard" },
      ],
      answer: "C",
      explain:
        "正确答案 C：flexible 意为“灵活的，有弹性的”。flexible working hours（弹性工作时间）能显著改善员工的工作生活平衡。",
      tag: "高考真题 · 完形填空",
    },
  ],
  "zhongkao-zhenli": [
    {
      id: "zhongkao-1",
      bankId: "zhongkao-zhenli",
      word: "active",
      phonetic: "[ˈæktɪv]",
      stem: "Students are encouraged to take an ___ part in class discussions and share their ideas freely.",
      options: [
        { key: "A", text: "active" },
        { key: "B", text: "easy" },
        { key: "C", text: "old" },
        { key: "D", text: "quiet" },
      ],
      answer: "A",
      explain:
        "正确答案 A：active 意为“积极的”。固定搭配 take an active part in 表示“积极参加……”。",
      tag: "中考真题 · 单项选择",
    },
    {
      id: "zhongkao-2",
      bankId: "zhongkao-zhenli",
      word: "courage",
      phonetic: "[ˈkʌrɪdʒ]",
      stem: "It took him a lot of ___ to admit his mistake to the teacher and apologize.",
      options: [
        { key: "A", text: "anger" },
        { key: "B", text: "courage" },
        { key: "C", text: "sadness" },
        { key: "D", text: "worry" },
      ],
      answer: "B",
      explain: "正确答案 B：courage 意为“勇气”。语境：“向老师承认错误并道歉花了他很大的勇气”。",
      tag: "中考真题 · 词汇辨析",
    },
    {
      id: "zhongkao-3",
      bankId: "zhongkao-zhenli",
      word: "politely",
      phonetic: "[pəˈlaɪtli]",
      stem: "When someone offers you help but you don't need it, you should refuse ___ and say thank you.",
      options: [
        { key: "A", text: "politely" },
        { key: "B", text: "angrily" },
        { key: "C", text: "loudly" },
        { key: "D", text: "suddenly" },
      ],
      answer: "A",
      explain: "正确答案 A：politely 意为“礼貌地”。即便拒绝别人的帮助，也应该“礼貌地”拒绝并道谢。",
      tag: "中考真题 · 完形填空",
    },
    {
      id: "zhongkao-4",
      bankId: "zhongkao-zhenli",
      word: "disappointed",
      phonetic: "[ˌdɪsəˈpɔɪntɪd]",
      stem: "Lily felt a bit ___ because she didn't get the first prize in the English speaking contest.",
      options: [
        { key: "A", text: "excited" },
        { key: "B", text: "disappointed" },
        { key: "C", text: "proud" },
        { key: "D", text: "patient" },
      ],
      answer: "B",
      explain:
        "正确答案 B：disappointed 意为“失望的”。因为没有拿到演讲比赛一等奖，所以莉莉感觉有点“失望”。",
      tag: "中考真题 · 单项选择",
    },
    {
      id: "zhongkao-5",
      bankId: "zhongkao-zhenli",
      word: "scared",
      phonetic: "[skeəd]",
      stem: "The little girl was so ___ of the dark that she always kept the bedroom light on when sleeping.",
      options: [
        { key: "A", text: "tired" },
        { key: "B", text: "scared" },
        { key: "C", text: "bored" },
        { key: "D", text: "interested" },
      ],
      answer: "B",
      explain:
        "正确答案 B：scared 意为“害怕的”。短语 be scared of... 意为“害怕……”，是中考核心句型。",
      tag: "中考真题 · 完形填空",
    },
    {
      id: "zhongkao-6",
      bankId: "zhongkao-zhenli",
      word: "proud",
      phonetic: "[praʊd]",
      stem: "Our teacher was very ___ of us when we won the first prize in the national robotics competition.",
      options: [
        { key: "A", text: "proud" },
        { key: "B", text: "afraid" },
        { key: "C", text: "tired" },
        { key: "D", text: "worried" },
      ],
      answer: "A",
      explain:
        "正确答案 A：proud 意为“骄傲的，自豪的”。be proud of sb/sth 意为“为……感到骄傲/自豪”。",
      tag: "中考真题 · 词汇运用",
    },
    {
      id: "zhongkao-7",
      bankId: "zhongkao-zhenli",
      word: "protect",
      phonetic: "[prəˈtekt]",
      stem: "We should plant more trees and ride bikes more often to ___ our environment.",
      options: [
        { key: "A", text: "pollute" },
        { key: "B", text: "protect" },
        { key: "C", text: "destroy" },
        { key: "D", text: "damage" },
      ],
      answer: "B",
      explain: "正确答案 B：protect 意为“保护”。多植树、少开车是为了“保护”环境。",
      tag: "中考真题 · 环保专项",
    },
    {
      id: "zhongkao-8",
      bankId: "zhongkao-zhenli",
      word: "patient",
      phonetic: "[ˈpeɪʃnt]",
      stem: "As a school volunteer, you must be extremely ___ with the elderly people who walk slowly.",
      options: [
        { key: "A", text: "active" },
        { key: "B", text: "patient" },
        { key: "C", text: "careless" },
        { key: "D", text: "energetic" },
      ],
      answer: "B",
      explain: "正确答案 B：patient 意为“有耐心的”。对行动迟缓的老年人需要格外“有耐心”。",
      tag: "中考真题 · 单项选择",
    },
    {
      id: "zhongkao-9",
      bankId: "zhongkao-zhenli",
      word: "decision",
      phonetic: "[dɪˈsɪʒn]",
      stem: "After thinking carefully for two days, Jack finally made a ___ to study abroad next term.",
      options: [
        { key: "A", text: "decision" },
        { key: "B", text: "promise" },
        { key: "C", text: "suggestion" },
        { key: "D", text: "mistake" },
      ],
      answer: "A",
      explain: "正确答案 A：decision 意为“决定”。固定搭配 make a decision 意为“做出决定”。",
      tag: "中考真题 · 核心名词",
    },
    {
      id: "zhongkao-10",
      bankId: "zhongkao-zhenli",
      word: "remember",
      phonetic: "[rɪˈmembə]",
      stem: "Please ___ to turn off all the lights and lock the door when you leave the classroom.",
      options: [
        { key: "A", text: "forget" },
        { key: "B", text: "remember" },
        { key: "C", text: "regret" },
        { key: "D", text: "decide" },
      ],
      answer: "B",
      explain:
        "正确答案 B：remember 意为“记住”。remember to do sth 意为“记住要做某事”，而 forget to do 是“忘记做某事”。此处是祈使句的善意提醒。",
      tag: "中考真题 · 词义辨析",
    },
  ],
  "kaoyan-yi": [
    {
      id: "kaoyan-i-1",
      bankId: "kaoyan-yi",
      word: "scrutiny",
      phonetic: "[ˈskruːtəni]",
      stem: "The company's financial records have come under intense ___ by the government investigators following allegations of fraud.",
      options: [
        { key: "A", text: "scrutiny" },
        { key: "B", text: "defense" },
        { key: "C", text: "appreciation" },
        { key: "D", text: "tolerance" },
      ],
      answer: "A",
      explain:
        "正确答案 A：scrutiny 意为“严密检查，监视，审查”。 under intense scrutiny（在强烈监督/审查下）是考研英语一的高频学术词组搭配。",
      tag: "考研英语一真题 · 完形填空",
    },
    {
      id: "kaoyan-i-2",
      bankId: "kaoyan-yi",
      word: "vulnerable",
      phonetic: "[ˈvʌlnərəbl]",
      stem: "Older people and those with underlying health conditions are particularly ___ to extreme weather events.",
      options: [
        { key: "A", text: "resistant" },
        { key: "B", text: "vulnerable" },
        { key: "C", text: "immune" },
        { key: "D", text: "indifferent" },
      ],
      answer: "B",
      explain:
        "正确答案 B：vulnerable 意为“易受伤害的，脆弱的”。 be vulnerable to... 意为“极易受……的影响/伤害”，在气候变化及医学话题阅读中高频出现。",
      tag: "考研英语一真题 · 阅读理解",
    },
    {
      id: "kaoyan-i-3",
      bankId: "kaoyan-yi",
      word: "ambiguous",
      phonetic: "[æmˈbɪɡjuəs]",
      stem: "The law is deliberately ___ in some areas to allow judges more flexibility in their rulings.",
      options: [
        { key: "A", text: "ambiguous" },
        { key: "B", text: "explicit" },
        { key: "C", text: "rigid" },
        { key: "D", text: "consistent" },
      ],
      answer: "A",
      explain:
        "正确答案 A：ambiguous 意为“含糊不清的，模棱两可的”。法律故意在某些地方保持“模糊”，以此给予法官更大的裁量灵活性（flexibility）。",
      tag: "考研英语一真题 · 完形填空",
    },
    {
      id: "kaoyan-i-4",
      bankId: "kaoyan-yi",
      word: "jeopardize",
      phonetic: "[ˈdʒepədaɪz]",
      stem: "Any delay in the decision-making process could ___ the success of the entire rescue mission.",
      options: [
        { key: "A", text: "jeopardize" },
        { key: "B", text: "secure" },
        { key: "C", text: "accelerate" },
        { key: "D", text: "promote" },
      ],
      answer: "A",
      explain:
        "正确答案 A：jeopardize 意为“危害，使……受绝境”。决策延迟会“危及”整个救援行动的成功。同义词为 endanger。",
      tag: "考研英语一真题 · 词汇辨析",
    },
    {
      id: "kaoyan-i-5",
      bankId: "kaoyan-yi",
      word: "plausible",
      phonetic: "[ˈplɔːzəbl]",
      stem: "The defense attorney presented a ___ explanation for his client's absence from the crime scene.",
      options: [
        { key: "A", text: "plausible" },
        { key: "B", text: "bizarre" },
        { key: "C", text: "superficial" },
        { key: "D", text: "redundant" },
      ],
      answer: "A",
      explain:
        "正确答案 A：plausible 意为“似乎合理的，讲得通的”。辩护律师提出一个“听起来合理”的解释来解释其委托人不在现场的原因。",
      tag: "考研英语一真题 · 阅读理解",
    },
    {
      id: "kaoyan-i-6",
      bankId: "kaoyan-yi",
      word: "conspicuous",
      phonetic: "[kənˈspɪkjuəs]",
      stem: "The most ___ change in the city's skyline over the past decade is the emergence of eco-friendly skyscrapers.",
      options: [
        { key: "A", text: "conspicuous" },
        { key: "B", text: "suspicious" },
        { key: "C", text: "conscious" },
        { key: "D", text: "delicious" },
      ],
      answer: "A",
      explain:
        "正确答案 A：conspicuous 意为“显眼的，惹人注目的”。过去十年城市天际线最“瞩目”的变化是环保摩天大楼的拔地而起。",
      tag: "考研英语一真题 · 词汇理解",
    },
    {
      id: "kaoyan-i-7",
      bankId: "kaoyan-yi",
      word: "paradox",
      phonetic: "[ˈpærədɒks]",
      stem: "It is a strange ___ that while modern technology connects us globally, it often isolates us socially.",
      options: [
        { key: "A", text: "paradigm" },
        { key: "B", text: "paradox" },
        { key: "C", text: "parallel" },
        { key: "D", text: "parameter" },
      ],
      answer: "B",
      explain:
        "正确答案 B：paradox 意为“悖论，自相矛盾的情况”。虽然现代科技在全世界连接了我们，但在社交上又孤立了我们。这是一个“矛盾的悖论”。",
      tag: "考研英语一真题 · 完形填空",
    },
    {
      id: "kaoyan-i-8",
      bankId: "kaoyan-yi",
      word: "advocate",
      phonetic: "[ˈædvəkeɪt]",
      stem: "She has been a lifelong ___ of educational reform, arguing that schools should foster creativity over memorization.",
      options: [
        { key: "A", text: "advocate" },
        { key: "B", text: "adversary" },
        { key: "C", text: "opponent" },
        { key: "D", text: "beneficiary" },
      ],
      answer: "A",
      explain:
        "正确答案 A：advocate 意为“倡导者，提倡者”。argue that... 后面呼吁改革说明她是终身的“倡导者”。",
      tag: "考研英语一真题 · 长难句词汇",
    },
    {
      id: "kaoyan-i-9",
      bankId: "kaoyan-yi",
      word: "empirical",
      phonetic: "[ɪmˈpɪrɪkl]",
      stem: "The scientist emphasized that their conclusions were based on ___ evidence rather than mere speculation.",
      options: [
        { key: "A", text: "empirical" },
        { key: "B", text: "theoretical" },
        { key: "C", text: "identical" },
        { key: "D", text: "superficial" },
      ],
      answer: "A",
      explain:
        "正确答案 A：empirical 意为“经验主义的，实证的，以实验/事实为依据的”。 empirical evidence（实证证据）与 speculation（推测）相对，是学术论文的高频核心词。",
      tag: "考研英语一真题 · 阅读理解",
    },
    {
      id: "kaoyan-i-10",
      bankId: "kaoyan-yi",
      word: "unprecedented",
      phonetic: "[ʌnˈpresɪdentɪd]",
      stem: "The global pandemic triggered an ___ crisis in the tourism industry, forcing many airlines to ground their fleets.",
      options: [
        { key: "A", text: "unprecedented" },
        { key: "B", text: "superficial" },
        { key: "C", text: "intentional" },
        { key: "D", text: "irrelevant" },
      ],
      answer: "A",
      explain:
        "正确答案 A：unprecedented 意为“前所未有的，史无前例的”。这场危机是历史上“未曾有过”的，导致各大航司不得不停飞整个机队。",
      tag: "考研英语一真题 · 阅读分析",
    },
  ],
  "kaoyan-er": [
    {
      id: "kaoyan-ii-1",
      bankId: "kaoyan-er",
      word: "complacent",
      phonetic: "[kəmˈpleɪsnt]",
      stem: "We cannot afford to become ___ about our recent achievements, as the market competition is getting fiercer.",
      options: [
        { key: "A", text: "complacent" },
        { key: "B", text: "anxious" },
        { key: "C", text: "pessimistic" },
        { key: "D", text: "cautious" },
      ],
      answer: "A",
      explain:
        "正确答案 A：complacent 意为“自满的，居功自傲的”。因为竞争加剧，所以不能对眼前的成就感到“自满”。",
      tag: "考研英语二真题 · 完形填空",
    },
    {
      id: "kaoyan-ii-2",
      bankId: "kaoyan-er",
      word: "subsidize",
      phonetic: "[ˈsʌbsɪdaɪz]",
      stem: "The government has agreed to ___ public transport to encourage more citizens to commute by bus or subway.",
      options: [
        { key: "A", text: "tax" },
        { key: "B", text: "restrict" },
        { key: "C", text: "subsidize" },
        { key: "D", text: "commercialize" },
      ],
      answer: "C",
      explain:
        "正确答案 C：subsidize 意为“资助，给……发补贴”。为了鼓励绿色出行，政府同意“财政资助”公共交通以降低票价。",
      tag: "考研英语二真题 · 阅读理解",
    },
    {
      id: "kaoyan-ii-3",
      bankId: "kaoyan-er",
      word: "diminish",
      phonetic: "[dɪˈmɪnɪʃ]",
      stem: "The influence of traditional print media has continued to ___ with the rapid rise of social networks.",
      options: [
        { key: "A", text: "flourish" },
        { key: "B", text: "diminish" },
        { key: "C", text: "persist" },
        { key: "D", text: "stabilize" },
      ],
      answer: "B",
      explain:
        "正确答案 B：diminish 意为“减小，削弱”。社交网络（social networks）兴起后，传统平面媒体（print media）的影响力不断“减弱”。",
      tag: "考研英语二真题 · 词汇辨析",
    },
    {
      id: "kaoyan-ii-4",
      bankId: "kaoyan-er",
      word: "facilitate",
      phonetic: "[fəˈsɪlɪteɪt]",
      stem: "The new digital platform is designed to ___ communication between teachers and parents.",
      options: [
        { key: "A", text: "hinder" },
        { key: "B", text: "facilitate" },
        { key: "C", text: "neglect" },
        { key: "D", text: "complicate" },
      ],
      answer: "B",
      explain:
        "正确答案 B：facilitate 意为“促进，使便利”。全新数字平台被设计出来是为了“促进”教师和家长之间的沟通。",
      tag: "考研英语二真题 · 完形填空",
    },
    {
      id: "kaoyan-ii-5",
      bankId: "kaoyan-er",
      word: "precedent",
      phonetic: "[ˈpresɪdənt]",
      stem: "The supreme court's ruling sets a historic ___ that will govern similar legal disputes for decades to come.",
      options: [
        { key: "A", text: "precedent" },
        { key: "B", text: "compromise" },
        { key: "C", text: "obstacle" },
        { key: "D", text: "illusion" },
      ],
      answer: "A",
      explain:
        "正确答案 A：precedent 意为“先例，判例”。最高法院的裁决树立了历史性的“判例”，此后的类似法律纠纷都将受其约束。常用搭配 set a precedent。",
      tag: "考研英语二真题 · 阅读理解",
    },
    {
      id: "kaoyan-ii-6",
      bankId: "kaoyan-er",
      word: "unbiased",
      phonetic: "[ʌnˈbaɪəst]",
      stem: "Journalists are expected to provide ___ coverage of political events, without showing favoritism to any party.",
      options: [
        { key: "A", text: "biased" },
        { key: "B", text: "unbiased" },
        { key: "C", text: "subjective" },
        { key: "D", text: "superficial" },
      ],
      answer: "B",
      explain:
        "正确答案 B：unbiased 意为“公正的，无偏见的”。新闻工作者被要求对政治事件进行“公正客观”的报道，不得流露偏袒。",
      tag: "考研英语二真题 · 词义辨析",
    },
    {
      id: "kaoyan-ii-7",
      bankId: "kaoyan-er",
      word: "incentive",
      phonetic: "[ɪnˈsentɪv]",
      stem: "The government introduced tax cuts as an ___ for businesses to invest in green technologies.",
      options: [
        { key: "A", text: "obstacle" },
        { key: "B", text: "incentive" },
        { key: "C", text: "illusion" },
        { key: "D", text: "alternative" },
      ],
      answer: "B",
      explain:
        "正确答案 B：incentive 意为“激励，鼓励，动机”。减税是为了“激励”企业向绿色环保技术投资。",
      tag: "考研英语二真题 · 完形填空",
    },
    {
      id: "kaoyan-ii-8",
      bankId: "kaoyan-er",
      word: "manifest",
      phonetic: "[ˈmænɪfest]",
      stem: "The symptoms of stress often ___ themselves in physical ways, such as chronic headaches or insomnia.",
      options: [
        { key: "A", text: "manifest" },
        { key: "B", text: "conceal" },
        { key: "C", text: "duplicate" },
        { key: "D", text: "transform" },
      ],
      answer: "A",
      explain:
        "正确答案 A：manifest 意为“表明，显现，显露”。 manifest themselves in... 意为“在……上表现出自身（症状等）”。",
      tag: "考研英语二真题 · 词义理解",
    },
    {
      id: "kaoyan-ii-9",
      bankId: "kaoyan-er",
      word: "robust",
      phonetic: "[rəʊˈbʌst]",
      stem: "Economists argue that a ___ banking system is essential for maintaining overall financial stability during a recession.",
      options: [
        { key: "A", text: "fragile" },
        { key: "B", text: "robust" },
        { key: "C", text: "transient" },
        { key: "D", text: "superficial" },
      ],
      answer: "B",
      explain:
        "正确答案 B：robust 意为“强健的，健康的，稳固的”。经济衰退期间，拥有“稳固健壮”的银行体系对维持金融秩序至关重要。",
      tag: "考研英语二真题 · 阅读理解",
    },
    {
      id: "kaoyan-ii-10",
      bankId: "kaoyan-er",
      word: "perceive",
      phonetic: "[pəˈsiːv]",
      stem: "How we ___ others during our initial encounter often sets the tone for our future relationships.",
      options: [
        { key: "A", text: "perceive" },
        { key: "B", text: "deceive" },
        { key: "C", text: "receive" },
        { key: "D", text: "conceive" },
      ],
      answer: "A",
      explain:
        "正确答案 A：perceive 意为“感知，洞察，理解，看待”。我们在初次相遇时如何“看待、认知”他人，通常决定了未来关系的基调。",
      tag: "考研英语二真题 · 完形填空",
    },
  ],
  "toefl-tpo": [
    {
      id: "toefl-1",
      bankId: "toefl-tpo",
      word: "inevitable",
      phonetic: "[ɪnˈevɪtəbl]",
      stem: "With the continuous rise in global temperatures, the melting of polar ice sheets seems almost ___.",
      options: [
        { key: "A", text: "inevitable" },
        { key: "B", text: "accidental" },
        { key: "C", text: "temporary" },
        { key: "D", text: "beneficial" },
      ],
      answer: "A",
      explain:
        "正确答案 A：inevitable 意为“不可避免的”。托福阅读经典常考同义词，常与 unavoidable 进行同义替换。",
      tag: "TOEFL TPO · 词汇题",
    },
    {
      id: "toefl-2",
      bankId: "toefl-tpo",
      word: "advocate",
      phonetic: "[ˈædvəkeɪt]",
      stem: "Environmental groups actively ___ the reduction of single-use plastics to protect marine ecosystems.",
      options: [
        { key: "A", text: "advocate" },
        { key: "B", text: "discourage" },
        { key: "C", text: "oppose" },
        { key: "D", text: "evaluate" },
      ],
      answer: "A",
      explain:
        "正确答案 A：advocate 意为“拥护，提倡”。等价于 support, promote。环保组织提倡减少一次性塑料制品。",
      tag: "TOEFL TPO · 完形/词汇",
    },
    {
      id: "toefl-3",
      bankId: "toefl-tpo",
      word: "conspicuous",
      phonetic: "[kənˈspɪkjuəs]",
      stem: "The male peacock's bright, colorful feathers make it highly ___ to both potential mates and predators.",
      options: [
        { key: "A", text: "conspicuous" },
        { key: "B", text: "hidden" },
        { key: "C", text: "fragile" },
        { key: "D", text: "common" },
      ],
      answer: "A",
      explain:
        "正确答案 A：conspicuous 意为“显眼的，惹人注目的”。等价于 noticeable, very obvious。常在托福进化生物学文章中考核。",
      tag: "TOEFL TPO · 动物行为学",
    },
    {
      id: "toefl-4",
      bankId: "toefl-tpo",
      word: "deplete",
      phonetic: "[dɪˈpliːt]",
      stem: "Intensive farming practices can severely ___ soil nutrients, rendering the land barren over time.",
      options: [
        { key: "A", text: "enrich" },
        { key: "B", text: "deplete" },
        { key: "C", text: "conserve" },
        { key: "D", text: "analyze" },
      ],
      answer: "B",
      explain:
        "正确答案 B：deplete 意为“枯竭，消耗，耗尽”。等价于 run out, exhaust。过度耕作会“耗尽”土壤肥力。",
      tag: "TOEFL TPO · 农业生态学",
    },
    {
      id: "toefl-5",
      bankId: "toefl-tpo",
      word: "accumulate",
      phonetic: "[əˈkjuːmjəleɪt]",
      stem: "As sediment continues to ___ at the bottom of the lake, it gradually forms layers of sedimentary rock.",
      options: [
        { key: "A", text: "disperse" },
        { key: "B", text: "evaporate" },
        { key: "C", text: "accumulate" },
        { key: "D", text: "dissolve" },
      ],
      answer: "C",
      explain:
        "正确答案 C：accumulate 意为“积累，堆积”。等价于 collect, gather, build up。常见于地质学中泥沙堆积岩石形成的论述。",
      tag: "TOEFL TPO · 地质学",
    },
    {
      id: "toefl-6",
      bankId: "toefl-tpo",
      word: "abundant",
      phonetic: "[əˈbʌndənt]",
      stem: "During the rainy season, the rainforest provides an ___ supply of fruits and nuts for primates.",
      options: [
        { key: "A", text: "abundant" },
        { key: "B", text: "scarce" },
        { key: "C", text: "artificial" },
        { key: "D", text: "obsolete" },
      ],
      answer: "A",
      explain:
        "正确答案 A：abundant 意为“丰富的，充裕的”。等价于 plentiful。雨季雨林为灵长类动物提供了“充足的”果实供应。",
      tag: "TOEFL TPO · 生物地理",
    },
    {
      id: "toefl-7",
      bankId: "toefl-tpo",
      word: "drastic",
      phonetic: "[ˈdræstɪk]",
      stem: "The sudden extinction of dinosaurs was likely caused by a ___ change in Earth's climate after an asteroid impact.",
      options: [
        { key: "A", text: "drastic" },
        { key: "B", text: "gradual" },
        { key: "C", text: "trivial" },
        { key: "D", text: "persistent" },
      ],
      answer: "A",
      explain:
        "正确答案 A：drastic 意为“剧烈的，极端的”。等价于 extreme, severe。小行星撞击引发了地球气候的“剧烈”变化。",
      tag: "TOEFL TPO · 古生物学",
    },
    {
      id: "toefl-8",
      bankId: "toefl-tpo",
      word: "indispensable",
      phonetic: "[ˌɪndɪˈspensəbl]",
      stem: "Water is ___ to all known forms of life, playing a crucial role in cellular respiration and metabolism.",
      options: [
        { key: "A", text: "harmful" },
        { key: "B", text: "secondary" },
        { key: "C", text: "indispensable" },
        { key: "D", text: "accidental" },
      ],
      answer: "C",
      explain:
        "正确答案 C：indispensable 意为“必不可少的，必需的”。等价于 essential。水分对于任何已知生命形式来说都是“不可或缺的”。",
      tag: "TOEFL TPO · 基础科学",
    },
    {
      id: "toefl-9",
      bankId: "toefl-tpo",
      word: "subsequent",
      phonetic: "[ˈsʌbsɪkwənt]",
      stem: "The initial volcanic eruption was relatively minor, but the ___ lava flows caused extensive damage.",
      options: [
        { key: "A", text: "subsequent" },
        { key: "B", text: "prior" },
        { key: "C", text: "simultaneous" },
        { key: "D", text: "superficial" },
      ],
      answer: "A",
      explain:
        "正确答案 A：subsequent 意为“随后的，接下来的”。等价于 later, following。初始喷发较小，但“随后的”岩浆流造成了巨大破坏。",
      tag: "TOEFL TPO · 地热环境",
    },
    {
      id: "toefl-10",
      bankId: "toefl-tpo",
      word: "deviate",
      phonetic: "[ˈdiːvieɪt]",
      stem: "The migrating birds rarely ___ from their established flight paths, navigating accurately using Earth's magnetic field.",
      options: [
        { key: "A", text: "deviate" },
        { key: "B", text: "adhere" },
        { key: "C", text: "concentrate" },
        { key: "D", text: "benefit" },
      ],
      answer: "A",
      explain:
        "正确答案 A：deviate 意为“背离，偏离”。等价于 turn aside, depart。迁徙的鸟类很少“偏离”其原定航线。",
      tag: "TOEFL TPO · 动物行为学",
    },
  ],
  "ielts-cambridge": [
    {
      id: "ielts-1",
      bankId: "ielts-cambridge",
      word: "sustainable",
      phonetic: "[səˈsteɪnəbl]",
      stem: "To ensure long-term economic growth, cities must develop ___ practices in water and energy management.",
      options: [
        { key: "A", text: "traditional" },
        { key: "B", text: "temporary" },
        { key: "C", text: "sustainable" },
        { key: "D", text: "rapid" },
      ],
      answer: "C",
      explain:
        "正确答案 C：sustainable 意为“可持续的”。雅思核心环境议题词汇， sustainable practice 表示“可持续的实践运作”。",
      tag: "剑桥雅思真题 · 城市生态",
    },
    {
      id: "ielts-2",
      bankId: "ielts-cambridge",
      word: "correlation",
      phonetic: "[ˌkɒrəˈleɪʃn]",
      stem: "Researchers have found a clear ___ between sleep quality and cognitive performance in older adults.",
      options: [
        { key: "A", text: "division" },
        { key: "B", text: "correlation" },
        { key: "C", text: "conflict" },
        { key: "D", text: "distance" },
      ],
      answer: "B",
      explain:
        "正确答案 B：correlation 意为“相互关系，关联性”。 a clear correlation between A and B 意为“A和B之间清晰的关联”。",
      tag: "剑桥雅思真题 · 科学研究",
    },
    {
      id: "ielts-3",
      bankId: "ielts-cambridge",
      word: "enhance",
      phonetic: "[ɪnˈhɑːns]",
      stem: "Integrating interactive multimedia in language lessons has been shown to ___ student engagement.",
      options: [
        { key: "A", text: "enhance" },
        { key: "B", text: "diminish" },
        { key: "C", text: "suppress" },
        { key: "D", text: "ignore" },
      ],
      answer: "A",
      explain:
        "正确答案 A：enhance 意为“增强，提升，提高”。等同于 improve, boost。多媒体整合教学被证明可以“提升”学生的参与度。",
      tag: "剑桥雅思真题 · 教育科技",
    },
    {
      id: "ielts-4",
      bankId: "ielts-cambridge",
      word: "demolish",
      phonetic: "[dɪˈmɒlɪʃ]",
      stem: "The city council decided to ___ the old railway station to make way for a modern high-speed transit hub.",
      options: [
        { key: "A", text: "restore" },
        { key: "B", text: "decorate" },
        { key: "C", text: "demolish" },
        { key: "D", text: "purchase" },
      ],
      answer: "C",
      explain:
        "正确答案 C：demolish 意为“推倒，拆毁（建筑物等）”。雅思写作地图题（Map）中的超高频必背动词。拆除旧火车站，为现代高铁站让路。",
      tag: "剑桥雅思真题 · 城市规划",
    },
    {
      id: "ielts-5",
      bankId: "ielts-cambridge",
      word: "detrimental",
      phonetic: "[ˌdetrɪˈmentl]",
      stem: "Excessive screen time before bed has a highly ___ effect on the quality of a child's deep sleep cycles.",
      options: [
        { key: "A", text: "beneficial" },
        { key: "B", text: "detrimental" },
        { key: "C", text: "marginal" },
        { key: "D", text: "instant" },
      ],
      answer: "B",
      explain:
        "正确答案 B：detrimental 意为“有害的，不利的”。等价于 harmful, damaging。 have a detrimental effect on 意为“对……有极其不利的负面影响”，大作文提分神词。",
      tag: "剑桥雅思真题 · 科技社会",
    },
    {
      id: "ielts-6",
      bankId: "ielts-cambridge",
      word: "allocate",
      phonetic: "[ˈæləkeɪt]",
      stem: "Governments must carefully ___ resources between healthcare and education to ensure balanced societal development.",
      options: [
        { key: "A", text: "allocate" },
        { key: "B", text: "accommodate" },
        { key: "C", text: "eliminate" },
        { key: "D", text: "evaluate" },
      ],
      answer: "A",
      explain:
        "正确答案 A：allocate 意为“分配，配置（资金、资源等）”。政府必须小心“调配”医疗和教育之间的预算与资源分布。",
      tag: "剑桥雅思真题 · 政府职能",
    },
    {
      id: "ielts-7",
      bankId: "ielts-cambridge",
      word: "bias",
      phonetic: "[ˈbaɪəs]",
      stem: "The study was criticized because the sampling method introduced a strong ___ towards high-income households.",
      options: [
        { key: "A", text: "bias" },
        { key: "B", text: "standard" },
        { key: "C", text: "outcome" },
        { key: "D", text: "balance" },
      ],
      answer: "A",
      explain:
        "正确答案 A：bias 意为“偏见，偏差”。由于抽样方法倾向于高收入家庭，研究因此被批评含有严重的“偏向、偏差”。",
      tag: "剑桥雅思真题 · 社会学研究",
    },
    {
      id: "ielts-8",
      bankId: "ielts-cambridge",
      word: "discrepancy",
      phonetic: "[dɪˈskrepənsi]",
      stem: "The auditors discovered a significant ___ between the company's declared earnings and its bank statements.",
      options: [
        { key: "A", text: "harmony" },
        { key: "B", text: "discrepancy" },
        { key: "C", text: "correlation" },
        { key: "D", text: "compliance" },
      ],
      answer: "B",
      explain:
        "正确答案 B：discrepancy 意为“不一致，差异”。等价于 inconsistency, difference。审计人员发现了报税收益与实际银行流水之间的巨大“出入”。",
      tag: "剑桥雅思真题 · 商业审查",
    },
    {
      id: "ielts-9",
      bankId: "ielts-cambridge",
      word: "feasible",
      phonetic: "[ˈfiːzəbl]",
      stem: "Before launching the massive infrastructure project, engineers conducted a study to determine if it was technically ___.",
      options: [
        { key: "A", text: "feasible" },
        { key: "B", text: "impossible" },
        { key: "C", text: "hazardous" },
        { key: "D", text: "obsolete" },
      ],
      answer: "A",
      explain:
        "正确答案 A：feasible 意为“可行的，可操作的”。 feasibility study 意为“可行性研究”，用来探讨一个大型项目在技术上是否“行得通”。",
      tag: "剑桥雅思真题 · 工程建造",
    },
    {
      id: "ielts-10",
      bankId: "ielts-cambridge",
      word: "prevalent",
      phonetic: "[ˈprevələnt]",
      stem: "Waterborne diseases are extremely ___ in regions lacking proper sanitation and clean drinking water.",
      options: [
        { key: "A", text: "prevalent" },
        { key: "B", text: "rare" },
        { key: "C", text: "localized" },
        { key: "D", text: "suppressed" },
      ],
      answer: "A",
      explain:
        "正确答案 A：prevalent 意为“盛行的，普遍的”。等同于 widespread, common。在缺乏卫生设施和清洁饮水的地区，水源性疾病极其“盛行”。",
      tag: "剑桥雅思真题 · 公共卫生",
    },
  ],
};

export function getBank(id: string): Bank | undefined {
  return banks.find((b) => b.id === id);
}

export function getQuestions(bankId: string): Question[] {
  return REAL_QUESTIONS[bankId] || [];
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
