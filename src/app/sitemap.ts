import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://luma-digital.de";

const routes = [
  "",
  "/leistungen",
  "/preise",
  "/referenzen",
  "/ueber-uns",
  "/kontakt",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
