"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n-context";
import { ArrowLeft, Clock, BookOpen, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ARTICLES: Record<string, { image: string; category: string; readTime: number; titleKey: string; descKey: string }> = {
  "how-to-find-cofounder": {
    image: "/images/projects/brand-spark.png",
    category: "Startup",
    readTime: 5,
    titleKey: "blog.art1_title",
    descKey: "blog.art1_desc",
  },
  "pitch-deck-101": {
    image: "/images/projects/eco-tracker.png",
    category: "Guide",
    readTime: 8,
    titleKey: "blog.art2_title",
    descKey: "blog.art2_desc",
  },
  "idea-validation": {
    image: "/images/projects/skill-swap.png",
    category: "Strategy",
    readTime: 6,
    titleKey: "blog.art3_title",
    descKey: "blog.art3_desc",
  },
  "team-culture": {
    image: "/images/projects/pet-connect.png",
    category: "Team",
    readTime: 4,
    titleKey: "blog.art4_title",
    descKey: "blog.art4_desc",
  },
  "mvp-mistakes": {
    image: "/images/projects/local-chef.png",
    category: "Product",
    readTime: 7,
    titleKey: "blog.art5_title",
    descKey: "blog.art5_desc",
  },
  "funding-guide": {
    image: "/images/projects/study-buddy.png",
    category: "Finance",
    readTime: 10,
    titleKey: "blog.art6_title",
    descKey: "blog.art6_desc",
  },
};

// Placeholder paragraphs for demo content
const DEMO_PARAGRAPHS_KEYS = [
  "blog_detail.p1",
  "blog_detail.p2",
  "blog_detail.p3",
  "blog_detail.p4",
];

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { t } = useTranslation();
  const article = ARTICLES[slug];

  if (!article) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center">
        <BookOpen className="size-12 text-muted-foreground/40 mb-4" />
        <h1 className="text-2xl font-bold text-foreground">{t("blog_detail.not_found")}</h1>
        <p className="mt-2 text-muted-foreground">{t("blog_detail.not_found_desc")}</p>
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          {t("blog_detail.back")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Back Link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-brand-blue transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        {t("blog_detail.back")}
      </Link>

      {/* Cover Image */}
      <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border-2 border-border shadow-[4px_4px_0_0_rgba(0,0,0,0.08)]">
        <Image
          src={article.image}
          alt={t(article.titleKey)}
          fill
          className="object-cover"
        />
      </div>

      {/* Meta */}
      <div className="mb-4 flex items-center gap-3">
        <Badge variant="outline" className="rounded-full text-xs">
          {article.category}
        </Badge>
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3" />
          {article.readTime} {t("blog.min_read")}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {t(article.titleKey)}
      </h1>

      {/* Description / Lead */}
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {t(article.descKey)}
      </p>

      {/* Article Body */}
      <div className="mt-10 space-y-6">
        {DEMO_PARAGRAPHS_KEYS.map((key, i) => (
          <p key={i} className="text-base leading-relaxed text-foreground/80">
            {t(key)}
          </p>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 rounded-2xl border-2 border-border bg-brand-yellow/10 p-6 text-center shadow-[4px_4px_0_0_rgba(0,0,0,0.08)]">
        <p className="text-base font-semibold text-brand-blue-dark">
          {t("blog_detail.cta_text")}
        </p>
        <Link
          href="/projects"
          className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-brand-yellow px-6 py-2.5 text-sm font-bold text-brand-blue-dark shadow-md hover:bg-brand-yellow-dark transition-all"
        >
          {t("blog_detail.cta_btn")}
        </Link>
      </div>
    </div>
  );
}
