import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "../components/common/CookieConsent";
import Analytics from "../components/common/Analytics";
import Marketing from "../components/common/Marketing";
import PreferencesManager from "../components/common/PreferencesManager";
import { Toaster } from "sonner";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Invitris - Advancing Biotechnology Research",
  description: "Invitris is a leading biotechnology company focused on advancing research and development in life sciences and medical technology.",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <VercelAnalytics />
        <Marketing />
        <PreferencesManager />
        <CookieConsent />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
