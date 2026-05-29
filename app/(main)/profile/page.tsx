"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import { useBookmarks } from "@/lib/bookmarks-context";
import {
  mockPitches,
  mockPitchDecks,
  mockProjectVisions,
} from "@/types";
import {
  User,
  Mail,
  Edit3,
  Save,
  X,
  MessageSquare,
  Presentation,
  Bookmark,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Lock,
} from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const { bookmarks } = useBookmarks();
  const { t } = useTranslation();

  const statusBadge = {
    pending: {
      label: t("profile.status_pending"),
      class: "bg-amber-50 text-amber-700",
      icon: Clock,
    },
    accepted: {
      label: t("profile.status_accepted"),
      class:
        "bg-emerald-50 text-emerald-700",
      icon: CheckCircle,
    },
    declined: {
      label: t("profile.status_declined"),
      class: "bg-red-50 text-red-700",
      icon: XCircle,
    },
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [bio, setBio] = useState("Passionate builder and collaborator.");

  function startEdit() {
    setEditName(user?.name ?? "");
    setEditBio(bio);
    setIsEditing(true);
  }

  function saveEdit() {
    if (editBio.trim()) setBio(editBio.trim());
    setIsEditing(false);
  }

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
          {t("profile.sign_in_title")}
        </h1>
        <Button
          asChild
          size="lg"
          className="mt-6 gap-2 rounded-xl bg-brand-yellow px-8 font-bold text-brand-blue-dark hover:bg-brand-yellow-dark"
        >
          <Link href="/login">
            {t("profile.sign_in_btn")} <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    );
  }

  // For demo: show all pitches as if the logged-in user sent them
  const myQuickPitches = mockPitches;
  const myPitchDecks = mockPitchDecks;
  const savedProjects = mockProjectVisions.filter((p) =>
    bookmarks.includes(p.id)
  );

  const fmt = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Profile Card */}
      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          {/* Avatar + Info */}
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
              <User className="size-8" />
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="edit-name" className="text-xs text-muted-foreground">
                      {t("profile.name_label")}
                    </Label>
                    <Input
                      id="edit-name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-9 rounded-lg"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="edit-bio" className="text-xs text-muted-foreground">
                      {t("profile.bio_label")}
                    </Label>
                    <Textarea
                      id="edit-bio"
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      rows={2}
                      className="resize-none rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={saveEdit}
                      className="gap-1 rounded-lg bg-brand-blue text-white hover:bg-brand-blue-dark"
                    >
                      <Save className="size-3" />
                      {t("profile.save_btn")}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="gap-1 rounded-lg"
                    >
                      <X className="size-3" />
                      {t("profile.cancel_btn")}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-foreground">
                    {user.name}
                  </h1>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Mail className="size-3.5" />
                    {user.email}
                  </p>
                  <p className="mt-2 text-sm text-foreground/80">{bio}</p>
                </>
              )}
            </div>
          </div>

          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={startEdit}
              className="gap-1.5 rounded-lg"
              id="edit-profile"
            >
              <Edit3 className="size-3.5" />
              {t("profile.edit_btn")}
            </Button>
          )}
        </div>
      </div>

      {/* Saved Projects */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-brand-blue">
          <Bookmark className="size-5" />
          {t("profile.saved_projects")}
          <Badge variant="outline" className="ml-1 rounded-full text-xs">
            {savedProjects.length}
          </Badge>
        </h2>
        {savedProjects.length > 0 ? (
          <div className="space-y-3">
            {savedProjects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-card p-4 transition-all hover:border-brand-blue/20 hover:shadow-sm"
              >
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-brand-blue">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t("profile.by")} {p.owner_name} · {p.current_stage}
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-brand-blue" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-muted/20 px-4 py-8 text-center">
            <Bookmark className="mx-auto size-8 text-muted-foreground/40" />
            <p className="mt-2 text-sm text-muted-foreground">
              {t("profile.no_saved_projects")}
            </p>
          </div>
        )}
      </section>

      {/* My Pitches */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-brand-blue">
          <MessageSquare className="size-5" />
          {t("profile.my_pitches")}
          <Badge variant="outline" className="ml-1 rounded-full text-xs">
            {myQuickPitches.length + myPitchDecks.length}
          </Badge>
        </h2>
        <div className="space-y-3">
          {/* Quick pitches */}
          {myQuickPitches.map((pitch) => {
            const s = statusBadge[pitch.status];
            const SIcon = s.icon;
            const project = mockProjectVisions.find(
              (p) => p.id === pitch.project_id
            );
            return (
              <div
                key={pitch.id}
                className="rounded-xl border border-border/60 bg-card p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="size-3.5 text-brand-blue" />
                      <span className="text-sm font-semibold text-foreground">
                        {pitch.proposed_role}
                      </span>
                    </div>
                    {project && (
                      <Link
                        href={`/projects/${project.id}`}
                        className="mt-1 block text-xs text-brand-blue hover:underline"
                      >
                        {project.title}
                      </Link>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.class}`}
                  >
                    <SIcon className="size-2.5" />
                    {s.label}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                  {pitch.pitch_message}
                </p>
                <p className="mt-2 text-[10px] text-muted-foreground/60">
                  {fmt(pitch.created_at)}
                </p>
              </div>
            );
          })}

          {/* Pitch decks */}
          {myPitchDecks.map((deck) => {
            const s = statusBadge[deck.status];
            const SIcon = s.icon;
            const project = mockProjectVisions.find(
              (p) => p.id === deck.project_id
            );
            return (
              <div
                key={deck.id}
                className="rounded-xl border border-border/60 bg-card p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Presentation className="size-3.5 text-purple-600" />
                      <span className="text-sm font-semibold text-foreground">
                        {deck.slides.proposed_role.split("—")[0].trim()}
                      </span>
                      <Badge className="rounded-full bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0">
                        {t("profile.deck")}
                      </Badge>
                    </div>
                    {project && (
                      <Link
                        href={`/projects/${project.id}`}
                        className="mt-1 block text-xs text-brand-blue hover:underline"
                      >
                        {project.title}
                      </Link>
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${s.class}`}
                  >
                    <SIcon className="size-2.5" />
                    {s.label}
                  </span>
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground/60">
                  {fmt(deck.created_at)}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
