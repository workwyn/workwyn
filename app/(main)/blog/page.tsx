"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n-context";
import { BookOpen, Clock, ArrowRight, TrendingUp, Users, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ARTICLES = [
  {
    id: "how-to-find-cofounder",
    image: "/images/projects/brand-spark.png",
    category: "Startup",
    icon: Users,
    readTime: 5,
    date: "2025-12-15",
    titleKey: "blog.art1_title",
    descKey: "blog.art1_desc",
  },
  {
    id: "pitch-deck-101",
    image: "/images/projects/eco-tracker.png",
    category: "Guide",
    icon: Lightbulb,
    readTime: 8,
    date: "2025-12-10",
    titleKey: "blog.art2_title",
    descKey: "blog.art2_desc",
  },
  {
    id: "idea-validation",
    image: "/images/projects/skill-swap.png",
    category: "Strategy",
    icon: TrendingUp,
    readTime: 6,
    date: "2025-12-05",
    titleKey: "blog.art3_title",
    descKey: "blog.art3_desc",
  },
  {
    id: "team-culture",
    image: "/images/projects/pet-connect.png",
    category: "Team",
    icon: Users,
    readTime: 4,
    date: "2025-11-28",
    titleKey: "blog.art4_title",
    descKey: "blog.art4_desc",
  },
  {
    id: "mvp-mistakes",
    image: "/images/projects/local-chef.png",
    category: "Product",
    icon: Lightbulb,
    readTime: 7,
    date: "2025-11-20",
    titleKey: "blog.art5_title",
    descKey: "blog.art5_desc",
  },
  {
    id: "funding-guide",
    image: "/images/projects/study-buddy.png",
    category: "Finance",
    icon: TrendingUp,
    readTime: 10,
    date: "2025-11-15",
    titleKey: "blog.art6_title",
    descKey: "blog.art6_desc",
  },
];

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow text-brand-blue-dark">
          <BookOpen className="size-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          {t("blog.title")}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
          {t("blog.description")}
        </p>
      </div>

      {/* Featured Article */}
      <div className="mb-12 overflow-hidden rounded-2xl border-2 border-border bg-white shadow-[4px_4px_0_0_rgba(0,0,0,0.08)] transition-all hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.1)] hover:-translate-y-0.5">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-[16/10] md:aspect-auto">
            <Image
              src={ARTICLES[0].image}
              alt={t(ARTICLES[0].titleKey)}
              fill
              className="object-cover"
            />
            <Badge className="absolute left-4 top-4 rounded-full bg-brand-yellow text-brand-blue-dark font-semibold border-0 shadow-md">
              {t("blog.featured")}
            </Badge>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <Badge variant="outline" className="mb-3 w-fit rounded-full text-xs">
              {ARTICLES[0].category}
            </Badge>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t(ARTICLES[0].titleKey)}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {t(ARTICLES[0].descKey)}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="size-3.5" />
                {ARTICLES[0].readTime} {t("blog.min_read")}
              </span>
              <Link
                href={`/blog/${ARTICLES[0].id}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:underline"
              >
                {t("blog.read_more")}
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.slice(1).map((article) => (
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
              <Badge variant="outline" className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-sm text-xs border-border/60">
                {article.category}
              </Badge>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-brand-blue transition-colors">
                {t(article.titleKey)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {t(article.descKey)}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {article.readTime} {t("blog.min_read")}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue opacity-0 transition-opacity group-hover:opacity-100">
                  {t("blog.read_more")}
                  <ArrowRight className="size-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
