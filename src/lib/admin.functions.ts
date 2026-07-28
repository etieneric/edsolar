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

// ---- Image upload ----
export const adminCreateUploadUrl = createServerFn({ method: "POST" })
  .inputValidator((d: { folder: "photos" | "kits" | "products"; filename: string }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ext = (data.filename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${data.folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    
    const { data: signed, error } = await supabaseAdmin.storage.from("media").createSignedUploadUrl(path);
    if (error || !signed) throw new Error(error?.message || "Impossible de créer l'URL d'upload");
    
    const { data: pub } = supabaseAdmin.storage.from("media").getPublicUrl(path);

    return { path, signedUrl: signed.signedUrl, token: signed.token, publicUrl: pub.publicUrl };
  });

export const adminUploadImage = createServerFn({ method: "POST" })
  .inputValidator((d: {
    folder: "photos" | "kits" | "products";
    filename: string;
    contentType: string;
    dataBase64: string;
  }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ext = (data.filename.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const safePath = `${data.folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    
    const buffer = Buffer.from(data.dataBase64, "base64");
    
    const { error } = await supabaseAdmin.storage.from("media").upload(safePath, buffer, {
      contentType: data.contentType || "image/jpeg",
      upsert: false,
    });

    if (error) throw new Error(`Erreur Supabase Storage: ${error.message}`);

    const { data: pub } = supabaseAdmin.storage.from("media").getPublicUrl(safePath);

    return { url: pub.publicUrl, path: safePath };
  });

// ---- Gallery photos (Réalisations + Terrain) ----
export const adminAddPhoto = createServerFn({ method: "POST" })
  .inputValidator((d: { url: string; caption?: string; location?: string; category?: string; sort_order?: number }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error, data: row } = await supabaseAdmin
      .from("gallery_photos")
      .insert({
        url: data.url,
        caption: data.caption ?? null,
        location: data.location || "Cameroun",
        category: data.category || "realisations",
        sort_order: data.sort_order ?? 0,
      })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const adminUpdatePhoto = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string; url?: string; caption?: string; location?: string; category?: string }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("gallery_photos")
      .update({
        ...(data.url !== undefined && { url: data.url }),
        caption: data.caption ?? null,
        location: data.location || "Cameroun",
        category: data.category || "realisations",
      })
      .eq("id", data.id);

    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeletePhoto = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: photo } = await supabaseAdmin.from("gallery_photos").select("url").eq("id", data.id).single();
    if (photo?.url && photo.url.includes("/storage/v1/object/public/media/")) {
      const filePath = photo.url.split("/storage/v1/object/public/media/")[1];
      if (filePath) {
        await supabaseAdmin.storage.from("media").remove([filePath]);
      }
    }

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

// ---- Products ----
export const adminUpsertProduct = createServerFn({ method: "POST" })
  .inputValidator((d: {
    id?: string; name: string; category: string; price?: string; badge?: string;
    description?: string; image_url?: string; sort_order?: number;
    popularity?: number; warranty?: string; price_amount?: number;
  }) => d)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = {
      name: data.name, category: data.category,
      price: data.price ?? null, badge: data.badge ?? null,
      description: data.description ?? null, image_url: data.image_url ?? null,
      sort_order: data.sort_order ?? 0,
      popularity: data.popularity ?? 0,
      warranty: data.warranty ?? null,
      price_amount: data.price_amount ?? null,
      updated_at: new Date().toISOString(),
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
