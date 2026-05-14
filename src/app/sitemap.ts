import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const defaultSite = "https://ashishupadhyay.qzz.io";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || defaultSite;

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return entries;

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase.from("projects").select("id");
    if (data?.length) {
      for (const row of data) {
        entries.push({
          url: `${baseUrl}/portfolio/${row.id}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  } catch {
    // Homepage-only sitemap if Supabase is unreachable
  }

  return entries;
}
