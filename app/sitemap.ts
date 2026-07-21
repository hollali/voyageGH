import type { MetadataRoute } from "next";
import { locales } from "~/lib/i18n/config";
import { db } from "~/lib/db";
import { trips } from "~/lib/db/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://voyagegh.netlify.app";

  const allTrips = await db.select({ id: trips.id }).from(trips);

  const entries: MetadataRoute.Sitemap = [];

  const staticPages = ["", "/trips", "/terms", "/privacy"];

  for (const locale of locales) {
    for (const page of staticPages) {
      const url = `${baseUrl}/${locale}${page}`;
      const languages: Record<string, string> = {};
      for (const altLocale of locales) {
        languages[altLocale] = `${baseUrl}/${altLocale}${page}`;
      }
      languages["x-default"] = `${baseUrl}/en${page}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : page === "/trips" ? "daily" : "monthly",
        priority: page === "" ? 1 : page === "/trips" ? 0.9 : 0.3,
        alternates: { languages },
      });
    }

    for (const trip of allTrips) {
      const languages: Record<string, string> = {};
      for (const altLocale of locales) {
        languages[altLocale] = `${baseUrl}/${altLocale}/trips/${trip.id}`;
      }

      entries.push({
        url: `${baseUrl}/${locale}/trips/${trip.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages },
      });
    }
  }

  return entries;
}
