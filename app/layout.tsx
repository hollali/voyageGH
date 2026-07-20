import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "~/components/Toast";
import { validateEnv } from "~/lib/env";
import "./globals.css";

validateEnv();

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://voyagegh.netlify.app";

export const metadata: Metadata = {
  title: "VoyageGH - AI-Powered Travel Agency for Ghana",
  description: "Generate personalized AI-powered trip itineraries and book your dream vacation in Ghana.",
  openGraph: {
    title: "VoyageGH - AI-Powered Travel Agency for Ghana",
    description: "Generate personalized AI-powered trip itineraries and book your dream vacation in Ghana.",
    url: baseUrl,
    siteName: "VoyageGH",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/assets/images/ghana/accra-city.jpg`,
        width: 1200,
        height: 630,
        alt: "VoyageGH - AI Travel Agency for Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoyageGH - AI-Powered Travel Agency for Ghana",
    description: "Generate personalized AI-powered trip itineraries and book your dream vacation in Ghana.",
    images: [`${baseUrl}/assets/images/ghana/accra-city.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ToastProvider>
        <html lang="en">
          <body className="antialiased">
            {children}
          </body>
        </html>
      </ToastProvider>
    </ClerkProvider>
  );
}
