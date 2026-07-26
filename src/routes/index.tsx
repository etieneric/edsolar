import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Sun, Leaf, Phone, MapPin, MessageCircle, Menu, X, ArrowRight,
  Wrench, ShoppingBag, ClipboardCheck, ShieldCheck, Battery,
  Zap, Cpu, Tv, Refrigerator, Snowflake, Lightbulb, WashingMachine,
  Laptop, Fan, Microwave, CheckCircle2, Star, Award, Clock, Users,
  Facebook, Instagram, Linkedin, Send, Youtube, PlayCircle, Package,
  Search, ArrowUp,
} from "lucide-react";
import logo from "@/assets/edsolar-logo-new.jpeg";
import hero from "@/assets/install-panels.jpeg";
import gal1 from "@/assets/install-inverter.jpeg.asset.json";
import gal2 from "@/assets/install-team.jpeg.asset.json";
import gal3 from "@/assets/install-breaker.jpeg.asset.json";
import teamPortrait from "@/assets/team-portrait.jpeg";
import { supabase } from "@/integrations/supabase/client";
import { fetchYouTubeVideos } from "@/lib/admin.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EDSOLAR Énergie Cameroun — Installation Solaire à Yaoundé" },
      { name: "description", content: "Installation de panneaux solaires, maintenance et vente d'équipements solaires à Yaoundé. Calculateur solaire, devis gratuit au +237 650544444." },
      { property: "og:title", content: "EDSOLAR Énergie Cameroun — Installation Solaire à Yaoundé" },
      { property: "og:description", content: "Installation de panneaux solaires, maintenance et vente d'équipements solaires à Yaoundé. Calculateur solaire, devis gratuit au +237 650544444." },
    ],
  }),
  component: Index,
});

const PHONE = "+237650544444";
const WA = `https://wa.me/${PHONE.replace("+", "")}`;
const waLink = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;

const NAV = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Nos Services" },
  { href: "#kits", label: "Nos Kits" },
  { href: "#boutique", label: "Équipements" },
  { href: "#calculateur", label: "Calculateur" },
  { href: "#videos", label: "Vidéos" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#avis", label: "Avis clients" },
  { href: "#contact", label: "Contact" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Services />
      <Kits />
      <Calculator />
      <Products />
      <Videos />
      <Trust />
      <Realisations />
      <Reviews />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#accueil" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="EDSOLAR Énergie Cameroun" className="h-11 w-11 rounded-xl bg-white object-contain p-0.5 shadow-md" />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-black tracking-tight text-primary">EDSOLAR</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Énergie Cameroun</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={waLink("Bonjour EDSOLAR, je souhaite un devis gratuit.")} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-md transition-all hover:brightness-105 hover:shadow-lg">
            <MessageCircle className="h-4 w-4" /> Devis gratuit
          </a>
        </div>
        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}
                 className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">{n.label}</a>
            ))}
            <a href={waLink("Bonjour EDSOLAR, je souhaite un devis gratuit.")} target="_blank" rel="noreferrer"
               className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground">
              <MessageCircle className="h-4 w-4" /> Demander un devis gratuit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="accueil" className="relative isolate overflow-hidden">
      <img src={hero} alt="Installateurs solaires EDSOLAR sur un toit à Yaoundé" width={1920} height={1080}
           className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-dark/90 via-primary-dark/70 to-primary/40" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-[1.15fr_1fr] lg:py-40">
        <div className="text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
            <Sun className="h-3.5 w-3.5 text-accent" /> L'énergie propre pour un avenir durable
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Passez à l'Énergie <span className="text-accent">Solaire</span> avec EDSOLAR
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            Installation de panneaux solaires, maintenance préventive et vente d'équipements de haute qualité à Yaoundé et dans tout le Cameroun.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#calculateur" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-xl glow-green">
              <Zap className="h-4 w-4" /> Simuler vos besoins énergétiques
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
              <Phone className="h-4 w-4" /> Contacter un expert
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> +500 installations</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Garantie 25 ans</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Cameroun & Afrique Centrale</div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="ml-auto max-w-sm rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <img src={logo} alt="EDSOLAR" className="h-14 w-14 rounded-xl bg-white object-contain p-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-white/70">Contactez-nous</p>
                <p className="text-lg font-bold">EDSOLAR Yaoundé</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> Tradex Olembe, Yaoundé, Cameroun</div>
              <div className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-accent" /> Interventions au Cameroun & Afrique Centrale</div>
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-accent" /> +237 650544444</div>
            </div>
            <a href={waLink("Bonjour EDSOLAR, je souhaite discuter d'un projet solaire.")} target="_blank" rel="noreferrer"
               className="mt-5 flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-bold text-accent-foreground">
              <MessageCircle className="h-4 w-4" /> WhatsApp direct
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
const SERVICES = [
  { icon: Sun, title: "Installation Solaire Sur-Mesure",
    desc: "Systèmes autonomes (Off-Grid), hybrides et raccordés au réseau pour résidences, entreprises et industries." },
  { icon: Wrench, title: "Maintenance & Dépannage",
    desc: "Inspection technique, nettoyage de panneaux, maintenance préventive et remplacement d'onduleurs/batteries." },
  { icon: ShoppingBag, title: "Vente d'Équipements Solaires",
    desc: "Panneaux photovoltaïques, onduleurs hybrides, batteries Lithium/Gel et régulateurs MPPT." },
  { icon: ClipboardCheck, title: "Audit & Conseil Énergétique",
    desc: "Dimensionnement précis par nos ingénieurs qualifiés pour optimiser votre consommation." },
];

