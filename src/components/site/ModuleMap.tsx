const groups = [
  {
    label: "核心学习闭环",
    swatch: "mint",
    modules: [
      { id: "M03", name: "在线刷题引擎", p: "P0", desc: "顺序 / 随机 / 专项 / 模考 / 每日一练五种模式，即时判分" },
      { id: "M04", name: "智能错题本", p: "P0", desc: "错题自动归档为个性化词库，艾宾浩斯曲线推送复习" },
      { id: "M05", name: "试题解析与释义", p: "P0", desc: "AI 三段式讲解，点击生词即查词典与考点" },
      { id: "M06", name: "Canvas 涂写", p: "P0", desc: "内置手写画布，圈画长难句、批注解题思路" },
    ],
  },
  {
    label: "题库与内容",
    swatch: "sky",
    modules: [
      { id: "M02", name: "题库管理系统", p: "P0", desc: "考研 / 托福 / 雅思 / 四六级分类，筛选排序搜索" },
      { id: "M07", name: "自定义题库上传", p: "P0", desc: "PDF / Word / 拍照上传，OCR 自动切题" },
      { id: "M14", name: "搜索与推荐", p: "P1", desc: "Elasticsearch 全文检索 + 个性化推荐" },
    ],
  },
  {
    label: "账户与商业化",
    swatch: "butter",
    modules: [
      { id: "M01", name: "用户认证与账户", p: "P0", desc: "邮箱 / 手机号双通道，JWT 双 Token 策略" },
      { id: "M09", name: "会员与支付", p: "P0", desc: "月度 / 年度 / 终身订阅，支付宝 / 微信 / Stripe" },
      { id: "M13", name: "管理后台", p: "P1", desc: "题库审核、用户管理、运营数据看板" },
    ],
  },
  {
    label: "增长与体验",
    swatch: "blush",
    modules: [
      { id: "M08", name: "学习数据统计", p: "P1", desc: "答题热力图、掌握度雷达、成长曲线" },
      { id: "M10", name: "通知与消息", p: "P1", desc: "站内信 / 邮件 / 短信 / Web Push 四通道" },
      { id: "M11", name: "增长与运营", p: "P1", desc: "邀请返利、打卡日历、成就徽章体系" },
      { id: "M12", name: "社区与社交", p: "P2", desc: "笔记 / 问答 / 关注，围绕真题的学习社群" },
      { id: "M15", name: "缓存与性能", p: "P1", desc: "Redis 多级缓存 + CDN，保障 50ms 内响应" },
    ],
  },
];

const priorityStyle: Record<string, string> = {
  P0: "bg-primary text-primary-foreground",
  P1: "bg-accent-soft text-accent",
  P2: "bg-muted text-ink-soft",
};

export function ModuleMap() {
  return (
    <section className="container-hero py-28">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <span className="text-xs uppercase tracking-[0.25em] text-primary">
            Module Map · 15
          </span>
          <h2 className="mt-4 font-display text-5xl leading-tight text-ink">
            一张图看懂 <br />
            WordMaster 的
            <span className="italic text-primary"> 全景能力</span>。
          </h2>
          <p className="mt-6 max-w-sm text-ink-soft">
            从核心刷题引擎到运营增长，15 个模块按优先级分阶段落地，共同支撑"错题即词库"的学习闭环。
          </p>
          <div className="mt-8 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-primary-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/70" /> P0 上线必需
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> P1 首月增强
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-ink-soft/60" /> P2 中期规划
            </span>
          </div>
        </div>

        <div className="col-span-8 grid grid-cols-2 gap-6">
          {groups.map((g) => (
            <article
              key={g.label}
              className="relative overflow-hidden rounded-3xl border border-border bg-card p-7"
            >
              <div
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-60"
                style={{ background: `var(--${g.swatch})` }}
                aria-hidden
              />
              <div className="relative">
                <h3 className="font-display text-xl text-ink">{g.label}</h3>
                <ul className="mt-5 space-y-4">
                  {g.modules.map((m) => (
                    <li
                      key={m.id}
                      className="group flex items-start gap-3 border-t border-border pt-4 first:border-t-0 first:pt-0"
                    >
                      <span className="mt-0.5 font-display text-xs tracking-wider text-ink-soft">
                        {m.id}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-ink">{m.name}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityStyle[m.p]}`}
                          >
                            {m.p}
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                          {m.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
