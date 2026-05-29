"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PitchProposalForm } from "@/components/project/PitchProposalForm";
import { DiscussionThread } from "@/components/project/DiscussionThread";
import { mockComments } from "@/types";
import type { ProjectVision } from "@/types";
import { useTranslation } from "@/lib/i18n-context";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  User,
  Layers,
  Presentation,
  MessageCircle,
} from "lucide-react";

interface Props {
  project: ProjectVision;
}

export function ProjectDetailClient({ project }: Props) {
  const { t } = useTranslation();

  const stageColor: Record<string, string> = {
    Idea: "bg-brand-yellow/15 text-brand-yellow-dark border-brand-yellow/30",
    Prototype: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    MVP: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Growth: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(project.created_at));

  return (
    <>
      {/* ──── Vision Detail (Editorial Dossier) ──── */}
      <article className="relative">
        {/* Cover Image / Hero Background */}
        <div className="absolute left-0 top-0 h-[60vh] w-full">
          {project.cover_image ? (
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full bg-brand-blue-dark" />
          )}
          {/* Gradient fade into background color */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#FDFDFD]" />
        </div>

        {/* Content Overlap */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-[20vh] sm:px-6 lg:px-8 lg:pt-[25vh]">
          
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-8 gap-1.5 text-white/90 hover:bg-white/20 hover:text-white"
            id="back-to-projects"
          >
            <Link href="/projects">
              <ArrowLeft className="size-4" />
              {t("detail.back")}
            </Link>
          </Button>

          <div className="rounded-t-3xl border border-border/40 bg-white p-8 shadow-2xl sm:p-12">

        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                stageColor[project.current_stage] ?? stageColor.Idea
              }`}
            >
              <Layers className="mr-1 size-3" />
              {project.current_stage}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="size-3" />
              {formattedDate}
            </span>
          </div>

          <h1 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight text-brand-blue sm:text-3xl lg:text-4xl">
            {project.title}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <User className="size-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {project.owner_name}
              </p>
              <p className="text-xs text-muted-foreground">{t("detail.visionary")}</p>
            </div>
          </div>

          <hr className="my-8 border-border/40" />

          <div>
            <h2 className="mb-4 text-lg font-bold text-brand-blue">
              {t("detail.the_vision")}
            </h2>
            <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed sm:prose-base">
              <p>{project.vision_story}</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-brand-blue/10 bg-brand-blue/[0.03] px-5 py-4">
            <h3 className="text-sm font-bold text-brand-blue">{t("detail.current_stage")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("detail.stage_desc_1")}{" "}
              <strong className="text-foreground">{project.current_stage}</strong>{" "}
              {t("detail.stage_desc_2")}
            </p>
          </div>
        </div>
          </div>
        </div>
      </article>

      {/* ──── Below Dossier Sections ──── */}
      <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* ──── Pitch Deck CTA ──── */}
      <section className="mt-10" aria-labelledby="pitch-deck-heading">
        <div className="relative overflow-hidden rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue/[0.04] via-white to-brand-yellow/[0.04] p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-yellow/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                <Presentation className="size-7" />
              </div>
              <div>
                <h2
                  id="pitch-deck-heading"
                  className="text-xl font-bold text-brand-blue"
                >
                  {t("detail.build_deck")}
                </h2>
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  {t("detail.build_deck_desc")}
                </p>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="shrink-0 gap-2 rounded-xl bg-brand-yellow font-bold text-brand-blue-dark shadow-lg shadow-brand-yellow/25 hover:bg-brand-yellow-dark hover:shadow-xl"
              id="cta-pitch-deck"
            >
              <Link href={`/projects/${project.id}/pitch`}>
                {t("detail.create_deck_btn")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ──── Discussion ──── */}
      <section className="mt-10" aria-labelledby="discussion-heading">
        <h2
          id="discussion-heading"
          className="mb-4 flex items-center gap-2 text-xl font-bold text-brand-blue"
        >
          <MessageCircle className="size-5" />
          {t("detail.discussion")}
          <span className="text-sm font-normal text-muted-foreground">
            ({mockComments.filter((c) => c.project_id === project.id).length})
          </span>
        </h2>
        <DiscussionThread
          projectId={project.id}
          initialComments={mockComments.filter(
            (c) => c.project_id === project.id
          )}
        />
      </section>

      {/* ──── Quick Pitch Form ──── */}
      <section className="mt-10" aria-labelledby="pitch-heading">
        <div className="mb-6">
          <h2
            id="pitch-heading"
            className="text-xl font-bold text-brand-blue"
          >
            {t("detail.quick_pitch")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("detail.quick_pitch_desc")}
          </p>
        </div>
        <PitchProposalForm projectId={project.id} />
      </section>
      </div>
    </>
  );
}
