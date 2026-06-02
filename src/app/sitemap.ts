import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { SITE_URL } from "@/lib/site";
import { projects as localProjects } from "@/data/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  for (const project of localProjects) {
    entries.push({
      url: `${SITE_URL}/portfolio/${project.id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return entries;

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase.from("projects").select("id");
    if (data?.length) {
      const localIds = new Set(localProjects.map((p) => p.id));
      for (const row of data) {
        if (localIds.has(String(row.id))) continue;
        entries.push({
          url: `${SITE_URL}/portfolio/${row.id}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  } catch {
    // Supabase unreachable — local entries still published
  }

  return entries;
}
