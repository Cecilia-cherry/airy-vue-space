import { type ReadingWord } from "./reading-materials";

interface DictionaryEntry {
  word: string;
  phonetic: string;
  definition: string;
  example: string;
}

export interface WordLookupDetails extends ReadingWord {
  commonDefinitions: string[];
  contextDefinition: string;
}

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
  the: {
    word: "the",
    phonetic: "[ðə; ðiː]",
    definition: "art. 这，那；特指某人或某物",
    example: "The results were clearer than expected.",
  },
  a: {
    word: "a",
    phonetic: "[ə; eɪ]",
    definition: "art. 一个；每一；某一",
    example: "A small change can make a big difference.",
  },
  an: {
    word: "an",
    phonetic: "[ən; æn]",
    definition: "art. 一个（用于元音音素前）",
    example: "An early decision can shape the outcome.",
  },
  to: {
    word: "to",
    phonetic: "[tə; tuː]",
    definition: "prep. 向，到；对于；用于不定式符号",
    example: "She plans to return to the lab tomorrow.",
  },
  and: {
    word: "and",
    phonetic: "[ænd]",
    definition: "conj. 和，并且，而且",
    example: "Books and notes were spread across the desk.",
  },
  of: {
    word: "of",
    phonetic: "[əv; ɒv]",
    definition: "prep. ……的；关于；由……组成",
    example: "The history of science is full of surprises.",
  },
  in: {
    word: "in",
    phonetic: "[ɪn]",
    definition: "prep./adv. 在……里，在……期间，进入",
    example: "The samples were stored in a cool room.",
  },
  for: {
    word: "for",
    phonetic: "[fɔː(r)]",
    definition: "prep. 为了；给；对于；持续",
    example: "They campaigned for cleaner public transport.",
  },
  that: {
    word: "that",
    phonetic: "[ðæt]",
    definition: "pron./det./conj. 那，那个；引导从句",
    example: "The report shows that the policy is working.",
  },
  on: {
    word: "on",
    phonetic: "[ɒn]",
    definition: "prep./adv. 在……上；关于；继续",
    example: "The map was printed on recycled paper.",
  },
  their: {
    word: "their",
    phonetic: "[ðeə(r)]",
    definition: "det. 他们的；她们的；它们的",
    example: "Students presented their final projects.",
  },
  they: {
    word: "they",
    phonetic: "[ðeɪ]",
    definition: "pron. 他们；她们；它们",
    example: "They adjusted quickly to the new schedule.",
  },
  as: {
    word: "as",
    phonetic: "[æz; əz]",
    definition: "prep./conj./adv. 作为；像……一样；当……时",
    example: "As demand rose, prices followed.",
  },
  this: {
    word: "this",
    phonetic: "[ðɪs]",
    definition: "pron./det. 这，这个",
    example: "This result surprised the whole team.",
  },
  it: {
    word: "it",
    phonetic: "[ɪt]",
    definition: "pron. 它；这；形式主语或形式宾语",
    example: "It takes time to build new habits.",
  },
  with: {
    word: "with",
    phonetic: "[wɪð; wɪθ]",
    definition: "prep. 和；带有；用；随着",
    example: "The device works with solar power.",
  },
  can: {
    word: "can",
    phonetic: "[kæn]",
    definition: "modal v. 能，可以；可能",
    example: "Small changes can produce large effects.",
  },
  from: {
    word: "from",
    phonetic: "[frɒm; frəm]",
    definition: "prep. 从；来自；由于",
    example: "The museum attracts visitors from across Asia.",
  },
  by: {
    word: "by",
    phonetic: "[baɪ]",
    definition: "prep. 通过；在……旁边；截至；由",
    example: "The paper was written by two researchers.",
  },
  into: {
    word: "into",
    phonetic: "[ˈɪntuː]",
    definition: "prep. 进入；变成；朝向",
    example: "Rainwater flows into the underground tank.",
  },
  but: {
    word: "but",
    phonetic: "[bʌt]",
    definition: "conj./prep. 但是；除了",
    example: "The method is simple but effective.",
  },
  many: {
    word: "many",
    phonetic: "[ˈmeni]",
    definition: "det./pron. 许多",
    example: "Many cities are expanding public transit.",
  },
  now: {
    word: "now",
    phonetic: "[naʊ]",
    definition: "adv. 现在；如今",
    example: "Now more students study online than before.",
  },
  not: {
    word: "not",
    phonetic: "[nɒt]",
    definition: "adv. 不，并非",
    example: "The answer is not as obvious as it seems.",
  },
  over: {
    word: "over",
    phonetic: "[ˈəʊvə(r)]",
    definition: "prep./adv. 在……上方；超过；遍及",
    example: "The debate continued over several weeks.",
  },
  when: {
    word: "when",
    phonetic: "[wen]",
    definition: "adv./conj. 什么时候；当……时",
    example: "When conditions change, strategies must adapt.",
  },
  while: {
    word: "while",
    phonetic: "[waɪl]",
    definition: "conj./n. 当……时；然而；一会儿",
    example: "While technology helps, judgment still matters.",
  },
  about: {
    word: "about",
    phonetic: "[əˈbaʊt]",
    definition: "prep./adv. 关于；大约；在附近",
    example: "The article is about food waste in cities.",
  },
  at: {
    word: "at",
    phonetic: "[æt]",
    definition: "prep. 在；向；以；处于",
    example: "Students arrived at the library before noon.",
  },
  before: {
    word: "before",
    phonetic: "[bɪˈfɔː(r)]",
    definition: "prep./conj./adv. 在……之前",
    example: "Many species disappeared before humans arrived.",
  },
  instead: {
    word: "instead",
    phonetic: "[ɪnˈsted]",
    definition: "adv. 代替，反而",
    example: "He stayed home instead of joining the trip.",
  },
  make: {
    word: "make",
    phonetic: "[meɪk]",
    definition: "v. 制作；使得；做出",
    example: "These policies may make cities greener.",
  },
  may: {
    word: "may",
    phonetic: "[meɪ]",
    definition: "modal v. 可能；可以",
    example: "The change may affect future demand.",
  },
  more: {
    word: "more",
    phonetic: "[mɔː(r)]",
    definition: "det./pron./adv. 更多；更",
    example: "More consumers prefer digital services now.",
  },
  up: {
    word: "up",
    phonetic: "[ʌp]",
    definition: "adv./prep. 向上；起来；达到",
    example: "Use the app to look up unfamiliar words.",
  },
  which: {
    word: "which",
    phonetic: "[wɪtʃ]",
    definition: "pron./det. 哪一个；引导定语从句",
    example: "The option which costs less is often chosen.",
  },
  who: {
    word: "who",
    phonetic: "[huː]",
    definition: "pron. 谁；……的人",
    example: "Researchers who collect data need patience.",
  },
  around: {
    word: "around",
    phonetic: "[əˈraʊnd]",
    definition: "prep./adv. 在……周围；大约；到处",
    example: "The idea spread around the world quickly.",
  },
  through: {
    word: "through",
    phonetic: "[θruː]",
    definition: "prep./adv. 通过；穿过；自始至终",
    example: "Students worked through the night.",
  },
  under: {
    word: "under",
    phonetic: "[ˈʌndə(r)]",
    definition: "prep. 在……下面；在……情况下",
    example: "The village remained calm under pressure.",
  },
  use: {
    word: "use",
    phonetic: "[juːz]",
    definition: "v./n. 使用；用途",
    example: "We use data to improve public services.",
  },
  however: {
    word: "however",
    phonetic: "[haʊˈevə(r)]",
    definition: "adv. 然而，不过",
    example: "However, lower prices do not guarantee fairness.",
  },
  conversely: {
    word: "conversely",
    phonetic: "[kənˈvɜːsli]",
    definition: "adv. 相反地，反过来说",
    example: "Conversely, some critics argue for tighter regulation.",
  },
  nevertheless: {
    word: "nevertheless",
    phonetic: "[ˌnevəðəˈles]",
    definition: "adv. 然而，不过，尽管如此",
    example: "The task was difficult; nevertheless, they finished it.",
  },
  human: {
    word: "human",
    phonetic: "[ˈhjuːmən]",
    definition: "adj./n. 人类的；人",
    example: "Human choices can reshape the environment.",
  },
  year: {
    word: "year",
    phonetic: "[jɪə(r)]",
    definition: "n. 年，岁",
    example: "The study lasted three years.",
  },
  across: {
    word: "across",
    phonetic: "[əˈkrɒs]",
    definition: "prep./adv. 横过；穿过；遍及",
    example: "The policy was adopted across the region.",
  },
  choice: {
    word: "choice",
    phonetic: "[tʃɔɪs]",
    definition: "n. 选择，抉择",
    example: "Too much information can make each choice harder.",
  },
  argue: {
    word: "argue",
    phonetic: "[ˈɑːɡjuː]",
    definition: "v. 争论；主张；论证",
    example: "Some scholars argue that access should be free.",
  },
  contend: {
    word: "contend",
    phonetic: "[kənˈtend]",
    definition: "v. 主张；声称；竞争；斗争",
    example: "Tech developers contend that broader fair-use rules are needed.",
  },
  become: {
    word: "become",
    phonetic: "[bɪˈkʌm]",
    definition: "v. 变成；变得；适合",
    example: "Flexible schedules have become common in many industries.",
  },
  find: {
    word: "find",
    phonetic: "[faɪnd]",
    definition: "v. 发现；找到；觉得",
    example: "Students often find the first sentence the key to the answer.",
  },
  leave: {
    word: "leave",
    phonetic: "[liːv]",
    definition: "v. 离开；留下；使处于",
    example: "Many graduates leave home to study in another city.",
  },
  keep: {
    word: "keep",
    phonetic: "[kiːp]",
    definition: "v. 保持；保留；继续",
    example: "Students should keep a clear record of key mistakes.",
  },
  feel: {
    word: "feel",
    phonetic: "[fiːl]",
    definition: "v. 感觉；觉得；触摸",
    example: "Many people feel anxious before a major exam.",
  },
  see: {
    word: "see",
    phonetic: "[siː]",
    definition: "v. 看见；明白；理解",
    example: "Readers can see the author's attitude from word choice.",
  },
  take: {
    word: "take",
    phonetic: "[teɪk]",
    definition: "v. 拿；带走；花费；采取",
    example: "It may take time to build stronger vocabulary habits.",
  },
  give: {
    word: "give",
    phonetic: "[ɡɪv]",
    definition: "v. 给；给予；提供",
    example: "The passage gives two reasons for the policy change.",
  },
  drive: {
    word: "drive",
    phonetic: "[draɪv]",
    definition: "v. 驱动；推动；驾驶",
    example: "Economic pressure can drive rapid reform.",
  },
  write: {
    word: "write",
    phonetic: "[raɪt]",
    definition: "v. 写；撰写；写作",
    example: "Candidates need to write clearly under time pressure.",
  },
  know: {
    word: "know",
    phonetic: "[nəʊ]",
    definition: "v. 知道；了解；认识",
    example: "Good readers know when to return to the source sentence.",
  },
  show: {
    word: "show",
    phonetic: "[ʃəʊ]",
    definition: "v. 显示；表明；展示",
    example: "The chart shows a steady rise in energy use.",
  },
  grow: {
    word: "grow",
    phonetic: "[ɡrəʊ]",
    definition: "v. 增长；生长；逐渐变得",
    example: "Demand for clean transport continues to grow.",
  },
  speak: {
    word: "speak",
    phonetic: "[spiːk]",
    definition: "v. 说话；表达；表明",
    example: "The evidence speaks against the extreme claim.",
  },
  break: {
    word: "break",
    phonetic: "[breɪk]",
    definition: "v. 打破；中断；违反",
    example: "Short rests can break long periods of study.",
  },
  choose: {
    word: "choose",
    phonetic: "[tʃuːz]",
    definition: "v. 选择；挑选",
    example: "Students must choose the option best supported by the passage.",
  },
  bring: {
    word: "bring",
    phonetic: "[brɪŋ]",
    definition: "v. 带来；引起；使处于",
    example: "New tools bring both benefits and risks.",
  },
  think: {
    word: "think",
    phonetic: "[θɪŋk]",
    definition: "v. 思考；认为；想起",
    example: "Strong readers think in terms of evidence, not guesswork.",
  },
  catch: {
    word: "catch",
    phonetic: "[kætʃ]",
    definition: "v. 抓住；赶上；理解到",
    example: "A good定位句 can help you catch the author's real intention.",
  },
  build: {
    word: "build",
    phonetic: "[bɪld]",
    definition: "v. 建造；建立；逐步形成",
    example: "Consistent review helps build a stable word base.",
  },
  hear: {
    word: "hear",
    phonetic: "[hɪə(r)]",
    definition: "v. 听见；听说；得知",
    example: "Listeners need to hear the signal words clearly.",
  },
  say: {
    word: "say",
    phonetic: "[seɪ]",
    definition: "v. 说；表明；写着",
    example: "The sentence does not say that the trend is permanent.",
  },
  pay: {
    word: "pay",
    phonetic: "[peɪ]",
    definition: "v. 支付；付出；值得",
    example: "Consumers may pay more for products with stronger stories.",
  },
  read: {
    word: "read",
    phonetic: "[riːd]",
    definition: "v. 阅读；解读；写着",
    example: "Readers should read the question stem before returning to the passage.",
  },
  people: {
    word: "people",
    phonetic: "[ˈpiːpl]",
    definition: "n. 人们；人民",
    example: "People respond differently to uncertainty.",
  },
  where: {
    word: "where",
    phonetic: "[weə(r)]",
    definition: "adv./conj. 在哪里；在……的地方",
    example: "The map shows where the species first spread.",
  },
  these: {
    word: "these",
    phonetic: "[ðiːz]",
    definition: "pron./det. 这些",
    example: "These choices affect long-term outcomes.",
  },
  first: {
    word: "first",
    phonetic: "[fɜːst]",
    definition: "adj./adv. 第一；首先",
    example: "The first experiment failed, but the second worked.",
  },
  ago: {
    word: "ago",
    phonetic: "[əˈɡəʊ]",
    definition: "adv. 以前，……之前",
    example: "The event took place thousands of years ago.",
  },
  long: {
    word: "long",
    phonetic: "[lɒŋ]",
    definition: "adj./adv. 长的；长期地；很久",
    example: "Long trade routes connected distant regions.",
  },
  after: {
    word: "after",
    phonetic: "[ˈɑːftə(r)]",
    definition: "prep./conj./adv. 在……之后",
    example: "After the impact, temperatures dropped sharply.",
  },
  than: {
    word: "than",
    phonetic: "[ðæn]",
    definition: "conj./prep. 比；与……相比",
    example: "The task was harder than expected.",
  },
  how: {
    word: "how",
    phonetic: "[haʊ]",
    definition: "adv. 如何；怎样；多么",
    example: "The study shows how habits influence choices.",
  },
  or: {
    word: "or",
    phonetic: "[ɔː(r)]",
    definition: "conj. 或者；还是；否则",
    example: "Students may study at home or in the library.",
  },
  africa: {
    word: "Africa",
    phonetic: "[ˈæfrɪkə]",
    definition: "n. 非洲",
    example: "The species first spread from Africa.",
  },
  east: {
    word: "east",
    phonetic: "[iːst]",
    definition: "n./adj./adv. 东方；东部的；向东",
    example: "The expedition headed east after sunrise.",
  },
  horse: {
    word: "horse",
    phonetic: "[hɔːs]",
    definition: "n. 马",
    example: "Horses adapted poorly to the dry climate.",
  },
  social: {
    word: "social",
    phonetic: "[ˈsəʊʃl]",
    definition: "adj. 社会的；社交的",
    example: "Remote work has changed social interaction patterns.",
  },
  work: {
    word: "work",
    phonetic: "[wɜːk]",
    definition: "n./v. 工作；起作用；劳动",
    example: "Flexible work can improve daily life for families.",
  },
  donkey: {
    word: "donkey",
    phonetic: "[ˈdɒŋki]",
    definition: "n. 驴",
    example: "The donkey carried goods across rough terrain.",
  },
  thousand: {
    word: "thousand",
    phonetic: "[ˈθaʊznd]",
    definition: "num. 一千；数千",
    example: "Thousands of visitors arrive each summer.",
  },
  forward: {
    word: "forward",
    phonetic: "[ˈfɔːwəd]",
    definition: "adv./adj. 向前；前进的",
    example: "The reform pushed the industry forward.",
  },
  help: {
    word: "help",
    phonetic: "[help]",
    definition: "v./n. 帮助；援助",
    example: "Volunteers help collect field data each week.",
  },
  pull: {
    word: "pull",
    phonetic: "[pʊl]",
    definition: "v./n. 拉；拖；吸引力",
    example: "Strong animals can pull heavy carts.",
  },
  carry: {
    word: "carry",
    phonetic: "[ˈkæri]",
    definition: "v. 携带；运送；支撑",
    example: "The vehicles carry supplies into remote areas.",
  },
  move: {
    word: "move",
    phonetic: "[muːv]",
    definition: "v./n. 移动；搬动；举措",
    example: "Goods move faster through digital networks.",
  },
  animal: {
    word: "animal",
    phonetic: "[ˈænɪml]",
    definition: "n. 动物",
    example: "The animal adapted well to dry climates.",
  },
  trace: {
    word: "trace",
    phonetic: "[treɪs]",
    definition: "v./n. 追踪；追溯；痕迹",
    example: "Researchers trace the species back to one origin.",
  },
  single: {
    word: "single",
    phonetic: "[ˈsɪŋɡl]",
    definition: "adj. 单一的；单个的",
    example: "The data points to a single event.",
  },
  publish: {
    word: "publish",
    phonetic: "[ˈpʌblɪʃ]",
    definition: "v. 出版；发表",
    example: "The team plans to publish the results next month.",
  },
  journal: {
    word: "journal",
    phonetic: "[ˈdʒɜːnl]",
    definition: "n. 期刊；杂志；日志",
    example: "The article appeared in a major science journal.",
  },
  information: {
    word: "information",
    phonetic: "[ˌɪnfəˈmeɪʃn]",
    definition: "n. 信息；资料",
    example: "Too much information can reduce decision quality.",
  },
  family: {
    word: "family",
    phonetic: "[ˈfæməli]",
    definition: "n. 家庭；家族；科",
    example: "Genetic mapping revealed a clear family tree.",
  },
  tree: {
    word: "tree",
    phonetic: "[triː]",
    definition: "n. 树；树状图",
    example: "The chart resembles a branching family tree.",
  },
  role: {
    word: "role",
    phonetic: "[rəʊl]",
    definition: "n. 角色；作用",
    example: "Urban wetlands play a crucial role in flood control.",
  },
  place: {
    word: "place",
    phonetic: "[pleɪs]",
    definition: "n./v. 地方；地点；放置",
    example: "The city became a gathering place for artists.",
  },
  sample: {
    word: "sample",
    phonetic: "[ˈsɑːmpl]",
    definition: "n./v. 样本；样品；抽样",
    example: "Each sample was tested twice for accuracy.",
  },
  symbol: {
    word: "symbol",
    phonetic: "[ˈsɪmbl]",
    definition: "n. 象征；符号",
    example: "The monument became a symbol of civic pride.",
  },
  value: {
    word: "value",
    phonetic: "[ˈvæljuː]",
    definition: "n./v. 价值；重视",
    example: "Consumers often misjudge the value of luxury goods.",
  },
  buy: {
    word: "buy",
    phonetic: "[baɪ]",
    definition: "v./n. 买；购买",
    example: "People buy different products for different reasons.",
  },
  career: {
    word: "career",
    phonetic: "[kəˈrɪə(r)]",
    definition: "n. 职业；生涯",
    example: "Career choices are often shaped by family pressure.",
  },
  path: {
    word: "path",
    phonetic: "[pɑːθ]",
    definition: "n. 道路；路径；发展路线",
    example: "Students can choose a path that fits their strengths.",
  },
  decision: {
    word: "decision",
    phonetic: "[dɪˈsɪʒn]",
    definition: "n. 决定；决策",
    example: "Decision fatigue can reduce judgment quality.",
  },
  require: {
    word: "require",
    phonetic: "[rɪˈkwaɪə(r)]",
    definition: "v. 需要；要求",
    example: "Effective reform will require public support.",
  },
  look: {
    word: "look",
    phonetic: "[lʊk]",
    definition: "v./n. 看；寻找；样子",
    example: "People often look for shortcuts under pressure.",
  },
  default: {
    word: "default",
    phonetic: "[dɪˈfɔːlt]",
    definition: "n./adj./v. 默认；默认的；违约",
    example: "Many users accept the default setting.",
  },
  enjoy: {
    word: "enjoy",
    phonetic: "[ɪnˈdʒɔɪ]",
    definition: "v. 享受；喜爱",
    example: "People rarely enjoy making too many decisions.",
  },
  due: {
    word: "due",
    phonetic: "[djuː]",
    definition: "adj./adv. 由于；应得的；预定的",
    example: "Traffic slowed due to road construction.",
  },
  digital: {
    word: "digital",
    phonetic: "[ˈdɪdʒɪtl]",
    definition: "adj. 数字的，数码的",
    example: "Digital access broadens the audience for museums.",
  },
  energy: {
    word: "energy",
    phonetic: "[ˈenədʒi]",
    definition: "n. 能量；能源；精力",
    example: "Clean energy is central to the transition.",
  },
  global: {
    word: "global",
    phonetic: "[ˈɡləʊbl]",
    definition: "adj. 全球的，全世界的",
    example: "Global demand for batteries keeps rising.",
  },
  green: {
    word: "green",
    phonetic: "[ɡriːn]",
    definition: "adj. 绿色的；环保的",
    example: "Green transport policies need stable funding.",
  },
  library: {
    word: "library",
    phonetic: "[ˈlaɪbrəri]",
    definition: "n. 图书馆；藏书室",
    example: "The local library launched a free coding club.",
  },
  modern: {
    word: "modern",
    phonetic: "[ˈmɒdn]",
    definition: "adj. 现代的，近代的",
    example: "Modern cities rely on complex infrastructure.",
  },
  consumer: {
    word: "consumer",
    phonetic: "[kənˈsjuːmə(r)]",
    definition: "n. 消费者",
    example: "Consumer confidence affects market demand.",
  },
  city: {
    word: "city",
    phonetic: "[ˈsɪti]",
    definition: "n. 城市",
    example: "The city expanded its subway network.",
  },
  civilization: {
    word: "civilization",
    phonetic: "[ˌsɪvəlaɪˈzeɪʃn]",
    definition: "n. 文明",
    example: "Trade routes helped connect distant civilizations.",
  },
  genetic: {
    word: "genetic",
    phonetic: "[dʒəˈnetɪk]",
    definition: "adj. 基因的，遗传的",
    example: "Genetic evidence revealed a single origin.",
  },
  scientist: {
    word: "scientist",
    phonetic: "[ˈsaɪəntɪst]",
    definition: "n. 科学家",
    example: "Scientists tracked changes over several decades.",
  },
  event: {
    word: "event",
    phonetic: "[ɪˈvent]",
    definition: "n. 事件，大事",
    example: "The finding points to one major event.",
  },
  local: {
    word: "local",
    phonetic: "[ˈləʊkl]",
    definition: "adj./n. 当地的；本地人",
    example: "Local businesses benefited from the program.",
  },
  platform: {
    word: "platform",
    phonetic: "[ˈplætfɔːm]",
    definition: "n. 平台；站台",
    example: "Digital platforms shape how people work today.",
  },
  radiation: {
    word: "radiation",
    phonetic: "[ˌreɪdiˈeɪʃn]",
    definition: "n. 辐射，放射线",
    example: "Dust blocked solar radiation after the impact.",
  },
  study: {
    word: "study",
    phonetic: "[ˈstʌdi]",
    definition: "n./v. 研究；学习",
    example: "A recent study challenged the earlier view.",
  },
  wildlife: {
    word: "wildlife",
    phonetic: "[ˈwaɪldlaɪf]",
    definition: "n. 野生生物",
    example: "Wildlife conservation depends on habitat protection.",
  },
  urban: {
    word: "urban",
    phonetic: "[ˈɜːbən]",
    definition: "adj. 城市的，都市的",
    example: "Urban farming faces space and cost limits.",
  },
  solar: {
    word: "solar",
    phonetic: "[ˈsəʊlə(r)]",
    definition: "adj. 太阳的；利用太阳能的",
    example: "Solar panels have become much cheaper.",
  },
  nuclear: {
    word: "nuclear",
    phonetic: "[ˈnjuːkliə(r)]",
    definition: "adj. 核能的；核子的",
    example: "The impact triggered a prolonged nuclear winter.",
  },
  employment: {
    word: "employment",
    phonetic: "[ɪmˈplɔɪmənt]",
    definition: "n. 就业；雇用",
    example: "Automation may reshape patterns of employment.",
  },
  creativity: {
    word: "creativity",
    phonetic: "[ˌkriːeɪˈtɪvəti]",
    definition: "n. 创造力",
    example: "The debate centers on whether creativity is uniquely human.",
  },
  data: {
    word: "data",
    phonetic: "[ˈdeɪtə]",
    definition: "n. 数据，资料",
    example: "Data can improve planning when used responsibly.",
  },
  quality: {
    word: "quality",
    phonetic: "[ˈkwɒləti]",
    definition: "n. 质量；品质",
    example: "Price does not always reflect product quality.",
  },
  team: {
    word: "team",
    phonetic: "[tiːm]",
    definition: "n. 团队，小组",
    example: "The team published its findings this month.",
  },
  species: {
    word: "species",
    phonetic: "[ˈspiːʃiːz]",
    definition: "n. 物种，种类",
    example: "Some species adapt quickly to changing climates.",
  },
  vehicle: {
    word: "vehicle",
    phonetic: "[ˈviːəkl]",
    definition: "n. 车辆，交通工具",
    example: "Electric vehicles are more energy-efficient.",
  },
  traveler: {
    word: "traveler",
    phonetic: "[ˈtrævələ(r)]",
    definition: "n. 旅行者，旅客",
    example: "Travelers relied on donkeys to cross the desert.",
  },
  goods: {
    word: "goods",
    phonetic: "[ɡʊdz]",
    definition: "n. 商品，货物",
    example: "The animals carried goods across the region.",
  },
  world: {
    word: "world",
    phonetic: "[wɜːld]",
    definition: "n. 世界",
    example: "The discovery changed how the world saw the species.",
  },
  food: {
    word: "food",
    phonetic: "[fuːd]",
    definition: "n. 食物，食品",
    example: "Food waste remains a major urban problem.",
  },
  program: {
    word: "program",
    phonetic: "[ˈprəʊɡræm]",
    definition: "n. 项目；计划；程序",
    example: "The summer program lasts four weeks.",
  },
  freedom: {
    word: "freedom",
    phonetic: "[ˈfriːdəm]",
    definition: "n. 自由，自主",
    example: "Flexible work gives employees more freedom.",
  },
  autonomy: {
    word: "autonomy",
    phonetic: "[ɔːˈtɒnəmi]",
    definition: "n. 自主权，自治",
    example: "Autonomy at work can increase motivation.",
  },
  copyright: {
    word: "copyright",
    phonetic: "[ˈkɒpiraɪt]",
    definition: "n. 版权，著作权",
    example: "Copyright law is being tested by generative AI.",
  },
  critic: {
    word: "critic",
    phonetic: "[ˈkrɪtɪk]",
    definition: "n. 批评者，评论家",
    example: "Critics questioned the long-term effects of the plan.",
  },
  debate: {
    word: "debate",
    phonetic: "[dɪˈbeɪt]",
    definition: "n./v. 辩论；讨论",
    example: "The policy sparked a wide public debate.",
  },
  be: {
    word: "be",
    phonetic: "[biː]",
    definition: "v. 是，在，存在；用于构成进行时和被动语态",
    example: "To be honest, the task is harder than it looks.",
  },
  have: {
    word: "have",
    phonetic: "[hæv]",
    definition: "v. 有，拥有；经历；用于构成完成时",
    example: "Many students have trouble with auxiliary verbs at first.",
  },
  do: {
    word: "do",
    phonetic: "[duː]",
    definition: "v. 做，干；用于构成疑问句、否定句和强调",
    example: "Do your best, and progress will follow.",
  },
  northeast: {
    word: "northeast",
    phonetic: "[ˌnɔːθˈiːst]",
    definition: "n./adj./adv. 东北，东北方的，向东北",
    example: "The storm is moving toward the northeast.",
  },
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

