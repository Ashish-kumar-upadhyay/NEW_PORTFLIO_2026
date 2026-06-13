import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import RefreshRedirect from "@/components/RefreshRedirect";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import JsonLd from "@/components/seo/JsonLd";
import { GA_MEASUREMENT_ID, PERSON, SEO, SITE_URL } from "@/lib/site";

const ogImageUrl = `${SITE_URL}${PERSON.ogImage}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.title,
    template: `%s | ${PERSON.name}`,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  applicationName: SEO.title,
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: PERSON.name,
    title: SEO.title,
    description: SEO.description,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${PERSON.name} — ${PERSON.jobTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "AcvwynYb7Zgxrq3yFTFIeyRxnwOxwU7a_AARIseYezw",
  },
  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Indore, Madhya Pradesh, India 453441",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/f.png",
    apple: "/assets/f.png",
    shortcut: "/assets/f.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/f.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/f.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <JsonLd />
        <RefreshRedirect />
        {children}
        <WhatsAppButton />
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
