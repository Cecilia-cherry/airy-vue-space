export interface ReadingWord {
  word: string;
  phonetic?: string;
  definition: string;
  example: string;
}

export interface ReadingSentence {
  text: string;
  translation: string;
  explanation: string;
}

export interface ReadingParagraph {
  pId: string;
  text: string;
  translation: string;
}

export interface ReadingQuestion {
  id: string;
  type: string; // e.g., "细节题", "推理题", "词汇题", "主旨题"
  stem: string;
  options: { key: string; text: string }[];
  answer: string;
  explain: string;
}

export interface ReadingMaterial {
  title: string;
  type: "reading" | "listening" | "cloze" | "writing" | "translation";
  paragraphs: ReadingParagraph[];
  questions: ReadingQuestion[];
  vocabulary: Record<string, ReadingWord>;
  difficultSentences?: ReadingSentence[];
  audioUrl?: string; // for listening
  writingPrompt?: string; // for writing/translation
  referenceAnswer?: string; // for writing/translation reference
}

// Map of category + sectionIndex to high-fidelity mock materials
const PRESETS: Record<string, ReadingMaterial> = {
  // ==================== KAOYAN (考研英语) ====================
  kaoyan_0: {
    title: "阅读理解 Text 1",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "For thousands of years, donkeys have been critical for propelling human civilizations forward. They've helped pull wheeled vehicles, carry travelers and move goods across the world. But where and when these animals first became intertwined with humans has been a mystery.",
        translation:
          "数千年来，驴在推动人类文明向前发展中起到了至关重要的作用。它们帮助拉动有轮车辆、运送旅客并在全球范围内运送货物。但是，这些动物最初在何时何地与人类交织在一起一直是一个谜。",
      },
      {
        pId: "P2",
        text: "Now, researchers have used genomes of over 200 donkeys to trace their domestication back to a single event around 7,000 years ago in East Africa— about 3,000 years before humans tamed horses. The team published their findings in the journal Science this month.",
        translation:
          "如今，研究人员利用了200多头驴的基因组，将其驯化历史追溯到大约7000年前东非的一次单一事件——这比人类驯化马的时间大约早了3000年。该团队本月在《科学》杂志上发表了他们的发现。",
      },
      {
        pId: "P3",
        text: "To unlock this mystery, scientists analyzed genetic information from donkeys across the globe, including modern-day breeds and ancient specimens. This genetic mapping revealed a surprisingly neat family tree, pointing to a singular origin in Northeast Africa.",
        translation:
          "为了解开这个谜团，科学家们分析了全球各地的驴的遗传信息，包括现代品种和古代标本。这种基因图谱揭示了一个令人惊讶的整洁家谱，指向东北非的单一起源。",
      },
    ],
    vocabulary: {
      propelling: {
        word: "propel",
        phonetic: "[prəˈpel]",
        definition: "v. 推进，推动，驱动",
        example: "Wind is the force propelling the sailboat forward.",
      },
      intertwined: {
        word: "intertwine",
        phonetic: "[ˌɪntəˈtwaɪn]",
        definition: "v. 缠绕，使纠缠，紧密相联",
        example: "The fates of the two families were deeply intertwined.",
      },
      genomes: {
        word: "genome",
        phonetic: "[ˈdʒiːnəʊm]",
        definition: "n. 基因组，染色体组",
        example: "Mapping the human genome is a milestone in biology.",
      },
      domestication: {
        word: "domestication",
        phonetic: "[dəˌmestɪˈkeɪʃn]",
        definition: "n. 驯养，驯化",
        example: "The domestication of dogs began tens of thousands of years ago.",
      },
      specimens: {
        word: "specimen",
        phonetic: "[ˈspesɪmən]",
        definition: "n. 标本，样本，抽样",
        example: "They collected biological specimens from the deep ocean floor.",
      },
    },
    difficultSentences: [
      {
        text: "Now, researchers have used genomes of over 200 donkeys to trace their domestication back to a single event around 7,000 years ago in East Africa— about 3,000 years before humans tamed horses.",
        translation:
          "如今，研究人员利用了200多头驴的基因组，将其驯化历史追溯到大约7000年前东非的一次单一事件——这比人类驯化马的时间大约早了3000年。",
        explanation:
          "【长难句解析】本句为主谓宾结构：主语 researchers，谓语 have used，宾语 genomes...。后面的 to trace... 为目的状语，短语 trace... back to 意为“将……追溯到”。破折号后面是个同位语结构，用以补充说明 7,000 years ago 的具体概念，其中包含 before 引导的时间状语从句。",
      },
    ],
    questions: [
      {
        id: "kaoyan_0_q1",
        type: "细节题",
        stem: "What can be learned about donkeys from Paragraph 1?",
        options: [
          { key: "A", text: "They seemed mysterious to human ancestors." },
          { key: "B", text: "They underwent multiple domestication events." },
          { key: "C", text: "They played a critical role in pushing forward human civilizations." },
          { key: "D", text: "They were vividly portrayed by ancient travelers." },
        ],
        answer: "C",
        explain:
          "正确答案 C：细节理解题。根据第一段第一句 'For thousands of years, donkeys have been critical for propelling human civilizations forward'，说明其在推动文明方面贡献巨大，因此选项 C 完美契合。",
      },
      {
        id: "kaoyan_0_q2",
        type: "推理题",
        stem: "According to Paragraph 2, donkeys were domesticated ___.",
        options: [
          { key: "A", text: "long after horses were tamed" },
          { key: "B", text: "around 3,000 years earlier than horses" },
          { key: "C", text: "in multiple places across East Africa" },
          { key: "D", text: "independently in West Europe" },
        ],
        answer: "B",
        explain:
          "正确答案 B：推理题。由第二段中 'about 3,000 years before humans tamed horses' 可以推断出，驴被驯化的时间要比马早大约 3000 年。",
      },
      {
        id: "kaoyan_0_q3",
        type: "词汇题",
        stem: "The word 'specimens' in Paragraph 3 is closest in meaning to ___.",
        options: [
          { key: "A", text: "species" },
          { key: "B", text: "samples" },
          { key: "C", text: "symbols" },
          { key: "D", text: "sculptures" },
        ],
        answer: "B",
        explain:
          "正确答案 B：词义猜测题。specimen 意为“标本、样本”，在生物与遗传学分析背景中指收集的历史生物材料样本，与 samples 意思最为相近。",
      },
      {
        id: "kaoyan_0_q4",
        type: "主旨题",
        stem: "Which of the following would be the best title for this passage?",
        options: [
          { key: "A", text: "Donkeys vs. Horses: A Genetic Battle" },
          { key: "B", text: "Unlocking the Genetic Secret of Donkey Domestication" },
          { key: "C", text: "The Cultural Value of Donkeys in East Africa" },
          { key: "D", text: "How DNA Technology Resolves Historical Disputes" },
        ],
        answer: "B",
        explain:
          "正确答案 B：主旨大意题。整篇文章核心论述科学家如何利用基因组学数据揭开世界上驴的驯化起源谜团，因此选项 B 最贴切。",
      },
    ],
  },
  kaoyan_1: {
    title: "阅读理解 Text 2",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "In the modern consumer environment, we are bombarded with choices, from the brand of coffee we buy to the career paths we pursue. While having choices is generally associated with freedom, psychologists have identified a phenomenon known as 'decision fatigue'. The more choices we have to make, the worse the quality of our decisions becomes.",
        translation:
          "在现代消费环境中，我们充斥着各种选择，从购买的咖啡品牌到追求的职业道路。虽然拥有选择通常与自由相联系，但心理学家已经发现了一种被称为“决策疲劳”的现象。我们需要做出的决策越多，我们决策的质量就变得越差。",
      },
      {
        pId: "P2",
        text: "As people make successive choices, their brains become depleted of the energy required to exercise self-control and analytical thinking. Consequently, they tend to look for shortcuts. They either make impulsive purchases or avoid making decisions altogether, opting for the default status quo.",
        translation:
          "随着人们做出连续的选择，他们的大脑在行使自我控制和分析性思维所需的能量上面会被耗尽。因此，他们倾向于寻找捷径。他们要么进行冲动消费，要么完全避免做出决定，选择默认的现状。",
      },
    ],
    vocabulary: {
      bombarded: {
        word: "bombard",
        phonetic: "[bɒmˈbɑːd]",
        definition: "v. 轰炸，大量提问/信息向某人袭来",
        example: "The customer service line was bombarded with complaints.",
      },
      depleted: {
        word: "deplete",
        phonetic: "[dɪˈpliːt]",
        definition: "v. 消耗，耗尽，减少",
        example: "Our water supplies were severely depleted after the drought.",
      },
      "status quo": {
        word: "status quo",
        phonetic: "[ˌsteɪtəs ˈkwəʊ]",
        definition: "n. 现状",
        example: "The political party wants to preserve the status quo.",
      },
    },
    difficultSentences: [
      {
        text: "As people make successive choices, their brains become depleted of the energy required to exercise self-control and analytical thinking.",
        translation:
          "随着人们做出连续的选择，他们的大脑在行使自我控制和分析性思维所需的能量上面会被耗尽。",
        explanation:
          "【长难句解析】本句由 as 引导伴随状语从句，主句为 their brains become depleted...。其中 required to exercise... 为过去分词短语作后置定语修饰 energy。",
      },
    ],
    questions: [
      {
        id: "kaoyan_1_q1",
        type: "细节题",
        stem: "According to Paragraph 1, what is 'decision fatigue'?",
        options: [
          { key: "A", text: "The inability to enjoy the freedom of buying coffee." },
          {
            key: "B",
            text: "The decline in decision-making quality due to making too many choices.",
          },
          { key: "C", text: "The physiological exhaustion caused by physical workouts." },
          { key: "D", text: "The regret felt after making a wrong career selection." },
        ],
        answer: "B",
        explain:
          "正确答案 B：细节理解题。根据第一段末句：'The more choices we have to make, the worse the quality of our decisions becomes'，决策疲劳即由于决策次数过多导致决策质量下降。",
      },
    ],
  },
  kaoyan_2: {
    title: "阅读理解 Text 3",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "The rise of generative artificial intelligence has brought copyright laws to a critical turning point. For centuries, copyright regimes have been grounded in the core assumption that creativity is an exclusively human attribute. Now, programs capable of drafting sophisticated essays, composing symphonies, and painting intricate artwork challenge this biological monopoly.",
        translation:
          "生成式人工智能的兴起将版权法带到了一个关键的转折点。几个世纪以来，版权制度一直建立在“创造力是人类独有的属性”这一核心假设之上。如今，能够撰写复杂论文、创作交响乐和绘制精细艺术品的程序，正在挑战这种生物学垄断。",
      },
      {
        pId: "P2",
        text: "Publishers and artists argue that AI generators rely on vast training databases containing copyrighted human creations, which amounts to unauthorized exploitation. Conversely, tech developers contend that AI learns patterns much like a human artist studies classical masters, advocating for a broader interpretation of 'fair use'.",
        translation:
          "出版商和艺术家认为，AI生成器依赖包含受版权保护的人类作品的庞大训练数据库，这等同于未经授权的剥削利用。相反，技术开发人员主张，AI学习模式的方式非常类似于人类艺术家向古典大师学习，因而极力呼吁对“合理使用”进行更广泛的解释。",
      },
    ],
    vocabulary: {
      exclusively: {
        word: "exclusively",
        phonetic: "[ɪkˈskluːsɪvli]",
        definition: "adv. 独占地，唯一地，排他地",
        example: "The pool is used exclusively by hotel guests.",
      },
      monopoly: {
        word: "monopoly",
        phonetic: "[məˈnɒpəli]",
        definition: "n. 垄断，独占",
        example: "The government has a monopoly on postal services.",
      },
    },
    difficultSentences: [
      {
        text: "For centuries, copyright regimes have been grounded in the core assumption that creativity is an exclusively human attribute.",
        translation: "几个世纪以来，版权制度一直建立在创造力是人类独有属性的核心假设之上。",
        explanation:
          "【长难句解析】主干为 regimes have been grounded in the core assumption...，其后 that 引导同位语从句，具体解释说明 assumption 的具体内容。",
      },
    ],
    questions: [
      {
        id: "kaoyan_2_q1",
        type: "推理题",
        stem: "According to Paragraph 1, historical copyright laws assumed that ___.",
        options: [
          { key: "A", text: "machines would eventually learn to paint artwork" },
          { key: "B", text: "creativity belongs solely to human beings" },
          { key: "C", text: "all artists should distribute their works for free" },
          { key: "D", text: "copyright certificates should be renewed annually" },
        ],
        answer: "B",
        explain:
          "正确答案 B：推理题。根据第一段中 'copyright regimes have been grounded in the core assumption that creativity is an exclusively human attribute'，版权假设创造力属于且仅属于人类（exclusively human）。",
      },
    ],
  },
  kaoyan_3: {
    title: "阅读理解 Text 4",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "The rapid expansion of the 'gig economy' has fundamentally redefined the traditional employer-employee relationship. Instead of stable, long-term employment contracts, modern labor markets increasingly feature freelance, project-based assignments mediated through digital platforms. While proponents praise the unprecedented flexibility, critics point out the severe lack of social safety nets.",
        translation:
          "“零工经济”的迅速扩张从根本上重新定义了传统的雇主与雇员关系。现代劳动力市场越来越多地呈现出通过数字化平台进行调介的自由职业、项目制任务，而非稳定、长期的雇佣合同。虽然支持者赞美其前所未有的灵活性，但批评者指出其严重缺乏社会安全保障网。",
      },
    ],
    vocabulary: {
      mediated: {
        word: "mediate",
        phonetic: "[ˈmiːdieɪt]",
        definition: "v. 调解，居中促成，作为媒介传递",
        example: "Negotiations were mediated by an international committee.",
      },
    },
    questions: [
      {
        id: "kaoyan_3_q1",
        type: "细节题",
        stem: "What do critics of the gig economy emphasize?",
        options: [
          { key: "A", text: "The absolute freedom of working hours" },
          { key: "B", text: "The lack of adequate social safety nets" },
          { key: "C", text: "The low efficiency of digital platforms" },
          { key: "D", text: "The high costs of travel and relocation" },
        ],
        answer: "B",
        explain:
          "正确答案 B：细节题。文章末尾提到 'critics point out the severe lack of social safety nets'，表明批评者强调社会保障安全网的缺失。",
      },
    ],
  },
  kaoyan_4: {
    title: "新题型 (模拟训练)",
    type: "reading",
    paragraphs: [
      {
        pId: "A",
        text: "Urban wetlands play a crucial role in city ecology. They function as natural sponges, absorbing heavy rainfall and mitigating urban floods during stormy seasons.",
        translation:
          "城市湿地在城市生态中起着关键作用。它们就像天然海绵，在暴风雨季节吸收暴雨并减缓城市洪涝。",
      },
      {
        pId: "B",
        text: "Furthermore, these ecosystems serve as vital sanctuaries for migrating birds, maintaining regional biodiversity in dense metropolitan areas.",
        translation: "此外，这些生态系统是候鸟的重要避难所，在密集的都市区中维持着区域生物多样性。",
      },
    ],
    vocabulary: {
      mitigating: {
        word: "mitigate",
        phonetic: "[ˈmɪtɪɡeɪt]",
        definition: "v. 缓和，减轻，使温和",
        example: "Planting trees can help mitigate the effects of global warming.",
      },
    },
    questions: [
      {
        id: "kaoyan_4_q1",
        type: "匹配题",
        stem: "Which heading best sums up paragraph A?",
        options: [
          { key: "A", text: "Flood Mitigation and Water Regulation" },
          { key: "B", text: "The Depletion of Wildlife Sanctuaries" },
          { key: "C", text: "Industrial Waste and Pollution Control" },
          { key: "D", text: "The Architectural Expansion of Cities" },
        ],
        answer: "A",
        explain:
          "正确答案 A：段落大意。Paragraph A 提到 'absorbing heavy rainfall and mitigating urban floods'，重点是防洪与水文调节。",
      },
    ],
  },
  kaoyan_5: {
    title: "完形填空 (词汇运用)",
    type: "cloze",
    paragraphs: [
      {
        pId: "P1",
        text: "The internet has revolutionized the way we work. It has allowed many professionals to (1) ___ from home. However, this flexibility also brings (2) ___ challenges, such as blurred boundaries between work and life. Experts recommend setting a (3) ___ schedule to maintain work-life balance.",
        translation:
          "互联网彻底改变了我们的工作方式。它允许许多专业人士在家(1)工作。然而，这种灵活性也带来了(2)挑战，比如工作与生活之间的界限模糊。专家建议制定(3)日程安排表以维持工作与生活的平衡。",
      },
    ],
    vocabulary: {
      flexibility: {
        word: "flexibility",
        phonetic: "[ˌfleksəˈbɪləti]",
        definition: "n. 灵活性，弹性，柔韧性",
        example: "Flexible hours give workers more flexibility to manage families.",
      },
    },
    questions: [
      {
        id: "kaoyan_5_q1",
        type: "完形填空 (1)",
        stem: "Select the correct option for blank (1):",
        options: [
          { key: "A", text: "commute" },
          { key: "B", text: "cooperate" },
          { key: "C", text: "telecommute" },
          { key: "D", text: "migrate" },
        ],
        answer: "C",
        explain:
          "正确答案 C：telecommute 意为“远程办公”，符合 'from home'（在家办公）的语境。commute 意为通勤，cooperate 意为合作，migrate 意为迁徙。",
      },
      {
        id: "kaoyan_5_q2",
        type: "完形填空 (2)",
        stem: "Select the correct option for blank (2):",
        options: [
          { key: "A", text: "minor" },
          { key: "B", text: "unexpected" },
          { key: "C", text: "inevitable" },
          { key: "D", text: "temporary" },
        ],
        answer: "C",
        explain:
          "正确答案 C：inevitable 意为“不可避免的”。语境中提到“这种灵活性也带来了‘不可避免的’挑战”，下文列举了边界模糊，说明是难以避免的必然问题。",
      },
      {
        id: "kaoyan_5_q3",
        type: "完形填空 (3)",
        stem: "Select the correct option for blank (3):",
        options: [
          { key: "A", text: "flexible" },
          { key: "B", text: "strict" },
          { key: "C", text: "loose" },
          { key: "D", text: "random" },
        ],
        answer: "B",
        explain:
          "正确答案 B：strict 意为“严格的”。为了应付模糊的界限，专家建议设立一个‘严格的’日程，以防止工作侵占个人生活。",
      },
    ],
  },
  kaoyan_6: {
    title: "英译汉翻译专项",
    type: "translation",
    paragraphs: [
      {
        pId: "Source",
        text: "The rapid development of artificial intelligence has sparked intense debates. While optimists believe that AI will liberate humans from tedious tasks, skeptics argue that it may lead to widespread unemployment and ethical challenges.",
        translation:
          "人工智能的快速发展引发了激烈的争论。虽然乐观主义者相信人工智能将把人类从繁琐的任务中解放出来，但怀疑论者认为它可能会导致广泛的失业和伦理挑战。",
      },
    ],
    vocabulary: {
      skeptics: {
        word: "skeptic",
        phonetic: "[ˈskeptɪk]",
        definition: "n. 怀疑论者，多疑的人",
        example: "Skeptics argue that the new economic policy will fail.",
      },
    },
    questions: [],
    writingPrompt:
      "请将上面的段落翻译为流畅、规范的学术中文：\n\n【考察点】\n1. Sparked intense debates (引发了激烈争辩)\n2. Liberate humans from tedious tasks (将人类从单调乏味的任务中解放)\n3. Skeptics (怀疑论者/持怀疑态度的人)\n4. Ethical challenges (伦理/道德挑战)",
    referenceAnswer:
      "人工智能的飞速发展引发了激烈辩论。虽然乐观主义者认为，人工智能将把人类从繁琐无聊的工作中解放出来；但持怀疑态度的人则指出，这可能会带来大规模失业以及深刻的伦理道德挑战。",
  },
  kaoyan_7: {
    title: "应用文小作文 (含 AI 批改)",
    type: "writing",
    paragraphs: [],
    vocabulary: {},
    questions: [],
    writingPrompt:
      "【应用文写作题目】\nWrite an email of about 100 words to recommend a famous Chinese tourist spot to your foreign friend, Jack.\n\nYou should outline:\n1. The beauty and features of the spot\n2. Practical traveling tips (best season, traffic, etc.)\n3. An invitation for him to visit together with you.",
    referenceAnswer:
      "Dear Jack,\nI am writing to enthusiastically recommend the Great Wall of China to you. As one of the world's seven wonders, it snakes across majestic mountains, representing incredible ancient architecture and history. The best time to visit is during autumn, when the surrounding woods are painted in breathtaking gold and red. I suggest we take a fast train from Beijing, which is extremely convenient. I would be more than delighted to be your personal tour guide. Let me know if you are interested!\nBest regards,\nLi Ming",
  },
  kaoyan_8: {
    title: "图表/图画大作文 (含 AI 批改)",
    type: "writing",
    paragraphs: [],
    vocabulary: {},
    questions: [],
    writingPrompt:
      "【图表写作题目 / Essay Writing Task】\nWrite an essay of 160–200 words based on the following drawing or topic. In your essay, you should:\n1. Describe the drawing briefly (e.g., a student choosing between State-owned Enterprise, Foreign Firm, or starting a Startup)\n2. Interpret its social meaning\n3. Give your personal comments.\n\nYou should write neatly on the answer sheet.",
    referenceAnswer:
      "As is clearly illustrated in the cartoon, a college graduate is standing at a critical crossroads of his career, carefully choosing among several paths, which include stable state-owned enterprises, well-paying multinational firms, and risky startup incubators. This picture reflects a common social phenomenon in modern China: diverse career goals among the younger generation.\n\nUndoubtedly, the expansion of tech platforms has offered youth unprecedented vocational freedom. Many graduates prefer state-owned positions for job security and work-life balance, while others are willing to embrace startups to unleash their entrepreneurial potentials. In my view, there is no single 'correct' path. Young people should align their career choices with their individual strengths and long-term passions, rather than blindly following social trends. Only in this way can we achieve personal satisfaction and contribute to social progress.",
  },

  // ==================== GAOKAO (高考英语) ====================
  gaokao_0: {
    title: "听力专项理解",
    type: "listening",
    paragraphs: [
      {
        pId: "Audio Info",
        text: "🔊 Click the player on the left to listen to the dialogue. Answer the questions on the right. This listening test focuses on a conversation between two colleagues planning an eco-friendly weekend camping trip.",
        translation:
          "🔊 点击左侧播放器播放听力材料，并在右侧回答问题。本听力考查两位同事讨论周末生态野外露营计划的对话。",
      },
    ],
    audioUrl: "https://actions.google.com/sounds/v1/ambiences/morning_birds.ogg",
    vocabulary: {
      "eco-friendly": {
        word: "eco-friendly",
        phonetic: "[ˌiːkəʊˈfrendli]",
        definition: "adj. 环保的，对生态环境无害的",
        example: "We should use eco-friendly paper bags instead of plastics.",
      },
    },
    questions: [
      {
        id: "gaokao_0_q1",
        type: "听力理解",
        stem: "Where are the speakers planning to go this weekend?",
        options: [
          { key: "A", text: "To a crowded city theme park" },
          { key: "B", text: "To a natural mountain lake campsite" },
          { key: "C", text: "To a local library to study" },
          { key: "D", text: "To a seafood restaurant" },
        ],
        answer: "B",
        explain:
          "正确答案 B：对话一开头男士提到 'Let's escape the city and go camping near the mountain lake'，因此是自然山区湖畔宿营。",
      },
      {
        id: "gaokao_0_q2",
        type: "细节理解",
        stem: "What eco-friendly tool does the woman recommend?",
        options: [
          { key: "A", text: "Solar-powered lanterns and reusable bottles" },
          { key: "B", text: "Disposable plastic plates and spoons" },
          { key: "C", text: "A gas-powered portable stove" },
          { key: "D", text: "A heavy paper map of the area" },
        ],
        answer: "A",
        explain:
          "正确答案 A：女士在对话中提到 'We must bring solar lanterns to avoid batteries, and reusable flasks instead of plastic'，故A是正确选项。",
      },
    ],
  },
  gaokao_1: {
    title: "阅读理解 Text A",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Welcome to Yellowstone National Park's Junior Ranger Program! This unique summer program is specially designed for high school students aged 14 to 18 who are passionate about environmental science and wildlife conservation. Participants will work alongside professional park rangers and scientific researchers for four weeks.",
        translation:
          "欢迎来到黄石国家公园的“初级巡逻员”计划！这一独特的夏季项目专门为 14 至 18 岁对环境科学和野生动物保护充满热情的高中生设计。参与者将与专业的公园巡逻员和科学研究人员一起工作四个星期。",
      },
      {
        pId: "P2",
        text: "The program fee is $250, which covers all camping gears, meals, and safety equipment. Scholarships are available for students who demonstrate academic excellence or financial need. Applications must be submitted online before May 15th, including a personal statement and one recommendation letter.",
        translation:
          "项目费用为 250 美元，包括所有的野营装备、膳食和安全设备。学术表现优秀或有经济困难的学生可申请奖学金。申请材料必须在 5 月 15 日前在线提交，包括个人陈述和一封推荐信。",
      },
    ],
    vocabulary: {
      conservation: {
        word: "conservation",
        phonetic: "[ˌkɒnsəˈveɪʃn]",
        definition: "n. （对自然资源的）保护，保存",
        example: "Wildlife conservation is essential for ecological balance.",
      },
    },
    questions: [
      {
        id: "gaokao_1_q1",
        type: "细节题",
        stem: "Who is the Junior Ranger Program mainly intended for?",
        options: [
          { key: "A", text: "Professional scientists who study volcanoes" },
          { key: "B", text: "High school students aged 14 to 18" },
          { key: "C", text: "Tourists who want to visit Yellowstone for free" },
          { key: "D", text: "Primary school teachers of geography" },
        ],
        answer: "B",
        explain:
          "正确答案 B：细节理解题。根据第一段第一句 'specially designed for high school students aged 14 to 18' 即可直接得出答案。",
      },
      {
        id: "gaokao_1_q2",
        type: "细节题",
        stem: "What is the deadline for submitting the application?",
        options: [
          { key: "A", text: "May 15th" },
          { key: "B", text: "June 20th" },
          { key: "C", text: "July 1st" },
          { key: "D", text: "August 24th" },
        ],
        answer: "A",
        explain:
          "正确答案 A：细节定位题。由第二段第三句 'Applications must be submitted online before May 15th' 可以确认截止日期为 5 月 15 日。",
      },
    ],
  },
  gaokao_2: {
    title: "阅读理解 Text B",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "In several residential neighborhoods across modern European cities, a quiet revolution against food waste is taking place. It is called the 'Community Fridge' project. Ordinary residents and local restaurants place surplus, edible food inside outdoor public refrigerators instead of tossing it into the trash.",
        translation:
          "在现代欧洲城市的几个居民区，一场反对食物浪费的无声革命正在悄然兴起。它被称为“社区共享冰箱”项目。普通居民和当地餐馆将多余的、可食用的食物放入室外公共冰箱，而不是扔进垃圾桶。",
      },
      {
        pId: "P2",
        text: "Anyone can walk up to the fridge and take food for free. This simple initiative not only helps low-income families secure fresh meals but also fosters a powerful sense of community and trust among neighbors, uniting people under a shared green ecological goal.",
        translation:
          "任何人都可以走到冰箱前免费领取食物。这个简单的举动不仅帮助低收入家庭获得新鲜膳食，还在邻里之间培养了强烈的社区归属感和信任，将人们团结在一个共同的绿色生态目标下。",
      },
    ],
    vocabulary: {
      surplus: {
        word: "surplus",
        phonetic: "[ˈsɜːpləs]",
        definition: "n. 剩余，盈余；adj. 过剩的",
        example: "The school sells surplus equipment at public auction.",
      },
      fosters: {
        word: "foster",
        phonetic: "[ˈfɒstə]",
        definition: "v. 培养，促进，抚育",
        example: "The teacher tried to foster a love of reading in her students.",
      },
    },
    questions: [
      {
        id: "gaokao_2_q1",
        type: "细节题",
        stem: "What is put inside the Community Fridge?",
        options: [
          { key: "A", text: "Used books and toys" },
          { key: "B", text: "Surplus edible food" },
          { key: "C", text: "Old clothes for donation" },
          { key: "D", text: "Ice cream wrappers" },
        ],
        answer: "B",
        explain:
          "正确答案 B：细节理解题。第一段尾句提到 'place surplus, edible food inside outdoor public refrigerators'，说明投放的是多余的、可食用的食物。",
      },
    ],
  },
  gaokao_3: {
    title: "七选五阅读填空",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Procrastination is a common obstacle to academic success. Many students find themselves putting off assignments until the very last minute. (1) ___ Here are some practical tips to help you overcome this habit and study more efficiently.",
        translation:
          "拖延是学术成功的常见障碍。许多学生发现自己将作业推迟到最后一刻。(1) ___ 以下是一些切实可行的建议，帮助你克服这种习惯，更高效地学习。",
      },
      {
        pId: "P2",
        text: "First, break large tasks into smaller, manageable chunks. When a project seems too huge, we feel overwhelmed and avoid starting it. (2) ___ Second, eliminate all digital distractions while studying. Put your phone in another room or use focus-mode apps to block social media.",
        translation:
          "首先，将大任务分解成较小的、易于管理的部分。当一个项目看起来太庞大时，我们会感到无从下手而避免开始。(2) ___ 其次，在学习时排除所有的数字化干扰。把你的手机放在另一个房间，或者使用专注模式应用来屏蔽社交媒体。",
      },
    ],
    vocabulary: {
      procrastination: {
        word: "procrastination",
        phonetic: "[prəˌkræstɪˈneɪʃn]",
        definition: "n. 拖延，拖延症",
        example: "Procrastination is the thief of time.",
      },
    },
    questions: [
      {
        id: "gaokao_3_q1",
        type: "七选五 (1)",
        stem: "Select the option that best fits blank (1):",
        options: [
          { key: "A", text: "However, this behavior often leads to high stress and poor grades." },
          { key: "B", text: "Moreover, teachers always prefer paper homework." },
          { key: "C", text: "Eating healthy snacks can give you quick energy." },
          { key: "D", text: "Therefore, students should buy expensive tablets." },
        ],
        answer: "A",
        explain:
          "正确答案 A：语境衔接。空白处前面讲到“拖延使学生把作业推迟到最后一刻”，A选项“然而，这种行为经常导致高压力和差成绩”承上启下，指出拖延的不良后果。",
      },
      {
        id: "gaokao_3_q2",
        type: "七选五 (2)",
        stem: "Select the option that best fits blank (2):",
        options: [
          { key: "A", text: "By tackling one small part at a time, you build momentum easily." },
          { key: "B", text: "Always choose to study at midnight for maximum quietness." },
          { key: "C", text: "Washing dishes can help clear your mind before writing." },
          { key: "D", text: "It is helpful to ask your teacher to write the essay for you." },
        ],
        answer: "A",
        explain:
          "正确答案 A：语境衔接。该段落核心是“把大任务分解成小部分”。A 选项“通过一次解决一小部分，你很容易建立动力”直接呼应并支持了这一论点。",
      },
    ],
  },
  gaokao_4: {
    title: "完形填空精练",
    type: "cloze",
    paragraphs: [
      {
        pId: "P1",
        text: "When I was ten, I fell in love with astronomy and desperately wanted a telescope. However, my parents couldn't (1) ___ one. Instead of giving up, I decided to (2) ___ the money myself. I found a part-time job helping at the local library, organizing bookshelves.",
        translation:
          "当我十岁时，我爱上了天文学，拼命想要一台望远镜。然而，我的父母(1)买不起。我没有放弃，而是决定自己去(2)挣这笔钱。我在当地图书馆找到了一份兼职工作，帮着整理书架。",
      },
    ],
    vocabulary: {
      astronomy: {
        word: "astronomy",
        phonetic: "[əˈstrɒnəmi]",
        definition: "n. 天文学",
        example: "The discovery of a new planet excited the world of astronomy.",
      },
    },
    questions: [
      {
        id: "gaokao_4_q1",
        type: "完形填空 (1)",
        stem: "Select the correct option for blank (1):",
        options: [
          { key: "A", text: "afford" },
          { key: "B", text: "design" },
          { key: "C", text: "borrow" },
          { key: "D", text: "protect" },
        ],
        answer: "A",
        explain:
          "正确答案 A：afford 意为“买得起、负担得起”。根据后文‘自己挣钱’可知，父母当时在经济上无法‘负担起’（afford）一台昂贵的望远镜。",
      },
      {
        id: "gaokao_4_q2",
        type: "完形填空 (2)",
        stem: "Select the correct option for blank (2):",
        options: [
          { key: "A", text: "earn" },
          { key: "B", text: "spend" },
          { key: "C", text: "donate" },
          { key: "D", text: "lose" },
        ],
        answer: "A",
        explain:
          "正确答案 A：earn 意为“赚得（钱财等）”。决定自己通过工作来‘赚取’（earn）这笔买望远镜的钱。",
      },
    ],
  },
  gaokao_5: {
    title: "语法填空精析",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "The Silk Road is an ancient network of trade routes (1) ___ (establish) during the Han Dynasty. It connected China with the Mediterranean world, facilitating both commercial and cultural exchanges. Over the centuries, silk, tea, and paper (2) ___ (export) from China to various Western regions, reshaping civilizations.",
        translation:
          "丝绸之路是汉代(1)建立的古代贸易路线网络。它将中国与地中海世界连接起来，促进了商业和文化交流。几个世纪以来，丝绸、茶叶和纸张从中国(2)出口到西方各个地区，重新塑造了各大文明。",
      },
    ],
    vocabulary: {
      facilitating: {
        word: "facilitate",
        phonetic: "[fəˈsɪlɪteɪt]",
        definition: "v. 促进，使容易，帮助",
        example: "The new highway will facilitate trade between the two cities.",
      },
    },
    questions: [
      {
        id: "gaokao_5_q1",
        type: "语法填空 (1)",
        stem: "What is the correct form for blank (1) (establish)?",
        options: [
          { key: "A", text: "established" },
          { key: "B", text: "establishing" },
          { key: "C", text: "establishes" },
          { key: "D", text: "to establish" },
        ],
        answer: "A",
        explain:
          "正确答案 A：非谓语动词。routes 与 establish 之间是被动关系，所以用过去分词 established 作后置定语。",
      },
      {
        id: "gaokao_5_q2",
        type: "语法填空 (2)",
        stem: "What is the correct form for blank (2) (export)?",
        options: [
          { key: "A", text: "were exported" },
          { key: "B", text: "are exported" },
          { key: "C", text: "exported" },
          { key: "D", text: "was exported" },
        ],
        answer: "A",
        explain:
          "正确答案 A：谓语动词时态与语态。主语为复数名词 silk, tea, and paper，时间为 over the centuries（历史过去），且它们是被出口，因此用一般过去时的被动语态 were exported。",
      },
    ],
  },
  gaokao_6: {
    title: "书面表达与作文 (含 AI 批改)",
    type: "writing",
    paragraphs: [],
    vocabulary: {},
    questions: [],
    writingPrompt:
      "【高考作文书面表达题目】\n假定你是红星中学高三学生李华。你的英国朋友 Jack 对中国传统手工艺很感兴趣。请给他写一封电子邮件，邀请他来参加下周五你校举办的“中华传统手工艺文化节” (Traditional Chinese Crafts Festival)。\n\n内容包括：\n1. 文化节的时间与地点；\n2. 精彩活动（手艺展示、亲身体验制作等）；\n3. 表达期待。\n\n注意：词数100左右。开头和结尾已为你写好，不计入总词数。",
    referenceAnswer:
      "Dear Jack,\nHow is everything going? Knowing that you are deeply interested in traditional Chinese crafts, I am writing to cordially invite you to attend the Traditional Chinese Crafts Festival. \n\nThe festival will be held in our school playground next Friday, from 2:00 p.m. to 5:00 p.m. It promises to be a fantastic event where master artisans will showcase ancient crafts such as paper-cutting, pottery-making, and clay-sculpting. Best of all, you will have a hands-on opportunity to paint your own Peking Opera mask. I am sure you will have a wonderful time.\n\nWould you like to join us? Looking forward to your early reply!\nYours,\nLi Ming",
  },

  // ==================== ZHONGKAO (中考英语) ====================
  zhongkao_0: {
    title: "单项选择突破",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Please read the following grammar and vocabulary multiple-choice questions carefully and choose the best answers. These items cover core middle school test points.",
        translation: "请仔细阅读以下语法和词汇多选题并选择最佳答案。这些题目涵盖了中考核心考点。",
      },
    ],
    vocabulary: {},
    questions: [
      {
        id: "zhongkao_0_q1",
        type: "单项选择",
        stem: "My sister and I like helping others. ___ often volunteer at the community center on weekends.",
        options: [
          { key: "A", text: "We" },
          { key: "B", text: "Us" },
          { key: "C", text: "They" },
          { key: "D", text: "Them" },
        ],
        answer: "A",
        explain:
          "正确答案 A：代词主格。'My sister and I' 对应复数第一人称代词 'We'（我们），在句子中作主语，因此用主格 We。",
      },
    ],
  },
  zhongkao_1: {
    title: "完形填空精练",
    type: "cloze",
    paragraphs: [
      {
        pId: "P1",
        text: "One afternoon, a little girl named Lily was crying near her apartment because she had lost her front door (1) ___. Her neighbor, Mrs. Green, walked over and asked what was wrong. Instead of leaving, Mrs. Green helped Lily search the garden until they (2) ___ found it hidden in the grass.",
        translation:
          "一天下午，一个名叫莉莉的小女孩在公寓附近哭泣，因为她丢了前门的(1)钥匙。她的邻居格林夫人走过来问怎么了。格林夫人没有离开，而是帮助莉莉搜寻花园，直到她们(2)终于在草丛中找到了它。",
      },
    ],
    vocabulary: {},
    questions: [
      {
        id: "zhongkao_1_q1",
        type: "完形填空 (1)",
        stem: "Select the correct option for blank (1):",
        options: [
          { key: "A", text: "key" },
          { key: "B", text: "book" },
          { key: "C", text: "cat" },
          { key: "D", text: "toy" },
        ],
        answer: "A",
        explain: "正确答案 A： Lily 哭是因为她进不去公寓，说明丢失的是前门“钥匙”（key）。",
      },
      {
        id: "zhongkao_1_q2",
        type: "完形填空 (2)",
        stem: "Select the correct option for blank (2):",
        options: [
          { key: "A", text: "finally" },
          { key: "B", text: "suddenly" },
          { key: "C", text: "slowly" },
          { key: "D", text: "recently" },
        ],
        answer: "A",
        explain: "正确答案 A： lily与格林夫人寻找了很久，所以是“终于”（finally）找到了它。",
      },
    ],
  },
  zhongkao_2: {
    title: "阅读理解 Text A",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Have you ever seen a library built inside a forest? The Green Forest Library is located on the outskirts of Hangzhou. It has over 50,000 books, mostly about plants, ecology, and geography. Visitors can read books on comfortable wooden chairs under tall green trees.",
        translation:
          "你见过建在森林里的图书馆吗？绿色森林图书馆坐落在杭州市郊。它拥有 5 万多册图书，大部分是关于植物、生态和地理的。游客可以在高大的绿树下坐在舒适的木椅上阅读书籍。",
      },
    ],
    vocabulary: {
      outskirts: {
        word: "outskirts",
        phonetic: "[ˈaʊtskɜːts]",
        definition: "n. 市郊，郊区",
        example: "They live in a quiet house on the outskirts of Shanghai.",
      },
    },
    questions: [
      {
        id: "zhongkao_2_q1",
        type: "细节题",
        stem: "Where is the Green Forest Library located?",
        options: [
          { key: "A", text: "On the outskirts of Hangzhou" },
          { key: "B", text: "In the center of Beijing" },
          { key: "C", text: "Inside a busy school playground" },
          { key: "D", text: "Under the deep ocean floor" },
        ],
        answer: "A",
        explain:
          "正确答案 A：细节题。第一段第二句明确写着 'located on the outskirts of Hangzhou'。",
      },
    ],
  },
  zhongkao_3: {
    title: "阅读理解 Text B",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Honeybees are tiny insects, but they are incredibly busy workers. A single hive can contain up to 60,000 bees. To make honey, honeybees collect nectar, a sweet liquid, from flowers. They fly from flower to flower, bringing nectar back to the hive, where it is stored in small wax cells.",
        translation:
          "蜜蜂是微小的昆虫，但它们是令人难以置信的忙碌工作者。一个蜂巢可以容纳多达 6 万只蜜蜂。为了酿造蜂蜜，蜜蜂从花朵中收集花蜜——一种甜味的液体。它们从一朵花飞到另一朵花，将花蜜带回蜂巢，储存在小蜡室中。",
      },
    ],
    vocabulary: {
      nectar: {
        word: "nectar",
        phonetic: "[ˈnektə]",
        definition: "n. 花蜜，甘露",
        example: "Bees gather nectar from wildflowers during springtime.",
      },
    },
    questions: [
      {
        id: "zhongkao_3_q1",
        type: "细节题",
        stem: "What do bees collect from flowers to make honey?",
        options: [
          { key: "A", text: "Water" },
          { key: "B", text: "Nectar" },
          { key: "C", text: "Wax" },
          { key: "D", text: "Seeds" },
        ],
        answer: "B",
        explain:
          "正确答案 B：细节题。第三句提到 'To make honey, honeybees collect nectar... from flowers'。",
      },
    ],
  },
  zhongkao_4: {
    title: "词汇分类运用",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Learning English vocabulary involves categorizing words into parts of speech. For example, nouns are naming words like 'achievement', while adjectives describe things like 'energetic'. Knowing these classifications can help you construct much better sentences.",
        translation:
          "学习英语词汇涉及将单词归入词性类别。例如，名词是表示名称的词如 'achievement'，而形容词描述事物如 'energetic'。掌握这些分类能够帮助你构建好得多的句子。",
      },
    ],
    vocabulary: {},
    questions: [
      {
        id: "zhongkao_4_q1",
        type: "细节题",
        stem: "Which of the following words is an adjective?",
        options: [
          { key: "A", text: "achievement" },
          { key: "B", text: "energetic" },
          { key: "C", text: "develop" },
          { key: "D", text: "beautifully" },
        ],
        answer: "B",
        explain:
          "正确答案 B：词性考查。energetic 是形容词，意为“精力充沛的”。achievement 是名词，develop 是动词，beautifully 是副词。",
      },
    ],
  },
  zhongkao_5: {
    title: "语法填空填空",
    type: "cloze",
    paragraphs: [
      {
        pId: "P1",
        text: "Last week, our school (1) ___ (hold) a wonderful sports meet. Every class performed very well. Mike, my best friend, ran (2) ___ (fast) than any other boy in the 100-meter race and won first place. We cheered for him happily.",
        translation:
          "上周，我们学校(1)举办了一场精彩的运动会。每个班表现都很好。我最好的朋友迈克在 100 米赛跑中比其他任何男孩都跑得(2)快，获得了第一名。我们高兴地为他欢呼。",
      },
    ],
    vocabulary: {},
    questions: [
      {
        id: "zhongkao_5_q1",
        type: "语法填空 (1)",
        stem: "What is the correct form for blank (1) (hold)?",
        options: [
          { key: "A", text: "held" },
          { key: "B", text: "holds" },
          { key: "C", text: "holding" },
          { key: "D", text: "will hold" },
        ],
        answer: "A",
        explain:
          "正确答案 A：时态考查。根据开头的 Last week（上周）可知事情发生在过去，应该用一般过去时 held。",
      },
      {
        id: "zhongkao_5_q2",
        type: "语法填空 (2)",
        stem: "What is the correct form for blank (2) (fast)?",
        options: [
          { key: "A", text: "faster" },
          { key: "B", text: "fastest" },
          { key: "C", text: "more fast" },
          { key: "D", text: "most fast" },
        ],
        answer: "A",
        explain:
          "正确答案 A：比较级考查。根据空白处后面的 than 可知这里应用副词的比较级形式 faster。",
      },
    ],
  },
  zhongkao_6: {
    title: "话题书面表达 (含 AI 批改)",
    type: "writing",
    paragraphs: [],
    vocabulary: {},
    questions: [],
    writingPrompt:
      "【中考英语话题写作题目】\n兴趣是最好的老师。拥有一个健康的兴趣爱好，可以让我们的学校生活更加丰富多彩。请以 “My Hobby” 为题写一篇英语短文，介绍你自己的兴趣爱好。\n\n写作要点：\n1. 你的爱好是什么；\n2. 你为什么喜欢它（如：放松身心、学到新东西等）；\n3. 这一爱好给你带来了什么影响或收获。\n\n注意：80词左右；开头已给出，不计入总词数。",
    referenceAnswer:
      "My hobby is reading books. Whenever I have free time, I love to open a novel or an science book and enter a different world. Reading is wonderful because it helps me relax after a busy day at school. More importantly, it teaches me a lot of general knowledge that I cannot learn in class. Thanks to this hobby, I have become a better writer and a more broad-minded student. I will keep reading in the future.",
  },

  // ==================== TOEFL (托福英语) ====================
  toefl_0: {
    title: "学术阅读单选",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "The Cretaceous-Tertiary (K-T) boundary, marked by a thin layer of sediment found across the globe, represents one of the most drastic mass extinctions in geological history. For decades, paleontologists debated the primary driver of this event, which wiped out the dinosaurs and over 70 percent of all marine species. The debate was largely settled by the discovery of an enormous impact crater in Chicxulub, Mexico.",
        translation:
          "白垩纪-第三纪（K-T）边界以在全球发现的薄薄一层沉积物为标志，代表了地质历史上最剧烈的物种大灭绝之一。几十年来，古生物学家们一直在争论这一事件的主要驱动因素，该事件消灭了恐龙和超过 70% 的海洋物种。该争论在墨西哥希克苏鲁伯发现一个巨大的撞击坑后，基本上得到了解决。",
      },
      {
        pId: "P2",
        text: "This astronomical collision would have injected catastrophic amounts of sulfur and dust into the stratosphere. The resulting global shroud blocked solar radiation, causing a prolonged nuclear winter that collapsed photosynthetic ecosystems and disrupted global food chains.",
        translation:
          "这种天文级的碰撞将灾难性数量的硫和尘埃注入了平流层。由此产生的全球尘埃罩阻挡了太阳辐射，导致了长期的核冬天，从而使光合作用生态系统崩溃并扰乱了全球食物链。",
      },
    ],
    vocabulary: {
      drastic: {
        word: "drastic",
        phonetic: "[ˈdræstɪk]",
        definition: "adj. 剧烈的，极端的，激烈的",
        example: "The company had to take drastic measures to avoid bankruptcy.",
      },
      shroud: {
        word: "shroud",
        phonetic: "[ʃraʊd]",
        definition: "n. 覆盖物，护罩；v. 遮蔽，覆盖",
        example: "The mountain peaks were shrouded in thick autumn fog.",
      },
    },
    difficultSentences: [
      {
        text: "The resulting global shroud blocked solar radiation, causing a prolonged nuclear winter that collapsed photosynthetic ecosystems and disrupted global food chains.",
        translation:
          "由此产生的全球尘埃罩阻挡了太阳辐射，导致了长期的核冬天，从而使光合作用生态系统崩溃并扰乱了全球食物链。",
        explanation:
          "【长难句解析】主句是 The global shroud blocked solar radiation，后面 causing... 为现在分词作伴随状语（表示结果）。which/that 引导的定语从句修饰 winter。",
      },
    ],
    questions: [
      {
        id: "toefl_0_q1",
        type: "细节题",
        stem: "What discovery largely resolved the debate regarding the K-T extinction?",
        options: [
          { key: "A", text: "A detailed map of marine fossil footprints in East Asia" },
          { key: "B", text: "The discovery of an enormous impact crater in Chicxulub, Mexico" },
          { key: "C", text: "A massive volcanic eruption in the Deccan Traps of India" },
          { key: "D", text: "A decrease in carbon dioxide levels during the Cretaceous period" },
        ],
        answer: "B",
        explain:
          "正确答案 B：细节题。第一段最后一句话明确指出 'largely settled by the discovery of an enormous impact crater in Chicxulub, Mexico'。",
      },
      {
        id: "toefl_0_q2",
        type: "推理题",
        stem: "According to Paragraph 2, how did the dust shroud affect global life forms?",
        options: [
          { key: "A", text: "It stimulated rapid evolutionary adaptations in plants." },
          { key: "B", text: "It blocked solar radiation, collapsing photosynthesis." },
          { key: "C", text: "It caused oceans to boil and vaporize rapidly." },
          { key: "D", text: "It created high gravity environments across the earth." },
        ],
        answer: "B",
        explain:
          "正确答案 B：推理因果题。第二段指出 dust shroud 阻挡了太阳辐射（blocked solar radiation），导致光合生态系统崩溃（collapsed photosynthetic ecosystems）。",
      },
    ],
  },
  toefl_1: {
    title: "学科词汇理解",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "TOEFL Academic vocabulary often tests synonyms and precise conceptual matches in scientific and social study settings. Below is an academic word quiz.",
        translation:
          "托福学术词汇经常测试在科学与社会研究背景中的同义词和精确概念匹配。以下是学术词汇测试。",
      },
    ],
    vocabulary: {},
    questions: [
      {
        id: "toefl_1_q1",
        type: "词汇选择",
        stem: "The word 'drastic' in geological text is closest in meaning to ___.",
        options: [
          { key: "A", text: "gradual" },
          { key: "B", text: "severe" },
          { key: "C", text: "temporary" },
          { key: "D", text: "beneficial" },
        ],
        answer: "B",
        explain:
          "正确答案 B：drastic 意为“剧烈的，极端的”，与 severe（严重的、严厉的）在程度上和概念上最匹配。gradual 意为渐进的。",
      },
    ],
  },
  toefl_2: {
    title: "语境词义辨析",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Biologists monitoring deep cave species have observed that these creatures have a highly rudimentary visual system. Since there is zero natural light, they rely strictly on chemical sensors to detect nearby organic matter.",
        translation:
          "监测深层洞穴物种的生物学家发现，这些生物拥有极其不发达的视觉系统。由于没有任何自然光，它们完全依赖化学传感器来探测附近的有机物。",
      },
    ],
    vocabulary: {
      rudimentary: {
        word: "rudimentary",
        phonetic: "[ˌruːdɪˈmentri]",
        definition: "adj. 原始的，不发达的，基本的",
        example: "The children have only a rudimentary knowledge of physics.",
      },
    },
    questions: [
      {
        id: "toefl_2_q1",
        type: "词汇题",
        stem: "The word 'rudimentary' in the passage is closest in meaning to ___.",
        options: [
          { key: "A", text: "sophisticated" },
          { key: "B", text: "elementary" },
          { key: "C", text: "beneficial" },
          { key: "D", text: "unusual" },
        ],
        answer: "B",
        explain:
          "正确答案 B：rudimentary 意为“基本的，原始的，不发达的”，与 elementary（初级的，基本的）最为贴切。sophisticated 意为高级复杂的。",
      },
    ],
  },
  toefl_3: {
    title: "学术听力单选",
    type: "listening",
    paragraphs: [
      {
        pId: "Lecture Draft",
        text: "🔊 [Professor]: Today we're exploring deep-ocean hydrothermal vents. These are volcanic chimneys on the ocean floor, under extreme pressure and in pitch blackness. You'd think life is impossible here. But instead, we find dense colonies of tube worms and giant clams. They survive not on sunlight, but through chemosynthesis—a process where bacteria convert hydrogen sulfide into organic energy.",
        translation:
          "🔊 [教授]：今天我们要探讨深海热液喷口。这些是海底的火山烟囱，处于极端压力和漆黑一片的环境中。你会认为这里不可能有生命。但相反，我们发现了密集的管状蠕虫和巨蛤群落。它们不依靠阳光生存，而是通过化能合成——这一过程中细菌将硫化氢转化为有机能量。",
      },
    ],
    vocabulary: {
      chemosynthesis: {
        word: "chemosynthesis",
        phonetic: "[ˌkiːməʊˈsɪnθəsɪs]",
        definition: "n. 化能合成（作用）",
        example: "Deep sea bacteria use chemosynthesis to produce food.",
      },
    },
    questions: [
      {
        id: "toefl_3_q1",
        type: "听力理解",
        stem: "What is the primary source of energy for hydrothermal vent ecosystems?",
        options: [
          { key: "A", text: "Solar radiation penetrating through deep trenches" },
          { key: "B", text: "Chemosynthesis driven by volcanic bacteria" },
          { key: "C", text: "Decomposing leaves drifting from continental rivers" },
          { key: "D", text: "Nuclear fission under oceanic crust plates" },
        ],
        answer: "B",
        explain:
          "正确答案 B：细节分析题。教授提到它们通过 'chemosynthesis—a process where bacteria convert hydrogen sulfide into organic energy' 生存，即由火山细菌驱动的化能合成。",
      },
    ],
  },
  toefl_4: {
    title: "独立口语表达",
    type: "listening",
    paragraphs: [
      {
        pId: "Prompt Info",
        text: "🔊 Click the microphone icon to review the independent speaking task. You have 15 seconds to prepare and 45 seconds to record your answer. Speak clearly and use specific reasons.",
        translation: "🔊 考查独立口语：你准备15秒，说45秒。表达时需条理清晰并提供具体论据。",
      },
    ],
    vocabulary: {},
    questions: [],
    writingPrompt:
      "【TOEFL Speaking Task 1 Prompt】\nSome students prefer to attend universities that require students to attend all classes and lectures. Others prefer universities where attendance is completely optional. Which do you prefer and why? Use specific reasons and examples to support your choice.",
    referenceAnswer:
      "Personally, I strongly prefer universities where class attendance is completely optional. My primary reason is that optional attendance fosters a high level of self-discipline. College students are adults and they should learn how to manage their schedules and priorities independently. Furthermore, optional attendance allows for greater learning efficiency. For instance, if a student can grasp a textbook concept much faster on their own, they can use class time to do internships or research instead of sitting through redundant lectures. Thus, optional attendance promotes personal freedom and academic efficiency.",
  },
  toefl_5: {
    title: "学术写作表达 (含 AI 批改)",
    type: "writing",
    paragraphs: [],
    vocabulary: {},
    questions: [],
    writingPrompt:
      "【TOEFL Writing for Academic Discussion】\nYour professor is teaching a class on environmental economics. Write a post responding to the professor's question in at least 100 words.\n\nProfessor: Some governments are considering placing high taxes on plastic packaging to reduce plastic pollution. Do you think this is a highly effective policy, or will it hurt businesses too much? Provide your opinion.",
    referenceAnswer:
      "From my perspective, placing high taxes on plastic packaging is an extremely effective environmental policy. While it might initially increase operational costs for retail businesses, this tax provides a powerful economic incentive for industries to develop and transition to biodegradable materials like bamboo or paper fiber. Consumers, too, will be motivated to bring reusable canvas bags to avoid extra packaging charges. Over time, the environmental benefits of reduced landfill waste and cleaner oceans will far outweigh the short-term financial adjustments. Therefore, the long-term ecological gains of this policy completely justify the economic pressure on businesses.",
  },

  // ==================== IELTS (雅思英语) ====================
  ielts_0: {
    title: "生活核心场景词汇",
    type: "listening",
    paragraphs: [
      {
        pId: "Listening S1",
        text: "🔊 [Receptionist]: Welcome to City Gym! How can I help you? \n[Customer]: Hi, I'd like to sign up for a gym membership. Can you tell me your annual pricing plan? \n[Receptionist]: Certainly. Our standard annual package costs 360 pounds, which includes full access to the fitness hall, indoor pool, and free locker rental.",
        translation:
          "🔊 [接待员]：欢迎来到城市健身房！有什么可以帮您的？\n[顾客]：你好，我想办一张健身卡。你能告诉我你们的年费套餐吗？\n[接待员]：当然可以。我们的标准年度礼包是360英镑，其中包括全天候进入健身大厅、室内泳池以及免费更衣柜租赁。",
      },
    ],
    vocabulary: {},
    questions: [
      {
        id: "ielts_0_q1",
        type: "听力填空",
        stem: "What is the price of the standard annual gym membership package?",
        options: [
          { key: "A", text: "120 pounds" },
          { key: "B", text: "240 pounds" },
          { key: "C", text: "360 pounds" },
          { key: "D", text: "500 pounds" },
        ],
        answer: "C",
        explain: "正确答案 C：数字考查。接待员明确报出年费价格：'360 pounds'。",
      },
    ],
  },
  ielts_1: {
    title: "高频学术词汇运用",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "To achieve a high band score in IELTS Academic Reading, students must master collocations of academic words. For example, the verb 'coincide' is often followed by the preposition 'with', indicating that two complex events happened at the same time.",
        translation:
          "为了在雅思学术类阅读中获得高分，学生必须掌握学术词汇的固定搭配。例如，动词 'coincide' 经常与介词 'with' 连用，表示两个复杂的事件同时发生。",
      },
    ],
    vocabulary: {
      coincide: {
        word: "coincide",
        phonetic: "[ˌkəʊɪnˈsaɪd]",
        definition: "v. 一致，同时发生，相符",
        example: "Our school holidays coincide with the great local autumn festival.",
      },
    },
    questions: [
      {
        id: "ielts_1_q1",
        type: "词汇考查",
        stem: "Which preposition is typically paired with 'coincide'?",
        options: [
          { key: "A", text: "on" },
          { key: "B", text: "with" },
          { key: "C", text: "for" },
          { key: "D", text: "at" },
        ],
        answer: "B",
        explain: "正确答案 B：固定搭配。coincide with 表示“与……同时发生/相吻合”。",
      },
    ],
  },
  ielts_2: {
    title: "学术阅读 (匹配题)",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "The discovery of penicillin by Alexander Fleming in 1928 revolutionized medical science. Returning to his laboratory, Fleming noticed that a common mold had contaminated one of his petri dishes, and that the bacteria surrounding the mold had been destroyed. This chance observation led to the development of modern antibiotics, saving millions of lives.",
        translation:
          "亚历山大·弗莱明于 1928 年发现青霉素彻底改变了医学科学。回到实验室后，弗莱明注意到一种普通的霉菌污染了他的一个培养皿，并且霉菌周围的细菌已被消灭。这一偶然的观察促成了现代抗生素的开发，挽救了数百万人的生命。",
      },
    ],
    vocabulary: {
      contaminated: {
        word: "contaminate",
        phonetic: "[kənˈtæmɪneɪt]",
        definition: "v. 污染，毒害",
        example: "The drinking water supply was contaminated by agricultural waste.",
      },
    },
    questions: [
      {
        id: "ielts_2_q1",
        type: "细节判断",
        stem: " Fleming discovered penicillin through a planned research experiment rather than a chance event.",
        options: [
          { key: "A", text: "TRUE" },
          { key: "B", text: "FALSE" },
          { key: "C", text: "NOT GIVEN" },
        ],
        answer: "B",
        explain:
          "正确答案 B（即 FALSE）：是非判断题。文中提到 'chance observation led to...'，即偶然的观察，并非计划好的实验，因此选项描述与文意完全相反。",
      },
    ],
  },
  ielts_3: {
    title: "图表学术写作 (含 AI 批改)",
    type: "writing",
    paragraphs: [],
    vocabulary: {},
    questions: [],
    writingPrompt:
      "【IELTS Writing Task 1 Prompt】\nThe bar chart below shows the average daily water consumption per person in three major cities (London, Beijing, and New York) between 2000 and 2025.\n\nSummarize the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
    referenceAnswer:
      "The bar chart illustrates the average amount of water consumed daily by an individual in London, Beijing, and New York from 2000 to 2025. \n\nOverall, New York recorded the highest daily water usage per capita throughout the entire period, whereas Beijing residents consistently consumed the least. \n\nIn detail, in the year 2000, New Yorkers used approximately 350 liters of water daily, which gradually declined to 300 liters by 2025. Despite this downward trend, New York's consumption remained significantly higher than the other two cities. In contrast, water usage in London started at 240 liters in 2000 and remained relatively stable, fluctuating slightly around 220 liters over the twenty-five-year timeframe. \n\nMeanwhile, Beijing residents used only 80 liters of water per day in 2000. However, this figure experienced a continuous increase, reaching 150 liters by 2025. This indicates a growing household demand in Beijing, contrasting with the conservation efforts seen in New York.",
  },
  ielts_4: {
    title: "议论文写作 (含 AI 批改)",
    type: "writing",
    paragraphs: [],
    vocabulary: {},
    questions: [],
    writingPrompt:
      "【IELTS Writing Task 2 Prompt】\nSome people believe that the government should make all public transport free of charge to reduce traffic congestion and environmental pollution. To what extent do you agree or disagree with this statement?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    referenceAnswer:
      "It is often suggested that municipal authorities should provide free public transit services to mitigate traffic gridlocks and lower emission levels in urban areas. Personally, I mostly agree with this proposal, as the environmental and economic benefits of such a policy heavily outweigh the financial costs of implementation.\n\nThe primary advantage of making subways and buses completely free is that it offers a powerful financial incentive for private vehicle owners to leave their cars at home. Commuting in crowded city centers is notoriously expensive due to parking fees and fuel costs. If comfortable public alternatives are free, a substantial proportion of motorists will switch, which will dramatically reduce the volume of cars on the road, directly easing traffic congestion and reducing carbon emissions.\n\nFurthermore, free public transport promotes social equity and economic mobility. Low-income citizens, students, and elderly people spend a large percentage of their income on travel. Making transit free relieves their financial burden, allowing them to travel freely to work, school, and healthcare facilities. This boosts local businesses and creates vibrant neighborhood economies.\n\nHowever, skeptics argue that maintaining free transit systems requires high taxes and might lead to overcrowded carriages or decreased service quality. To address this, governments can fund transit through road congestion charges on private vehicles or green carbon taxes. This ensures a sustainable stream of funding to expand transit capacities and maintain high cleanliness standards.\n\nIn conclusion, providing free public transport is a highly progressive urban planning strategy. It is an effective solution to tackle environmental pollution, minimize gridlocks, and foster a more inclusive urban society.",
  },
  ielts_5: {
    title: "口语现场模拟",
    type: "listening",
    paragraphs: [
      {
        pId: "Speaking Info",
        text: "🔊 Click the recorder on the left to practice the IELTS speaking cue card. Speak for 1 to 2 minutes on the topic below. Make sure to structure your answers logically.",
        translation:
          "🔊 雅思口语 Part 2 主题演讲：点击左侧播放或录音，准备1分钟，陈述1至2分钟。表达要点需串联成逻辑严密的结构。",
      },
    ],
    vocabulary: {},
    questions: [],
    writingPrompt:
      "【IELTS Speaking Part 2 Cue Card】\nDescribe an item of technology that you find extremely useful in your daily life.\n\nYou should say:\n1. What it is and when you bought/acquired it\n2. How often you use it\n3. What you use it to do\n4. And explain why you find it so useful and indispensable.",
    referenceAnswer:
      "I would like to describe my noise-canceling headphones, which have become absolutely indispensable in my daily life. I bought them about two years ago before preparing for my final university exams.\n\nI use them practically every single day, especially during my morning commutes on the crowded subway and while working in noisy coffee shops. \n\nMy primary use is to block out ambient environmental noise. With a single flick of a button, all distracting chatters and engine roars are instantly silenced, allowing me to fully immerse myself in my study materials, audio lectures, or relaxing classical music. Additionally, they have a built-in microphone, which makes them incredibly convenient for taking hands-free video calls and attending online seminars.\n\nThey are exceptionally useful because they create a portable, peaceful sanctuary for me wherever I go. In a bustling, modern environment, finding a quiet corner to focus is extremely difficult. These headphones allow me to study and stay productive under any chaotic circumstance. They've not only improved my learning efficiency but also reduced my daily stress levels significantly.",
  },
};

