"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send, Loader2, CheckCircle, MapPin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100">
          <CheckCircle className="size-10 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">{t("contact.sent_title")}</h1>
        <p className="mt-3 text-base text-muted-foreground">{t("contact.sent_desc")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow text-brand-blue-dark">
          <Mail className="size-7" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-brand-blue sm:text-4xl">
          {t("contact.title")}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground">
          {t("contact.description")}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Contact Info */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border-2 border-border bg-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,0.08)]">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{t("contact.email_label")}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">support@workwyn.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-yellow/20 text-brand-yellow-dark">
                  <MessageCircle className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{t("contact.chat_label")}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{t("contact.chat_desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{t("contact.location_label")}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">Bangkok, Thailand</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border-2 border-border bg-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,0.08)] sm:p-8 lg:col-span-3"
        >
          <div className="space-y-2">
            <Label htmlFor="contact-name" className="text-sm font-semibold">
              {t("contact.name_label")}
            </Label>
            <Input
              id="contact-name"
              placeholder={t("contact.name_ph")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email" className="text-sm font-semibold">
              {t("contact.your_email")}
            </Label>
            <Input
              id="contact-email"
              type="email"
              placeholder={t("contact.email_ph")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message" className="text-sm font-semibold">
              {t("contact.message_label")}
            </Label>
            <Textarea
              id="contact-message"
              placeholder={t("contact.message_ph")}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="resize-none rounded-lg"
              required
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={sending}
            className="w-full gap-2 rounded-xl bg-brand-yellow text-base font-bold text-brand-blue-dark shadow-lg shadow-brand-yellow/25 hover:bg-brand-yellow-dark disabled:opacity-60"
          >
            {sending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {t("contact.sending")}
              </>
            ) : (
              <>
                <Send className="size-4" />
                {t("contact.send_btn")}
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
