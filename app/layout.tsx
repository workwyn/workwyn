import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth-context";
import { BookmarksProvider } from "@/lib/bookmarks-context";
import { NotificationsProvider } from "@/lib/notifications-context";
import { I18nProvider } from "@/lib/i18n-context";
import { ChatProvider } from "@/lib/chat-context";
import { ChatBoxes } from "@/components/ui/chat-boxes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workwyn — Share Your Vision, Find Your Team",
  description:
    "Workwyn is a matchmaking platform for the local digital economy. Entrepreneurs post project visions, and talented people pitch how they can help make them real.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased font-sans"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <I18nProvider>
          <AuthProvider>
            <BookmarksProvider>
              <NotificationsProvider>
                <ChatProvider>
                  {children}
                  <ChatBoxes />
                </ChatProvider>
              </NotificationsProvider>
            </BookmarksProvider>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
