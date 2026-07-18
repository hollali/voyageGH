import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "~/components/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "VoyageGH - AI-Powered Travel Agency for Ghana",
  description: "Generate personalized AI-powered trip itineraries and book your dream vacation in Ghana.",
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
