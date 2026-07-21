"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { cn } from "~/lib/utils";
import { sidebarItems } from "~/lib/constants";
import { SidebarAnimatedIcon } from "~/components/AnimatedIcon";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

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
              <motion.div
                key={item.id}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "nav-item",
                    pathname === item.href && "!bg-primary-100 !text-white"
                  )}
                >
                  <SidebarAnimatedIcon name={item.icon} size={20} />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="nav-footer">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <article className="flex flex-col gap-[2px] max-w-[115px]">
              <h2 className="text-sm md:text-base font-semibold text-dark-200 truncate">Admin</h2>
            </article>
            <button
              onClick={handleLogout}
              className="ml-auto p-2 rounded-lg hover:bg-red-50 text-gray-100 hover:text-red-500 transition-colors"
              title="Sign out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function MobileSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="mobile-sidebar lg:hidden px-4 pt-4">
      <header className="flex justify-between items-center border-b border-light-100 pb-4">
        <Link href="/admin/dashboard" className="flex items-center gap-1.5">
          <Image src="/assets/icons/logo.svg" alt="logo" width={24} height={24} />
          <h1 className="text-base font-bold text-dark-100">VoyageGH</h1>
        </Link>
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-red-50 text-gray-100 hover:text-red-500 transition-colors"
          title="Sign out"
        >
          <LogOut size={18} />
        </button>
      </header>
      <nav className="flex flex-col gap-3 pt-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "nav-item",
              pathname === item.href && "!bg-primary-100 !text-white"
            )}
          >
            <SidebarAnimatedIcon name={item.icon} size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