function Services() {
  return (
    <section id="services" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Nos Services" title="Une expertise complète en énergie solaire"
          description="De l'audit à la mise en service, EDSOLAR vous accompagne à chaque étape de votre transition énergétique." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-border bg-card p-6 glow-green">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <a href={waLink(`Bonjour EDSOLAR, je suis intéressé par: ${s.title}`)} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Calculator ---------------- */
type Appliance = { id: string; name: string; watts: number; icon: any; hours: number };
const APPLIANCES: Appliance[] = [
  { id: "led", name: "Éclairage LED", watts: 15, icon: Lightbulb, hours: 6 },
  { id: "tv", name: "Télévision", watts: 100, icon: Tv, hours: 5 },
  { id: "fridge", name: "Réfrigérateur", watts: 200, icon: Refrigerator, hours: 12 },
  { id: "freezer", name: "Congélateur", watts: 300, icon: Snowflake, hours: 10 },
  { id: "ac", name: "Climatiseur", watts: 1200, icon: Snowflake, hours: 6 },
  { id: "fan", name: "Ventilateur", watts: 75, icon: Fan, hours: 8 },
  { id: "wm", name: "Machine à laver", watts: 500, icon: WashingMachine, hours: 1 },
  { id: "mw", name: "Micro-ondes", watts: 800, icon: Microwave, hours: 0.5 },
  { id: "pc", name: "Ordinateur", watts: 150, icon: Laptop, hours: 5 },
];

function Calculator() {
  const [qty, setQty] = useState<Record<string, number>>({ led: 4, tv: 1, fridge: 1 });
  const set = (id: string, v: number) => setQty((q) => ({ ...q, [id]: Math.max(0, v) }));

  const { peakW, dailyWh, systemKva, systemVoltage, batteryUnitAh, batteryCount, panelsCount, priceFcfa } = useMemo(() => {
    let peak = 0, daily = 0;
    for (const a of APPLIANCES) {
      const n = qty[a.id] ?? 0;
      peak += n * a.watts;
      daily += n * a.watts * a.hours;
    }
    // Grille tarifaire officielle EDSOLAR (kits complets clé en main, FCFA)
    // Réf. réelle : 3370 W crête / 15 620 Wh/j → 8 kVA, 2 × 48V 400Ah, 12 panneaux 450W
    type Tier = { kva: number; voltage: number; unitAh: number; price: number };
    const TIERS: Tier[] = [
      { kva: 1,  voltage: 12, unitAh: 100, price:   500_000 },
      { kva: 2,  voltage: 24, unitAh: 200, price: 1_000_000 },
      { kva: 4,  voltage: 24, unitAh: 200, price: 1_700_000 },
      { kva: 5,  voltage: 48, unitAh: 200, price: 2_000_000 },
      { kva: 6,  voltage: 48, unitAh: 200, price: 2_000_000 },
      { kva: 8,  voltage: 48, unitAh: 400, price: 2_500_000 },
      { kva: 12, voltage: 48, unitAh: 300, price: 3_000_000 }, // 15 kWh / 300A
    ];
    const XL_12KVA: Tier = { kva: 12, voltage: 48, unitAh: 600, price: 5_000_000 }; // 30 kWh / 600A

    const rawKva = (peak * 2) / 1000; // marge démarrage x2
    let tier = TIERS.find((t) => t.kva >= rawKva) ?? TIERS[TIERS.length - 1];

    // Batteries : capacité totale requise (2 j d'autonomie, DoD 80%)
    const targetWh = (daily * 2) / 0.8;
    let bCount = daily > 0 ? Math.max(1, Math.ceil(targetWh / (tier.voltage * tier.unitAh))) : 0;

    // Upgrade 12 kVA → 30 kWh / 600A si consommation élevée
    if (tier.kva === 12 && daily > 15_000) {
      tier = XL_12KVA;
      bCount = daily > 0 ? Math.max(1, Math.ceil(targetWh / (tier.voltage * tier.unitAh))) : 0;
    }

    // Panneaux 450W, 4h ensoleillement effectif, rendement système 0.72
    const pCount = daily > 0 ? Math.max(1, Math.round(daily / (450 * 4 * 0.72))) : 0;
    const price = daily === 0 ? 0 : tier.price;

    return {
      peakW: peak, dailyWh: daily,
      systemKva: tier.kva, systemVoltage: tier.voltage,
      batteryUnitAh: tier.unitAh, batteryCount: bCount,
      panelsCount: pCount, priceFcfa: price,
    };
  }, [qty]);

  const priceLabel = priceFcfa > 0 ? `${priceFcfa.toLocaleString("fr-FR")} FCFA` : "—";
  const msg = `Bonjour EDSOLAR,%0AVoici mon estimation solaire:%0A- Puissance de pointe: ${peakW} W%0A- Consommation journalière: ${dailyWh.toFixed(0)} Wh%0A- Système recommandé: ${systemKva} kVA ${systemVoltage}V%0A- Batteries lithium: ${batteryCount} x ${systemVoltage}V ${batteryUnitAh}Ah%0A- Panneaux solaires: ${panelsCount} x 450W%0A- Budget estimatif: ${priceLabel}%0AMerci de me contacter pour un devis.`;

  return (
    <section id="calculateur" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Calculateur Solaire" title="Estimez votre système solaire en 1 minute"
          description="Sélectionnez vos appareils. Obtenez immédiatement la puissance recommandée et la capacité de batterie." />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {APPLIANCES.map((a) => {
                const n = qty[a.id] ?? 0;
                const active = n > 0;
                return (
                  <div key={a.id} className={`flex items-center justify-between gap-3 rounded-2xl border p-4 transition-all ${active ? "border-primary bg-primary/5" : "border-border bg-background"}`}>
                    <div className="flex min-w-0 items-center gap-3">
                      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
                        <a.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.watts} W · {a.hours}h/jour</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => set(a.id, n - 1)} className="grid h-8 w-8 place-items-center rounded-full border border-border text-lg font-bold hover:bg-secondary" aria-label="moins">−</button>
                      <span className="w-6 text-center text-sm font-bold tabular-nums">{n}</span>
                      <button onClick={() => set(a.id, n + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground hover:bg-primary-dark" aria-label="plus">+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl border border-primary/30 bg-gradient-to-br from-primary to-primary-dark p-6 text-primary-foreground shadow-xl sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Votre estimation</p>
            <h3 className="mt-2 text-2xl font-black">Résultats en temps réel</h3>
            <div className="mt-6 space-y-4">
              <Metric icon={Zap} label="Puissance de pointe" value={`${peakW.toLocaleString()} W`} />
              <Metric icon={Sun} label="Consommation journalière" value={`${dailyWh.toLocaleString(undefined, { maximumFractionDigits: 0 })} Wh`} />
              <Metric icon={Cpu} label="Système recommandé" value={`${systemKva} kVA ${systemVoltage}V`} highlight />
              <Metric icon={Battery} label={`Batteries lithium ${systemVoltage}V`} value={`${batteryCount} × ${batteryUnitAh} Ah`} />
              <Metric icon={Sun} label="Panneaux solaires 450W" value={`${panelsCount} panneaux`} />
              <Metric icon={Zap} label="Budget estimatif" value={priceLabel} highlight />

            </div>
            <a href={`${WA}?text=${msg}`} target="_blank" rel="noreferrer"
               className="mt-6 flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-bold text-accent-foreground shadow-lg glow-green">
              <MessageCircle className="h-4 w-4" /> Recevoir l'estimation sur WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-white/70">Estimation indicative — nos ingénieurs valident le dimensionnement final.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-2xl border border-white/15 ${highlight ? "bg-accent/20" : "bg-white/5"} px-4 py-3`}>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-accent" />
        <span className="text-sm text-white/85">{label}</span>
      </div>
      <span className="text-lg font-black tabular-nums">{value}</span>
    </div>
  );
}

/* ---------------- Products ---------------- */
type Product = {
  id: string; name: string; category: string; price: string | null; badge: string | null;
  description: string | null; image_url: string | null;
  popularity?: number | null; warranty?: string | null; price_amount?: number | null;
};

type SortKey = "featured" | "price_asc" | "price_desc" | "popularity" | "warranty";

function parsePrice(p: Product): number {
  if (p.price_amount != null) return p.price_amount;
  if (!p.price) return Number.POSITIVE_INFINITY;
  const n = Number(p.price.replace(/\D/g, ""));
  return Number.isFinite(n) && n > 0 ? n : Number.POSITIVE_INFINITY;
}
function parseWarranty(p: Product): number {
  if (!p.warranty) return 0;
  const n = Number((p.warranty.match(/\d+/) ?? ["0"])[0]);
  return Number.isFinite(n) ? n : 0;
}

function Products() {
  const [items, setItems] = useState<Product[]>([]);
  const [cat, setCat] = useState("Tous");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [buyer, setBuyer] = useState({ name: "", phone: "" });

  useEffect(() => {
    supabase.from("products").select("*").order("sort_order").order("created_at", { ascending: false })
      .then(({ data }) => setItems((data ?? []) as Product[]));
  }, []);

  const categories = useMemo(() => {
    const s = new Set<string>();
    items.forEach((p) => p.category && s.add(p.category));
    return ["Tous", ...Array.from(s)];
  }, [items]);

  const list = useMemo(() => {
    let arr = cat === "Tous" ? [...items] : items.filter((p) => p.category === cat);
    const term = q.trim().toLowerCase();
    if (term) {
      arr = arr.filter((p) =>
        [p.name, p.description, p.category, p.badge, p.warranty].filter(Boolean).join(" ").toLowerCase().includes(term),
      );
    }
    switch (sort) {
      case "price_asc": arr.sort((a, b) => parsePrice(a) - parsePrice(b)); break;
      case "price_desc": arr.sort((a, b) => parsePrice(b) - parsePrice(a)); break;
      case "popularity": arr.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)); break;
      case "warranty": arr.sort((a, b) => parseWarranty(b) - parseWarranty(a)); break;
    }
    return arr;
  }, [items, cat, q, sort]);

  const buildOrderMsg = (p: Product) => {
    const lines = [
      `Bonjour EDSOLAR, je souhaite commander :`,
      `• Équipement : ${p.name}`,
      p.category ? `• Catégorie : ${p.category}` : "",
      p.price ? `• Prix affiché : ${p.price}` : "",
      p.warranty ? `• Garantie : ${p.warranty}` : "",
      ``,
      `Mes informations :`,
      `• Nom : ${buyer.name || "(à préciser)"}`,
      `• Téléphone : ${buyer.phone || "(à préciser)"}`,
    ].filter(Boolean);
    return lines.join("\n");
  };

  return (
    <section id="boutique" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Boutique" title="Équipements solaires de qualité"
          description="Panneaux, batteries, onduleurs et kits complets — sélectionnés pour leur fiabilité." />

        {/* Toolbar: search + sort */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un équipement (onduleur, batterie, panneau…)"
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none focus:border-primary" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold outline-none focus:border-primary">
            <option value="featured">Trier : à la une</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
            <option value="popularity">Popularité</option>
            <option value="warranty">Garantie (longue → courte)</option>
          </select>
        </div>

        {/* Category chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${cat === c ? "bg-primary text-primary-foreground shadow-md" : "border border-border bg-card text-foreground hover:border-primary hover:text-primary"}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Buyer info (used to prefill WhatsApp message) */}
        <div className="mx-auto mt-6 grid max-w-3xl gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Votre nom</label>
            <input value={buyer.name} onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} placeholder="Ex. Jean Kamga"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Votre téléphone</label>
            <input value={buyer.phone} onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })} placeholder="+237 6XX XX XX XX"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <p className="text-xs text-muted-foreground sm:text-right">Vos infos préremplissent le message WhatsApp.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <div key={p.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 glow-green">
              <div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                {p.image_url
                  ? <img src={p.image_url} alt={p.name} loading="lazy" className="h-full w-full object-contain p-3" />
                  : <ShoppingBag className="h-16 w-16 text-primary" />}
                {p.badge && <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase text-accent-foreground">{p.badge}</span>}
              </div>
              <h3 className="mt-4 text-base font-bold">{p.name}</h3>
              {p.description && <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>}
              <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-semibold">
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{p.category}</span>
                {p.warranty && <span className="rounded-full bg-accent/15 px-2 py-0.5 text-accent-foreground">Garantie {p.warranty}</span>}
              </div>
              <div className="mt-4 flex items-end justify-between gap-2">
                <span className="text-lg font-black text-primary">{p.price ?? "Sur devis"}</span>
              </div>
              <a href={waLink(buildOrderMsg(p))} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark">
                <MessageCircle className="h-4 w-4" /> Commander via WhatsApp
              </a>
            </div>
          ))}
          {list.length === 0 && <p className="col-span-full text-center text-sm text-muted-foreground">Aucun équipement ne correspond à votre recherche.</p>}
        </div>
      </div>
    </section>
  );
}



