import { Link } from "@tanstack/react-router";

import { useAuthDialog } from "./AuthDialog";

const nav = [
  { label: "题库", to: "/" },
  { label: "错题本", to: "/" },
  { label: "涂写练习", to: "/" },
  { label: "定价", to: "/" },
  { label: "关于", to: "/" },
];

export function Header() {
  const { open, user, logout } = useAuthDialog();
  const maskedPhone = user ? `${user.phone.slice(0, 3)}****${user.phone.slice(7)}` : "";
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-hero flex h-18 items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <span className="font-display text-lg leading-none">W</span>
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg text-ink">WordMaster</span>
            <span className="text-[11px] tracking-[0.2em] text-ink-soft/70">词海刷题</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-sm text-ink-soft md:inline">{maskedPhone}</span>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-background px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
              >
                退出登录
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => open("login")}
                className="hidden text-sm text-ink-soft transition-colors hover:text-ink md:inline"
              >
                登录
              </button>
              <button
                onClick={() => open("register")}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                免费开始刷题
                <span aria-hidden>→</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
