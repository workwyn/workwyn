"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n-context";
import { Heart, Target, Lightbulb, Users, Sparkles } from "lucide-react";

const TEAM = [
  { nameKey: "about.team1_name", roleKey: "about.team1_role", avatar: "T" },
  { nameKey: "about.team2_name", roleKey: "about.team2_role", avatar: "S" },
  { nameKey: "about.team3_name", roleKey: "about.team3_role", avatar: "P" },
];

const VALUES = [
  { icon: Lightbulb, titleKey: "about.val1_title", descKey: "about.val1_desc", color: "bg-brand-yellow text-brand-blue-dark" },
  { icon: Users, titleKey: "about.val2_title", descKey: "about.val2_desc", color: "bg-brand-blue/10 text-brand-blue" },
  { icon: Heart, titleKey: "about.val3_title", descKey: "about.val3_desc", color: "bg-pink-100 text-pink-600" },
];

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Hero */}
      <div className="mb-16 text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
          <Image
            src="/images/Untitled-5_Workwyn-logo-mark.png"
            alt="Workwyn Mark"
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          {t("about.title")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {t("about.description")}
        </p>
      </div>

      {/* Mission */}
      <div className="mb-16 rounded-2xl border-2 border-border bg-white p-8 shadow-[4px_4px_0_0_rgba(0,0,0,0.08)] sm:p-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-yellow text-brand-blue-dark">
            <Target className="size-5" />
          </div>
          <h2 className="text-2xl font-bold text-brand-blue">{t("about.mission_title")}</h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground">
          {t("about.mission_desc")}
        </p>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-2xl font-bold text-brand-blue">
          {t("about.values_title")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {VALUES.map((val, i) => (
            <div
              key={i}
              className="rounded-xl border-2 border-border bg-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,0.08)] text-center"
            >
              <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${val.color}`}>
                <val.icon className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{t(val.titleKey)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(val.descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="mb-8 text-center text-2xl font-bold text-brand-blue">
          {t("about.team_title")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {TEAM.map((member, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl border-2 border-border bg-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,0.08)]"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue text-2xl font-bold text-white">
                {member.avatar}
              </div>
              <h3 className="text-base font-bold text-foreground">{t(member.nameKey)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t(member.roleKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
