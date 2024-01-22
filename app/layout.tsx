import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from '@/components/providers/modal-provider';
import { Toaster } from "sonner";
import { EdgeStoreProvider } from '@/lib/edgestore'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteXpress",
  description: "NoteXpress",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="NoteXpress-theme"
          >
            <Toaster />
            <ModalProvider />
            <EdgeStoreProvider>
              {children}
            </EdgeStoreProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
