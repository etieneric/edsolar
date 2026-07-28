import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import {
  Lock, LogOut, Plus, Trash2, Check, X, Image as ImageIcon, Package,
  MessageSquare, ShoppingBag, Home, Upload, Loader2, Edit2, Save
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  adminLogin, adminLogout, adminCheck,
  adminAddPhoto, adminUpdatePhoto, adminDeletePhoto,
  adminUpsertKit, adminDeleteKit,
  adminListReviews, adminSetReviewApproved, adminDeleteReview,
  adminUpsertProduct, adminDeleteProduct,
  adminCreateUploadUrl,
} from "@/lib/admin.functions";
import { compressImage } from "@/lib/compress-image";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — EDSOLAR" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const check = useServerFn(adminCheck);
  useEffect(() => { check().then((r) => { setUnlocked(r.unlocked); setReady(true); }); }, []);
  if (!ready) return <div className="grid min-h-screen place-items-center text-muted-foreground">Chargement…</div>;
  return unlocked ? <Dashboard onLogout={() => setUnlocked(false)} /> : <Login onOk={() => setUnlocked(true)} />;
}

function Login({ onOk }: { onOk: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const login = useServerFn(adminLogin);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(false);
    const r = await login({ data: { password: pw } });
    setBusy(false);
    if (r.ok) onOk(); else setErr(true);
  };
  return (
    <div className="grid min-h-screen place-items-center bg-secondary/40 px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-xl">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-center text-2xl font-black">Espace administrateur</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">EDSOLAR Énergie Cameroun</p>
        <label className="mt-6 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Mot de passe</label>
        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus
          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        {err && <p className="mt-2 text-sm text-destructive">Mot de passe incorrect</p>}
        <button disabled={busy} className="mt-5 w-full rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary-dark disabled:opacity-60">
          {busy ? "Vérification…" : "Se connecter"}
        </button>
        <Link to="/" className="mt-4 inline-flex w-full items-center justify-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary">
          <Home className="h-3.5 w-3.5" /> Retour vers le site
        </Link>
      </form>
    </div>
  );
}

