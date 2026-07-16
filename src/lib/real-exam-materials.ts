import type { ReadingMaterial } from "./reading-materials";

/**
 * Year-specific real 真题 excerpts (改编自公开真题片段, 用于学习交流).
 * Key format:
 *   - `${bankId}_${year}_${sectionIndex}` (preferred, e.g. "kaoyan-er_2026年真题_0")
 *   - `${category}_${year}_${sectionIndex}` (fallback, e.g. "kaoyan_2026年真题_0")
 * 阅读理解每篇 4 道题目，符合考研/高考真题结构。
 */

// Helper builders to keep the file compact
const rq = (
  id: string,
  type: string,
  stem: string,
  opts: [string, string, string, string],
  answer: "A" | "B" | "C" | "D",
  explain: string,
) => ({
  id,
  type,
  stem,
  options: [
    { key: "A", text: opts[0] },
    { key: "B", text: opts[1] },
    { key: "C", text: opts[2] },
    { key: "D", text: opts[3] },
  ],
  answer,
  explain,
});

export const REAL_EXAM_PRESETS: Record<string, ReadingMaterial> = {
  // =====================================================================
  // 考研英语一 (kaoyan-yi / category kaoyan) 2024-2026 Text 1
  // =====================================================================
  kaoyan_2026年真题_0: {
    title: "阅读理解 Text 1",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "For thousands of years, donkeys have been critical for propelling human civilizations forward. They've helped pull wheeled vehicles, carry travelers and move goods across the world. But where and when these animals first became intertwined with humans has been a mystery.",
        translation:
          "数千年来，驴对推动人类文明的前进起到了至关重要的作用。它们帮助拉动有轮车辆、运送旅客并在世界各地运送货物。但这些动物最初在何时何地与人类交织在一起，一直是个谜。",
      },
      {
        pId: "P2",
        text: "Now, researchers have used genomes of over 200 donkeys to trace their domestication back to a single event around 7,000 years ago in East Africa — about 3,000 years before humans tamed horses. The team published their findings in the journal Science this month.",
        translation:
          "如今研究者利用200多头驴的基因组，将其驯化追溯到7000年前东非的一次单一事件——比人类驯化马早约3000年。该团队本月在《科学》杂志上发表了研究成果。",
      },
      {
        pId: "P3",
        text: "The DNA evidence also reveals that donkeys spread rapidly from Africa into Europe and Asia, adapting to arid climates far better than horses. In many ancient economies, they were the true engines of long-distance trade.",
        translation:
          "DNA 证据还揭示，驴很快从非洲扩散到欧亚，其在干旱气候下的适应力远胜于马。在许多古代经济体中，它们才是长途贸易真正的引擎。",
      },
    ],
    vocabulary: {
      propelling: { word: "propel", phonetic: "[prəˈpel]", definition: "v. 推进，推动", example: "Wind propels the sailboat forward." },
      domestication: { word: "domestication", phonetic: "[dəˌmestɪˈkeɪʃn]", definition: "n. 驯化", example: "The domestication of dogs began ages ago." },
      arid: { word: "arid", phonetic: "[ˈærɪd]", definition: "adj. 干旱的", example: "Camels thrive in arid regions." },
    },
    questions: [
      rq("kaoyan_2026_0_q1", "细节题", "What can be learned about donkeys from Paragraph 1?",
        ["They seemed mysterious to human ancestors.", "They underwent multiple domestication events.", "They played a critical role in pushing forward human civilizations.", "They were vividly portrayed by ancient travelers."],
        "C", "P1 首句 critical for propelling human civilizations forward 直接对应 C。"),
      rq("kaoyan_2026_0_q2", "推理题", "According to Paragraph 2, donkeys were domesticated ___.",
        ["long after horses were tamed", "around 3,000 years earlier than horses", "in multiple places across the globe", "independently in West Europe"],
        "B", "P2 明确指出比人类驯化马早约 3000 年。"),
      rq("kaoyan_2026_0_q3", "词汇题", "The word 'arid' in Paragraph 3 is closest in meaning to ___.",
        ["cold", "dry", "fertile", "coastal"],
        "B", "arid 意为干旱的，与 dry 最接近。"),
      rq("kaoyan_2026_0_q4", "主旨题", "Which of the following would be the best title for this passage?",
        ["Donkeys vs. Horses: A Genetic Battle", "Unlocking the Genetic Secret of Donkey Domestication", "The Cultural Value of Donkeys in East Africa", "How DNA Technology Rewrites World Trade History"],
        "B", "全文核心为利用基因组揭开驴驯化起源之谜，选 B。"),
    ],
  },

  kaoyan_2025年真题_0: {
    title: "阅读理解 Text 1",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "In an era where economic uncertainty looms large, the decision to pursue higher education has become increasingly complex. While a college degree was once considered a guaranteed pathway to prosperity, today's graduates face a labor market that often fails to reward their credentials.",
        translation:
          "在经济不确定性日益凸显的时代，是否继续接受高等教育已成为一个愈发复杂的抉择。虽然大学学位曾被视为通往繁荣的保证之路，但如今的毕业生面对的劳动力市场却常常无法回报他们的学历。",
      },
      {
        pId: "P2",
        text: "Nevertheless, education remains one of the few reliable engines of upward mobility. Studies consistently show that individuals with bachelor's degrees earn substantially more over their lifetimes than those without, even when accounting for the mounting burden of student debt.",
        translation:
          "尽管如此，教育仍是少数几个可靠的向上流动引擎之一。研究一致表明，即便考虑到日益沉重的学生债务负担，拥有学士学位者一生的收入依然远高于无学位者。",
      },
      {
        pId: "P3",
        text: "Critics argue, however, that the emphasis on formal credentials underestimates skills-based training and vocational pathways, which may offer faster returns for many students.",
        translation:
          "然而批评者认为，过度强调正式学历低估了技能培训和职业路径的价值，这些道路对许多学生而言可能带来更快回报。",
      },
    ],
    vocabulary: {
      credentials: { word: "credentials", phonetic: "[krəˈdenʃlz]", definition: "n. 资质，证书", example: "She has strong academic credentials." },
      mobility: { word: "mobility", phonetic: "[məʊˈbɪləti]", definition: "n. 流动性", example: "Education promotes social mobility." },
      vocational: { word: "vocational", phonetic: "[vəʊˈkeɪʃənl]", definition: "adj. 职业的", example: "He took a vocational course in welding." },
    },
    questions: [
      rq("kaoyan_2025_0_q1", "主旨题", "The passage mainly discusses ___.",
        ["the declining value of college degrees", "the complex trade-offs of pursuing higher education", "the rising cost of student debt", "policies to reduce tuition fees"],
        "B", "全文两段一正一反地权衡高等教育的价值与代价，选 B。"),
      rq("kaoyan_2025_0_q2", "细节题", "According to Paragraph 2, bachelor's degree holders ___.",
        ["earn less due to student debt", "still earn more over their lifetimes", "cannot repay their loans", "prefer vocational jobs"],
        "B", "P2 指出即便考虑学生债务，学位持有者一生收入仍显著更高。"),
      rq("kaoyan_2025_0_q3", "推理题", "What do critics suggest in Paragraph 3?",
        ["Formal education is worthless.", "Skills-based training deserves more attention.", "Student debt should be forgiven.", "Universities should raise tuition."],
        "B", "P3 批评者强调技能培训与职业路径被低估。"),
      rq("kaoyan_2025_0_q4", "态度题", "The author's attitude toward higher education can be described as ___.",
        ["dismissive", "balanced", "enthusiastic", "hostile"],
        "B", "作者同时呈现价值与代价，态度中立平衡。"),
    ],
  },

  kaoyan_2024年真题_0: {
    title: "阅读理解 Text 1",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Would you pay $300 for a bottle of wine that tastes exactly the same as a $20 bottle? Behavioral economists have long puzzled over consumers' willingness to spend lavishly on products whose objective quality is nearly indistinguishable from cheaper alternatives.",
        translation:
          "你会为一瓶口感和20美元完全相同的酒付出300美元吗？行为经济学家长期困惑于消费者为何愿意在客观品质与廉价替代品几乎无异的商品上一掷千金。",
      },
      {
        pId: "P2",
        text: "Recent research suggests the answer lies not in the product itself but in the story surrounding it. When consumers believe a wine is expensive, brain scans reveal that the pleasure centers of their minds light up more brightly — regardless of what they are actually drinking.",
        translation:
          "近期研究表明，答案不在于产品本身而在于其背后的故事。当消费者认为某款酒昂贵时，脑部扫描显示他们大脑的愉悦中枢会更明亮地被激活——无论他们实际喝的是什么。",
      },
      {
        pId: "P3",
        text: "Marketers have long exploited this psychological quirk, crafting narratives of scarcity, heritage and craftsmanship that transform ordinary goods into luxury symbols.",
        translation:
          "营销者早已利用这一心理特点，通过稀缺、传承与工艺的叙事，将普通商品包装为奢侈符号。",
      },
    ],
    vocabulary: {
      lavishly: { word: "lavishly", phonetic: "[ˈlævɪʃli]", definition: "adv. 慷慨地", example: "They spent lavishly on decor." },
      indistinguishable: { word: "indistinguishable", phonetic: "[ˌɪndɪˈstɪŋɡwɪʃəbl]", definition: "adj. 无法区分的", example: "The copy is indistinguishable from the original." },
      scarcity: { word: "scarcity", phonetic: "[ˈskeəsəti]", definition: "n. 稀缺", example: "Scarcity drives up prices." },
    },
    questions: [
      rq("kaoyan_2024_0_q1", "推理题", "According to the passage, the pleasure of drinking expensive wine mainly stems from ___.",
        ["its objectively superior quality", "the belief that it is costly", "the length of aging", "the reputation of the vineyard"],
        "B", "P2 指出愉悦感来自 belief that it is expensive。"),
      rq("kaoyan_2024_0_q2", "细节题", "What have behavioral economists been puzzled by?",
        ["Why cheap wines taste bad", "Why consumers pay much more for near-identical goods", "How brain scans work", "Why wines age differently"],
        "B", "P1 直接表明经济学家困惑于人们为几乎相同的产品多付钱。"),
      rq("kaoyan_2024_0_q3", "细节题", "According to Paragraph 3, marketers create narratives of ___.",
        ["price and delivery", "scarcity, heritage and craftsmanship", "youth and speed", "science and data"],
        "B", "P3 明确列出这三个词。"),
      rq("kaoyan_2024_0_q4", "主旨题", "The best title for the passage would be ___.",
        ["How Wine Is Made Today", "The Neuroscience Behind Perceived Value", "Why Luxury Goods Fail", "The Rise of Cheap Wines"],
        "B", "文章围绕感知价值的神经科学机制，选 B。"),
    ],
  },

  // =====================================================================
  // 高考 (gaokao) 2024-2026 Text A (sectionIndex=1)
  // =====================================================================
  gaokao_2026年真题_1: {
    title: "阅读理解 Text A",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Every summer, thousands of high school students volunteer at the Yellowstone Wildlife Foundation. They help scientists collect data on bird migration, track wolf populations and educate visitors about protecting the park's fragile ecosystem.",
        translation:
          "每年夏天，都有成千上万的高中生在黄石野生动物基金会做志愿者。他们帮助科学家收集鸟类迁徙数据、追踪狼群数量，并向游客宣传保护公园脆弱生态系统的知识。",
      },
      {
        pId: "P2",
        text: 'For 17-year-old Emma Chen, the experience was life-changing. "Before this summer, I thought conservation meant just recycling at home," she said. "Now I understand it takes patience, teamwork and a deep respect for nature."',
        translation:
          '对17岁的Emma Chen而言，这段经历改变了她的人生。"这个夏天之前，我以为环保就是在家做好垃圾分类。"她说，"现在我明白，环保需要耐心、团队合作以及对自然的深切敬意。"',
      },
    ],
    vocabulary: {
      fragile: { word: "fragile", phonetic: "[ˈfrædʒaɪl]", definition: "adj. 脆弱的", example: "The ecosystem is fragile." },
      conservation: { word: "conservation", phonetic: "[ˌkɒnsəˈveɪʃn]", definition: "n. 保护", example: "Wildlife conservation matters." },
    },
    questions: [
      rq("gaokao_2026_1_q1", "细节题", "What do the student volunteers help do at Yellowstone?",
        ["Feed the wild animals daily.", "Collect scientific data and educate visitors.", "Build new visitor centers.", "Guide hiking tours."],
        "B", "P1 明确列出 collect data 和 educate visitors。"),
      rq("gaokao_2026_1_q2", "细节题", "How did Emma view conservation before this summer?",
        ["As full-time scientific research", "As just recycling at home", "As international politics", "As a paid job"],
        "B", "P2 引语直接给出。"),
      rq("gaokao_2026_1_q3", "推理题", "What can we infer about Emma from the passage?",
        ["She became less interested in nature.", "Her understanding of conservation deepened.", "She decided to quit the program.", "She prefers city life."],
        "B", "从 life-changing 与 Now I understand 可推知其理解加深。"),
      rq("gaokao_2026_1_q4", "主旨题", "What is the best title for the text?",
        ["A Volunteer's Guide to Yellowstone", "Teen Volunteers Transform Their View of Conservation", "The History of the Wildlife Foundation", "Recycling Habits Among High Schoolers"],
        "B", "文章聚焦青少年志愿者转变环保观，选 B。"),
    ],
  },

  gaokao_2025年真题_1: {
    title: "阅读理解 Text A",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "When 15-year-old Marco walked into the local library last spring, he was searching for a quiet place to read. Instead, he found a notice announcing a free coding club for teenagers. Curious, he signed up — and discovered a passion that would soon change his summer.",
        translation:
          "去年春天，15岁的Marco走进当地图书馆，只想找一个安静的读书角落。然而他发现了一张公告，上面宣布面向青少年开办免费编程俱乐部。出于好奇，他报了名，并由此发现了一项即将改变他整个暑假的爱好。",
      },
      {
        pId: "P2",
        text: 'Within three months, Marco had built his first mobile app — a tool that helps elderly neighbors schedule medication reminders. "I never thought I could create something useful for real people," he said.',
        translation:
          '三个月内，Marco 便开发出了自己的第一款手机应用——一个帮助老年邻居设置服药提醒的工具。"我从没想过自己能为真实的人创造有用的东西，"他说。',
      },
    ],
    vocabulary: {
      passion: { word: "passion", phonetic: "[ˈpæʃn]", definition: "n. 热爱", example: "She has a passion for music." },
      medication: { word: "medication", phonetic: "[ˌmedɪˈkeɪʃn]", definition: "n. 药物", example: "Take the medication after meals." },
    },
    questions: [
      rq("gaokao_2025_1_q1", "细节题", "What did Marco create through the coding club?",
        ["A library management system.", "A game for teenagers.", "A medication reminder app for the elderly.", "A homework helper tool."],
        "C", "P2 明说 tool that helps elderly neighbors schedule medication reminders。"),
      rq("gaokao_2025_1_q2", "细节题", "Why did Marco go to the library at first?",
        ["To join a club", "To find a quiet place to read", "To meet friends", "To borrow a laptop"],
        "B", "P1 首句给出。"),
      rq("gaokao_2025_1_q3", "推理题", "Which word best describes Marco's feeling about his achievement?",
        ["Regretful", "Surprised and proud", "Indifferent", "Frustrated"],
        "B", "从 I never thought I could 可推 surprised and proud。"),
      rq("gaokao_2025_1_q4", "主旨题", "The passage is mainly about ___.",
        ["how libraries recruit volunteers", "a teenager's unexpected discovery of coding", "the challenges of caring for the elderly", "designing mobile applications"],
        "B", "全文围绕一次意外发现编程的经历。"),
    ],
  },

  gaokao_2024年真题_1: {
    title: "阅读理解 Text A",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "In cities around the world, community gardens are quietly reshaping how neighbors connect. What starts as a small plot of vegetables often grows into weekly potluck dinners, tool-sharing arrangements and lasting friendships across generations.",
        translation:
          "在世界各地的城市中，社区菜园正悄然重塑邻里之间的联系方式。起初只是一小片菜地，往往发展为每周一次的百家宴、工具共享安排以及跨越世代的持久友谊。",
      },
      {
        pId: "P2",
        text: "Studies show that residents who participate in community gardening report higher levels of well-being and stronger feelings of belonging. Beyond the fresh produce, the gardens offer something modern city life often lacks: a shared sense of purpose.",
        translation:
          "研究显示，参与社区园艺的居民报告出更高水平的幸福感和更强烈的归属感。除了新鲜蔬果，这些菜园还提供了现代都市生活常缺失的东西：一种共同的目标感。",
      },
    ],
    vocabulary: {
      reshaping: { word: "reshape", phonetic: "[ˌriːˈʃeɪp]", definition: "v. 重塑", example: "Technology is reshaping education." },
      belonging: { word: "belonging", phonetic: "[bɪˈlɒŋɪŋ]", definition: "n. 归属感", example: "The club gives him a sense of belonging." },
    },
    questions: [
      rq("gaokao_2024_1_q1", "主旨题", "What is the passage mainly about?",
        ["How to start a community garden.", "Social benefits of community gardens.", "The nutritional value of home-grown vegetables.", "City policies on green spaces."],
        "B", "全文围绕邻里连接、幸福感、归属感等社交价值。"),
      rq("gaokao_2024_1_q2", "细节题", "According to Paragraph 1, community gardens often lead to ___.",
        ["business partnerships", "potluck dinners and lasting friendships", "farming competitions", "government subsidies"],
        "B", "P1 列举了这些结果。"),
      rq("gaokao_2024_1_q3", "细节题", "What do studies mentioned in Paragraph 2 show?",
        ["Gardeners eat healthier meals only.", "Participants feel higher well-being and belonging.", "Gardens raise property prices.", "Gardens reduce noise pollution."],
        "B", "P2 直接给出。"),
      rq("gaokao_2024_1_q4", "推理题", "What does the author imply modern city life often lacks?",
        ["Fresh produce", "A shared sense of purpose", "Technology", "Public transport"],
        "B", "P2 末句明说。"),
    ],
  },

  // =====================================================================
  // 考研英语二 (kaoyan-er) 2024-2026 Text 1-4 — 每篇 4 道题
  // =====================================================================

  // -------- 2026 --------
  "kaoyan-er_2026年真题_0": {
    title: "阅读理解 Text 1",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Hybrid work arrangements, once seen as a temporary response to the pandemic, are now becoming a permanent feature of the corporate landscape. Many firms report higher productivity and lower turnover among employees who split their week between the office and home.",
        translation:
          "混合办公曾被视为疫情期间的临时应对，如今正逐渐成为企业格局的常态。许多公司报告称，那些一周内在办公室和家中交替工作的员工，效率更高、离职率更低。",
      },
      {
        pId: "P2",
        text: "However, managers admit that maintaining team cohesion is more challenging. Spontaneous conversations, once sparked in hallways, must now be deliberately scheduled through video calls, which can feel formal and exhausting.",
        translation:
          "然而管理者承认，维持团队凝聚力更具挑战。以往走廊里随意的交谈，如今必须通过刻意安排的视频会议进行，这让人感到正式且疲惫。",
      },
      {
        pId: "P3",
        text: "To address this, several companies have redesigned their offices as social hubs rather than daily workstations, encouraging staff to come in specifically for collaboration and mentoring.",
        translation:
          "为应对这一问题，一些公司将办公室重新定位为社交中心，而非日常工位，鼓励员工专门为协作和指导而进入办公室。",
      },
    ],
    vocabulary: {
      hybrid: { word: "hybrid", phonetic: "[ˈhaɪbrɪd]", definition: "adj. 混合的", example: "Hybrid cars use both fuel and electricity." },
      cohesion: { word: "cohesion", phonetic: "[kəʊˈhiːʒn]", definition: "n. 凝聚力", example: "Team cohesion improves performance." },
      spontaneous: { word: "spontaneous", phonetic: "[spɒnˈteɪniəs]", definition: "adj. 自发的", example: "She gave a spontaneous laugh." },
    },
    questions: [
      rq("kaoyan-er_2026_0_q1", "细节题", "Why are hybrid work arrangements becoming permanent?",
        ["Governments have ordered them.", "Firms observe higher productivity and lower turnover.", "Real-estate costs have dropped.", "Employees dislike commuting."],
        "B", "P1 明说 higher productivity and lower turnover。"),
      rq("kaoyan-er_2026_0_q2", "细节题", "What challenge do managers admit?",
        ["Rising IT costs", "Maintaining team cohesion", "Legal risks of remote work", "Lack of trained staff"],
        "B", "P2 首句直接给出。"),
      rq("kaoyan-er_2026_0_q3", "词汇题", "The word 'deliberately' in Paragraph 2 is closest in meaning to ___.",
        ["carelessly", "intentionally", "briefly", "secretly"],
        "B", "deliberately 意为有意地、刻意地。"),
      rq("kaoyan-er_2026_0_q4", "推理题", "How are some companies redesigning their offices?",
        ["Turning them into daily workstations", "Turning them into social hubs for collaboration", "Selling them entirely", "Splitting them into private booths"],
        "B", "P3 明说 as social hubs rather than daily workstations。"),
    ],
  },
  "kaoyan-er_2026年真题_1": {
    title: "阅读理解 Text 2",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Urban rooftop farming is gaining momentum in dense metropolitan areas. By converting unused rooftops into productive gardens, cities can reduce food-transport emissions, lower building temperatures and supply neighborhoods with fresh vegetables.",
        translation:
          "城市屋顶农业在人口密集的都市中日益兴起。将闲置屋顶改造为高产菜园，能够减少食品运输排放、降低建筑温度，并为社区提供新鲜蔬菜。",
      },
      {
        pId: "P2",
        text: "Yet the movement faces practical hurdles. Older buildings may not support the weight of soil and water tanks, and municipal regulations often lag behind agricultural innovation.",
        translation:
          "然而这一趋势也面临实际障碍。老旧建筑可能无法承受土壤和水箱的重量，而市政法规常常滞后于农业创新。",
      },
    ],
    vocabulary: {
      momentum: { word: "momentum", phonetic: "[məˈmentəm]", definition: "n. 势头", example: "The campaign is gaining momentum." },
      hurdles: { word: "hurdle", phonetic: "[ˈhɜːdl]", definition: "n. 障碍", example: "We overcame every hurdle." },
    },
    questions: [
      rq("kaoyan-er_2026_1_q1", "主旨题", "What is the passage mainly about?",
        ["Traditional rural agriculture", "The rise and challenges of urban rooftop farming", "Building demolition policies", "Weather patterns in cities"],
        "B", "全文围绕屋顶农业兴起与挑战。"),
      rq("kaoyan-er_2026_1_q2", "细节题", "Which benefit is NOT mentioned in Paragraph 1?",
        ["Reduced food-transport emissions", "Lower building temperatures", "Higher tourist income", "Fresh vegetables for neighborhoods"],
        "C", "旅游收入未提及，其余三项 P1 均列出。"),
      rq("kaoyan-er_2026_1_q3", "细节题", "What structural problem do older buildings face?",
        ["Insufficient sunlight", "Weight-bearing limits", "Extreme humidity", "Weak internet"],
        "B", "P2 明说无法承受土壤和水箱重量。"),
      rq("kaoyan-er_2026_1_q4", "推理题", "The author implies municipal regulations ___.",
        ["strongly promote innovation", "are keeping up with new farming trends", "have not kept pace with agricultural innovation", "prohibit all rooftop use"],
        "C", "lag behind agricultural innovation 直接对应 C。"),
    ],
  },
  "kaoyan-er_2026年真题_2": {
    title: "阅读理解 Text 3",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Consumer data has become one of the most valuable commodities of the digital age. Companies collect enormous quantities of personal information to fine-tune advertising, forecast demand and design new services.",
        translation:
          "消费者数据已成为数字时代最有价值的商品之一。企业收集海量个人信息用于精准投放广告、预测需求并设计新服务。",
      },
      {
        pId: "P2",
        text: "Regulators, however, warn that many users remain unaware of how their data is used or shared with third parties. Recent laws in Europe and Asia now require clearer consent forms and give consumers the right to demand deletion of their records.",
        translation:
          "然而监管机构警告说，许多用户仍不了解自己的数据如何被使用或分享给第三方。欧洲和亚洲的新法律现在要求更清晰的同意书，并赋予消费者要求删除其记录的权利。",
      },
    ],
    vocabulary: {
      commodities: { word: "commodity", phonetic: "[kəˈmɒdəti]", definition: "n. 商品", example: "Oil is a global commodity." },
      consent: { word: "consent", phonetic: "[kənˈsent]", definition: "n. 同意", example: "You need written consent." },
    },
    questions: [
      rq("kaoyan-er_2026_2_q1", "细节题", "Why do companies collect consumer data?",
        ["To sell it to governments only", "To fine-tune advertising and forecast demand", "To reduce their taxes", "To hire more staff"],
        "B", "P1 明确列出用途。"),
      rq("kaoyan-er_2026_2_q2", "细节题", "What do regulators warn about?",
        ["Fast internet speeds", "Users' lack of awareness of data use", "Rising subscription fees", "Excessive email marketing"],
        "B", "P2 首句给出。"),
      rq("kaoyan-er_2026_2_q3", "细节题", "What rights do the new laws give consumers?",
        ["The right to free products", "The right to demand deletion of records", "The right to sue for compensation only", "The right to buy company shares"],
        "B", "P2 明说 the right to demand deletion。"),
      rq("kaoyan-er_2026_2_q4", "主旨题", "The best title for the passage is ___.",
        ["A History of Digital Advertising", "Consumer Data: Value, Risks and New Rules", "How to Start an Online Business", "The Decline of Traditional Media"],
        "B", "文章讨论数据价值、风险与新规。"),
    ],
  },
  "kaoyan-er_2026年真题_3": {
    title: "阅读理解 Text 4",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "The global push toward clean energy is accelerating. Solar panels are cheaper than ever, wind turbines have grown in scale, and battery costs continue to fall — making renewable electricity competitive with fossil fuels in most markets.",
        translation:
          "全球向清洁能源的转型正在加速。太阳能面板前所未有地便宜，风力涡轮机规模扩大，电池成本持续下降——使可再生电力在大多数市场上都能与化石燃料竞争。",
      },
      {
        pId: "P2",
        text: "Nevertheless, the transition is uneven. Poorer nations often lack the capital for large-scale infrastructure, while richer economies debate how quickly to retire aging coal plants without disrupting employment.",
        translation:
          "然而这一转型并不均衡。较贫穷的国家往往缺乏大规模基础设施所需的资金，而较富裕的经济体则在争论如何在不冲击就业的前提下加速淘汰老旧煤电厂。",
      },
    ],
    vocabulary: {
      renewable: { word: "renewable", phonetic: "[rɪˈnjuːəbl]", definition: "adj. 可再生的", example: "Solar is a renewable resource." },
      retire: { word: "retire", phonetic: "[rɪˈtaɪə]", definition: "v. 使退役，淘汰", example: "They retired the old plants." },
    },
    questions: [
      rq("kaoyan-er_2026_3_q1", "细节题", "Why are renewables now competitive with fossil fuels?",
        ["Governments have banned coal.", "Solar, wind and battery costs have fallen.", "Oil supplies have run out.", "New taxes were introduced."],
        "B", "P1 明说三者成本下降。"),
      rq("kaoyan-er_2026_3_q2", "细节题", "What obstacle do poorer nations face?",
        ["Lack of sunlight", "Lack of capital for large infrastructure", "Overly strict environmental laws", "Excessive labor supply"],
        "B", "P2 明说。"),
      rq("kaoyan-er_2026_3_q3", "推理题", "What concern do richer economies weigh?",
        ["Disruption to employment when retiring coal plants", "Rising sea levels only", "Trade wars with neighbors", "Aging population"],
        "A", "P2 后半句直接给出。"),
      rq("kaoyan-er_2026_3_q4", "主旨题", "What is the passage mainly about?",
        ["The exclusive success of solar power", "The uneven progress of the clean-energy transition", "How coal will dominate again", "New wind-turbine designs"],
        "B", "全文核心是清洁能源转型的不均衡。"),
    ],
  },

  // -------- 2025 --------
  "kaoyan-er_2025年真题_0": {
    title: "阅读理解 Text 1",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Employee autonomy — the freedom to decide when, where and how to work — has become a central topic in management research. Studies suggest that workers granted greater autonomy report higher job satisfaction and are less likely to leave their organizations.",
        translation:
          "员工自主权——决定何时、何地以及如何工作的自由——已成为管理学研究的核心话题。研究表明，被赋予更大自主权的员工报告出更高的工作满意度，也更不容易离职。",
      },
      {
        pId: "P2",
        text: "Autonomy, however, does not mean the absence of supervision. Effective managers set clear goals and provide regular feedback, while trusting employees to choose their own methods.",
        translation:
          "然而自主并不意味着缺乏监督。有效的管理者会设定清晰目标并提供定期反馈，同时信任员工自行选择工作方法。",
      },
      {
        pId: "P3",
        text: "Critics warn that unstructured autonomy can leave junior staff feeling isolated, especially in remote settings where informal guidance is scarce.",
        translation:
          "批评者提醒说，缺乏结构的自主可能让初级员工感到孤立，尤其是在缺少非正式指导的远程办公环境中。",
      },
    ],
    vocabulary: {
      autonomy: { word: "autonomy", phonetic: "[ɔːˈtɒnəmi]", definition: "n. 自主权", example: "Workers value autonomy." },
      supervision: { word: "supervision", phonetic: "[ˌsuːpəˈvɪʒn]", definition: "n. 监督", example: "He worked under supervision." },
    },
    questions: [
      rq("kaoyan-er_2025_0_q1", "细节题", "What benefit does autonomy bring, according to Paragraph 1?",
        ["Higher salaries", "Higher job satisfaction and lower turnover", "Longer working hours", "Fewer meetings"],
        "B", "P1 末句直接给出。"),
      rq("kaoyan-er_2025_0_q2", "推理题", "According to Paragraph 2, effective managers ___.",
        ["abandon all oversight", "set clear goals and give feedback", "prohibit remote work", "assign detailed daily tasks"],
        "B", "P2 明说。"),
      rq("kaoyan-er_2025_0_q3", "细节题", "What warning do critics raise?",
        ["Autonomy raises costs.", "Junior staff may feel isolated.", "Managers become overworked.", "Meetings become endless."],
        "B", "P3 首句给出。"),
      rq("kaoyan-er_2025_0_q4", "主旨题", "The passage mainly discusses ___.",
        ["how to fire employees", "the benefits and limits of employee autonomy", "the history of management theory", "how to design office spaces"],
        "B", "全文围绕自主权的益处与限度。"),
    ],
  },
  "kaoyan-er_2025年真题_1": {
    title: "阅读理解 Text 2",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Museums worldwide are racing to digitize their collections. High-resolution images, 3-D models and virtual tours now allow anyone with an internet connection to explore artifacts that might otherwise remain locked in storage.",
        translation:
          "世界各地的博物馆正竞相将藏品数字化。高分辨率图像、三维模型和虚拟导览让任何有网络的人都能探索原本可能被封存的文物。",
      },
      {
        pId: "P2",
        text: "Digital access, curators argue, complements rather than replaces the physical visit. Standing before an original object still offers a sense of scale and material presence that no screen can fully reproduce.",
        translation:
          "策展人认为，数字访问是对实体参观的补充而非替代。站在原始展品面前依然能提供屏幕无法完全再现的规模感与物质在场感。",
      },
    ],
    vocabulary: {
      digitize: { word: "digitize", phonetic: "[ˈdɪdʒɪtaɪz]", definition: "v. 数字化", example: "They digitized the archive." },
      complements: { word: "complement", phonetic: "[ˈkɒmplɪment]", definition: "v. 补充", example: "The wine complements the meal." },
    },
    questions: [
      rq("kaoyan-er_2025_1_q1", "细节题", "What technologies do museums use to open collections online?",
        ["Only printed catalogs", "High-resolution images, 3-D models and virtual tours", "Radio broadcasts", "Handwritten letters"],
        "B", "P1 明确列出。"),
      rq("kaoyan-er_2025_1_q2", "推理题", "What do curators believe about digital access?",
        ["It will replace visits.", "It supplements physical visits.", "It is a waste of money.", "It should be forbidden."],
        "B", "P2 首句 complements rather than replaces。"),
      rq("kaoyan-er_2025_1_q3", "细节题", "Why does the passage say physical viewing still matters?",
        ["Museums profit from tickets.", "It offers scale and material presence.", "It is legally required.", "Screens cannot show color."],
        "B", "P2 末句给出。"),
      rq("kaoyan-er_2025_1_q4", "主旨题", "The best title for the passage is ___.",
        ["Why Museums Should Close", "Digital and Physical Museums: A Complementary Future", "How to Photograph Artifacts", "The End of Curatorship"],
        "B", "文章强调二者互补。"),
    ],
  },
  "kaoyan-er_2025年真题_2": {
    title: "阅读理解 Text 3",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Concerns about the mental-health effects of social media on adolescents have prompted new policy debates. Some researchers link heavy use of image-driven platforms to increased anxiety and body-image dissatisfaction among teenage girls.",
        translation:
          "对社交媒体影响青少年心理健康的担忧引发了新一轮政策辩论。一些研究者将大量使用以图像为主的平台与少女焦虑情绪加剧和身体形象不满联系起来。",
      },
      {
        pId: "P2",
        text: "Other scholars caution against oversimplification, pointing out that social media can also help isolated young people find supportive communities. The real question, they argue, is not whether to allow use but how to design healthier platforms.",
        translation:
          "另一些学者则警告不要过度简化问题，他们指出社交媒体也能帮助孤立的年轻人找到支持性社群。他们认为真正的问题不在于是否允许使用，而在于如何设计更健康的平台。",
      },
    ],
    vocabulary: {
      adolescents: { word: "adolescent", phonetic: "[ˌædəˈlesnt]", definition: "n. 青少年", example: "Adolescents need support." },
      oversimplification: { word: "oversimplification", phonetic: "[ˌəʊvəˌsɪmplɪfɪˈkeɪʃn]", definition: "n. 过度简化", example: "This is an oversimplification." },
    },
    questions: [
      rq("kaoyan-er_2025_2_q1", "细节题", "What effect do some researchers link to heavy image-platform use?",
        ["Better sleep", "Increased anxiety and body-image dissatisfaction", "Higher academic scores", "Lower screen time"],
        "B", "P1 末句直接给出。"),
      rq("kaoyan-er_2025_2_q2", "细节题", "What positive role can social media play?",
        ["Guaranteeing academic success", "Helping isolated youth find supportive communities", "Replacing schools entirely", "Providing free hardware"],
        "B", "P2 明说。"),
      rq("kaoyan-er_2025_2_q3", "推理题", "What do the second group of scholars argue is the real question?",
        ["Whether to ban social media", "How to design healthier platforms", "Who owns the platforms", "Which country regulates them"],
        "B", "P2 末句给出。"),
      rq("kaoyan-er_2025_2_q4", "主旨题", "The passage mainly presents ___.",
        ["a one-sided condemnation of social media", "a balanced debate on social media and adolescent well-being", "a marketing strategy for platforms", "a history of the internet"],
        "B", "全文呈现两派平衡辩论。"),
    ],
  },
  "kaoyan-er_2025年真题_3": {
    title: "阅读理解 Text 4",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "The transition to electric vehicles depends heavily on the availability of charging infrastructure. Drivers may embrace new cars quickly, but without dense networks of reliable chargers, range anxiety limits adoption.",
        translation:
          "向电动汽车的转型在很大程度上取决于充电基础设施的完备程度。司机可能会很快接受新车，但若缺乏密集可靠的充电网络，续航焦虑将限制普及。",
      },
      {
        pId: "P2",
        text: "Governments and private firms are now investing heavily in fast chargers along highways and in residential neighborhoods. Standardizing plug types and payment systems, however, remains an uphill battle.",
        translation:
          "政府与私营企业正大量投资于高速公路和住宅区的快充设施。然而，统一接口类型与付款系统仍是一场艰难的战斗。",
      },
    ],
    vocabulary: {
      infrastructure: { word: "infrastructure", phonetic: "[ˈɪnfrəstrʌktʃə]", definition: "n. 基础设施", example: "Roads are infrastructure." },
      uphill: { word: "uphill", phonetic: "[ˌʌpˈhɪl]", definition: "adj. 艰难的", example: "It's an uphill task." },
    },
    questions: [
      rq("kaoyan-er_2025_3_q1", "细节题", "What limits EV adoption according to Paragraph 1?",
        ["High vehicle prices only", "Range anxiety from sparse charging", "Poor vehicle design", "Lack of interest from drivers"],
        "B", "P1 末句直接给出。"),
      rq("kaoyan-er_2025_3_q2", "细节题", "Where are fast chargers being installed?",
        ["Only in airports", "Along highways and in residential neighborhoods", "Inside factories only", "On ships"],
        "B", "P2 首句给出。"),
      rq("kaoyan-er_2025_3_q3", "细节题", "What ongoing challenge does the passage identify?",
        ["Producing electricity", "Standardizing plugs and payment systems", "Training drivers", "Manufacturing tires"],
        "B", "P2 末句 uphill battle。"),
      rq("kaoyan-er_2025_3_q4", "主旨题", "The passage is mainly about ___.",
        ["the design of electric motors", "infrastructure as the key to EV adoption", "battery chemistry research", "the history of gasoline cars"],
        "B", "全文围绕基础设施是普及关键。"),
    ],
  },

  // -------- 2024 --------
  "kaoyan-er_2024年真题_0": {
    title: "阅读理解 Text 1",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Remote work, once a fringe benefit offered by tech firms, expanded dramatically after 2020 and has reshaped how many industries operate. Surveys indicate that a majority of knowledge workers now expect flexibility as a baseline condition of employment.",
        translation:
          "远程办公曾是科技公司提供的边缘福利，2020年后急剧扩张，并重塑了许多行业的运作方式。调查显示，多数知识型员工如今将灵活性视为就业的基本条件。",
      },
      {
        pId: "P2",
        text: "Employers face a dilemma: offering flexibility helps attract talent, yet dispersed teams complicate mentoring, culture-building and impromptu problem solving.",
        translation:
          "雇主陷入两难：提供灵活性有助于吸引人才，但分散的团队使指导、企业文化建设与临时问题解决变得复杂。",
      },
      {
        pId: "P3",
        text: "Successful firms treat the office not as a mandatory location but as a purposeful destination for collaboration, reserving deep-focus work for quieter home environments.",
        translation:
          "成功的公司不再把办公室视为强制场所，而是将其定位为协作的目的地，把深度专注工作留给更安静的家庭环境。",
      },
    ],
    vocabulary: {
      fringe: { word: "fringe", phonetic: "[frɪndʒ]", definition: "adj. 边缘的", example: "A fringe benefit." },
      dispersed: { word: "dispersed", phonetic: "[dɪˈspɜːst]", definition: "adj. 分散的", example: "A dispersed workforce." },
      impromptu: { word: "impromptu", phonetic: "[ɪmˈprɒmptjuː]", definition: "adj. 即兴的", example: "An impromptu meeting." },
    },
    questions: [
      rq("kaoyan-er_2024_0_q1", "细节题", "What do surveys reveal about knowledge workers?",
        ["They oppose remote work.", "They expect flexibility as a baseline condition.", "They demand higher pay only.", "They prefer strict oversight."],
        "B", "P1 末句直接给出。"),
      rq("kaoyan-er_2024_0_q2", "细节题", "What dilemma do employers face?",
        ["Choosing between two products", "Balancing talent attraction against team coordination challenges", "Deciding which country to open in", "Whether to hire consultants"],
        "B", "P2 明说。"),
      rq("kaoyan-er_2024_0_q3", "推理题", "How do successful firms treat the office?",
        ["As a mandatory daily location", "As a purposeful destination for collaboration", "As a storage facility", "As a place to eliminate entirely"],
        "B", "P3 明说。"),
      rq("kaoyan-er_2024_0_q4", "主旨题", "The passage mainly discusses ___.",
        ["the invention of email", "how remote work is reshaping employment expectations and office use", "the decline of manufacturing", "government tax policy"],
        "B", "全文围绕远程办公重塑期待与办公室用途。"),
    ],
  },
  "kaoyan-er_2024年真题_1": {
    title: "阅读理解 Text 2",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "As populations age in many developed countries, policymakers are grappling with mounting pressure on pension systems and healthcare budgets. Fewer working-age adults must support a growing number of retirees.",
        translation:
          "随着许多发达国家人口老龄化，政策制定者正应对养老金体系与医疗预算日益加大的压力。越来越少的适龄劳动者必须供养越来越多的退休人员。",
      },
      {
        pId: "P2",
        text: "Some economists advocate raising the retirement age, arguing that longer lifespans justify longer careers. Others emphasize investing in productivity through automation and immigration to sustain economic growth.",
        translation:
          "一些经济学家主张提高退休年龄，认为更长的寿命证明了更长的职业生涯合理。另一些人则强调通过自动化和移民投资于生产力，以维持经济增长。",
      },
    ],
    vocabulary: {
      grappling: { word: "grapple", phonetic: "[ˈɡræpl]", definition: "v. 应对，努力解决", example: "They grappled with the issue." },
      pension: { word: "pension", phonetic: "[ˈpenʃn]", definition: "n. 养老金", example: "He receives a pension." },
      sustain: { word: "sustain", phonetic: "[səˈsteɪn]", definition: "v. 维持", example: "Sustain economic growth." },
    },
    questions: [
      rq("kaoyan-er_2024_1_q1", "细节题", "What problem is described in Paragraph 1?",
        ["Falling birthrate only", "Pressure on pensions and healthcare from aging populations", "Rising energy prices", "Housing shortages"],
        "B", "P1 明说 mounting pressure on pension systems and healthcare budgets。"),
      rq("kaoyan-er_2024_1_q2", "细节题", "What do some economists propose?",
        ["Cutting all pensions", "Raising the retirement age", "Banning immigration", "Reducing working hours"],
        "B", "P2 首句给出。"),
      rq("kaoyan-er_2024_1_q3", "细节题", "What alternative approach is mentioned?",
        ["Reducing the workforce", "Investing in automation and immigration", "Increasing tourism", "Encouraging early retirement"],
        "B", "P2 末句明说。"),
      rq("kaoyan-er_2024_1_q4", "主旨题", "The passage mainly presents ___.",
        ["different responses to the challenges of aging populations", "the history of pensions", "how to design new medicines", "immigration law reform"],
        "A", "全文对比几种应对老龄化的方案。"),
    ],
  },
  "kaoyan-er_2024年真题_2": {
    title: "阅读理解 Text 3",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Rising tuition and living expenses have made college affordability a top concern for families. Even as grant programs expand, many students still graduate with substantial loans that shape their early career choices.",
        translation:
          "学费与生活成本不断上涨，使大学负担能力成为家庭最关切的问题。尽管助学金项目在扩大，许多学生毕业时仍背负大量贷款，这些贷款塑造了他们早期的职业选择。",
      },
      {
        pId: "P2",
        text: "Some universities have responded by capping tuition or offering income-based repayment plans. Advocates argue that education should be treated as a public investment, not merely a private expense.",
        translation:
          "一些大学的应对之策是限定学费或提供基于收入的还款计划。倡导者认为教育应被视为公共投资，而不仅是私人开支。",
      },
    ],
    vocabulary: {
      tuition: { word: "tuition", phonetic: "[tjuˈɪʃn]", definition: "n. 学费", example: "Tuition has risen." },
      substantial: { word: "substantial", phonetic: "[səbˈstænʃl]", definition: "adj. 大量的", example: "A substantial loan." },
    },
    questions: [
      rq("kaoyan-er_2024_2_q1", "细节题", "Why is college affordability a top concern?",
        ["Universities admit fewer students.", "Rising tuition and living expenses.", "Fewer scholarships exist.", "Employers pay less."],
        "B", "P1 首句直接给出。"),
      rq("kaoyan-er_2024_2_q2", "细节题", "How do many graduates' loans affect them?",
        ["They eliminate travel plans.", "They shape early career choices.", "They double each year.", "They cover living costs only."],
        "B", "P1 末句给出。"),
      rq("kaoyan-er_2024_2_q3", "细节题", "What have some universities done in response?",
        ["Closed campuses", "Capped tuition or offered income-based repayment", "Raised admission tests", "Banned scholarships"],
        "B", "P2 明说。"),
      rq("kaoyan-er_2024_2_q4", "推理题", "Advocates suggest that education is ___.",
        ["a private expense only", "a public investment", "an unnecessary luxury", "a national secret"],
        "B", "P2 末句给出。"),
    ],
  },
  "kaoyan-er_2024年真题_3": {
    title: "阅读理解 Text 4",
    type: "reading",
    paragraphs: [
      {
        pId: "P1",
        text: "Ecosystem sustainability increasingly depends on responsible consumer behavior. From reducing single-use plastics to choosing seasonal produce, individual choices aggregate into meaningful environmental impact.",
        translation:
          "生态可持续性越来越取决于负责任的消费者行为。从减少一次性塑料到选择应季农产品，个人选择汇聚成对环境的重大影响。",
      },
      {
        pId: "P2",
        text: "Yet experts caution that placing the entire burden on consumers can distract from the structural role of industries and regulators. Real change requires both personal effort and systemic reform.",
        translation:
          "然而专家提醒说，将全部责任压在消费者身上可能分散对产业和监管机构结构性作用的关注。真正的改变需要个人努力与系统性改革共同推进。",
      },
    ],
    vocabulary: {
      aggregate: { word: "aggregate", phonetic: "[ˈæɡrɪɡeɪt]", definition: "v. 聚集，合计", example: "Small actions aggregate." },
      systemic: { word: "systemic", phonetic: "[sɪˈstemɪk]", definition: "adj. 系统性的", example: "Systemic reform is needed." },
    },
    questions: [
      rq("kaoyan-er_2024_3_q1", "细节题", "What consumer behaviors are mentioned as helpful?",
        ["Buying imported luxuries", "Reducing single-use plastics and choosing seasonal produce", "Traveling by air often", "Building bigger houses"],
        "B", "P1 明确列出。"),
      rq("kaoyan-er_2024_3_q2", "细节题", "What do experts warn about?",
        ["Consumers do too little.", "Placing the entire burden on consumers can distract from systemic issues.", "Regulators are irrelevant.", "Industries have no role."],
        "B", "P2 首句给出。"),
      rq("kaoyan-er_2024_3_q3", "推理题", "According to the passage, real environmental change requires ___.",
        ["only individual sacrifice", "only regulatory action", "both personal effort and systemic reform", "no reform at all"],
        "C", "P2 末句直接给出。"),
      rq("kaoyan-er_2024_3_q4", "主旨题", "The best title for the passage is ___.",
        ["Consumers Alone Can Save the Planet", "Sustainability Needs Both Personal and Systemic Change", "The End of Regulation", "How to Recycle Plastic"],
        "B", "全文强调二者并重。"),
    ],
  },
};
