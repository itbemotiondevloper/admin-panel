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
    settings = { branding: { companyName: 'Quest For Tech', favicon: '/favicon1.png' } };
  }
  const companyName = settings?.branding?.companyName || 'Quest For Tech';
  const siteTitle = settings?.branding?.siteTitle || `${companyName} - Digital Solutions`;
  const faviconDark = (settings?.branding as any)?.favicon || '/favicon1.png';
  const faviconLight = (settings?.branding as any)?.faviconLight || '/favicon2.png';

  return {
    title: siteTitle,
    description: "Manage rush hours, not rush. The operating system for modern restaurants.",
    icons: {
      icon: [
        { url: faviconLight, media: '(prefers-color-scheme: light)' },
        { url: faviconDark, media: '(prefers-color-scheme: dark)' },
      ],
      shortcut: faviconDark,
      apple: faviconDark,
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
