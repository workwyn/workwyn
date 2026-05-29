"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  FolderOpen,
  Rocket,
  Star,
  Send,
  Loader2,
  CheckCircle,
  Lock,
  Presentation,
  Eye
} from "lucide-react";
import type { ProjectVision } from "@/types";
import { useTranslation } from "@/lib/i18n-context";

// ─── Slide Definitions ───────────────────────────────────────────────

const SLIDE_KEYS = ["about_me", "proposed_role", "relevant_experience", "action_plan", "why_me"] as const;
type SlideKey = (typeof SLIDE_KEYS)[number];

const ICONS = {
  about_me: User,
  proposed_role: Briefcase,
  relevant_experience: FolderOpen,
  action_plan: Rocket,
  why_me: Star,
};

// ─── Component ───────────────────────────────────────────────────────

interface PitchDeckBuilderProps {
  project: ProjectVision;
}

export function PitchDeckBuilder({ project }: PitchDeckBuilderProps) {
  const { user, isLoading } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [slides, setSlides] = useState<Record<SlideKey, string>>({
    about_me: "",
    proposed_role: "",
    relevant_experience: "",
    action_plan: "",
    why_me: "",
  });

  const filledCount = useMemo(
    () => Object.values(slides).filter((v) => v.trim().length > 0).length,
    [slides]
  );

  const allFilled = filledCount === SLIDE_KEYS.length;
  
  const getSlideDef = (key: SlideKey, index: number) => ({
    key,
    icon: ICONS[key],
    title: t(`pitch_builder.slide_${index + 1}_title`),
    subtitle: t(`pitch_builder.slide_${index + 1}_sub`),
    placeholder: t(`pitch_builder.slide_${index + 1}_ph`),
    tip: t(`pitch_builder.slide_${index + 1}_tip`),
  });

  const currentDef = getSlideDef(SLIDE_KEYS[currentSlide], currentSlide);

  function updateSlide(key: SlideKey, value: string) {
    setSlides((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  // ─── Loading ─────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-brand-blue/40" />
      </div>
    );
  }

  // ─── Auth gate ───────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-border/60 bg-white p-10 text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blue/10">
          <Lock className="size-8 text-brand-blue" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-blue">
            {t("pitch_builder.sign_in_title")}
          </h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {t("pitch_builder.sign_in_desc")}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            asChild
            className="gap-2 rounded-xl bg-brand-yellow font-bold text-brand-blue-dark hover:bg-brand-yellow-dark"
            size="lg"
          >
            <Link href="/login">
              {t("pitch_builder.sign_in_btn")} <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl border-brand-blue/20 text-brand-blue"
          >
            <Link href="/register">{t("pitch_builder.create_acc_btn")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  // ─── Success ─────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100">
          <CheckCircle className="size-10 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-emerald-900">
            {t("pitch_builder.success_title")}
          </h3>
          <p className="mt-2 max-w-md text-sm text-emerald-700">
            {t("pitch_builder.success_desc")}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            asChild
            className="gap-2 rounded-xl bg-brand-yellow font-bold text-brand-blue-dark hover:bg-brand-yellow-dark"
            size="lg"
          >
            <Link href="/projects">
              {t("pitch_builder.explore_more")} <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-xl border-emerald-300 text-emerald-700 hover:bg-emerald-100"
            onClick={() => router.push(`/projects/${project.id}`)}
          >
            {t("pitch_builder.back_to")} {project.title}
          </Button>
        </div>
      </div>
    );
  }

  // ─── Preview Mode ────────────────────────────────────────────────
  if (showPreview) {
    return (
      <div className="space-y-6">
        {/* Preview Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowPreview(false)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-blue"
          >
            <ChevronLeft className="size-4" />
            {t("pitch_builder.back_to_editor")}
          </button>
          <Button
            onClick={handleSubmit}
            disabled={!allFilled || isSubmitting}
            className="gap-2 rounded-xl bg-brand-yellow font-bold text-brand-blue-dark shadow-lg shadow-brand-yellow/25 hover:bg-brand-yellow-dark disabled:opacity-50"
            size="lg"
            id="preview-submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("pitch_builder.submitting")}
              </>
            ) : (
              <>
                <Send className="size-4" />
                {t("pitch_builder.submit")}
              </>
            )}
          </Button>
        </div>

        {/* Pitch Deck Preview */}
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-lg">
          {/* Cover slide */}
          <div className="bg-gradient-to-br from-brand-blue to-brand-blue-dark px-8 py-12 text-center text-white">
            <p className="text-sm font-medium uppercase tracking-widest text-blue-200">
              Pitch Deck
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              {project.title}
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-brand-yellow" />
            <p className="mt-4 text-lg text-blue-100">{t("pitch_builder.by")} {user.name}</p>
          </div>

          {/* Slides */}
          <div className="divide-y divide-border/40">
            {SLIDE_KEYS.map((key, i) => {
              const def = getSlideDef(key, i);
              return (
              <div key={def.key} className="p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue/10 text-brand-blue">
                    <def.icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-dark">
                      {t("pitch_builder.slides")} {i + 1}
                    </p>
                    <h3 className="text-lg font-bold text-brand-blue">
                      {def.title}
                    </h3>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {slides[def.key] || (
                    <span className="italic text-muted-foreground/50">
                      -
                    </span>
                  )}
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    );
  }

  // ─── Builder (slide editor) ──────────────────────────────────────
  return (
    <div className="space-y-6">
      
      {/* Moved Header from page.tsx */}
      <div className="mb-8">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-4 gap-1.5 text-muted-foreground hover:text-brand-blue -ml-3"
        >
          <Link href={`/projects/${project.id}`}>
            <ArrowLeft className="size-4" />
            {t("pitch_builder.back_to")} {project.title}
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
            <Presentation className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-brand-blue sm:text-3xl">
              {t("pitch_builder.title")}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("pitch_builder.desc")} &ldquo;{project.title}&rdquo; {t("pitch_builder.by")} {project.owner_name}
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          {t("pitch_builder.intro")}
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-foreground">
            {filledCount} {t("pitch_builder.of")} {SLIDE_KEYS.length} {t("pitch_builder.completed")}
          </span>
          <button
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center gap-1.5 font-medium text-brand-blue transition-colors hover:text-brand-blue-dark"
            id="preview-toggle"
          >
            <Eye className="size-4" />
            {t("pitch_builder.preview")}
          </button>
        </div>
        <div className="flex gap-1.5">
          {SLIDE_KEYS.map((key, i) => (
            <button
              key={key}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 flex-1 rounded-full transition-all ${
                i === currentSlide
                  ? "bg-brand-blue"
                  : slides[key].trim()
                    ? "bg-brand-yellow"
                    : "bg-border"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slide tabs (Workshop Toolbar) */}
      <div className="flex gap-1.5 overflow-x-auto rounded-xl border border-brand-blue-dark/10 bg-white/60 p-1.5 backdrop-blur-md shadow-sm">
        {SLIDE_KEYS.map((key, i) => {
          const def = getSlideDef(key, i);
          const isActive = i === currentSlide;
          const isFilled = slides[def.key].trim().length > 0;
          return (
            <button
              key={def.key}
              onClick={() => setCurrentSlide(i)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all sm:text-sm ${
                isActive
                  ? "bg-white text-brand-blue shadow-sm"
                  : isFilled
                    ? "text-brand-blue/70 hover:bg-white/50"
                    : "text-muted-foreground hover:bg-white/50"
              }`}
              id={`tab-${def.key}`}
            >
              <def.icon className="size-3.5" />
              <span className="hidden sm:inline">{def.title}</span>
              {isFilled && (
                <CheckCircle className="size-3 text-emerald-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Slide Editor (The Canvas) */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-white p-6 shadow-2xl sm:p-10">
        {/* Decorative Top Bar */}
        <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-brand-yellow to-brand-blue" />
        {/* Slide header */}
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
            <currentDef.icon className="size-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow-dark">
              {t("pitch_builder.slide_of")} {currentSlide + 1} {t("pitch_builder.of")} {SLIDE_KEYS.length}
            </p>
            <h3 className="text-xl font-bold text-brand-blue">
              {currentDef.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {currentDef.subtitle}
            </p>
          </div>
        </div>

        {/* Editor */}
        <div className="space-y-2">
          <Label
            htmlFor={`slide-${currentDef.key}`}
            className="sr-only"
          >
            {currentDef.title}
          </Label>
          <Textarea
            id={`slide-${currentDef.key}`}
            value={slides[currentDef.key]}
            onChange={(e) => updateSlide(currentDef.key, e.target.value)}
            placeholder={currentDef.placeholder}
            rows={7}
            className="resize-none rounded-lg text-base leading-relaxed focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
          />
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 rounded-lg bg-brand-yellow/10 px-3 py-1.5 text-xs text-brand-blue-dark">
              <Star className="size-3 text-brand-yellow-dark" />
              {currentDef.tip}
            </p>
            <span className="text-xs text-muted-foreground">
              {slides[currentDef.key].length} {t("pitch_builder.chars")}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentSlide((p) => Math.max(0, p - 1))}
            disabled={currentSlide === 0}
            className="gap-1.5 rounded-lg"
            id="slide-prev"
          >
            <ChevronLeft className="size-4" />
            {t("pitch_builder.prev_btn")}
          </Button>

          {currentSlide < SLIDE_KEYS.length - 1 ? (
            <Button
              onClick={() =>
                setCurrentSlide((p) => Math.min(SLIDE_KEYS.length - 1, p + 1))
              }
              className="gap-1.5 rounded-lg bg-brand-blue text-white hover:bg-brand-blue-dark"
              id="slide-next"
            >
              {t("pitch_builder.next_btn")}
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button
              onClick={() => setShowPreview(true)}
              className="gap-1.5 rounded-lg bg-brand-yellow font-bold text-brand-blue-dark shadow-sm hover:bg-brand-yellow-dark"
              id="slide-preview"
            >
              <Eye className="size-4" />
              {t("pitch_builder.preview_submit_btn")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
