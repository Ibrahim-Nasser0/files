import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { NavigationProvider } from "@/context/NavigationContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StudySync (Campus OS) · Institutional Academic Operating Platform",
  description: "Enterprise campus operating system for dynamic QR attendance verification, real-time bylaw risk mitigation, and curriculum ML competency modeling.",
  keywords: [
    "StudySync",
    "Campus OS",
    "Academic Performance",
    "Bylaw Exclusion Warning",
    "Dynamic QR Attendance",
    "Curriculum Intelligence",
    "Higher Education"
  ],
  authors: [{ name: "StudySync Core Team" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] antialiased selection:bg-blue-500/20 selection:text-blue-900 dark:selection:text-blue-200">
        <ThemeProvider>
          <LanguageProvider>
            <NavigationProvider>
              {children}
            </NavigationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
