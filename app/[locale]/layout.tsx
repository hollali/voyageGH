import { notFound } from "next/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales, type Locale } from "~/lib/i18n/config";
import { validateEnv } from "~/lib/env";
import { ToastProvider } from "~/components/Toast";
import { CurrencyProvider } from "~/lib/currency";
import "../globals.css";

validateEnv();

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr">
      <body className="antialiased">
        <ClerkProvider>
          <CurrencyProvider>
            <ToastProvider>
              <NextIntlClientProvider messages={messages}>
                {children}
              </NextIntlClientProvider>
            </ToastProvider>
          </CurrencyProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
