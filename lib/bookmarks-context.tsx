"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

interface BookmarksContextValue {
  bookmarks: string[]; // array of project IDs
  toggle: (projectId: string) => void;
  isBookmarked: (projectId: string) => boolean;
}

const BookmarksContext = createContext<BookmarksContextValue | null>(null);

export function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx)
    throw new Error("useBookmarks must be used within <BookmarksProvider>");
  return ctx;
}

const STORAGE_KEY = "workwyn_bookmarks";

export function BookmarksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  const persist = useCallback((ids: string[]) => {
    setBookmarks(ids);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, []);

  const toggle = useCallback(
    (projectId: string) => {
      persist(
        bookmarks.includes(projectId)
          ? bookmarks.filter((id) => id !== projectId)
          : [...bookmarks, projectId]
      );
    },
    [bookmarks, persist]
  );

  const isBookmarked = useCallback(
    (projectId: string) => bookmarks.includes(projectId),
    [bookmarks]
  );

  return (
    <BookmarksContext.Provider value={{ bookmarks, toggle, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
}
