"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { useChat } from "@/lib/chat-context";
import {
  mockProjectVisions,
  mockPitches,
  mockPitchDecks,
} from "@/types";
import type { ContributionPitch, PitchDeck } from "@/types";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  User,
  Briefcase,
  FolderOpen,
  Rocket,
  Star,
  MessageSquare,
  Presentation,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Lock,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

type PitchItem = 
  | { type: "deck"; data: PitchDeck }
  | { type: "quick"; data: ContributionPitch };

const SLIDE_DEFS = [
  { key: "about_me" as const, title: "About Me", icon: User },
  { key: "proposed_role" as const, title: "Proposed Role", icon: Briefcase },
  { key: "relevant_experience" as const, title: "Experience & Portfolio", icon: FolderOpen },
  { key: "action_plan" as const, title: "30-Day Action Plan", icon: Rocket },
  { key: "why_me" as const, title: "Why Me", icon: Star },
] as const;

export default function ProjectPitchesPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isLoading } = useAuth();
  const { openChat } = useChat();
  const [filter, setFilter] = useState<"all" | "quick" | "deck">("all");
  const [expandedDeck, setExpandedDeck] = useState<string | null>(null);
  
  const [statusUpdates, setStatusUpdates] = useState<Record<string, string>>({});

  function setItemStatus(itemId: string, status: string) {
    setStatusUpdates((prev) => ({ ...prev, [itemId]: status }));
  }

  function getStatus(item: PitchItem) {
    return statusUpdates[item.data.id] || item.data.status;
  }

  const project = mockProjectVisions.find((p) => p.id === id);
  const pitches = mockPitches.filter((p) => p.project_id === id);
  const decks = mockPitchDecks.filter((d) => d.project_id === id);

  const allItems: PitchItem[] = useMemo(() => {
    const items: PitchItem[] = [];
    if (filter === "all" || filter === "deck") {
      decks.forEach((d) => items.push({ type: "deck", data: d }));
    }
    if (filter === "all" || filter === "quick") {
      pitches.forEach((p) => items.push({ type: "quick", data: p }));
    }
    return items.sort(
      (a, b) =>
        new Date(b.data.created_at).getTime() -
        new Date(a.data.created_at).getTime()
    );
  }, [pitches, decks, filter]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-brand-blue/40" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-blue/10">
          <Lock className="size-10 text-brand-blue" />
        </div>
        <h1 className="text-2xl font-bold text-brand-blue">
          Sign in to View Pitches
        </h1>
        <Button
          asChild
          size="lg"
          className="mt-6 gap-2 rounded-xl bg-brand-yellow px-8 font-bold text-brand-blue-dark hover:bg-brand-yellow-dark"
        >
          <Link href="/login">
            Sign In <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Project not found
        </h1>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const fmt = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));

  function renderActionButtons(item: PitchItem) {
    const currentStatus = getStatus(item);

    if (currentStatus === "accepted") {
      return (
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle className="size-3" />
            Accepted
          </span>
          <button
            onClick={() => setItemStatus(item.data.id, "pending")}
            className="text-xs font-medium text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
          >
            Undo
          </button>
        </div>
      );
    }

    if (currentStatus === "declined") {
      return (
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            <XCircle className="size-3" />
            Declined
          </span>
          <button
            onClick={() => setItemStatus(item.data.id, "pending")}
            className="text-xs font-medium text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
          >
            Undo
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => setItemStatus(item.data.id, "accepted")}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-600 transition-colors hover:bg-emerald-50"
          id={`accept-${item.data.id}`}
        >
          <ThumbsUp className="size-3.5" />
          Accept
        </button>
        <button
          onClick={() => setItemStatus(item.data.id, "declined")}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
          id={`decline-${item.data.id}`}
        >
          <ThumbsDown className="size-3.5" />
          Decline
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-brand-blue-dark pb-20">
      {/* Header section with brand blue */}
      <div className="bg-brand-blue-dark pb-24 pt-10 text-white sm:pt-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-6 gap-1.5 text-blue-200 hover:bg-white/10 hover:text-white"
            id="back-to-dash"
          >
            <Link href="/dashboard">
              <ArrowLeft className="size-4" />
              Back to Dashboard
            </Link>
          </Button>

          {/* Header text */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {project.title}
            </h1>
            <p className="mt-2 text-sm text-blue-200">
              {pitches.length} quick pitches · {decks.length} pitch decks ·{" "}
              {pitches.length + decks.length} total
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="mb-6 flex items-center gap-2">
        {(
          [
            { key: "all", label: "All", count: pitches.length + decks.length },
            { key: "deck", label: "Pitch Decks", count: decks.length },
            { key: "quick", label: "Quick Pitches", count: pitches.length },
          ] as const
        ).map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              filter === f.key
                ? "bg-brand-yellow text-brand-blue-dark shadow-sm font-bold"
                : "bg-white text-muted-foreground hover:bg-slate-50 border border-border/60"
            }`}
            id={`filter-${f.key}`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Pitch list */}
      {allItems.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-border/60 bg-white py-16 text-center shadow-sm">
          <MessageSquare className="size-10 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-brand-blue-dark">
            No pitches yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Share your project to start receiving pitches from talented people.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {allItems.map((item) => {
            if (item.type === "quick") {
              const pitch = item.data as ContributionPitch;
              return (
                <div
                  key={pitch.id}
                  className="group flex gap-4 rounded-2xl border border-border/60 bg-white p-5 transition-all hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/5"
                  id={`pitch-${pitch.id}`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-sm font-bold uppercase text-brand-blue">
                    {pitch.talent_name.charAt(0)}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <h3 className="font-semibold text-brand-blue-dark">
                            {pitch.talent_name}
                          </h3>
                          <span className="hidden text-xs text-muted-foreground sm:inline-block">•</span>
                          <span className="text-xs text-muted-foreground">
                            {pitch.proposed_role}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {fmt(pitch.created_at)}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Badge variant="secondary" className="hidden border-none bg-slate-100 text-[10px] font-semibold uppercase tracking-wider text-slate-600 shadow-none sm:inline-flex">
                          Quick Pitch
                        </Badge>
                        <button
                          onClick={() => openChat(pitch.talent_name, pitch.talent_name)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-white px-3 py-1.5 text-xs font-semibold text-brand-blue transition-all hover:bg-brand-blue hover:text-white"
                        >
                          <MessageCircle className="size-3.5" />
                          Chat
                        </button>
                      </div>
                    </div>
                    
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      {pitch.pitch_message}
                    </p>
                  </div>
                </div>
              );
            }

            // Pitch Deck
            const deck = item.data as PitchDeck;
            const isExpanded = expandedDeck === deck.id;

            return (
              <div
                key={deck.id}
                className={`group flex gap-4 rounded-2xl border bg-white p-5 transition-all ${
                  isExpanded ? "border-brand-blue shadow-md shadow-brand-blue/10" : "border-border/60 hover:border-brand-blue/30 hover:shadow-lg hover:shadow-brand-blue/5"
                }`}
                id={`deck-${deck.id}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold uppercase text-purple-700 ring-1 ring-purple-200">
                  {deck.author_name.charAt(0)}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex w-full items-start justify-between gap-4">
                    <div
                      onClick={() => setExpandedDeck(isExpanded ? null : deck.id)}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <h3 className="font-semibold text-brand-blue-dark">
                          {deck.author_name}
                        </h3>
                        <span className="hidden text-xs text-muted-foreground sm:inline-block">•</span>
                        <span className="text-xs text-muted-foreground">
                          {deck.slides.proposed_role.split("—")[0].trim()}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {fmt(deck.created_at)}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <Badge variant="secondary" className="hidden border-none bg-purple-100 text-[10px] font-semibold uppercase tracking-wider text-purple-700 shadow-none hover:bg-purple-200 sm:inline-flex">
                        Pitch Deck
                      </Badge>
                      <button 
                        onClick={() => openChat(deck.author_name, deck.author_name)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-white px-3 py-1.5 text-xs font-semibold text-brand-blue transition-all hover:bg-brand-blue hover:text-white"
                      >
                        <MessageCircle className="size-3.5" />
                        Chat
                      </button>
                      <button 
                        onClick={() => setExpandedDeck(isExpanded ? null : deck.id)}
                        className="p-1 text-muted-foreground transition-colors hover:text-brand-blue"
                      >
                        {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-5 border-t border-border/60 pt-5">
                      <div className="space-y-6">
                        {SLIDE_DEFS.map((def, i) => (
                          <div key={def.key}>
                            <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-blue">
                              {i + 1}. {def.title}
                            </h4>
                            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                              {deck.slides[def.key]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}