export function getReadingMaterial(
  category: string,
  year: string,
  sectionIndex: number,
  rawQs: {
    word?: string;
    phonetic?: string;
    stem?: string;
    options?: { key: string; text: string }[];
    answer?: string;
    explain?: string;
    tag?: string;
  }[],
  bankId: string,
): ReadingMaterial {
  const key = `${category}_${sectionIndex}`;
  if (PRESETS[key]) {
    const base = PRESETS[key];
    const displayYear = year.replace("年真题", "").trim();
    let title = base.title;
    if (displayYear && !title.includes(displayYear)) {
      title = `${displayYear}年 · ${title}`;
    }
    return {
      ...base,
      title,
    };
  }

  // Fallback Procedural Generator: convert standard single bank question into a reading layout
  const seedQ = rawQs[Math.abs(sectionIndex) % rawQs.length] || {
    word: "Topic",
    phonetic: "[ˈtɒpɪk]",
    stem: "No passage text available.",
    options: [
      { key: "A", text: "Option A" },
      { key: "B", text: "Option B" },
    ],
    answer: "A",
    explain: "No explanation.",
  };

  const isWriting =
    seedQ.tag?.includes("写") ||
    seedQ.tag?.includes("作") ||
    seedQ.tag?.includes("译") ||
    seedQ.tag?.includes("表达");

  const wordName = seedQ.word || "academic";
  const defText = seedQ.explain?.split("意为")?.[1]?.split("。")?.[0] || "核心考查学术词汇";

  return {
    title: seedQ.tag?.split(" · ")?.[1] || "真题模块精练",
    type: isWriting ? "writing" : "reading",
    paragraphs: [
      {
        pId: "P1",
        text:
          seedQ.stem ||
          "Please read the sentence and context carefully to analyze the syntactic structure and vocabulary meanings.",
        translation:
          "请仔细阅读上方英文真题材料，理清其核心主谓宾关系、学术词组搭配与考纲词汇表达。",
      },
    ],
    vocabulary: {
      [wordName]: {
        word: wordName,
        phonetic: seedQ.phonetic || "[əˈkædemɪk]",
        definition: defText,
        example: `The word '${wordName}' is a high-frequency vocabulary item in this examination.`,
      },
    },
    questions: isWriting
      ? []
      : [
          {
            id: `${bankId}_${year.replace(/\s+/g, "_")}_sec_${sectionIndex}_q1`,
            type: "细节解析",
            stem: `Based on the context, what is the best interpretation or answer for this true exam question?`,
            options: seedQ.options || [],
            answer: seedQ.answer || "A",
            explain: seedQ.explain || "根据试题核心语境与句法考点进行推断。",
          },
        ],
    writingPrompt: isWriting ? seedQ.stem : undefined,
    referenceAnswer: isWriting ? seedQ.explain || "官方正在整理中" : undefined,
  };
}
