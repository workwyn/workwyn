"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n-context";
import { useBookmarks } from "@/lib/bookmarks-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  mockProjectVisions,
  mockPitches,
  mockPitchDecks,
} from "@/types";
import {
  LayoutDashboard,
  Lightbulb,
  Users,
  Presentation,
  ArrowRight,
  Loader2,
  Lock,
  MessageSquare,
  Eye,
  User,
  Mail,
  Edit3,
  Save,
  X,
  Bookmark,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { bookmarks } = useBookmarks();
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [bio, setBio] = useState("Passionate builder and collaborator.");

  const statusBadge = {
    pending: {
      label: t("profile.status_pending"),
      class: "bg-amber-50 text-amber-700",
      icon: Clock,
    },
    accepted: {
      label: t("profile.status_accepted"),
      class: "bg-emerald-50 text-emerald-700",
      icon: CheckCircle,
    },
    declined: {
      label: t("profile.status_declined"),
      class: "bg-red-50 text-red-700",
      icon: XCircle,
    },
  };

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
        <h1 className="text-2xl font-bold text-brand-blue sm:text-3xl">
          {t("dashboard.sign_in_title")}
        </h1>
        <p className="mt-3 max-w-sm text-base text-muted-foreground">
          {t("dashboard.sign_in_desc")}
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 gap-2 rounded-xl bg-brand-yellow px-8 font-bold text-brand-blue-dark hover:bg-brand-yellow-dark"
        >
          <Link href="/login">
            {t("dashboard.sign_in_btn")} <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    );
  }

  const myProjects = mockProjectVisions;
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
    <div className="min-h-screen bg-slate-50/50">
      {/* ─── Command Center Header (Dark Mode) ──────────────────── */}
      <div className="bg-brand-blue-dark pb-32 pt-10 text-white sm:pt-16 relative overflow-hidden">
        {/* Subtle grid pattern for the tech/command center feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow text-brand-blue-dark shadow-sm">
              <LayoutDashboard className="size-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {t("dashboard.title")}
              </h1>
              <p className="mt-1 text-sm text-blue-100">
                {t("dashboard.welcome")}, <strong className="text-brand-yellow">{user.name}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ────────────────────────────────────────── */}
      <div className="relative -mt-20 mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        
        {/* ─── Profile Card ─────────────────────────────────────────── */}
        <div className="mb-10 rounded-2xl border border-border/60 bg-card p-6 shadow-xl sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
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
                  <h2 className="text-2xl font-bold text-foreground">
                    {user.name}
                  </h2>
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

      {/* ─── Stats ────────────────────────────────────────────────── */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            label: t("dashboard.stat_projects"),
            value: myProjects.length,
            icon: Lightbulb,
            color: "bg-brand-blue/10 text-brand-blue",
          },
          {
            label: t("dashboard.stat_pitches"),
            value: mockPitches.length + mockPitchDecks.length,
            icon: Users,
            color: "bg-brand-yellow/15 text-brand-yellow-dark",
          },
          {
            label: t("dashboard.stat_decks"),
            value: mockPitchDecks.length,
            icon: Presentation,
            color: "bg-purple-50 text-purple-600",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-2xl border border-border/60 bg-white p-5 shadow-sm"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
            >
              <stat.icon className="size-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── My Projects ──────────────────────────────────────────── */}
      <h2 className="mb-6 text-xl font-bold text-brand-blue">{t("dashboard.your_projects")}</h2>
      <div className="space-y-4">
        {myProjects.map((project) => {
          const pitchCount = mockPitches.filter(
            (p) => p.project_id === project.id
          ).length;
          const deckCount = mockPitchDecks.filter(
            (d) => d.project_id === project.id
          ).length;
          const pendingCount =
            mockPitches.filter(
              (p) => p.project_id === project.id && p.status === "pending"
            ).length +
            mockPitchDecks.filter(
              (d) => d.project_id === project.id && d.status === "pending"
            ).length;

          return (
            <Link
              key={project.id}
              href={`/dashboard/${project.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition-all duration-200 hover:border-brand-blue/20 hover:shadow-md sm:flex-row"
              id={`dash-project-${project.id}`}
            >
              {project.cover_image && (
                <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48">
                  <Image
                    src={project.cover_image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 192px"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-full text-xs font-semibold"
                    >
                      {project.current_stage}
                    </Badge>
                    {pendingCount > 0 && (
                      <Badge className="rounded-full bg-brand-yellow text-brand-blue-dark text-xs font-bold shadow-sm">
                        {pendingCount} {t("dashboard.new")}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-brand-blue">
                    {project.title}
                  </h3>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="size-3.5" />
                      {pitchCount} {t("dashboard.pitches")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Presentation className="size-3.5" />
                      {deckCount} {t("dashboard.decks")}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium text-brand-blue opacity-0 transition-opacity group-hover:opacity-100">
                    <Eye className="size-3.5" />
                    {t("dashboard.view_pitches")}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ─── Saved Projects ───────────────────────────────────────── */}
      <section className="mt-12">
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

      {/* ─── My Pitches ───────────────────────────────────────────── */}
      <section className="mt-12">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-brand-blue">
          <MessageSquare className="size-5" />
          {t("profile.my_pitches")}
          <Badge variant="outline" className="ml-1 rounded-full text-xs">
            {myQuickPitches.length + myPitchDecks.length}
          </Badge>
        </h2>
        <div className="space-y-3">
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
    </div>
  );
}