type Tab = "photos" | "kits" | "products" | "reviews";

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("photos");
  const logout = useServerFn(adminLogout);
  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <p className="text-lg font-black text-primary">Tableau de bord EDSOLAR</p>
            <p className="text-xs text-muted-foreground">Gérez photos, kits, boutique et avis clients</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-dark">
              <Home className="h-4 w-4" /> Retour vers le site
            </Link>
            <button onClick={async () => { await logout(); onLogout(); }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary">
              <LogOut className="h-4 w-4" /> Déconnexion
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6">
          {(
            [
              { k: "photos", label: "Photos", icon: ImageIcon },
              { k: "kits", label: "Kits", icon: Package },
              { k: "products", label: "Boutique", icon: ShoppingBag },
              { k: "reviews", label: "Avis", icon: MessageSquare },
            ] as const
          ).map((t) => (
            <button key={t.k} onClick={() => setTab(t.k)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${tab === t.k ? "bg-primary text-primary-foreground" : "border border-border bg-background hover:bg-secondary"}`}>
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {tab === "photos" && <PhotosPanel />}
        {tab === "kits" && <KitsPanel />}
        {tab === "products" && <ProductsPanel />}
        {tab === "reviews" && <ReviewsPanel />}
      </main>
    </div>
  );
}

/* ---------- Image uploader ---------- */
async function uploadCompressed(
  createUploadUrl: (a: { data: { folder: "photos" | "kits" | "products"; filename: string } }) => Promise<any>,
  folder: "photos" | "kits" | "products",
  file: File,
) {
  const { blob, filename, contentType } = await compressImage(file);
  const { signedUrl, publicUrl } = await createUploadUrl({ data: { folder, filename } });
  const put = await fetch(signedUrl, { method: "PUT", headers: { "Content-Type": contentType }, body: blob });
  if (!put.ok) {
    const t = await put.text().catch(() => "");
    throw new Error(`Upload échoué (${put.status}) ${t}`.trim());
  }
  return publicUrl as string;
}

function ImageUploader({
  folder, value, onChange,
}: { folder: "photos" | "kits" | "products"; value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const createUploadUrl = useServerFn(adminCreateUploadUrl);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    inputRef.current?.click();
  };

  const pickFile = async (file: File) => {
    setErr(null);
    if (!file.type.startsWith("image/")) { setErr("Fichier non image"); return; }
    if (file.size > 25 * 1024 * 1024) { setErr("Image trop lourde (max 25 Mo)"); return; }
    setBusy(true);
    try {
      const publicUrl = await uploadCompressed(createUploadUrl, folder, file);
      onChange(publicUrl);
    } catch (e: any) {
      setErr(e?.message || "Échec de l'envoi");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Photo</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) pickFile(f);
          e.target.value = "";
        }}
      />
      <div className="flex items-center gap-3">
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-secondary">
          {value ? <img src={value} alt="" className="h-full w-full object-contain" /> : <ImageIcon className="h-8 w-8 text-muted-foreground" />}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 px-4 py-2 text-sm font-bold text-white disabled:opacity-60 transition-colors cursor-pointer"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {busy ? "Envoi…" : value ? "Remplacer la photo" : "Téléverser une image"}
            </button>
            {value && (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); onChange(""); }}
                className="text-xs font-semibold text-destructive hover:underline"
              >
                Retirer
              </button>
            )}
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL de l'image (se remplit automatiquement)"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
          />
        </div>
      </div>
      {err && <p className="text-xs text-destructive">{err}</p>}
    </div>
  );
}

/* -------- Envoi multiple de photos -------- */
function BulkPhotoUpload({ category, onDone }: { category: string; onDone: () => void | Promise<void> }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const createUploadUrl = useServerFn(adminCreateUploadUrl);
  const add = useServerFn(adminAddPhoto);

  const run = async (files: File[]) => {
    setErr(null);
    setProgress({ done: 0, total: files.length });
    let done = 0;
    for (const f of files) {
      try {
        if (!f.type.startsWith("image/")) continue;
        const url = await uploadCompressed(createUploadUrl, "photos", f);
        await add({ data: { url, caption: "", location: "Cameroun", category } });
      } catch (e: any) {
        setErr(`${f.name} : ${e?.message || "échec"}`);
      }
      done += 1;
      setProgress({ done, total: files.length });
    }
    await onDone();
    setProgress(null);
  };

  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-5 space-y-3">
      <div>
        <p className="text-sm font-bold">Envoi groupé pour : {category === "terrain" ? "En direct du terrain" : "Nos Réalisations"}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Sélectionnez plusieurs photos d'un coup — elles sont compressées automatiquement avant l'envoi.
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          const fs = Array.from(e.target.files ?? []);
          e.target.value = "";
          if (fs.length) run(fs);
        }}
      />
      <button
        type="button"
        disabled={!!progress}
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
      >
        {progress ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {progress ? `Envoi ${progress.done}/${progress.total}…` : "Téléverser plusieurs photos"}
      </button>
      {err && <p className="text-xs text-destructive">{err}</p>}
    </div>
  );
}

/* ---------------- PhotosPanel (Avec gestion 'realisations' et 'terrain') ---------------- */
function PhotosPanel() {
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"realisations" | "terrain">("realisations");
  
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<"realisations" | "terrain">("realisations");
  
  const [busy, setBusy] = useState(false);
  const add = useServerFn(adminAddPhoto);
  const updatePhoto = useServerFn(adminUpdatePhoto);
  const del = useServerFn(adminDeletePhoto);

  const load = async () => {
    const { data } = await supabase
      .from("gallery_photos")
      .select("*")
      .order("sort_order")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
  };
  
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setEditingId(null);
    setUrl("");
    setCaption("");
    setLocation("");
    setCategory(activeTab);
  };

  const startEdit = (p: any) => {
    setEditingId(p.id);
    setUrl(p.url);
    setCaption(p.caption ?? "");
    setLocation(p.location ?? "");
    setCategory(p.category ?? "realisations");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setBusy(true);
    try {
      if (editingId) {
        await updatePhoto({
          data: { id: editingId, url, caption, location: location || "Cameroun", category },
        });
      } else {
        await add({ data: { url, caption, location: location || "Cameroun", category } });
      }
      resetForm();
      await load();
    } finally {
      setBusy(false);
    }
  };

  const filteredItems = items.filter((p) => (p.category ?? "realisations") === activeTab);

  return (
    <section className="space-y-6">
      {/* Onglets de sélection de section */}
      <div className="flex gap-2 border-b border-border pb-3">
        <button
          type="button"
          onClick={() => { setActiveTab("realisations"); setCategory("realisations"); }}
          className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "realisations" ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-secondary"
          }`}
        >
          Nos Réalisations ({items.filter(i => (i.category ?? "realisations") === "realisations").length})
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab("terrain"); setCategory("terrain"); }}
          className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "terrain" ? "bg-primary text-primary-foreground" : "border border-border bg-card hover:bg-secondary"
          }`}
        >
          En direct du terrain ({items.filter(i => i.category === "terrain").length})
        </button>
      </div>

      <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 space-y-4">
        <div>
          <p className="text-sm font-bold">
            {editingId ? "Éditer la photo" : `Ajouter une photo dans "${activeTab === "terrain" ? "En direct du terrain" : "Nos Réalisations"}"`}
          </p>
        </div>
        
        <ImageUploader folder="photos" value={url} onChange={setUrl} />
        
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Section</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="realisations">Nos Réalisations</option>
              <option value="terrain">En direct du terrain — Nos équipes à l'œuvre</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Légende</label>
            <input 
              value={caption} 
              onChange={(e) => setCaption(e.target.value)} 
              placeholder="Ex: Déplacement en pirogue..."
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Lieu / Ville</label>
            <input 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              placeholder="Ex: Yaoundé, Bastos"
              className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" 
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button disabled={busy || !url} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60">
            {editingId ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {editingId ? "Enregistrer" : "Ajouter la photo"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-full border border-border px-4 py-2.5 text-sm font-semibold">
              Annuler
            </button>
          )}
        </div>
      </form>

      {!editingId && <BulkPhotoUpload category={activeTab} onDone={load} />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card">
            <img src={p.url} alt={p.caption ?? ""} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
            <div className="flex items-center justify-between gap-2 p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{p.caption || <span className="text-muted-foreground">Sans légende</span>}</p>
                <p className="truncate text-xs font-semibold text-emerald-600">{p.location || "Cameroun"}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => startEdit(p)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-secondary"><Edit2 className="h-4 w-4" /></button>
                <button onClick={async () => { if (confirm("Supprimer cette photo ?")) { await del({ data: { id: p.id } }); await load(); } }} className="grid h-8 w-8 place-items-center rounded-full text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && <p className="text-sm text-muted-foreground">Aucune photo dans cette section.</p>}
      </div>
    </section>
  );
}

/* ---------------- Kits ---------------- */
type KitForm = { id?: string; slug: string; title: string; subtitle: string; description: string; price: string; image_url: string; features: string; sort_order: number };
const emptyKit: KitForm = { slug: "", title: "", subtitle: "", description: "", price: "", image_url: "", features: "", sort_order: 0 };

function KitsPanel() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<KitForm>(emptyKit);
  const [busy, setBusy] = useState(false);
  const upsert = useServerFn(adminUpsertKit);
  const del = useServerFn(adminDeleteKit);

  const load = async () => {
    const { data } = await supabase.from("kits").select("*").order("sort_order");
    setItems(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const edit = (k: any) => setForm({
    id: k.id, slug: k.slug, title: k.title, subtitle: k.subtitle ?? "",
    description: k.description, price: k.price ?? "", image_url: k.image_url ?? "",
    features: (k.features ?? []).join("\n"), sort_order: k.sort_order ?? 0,
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await upsert({ data: {
        id: form.id, slug: form.slug, title: form.title,
        subtitle: form.subtitle || undefined, description: form.description,
        price: form.price || undefined, image_url: form.image_url || undefined,
        features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
        sort_order: Number(form.sort_order) || 0,
      }});
      setForm(emptyKit);
      await load();
    } finally { setBusy(false); }
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 space-y-3">
        <p className="text-sm font-bold">{form.id ? "Modifier le kit" : "Nouveau kit"}</p>
        <TxtField label="Slug (identifiant)" v={form.slug} onC={(v) => setForm({ ...form, slug: v })} req />
        <TxtField label="Titre" v={form.title} onC={(v) => setForm({ ...form, title: v })} req />
        <TxtField label="Sous-titre" v={form.subtitle} onC={(v) => setForm({ ...form, subtitle: v })} />
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required rows={3}
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
        </div>
        <TxtField label="Prix" v={form.price} onC={(v) => setForm({ ...form, price: v })} placeholder="1 000 000 FCFA" />
        <ImageUploader folder="kits" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Caractéristiques (une par ligne)</label>
          <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} rows={5}
            className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
        </div>
        <TxtField label="Ordre" v={String(form.sort_order)} onC={(v) => setForm({ ...form, sort_order: Number(v) || 0 })} />
        <div className="flex gap-2">
          <button disabled={busy} className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60">
            {form.id ? "Enregistrer" : "Créer le kit"}
          </button>
          {form.id && <button type="button" onClick={() => setForm(emptyKit)} className="rounded-full border border-border px-4 py-2.5 text-sm">Annuler</button>}
        </div>
      </form>
      <div className="space-y-3">
        {items.map((k) => (
          <div key={k.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold">{k.title} <span className="text-xs font-normal text-muted-foreground">/ {k.slug}</span></p>
                {k.subtitle && <p className="text-xs text-muted-foreground">{k.subtitle}</p>}
                <p className="mt-1 text-sm">{k.description}</p>
                {k.price && <p className="mt-1 text-sm font-bold text-primary">{k.price}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => edit(k)} className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-secondary">Éditer</button>
                <button onClick={async () => { if (confirm("Supprimer ce kit ?")) { await del({ data: { id: k.id } }); await load(); } }}
                  className="rounded-full border border-destructive/30 px-3 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10">Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TxtField({ label, v, onC, req, placeholder, type }: { label: string; v: string; onC: (v: string) => void; req?: boolean; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <input type={type ?? "text"} value={v} onChange={(e) => onC(e.target.value)} required={req} placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
    </div>
  );
}

/* ---------------- Reviews ---------------- */
function ReviewsPanel() {
  const [items, setItems] = useState<any[]>([]);
  const list = useServerFn(adminListReviews);
  const setApp = useServerFn(adminSetReviewApproved);
  const del = useServerFn(adminDeleteReview);
  const load = async () => setItems(await list());
  useEffect(() => { load(); }, []);

  return (
    <section className="space-y-3">
      {items.map((r) => (
        <div key={r.id} className="rounded-2xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-bold">{r.name} <span className="text-accent">{"★".repeat(r.rating)}<span className="text-muted-foreground">{"★".repeat(5 - r.rating)}</span></span></p>
              <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString("fr-FR")}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${r.approved ? "bg-primary/10 text-primary" : "bg-accent/20 text-accent-foreground"}`}>
              {r.approved ? "Publié" : "En attente"}
            </span>
          </div>
          <p className="mt-2 text-sm">{r.comment}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={async () => { await setApp({ data: { id: r.id, approved: !r.approved } }); await load(); }}
              className="inline-flex items-center gap-1 rounded-full bg-[#386b34] px-3 py-1.5 text-xs font-bold text-white">
              {r.approved ? <><X className="h-3 w-3" /> Retirer</> : <><Check className="h-3 w-3" /> Approuver</>}
            </button>
            <button onClick={async () => { if (confirm("Supprimer cet avis ?")) { await del({ data: { id: r.id } }); await load(); } }}
              className="inline-flex items-center gap-1 rounded-full border border-destructive/30 px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/10">
              <Trash2 className="h-3 w-3" /> Supprimer
            </button>
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="text-sm text-muted-foreground">Aucun avis pour l'instant.</p>}
    </section>
  );
}