/* ---------------- Trust ---------------- */
const STATS = [
  { icon: Users, value: "+500", label: "Installations réalisées" },
  { icon: Star, value: "99%", label: "Satisfaction client" },
  { icon: Clock, value: "24/48h", label: "Intervention à Yaoundé" },
  { icon: Award, value: "10+", label: "Années d'expertise" },
];

function Trust() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Pourquoi nous choisir ?" title="La confiance de centaines de clients"
          description="Une expertise 100% locale, au service du Cameroun et de toute l'Afrique Centrale 🌍." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center glow-green">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="h-7 w-7" />
              </div>
              <div className="mt-4 text-4xl font-black text-primary">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>


        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          {["Normes IEC 61215", "ISO 9001", "Garantie 25 ans", "Ingénieurs certifiés", "Support 7j/7"].map((b) => (
            <span key={b} className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" /> {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Realisations ---------------- */
const STATIC_GALLERY = [
  { src: gal1.url, title: "Installation onduleur & batterie Lithium", loc: "Yaoundé" },
  { src: gal2.url, title: "Équipe technique EDSOLAR en intervention", loc: "Tradex Olembe" },
  { src: gal3.url, title: "Tableau électrique & protections solaires", loc: "Yaoundé" },
];

function Realisations() {
  const [extra, setExtra] = useState<{ src: string; title: string; loc: string }[]>([]);
  useEffect(() => {
    supabase.from("gallery_photos").select("url, caption").order("sort_order").order("created_at", { ascending: false })
      .then(({ data }) => setExtra((data ?? []).map((p) => ({ src: p.url, title: p.caption ?? "Réalisation EDSOLAR", loc: "Cameroun" }))));
  }, []);
  const items = [...extra, ...STATIC_GALLERY];
  return (
    <section id="realisations" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Nos Réalisations" title="Projets récents au Cameroun"
          description="Découvrez nos installations récentes chez les particuliers et les entreprises." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((g, i) => (
            <figure key={`${g.src}-${i}`} className="group overflow-hidden rounded-2xl border border-border bg-card glow-green">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={g.src} alt={g.title} width={1200} height={800} loading="lazy"
                     className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <figcaption className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-bold">{g.title}</p>
                  <p className="text-xs text-muted-foreground">{g.loc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <section id="apropos" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">À propos</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            EDSOLAR — votre partenaire solaire au Cameroun & en Afrique Centrale
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Basés à <strong className="text-foreground">Tradex Olembe, Yaoundé</strong>, nous intervenons partout au <strong className="text-foreground">Cameroun</strong> et dans toute l'<strong className="text-foreground">Afrique Centrale</strong>. Notre mission : rendre l'énergie solaire accessible, fiable et rentable pour chaque foyer et chaque entreprise, avec du matériel certifié et une équipe de techniciens qualifiés.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Ingénieurs qualifiés et techniciens certifiés",
              "Matériel Tier 1 avec garantie constructeur",
              "Service après-vente réactif à Yaoundé",
              "Financement et options de paiement échelonné",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={teamPortrait.url} alt="Technicien EDSOLAR" className="col-span-2 max-h-[520px] w-full rounded-2xl object-contain" loading="lazy" />
          <img src={gal1.url} alt="" className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
          <img src={gal3.url} alt="" className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", location: "", type: "Maison", zone: "Cameroun", needs: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Bonjour EDSOLAR,%0ANom: ${form.name}%0ATéléphone: ${form.phone}%0AQuartier: ${form.location}%0AZone d'intervention: ${form.zone}%0AType: ${form.type}%0ABesoins spécifiques: ${form.needs || "Non précisé"}%0AMessage: ${form.message}`;
    window.open(`${WA}?text=${msg}`, "_blank");
    setSent(true);
  };
  return (
    <section id="contact" className="bg-gradient-to-b from-background to-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Contact" title="Parlons de votre projet solaire"
          description="Remplissez le formulaire ou appelez-nous — un expert vous répond sous 24h." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <ContactCard icon={MapPin} title="Siège social" lines={["Tradex Olembe", "Yaoundé, Cameroun"]} />
            <ContactCard icon={Leaf} title="Zone d'intervention" lines={["Tout le Cameroun", "& Afrique Centrale"]} />
            <ContactCard icon={Phone} title="Téléphone / WhatsApp" lines={["+237 650544444"]} href={`tel:${PHONE}`} />
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <iframe title="EDSOLAR Yaoundé" className="h-56 w-full"
                src="https://www.google.com/maps?q=Tradex+Olembe+Yaounde&output=embed" loading="lazy" />
            </div>
          </div>
          <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nom complet" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="Téléphone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required type="tel" />
              <Field label="Quartier / Ville" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="Ex: Bastos, Yaoundé" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Type de projet</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <option>Maison</option><option>Commerce</option><option>Industrie</option><option>Autre</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Zone d'intervention</label>
                <select value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
                  <option>Cameroun</option><option>Afrique centrale</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Besoins spécifiques</label>
                <input type="text" value={form.needs} onChange={(e) => setForm({ ...form, needs: e.target.value })}
                  placeholder="Ex: pompage, climatisation, bureaux, hangar..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message</label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Décrivez brièvement votre besoin..."
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <button type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-colors hover:bg-primary-dark sm:w-auto">
              <Send className="h-4 w-4" /> Envoyer sur WhatsApp
            </button>
            {sent && <p className="mt-3 text-sm text-primary">Merci ! Votre message a été préparé sur WhatsApp.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, title, lines, href }: { icon: any; title: string; lines: string[]; href?: string }) {
  const inner = (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 glow-green">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold">{title}</p>
        {lines.map((l) => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

function Field({ label, value, onChange, required, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <input type={type} required={required} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-primary-dark text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <a href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-90" aria-label="Retour à l'accueil">
            <img src={logo} alt="EDSOLAR Énergie Cameroun" className="h-12 w-12 rounded-xl bg-white object-contain p-1 shadow-md" />
            <div>
              <p className="text-lg font-black">EDSOLAR</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/70">Énergie Cameroun</p>
            </div>
          </a>
          <p className="mt-4 max-w-md text-sm text-white/75">
            L'énergie propre pour un avenir durable. Installation, maintenance et vente d'équipements solaires au Cameroun.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((I, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-accent hover:text-accent-foreground">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Navigation</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-accent">{n.label}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-accent">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-accent" /> Tradex Olembe, Yaoundé, Cameroun</li>
            <li className="flex gap-2"><Leaf className="h-4 w-4 shrink-0 text-accent" /> Cameroun & Afrique Centrale</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-accent" /> +237 650544444</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6">
          <p>© 2026 Bimedia Connect Agency. Tous droits réservés.</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="/mentions-legales" className="hover:text-accent">Mentions légales</a>
            <a href="/confidentialite" className="hover:text-accent">Confidentialité</a>
            <a href="/cookies" className="hover:text-accent">Cookies</a>
          </nav>
        </div>
      </div>

    </footer>
  );
}

/* ---------------- Floating WhatsApp ---------------- */
function FloatingWhatsApp() {
  return (
    <a href={waLink("Bonjour EDSOLAR, j'aimerais plus d'informations.")} target="_blank" rel="noreferrer"
       className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 font-bold text-white shadow-2xl transition-transform hover:scale-105"
       aria-label="Contacter sur WhatsApp">
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline text-sm">Chat WhatsApp</span>
      <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-black text-accent-foreground animate-pulse">1</span>
    </a>
  );
}

/* ---------------- Scroll to top ---------------- */
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Revenir en haut"
      className="fixed bottom-24 right-6 z-50 grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-primary shadow-xl transition-transform hover:scale-110">
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ---------------- Shared ---------------- */
function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-primary">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">{title}</h2>
      <p className="mt-4 text-base text-muted-foreground">{description}</p>
    </div>
  );
}

/* ---------------- Kits (éditable admin) ---------------- */
const DEFAULT_KITS = [
  { id: "d1", slug: "prestige", title: "Kit Prestige", subtitle: "Villa haut standing", description: "Système solaire complet pour villa avec climatisation, électroménager et confort total.", price: "3 000 000 FCFA", image_url: null as string | null, features: ["Onduleur hybride 12 kVA", "Batteries lithium 48V 300Ah", "12 panneaux 550W", "Installation clé en main", "Garantie 25 ans panneaux"] },
  { id: "d2", slug: "congelateur", title: "Kit Congélateur", subtitle: "Commerce & alimentation", description: "Solution dédiée aux commerçants pour maintenir congélateurs et réfrigérateurs 24h/24.", price: "1 700 000 FCFA", image_url: null, features: ["Onduleur hybride 4 kVA", "Batteries lithium 24V 200Ah", "6 panneaux 450W", "Autonomie 48h", "Support technique 7j/7"] },
  { id: "d3", slug: "filet-bleu", title: "Kit Filet Bleu", subtitle: "Résidence familiale", description: "Kit résidentiel équilibré : éclairage, télévision, réfrigérateur et petits appareils.", price: "1 000 000 FCFA", image_url: null, features: ["Onduleur hybride 2 kVA", "Batteries lithium 24V 200Ah", "4 panneaux 450W", "Installation en 1 journée", "Suivi maintenance"] },
];

function Kits() {
  const [items, setItems] = useState<any[]>(DEFAULT_KITS);
  useEffect(() => {
    supabase.from("kits").select("*").order("sort_order").then(({ data }) => {
      if (data && data.length) setItems(data);
    });
  }, []);
  return (
    <section id="kits" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Nos Kits" title="Des solutions solaires prêtes à l'emploi"
          description="Nos kits phares, sélectionnés pour les besoins réels des foyers et commerces camerounais." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((k) => (
            <article key={k.id} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm glow-green">
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/15 to-accent/15">
                {k.image_url ? (
                  <img src={k.image_url} alt={k.title} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="grid h-full w-full place-items-center">
                    <Package className="h-16 w-16 text-primary" />
                  </div>
                )}
                {k.price && (
                  <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
                    {k.price}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">{k.subtitle}</p>
                <h3 className="mt-1 text-xl font-black">{k.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{k.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {(k.features ?? []).map((f: string) => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}</li>
                  ))}
                </ul>
                <a href={waLink(`Bonjour EDSOLAR, je suis intéressé par le ${k.title} (${k.price ?? ""}).`)} target="_blank" rel="noreferrer"
                   className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground">
                  <MessageCircle className="h-4 w-4" /> Demander ce kit
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Videos (YouTube @EDSOLAR) ---------------- */
function Videos() {
  const [videos, setVideos] = useState<{ id: string; title: string; thumbnail: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useServerFn(fetchYouTubeVideos);
  useEffect(() => {
    load().then((v) => { setVideos(v as any); setLoading(false); }).catch(() => setLoading(false));
  }, []);
  return (
    <section id="videos" className="bg-primary-dark py-20 text-primary-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Vidéos de terrain</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">Découvrez nos vidéos de terrain</h2>
          <p className="mt-4 text-base text-white/80">Retrouvez toutes nos installations et interventions sur notre chaîne YouTube @EDSOLAR.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video animate-pulse rounded-2xl bg-white/10" />
          ))}
          {!loading && videos.length === 0 && (
            <div className="col-span-full rounded-2xl border border-white/15 bg-white/5 p-6 text-center text-sm text-white/80">
              Impossible de charger les vidéos pour l'instant. <a className="underline" href="https://www.youtube.com/@EDSOLAR" target="_blank" rel="noreferrer">Voir la chaîne</a>
            </div>
          )}
          {videos.map((v) => (
            <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer"
               className="group overflow-hidden rounded-2xl border border-white/15 bg-white/5 transition-all hover:border-accent hover:bg-white/10">
              <div className="relative aspect-video overflow-hidden">
                <img src={v.thumbnail} alt={v.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 grid place-items-center bg-black/25 opacity-0 transition-opacity group-hover:opacity-100">
                  <PlayCircle className="h-16 w-16 text-white drop-shadow-xl" />
                </div>
              </div>
              <div className="p-4">
                <p className="line-clamp-2 text-sm font-semibold">{v.title}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a href="https://www.youtube.com/@EDSOLAR?sub_confirmation=1" target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105">
            <Youtube className="h-5 w-5" /> S'abonner à @EDSOLAR
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reviews ---------------- */
function Reviews() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = () => supabase.from("reviews").select("*").eq("approved", true).order("created_at", { ascending: false }).limit(12).then(({ data }) => setItems(data ?? []));
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;
    setBusy(true);
    const { error } = await supabase.from("reviews").insert({ name: form.name, rating: form.rating, comment: form.comment, approved: false });
    setBusy(false);
    if (!error) { setSent(true); setForm({ name: "", rating: 5, comment: "" }); }
  };

  return (
    <section id="avis" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Avis clients" title="Partagez votre expérience EDSOLAR"
          description="Votre satisfaction compte. Laissez un avis — il sera publié après validation de notre équipe." />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <form onSubmit={submit} className="h-fit rounded-3xl border border-border bg-card p-6 sm:p-8">
            <p className="text-sm font-bold">Laisser un avis</p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nom</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Note</label>
                <div className="mt-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n}
                      onClick={() => setForm((f) => ({ ...f, rating: n }))}
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
                      className="p-1 transition-transform hover:scale-110">
                      <Star className={`pointer-events-none h-8 w-8 ${n <= (hoverRating || form.rating) ? "fill-accent text-accent" : "text-muted-foreground/40"}`} />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-muted-foreground">{form.rating}/5</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Votre commentaire</label>
                <textarea rows={4} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required
                  className="mt-1 w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />
              </div>
              <button disabled={busy} className="w-full rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground disabled:opacity-60">
                {busy ? "Envoi…" : "Publier mon avis"}
              </button>
              {sent && <p className="text-sm text-primary">Merci ! Votre avis sera publié après validation.</p>}
            </div>
          </form>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.length === 0 && (
              <p className="col-span-full rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Soyez le premier à partager votre expérience !
              </p>
            )}
            {items.map((r) => (
              <div key={r.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{r.comment}"</p>
                <p className="mt-3 text-sm font-bold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("fr-FR")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

