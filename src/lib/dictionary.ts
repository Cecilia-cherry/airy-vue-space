import { type ReadingWord } from "./reading-materials";

// Static combined list of vocabulary defined in the reading materials
const MOUNTED_VOCABULARY_LIST: ReadingWord[] = [
  {
    word: "propel",
    phonetic: "[prəˈpel]",
    definition: "v. 推进，推动",
    example: "They've helped pull wheeled vehicles and propel human civilizations.",
  },
  {
    word: "intertwine",
    phonetic: "[ˌɪntəˈtwaɪn]",
    definition: "v. 缠绕，交织",
    example: "Where and when these animals first became intertwined with humans remains a mystery.",
  },
  {
    word: "genome",
    phonetic: "[ˈdʒiːnəʊm]",
    definition: "n. 基因组，染色体组",
    example: "Researchers analyzed the genomes of over 200 donkeys.",
  },
  {
    word: "domestication",
    phonetic: "[dəˌmestɪˈkeɪʃn]",
    definition: "n. 驯养，驯化",
    example: "The genetic data traces their domestication back to a single event.",
  },
  {
    word: "specimen",
    phonetic: "[ˈspesɪmɪn]",
    definition: "n. 样品，标本，样本",
    example: "The scientists analyzed genetic information from ancient specimens.",
  },
  {
    word: "bombard",
    phonetic: "[bɒmˈbɑːd]",
    definition: "v. 轰炸，轰击；（用问题等）连续袭击",
    example: "Our brains are constantly bombarded with incoming sensory information.",
  },
  {
    word: "deplete",
    phonetic: "[dɪˈpliːt]",
    definition: "v. 消耗，耗尽",
    example: "Working in a noisy environment can deplete your cognitive resources.",
  },
  {
    word: "status quo",
    phonetic: "[ˌsteɪtəs ˈkwəʊ]",
    definition: "n. 现状",
    example: "They are unwilling to challenge the status quo.",
  },
  {
    word: "exclusively",
    phonetic: "[ɪkˈskluːsɪvli]",
    definition: "adv. 独占地，排他地，专有地",
    example: "This luxury brand is exclusively sold in select boutiques.",
  },
  {
    word: "monopoly",
    phonetic: "[məˈnɒpəli]",
    definition: "n. 垄断，独占",
    example: "The government sought to break up the tech giant's monopoly.",
  },
  {
    word: "mediate",
    phonetic: "[ˈmiːdieɪt]",
    definition: "v. 调解，斡旋；作为媒介引起，传导",
    example: "The visual system mediates our perception of color and depth.",
  },
  {
    word: "mitigate",
    phonetic: "[ˈmɪtɪɡeɪt]",
    definition: "v. 减轻，缓和",
    example: "Planting trees helps mitigate the effects of carbon emissions.",
  },
  {
    word: "flexibility",
    phonetic: "[ˌfleksəˈbɪləti]",
    definition: "n. 弹性，灵活性",
    example: "Remote work offers employees greater flexibility.",
  },
  {
    word: "skeptic",
    phonetic: "[ˈskeptɪk]",
    definition: "n. 怀疑论者",
    example: "Skeptics questioned the validity of the new study.",
  },
  {
    word: "eco-friendly",
    phonetic: "[ˌiːkəʊ ˈfrendli]",
    definition: "adj. 环保的，对环境友好的",
    example: "Electric vehicles are a more eco-friendly transportation option.",
  },
  {
    word: "conservation",
    phonetic: "[ˌkɒnsəˈveɪʃn]",
    definition: "n. 保护，保存，（对自然资源的）保护",
    example: "Wildlife conservation is critical to preserving biodiversity.",
  },
  {
    word: "surplus",
    phonetic: "[ˈsɜːpləs]",
    definition: "n. 过剩，盈余",
    example: "The company reported a budget surplus of three million dollars.",
  },
  {
    word: "foster",
    phonetic: "[ˈfɒstə(r)]",
    definition: "v. 培养，促进，收养",
    example: "The program aims to foster innovation and collaboration.",
  },
  {
    word: "procrastination",
    phonetic: "[prəˌkræstɪˈneɪʃn]",
    definition: "n. 拖延症，延迟",
    example: "Procrastination is the thief of time.",
  },
  {
    word: "astronomy",
    phonetic: "[əˈstrɒnəmi]",
    definition: "n. 天文学",
    example: "Astronomy is the study of celestial bodies and space.",
  },
  {
    word: "facilitate",
    phonetic: "[fəˈsɪlɪteɪt]",
    definition: "v. 促进，使便利，减轻",
    example: "The new software is designed to facilitate faster communication.",
  },
  {
    word: "outskirts",
    phonetic: "[ˈaʊtskɜːts]",
    definition: "n. 郊区，市郊",
    example: "They live in a quiet neighborhood on the outskirts of London.",
  },
  {
    word: "nectar",
    phonetic: "[ˈnektə(r)]",
    definition: "n. 花蜜，甘露",
    example: "Bees collect nectar from flowers to make honey.",
  },
  {
    word: "drastic",
    phonetic: "[ˈdræstɪk]",
    definition: "adj. 猛烈的，激烈的，彻底的",
    example: "The company had to make drastic changes to avoid bankruptcy.",
  },
  {
    word: "shroud",
    phonetic: "[ʃraʊd]",
    definition: "v. 笼罩，遮蔽；n. 寿衣，覆盖物",
    example: "The peaks of the mountains were shrouded in a thick mist.",
  },
  {
    word: "rudimentary",
    phonetic: "[ˌruːdɪˈmentri]",
    definition: "adj. 基础的，初步的，简陋的",
    example: "She has only a rudimentary understanding of French.",
  },
  {
    word: "chemosynthesis",
    phonetic: "[ˌkiːməʊˈsɪnθəsɪs]",
    definition: "n. 化学合成，化学自养",
    example: "Deep-sea bacteria rely on chemosynthesis for energy.",
  },
  {
    word: "coincide",
    phonetic: "[ˌkəʊɪnˈsaɪd]",
    definition: "v. 同时发生，相符，一致",
    example: "Her birthday happens to coincide with a national holiday.",
  },
  {
    word: "contaminate",
    phonetic: "[kənˈtæmɪneɪt]",
    definition: "v. 污染，弄脏",
    example: "Chemical waste can contaminate local water sources.",
  },
];