const IRREGULAR_BASE_FORMS: Record<string, string[]> = {
  am: ["be"],
  is: ["be"],
  are: ["be"],
  was: ["be"],
  were: ["be"],
  been: ["be"],
  being: ["be"],
  became: ["become"],
  become: ["become"],
  has: ["have"],
  had: ["have"],
  having: ["have"],
  does: ["do"],
  did: ["do"],
  done: ["do"],
  found: ["find"],
  left: ["leave"],
  kept: ["keep"],
  felt: ["feel"],
  made: ["make"],
  paid: ["pay"],
  said: ["say"],
  seen: ["see"],
  taken: ["take"],
  given: ["give"],
  driven: ["drive"],
  written: ["write"],
  known: ["know"],
  shown: ["show"],
  grown: ["grow"],
  spoken: ["speak"],
  broken: ["break"],
  chosen: ["choose"],
  brought: ["bring"],
  bought: ["buy"],
  thought: ["think"],
  caught: ["catch"],
  built: ["build"],
  heard: ["hear"],
  read: ["read"],
};

function normalizeLookupWord(rawWord: string): string {
  return rawWord
    .trim()
    .replace(/[’]/g, "'")
    .replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "")
    .toLowerCase();
}

function deriveCandidateForms(cleanWord: string): string[] {
  const forms = new Set<string>();
  const push = (value: string) => {
    if (value) forms.add(value);
  };

  push(cleanWord);

  const irregularForms = IRREGULAR_BASE_FORMS[cleanWord];
  if (irregularForms) {
    irregularForms.forEach(push);
  }

  if (cleanWord.includes("'")) {
    const baseWord = cleanWord.split("'")[0];
    push(baseWord);

    if (cleanWord.endsWith("'ve")) push("have");
    if (cleanWord.endsWith("'re") || cleanWord.endsWith("'m")) push("be");
    if (cleanWord.endsWith("'ll")) push("will");
    if (cleanWord.endsWith("'d")) push("would");
    if (cleanWord.endsWith("n't")) {
      push("not");
      push(baseWord);
    }
  }

  if (cleanWord.endsWith("ies") && cleanWord.length > 4) {
    push(cleanWord.slice(0, -3) + "y");
  }

  if (cleanWord.endsWith("s") && cleanWord.length > 3) {
    push(cleanWord.slice(0, -1));
  }

  if (cleanWord.endsWith("es") && cleanWord.length > 4) {
    push(cleanWord.slice(0, -2));
  }

  if (cleanWord.endsWith("ied") && cleanWord.length > 4) {
    push(cleanWord.slice(0, -3) + "y");
  }

  if (cleanWord.endsWith("ed") && cleanWord.length > 4) {
    push(cleanWord.slice(0, -2));
    push(cleanWord.slice(0, -1));

    const stem = cleanWord.slice(0, -2);
    if (stem.length > 2 && stem.at(-1) === stem.at(-2)) {
      push(stem.slice(0, -1));
    }
  }

  if (cleanWord.endsWith("ing") && cleanWord.length > 5) {
    const stem = cleanWord.slice(0, -3);
    push(stem);
    push(stem + "e");

    // Handle doubled consonants such as "propelling" -> "propel".
    if (stem.length > 2 && stem.at(-1) === stem.at(-2)) {
      push(stem.slice(0, -1));
    }
  }

  return [...forms];
}

