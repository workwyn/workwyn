"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Send } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export function QuickIdeaInput({ onDrop }: { onDrop: (idea: string) => void }) {
  const { user } = useAuth();
  const [idea, setIdea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;
    onDrop(idea);
    setIdea("");
  };

  if (!user) {
    return null;
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative mb-10 overflow-hidden rounded-xl border-2 border-brand-yellow bg-brand-yellow/10 p-2 shadow-sm transition-all focus-within:border-brand-blue focus-within:bg-white focus-within:shadow-md"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-yellow text-brand-blue-dark">
          <Sparkles className="size-5" />
        </div>
        <input
          type="text"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="แปะไอเดียด่วน... (เช่น อยากทำแอปจองคิวร้านตัดผม)"
          className="flex-1 bg-transparent px-2 py-2 text-sm font-medium text-brand-blue-dark placeholder:text-brand-blue-dark/50 focus:outline-none"
        />
        <Button
          type="submit"
          disabled={!idea.trim()}
          size="sm"
          className="h-10 shrink-0 gap-2 rounded-lg bg-brand-blue font-bold text-white hover:bg-brand-blue-dark"
        >
          แปะเลย <Send className="size-4" />
        </Button>
      </div>
    </form>
  );
}
