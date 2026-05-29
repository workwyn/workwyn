"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useBookmarks } from "@/lib/bookmarks-context";
import { Clock, User, Sparkles } from "lucide-react";
import type { ProjectVision } from "@/types";
import { useTranslation } from "@/lib/i18n-context";

interface ProjectVisionCardProps {
  project: ProjectVision;
}

const COLORS = [
  "bg-yellow-100",
  "bg-pink-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-purple-100",
];

const ROTATIONS = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "rotate-0"
];

export function ProjectVisionCard({ project }: ProjectVisionCardProps) {
  const { toggle, isBookmarked } = useBookmarks();
  const { t } = useTranslation();
  const saved = isBookmarked(project.id);

  // Deterministic random styling based on ID
  const hash = project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const bgColor = COLORS[hash % COLORS.length];
  const rotation = ROTATIONS[hash % ROTATIONS.length];

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(project.created_at));

  return (
    <article
      className={`group relative flex flex-col overflow-visible rounded-sm ${bgColor} ${rotation} p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-rotate-1 hover:z-10`}
      id={`project-card-${project.id}`}
    >
      {/* Tape */}
      <div className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-3 bg-white/40 shadow-sm backdrop-blur-sm border border-white/20 z-10 mix-blend-overlay" />
      
      {/* Reaction Sticker (Bookmark equivalent) */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(project.id);
        }}
        className={`absolute -right-3 -top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95 ${
          saved
            ? "bg-brand-yellow text-brand-blue-dark rotate-12 scale-110"
            : "bg-white text-muted-foreground hover:text-brand-blue"
        }`}
        aria-label={saved ? "Remove reaction" : "React"}
      >
        <Sparkles className={`size-5 ${saved ? "fill-brand-blue-dark" : ""}`} />
      </button>

      {/* Cover Image as Polaroid */}
      {project.cover_image && (
        <div className="relative mb-4 w-full bg-white p-2 pb-6 shadow-sm rotate-1 hover:rotate-0 transition-transform">
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <Image
              src={project.cover_image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>
      )}

      {/* Header Info */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge
            variant="outline"
            className="rounded border-black/10 bg-white/40 px-2 py-0.5 text-[10px] font-bold text-black/70 uppercase tracking-wider shadow-sm"
          >
            {project.current_stage}
          </Badge>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-black/50">
          <Clock className="size-3" />
          {formattedDate}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold leading-snug text-black/90 decoration-2 underline-offset-4 group-hover:underline">
        <Link href={`/projects/${project.id}`} className="after:absolute after:inset-0">
          {project.title}
        </Link>
      </h3>

      {/* Story excerpt */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-black/70 line-clamp-4 font-medium">
        {project.vision_story}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black/5 text-black/60">
            <User className="size-3" />
          </div>
          <span className="text-xs font-bold text-black/70">
            {project.owner_name}
          </span>
        </div>
        
        {/* Decorative elements */}
        <div className="flex gap-1">
          {project.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] font-bold text-black/40 uppercase">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
