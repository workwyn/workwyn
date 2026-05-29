"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ProjectVisionCard } from "@/components/project/ProjectVisionCard";
import { QuickIdeaInput } from "@/components/project/QuickIdeaInput";
import { Search, Lightbulb, X, Filter } from "lucide-react";
import { PROJECT_TAGS } from "@/types";
import type { ProjectVision } from "@/types";
import { useTranslation } from "@/lib/i18n-context";

const STAGES = ["All", "Idea", "Prototype", "MVP", "Growth"] as const;

interface ProjectFeedProps {
  projects: ProjectVision[];
}

export function ProjectFeed({ projects }: ProjectFeedProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [activeStage, setActiveStage] = useState<string>("All");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [localProjects, setLocalProjects] = useState<ProjectVision[]>(projects);

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const filtered = useMemo(() => {
    let result = localProjects;

    // Stage filter
    if (activeStage !== "All") {
      result = result.filter((p) => p.current_stage === activeStage);
    }

    // Tag filter (match ANY selected tag)
    if (activeTags.length > 0) {
      result = result.filter((p) =>
        p.tags?.some((t) => activeTags.includes(t))
      );
    }

    // Text search (title, owner, story)
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.owner_name.toLowerCase().includes(q) ||
          p.vision_story.toLowerCase().includes(q)
      );
    }

    return result;
  }, [localProjects, query, activeStage, activeTags]);

  const hasActiveFilters =
    query.trim() !== "" || activeStage !== "All" || activeTags.length > 0;

  function clearAll() {
    setQuery("");
    setActiveStage("All");
    setActiveTags([]);
  }

  function handleDropIdea(idea: string) {
    const newIdea: ProjectVision = {
      id: `quick-${Date.now()}`,
      owner_name: "You",
      title: idea,
      vision_story: "นี่คือไอเดียด่วนที่คุณเพิ่งแปะไว้...",
      current_stage: "Idea",
      tags: [],
      created_at: new Date().toISOString()
    };
    setLocalProjects(prev => [newIdea, ...prev]);
  }

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* ═══════ Left Sidebar — Filters ═══════ */}
      <aside className="w-full shrink-0 lg:w-64 xl:w-72">
        <div className="sticky top-24 space-y-6 rounded-2xl border-2 border-border bg-white p-5 shadow-[4px_4px_0_0_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-2">
            <Filter className="size-5 text-brand-blue" />
            <h2 className="text-base font-bold text-brand-blue">
              {t("feed_ui.filter_title")}
            </h2>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-foreground">
              {t("feed_ui.search_label")}
            </Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" />
              <Input
                id="project-search"
                type="search"
                placeholder={t("feed_ui.search_placeholder")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-10 rounded-lg border-border/60 bg-background pl-9 pr-8 text-sm transition-all focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Stage */}
          <div className="space-y-2.5">
            <Label className="text-sm font-semibold text-foreground">
              {t("feed_ui.stage_label")}
            </Label>
            <div className="space-y-1">
              {STAGES.map((stage) => {
                const isActive = activeStage === stage;
                return (
                  <button
                    key={stage}
                    id={`filter-${stage.toLowerCase()}`}
                    onClick={() => setActiveStage(stage)}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-brand-blue text-white shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isActive ? "bg-white" : "bg-border"
                      }`}
                    />
                    {stage === "All" ? t("feed_ui.all_stages") : stage}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2.5">
            <Label className="text-sm font-semibold text-foreground">
              {t("feed_ui.tag_label")}
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {PROJECT_TAGS.map((tag) => {
                const isActive = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                      isActive
                        ? "border-brand-yellow bg-brand-yellow/20 text-brand-blue-dark"
                        : "border-border/60 text-muted-foreground hover:border-brand-yellow/40 hover:text-brand-yellow-dark"
                    }`}
                    id={`tag-${tag.toLowerCase()}`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="w-full gap-1.5 rounded-lg border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              id="filter-clear"
            >
              <X className="size-3.5" />
              {t("feed_ui.clear_all")}
            </Button>
          )}
        </div>
      </aside>

      {/* ═══════ Right Content — Results ═══════ */}
      <div className="flex-1 space-y-6 rounded-3xl bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] p-2 sm:p-6">
        
        {/* Quick Idea */}
        <QuickIdeaInput onDrop={handleDropIdea} />
        {/* Result count */}
        <p className="text-sm text-muted-foreground">
          {t("feed_ui.found")}{" "}
          <strong className="text-foreground">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? t("feed_ui.project") : t("feed_ui.projects")}
          {activeStage !== "All" && (
            <>
              {" "}
              {t("feed_ui.in")}{" "}
              <span className="font-semibold text-brand-blue">
                {activeStage}
              </span>
            </>
          )}
          {activeTags.length > 0 && (
            <>
              {" "}
              {t("feed_ui.tagged")}{" "}
              <span className="font-semibold">
                {activeTags.join(", ")}
              </span>
            </>
          )}
        </p>

        {/* Project Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
            {filtered.map((project) => (
              <ProjectVisionCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-muted/20 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/50">
              <Lightbulb className="size-6 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {t("feed_ui.empty_title")}
            </h3>
            <p className="max-w-sm text-sm text-muted-foreground">
              {t("feed_ui.empty_desc")}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 rounded-full"
              onClick={clearAll}
              id="empty-clear-filters"
            >
              {t("feed_ui.clear_filters")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
