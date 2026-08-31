import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let settings;
  try {
    const { settingsService } = await import('@/services/settings.service');
    settings = await settingsService.getSettings(true);
  } catch (e) {
    settings = { branding: { companyName: 'Digitory', favicon: '/favicon.ico' } };
  }
  const companyName = settings?.branding?.companyName || 'Digitory';
  const siteTitle = settings?.branding?.siteTitle || `${companyName} - Restaurant Operating System`;
  const favicon = settings?.branding?.favicon || '/favicon.ico';

  return {
    title: siteTitle,
    description: "Manage rush hours, not rush. The operating system for modern restaurants.",
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