function findPassageVocabularyMatch(
  forms: string[],
  currentVocabulary?: Record<string, ReadingWord>,
): ReadingWord | null {
  if (!currentVocabulary) return null;

  for (const form of forms) {
    const foundKey = Object.keys(currentVocabulary).find(
      (key) => key.toLowerCase() === form || currentVocabulary[key].word.toLowerCase() === form,
    );
    if (foundKey) {
      return currentVocabulary[foundKey];
    }
  }

  return null;
}

function findMountedVocabularyMatch(forms: string[]): DictionaryEntry | null {
  for (const form of forms) {
    const match = MOUNTED_VOCABULARY_LIST.find((item) => item.word.toLowerCase() === form);
    if (match) return match;
  }

  return null;
}

function findCommonDictionaryMatch(forms: string[]): DictionaryEntry | null {
  for (const form of forms) {
    const match = COMMON_DICTIONARY[form];
    if (match) return match;
  }

  return null;
}

function guessPartOfSpeech(word: string): string {
  if (word.endsWith("ly")) return "adv.";
  if (
    word.endsWith("ful") ||
    word.endsWith("ous") ||
    word.endsWith("ive") ||
    word.endsWith("able") ||
    word.endsWith("ible") ||
    word.endsWith("al") ||
    word.endsWith("ic") ||
    word.endsWith("ish") ||
    word.endsWith("less")
  ) {
    return "adj.";
  }
  if (
    word.endsWith("tion") ||
    word.endsWith("ment") ||
    word.endsWith("ness") ||
    word.endsWith("ity") ||
    word.endsWith("ship")
  ) {
    return "n.";
  }
  if (
    word.endsWith("ize") ||
    word.endsWith("ise") ||
    word.endsWith("ate") ||
    word.endsWith("fy") ||
    word.endsWith("en")
  ) {
    return "v.";
  }

  return "n./v.";
}

