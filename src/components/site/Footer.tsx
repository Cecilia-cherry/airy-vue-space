export function Footer() {
  const cols = [
    { title: "产品", items: ["题库中心", "错题本", "涂写练习", "自定义上传", "数据中心"] },
    { title: "考试", items: ["考研英语", "托福 TOEFL", "雅思 IELTS", "四六级"] },
    { title: "支持", items: ["帮助文档", "客服反馈", "服务状态", "隐私协议"] },
  ];
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container-hero py-20">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary font-display text-lg text-primary-foreground">
                W
              </div>
              <span className="font-display text-lg text-ink">WordMaster · 词海刷题</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              把每一次刷题都变成词汇积累。为认真准备考试的你而做。
            </p>
            <div className="mt-8 flex items-center gap-3">
              {["微信", "小红书", "B 站", "邮件"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-9 items-center justify-center rounded-full border border-border bg-background px-4 text-xs text-ink-soft transition hover:text-ink"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title} className="col-span-2 col-start-auto">
              <h4 className="font-display text-sm text-ink">{c.title}</h4>
              <ul className="mt-5 space-y-3">
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-ink-soft transition hover:text-ink">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2">
            <h4 className="font-display text-sm text-ink">订阅更新</h4>
            <p className="mt-5 text-xs text-ink-soft">新题库上线、备考技巧，每月一封。</p>
            <div className="mt-4 flex items-center rounded-full border border-border bg-background p-1">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-3 py-1.5 text-xs text-ink outline-none placeholder:text-ink-soft/60"
              />
              <button className="rounded-full bg-ink px-3 py-1.5 text-xs text-background">
                订阅
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between border-t border-border pt-8 text-xs text-ink-soft">
          <span>© 2026 WordMaster. 刷题即积累。</span>
          <span>Made with 🍵 for language learners.</span>
        </div>
      </div>
    </footer>
  );
}
