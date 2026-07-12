import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type AuthMode = "login" | "register";

type AuthUser = { phone: string };

type AuthDialogContextValue = {
  open: (mode?: AuthMode) => void;
  close: () => void;
  user: AuthUser | null;
  logout: () => void;
};

const AuthDialogContext = createContext<AuthDialogContextValue | null>(null);

export function useAuthDialog() {
  const ctx = useContext(AuthDialogContext);
  if (!ctx) throw new Error("useAuthDialog must be used inside AuthDialogProvider");
  return ctx;
}

const phoneSchema = z
  .string()
  .trim()
  .regex(/^1[3-9]\d{9}$/, { message: "请输入有效的 11 位手机号" });

const passwordSchema = z
  .string()
  .min(6, { message: "密码至少 6 位" })
  .max(64, { message: "密码不超过 64 位" });

const loginSchema = z.object({ phone: phoneSchema, password: passwordSchema });
const registerSchema = loginSchema
  .extend({ confirm: passwordSchema })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "两次输入的密码不一致",
  });

// In-memory "registered users" store — UI-only until backend is wired.
const registered = new Map<string, string>();

export function AuthDialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");

  const value = useMemo<AuthDialogContextValue>(
    () => ({
      open: (m: AuthMode = "login") => {
        setMode(m);
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
    }),
    [],
  );

  return (
    <AuthDialogContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[420px] rounded-2xl">
          {mode === "login" ? (
            <LoginView
              onSwitch={() => setMode("register")}
              onSuccess={() => setIsOpen(false)}
            />
          ) : (
            <RegisterView onDone={() => setMode("login")} />
          )}
        </DialogContent>
      </Dialog>
    </AuthDialogContext.Provider>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-500">{msg}</p>;
}

function LoginView({
  onSwitch,
  onSuccess,
}: {
  onSwitch: () => void;
  onSuccess: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = loginSchema.safeParse({ phone, password });
    if (!parsed.success) {
      const fieldErrors: { phone?: string; password?: string } = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as "phone" | "password";
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // UI-only: check the in-memory store; if unknown phone, prompt to register.
    setTimeout(() => {
      setSubmitting(false);
      if (!registered.has(parsed.data.phone)) {
        toast.info("该手机号未注册，请先注册账号");
        onSwitch();
        return;
      }
      if (registered.get(parsed.data.phone) !== parsed.data.password) {
        setErrors({ password: "手机号或密码错误" });
        return;
      }
      toast.success("登录成功");
      onSuccess();
    }, 250);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-display text-2xl text-ink">欢迎回来</DialogTitle>
        <DialogDescription className="text-ink-soft">
          使用手机号与密码登录 WordMaster
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="mt-2 space-y-4">
        <div>
          <Label htmlFor="login-phone" className="text-ink-soft">
            手机号
          </Label>
          <Input
            id="login-phone"
            type="tel"
            inputMode="numeric"
            maxLength={11}
            placeholder="请输入 11 位手机号"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="mt-1.5 h-11 rounded-xl"
            autoComplete="tel"
          />
          <FieldError msg={errors.phone} />
        </div>

        <div>
          <Label htmlFor="login-password" className="text-ink-soft">
            密码
          </Label>
          <Input
            id="login-password"
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 h-11 rounded-xl"
            autoComplete="current-password"
            maxLength={64}
          />
          <FieldError msg={errors.password} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-ink text-sm font-medium text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {submitting ? "登录中…" : "登录"}
        </button>

        <p className="text-center text-sm text-ink-soft">
          还没有账号？
          <button
            type="button"
            onClick={onSwitch}
            className="ml-1 font-medium text-ink underline-offset-4 hover:underline"
          >
            立即注册
          </button>
        </p>
      </form>
    </>
  );
}

function RegisterView({ onDone }: { onDone: () => void }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{
    phone?: string;
    password?: string;
    confirm?: string;
  }>({});
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = registerSchema.safeParse({ phone, password, confirm });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof typeof errors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      if (registered.has(parsed.data.phone)) {
        setErrors({ phone: "该手机号已注册，请直接登录" });
        return;
      }
      registered.set(parsed.data.phone, parsed.data.password);
      toast.success("注册成功，请使用新账号登录");
      onDone();
    }, 250);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-display text-2xl text-ink">创建账号</DialogTitle>
        <DialogDescription className="text-ink-soft">
          注册成功后将返回登录页面完成登录
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="mt-2 space-y-4">
        <div>
          <Label htmlFor="reg-phone" className="text-ink-soft">
            手机号
          </Label>
          <Input
            id="reg-phone"
            type="tel"
            inputMode="numeric"
            maxLength={11}
            placeholder="请输入 11 位手机号"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="mt-1.5 h-11 rounded-xl"
            autoComplete="tel"
          />
          <FieldError msg={errors.phone} />
        </div>

        <div>
          <Label htmlFor="reg-password" className="text-ink-soft">
            设置密码
          </Label>
          <Input
            id="reg-password"
            type="password"
            placeholder="至少 6 位"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 h-11 rounded-xl"
            autoComplete="new-password"
            maxLength={64}
          />
          <FieldError msg={errors.password} />
        </div>

        <div>
          <Label htmlFor="reg-confirm" className="text-ink-soft">
            确认密码
          </Label>
          <Input
            id="reg-confirm"
            type="password"
            placeholder="再次输入密码"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1.5 h-11 rounded-xl"
            autoComplete="new-password"
            maxLength={64}
          />
          <FieldError msg={errors.confirm} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full bg-ink text-sm font-medium text-background transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {submitting ? "提交中…" : "注册"}
        </button>

        <p className="text-center text-sm text-ink-soft">
          已有账号？
          <button
            type="button"
            onClick={onDone}
            className="ml-1 font-medium text-ink underline-offset-4 hover:underline"
          >
            返回登录
          </button>
        </p>
      </form>
    </>
  );
}