function buildFallbackEntry(rawWord: string): DictionaryEntry {
  const capitalized = rawWord.trim().replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "");

  return {
    word: capitalized,
    phonetic: `[${capitalized.toLowerCase()}]`,
    definition: `${guessPartOfSpeech(capitalized.toLowerCase())} 点击右侧星号可一键收藏到生词本`,
    example: `This word "${capitalized}" is used in context within the exam passage.`,
  };
}

function splitDefinitionItems(definition: string): string[] {
  const items: string[] = [];
  const seen = new Set<string>();
  const segments = definition
    .split(/[；;]+/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  for (const segment of segments) {
    const match = segment.match(/^([a-z]+\.)\s*(.+)$/i);
    if (!match) {
      if (!seen.has(segment)) {
        seen.add(segment);
        items.push(segment);
      }
      continue;
    }

    const [, partOfSpeech, body] = match;
    const meanings = body
      .split(/[，、/]+/)
      .map((item) => item.trim())
      .filter(Boolean);

    if (meanings.length === 0) {
      const formatted = `${partOfSpeech} ${body.trim()}`;
      if (!seen.has(formatted)) {
        seen.add(formatted);
        items.push(formatted);
      }
      continue;
    }

    for (const meaning of meanings) {
      const formatted = `${partOfSpeech} ${meaning}`;
      if (!seen.has(formatted)) {
        seen.add(formatted);
        items.push(formatted);
      }
    }
  }

  return items;
}

function chooseContextDefinition(
  definitions: string[],
  contextText?: string,
  rawWord?: string,
): string | null {
  if (definitions.length === 0) return null;
  if (!contextText || !rawWord) return definitions[0];

  const tokens = contextText.match(/[a-zA-Z]+[-'a-zA-Z]*/g) ?? [];
  const normalizedWord = normalizeLookupWord(rawWord);
  const targetIndex = tokens.findIndex((token) => normalizeLookupWord(token) === normalizedWord);
  const prev = targetIndex > 0 ? tokens[targetIndex - 1].toLowerCase() : "";

  let preferredPos: string | null = null;

  if (
    ["to", "can", "could", "should", "would", "may", "might", "must", "will", "shall"].includes(
      prev,
    )
  ) {
    preferredPos = "v.";
  } else if (
    ["is", "are", "was", "were", "be", "been", "being", "seem", "seems", "become", "became"].includes(
      prev,
    )
  ) {
    preferredPos = "adj.";
  } else if (
    [
      "a",
      "an",
      "the",
      "this",
      "that",
      "these",
      "those",
      "my",
      "your",
      "his",
      "her",
      "their",
      "our",
    ].includes(prev)
  ) {
    preferredPos = "n.";
  } else {
    preferredPos = guessPartOfSpeech(normalizedWord);
  }

  return definitions.find((definition) => definition.startsWith(preferredPos)) ?? definitions[0];
}

function resolveWordEntry(
  rawWord: string,
  currentVocabulary?: Record<string, ReadingWord>,
): DictionaryEntry {
  const cleanWord = normalizeLookupWord(rawWord);
  const forms = deriveCandidateForms(cleanWord);

  const passageMatch = findPassageVocabularyMatch(forms, currentVocabulary);
  if (passageMatch) return passageMatch;

  const mountedMatch = findMountedVocabularyMatch(forms);
  if (mountedMatch) return mountedMatch;

  const commonMatch = findCommonDictionaryMatch(forms);
  if (commonMatch) return commonMatch;

  return buildFallbackEntry(rawWord);
}

function resolveCommonEntry(rawWord: string): DictionaryEntry | null {
  const cleanWord = normalizeLookupWord(rawWord);
  const forms = deriveCandidateForms(cleanWord);
  return findCommonDictionaryMatch(forms) ?? findMountedVocabularyMatch(forms);
}

// Main lookup function to resolve definitions for any clicked word
export function lookupWord(
  rawWord: string,
  currentVocabulary?: Record<string, ReadingWord>,
): ReadingWord {
  return resolveWordEntry(rawWord, currentVocabulary);
}

export function lookupWordDetails(
  rawWord: string,
  currentVocabulary?: Record<string, ReadingWord>,
  contextText?: string,
): WordLookupDetails {
  const contextEntry = resolveWordEntry(rawWord, currentVocabulary);
  const commonEntry = resolveCommonEntry(rawWord) ?? contextEntry;

  const commonDefinitions = splitDefinitionItems(commonEntry.definition);
  const contextDefinition =
    findPassageVocabularyMatch(deriveCandidateForms(normalizeLookupWord(rawWord)), currentVocabulary)
      ?.definition ??
    chooseContextDefinition(commonDefinitions, contextText, rawWord) ??
    contextEntry.definition;

  return {
    word: contextEntry.word,
    phonetic: commonEntry.phonetic || contextEntry.phonetic,
    definition: contextDefinition,
    example: contextEntry.example || commonEntry.example,
    commonDefinitions,
    contextDefinition,
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
