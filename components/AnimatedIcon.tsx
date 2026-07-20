"use client";

import { motion, type Variants } from "framer-motion";
import {
  Menu,
  X,
  Search,
  MapPin,
  Star,
  Calendar,
  Users,
  Compass,
  Loader2,
  ChevronLeft,
  Check,
  Trash2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Navigation,
  Home,
  Sparkles,
  RotateCw,
  Filter,
  CreditCard,
  Edit3,
  Info,
  Map,
  Route,
  Globe,
  LogOut,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const iconComponents: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  menu: Menu,
  close: X,
  search: Search,
  "location-mark": MapPin,
  star: Star,
  calendar: Calendar,
  users: Users,
  compass: Compass,
  loader: Loader2,
  "arrow-left": ChevronLeft,
  check: Check,
  trash: Trash2,
  plus: Plus,
  "arrow-up-green": ArrowUpRight,
  "arrow-down-red": ArrowDownRight,
  destination: Navigation,
  home: Home,
  "magic-star": Sparkles,
  refresh: RotateCw,
  filter: Filter,
  booking: CreditCard,
  edit: Edit3,
  info: Info,
  itinerary: Map,
  "itinerary-button": Route,
  logo: Globe,
  logout: LogOut,
  increment: TrendingUp,
  decrement: TrendingDown,
  "blue-check": Check,
};

type AnimationVariant = "hover" | "spin" | "bounce" | "fadeUp" | "pulse" | "none";

interface AnimatedIconProps {
  name: string;
  size?: number;
  className?: string;
  variant?: AnimationVariant;
  strokeWidth?: number;
}

const hoverVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.15, rotate: 3, transition: { type: "spring", stiffness: 400, damping: 10 } },
};

const bounceVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -4, 0],
    transition: { duration: 0.6, repeat: Infinity, repeatDelay: 2 },
  },
};

const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.12, 1],
    opacity: [1, 0.8, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};

export function AnimatedIcon({
  name,
  size = 20,
  className = "",
  variant = "hover",
  strokeWidth = 2,
}: AnimatedIconProps) {
  const IconComponent = iconComponents[name];
  if (!IconComponent) return null;

  if (variant === "spin") {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={className}
      >
        <IconComponent size={size} strokeWidth={strokeWidth} />
      </motion.div>
    );
  }

  if (variant === "bounce") {
    return (
      <motion.div variants={bounceVariants} initial="initial" animate="animate" className={className}>
        <IconComponent size={size} strokeWidth={strokeWidth} />
      </motion.div>
    );
  }

  if (variant === "fadeUp") {
    return (
      <motion.div variants={fadeUpVariants} initial="initial" animate="animate" className={className}>
        <IconComponent size={size} strokeWidth={strokeWidth} />
      </motion.div>
    );
  }

  if (variant === "pulse") {
    return (
      <motion.div variants={pulseVariants} initial="initial" animate="animate" className={className}>
        <IconComponent size={size} strokeWidth={strokeWidth} />
      </motion.div>
    );
  }

  if (variant === "hover") {
    return (
      <motion.div variants={hoverVariants} initial="rest" whileHover="hover" className={className}>
        <IconComponent size={size} strokeWidth={strokeWidth} />
      </motion.div>
    );
  }

  return (
    <div className={className}>
      <IconComponent size={size} strokeWidth={strokeWidth} />
    </div>
  );
}

export function SidebarAnimatedIcon({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const IconComponent = iconComponents[name];
  if (!IconComponent) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={className}
    >
      <IconComponent size={size} strokeWidth={1.8} />
    </motion.div>
  );
}
