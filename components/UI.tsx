import Image from "next/image";

interface InfoPillProps {
  text: string;
  image: string;
}

export function InfoPill({ text, image }: InfoPillProps) {
  return (
    <figure className="info-pill">
      <Image src={image} alt={text} width={20} height={20} />
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
      <Image src="/assets/icons/loader.svg" alt="loading" width={40} height={40} className="animate-spin" />
    </div>
  );
}
