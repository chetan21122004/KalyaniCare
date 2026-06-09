import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/app/components/GoogleAnalytics";
import { getAbsoluteSiteUrl } from "@/lib/services";
import { Toaster } from "sonner";
import BottomNav from "@/app/components/site/BottomNav";

const siteUrl = getAbsoluteSiteUrl("/");

function safeMetadataBaseUrl(url: string): URL {
  try {
    return new URL(url);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const metadata: Metadata = {
  metadataBase: safeMetadataBaseUrl(siteUrl),
  title: {
    default: "KalyaniCare Nanny Services - Babysitter & Nanny Care in Pune",
    template: `%s | KalyaniCare Nanny Services`,
  },
  description:
    "Verified babysitter and nanny services in Pune for infants, toddlers, and after-school care across Hinjewadi, Wakad, Baner, Marunji, and nearby areas.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "KalyaniCare Nanny Services",
    title: "KalyaniCare Nanny Services - Trusted Babysitter & Nanny Care",
    description:
      "Verified babysitters and nannies for child care at home across Pune west. Book trusted nanny support with KalyaniCare.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "KalyaniCare Nanny Services - Trusted Babysitter & Nanny Care",
    description:
      "Verified babysitters and nannies for child care at home across Hinjewadi, Wakad, Baner, and Pune west.",
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col pb-[calc(env(safe-area-inset-bottom)+4.5rem)] md:pb-0">
        <GoogleAnalytics />
        {children}
        <BottomNav />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
