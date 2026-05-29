"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import { LogIn, Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t("auth.login_err_empty"));
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      const res = router.push("/projects/new") as any;
      if (res && typeof res.catch === 'function') {
        res.catch((e: any) => { if (e !== undefined) console.error(e); });
      }
    } catch (e: any) {
      setError(e ? e.toString() : "undefined error thrown");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      {/* Container */}
      <div className="flex flex-col">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
            <Image
              src="/images/Untitled-5_Workwyn-logo-mark.png"
              alt="Workwyn Mark"
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-brand-blue">{t("auth.login_title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("auth.login_desc")}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">
              {t("auth.email_label")}
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
              <Input
                id="email"
                type="email"
                placeholder={t("auth.email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg pl-10 focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-semibold">
              {t("auth.password_label")}
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
              <Input
                id="password"
                type="password"
                placeholder={t("auth.password_placeholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg pl-10 focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full gap-2 rounded-xl bg-brand-yellow text-base font-bold text-brand-blue-dark shadow-lg shadow-brand-yellow/25 transition-all hover:bg-brand-yellow-dark hover:shadow-xl hover:shadow-brand-yellow/30 disabled:opacity-60"
            id="login-submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("auth.signing_in")}
              </>
            ) : (
              t("auth.sign_in_btn")
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">{t("auth.or")}</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Register link */}
        <p className="text-center text-sm text-muted-foreground">
          {t("auth.no_account")}{" "}
          <Link
            href="/register"
            className="font-semibold text-brand-blue underline-offset-2 hover:underline"
          >
            {t("auth.create_one")}
          </Link>
        </p>
      </div>
    </div>
  );
}
