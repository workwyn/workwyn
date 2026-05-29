"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle } from "lucide-react";

interface PitchProposalFormProps {
  projectId: string;
}

export function PitchProposalForm({ projectId }: PitchProposalFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // In production, this would POST to an API route backed by Cloudflare D1
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center"
        id={`pitch-success-${projectId}`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle className="size-7 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-emerald-900">Pitch Submitted!</h3>
        <p className="max-w-sm text-sm text-emerald-700">
          Your pitch has been sent to the project owner. They&apos;ll review it
          and reach out if there&apos;s a match. Good luck!
        </p>
        <Button
          variant="outline"
          className="mt-2 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
          onClick={() => setSubmitted(false)}
          id="pitch-another"
        >
          Submit Another Pitch
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-border/60 bg-white p-6 shadow-sm sm:p-8"
      id={`pitch-form-${projectId}`}
    >
      <div>
        <h3 className="text-xl font-bold text-brand-blue">
          Pitch Your Contribution
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell the project owner who you are, what role you&apos;d like to play,
          and how you can help make this vision a reality.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="talent_name" className="text-sm font-semibold">
            Your Name
          </Label>
          <Input
            id="talent_name"
            name="talent_name"
            placeholder="e.g., Alex Rivera"
            required
            className="rounded-lg border-border focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
          />
        </div>

        {/* Proposed Role */}
        <div className="space-y-2">
          <Label htmlFor="proposed_role" className="text-sm font-semibold">
            Proposed Role
          </Label>
          <Input
            id="proposed_role"
            name="proposed_role"
            placeholder="e.g., UX/UI Designer, Marketing Strategist, Full-Stack Dev"
            required
            className="rounded-lg border-border focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
          />
        </div>

        {/* Pitch Message */}
        <div className="space-y-2">
          <Label htmlFor="pitch_message" className="text-sm font-semibold">
            How can you make this project successful?
          </Label>
          <Textarea
            id="pitch_message"
            name="pitch_message"
            placeholder="Describe your skills, relevant experience, and specific ideas for how you'd contribute to this project..."
            rows={5}
            required
            className="resize-none rounded-lg border-border focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full gap-2 rounded-xl bg-brand-yellow text-base font-bold text-brand-blue-dark shadow-lg shadow-brand-yellow/25 transition-all hover:bg-brand-yellow-dark hover:shadow-xl hover:shadow-brand-yellow/30"
        id="pitch-submit"
      >
        <Send className="size-4" />
        Send Your Pitch
      </Button>
    </form>
  );
}
