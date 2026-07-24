import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Lock, LogOut, Plus, Trash2, Check, X, Image as ImageIcon, Package, MessageSquare, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  adminLogin, adminLogout, adminCheck,
  adminAddPhoto, adminDeletePhoto,
  adminUpsertKit, adminDeleteKit,
  adminListReviews, adminSetReviewApproved, adminDeleteReview,
  adminUpsertProduct, adminDeleteProduct,
} from "@/lib/admin.functions";

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
      </form>
    </div>
  );
}

type Tab = "photos" | "kits" | "reviews";

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("photos");
  const logout = useServerFn(adminLogout);
  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-lg font-black text-primary">Tableau de bord EDSOLAR</p>
            <p className="text-xs text-muted-foreground">Gérez photos, kits et avis clients</p>
          </div>
          <button onClick={async () => { await logout(); onLogout(); }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary">
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6">
          {([
            { k: "photos", label: "Photos", icon: ImageIcon },
            { k: "kits", label: "Kits", icon: Package },
            { k: "reviews", label: "Avis", icon: MessageSquare },
          ] as const).map((t) => (
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
        {tab === "reviews" && <ReviewsPanel />}
      </main>
    </div>
  );
}

/* ---------------- Photos ---------------- */
function PhotosPanel() {
  const [items, setItems] = useState<any[]>([]);
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const add = useServerFn(adminAddPhoto);
  const del = useServerFn(adminDeletePhoto);

  const load = async () => {
    const { data } = await supabase.from("gallery_photos").select("*").order("sort_order").order("created_at", { ascending: false });
    setItems(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setBusy(true);
    try { await add({ data: { url, caption } }); setUrl(""); setCaption(""); await load(); }
    finally { setBusy(false); }
  };

  return (
    <section className="space-y-6">
      <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-bold">Ajouter une photo (URL)</p>
        <p className="mt-1 text-xs text-muted-foreground">Collez l'URL d'une image (upload sur imgur, Google Drive public, etc.)</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input value={url} onChange={(e) => setUrl(e.target.value)} required placeholder="https://…/photo.jpg"
            className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Légende (optionnelle)"
            className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
          <button disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-60">
            <Plus className="h-4 w-4" /> Ajouter
          </button>
        </div>
      </form>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card">
            <img src={p.url} alt={p.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            <div className="flex items-center justify-between gap-2 p-3">
              <p className="truncate text-sm">{p.caption || <span className="text-muted-foreground">Sans légende</span>}</p>
              <button onClick={async () => { if (confirm("Supprimer ?")) { await del({ data: { id: p.id } }); await load(); } }}
                className="grid h-8 w-8 place-items-center rounded-full text-destructive hover:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground">Aucune photo pour l'instant.</p>}
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
        <TxtField label="URL image" v={form.image_url} onC={(v) => setForm({ ...form, image_url: v })} />
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

function TxtField({ label, v, onC, req, placeholder }: { label: string; v: string; onC: (v: string) => void; req?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <input value={v} onChange={(e) => onC(e.target.value)} required={req} placeholder={placeholder}
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
              className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
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
