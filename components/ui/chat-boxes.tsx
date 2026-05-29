"use client";

import React, { useState } from "react";
import { useChat } from "@/lib/chat-context";
import { useAuth } from "@/lib/auth-context";
import { X, Send, Minus, MessageCircle } from "lucide-react";

const MOCK_RECENT_CHATS = [
  { id: "Lisa Chen", name: "Lisa Chen", lastMessage: "Here is my updated deck.", time: "10m", unread: 2 },
  { id: "Marcus Johnson", name: "Marcus Johnson", lastMessage: "I'll get back to you shortly!", time: "1h", unread: 0 },
  { id: "Sarah Williams", name: "Sarah Williams", lastMessage: "Thanks for the feedback.", time: "1d", unread: 0 },
];

export function ChatBoxes() {
  const { activeChats, closeChat, openChat } = useChat();
  const { user } = useAuth();
  const [isListOpen, setIsListOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="fixed bottom-0 right-8 sm:right-12 z-50 flex items-end gap-4 pointer-events-none">
      {activeChats.map((chat) => (
        <ChatWindow key={chat.id} chat={chat} onClose={() => closeChat(chat.id)} />
      ))}
      
      {/* Chat List Widget */}
      <div className="pointer-events-auto flex flex-col items-end gap-3 mb-6 relative">
        {isListOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[500px]">
            <div className="bg-brand-blue px-4 py-3 text-white flex justify-between items-center">
              <h3 className="font-bold">Messages</h3>
              <button onClick={() => setIsListOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                <X className="size-4" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {MOCK_RECENT_CHATS.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => {
                    openChat(contact.id, contact.name);
                    setIsListOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-slate-50 border-b border-border/40 last:border-0 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-semibold text-sm truncate text-foreground">{contact.name}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{contact.time}</span>
                    </div>
                    <p className={`text-xs truncate ${contact.unread > 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unread > 0 && (
                    <div className="h-2 w-2 rounded-full bg-brand-blue shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={() => setIsListOpen(!isListOpen)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg transition-transform hover:scale-105 active:scale-95 relative"
        >
          <MessageCircle className="size-6" />
          <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white border-2 border-white">
            2
          </span>
        </button>
      </div>
    </div>
  );
}

function ChatWindow({ chat, onClose }: { chat: { id: string; name: string }; onClose: () => void }) {
  const [messages, setMessages] = useState<{ id: string; text: string; sender: "me" | "them" }[]>([
    { id: "1", text: "Hello! Thank you for reviewing my pitch.", sender: "them" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages([...messages, { id: Date.now().toString(), text: inputValue.trim(), sender: "me" }]);
    setInputValue("");
    
    // Simulate a response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: "I'll get back to you shortly!", sender: "them" },
      ]);
    }, 1000);
  };

  if (isMinimized) {
    return (
      <div className="pointer-events-auto flex items-center justify-between w-72 bg-white rounded-t-xl shadow-lg border border-border overflow-hidden">
        <button 
          className="flex-1 px-4 py-3 text-left font-semibold text-brand-blue hover:bg-slate-50 transition-colors"
          onClick={() => setIsMinimized(false)}
        >
          {chat.name}
        </button>
        <button onClick={onClose} className="p-3 text-muted-foreground hover:bg-red-50 hover:text-red-500 transition-colors">
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="pointer-events-auto flex flex-col w-80 h-96 bg-white rounded-t-xl shadow-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-brand-blue px-3 py-2 text-white">
        <div className="flex items-center gap-2 font-semibold">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">
            {chat.name.charAt(0)}
          </div>
          <span className="truncate">{chat.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-md hover:bg-white/20 transition-colors"
          >
            <Minus className="size-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-1 rounded-md hover:bg-red-500 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                msg.sender === "me"
                  ? "bg-brand-blue text-white rounded-br-none"
                  : "bg-white border border-border text-foreground rounded-bl-none shadow-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="border-t border-border p-3 bg-white flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Aa"
          className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-brand-blue"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-white disabled:opacity-50 disabled:bg-slate-300 transition-colors"
        >
          <Send className="size-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
}
