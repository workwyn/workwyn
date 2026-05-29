"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { mockPitches, mockPitchDecks } from "@/types";

export interface NotificationItem {
  id: string;
  type: "pitch" | "deck";
  title: string;
  description: string;
  time: string;
  link: string;
}

interface NotificationsContextValue {
  count: number;
  notifications: NotificationItem[];
  clearAll: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null
);

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used within <NotificationsProvider>"
    );
  return ctx;
}

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cleared, setCleared] = useState(false);

  // Compute notifications from mock data
  const notifications: NotificationItem[] = cleared
    ? []
    : [
        ...mockPitches
          .filter((p) => p.status === "pending")
          .map((p) => ({
            id: p.id,
            type: "pitch" as const,
            title: `New Pitch from ${p.talent_name}`,
            description: `Proposed Role: ${p.proposed_role}`,
            time: p.created_at,
            link: `/dashboard/${p.project_id}`,
          })),
        ...mockPitchDecks
          .filter((d) => d.status === "pending")
          .map((d) => ({
            id: d.id,
            type: "deck" as const,
            title: `New Pitch Deck from ${d.author_name}`,
            description: `Proposed Role: ${d.slides.proposed_role.split("—")[0].trim()}`,
            time: d.created_at,
            link: `/dashboard/${d.project_id}`,
          })),
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const count = notifications.length;

  const clearAll = useCallback(() => setCleared(true), []);

  return (
    <NotificationsContext.Provider value={{ count, notifications, clearAll }}>
      {children}
    </NotificationsContext.Provider>
  );
}