// Offline comprehensive dictionary for common English words
export const COMMON_DICTIONARY: Record<
  string,
  { word: string; phonetic: string; definition: string; example: string }
> = {
  critical: {
    word: "critical",
    phonetic: "[ˈkrɪtɪkl]",
    definition: "adj. 关键的，临界的，批评的",
    example: "This project is at a critical stage.",
  },
  researchers: {
    word: "researcher",
    phonetic: "[rɪˈsɜːtʃəz]",
    definition: "n. 研究人员，调查者",
    example: "Researchers have discovered a new cure.",
  },
  researcher: {
    word: "researcher",
    phonetic: "[rɪˈsɜːtʃə(r)]",
    definition: "n. 研究人员",
    example: "A researcher must remain objective.",
  },
  findings: {
    word: "finding",
    phonetic: "[ˈfaɪndɪŋz]",
    definition: "n. 发现，研究结果",
    example: "The scientific findings were published in a top journal.",
  },
  finding: {
    word: "finding",
    phonetic: "[ˈfaɪndɪŋ]",
    definition: "n. 发现，调查结果",
    example: "A major finding of the study was unexpected.",
  },
  ancient: {
    word: "ancient",
    phonetic: "[ˈeɪnʃənt]",
    definition: "adj. 古代的，古老的",
    example: "We visited an ancient Roman temple.",
  },
  domestic: {
    word: "domestic",
    phonetic: "[dəˈmestɪk]",
    definition: "adj. 国内的，家庭的，驯养的",
    example: "Cats are popular domestic animals.",
  },
  mystery: {
    word: "mystery",
    phonetic: "[ˈmɪstri]",
    definition: "n. 谜，神秘的事物",
    example: "The origin of life is still a mystery.",
  },
  century: {
    word: "century",
    phonetic: "[ˈsentʃəri]",
    definition: "n. 世纪，百年",
    example: "This castle was built in the twelfth century.",
  },
  science: {
    word: "science",
    phonetic: "[ˈsaɪəns]",
    definition: "n. 科学，自然科学",
    example: "Science has reshaped our view of the universe.",
  },
  ecosystem: {
    word: "ecosystem",
    phonetic: "[ˈiːkəʊsɪstəm]",
    definition: "n. 生态系统",
    example: "The forest ecosystem is highly fragile.",
  },
  fragile: {
    word: "fragile",
    phonetic: "[ˈfrædʒaɪl]",
    definition: "adj. 易碎的，脆弱的",
    example: "Handle this vase carefully, it is fragile.",
  },
  environment: {
    word: "environment",
    phonetic: "[ɪnˈvaɪrənmənt]",
    definition: "n. 环境，自然环境",
    example: "We must take immediate action to protect the environment.",
  },
  protect: {
    word: "protect",
    phonetic: "[prəˈtekt]",
    definition: "v. 保护，防卫",
    example: "Wearing sunscreen helps protect your skin.",
  },
  nature: {
    word: "nature",
    phonetic: "[ˈneɪtʃə(r)]",
    definition: "n. 自然，天性",
    example: "We should spend more time enjoying nature.",
  },
  conservationist: {
    word: "conservationist",
    phonetic: "[ˌkɒnsəˈveɪʃənɪst]",
    definition: "n. 自然资源保护主义者",
    example: "Conservationists work hard to protect endangered species.",
  },
  biodiversity: {
    word: "biodiversity",
    phonetic: "[ˌbaɪəʊdaɪˈvɜːsəti]",
    definition: "n. 生物多样性",
    example: "Climate change poses a threat to global biodiversity.",
  },
  important: {
    word: "important",
    phonetic: "[ɪmˈpɔːtnt]",
    definition: "adj. 重要的，重大的",
    example: "Education is extremely important for children.",
  },
  academic: {
    word: "academic",
    phonetic: "[ˌækəˈdemɪk]",
    definition: "adj. 学术的，学校的",
    example: "She achieved outstanding academic success.",
  },
  student: {
    word: "student",
    phonetic: "[ˈstjuːdnt]",
    definition: "n. 学生，研究者",
    example: "The teacher answered the student's question.",
  },
  learn: {
    word: "learn",
    phonetic: "[lɜːn]",
    definition: "v. 学习，得知",
    example: "We learn from our mistakes.",
  },
  teach: {
    word: "teach",
    phonetic: "[tiːtʃ]",
    definition: "v. 教授，教导",
    example: "He loves to teach high school mathematics.",
  },
  school: {
    word: "school",
    phonetic: "[skuːl]",
    definition: "n. 学校，学派",
    example: "She walks to school every morning.",
  },
  university: {
    word: "university",
    phonetic: "[ˌjuːnɪˈvɜːsəti]",
    definition: "n. 大学",
    example: "He is studying biology at the local university.",
  },
  community: {
    word: "community",
    phonetic: "[kəˈmjuːnəti]",
    definition: "n. 社区，社会，共同体",
    example: "Local volunteers are the backbone of our community.",
  },
  develop: {
    word: "develop",
    phonetic: "[dɪˈveləp]",
    definition: "v. 发展，开发，成长",
    example: "Regular exercise helps develop strong muscles.",
  },
  problem: {
    word: "problem",
    phonetic: "[ˈprɒbləm]",
    definition: "n. 问题，难题",
    example: "She solved the math problem in minutes.",
  },
  solve: {
    word: "solve",
    phonetic: "[sɒlv]",
    definition: "v. 解决，解答",
    example: "Working together will help us solve the issue.",
  },
  useful: {
    word: "useful",
    phonetic: "[ˈjuːsfl]",
    definition: "adj. 有用的，有益的",
    example: "This dictionary is extremely useful.",
  },
  reshape: {
    word: "reshape",
    phonetic: "[ˌriːˈʃeɪp]",
    definition: "v. 重塑，改造",
    example: "New technologies are reshaping our daily lives.",
  },
  belonging: {
    word: "belonging",
    phonetic: "[bɪˈlɒŋɪŋ]",
    definition: "n. 归属感，所有物",
    example: "The club gives its members a sense of belonging.",
  },
  impact: {
    word: "impact",
    phonetic: "[ˈɪmpækt]",
    definition: "n./v. 影响，撞击",
    example: "The pandemic had a significant impact on local businesses.",
  },
  challenge: {
    word: "challenge",
    phonetic: "[ˈtʃælɪndʒ]",
    definition: "n./v. 挑战，质疑",
    example: "Climbing Mount Everest is a massive challenge.",
  },
  benefit: {
    word: "benefit",
    phonetic: "[ˈbenɪfɪt]",
    definition: "n./v. 利益，有益于",
    example: "Regular sleep is of great benefit to your health.",
  },
  improve: {
    word: "improve",
    phonetic: "[ɪmˈpruːv]",
    definition: "v. 提高，改善，好转",
    example: "He practiced daily to improve his pronunciation.",
  },
  promote: {
    word: "promote",
    phonetic: "[prəˈməʊt]",
    definition: "v. 促进，提升，推销",
    example: "The campaign aims to promote healthy eating.",
  },
  support: {
    word: "support",
    phonetic: "[səˈpɔːt]",
    definition: "v./n. 支持，拥护，支撑",
    example: "My parents always support my career choices.",
  },
  explore: {
    word: "explore",
    phonetic: "[ɪkˈsplɔː(r)]",
    definition: "v. 探索，勘探，探讨",
    example: "We plan to explore the ancient ruins tomorrow.",
  },
  identify: {
    word: "identify",
    phonetic: "[aɪˈdentɪfaɪ]",
    definition: "v. 识别，认出，确定",
    example: "Can you identify the man in this photo?",
  },
  analyze: {
    word: "analyze",
    phonetic: "[ˈænəlaɪz]",
    definition: "v. 分析，解析",
    example: "We need to analyze the data before drawing a conclusion.",
  },
  significant: {
    word: "significant",
    phonetic: "[sɪɡˈnɪfɪkənt]",
    definition: "adj. 显著的，重大的，有意义的",
    example: "There is a significant difference between the two results.",
  },
  evidence: {
    word: "evidence",
    phonetic: "[ˈevɪdəns]",
    definition: "n. 证据，迹象",
    example: "There is no scientific evidence to support this claim.",
  },
  demonstrate: {
    word: "demonstrate",
    phonetic: "[ˈdemənstreɪt]",
    definition: "v. 证明，论证，展示",
    example: "The experiments demonstrate the efficiency of the new engine.",
  },
  imply: {
    word: "imply",
    phonetic: "[ɪmˈplaɪ]",
    definition: "v. 暗示，意指，意味着",
    example: "Her silence does not imply agreement.",
  },
  conclude: {
    word: "conclude",
    phonetic: "[kənˈkluːd]",
    definition: "v. 得出结论，推断，结束",
    example: "What do you conclude from these experimental results?",
  },
  essential: {
    word: "essential",
    phonetic: "[ɪˈsenʃl]",
    definition: "adj. 必不可少的，本质的",
    example: "Water is essential for all living organisms.",
  },
  crucial: {
    word: "crucial",
    phonetic: "[ˈkruːʃl]",
    definition: "adj. 至关重要的，决定性的",
    example: "The next few hours are crucial for her recovery.",
  },
  fundamental: {
    word: "fundamental",
    phonetic: "[ˌfʌndəˈmentl]",
    definition: "adj. 基础的，根本的",
    example: "Freedom of speech is a fundamental human right.",
  },
  complex: {
    word: "complex",
    phonetic: "[ˈkɒmpleks]",
    definition: "adj. 复杂的，合成的",
    example: "The cellular structure of a plant is complex.",
  },
  simple: {
    word: "simple",
    phonetic: "[ˈsɪmpl]",
    definition: "adj. 简单的，纯朴的",
    example: "The rules of this game are simple and easy to follow.",
  },
  accurate: {
    word: "accurate",
    phonetic: "[ˈækjərət]",
    definition: "adj. 准确的，精确的",
    example: "Your prediction turned out to be highly accurate.",
  },
  reliable: {
    word: "reliable",
    phonetic: "[rɪˈlaɪəbl]",
    definition: "adj. 可靠的，可信赖的",
    example: "We need reliable data to make an informed decision.",
  },
  observe: {
    word: "observe",
    phonetic: "[əbˈzɜːv]",
    definition: "v. 观察，遵守，注意到",
    example: "Scientists observe the behavior of cells under microscopes.",
  },
  predict: {
    word: "predict",
    phonetic: "[prɪˈdɪkt]",
    definition: "v. 预测，预言",
    example: "It is hard to predict the weather accurately.",
  },
  evaluate: {
    word: "evaluate",
    phonetic: "[ɪˈvæljueɪt]",
    definition: "v. 评估，评价",
    example: "Teachers evaluate students' performance throughout the term.",
  },
  achieve: {
    word: "achieve",
    phonetic: "[əˈtʃiːv]",
    definition: "v. 达到，实现，获得",
    example: "With hard work, you can achieve your goals.",
  },
  obtain: {
    word: "obtain",
    phonetic: "[əbˈteɪn]",
    definition: "v. 获得，得到",
    example: "You must obtain permission before entering.",
  },
  generate: {
    word: "generate",
    phonetic: "[ˈdʒenəreɪt]",
    definition: "v. 产生，发生，引起",
    example: "Wind turbines generate clean electricity.",
  },
  create: {
    word: "create",
    phonetic: "[kriˈeɪt]",
    definition: "v. 创造，创建，创作",
    example: "The artist loves to create oil paintings.",
  },
  maintain: {
    word: "maintain",
    phonetic: "[meɪnˈteɪn]",
    definition: "v. 维持，保持，维修",
    example: "It is important to maintain a healthy lifestyle.",
  },
  preserve: {
    word: "preserve",
    phonetic: "[prɪˈzɜːv]",
    definition: "v. 保护，保存，维护",
    example: "We must preserve our historical monuments.",
  },
  adapt: {
    word: "adapt",
    phonetic: "[əˈdæpt]",
    definition: "v. 适应，改编",
    example: "Animals must adapt to changing environments.",
  },
  transform: {
    word: "transform",
    phonetic: "[trænsˈfɔːm]",
    definition: "v. 改变，使变形，重塑",
    example: "Education has the power to transform lives.",
  },
  evolve: {
    word: "evolve",
    phonetic: "[ɪˈvɒlv]",
    definition: "v. 进化，发展，演变",
    example: "Species evolve over millions of years.",
  },
  technology: {
    word: "technology",
    phonetic: "[tekˈnɒlədʒi]",
    definition: "n. 技术，科技",
    example: "Modern technology has made communication instant.",
  },
  society: {
    word: "society",
    phonetic: "[səˈsaɪəti]",
    definition: "n. 社会，社团",
    example: "Technology plays a key role in modern society.",
  },
  knowledge: {
    word: "knowledge",
    phonetic: "[ˈnɒlɪdʒ]",
    definition: "n. 知识，学识",
    example: "Sharing knowledge is the key to progress.",
  },
  experience: {
    word: "experience",
    phonetic: "[ɪkˈspɪəriəns]",
    definition: "n./v. 经验，经历",
    example: "Hands-on experience is highly valuable.",
  },
  collaborate: {
    word: "collaborate",
    phonetic: "[kəˈlæbəreɪt]",
    definition: "v. 合作，协作",
    example: "Researchers from different universities collaborate on this project.",
  },
  volunteer: {
    word: "volunteer",
    phonetic: "[ˌvɒlənˈtɪə(r)]",
    definition: "n./v. 志愿者，自愿",
    example: "He decided to volunteer at the local community hospital.",
  },
  education: {
    word: "education",
    phonetic: "[ˌedʒuˈkeɪʃn]",
    definition: "n. 教育，培养",
    example: "Primary education is free in many countries.",
  },
  professional: {
    word: "professional",
    phonetic: "[prəˈfeʃənl]",
    definition: "adj. 专业的，职业的",
    example: "She gave a highly professional presentation.",
  },
  resource: {
    word: "resource",
    phonetic: "[rɪˈsɔːs]",
    definition: "n. 资源，财力",
    example: "Water is our most precious natural resource.",
  },
  origin: {
    word: "origin",
    phonetic: "[ˈɒrɪdʒɪn]",
    definition: "n. 起源，出身，起点",
    example: "The origin of this tradition dates back to the middle ages.",
  },
  influence: {
    word: "influence",
    phonetic: "[ˈɪnfluəns]",
    definition: "n./v. 影响，感化",
    example: "My high school teacher had a great influence on me.",
  },
  consequence: {
    word: "consequence",
    phonetic: "[ˈkɒnsɪkwəns]",
    definition: "n. 后果，结果，重要性",
    example: "Global warming is a direct consequence of carbon emissions.",
  },
  discovery: {
    word: "discovery",
    phonetic: "[dɪˈskʌvəri]",
    definition: "n. 发现，被发现的事物",
    example: "The discovery of penicillin revolutionized medicine.",
  },
  reveal: {
    word: "reveal",
    phonetic: "[rɪˈviːl]",
    definition: "v. 揭露，显示，透露",
    example: "The x-ray did not reveal any bone fractures.",
  },
  indicate: {
    word: "indicate",
    phonetic: "[ˈɪndɪkeɪt]",
    definition: "v. 表明，指出，预示",
    example: "A high temperature can indicate an infection.",
  },
  suggest: {
    word: "suggest",
    phonetic: "[səˈdʒest]",
    definition: "v. 建议，暗指，表明",
    example: "Scientific data suggest that global temperatures are rising.",
  },
  propose: {
    word: "propose",
    phonetic: "[prəˈpəʊz]",
    definition: "v. 提议，建议，打算",
    example: "He proposed a new approach to solve the traffic issue.",
  },
  confirm: {
    word: "confirm",
    phonetic: "[kənˈfɜːm]",
    definition: "v. 确认，批准，证实",
    example: "Please click the link to confirm your email address.",
  },
  investigation: {
    word: "investigation",
    phonetic: "[ɪnˌvestɪˈɡeɪʃn]",
    definition: "n. 调查，科学探究",
    example: "An investigation is underway to find the cause of the fire.",
  },
  perspective: {
    word: "perspective",
    phonetic: "[pəˈspektɪv]",
    definition: "n. 观点，视角，远景",
    example: "Travel gives you a broader perspective on life.",
  },
  attitude: {
    word: "attitude",
    phonetic: "[ˈætɪtjuːd]",
    definition: "n. 态度，看法",
    example: "A positive attitude is the key to overcoming challenges.",
  },
  perception: {
    word: "perception",
    phonetic: "[pəˈsepʃn]",
    definition: "n. 知觉，感悟，洞察力",
    example: "Our perception of reality can sometimes be deceptive.",
  },
  awareness: {
    word: "awareness",
    phonetic: "[əˈweənəs]",
    definition: "n. 意识，认识，明白度",
    example: "The campaign aims to raise environmental awareness.",
  },
  insight: {
    word: "insight",
    phonetic: "[ˈɪnsaɪt]",
    definition: "n. 洞察力，深刻见解",
    example: "Her book offers fascinating insights into animal behavior.",
  },
};

