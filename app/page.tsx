"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectFeed } from "@/components/project/ProjectFeed";
import { mockProjectVisions } from "@/types";
import {
  ArrowRight,
  Lightbulb,
  Users,
  Handshake,
  Sparkles,
  BookOpen,
  Clock,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n-context";

const HOMEPAGE_ARTICLES = [
  {
    id: "how-to-find-cofounder",
    image: "/images/projects/brand-spark.png",
    category: "Startup",
    readTime: 5,
    titleKey: "blog.art1_title",
    descKey: "blog.art1_desc",
  },
  {
    id: "pitch-deck-101",
    image: "/images/projects/eco-tracker.png",
    category: "Guide",
    readTime: 8,
    titleKey: "blog.art2_title",
    descKey: "blog.art2_desc",
  },
  {
    id: "idea-validation",
    image: "/images/projects/skill-swap.png",
    category: "Strategy",
    readTime: 6,
    titleKey: "blog.art3_title",
    descKey: "blog.art3_desc",
  },
];

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* ──── Hero Banner ──── */}
        <section>
          <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-brand-yellow px-6 py-12 text-center shadow-xl sm:px-12 sm:py-14">
              {/* Semicircle rings — left */}
              <div className="pointer-events-none absolute -left-20 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full border-[5px] border-brand-blue/15" />
              <div className="pointer-events-none absolute -left-10 top-1/2 h-28 w-28 -translate-y-2/3 rounded-full border-[4px] border-brand-blue/10" />

              {/* Semicircle rings — right */}
              <div className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 translate-y-1/4 rounded-full border-[5px] border-brand-blue/15" />
              <div className="pointer-events-none absolute -right-6 bottom-0 h-24 w-24 translate-y-1/3 rounded-full border-[4px] border-brand-blue/10" />

              {/* White stars */}
              <div className="pointer-events-none absolute left-[10%] top-5 text-lg text-white/50 select-none">✦</div>
              <div className="pointer-events-none absolute right-[12%] bottom-5 text-xl text-white/45 select-none">✦</div>

              <div className="relative">
                {/* Tagline pill */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-blue px-4 py-1.5 text-sm font-bold text-white shadow-lg shadow-brand-blue/30">
                  <Sparkles className="size-4" />
                  {t("hero.tagline")}
                </div>

                <h1 className="mx-auto max-w-2xl text-2xl font-extrabold leading-tight tracking-tight text-brand-blue sm:text-3xl lg:text-4xl">
                  {t("hero.title")}{" "}
                  <span className="text-brand-blue-dark/80">
                    {t("hero.title_highlight")}
                  </span>
                </h1>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-brand-blue-dark/60 sm:text-base">
                  {t("hero.description")}{" "}
                  <Link
                    href="#how-it-works"
                    className="font-semibold text-brand-blue underline underline-offset-2 hover:text-brand-blue-dark"
                  >
                    {t("hero.learn_how")}
                  </Link>
                </p>

                {/* CTA Buttons */}
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="h-11 gap-2 rounded-xl bg-brand-blue px-7 text-sm font-bold text-white shadow-lg shadow-brand-blue/30 transition-all hover:bg-brand-blue-dark hover:shadow-xl"
                    id="hero-cta-post"
                  >
                    <Link href="/projects/new">
                      {t("hero.cta_post")}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-11 rounded-xl border-2 border-brand-blue/30 bg-white/70 px-7 text-sm font-bold text-brand-blue backdrop-blur-sm transition-all hover:bg-white hover:border-brand-blue/50"
                    id="hero-cta-explore"
                  >
                    <Link href="/projects">{t("hero.cta_explore")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──── Projects Feed (primary content) ──── */}
        <section className="bg-gradient-to-b from-white to-brand-blue/[0.015]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="mb-8 flex flex-col gap-1">
              <h2 className="text-2xl font-bold tracking-tight text-brand-blue sm:text-3xl">
                {t("feed.title")}
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                {t("feed.description")}
              </p>
            </div>

            <ProjectFeed projects={mockProjectVisions} />
          </div>
        </section>

        {/* ──── How It Works ──── */}
        <section
          id="how-it-works"
          className="border-t border-border/40 bg-gradient-to-b from-white to-brand-blue/[0.02]"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
                {t("how_it_works.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                {t("how_it_works.description")}
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-3">
              {[
                {
                  icon: Lightbulb,
                  step: "01",
                  title: t("how_it_works.step_1_title"),
                  description: t("how_it_works.step_1_desc"),
                },
                {
                  icon: Users,
                  step: "02",
                  title: t("how_it_works.step_2_title"),
                  description: t("how_it_works.step_2_desc"),
                },
                {
                  icon: Handshake,
                  step: "03",
                  title: t("how_it_works.step_3_title"),
                  description: t("how_it_works.step_3_desc"),
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="group relative rounded-2xl border border-border/60 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/20 hover:shadow-lg hover:shadow-brand-blue/5"
                >
                  <div className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-yellow-dark">
                    {t("how_it_works.step_prefix")} {item.step}
                  </div>
                  <div className="mb-4 mt-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow text-brand-blue-dark transition-colors group-hover:bg-brand-yellow-dark group-hover:text-brand-blue-dark">
                    <item.icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──── Blog Articles ──── */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-yellow text-brand-blue-dark">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-blue sm:text-3xl">
                    {t("home.blog_title")}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("home.blog_desc")}
                  </p>
                </div>
              </div>
              <Link
                href="/blog"
                className="hidden items-center gap-1 text-sm font-semibold text-brand-blue hover:underline sm:flex"
              >
                {t("home.blog_see_all")}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {HOMEPAGE_ARTICLES.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.id}`}
                  className="group overflow-hidden rounded-xl border-2 border-border bg-white shadow-[4px_4px_0_0_rgba(0,0,0,0.08)] transition-all hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={t(article.titleKey)}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full border border-border/60 bg-white/90 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-brand-blue transition-colors">
                      {t(article.titleKey)}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {t(article.descKey)}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {article.readTime} {t("blog.min_read")}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline"
              >
                {t("home.blog_see_all")}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ──── CTA Banner ──── */}
        <section className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-brand-blue px-6 py-16 text-center shadow-2xl shadow-brand-blue/20 sm:px-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-brand-yellow/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-[200px] w-[200px] rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  {t("cta.title")}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-blue-200">
                  {t("cta.description")}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 h-12 gap-2 rounded-xl bg-brand-yellow px-8 text-base font-bold text-brand-blue-dark shadow-lg transition-all hover:!bg-brand-yellow-dark hover:shadow-xl"
                  id="cta-banner-explore"
                >
                  <Link href="/projects">
                    {t("cta.button")}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
