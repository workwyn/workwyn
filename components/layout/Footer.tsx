"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n-context";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/40 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <Image
                src="/images/Untitled-5_Workwyn-logo-long.png"
                alt="Workwyn Logo"
                width={120}
                height={36}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="max-w-xs text-xs text-muted-foreground">
              {t("about.description")}
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {t("footer_nav.projects")}
              </span>
              <Link href="/projects" className="text-sm text-foreground/70 hover:text-brand-blue transition-colors">
                {t("footer_nav.projects")}
              </Link>
              <Link href="/projects/new" className="text-sm text-foreground/70 hover:text-brand-blue transition-colors">
                {t("nav.post_vision")}
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Workwyn
              </span>
              <Link href="/about" className="text-sm text-foreground/70 hover:text-brand-blue transition-colors">
                {t("footer_nav.about")}
              </Link>
              <Link href="/blog" className="text-sm text-foreground/70 hover:text-brand-blue transition-colors">
                {t("footer_nav.blog")}
              </Link>
              <Link href="/faq" className="text-sm text-foreground/70 hover:text-brand-blue transition-colors">
                {t("footer_nav.faq")}
              </Link>
              <Link href="/contact" className="text-sm text-foreground/70 hover:text-brand-blue transition-colors">
                {t("footer_nav.contact")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
