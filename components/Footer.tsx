"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "~/lib/i18n/routing";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="wrapper py-10 border-t border-light-100">
      <div className="footer-container">
        <Link href="/" className="flex items-center gap-1.5 py-5">
          <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
          <h1 className="text-base md:text-2xl font-bold text-dark-100">VoyageGH</h1>
        </Link>
        <div className="flex items-center gap-2 sm:gap-5">
          <Link href="/terms" className="text-sm md:text-base font-normal text-gray-100 hover:text-dark-100 transition-colors">
            {t("terms")}
          </Link>
          <Link href="/privacy" className="text-sm md:text-base font-normal text-gray-100 hover:text-dark-100 transition-colors">
            {t("privacy")}
          </Link>
          <Link href="/admin/login" className="text-sm md:text-base font-normal text-gray-100 hover:text-dark-100 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
