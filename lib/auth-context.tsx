"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ─── Context ─────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

// ─── Storage key ─────────────────────────────────────────────────────

const STORAGE_KEY = "workwyn_user";

// ─── Provider ────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  // Persist user to localStorage
  const persist = useCallback((u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Mock login — in production this would call an API route
  const login = useCallback(
    async (email: string, _password: string) => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 600));

      const mockUser: User = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0],
        email,
      };
      persist(mockUser);
    },
    [persist]
  );

  // Mock register
  const register = useCallback(
    async (name: string, email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 600));

      const mockUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
      };
      persist(mockUser);
    },
    [persist]
  );

  const logout = useCallback(() => {
    persist(null);
  }, [persist]);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
