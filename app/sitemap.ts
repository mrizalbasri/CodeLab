import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data/site-config";
import { createClient } from "@supabase/supabase-js";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const routes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/programs",
    "/projects",
    "/events",
    "/gallery",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === "" || route === "/programs" || route === "/projects"
        ? "weekly"
        : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, created_at")
        .limit(100);

      if (profiles && profiles.length > 0) {
        const memberRoutes: MetadataRoute.Sitemap = profiles.map((p) => ({
          url: `${baseUrl}/members/${p.id}`,
          lastModified: p.created_at ? new Date(p.created_at) : new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        }));
        return [...routes, ...memberRoutes];
      }
    } catch {
      // fallback to static routes
    }
  }

  return routes;
}
