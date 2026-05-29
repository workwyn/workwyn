"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n-context";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  { qKey: "faq.q1", aKey: "faq.a1" },
  { qKey: "faq.q2", aKey: "faq.a2" },
  { qKey: "faq.q3", aKey: "faq.a3" },
  { qKey: "faq.q4", aKey: "faq.a4" },
  { qKey: "faq.q5", aKey: "faq.a5" },
  { qKey: "faq.q6", aKey: "faq.a6" },
  { qKey: "faq.q7", aKey: "faq.a7" },
];

export default function FAQPage() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow text-brand-blue-dark">
          <HelpCircle className="size-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          {t("faq.title")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          {t("faq.description")}
        </p>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`overflow-hidden rounded-xl border-2 transition-all ${
                isOpen
                  ? "border-brand-blue/20 bg-white shadow-[4px_4px_0_0_rgba(0,0,0,0.08)]"
                  : "border-border bg-white"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
                id={`faq-${index}`}
              >
                <span className="pr-4 text-sm font-semibold text-foreground sm:text-base">
                  {t(item.qKey)}
                </span>
                <ChevronDown
                  className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-border/40 px-5 py-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t(item.aKey)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
