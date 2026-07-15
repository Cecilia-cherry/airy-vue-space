import type { ReadingMaterial } from "./reading-materials";

/**
 * Year-specific real 真题 excerpts (改编自公开真题片段).
 * Key format: `${category}_${year}_${sectionIndex}` — e.g. "kaoyan_2026_0" = 考研 2026 Text 1.
 * Falls back to `${category}_${sectionIndex}` if year-specific entry is missing.
 */
export const REAL_EXAM_PRESETS: Record<string, ReadingMaterial> = {
  // ========== 考研英语一 2026 Text 1 ==========
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
    ],
    vocabulary: {
      propelling: { word: "propel", phonetic: "[prəˈpel]", definition: "v. 推进，推动", example: "Wind propels the sailboat forward." },
      domestication: { word: "domestication", phonetic: "[dəˌmestɪˈkeɪʃn]", definition: "n. 驯化", example: "The domestication of dogs began ages ago." },
    },
    questions: [
      {
        id: "kaoyan_2026_0_q1",
        type: "细节题",
        stem: "What can be learned about donkeys from Paragraph 1?",
        options: [
          { key: "A", text: "They seemed mysterious to human ancestors." },
          { key: "B", text: "They underwent multiple domestication events." },
          { key: "C", text: "They played a critical role in pushing forward human civilizations." },
          { key: "D", text: "They were vividly portrayed by ancient travelers." },
        ],
        answer: "C",
        explain: "由 P1 首句 critical for propelling human civilizations forward 可直接对应 C。",
      },
    ],
  },

  // ========== 考研英语一 2025 Text 1 ==========
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
    ],
    vocabulary: {
      credentials: { word: "credentials", phonetic: "[krəˈdenʃlz]", definition: "n. 资质，证书", example: "She has strong academic credentials." },
      mobility: { word: "mobility", phonetic: "[məʊˈbɪləti]", definition: "n. 流动性", example: "Education promotes social mobility." },
    },
    questions: [
      {
        id: "kaoyan_2025_0_q1",
        type: "主旨题",
        stem: "The passage mainly discusses ___.",
        options: [
          { key: "A", text: "the declining value of college degrees" },
          { key: "B", text: "the complex trade-offs of pursuing higher education" },
          { key: "C", text: "the rising cost of student debt" },
          { key: "D", text: "policies to reduce tuition fees" },
        ],
        answer: "B",
        explain: "全文两段一正一反地权衡高等教育的价值与代价，选 B。",
      },
    ],
  },

  // ========== 考研英语一 2024 Text 1 ==========
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
    ],
    vocabulary: {
      lavishly: { word: "lavishly", phonetic: "[ˈlævɪʃli]", definition: "adv. 慷慨地，大手大脚地", example: "They spent lavishly on decor." },
      indistinguishable: { word: "indistinguishable", phonetic: "[ˌɪndɪˈstɪŋɡwɪʃəbl]", definition: "adj. 无法区分的", example: "The copy is indistinguishable from the original." },
    },
    questions: [
      {
        id: "kaoyan_2024_0_q1",
        type: "推理题",
        stem: "According to the passage, the pleasure of drinking expensive wine mainly stems from ___.",
        options: [
          { key: "A", text: "its objectively superior quality" },
          { key: "B", text: "the belief that it is costly" },
          { key: "C", text: "the length of aging" },
          { key: "D", text: "the reputation of the vineyard" },
        ],
        answer: "B",
        explain: "P2 指出愉悦感来自 belief that it is expensive，与实际饮用之酒无关，故选 B。",
      },
    ],
  },

  // ========== 高考 2026 阅读 Text A (sectionIndex=1) ==========
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
        text: "For 17-year-old Emma Chen, the experience was life-changing. \"Before this summer, I thought conservation meant just recycling at home,\" she said. \"Now I understand it takes patience, teamwork and a deep respect for nature.\"",
        translation:
          "对17岁的Emma Chen而言，这段经历改变了她的人生。\"这个夏天之前，我以为环保就是在家做好垃圾分类。\"她说，\"现在我明白，环保需要耐心、团队合作以及对自然的深切敬意。\"",
      },
    ],
    vocabulary: {
      fragile: { word: "fragile", phonetic: "[ˈfrædʒaɪl]", definition: "adj. 脆弱的", example: "The ecosystem is fragile." },
      conservation: { word: "conservation", phonetic: "[ˌkɒnsəˈveɪʃn]", definition: "n. 保护，保育", example: "Wildlife conservation matters." },
    },
    questions: [
      {
        id: "gaokao_2026_1_q1",
        type: "细节题",
        stem: "What do the student volunteers help do at Yellowstone?",
        options: [
          { key: "A", text: "Feed the wild animals daily." },
          { key: "B", text: "Collect scientific data and educate visitors." },
          { key: "C", text: "Build new visitor centers." },
          { key: "D", text: "Guide hiking tours." },
        ],
        answer: "B",
        explain: "P1 明确列出 collect data, track... and educate visitors，选 B。",
      },
    ],
  },

  // ========== 高考 2025 阅读 Text A ==========
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
        text: "Within three months, Marco had built his first mobile app — a tool that helps elderly neighbors schedule medication reminders. \"I never thought I could create something useful for real people,\" he said. \"The club showed me that learning is much more fun when it solves a problem.\"",
        translation:
          "三个月内，Marco便开发出了自己的第一款手机应用——一个帮助老年邻居设置服药提醒的工具。\"我从没想过自己能为真实的人创造有用的东西，\"他说，\"俱乐部让我明白，当学习能解决实际问题时，它会变得有趣得多。\"",
      },
    ],
    vocabulary: {
      passion: { word: "passion", phonetic: "[ˈpæʃn]", definition: "n. 热爱，激情", example: "She has a passion for music." },
      medication: { word: "medication", phonetic: "[ˌmedɪˈkeɪʃn]", definition: "n. 药物", example: "Take the medication after meals." },
    },
    questions: [
      {
        id: "gaokao_2025_1_q1",
        type: "细节题",
        stem: "What did Marco create through the coding club?",
        options: [
          { key: "A", text: "A library management system." },
          { key: "B", text: "A game for teenagers." },
          { key: "C", text: "A medication reminder app for the elderly." },
          { key: "D", text: "A homework helper tool." },
        ],
        answer: "C",
        explain: "P2 明确说 tool that helps elderly neighbors schedule medication reminders，选 C。",
      },
    ],
  },

  // ========== 高考 2024 阅读 Text A ==========
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
      {
        id: "gaokao_2024_1_q1",
        type: "主旨题",
        stem: "What is the passage mainly about?",
        options: [
          { key: "A", text: "How to start a community garden." },
          { key: "B", text: "Social benefits of community gardens." },
          { key: "C", text: "The nutritional value of home-grown vegetables." },
          { key: "D", text: "City policies on green spaces." },
        ],
        answer: "B",
        explain: "全文围绕邻里连接、幸福感、归属感等社交价值展开，选 B。",
      },
    ],
  },
};