/* ---------------- Products ---------------- */
type ProdForm = {
  id?: string; name: string; category: string; price: string; badge: string;
  description: string; image_url: string; sort_order: number;
  popularity: number; warranty: string; price_amount: string;
};
const emptyProd: ProdForm = {
  name: "", category: "Panneaux", price: "", badge: "", description: "", image_url: "",
  sort_order: 0, popularity: 0, warranty: "", price_amount: "",
};
const DEFAULT_CATEGORIES = ["Panneaux", "Onduleurs", "Batteries", "Kits", "Accessoires"];

function ProductsPanel() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<ProdForm>(emptyProd);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState("Toutes");
  const [newCat, setNewCat] = useState("");
  const upsert = useServerFn(adminUpsertProduct);
  const del = useServerFn(adminDeleteProduct);

  const load = async () => {
    const { data } = await supabase.from("products").select("*").order("sort_order").order("created_at", { ascending: false });
    setItems(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const categories = Array.from(new Set([...DEFAULT_CATEGORIES, ...items.map((p) => p.category).filter(Boolean)]));
  const listed = filter === "Toutes" ? items : items.filter((p) => p.category === filter);

  const edit = (p: any) => setForm({
    id: p.id, name: p.name, category: p.category, price: p.price ?? "",
    badge: p.badge ?? "", description: p.description ?? "", image_url: p.image_url ?? "",
    sort_order: p.sort_order ?? 0,
    popularity: p.popularity ?? 0, warranty: p.warranty ?? "",
    price_amount: p.price_amount != null ? String(p.price_amount) : "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await upsert({ data: {
        id: form.id, name: form.name, category: form.category,
        price: form.price || undefined, badge: form.badge || undefined,
        description: form.description || undefined, image_url: form.image_url || undefined,
        sort_order: Number(form.sort_order) || 0,
        popularity: Number(form.popularity) || 0,
        warranty: form.warranty || undefined,
        price_amount: form.price_amount ? Number(form.price_amount.replace(/\D/g, "")) : undefined,
      }});
      setForm(emptyProd);
      await load();
    } finally { setBusy(false); }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Catégories</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Toutes", ...categories].map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${filter === c ? "bg-primary text-primary-foreground" : "border border-border hover:bg-secondary"}`}>
              {c} {c !== "Toutes" && <span className="ml-1 text-[10px] opacity-70">({items.filter((p) => p.category === c).length})</span>}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Nouvelle catégorie…"
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          <button onClick={() => { if (newCat.trim()) { setForm((f) => ({ ...f, category: newCat.trim() })); setNewCat(""); } }}
            className="rounded-full border border-border px-3 py-2 text-xs font-semibold hover:bg-secondary">
            Utiliser pour le prochain produit
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <p className="text-sm font-bold">{form.id ? "Modifier l'équipement" : "Nouvel équipement"}</p>
          <TxtField label="Nom" v={form.name} onC={(v) => setForm({ ...form, name: v })} req />
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Catégorie</label>
            <input list="categories-list" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
            <datalist id="categories-list">
              {categories.map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>
          <TxtField label="Prix (affiché - ex: 580 000 FCFA)" v={form.price} onC={(v) => setForm({ ...form, price: v })} placeholder="580 000 FCFA" />
          <TxtField label="Prix (montant chiffré, pour tri)" v={form.price_amount} onC={(v) => setForm({ ...form, price_amount: v.replace(/\D/g, "") })} placeholder="580000" />
          <TxtField label="Badge (ex : Best-seller)" v={form.badge} onC={(v) => setForm({ ...form, badge: v })} />
          <TxtField label="Garantie (ex : 25 ans)" v={form.warranty} onC={(v) => setForm({ ...form, warranty: v })} />
          <TxtField label="Popularité (0-100)" v={String(form.popularity)} onC={(v) => setForm({ ...form, popularity: Number(v.replace(/\D/g, "")) || 0 })} placeholder="0" />
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
              className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          </div>
          <ImageUploader folder="products" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
          <TxtField label="Ordre" v={String(form.sort_order)} onC={(v) => setForm({ ...form, sort_order: Number(v) || 0 })} />
          <div className="flex gap-2">
            <button disabled={busy} className="flex-1 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60">
              {form.id ? "Enregistrer" : "Ajouter à la boutique"}
            </button>
            {form.id && <button type="button" onClick={() => setForm(emptyProd)} className="rounded-full border border-border px-4 py-2.5 text-sm">Annuler</button>}
          </div>
        </form>
        <div className="space-y-3">
          {listed.map((p) => (
            <div key={p.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3">
              {p.image_url
                ? <img src={p.image_url} alt={p.name} className="h-20 w-20 shrink-0 rounded-xl bg-secondary object-contain p-1" />
                : <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-secondary"><ShoppingBag className="h-8 w-8 text-muted-foreground" /></div>}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-bold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {p.category}
                      {p.warranty ? ` · Garantie ${p.warranty}` : ""}
                      {p.popularity ? ` · ★ ${p.popularity}` : ""}
                      {p.badge ? ` · ${p.badge}` : ""}
                    </p>
                    {p.price && <p className="text-sm font-bold text-primary">{p.price}</p>}
                  </div>
                  <div className="flex flex-col gap-1">
                    <button onClick={() => edit(p)} className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:bg-secondary">Éditer</button>
                    <button onClick={async () => { if (confirm("Supprimer cet équipement ?")) { await del({ data: { id: p.id } }); await load(); } }}
                      className="rounded-full border border-destructive/30 px-3 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10">Supprimer</button>
                  </div>
                </div>
                {p.description && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>}
              </div>
            </div>
          ))}
          {listed.length === 0 && <p className="text-sm text-muted-foreground">Aucun équipement pour l'instant.</p>}
        </div>
      </div>
    </section>
  );
}
