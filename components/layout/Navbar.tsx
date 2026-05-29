"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useNotifications } from "@/lib/notifications-context";
import { useTranslation } from "@/lib/i18n-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Lightbulb, LogOut, User, Menu, X, Bell, Check, Presentation, MessageSquare, ChevronDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const { count, notifications, clearAll } = useNotifications();
  const { t, locale, setLocale } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const fmt = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-80"
          id="navbar-logo"
        >
          <Image
            src="/images/Untitled-5_Workwyn-logo-long.png"
            alt="Workwyn Logo"
            width={120}
            height={36}
            className="h-8 w-auto sm:h-9 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 sm:flex sm:gap-2">
          <Link
            href="/projects"
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
            id="nav-explore"
          >
            {t("nav.explore")}
          </Link>
          <Link
            href="/blog"
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
            id="nav-blog"
          >
            {t("nav.blog")}
          </Link>

          {/* Language Switcher */}
          <button
            onClick={() => setLocale(locale === "en" ? "th" : "en")}
            className="mr-2 ml-1 flex h-8 w-12 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground transition-colors hover:bg-brand-blue/10 hover:text-brand-blue"
            aria-label="Toggle language"
          >
            {locale.toUpperCase()}
          </button>



          {isLoading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
          ) : user ? (
            <>
              {/* User Menu Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="relative flex h-9 items-center gap-2 rounded-lg border border-border/60 bg-background px-3 transition-all hover:border-brand-blue/30 hover:bg-brand-blue/5"
                    id="nav-user-menu"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                      <User className="size-3" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {user.name}
                    </span>
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 p-1.5 shadow-lg">
                  <div className="mb-1 border-b border-border/60 px-3 py-2">
                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Link
                    href="/projects/new"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-brand-yellow/20 hover:text-brand-blue-dark"
                    id="nav-cta"
                  >
                    <Lightbulb className="size-4 text-brand-yellow-dark" />
                    {t("nav.post_vision")}
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    id="nav-dashboard"
                  >
                    <User className="size-4 text-muted-foreground" />
                    {t("nav.dashboard")}
                  </Link>
                  <div className="my-1 border-t border-border/60" />
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    id="nav-logout"
                  >
                    <LogOut className="size-4" />
                    {t("nav.sign_out")}
                  </button>
                </PopoverContent>
              </Popover>

              {/* Notifications Popover */}
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                    <Bell className="size-4.5" />
                    {count > 0 && (
                      <span className="absolute 1 top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-sm ring-2 ring-background">
                        {count > 9 ? "9+" : count}
                      </span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 p-0 shadow-lg">
                  <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                    <span className="font-semibold text-foreground">
                      {t("nav.notifications")}
                    </span>
                    {count > 0 && (
                      <button
                        onClick={clearAll}
                        className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-brand-blue transition-colors"
                      >
                        <Check className="size-3" />
                        {t("nav.mark_all_read")}
                      </button>
                    )}
                  </div>
                  <div className="flex max-h-[300px] flex-col overflow-y-auto py-1">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <Link
                          key={n.id}
                          href={n.link}
                          onClick={() => setPopoverOpen(false)}
                          className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
                        >
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                            {n.type === "deck" ? (
                              <Presentation className="size-4" />
                            ) : (
                              <MessageSquare className="size-4" />
                            )}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-medium text-foreground leading-tight">
                              {n.title}
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {n.description}
                            </p>
                            <span className="text-[10px] text-muted-foreground/60 mt-1">
                              {fmt(n.time)}
                            </span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                        {t("nav.no_notifications")}
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                id="nav-login"
              >
                {t("nav.sign_in")}
              </Link>
              <Button
                asChild
                className="bg-brand-yellow text-brand-blue-dark font-semibold hover:bg-brand-yellow-dark shadow-sm shadow-brand-yellow/20 transition-all hover:shadow-md hover:shadow-brand-yellow/30"
                size="lg"
              >
                <Link href="/login" id="nav-cta">
                  {t("nav.post_vision")}
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile: hamburger */}
        <div className="flex items-center gap-1 sm:hidden">
          {user && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70"
            >
              <Bell className="size-5" />
              {count > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-0.5 text-[9px] font-bold text-white ring-2 ring-background">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground/70 transition-colors hover:bg-muted"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="animate-in slide-in-from-top-2 border-t border-border/60 bg-background px-4 pb-5 pt-3 sm:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/projects"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
            >
              {t("nav.explore")}
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
            >
              {t("nav.blog")}
            </Link>

            {isLoading ? null : user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                >
                  <User className="size-4" />
                  {user.name} — {t("nav.dashboard")}
                </Link>

                {/* Mobile notifications inline */}
                {notifications.length > 0 && (
                  <div className="mt-2 rounded-xl bg-muted/30 p-2 border border-border/60">
                    <div className="mb-2 flex items-center justify-between px-2">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {t("nav.notifications")} ({count})
                      </span>
                      <button
                        onClick={clearAll}
                        className="text-xs text-brand-blue font-medium"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex max-h-48 flex-col overflow-y-auto space-y-1">
                      {notifications.map((n) => (
                        <Link
                          key={n.id}
                          href={n.link}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-start gap-2 rounded-lg bg-background p-2 shadow-sm border border-border/40"
                        >
                          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                            {n.type === "deck" ? (
                              <Presentation className="size-3" />
                            ) : (
                              <MessageSquare className="size-3" />
                            )}
                          </div>
                          <div className="flex flex-col gap-0.5 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">
                              {n.title}
                            </p>
                            <p className="text-[10px] text-muted-foreground line-clamp-1">
                              {n.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                <Link
                  href="/projects/new"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 flex items-center justify-center rounded-xl bg-brand-yellow px-4 py-2.5 text-sm font-bold text-brand-blue-dark shadow-sm hover:bg-brand-yellow-dark"
                >
                  {t("nav.post_vision")}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="size-4" />
                  {t("nav.sign_out")}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
                >
                  {t("nav.sign_in")}
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 flex items-center justify-center rounded-xl bg-brand-yellow px-4 py-2.5 text-sm font-bold text-brand-blue-dark shadow-sm hover:bg-brand-yellow-dark"
                >
                  {t("nav.post_vision")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
