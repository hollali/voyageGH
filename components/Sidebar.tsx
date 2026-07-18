"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import { sidebarItems } from "~/lib/constants";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[270px] h-screen border-r border-light-100 bg-white">
      <Link href="/admin/dashboard" className="link-logo px-6">
        <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
        <h1 className="text-base md:text-2xl font-bold text-dark-100">VoyageGH</h1>
      </Link>
      <nav className="nav-items flex-1">
        <div className="container">
          <div className="flex flex-col gap-3.5 pt-9">
            {sidebarItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "nav-item",
                  pathname === item.href && "!bg-primary-100 !text-white"
                )}
              >
                <Image src={item.icon} alt={item.label} width={20} height={20} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="nav-footer">
            <Image src="/assets/images/david.webp" alt="user" width={40} height={40} className="rounded-full" />
            <article className="flex flex-col gap-[2px] max-w-[115px]">
              <h2 className="text-sm md:text-base font-semibold text-dark-200 truncate">Admin User</h2>
              <p className="text-gray-100 text-xs md:text-sm font-normal truncate">admin@voyagegh.com</p>
            </article>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function MobileSidebar() {
  return (
    <div className="mobile-sidebar lg:hidden px-4 pt-4">
      <header className="flex justify-between items-center border-b border-light-100 pb-4">
        <Link href="/admin/dashboard" className="flex items-center gap-1.5">
          <Image src="/assets/icons/logo.svg" alt="logo" width={24} height={24} />
          <h1 className="text-base font-bold text-dark-100">VoyageGH</h1>
        </Link>
      </header>
      <nav className="flex flex-col gap-3 pt-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="nav-item"
          >
            <Image src={item.icon} alt={item.label} width={20} height={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
