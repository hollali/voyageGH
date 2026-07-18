"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export function Header() {
  const { isSignedIn, user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="root-nav wrapper">
      <Link href="/" className="flex items-center gap-1.5 py-5">
        <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
        <h1 className="text-base md:text-2xl font-bold text-dark-100">VoyageGH</h1>
      </Link>

      {/* Desktop nav */}
      <aside className="hidden md:flex gap-4 items-center">
        <Link
          href="/trips"
          className="text-sm font-medium text-dark-200 hover:text-primary-100 transition-colors"
        >
          Browse Trips
        </Link>
        {isSignedIn ? (
          <>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-light-400 text-dark-200 text-sm font-semibold hover:bg-light-200 transition-colors"
            >
              My Dashboard
            </Link>
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 text-white text-sm font-semibold hover:bg-primary-500 transition-colors"
              >
                Admin
              </Link>
            )}
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
              Sign In
            </button>
          </SignInButton>
        )}
      </aside>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <Image
          src={mobileOpen ? "/assets/icons/close.svg" : "/assets/icons/menu.svg"}
          alt="menu"
          width={24}
          height={24}
        />
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-light-100 shadow-lg md:hidden z-50">
          <nav className="wrapper flex flex-col gap-2 py-4">
            <Link
              href="/trips"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm font-medium text-dark-200 hover:bg-light-200 rounded-lg transition-colors"
            >
              Browse Trips
            </Link>
            {isSignedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-dark-200 hover:bg-light-200 rounded-lg transition-colors"
                >
                  My Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-primary-100 hover:bg-primary-100/10 rounded-lg transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                )}
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
                    Sign In
                  </button>
                </SignInButton>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
