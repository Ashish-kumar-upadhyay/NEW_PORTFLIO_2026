import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import RefreshRedirect from "@/components/RefreshRedirect";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AiChatAssistant from "@/components/ai-chat/AiChatAssistant";
import WelcomeAudioPreloader from "@/components/WelcomeAudioPreloader";
import JsonLd from "@/components/seo/JsonLd";
import { GA_MEASUREMENT_ID, PERSON, SEO, SITE_NAME, SITE_URL, SOCIAL } from "@/lib/site";

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
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
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
    subject: "Ashish Kumar Upadhyay — Full Stack Developer Portfolio",
    abstract:
      "Official website of Ashish Kumar Upadhyay, Freelance Full Stack Developer from Indore, India.",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/fevicon.png",
    apple: "/assets/fevicon.png",
    shortcut: "/assets/fevicon.png",
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
        <link rel="icon" href="/assets/fevicon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/assets/fevicon.png" />
        <link rel="home" href={SITE_URL} />
        <link rel="author" href={SITE_URL} />
        <link rel="me" href={SOCIAL.linkedin} />
        <link rel="me" href={SOCIAL.github} />
        <link rel="me" href={SOCIAL.instagram} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/audio/welcome.mp3" as="fetch" type="audio/mpeg" />
      </head>
      <body>
        <WelcomeAudioPreloader />
        <JsonLd />
        <RefreshRedirect />
        {children}
        <WhatsAppButton />
        <AiChatAssistant />
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
