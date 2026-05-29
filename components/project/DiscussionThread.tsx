"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { MessageCircle, Send, User } from "lucide-react";
import type { Comment } from "@/types";

interface DiscussionThreadProps {
  projectId: string;
  initialComments: Comment[];
}

export function DiscussionThread({
  projectId,
  initialComments,
}: DiscussionThreadProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: `cmt-${Date.now()}`,
      project_id: projectId,
      author_name: user.name,
      message: newComment.trim(),
      created_at: new Date().toISOString(),
    };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  }

  const fmt = (date: string) =>
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));

  return (
    <div className="space-y-6">
      {/* Comment list */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((c) => (
            <div
              key={c.id}
              className="flex gap-3 rounded-xl border border-border/40 bg-white p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                <User className="size-3.5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {c.author_name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {fmt(c.created_at)}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                  {c.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 py-10 text-center">
          <MessageCircle className="size-8 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            No comments yet. Start the conversation!
          </p>
        </div>
      )}

      {/* Add comment form */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue mt-1">
            <User className="size-3.5" />
          </div>
          <div className="flex-1 space-y-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ask a question or share your thoughts..."
              rows={3}
              className="resize-none rounded-lg text-sm focus-visible:border-brand-blue focus-visible:ring-brand-blue/20"
              id="comment-input"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                size="sm"
                disabled={!newComment.trim()}
                className="gap-1.5 rounded-lg bg-brand-blue text-white hover:bg-brand-blue-dark disabled:opacity-50"
                id="comment-submit"
              >
                <Send className="size-3.5" />
                Post Comment
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <p className="rounded-lg bg-muted/30 px-4 py-3 text-center text-sm text-muted-foreground">
          <a
            href="/login"
            className="font-semibold text-brand-blue hover:underline"
          >
            Sign in
          </a>{" "}
          to join the discussion.
        </p>
      )}
    </div>
  );
}
