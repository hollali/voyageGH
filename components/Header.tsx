"use client";

import { useState } from "react";
import Image from "next/image";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "~/lib/i18n/routing";
import { LanguageSwitcher } from "~/components/LanguageSwitcher";
import { CurrencySwitcher } from "~/components/CurrencySwitcher";

export function Header() {
  const { isSignedIn } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <header className="root-nav wrapper">
      <Link href="/" className="flex items-center gap-1.5 py-5">
        <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
        <h1 className="text-base md:text-2xl font-bold text-dark-100">VoyageGH</h1>
      </Link>

      {/* Desktop nav */}
      <aside className="hidden md:flex gap-3 items-center">
        <LanguageSwitcher />
        <CurrencySwitcher />
        <Link
          href="/trips"
          className="text-sm font-medium text-dark-200 hover:text-primary-100 transition-colors"
        >
          {t("browseTrips")}
        </Link>
        {isSignedIn ? (
          <>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-light-400 text-dark-200 text-sm font-semibold hover:bg-light-200 transition-colors"
            >
              {t("myDashboard")}
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 text-white text-sm font-semibold hover:bg-primary-500 transition-colors"
            >
              {t("admin")}
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-10 rounded-full",
                },
              }}
            />
          </>
        ) : (
          <SignInButton mode="modal">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 text-white text-sm font-semibold hover:bg-primary-500 transition-colors">
              {t("signIn")}
            </button>
          </SignInButton>
        )}
      </aside>

      {/* Mobile hamburger */}
      <motion.button
        className="md:hidden p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {mobileOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-light-100 shadow-lg md:hidden z-50"
          >
            <nav className="wrapper flex flex-col gap-2 py-4">
              <div className="flex gap-2 px-4 py-2">
                <LanguageSwitcher />
                <CurrencySwitcher />
              </div>
              <Link
                href="/trips"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-dark-200 hover:bg-light-200 rounded-lg transition-colors"
              >
                {t("browseTrips")}
              </Link>
              {isSignedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-dark-200 hover:bg-light-200 rounded-lg transition-colors"
                  >
                    {t("myDashboard")}
                  </Link>
                  <Link
                    href="/admin/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-primary-100 hover:bg-primary-100/10 rounded-lg transition-colors"
                  >
                    {t("admin")}
                  </Link>
                  <div className="px-4 py-3">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "size-10 rounded-full",
                        },
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="px-4 py-3">
                  <SignInButton mode="modal">
                    <button className="w-full px-4 py-3 bg-primary-100 text-white rounded-lg font-semibold hover:bg-primary-500 transition-colors">
                      {t("signIn")}
                    </button>
                  </SignInButton>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
