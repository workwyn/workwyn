"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ActiveChat {
  id: string;
  name: string;
}

interface ChatContextType {
  activeChats: ActiveChat[];
  openChat: (id: string, name: string) => void;
  closeChat: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [activeChats, setActiveChats] = useState<ActiveChat[]>([]);

  const openChat = (id: string, name: string) => {
    setActiveChats((prev) => {
      // Prevent duplicates
      if (prev.find((c) => c.id === id)) {
        return prev;
      }
      return [...prev, { id, name }];
    });
  };

  const closeChat = (id: string) => {
    setActiveChats((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ChatContext.Provider value={{ activeChats, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
