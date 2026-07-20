"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface TripCardProps {
  id: number;
  name: string;
  location: string;
  imageUrl: string;
  tags: string[];
  price: string;
}

export function TripCard({ id, name, location, imageUrl, tags, price }: TripCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/trips/${id}`} className="trip-card">
        <div className="relative">
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={160}
            className="w-full h-[160px] rounded-t-xl object-cover"
          />
          <span className="tripCard-pill">{price}</span>
        </div>
        <article className="flex flex-col gap-3 mt-4 pl-[18px] pr-3.5 pb-5">
          <h2 className="text-sm md:text-lg font-semibold text-dark-100 line-clamp-2">{name}</h2>
          <figure className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-100" />
            <figcaption className="text-xs md:text-sm font-normal text-gray-100">{location}</figcaption>
          </figure>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-light-500 text-primary-500 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
