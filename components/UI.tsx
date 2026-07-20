import { type ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface InfoPillProps {
  text: string;
  icon: ReactNode;
}

export function InfoPill({ text, icon }: InfoPillProps) {
  return (
    <figure className="info-pill">
      {icon}
      <figcaption>{text}</figcaption>
    </figure>
  );
}

interface PillProps {
  text: string;
  bgColor?: string;
  textColor?: string;
}

export function Pill({ text, bgColor = "bg-light-500", textColor = "text-primary-500" }: PillProps) {
  return (
    <span className={`px-3 py-1 ${bgColor} ${textColor} text-xs rounded-full font-medium`}>
      {text}
    </span>
  );
}

export function Loader() {
  return (
    <div className="flex-center w-full h-full">
      <Loader2 size={40} className="animate-spin text-primary-100" />
    </div>
  );
}
