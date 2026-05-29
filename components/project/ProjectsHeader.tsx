"use client";

import { useTranslation } from "@/lib/i18n-context";
import { Lightbulb, Search } from "lucide-react";

export function ProjectsHeader() {
  const { t } = useTranslation();

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
            <Lightbulb className="size-5" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
            {t("explore.title")}
          </h1>
        </div>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          {t("explore.description")}
        </p>
      </div>

      <div className="mb-8 flex items-center gap-3 rounded-xl border border-brand-yellow/30 bg-brand-yellow/5 px-5 py-3.5">
        <Search className="size-5 shrink-0 text-brand-yellow-dark" />
        <p className="text-sm text-brand-blue-dark">
          <strong>{t("explore.tip_strong")}</strong> {t("explore.tip_text")}
        </p>
      </div>
    </>
  );
}
