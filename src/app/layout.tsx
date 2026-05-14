import type { Metadata } from "next";
import "./globals.css";
import RefreshRedirect from '@/components/RefreshRedirect'

export const metadata: Metadata = {
  title: "Ashish Kumar Upadhyay",
  description: "Portfolio...",
  verification: {
    google: "AcvwynYb7Zgxrq3yFTFIeyRxnwOxwU7a_AARIseYezw",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RefreshRedirect />
        {children}
        </body>
    </html>
  );
}