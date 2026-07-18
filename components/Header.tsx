"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="root-nav wrapper">
      <Link href="/" className="flex items-center gap-1.5 py-5">
        <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
        <h1 className="text-base md:text-2xl font-bold text-dark-100">VoyageGH</h1>
      </Link>
      <aside className="flex gap-4 items-center">
        <Link
          href="/trips"
          className="hidden md:flex text-sm font-medium text-dark-200 hover:text-primary-100 transition-colors"
        >
          Browse Trips
        </Link>
        {isSignedIn ? (
          <>
            <Link
              href="/dashboard"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-light-400 text-dark-200 text-sm font-semibold hover:bg-light-200 transition-colors"
            >
              My Dashboard
            </Link>
            <Link
              href="/admin/dashboard"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-100 text-white text-sm font-semibold hover:bg-primary-500 transition-colors"
            >
              Admin
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
              Sign In
            </button>
          </SignInButton>
        )}
      </aside>
    </header>
  );
}