// Main lookup function to resolve definitions for any clicked word
export function lookupWord(
  rawWord: string,
  currentVocabulary?: Record<string, ReadingWord>,
): ReadingWord {
  // Remove trailing and leading punctuation and convert to lowercase
  const cleanWord = rawWord
    .trim()
    .replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "") // remove non-letter characters from start/end
    .toLowerCase();

  // 1. Check if it's in the current passage vocabulary (direct match or inflected key match)
  if (currentVocabulary) {
    const foundKey = Object.keys(currentVocabulary).find(
      (k) => k.toLowerCase() === cleanWord || currentVocabulary[k].word.toLowerCase() === cleanWord,
    );
    if (foundKey) {
      return currentVocabulary[foundKey];
    }
  }

  // 2. Check if it matches any of the pre-defined vocabulary from all reading passages
  const preDefinedMatch = MOUNTED_VOCABULARY_LIST.find(
    (item) => item.word.toLowerCase() === cleanWord,
  );
  if (preDefinedMatch) {
    return preDefinedMatch;
  }

  // 3. Check if it's in our comprehensive offline dictionary
  const dictMatch = COMMON_DICTIONARY[cleanWord];
  if (dictMatch) {
    return dictMatch;
  }

  // 4. Handle common regular plural/past-tense/ing modifications (e.g. "animals" -> "animal", "developed" -> "develop")
  let baseForm = cleanWord;
  if (cleanWord.endsWith("s") && cleanWord.length > 3) {
    baseForm = cleanWord.slice(0, -1);
  } else if (cleanWord.endsWith("ed") && cleanWord.length > 4) {
    baseForm = cleanWord.slice(0, -2);
    if (!COMMON_DICTIONARY[baseForm] && cleanWord.endsWith("ied")) {
      baseForm = cleanWord.slice(0, -3) + "y";
    }
  } else if (cleanWord.endsWith("ing") && cleanWord.length > 5) {
    baseForm = cleanWord.slice(0, -3);
    if (!COMMON_DICTIONARY[baseForm]) {
      baseForm = baseForm + "e"; // e.g. "propelling" -> "propel" is handled, but "making" -> "make"
    }
  }

  // Look up base form
  const baseMatch =
    COMMON_DICTIONARY[baseForm] ||
    MOUNTED_VOCABULARY_LIST.find((item) => item.word.toLowerCase() === baseForm);
  if (baseMatch) {
    return {
      word: baseMatch.word,
      phonetic: baseMatch.phonetic,
      definition: baseMatch.definition,
      example: baseMatch.example,
    };
  }

  // 5. If still not found, return a dynamic fallback translation
  // We can capitalize the word beautifully and generate a smart standard placeholder
  const capitalized = rawWord.trim().replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "");

  // Provide basic common suffix guess for parts of speech
  let suffixGuess = "n./v.";
  if (capitalized.endsWith("ly")) suffixGuess = "adv.";
  else if (
    capitalized.endsWith("ful") ||
    capitalized.endsWith("ous") ||
    capitalized.endsWith("ive") ||
    capitalized.endsWith("able")
  )
    suffixGuess = "adj.";
  else if (
    capitalized.endsWith("tion") ||
    capitalized.endsWith("ment") ||
    capitalized.endsWith("ness") ||
    capitalized.endsWith("ity")
  )
    suffixGuess = "n.";
  else if (capitalized.endsWith("ize") || capitalized.endsWith("ate")) suffixGuess = "v.";

  return {
    word: capitalized,
    phonetic: `[${capitalized.toLowerCase()}]`,
    definition: `${suffixGuess} (点击右侧星号可一键将其收藏到生词本)`,
    example: `This word "${capitalized}" is used in context within the exam passage.`,
  };
}

// Favorite words storage utilities
const FAV_WORDS_KEY = "wm.favoriteWords";

export interface FavoriteWord {
  word: string;
  phonetic?: string;
  definition: string;
  example?: string;
  savedAt: string;
}

export function loadFavoriteWords(): FavoriteWord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(FAV_WORDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavoriteWords(words: FavoriteWord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAV_WORDS_KEY, JSON.stringify(words));
}

export function toggleWordFavorite(wordObj: ReadingWord): boolean {
  const current = loadFavoriteWords();
  const existingIndex = current.findIndex(
    (w) => w.word.toLowerCase() === wordObj.word.toLowerCase(),
  );
  let added = false;
  if (existingIndex > -1) {
    current.splice(existingIndex, 1);
  } else {
    current.push({
      word: wordObj.word,
      phonetic: wordObj.phonetic,
      definition: wordObj.definition,
      example: wordObj.example,
      savedAt: new Date().toISOString(),
    });
    added = true;
  }
  saveFavoriteWords(current);
  return added;
}

export function isWordFavorited(word: string): boolean {
  const current = loadFavoriteWords();
  return current.some((w) => w.word.toLowerCase() === word.toLowerCase());
}
