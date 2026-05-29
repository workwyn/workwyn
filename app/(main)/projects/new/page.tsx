"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import {
  Lightbulb,
  Send,
  Loader2,
  CheckCircle,
  Lock,
  ArrowRight,
  Banknote,
  Tags,
  Users,
  Clock,
  X,
} from "lucide-react";

const STAGES = ["Idea", "Prototype", "MVP", "Growth"] as const;
const CATEGORIES = ["Tech", "Creative", "Community", "Finance", "Education", "Health", "E-commerce", "Entertainment"] as const;
const ROLES = ["Developer", "Designer", "Marketer", "Content Creator", "Business", "Data/AI", "Operations", "Other"] as const;
const TIMELINES = ["1-2 weeks", "1 month", "2-3 months", "6 months", "1 year+", "Flexible"] as const;

export default function NewProjectPage() {
  const { user, isLoading } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [visionStory, setVisionStory] = useState("");
  const [stage, setStage] = useState<string>("Idea");
  const [budget, setBudget] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  const toggleRole = (role: string) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  // ─── Loading state ─────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-brand-blue/40" />
      </div>
    );
  }

  // ─── Not authenticated ─────────────────────────────────────────────
  if (!user) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-blue/10">
          <Lock className="size-10 text-brand-blue" />
        </div>
        <h1 className="text-2xl font-bold text-brand-blue sm:text-3xl">
          {t("post.sign_in_title")}
        </h1>
        <p className="mt-3 max-w-sm text-base text-muted-foreground">
          {t("post.sign_in_desc")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 gap-2 rounded-xl bg-brand-yellow px-8 text-base font-bold text-brand-blue-dark shadow-lg shadow-brand-yellow/25 hover:bg-brand-yellow-dark"
            id="auth-gate-login"
          >
            <Link href="/login">
              {t("post.sign_in_btn")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-xl border-brand-blue/20 px-8 text-base font-semibold text-brand-blue hover:border-brand-blue/40 hover:bg-brand-blue/5"
            id="auth-gate-register"
          >
            <Link href="/register">{t("post.create_acc_btn")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  // ─── Success state ─────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100">
          <CheckCircle className="size-10 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-emerald-900 sm:text-3xl">
          {t("post.success_title")}
        </h1>
        <p className="mt-3 max-w-sm text-base text-emerald-700">
          {t("post.success_desc")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 gap-2 rounded-xl bg-brand-yellow px-8 text-base font-bold text-brand-blue-dark shadow-lg shadow-brand-yellow/25 hover:bg-brand-yellow-dark"
            id="success-explore"
          >
            <Link href="/projects">
              {t("post.explore_btn")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 rounded-xl border-emerald-300 px-8 text-base font-semibold text-emerald-700 hover:bg-emerald-50"
            onClick={() => {
              setTitle("");
              setVisionStory("");
              setStage("Idea");
              setSubmitted(false);
            }}
            id="success-another"
          >
            {t("post.post_another_btn")}
          </Button>
        </div>
      </div>
    );
  }

  // ─── Form ──────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    // In production: POST to API route → Cloudflare D1
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
            <Lightbulb className="size-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-blue sm:text-3xl">
            {t("post.title")}
          </h1>
        </div>
        <p className="mt-3 max-w-xl text-base text-muted-foreground">
          {t("post.desc")}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("post.posting_as")}{" "}
          <strong className="text-foreground">{user.name}</strong> (
          {user.email})
        </p>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-2xl border border-border/60 bg-white p-6 shadow-sm sm:p-10"
        id="post-vision-form"
      >
        {/* Project Title */}
        <div className="space-y-2">
          <Label htmlFor="project-title" className="text-sm font-semibold">
            {t("post.proj_title_label")}
          </Label>
          <Input
            id="project-title"
            placeholder={t("post.proj_title_ph")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-lg text-base focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
            required
          />
          <p className="text-xs text-muted-foreground">
            {t("post.proj_title_hint")}
          </p>
        </div>

        {/* Current Stage */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">{t("post.stage_label")}</Label>
          <div className="flex flex-wrap gap-2">
            {STAGES.map((s) => {
              const isActive = stage === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStage(s)}
                  className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                      : "border-border/60 bg-white text-muted-foreground hover:border-brand-blue/30 hover:text-brand-blue"
                  }`}
                  id={`stage-${s.toLowerCase()}`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {t("post.stage_hint")}
          </p>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <Label htmlFor="budget" className="text-sm font-semibold">
            {t("post.budget_label")}
          </Label>
          <div className="relative">
            <Banknote className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
            <Input
              id="budget"
              type="text"
              inputMode="numeric"
              placeholder={t("post.budget_ph")}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="rounded-lg pl-10 text-base focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {t("post.budget_hint")}
          </p>
        </div>

        {/* Category */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tags className="size-4 text-muted-foreground" />
            <Label className="text-sm font-semibold">{t("post.category_label")}</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = categories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                    isActive
                      ? "border-brand-yellow bg-brand-yellow/20 text-brand-blue-dark shadow-sm"
                      : "border-border/60 bg-white text-muted-foreground hover:border-brand-yellow/50 hover:text-foreground"
                  }`}
                  id={`cat-${cat.toLowerCase()}`}
                >
                  {cat}
                  {isActive && <X className="size-3" />}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {t("post.category_hint")}
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-muted-foreground" />
            <Label className="text-sm font-semibold">{t("post.timeline_label")}</Label>
          </div>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((tl) => {
              const isActive = timeline === tl;
              return (
                <button
                  key={tl}
                  type="button"
                  onClick={() => setTimeline(isActive ? "" : tl)}
                  className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "border-brand-blue bg-brand-blue text-white shadow-sm"
                      : "border-border/60 bg-white text-muted-foreground hover:border-brand-blue/30 hover:text-brand-blue"
                  }`}
                  id={`timeline-${tl.toLowerCase().replace(/[\s\+]/g, "-")}`}
                >
                  {tl}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground">
            {t("post.timeline_hint")}
          </p>
        </div>

        {/* Vision Story */}
        <div className="space-y-2">
          <Label htmlFor="vision-story" className="text-sm font-semibold">
            {t("post.story_label")}
          </Label>
          <Textarea
            id="vision-story"
            placeholder={t("post.story_ph")}
            value={visionStory}
            onChange={(e) => setVisionStory(e.target.value)}
            rows={8}
            className="resize-none rounded-lg text-base leading-relaxed focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
            required
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {t("post.story_hint")}
            </p>
            <Badge
              variant="outline"
              className="rounded-full text-xs text-muted-foreground"
            >
              {visionStory.length} {t("post.chars")}
            </Badge>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || !title.trim() || !visionStory.trim()}
          className="w-full gap-2 rounded-xl bg-brand-yellow text-base font-bold text-brand-blue-dark shadow-lg shadow-brand-yellow/25 transition-all hover:bg-brand-yellow-dark hover:shadow-xl hover:shadow-brand-yellow/30 disabled:opacity-60"
          id="publish-vision"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t("post.publishing")}
            </>
          ) : (
            <>
              <Send className="size-4" />
              {t("post.publish_btn")}
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
