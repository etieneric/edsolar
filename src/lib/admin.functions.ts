import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";

type Session = { unlocked?: boolean };

const sessionOptions = () => ({
  password: process.env.SESSION_SECRET!,
  name: "edsolar-admin",
  maxAge: 60 * 60 * 8,
  cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
});

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a, "utf8").digest();
  const hb = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(ha, hb);
}

async function requireAdmin() {
  const s = await useSession<Session>(sessionOptions());
  if (!s.data.unlocked) throw new Error("Unauthorized");
  return s;
}

// ---- Auth ----
export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => d)
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) throw new Error("ADMIN_PASSWORD not set");
    if (!safeEqual(data.password, expected)) return { ok: false as const };
    const s = await useSession<Session>(sessionOptions());
    await s.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const s = await useSession<Session>(sessionOptions());
  await s.clear();
  return { ok: true };
});

export const adminCheck = createServerFn({ method: "GET" }).handler(async () => {
  const s = await useSession<Session>(sessionOptions());
  return { unlocked: !!s.data.unlocked };
});

// ---- Gallery photos ----
export const adminAddPhoto = createServerFn({ method: "POST" })
  .inputValidator((d: { url: string; caption?: string; sort_order?: number }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error, data: row } = await supabaseAdmin
      .from("gallery_photos")
      .insert({ url: data.url, caption: data.caption ?? null, sort_order: data.sort_order ?? 0 })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeletePhoto = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("gallery_photos").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---- Kits ----
export const adminUpsertKit = createServerFn({ method: "POST" })
  .inputValidator((d: {
    id?: string; slug: string; title: string; subtitle?: string; description: string;
    price?: string; image_url?: string; features: string[]; sort_order?: number;
  }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = {
      slug: data.slug, title: data.title, subtitle: data.subtitle ?? null,
      description: data.description, price: data.price ?? null,
      image_url: data.image_url ?? null, features: data.features,
      sort_order: data.sort_order ?? 0, updated_at: new Date().toISOString(),
    };
    const q = data.id
      ? supabaseAdmin.from("kits").update(payload).eq("id", data.id).select().single()
      : supabaseAdmin.from("kits").insert(payload).select().single();
    const { data: row, error } = await q;
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeleteKit = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("kits").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---- Reviews ----
export const adminListReviews = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("reviews").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
});

export const adminSetReviewApproved = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string; approved: boolean }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("reviews").update({ approved: data.approved }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteReview = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("reviews").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---- Products (Boutique) ----
export const adminUpsertProduct = createServerFn({ method: "POST" })
  .inputValidator((d: {
    id?: string; name: string; category: string; price?: string; badge?: string;
    description?: string; image_url?: string; sort_order?: number;
  }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = {
      name: data.name, category: data.category,
      price: data.price ?? null, badge: data.badge ?? null,
      description: data.description ?? null, image_url: data.image_url ?? null,
      sort_order: data.sort_order ?? 0, updated_at: new Date().toISOString(),
    };
    const q = data.id
      ? supabaseAdmin.from("products").update(payload).eq("id", data.id).select().single()
      : supabaseAdmin.from("products").insert(payload).select().single();
    const { data: row, error } = await q;
    if (error) throw new Error(error.message);
    return row;
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---- YouTube videos ----
type YtVideo = { id: string; title: string; published: string; thumbnail: string };
let ytCache: { at: number; videos: YtVideo[] } | null = null;

export const fetchYouTubeVideos = createServerFn({ method: "GET" }).handler(async () => {
  if (ytCache && Date.now() - ytCache.at < 1000 * 60 * 30) return ytCache.videos;
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE || "Bimediatv";
  try {
    const pageRes = await fetch(`https://www.youtube.com/@${handle}`, {
      headers: { "user-agent": "Mozilla/5.0" },
    });
    const html = await pageRes.text();
    const match = html.match(/"channelId":"(UC[\w-]{22})"/);
    if (!match) return [];
    const channelId = match[1];
    const rssRes = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    const xml = await rssRes.text();
    const entries = xml.split("<entry>").slice(1);
    const videos: YtVideo[] = entries.slice(0, 12).map((entry) => {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "";
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1] ?? "";
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
      return { id, title, published, thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` };
    }).filter((v) => v.id);
    ytCache = { at: Date.now(), videos };
    return videos;
  } catch (e) {
    console.error("YouTube fetch failed", e);
    return [];
  }
});
