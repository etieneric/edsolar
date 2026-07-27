import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Sun, Leaf, Phone, MapPin, MessageCircle, Menu, X, ArrowRight,
  Wrench, ShoppingBag, ClipboardCheck, ShieldCheck, Battery,
  Zap, Cpu, Tv, Refrigerator, Snowflake, Lightbulb, WashingMachine,
  Laptop, Fan, Microwave, CheckCircle2, Star, Award, Clock, Users,
  Facebook, Instagram, Linkedin, Send, Package, Search, ArrowUp,
  Radio, Camera, Video, Sparkles
} from "lucide-react";
import logo from "@/assets/edsolar-logo-new.jpeg";
import hero from "@/assets/install-panels.jpeg";
import gal1 from "@/assets/gallery-1.jpg";
import gal2 from "@/assets/gallery-2.jpg";
import gal3 from "@/assets/gallery-3.jpg";
import teamPortrait from "@/assets/team-portrait.jpeg";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EDSOLAR Énergie Cameroun — Installation Solaire à Yaoundé" },
      { name: "description", content: "Installation de panneaux solaires, maintenance et vente d'équipements solaires à Yaoundé. Simulateur devis solaire gratuit au +237 650544444." },
      { property: "og:title", content: "EDSOLAR Énergie Cameroun — Installation Solaire à Yaoundé" },
      { property: "og:description", content: "Installation de panneaux solaires, maintenance et vente d'équipements solaires à Yaoundé. Simulateur devis solaire gratuit au +237 650544444." },
    ],
  }),
  component: Index,
});

const PHONE = "+237650544444";
const WA = `https://wa.me/${PHONE.replace("+", "")}`;
const WA_CHANNEL_URL = "https://whatsapp.com/channel/0029VauTigF9Gv7cyMQUQH1x";
const waLink = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;

/* Tous les liens complets pour la version mobile/tablette */
const NAV_MOBILE = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Nos Services" },
  { href: "#kits", label: "Nos Kits" },
  { href: "#boutique", label: "Équipements" },
  { href: "#calculateur", label: "Simulateur Devis" },
  { href: "#canal", label: "Chaîne WhatsApp" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#avis", label: "Avis clients" },
  { href: "#contact", label: "Contact" },
];

/* Liens essentiels condensés pour Desktop (0 chevauchement) */
const NAV_DESKTOP = [
  { href: "#services", label: "Services" },
  { href: "#kits", label: "Kits" },
  { href: "#boutique", label: "Boutique" },
  { href: "#calculateur", label: "Simulateur Devis" },
  { href: "#realisations", label: "Réalisations" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <Header />
      <Hero />
      <Services />
      <Kits />
      <Calculator />
      <Products />
      <WhatsAppChannel />
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

/* ---------------- Header Responsive ---------------- */
function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        
        {/* LOGO */}
        <a href="#accueil" className="flex items-center gap-2.5 shrink-0">
          <img 
            src={logo} 
            alt="EDSOLAR Énergie Cameroun" 
            className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white object-contain p-0.5 shadow-sm border border-slate-100" 
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">EDSOLAR</span>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600">Énergie Cameroun</span>
          </span>
        </a>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {NAV_DESKTOP.map((n) => (
            <a 
              key={n.href} 
              href={n.href} 
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-amber-500 dark:text-slate-200 whitespace-nowrap"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* BOUTON CTA DESKTOP */}
        <div className="hidden items-center gap-3 lg:flex shrink-0">
          <a 
            href={waLink("Bonjour EDSOLAR, je souhaite un devis gratuit.")} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-amber-500/10 transition-all hover:scale-105 hover:bg-amber-400 whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4 fill-slate-950" />
            <span>Devis gratuit</span>
          </a>
        </div>

        {/* HAMBURGER (Mobile & Tablette) */}
        <button 
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-800 transition-colors hover:bg-slate-100 lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" 
          onClick={() => setOpen((v) => !v)} 
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* MENU DEROULANT MOBILE & TABLETTE */}
      {open && (
        <div className="border-t border-slate-200 bg-white/95 px-4 pb-6 pt-3 shadow-2xl backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/95">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {NAV_MOBILE.map((n) => (
              <a 
                key={n.href} 
                href={n.href} 
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                <span>{n.label}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </a>
            ))}
            
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-900">
              <a 
                href={waLink("Bonjour EDSOLAR, je souhaite un devis gratuit.")} 
                target="_blank" 
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-bold text-slate-950 shadow-md transition-all active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4 fill-slate-950" />
                <span>Demander un devis gratuit</span>
              </a>
            </div>
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/60" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-32 lg:grid-cols-[1.15fr_1fr] lg:py-40">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur">
            <Sun className="h-3.5 w-3.5 text-amber-400" /> L'énergie propre pour un avenir durable
          </span>
          <h1 className="mt-6 text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Passez à l'Énergie <span className="text-amber-400">Solaire</span> avec EDSOLAR
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Installation de panneaux solaires, maintenance préventive et vente d'équipements de haute qualité à Yaoundé et dans tout le Cameroun.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#calculateur" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/20 transition-all hover:scale-105 hover:bg-amber-400">
              <Zap className="h-4 w-4 fill-slate-950" /> Simuler vos besoins énergétiques
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
              <Phone className="h-4 w-4" /> Contacter un expert
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> +500 installations</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Garantie 25 ans</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Cameroun & Afrique Centrale</div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="ml-auto max-w-sm rounded-3xl border border-white/15 bg-slate-900/60 p-6 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <img src={logo} alt="EDSOLAR" className="h-14 w-14 rounded-xl bg-white object-contain p-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">Contactez-nous</p>
                <p className="text-lg font-bold">EDSOLAR Yaoundé</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-amber-400 shrink-0" /> Tradex Olembe, Yaoundé, Cameroun</div>
              <div className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-emerald-400 shrink-0" /> Interventions au Cameroun & Afrique Centrale</div>
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-amber-400 shrink-0" /> +237 650544444</div>
            </div>
            <a href={waLink("Bonjour EDSOLAR, je souhaite discuter d'un projet solaire.")} target="_blank" rel="noreferrer"
               className="mt-5 flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400">
              <MessageCircle className="h-4 w-4 fill-slate-950" /> WhatsApp direct
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
    <section id="services" className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Nos Services" title="Une expertise complète en énergie solaire"
          description="De l'audit à la mise en service, EDSOLAR vous accompagne à chaque étape de votre transition énergétique." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-amber-500/40">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/10 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-slate-950">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <a href={waLink(`Bonjour EDSOLAR, je suis intéressé par: ${s.title}`)} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:gap-2 transition-all">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Calculator / Simulateur Devis ---------------- */
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
    type Tier = { kva: number; voltage: number; unitAh: number; price: number };
    const TIERS: Tier[] = [
      { kva: 1,  voltage: 12, unitAh: 100, price:   500_000 },
      { kva: 2,  voltage: 24, unitAh: 200, price: 1_000_000 },
      { kva: 4,  voltage: 24, unitAh: 200, price: 1_700_000 },
      { kva: 5,  voltage: 48, unitAh: 200, price: 2_000_000 },
      { kva: 6,  voltage: 48, unitAh: 200, price: 2_000_000 },
      { kva: 8,  voltage: 48, unitAh: 400, price: 2_500_000 },
      { kva: 12, voltage: 48, unitAh: 300, price: 3_000_000 },
    ];
    const XL_12KVA: Tier = { kva: 12, voltage: 48, unitAh: 600, price: 5_000_000 };

    const rawKva = (peak * 2) / 1000;
    let tier = TIERS.find((t) => t.kva >= rawKva) ?? TIERS[TIERS.length - 1];

    const targetWh = (daily * 2) / 0.8;
    let bCount = daily > 0 ? Math.max(1, Math.ceil(targetWh / (tier.voltage * tier.unitAh))) : 0;

    if (tier.kva === 12 && daily > 15_000) {
      tier = XL_12KVA;
      bCount = daily > 0 ? Math.max(1, Math.ceil(targetWh / (tier.voltage * tier.unitAh))) : 0;
    }

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
    <section id="calculateur" className="py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader 
          eyebrow="Simulateur Devis" 
          title="Estimez votre installation solaire en 1 minute"
          description="Sélectionnez vos appareils. Obtenez immédiatement votre puissance recommandée et une estimation budgétaire." 
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-5 sm:p-8 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              {APPLIANCES.map((a) => {
                const n = qty[a.id] ?? 0;
                const active = n > 0;
                return (
                  <div key={a.id} className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 transition-all ${active ? "border-amber-500/50 bg-amber-500/5" : "border-border bg-background"}`}>
                    <div className="flex min-w-0 items-center gap-3">
                      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active ? "bg-amber-500 text-slate-950" : "bg-slate-200 dark:bg-slate-800 text-foreground"}`}>
                        <a.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{a.name}</p>
                        <p className="text-xs text-muted-foreground">{a.watts} W · {a.hours}h/jour</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => set(a.id, n - 1)} className="grid h-8 w-8 place-items-center rounded-full border border-border text-lg font-bold hover:bg-secondary" aria-label="moins">−</button>
                      <span className="w-5 text-center text-sm font-bold tabular-nums">{n}</span>
                      <button onClick={() => set(a.id, n + 1)} className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-lg font-bold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900" aria-label="plus">+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 text-white shadow-2xl sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Votre estimation</p>
            <h3 className="mt-2 text-2xl font-black">Résultats en temps réel</h3>
            <div className="mt-6 space-y-3.5">
              <Metric icon={Zap} label="Puissance de pointe" value={`${peakW.toLocaleString()} W`} />
              <Metric icon={Sun} label="Consommation journalière" value={`${dailyWh.toLocaleString(undefined, { maximumFractionDigits: 0 })} Wh`} />
              <Metric icon={Cpu} label="Système recommandé" value={`${systemKva} kVA ${systemVoltage}V`} highlight />
              <Metric icon={Battery} label={`Batteries lithium ${systemVoltage}V`} value={`${batteryCount} × ${batteryUnitAh} Ah`} />
              <Metric icon={Sun} label="Panneaux solaires 450W" value={`${panelsCount} panneaux`} />
              <Metric icon={Zap} label="Budget estimatif" value={priceLabel} highlight />
            </div>
            <a href={`${WA}?text=${msg}`} target="_blank" rel="noreferrer"
               className="mt-6 flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg transition-all hover:scale-105 hover:bg-amber-400">
              <MessageCircle className="h-4 w-4 fill-slate-950" /> Recevoir l'estimation sur WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-slate-400">Estimation indicative — nos ingénieurs valident le dimensionnement final.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-2xl border border-slate-800 ${highlight ? "bg-amber-500/10 border-amber-500/30 text-amber-400" : "bg-slate-900/60"} px-4 py-3`}>
      <div className="flex items-center gap-2.5">
        <Icon className={`h-4 w-4 ${highlight ? "text-amber-400" : "text-slate-400"}`} />
        <span className="text-xs sm:text-sm text-slate-300">{label}</span>
      </div>
      <span className="text-base sm:text-lg font-black tabular-nums">{value}</span>
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
    <section id="boutique" className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Boutique" title="Équipements solaires de qualité"
          description="Panneaux, batteries, onduleurs et kits complets — sélectionnés pour leur fiabilité." />

        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un équipement (onduleur, batterie, panneau…)"
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-500" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold outline-none focus:border-amber-500">
            <option value="featured">Trier : à la une</option>
            <option value="price_asc">Prix croissant</option>
            <option value="price_desc">Prix décroissant</option>
            <option value="popularity">Popularité</option>
            <option value="warranty">Garantie (longue → courte)</option>
          </select>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${cat === c ? "bg-slate-900 text-white shadow-md dark:bg-amber-500 dark:text-slate-950" : "border border-border bg-card text-foreground hover:border-amber-500"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-3xl gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Votre nom</label>
            <input value={buyer.name} onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} placeholder="Ex. Jean Kamga"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Votre téléphone</label>
            <input value={buyer.phone} onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })} placeholder="+237 6XX XX XX XX"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-amber-500" />
          </div>
          <p className="text-xs text-muted-foreground sm:text-right">Vos infos préremplissent le message WhatsApp.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <div key={p.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform hover:-translate-y-1">
              <div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                {p.image_url
                  ? <img src={p.image_url} alt={p.name} loading="lazy" className="h-full w-full object-contain p-3" />
                  : <ShoppingBag className="h-16 w-16 text-slate-400" />}
                {p.badge && <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-950">{p.badge}</span>}
              </div>
              <h3 className="mt-4 text-base font-bold">{p.name}</h3>
              {p.description && <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>}
              <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-semibold">
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-700 dark:text-slate-300">{p.category}</span>
                {p.warranty && <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-600">Garantie {p.warranty}</span>}
              </div>
              <div className="mt-4 flex items-end justify-between gap-2">
                <span className="text-lg font-black text-amber-600 dark:text-amber-400">{p.price ?? "Sur devis"}</span>
              </div>
              <a href={waLink(buildOrderMsg(p))} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700">
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

/* ---------------- WhatsApp Channel Section ---------------- */
function WhatsAppChannel() {
  return (
    <section id="canal" className="relative overflow-hidden bg-slate-950 py-16 text-slate-100 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D366]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#25D366]">
            <Radio className="h-3.5 w-3.5 animate-pulse" /> Direct du terrain
          </span>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Rejoignez la Chaîne <span className="text-[#25D366]">WhatsApp EDSOLAR</span>
          </h2>
          <p className="mt-4 text-sm text-slate-400 sm:text-lg">
            Suivez nos équipes au quotidien : vidéos d'installations, conseils techniques, arrivages de matériel et retours d'expérience.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur transition-all hover:border-[#25D366]/50 hover:bg-slate-900">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366] transition-transform group-hover:scale-110">
              <Video className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">Vidéos d'installations</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Découvrez nos chantiers en direct à Yaoundé et dans toutes les régions du Cameroun.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur transition-all hover:border-[#25D366]/50 hover:bg-slate-900">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366] transition-transform group-hover:scale-110">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">Photos & Matériel</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Présentation détaillée des derniers onduleurs, batteries lithium et panneaux réceptionnés.
            </p>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur transition-all hover:border-[#25D366]/50 hover:bg-slate-900 sm:col-span-2 md:col-span-1">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366] transition-transform group-hover:scale-110">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">Offres Exclusives</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Recevez les promotions et remises réservées uniquement aux membres de la chaîne.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 p-6 shadow-2xl backdrop-blur sm:p-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-lg sm:text-xl font-bold text-white">Près de 1 000 abonnés nous suivent !</p>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">Abonnement 100% gratuit, rapide et confidentiel.</p>
            </div>
            <a href={WA_CHANNEL_URL} target="_blank" rel="noreferrer"
               className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-slate-950 shadow-lg transition-all hover:scale-105 hover:bg-[#20ba59]">
              <MessageCircle className="h-5 w-5 fill-slate-950 text-[#25D366]" /> Suivre la Chaîne
            </a>
          </div>
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
    <section className="py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Pourquoi nous choisir ?" title="La confiance de centaines de clients"
          description="Une expertise 100% locale, au service du Cameroun et de toute l'Afrique Centrale 🌍." />
        <div className="mt-12 grid gap-4 grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5 sm:p-6 text-center shadow-sm transition-transform hover:-translate-y-1">
              <div className="mx-auto grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-amber-500/10 text-amber-600">
                <s.icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">{s.value}</div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          {["Normes IEC 61215", "ISO 9001", "Garantie 25 ans", "Ingénieurs certifiés", "Support 7j/7"].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" /> {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Realisations ---------------- */
const STATIC_GALLERY = [
  { src: gal1, title: "Installation onduleur & batterie Lithium", loc: "Yaoundé" },
  { src: gal2, title: "Équipe technique EDSOLAR en intervention", loc: "Tradex Olembe" },
  { src: gal3, title: "Tableau électrique & protections solaires", loc: "Yaoundé" },
];

function Realisations() {
  const [extra, setExtra] = useState<{ src: string; title: string; loc: string }[]>([]);
  useEffect(() => {
    supabase.from("gallery_photos").select("url, caption").order("sort_order").order("created_at", { ascending: false })
      .then(({ data }) => setExtra((data ?? []).map((p) => ({ src: p.url, title: p.caption ?? "Réalisation EDSOLAR", loc: "Cameroun" }))));
  }, []);
  const items = [...extra, ...STATIC_GALLERY];
  return (
    <section id="realisations" className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Nos Réalisations" title="Projets récents au Cameroun"
          description="Découvrez nos installations récentes chez les particuliers et les entreprises." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((g, i) => (
            <figure key={`${g.src}-${i}`} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-transform hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                {g.src ? (
                  <img src={g.src} alt={g.title} width={1200} height={800} loading="lazy"
                       className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">Photo indisponible</div>
                )}
              </div>
              <figcaption className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-bold">{g.title}</p>
                  <p className="text-xs text-muted-foreground">{g.loc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-amber-500 shrink-0" />
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
    <section id="apropos" className="py-16 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">À propos</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight">
            EDSOLAR — votre partenaire solaire au Cameroun & en Afrique Centrale
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
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
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <img src={teamPortrait} alt="Technicien EDSOLAR" className="col-span-2 max-h-[420px] sm:max-h-[520px] w-full rounded-2xl object-cover" loading="lazy" />
          <img src={gal1} alt="Installation EDSOLAR" className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
          <img src={gal3} alt="Tableau électrique" className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
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
    <section id="contact" className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Contact" title="Parlons de votre projet solaire"
          description="Remplissez le formulaire ou appelez-nous — un expert vous répond sous 24h." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <ContactCard icon={MapPin} title="Siège social" lines={["Tradex Olembe", "Yaoundé, Cameroun"]} />
            <ContactCard icon={Leaf} title="Zone d'intervention" lines={["Tout le Cameroun", "& Afrique Centrale"]} />
            <ContactCard icon={Phone} title="Téléphone / WhatsApp" lines={["+237 650544444"]} href={`tel:${PHONE}`} />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <iframe title="EDSOLAR Yaoundé" className="h-56 w-full"
                src="https://www.google.com/maps?q=Tradex+Olembe+Yaounde&output=embed" loading="lazy" />
            </div>
          </div>
          <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-5 sm:p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nom complet" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="Téléphone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required type="tel" />
              <Field label="Quartier / Ville" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="Ex: Bastos, Yaoundé" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Type de projet</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-amber-500">
                  <option>Maison</option><option>Commerce</option><option>Industrie</option><option>Autre</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Zone d'intervention</label>
                <select value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-amber-500">
                  <option>Cameroun</option><option>Afrique centrale</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Besoins spécifiques</label>
                <input type="text" value={form.needs} onChange={(e) => setForm({ ...form, needs: e.target.value })}
                  placeholder="Ex: pompage, climatisation, bureaux, hangar..."
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-amber-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message</label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Décrivez brièvement votre besoin..."
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-amber-500" />
              </div>
            </div>
            <button type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-emerald-700 sm:w-auto">
              <Send className="h-4 w-4" /> Envoyer sur WhatsApp
            </button>
            {sent && <p className="mt-3 text-sm text-emerald-600 font-semibold">Merci ! Votre message a été préparé sur WhatsApp.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, title, lines, href }: { icon: any; title: string; lines: string[]; href?: string }) {
  const inner = (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform hover:-translate-y-1">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-600">
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
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-amber-500" />
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-2">
          <a href="/" className="inline-flex items-center gap-3 transition-opacity hover:opacity-90" aria-label="Retour à l'accueil">
            <img src={logo} alt="EDSOLAR Énergie Cameroun" className="h-12 w-12 rounded-xl bg-white object-contain p-1 shadow-md" />
            <div>
              <p className="text-lg font-black text-white">EDSOLAR</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-amber-400 font-bold">Énergie Cameroun</p>
            </div>
          </a>
          <p className="mt-4 max-w-md text-sm text-slate-400">
            L'énergie propre pour un avenir durable. Installation, maintenance et vente d'équipements solaires au Cameroun.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((I, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-slate-300 transition-colors hover:bg-amber-500 hover:text-slate-950">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-amber-400">Navigation</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {NAV_MOBILE.map((n) => <li key={n.href}><a href={n.href} className="hover:text-amber-400 transition-colors">{n.label}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-amber-400">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-amber-400" /> Tradex Olembe, Yaoundé, Cameroun</li>
            <li className="flex gap-2"><Leaf className="h-4 w-4 shrink-0 text-emerald-400" /> Cameroun & Afrique Centrale</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-amber-400" /> +237 650544444</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-900 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p>© 2026 Bimedia Connect Agency. Tous droits réservés.</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="/mentions-legales" className="hover:text-amber-400">Mentions légales</a>
            <a href="/confidentialite" className="hover:text-amber-400">Confidentialité</a>
            <a href="/cookies" className="hover:text-amber-400">Cookies</a>
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
       className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 sm:px-5 sm:py-3.5 font-bold text-slate-950 shadow-2xl transition-transform hover:scale-105"
       aria-label="Contacter sur WhatsApp">
      <MessageCircle className="h-5 w-5 fill-slate-950" />
      <span className="hidden sm:inline text-sm">Chat WhatsApp</span>
      <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-amber-400 text-[10px] font-black text-slate-950 animate-pulse">1</span>
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
      className="fixed bottom-20 sm:bottom-24 right-5 sm:right-6 z-50 grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-xl transition-transform hover:scale-110">
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ---------------- Shared ---------------- */
function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{eyebrow}</span>
      <h2 className="mt-2.5 text-2xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">{title}</h2>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">{description}</p>
    </div>
  );
}

/* ---------------- Kits ---------------- */
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
    <section id="kits" className="py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Nos Kits" title="Des solutions solaires prêtes à l'emploi"
          description="Nos kits phares, sélectionnés pour les besoins réels des foyers et commerces camerounais." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((k) => (
            <article key={k.id} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-transform hover:-translate-y-1">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                {k.image_url ? (
                  <img src={k.image_url} alt={k.title} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <div className="grid h-full w-full place-items-center">
                    <Package className="h-16 w-16 text-slate-400" />
                  </div>
                )}
                {k.price && (
                  <span className="absolute right-3 top-3 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white shadow">
                    {k.price}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">{k.subtitle}</p>
                <h3 className="mt-1 text-xl font-black">{k.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{k.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {(k.features ?? []).map((f: string) => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {f}</li>
                  ))}
                </ul>
                <a href={waLink(`Bonjour EDSOLAR, je suis intéressé par le ${k.title} (${k.price ?? ""}).`)} target="_blank" rel="noreferrer"
                   className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-amber-400">
                  <MessageCircle className="h-4 w-4 fill-slate-950" /> Demander ce kit
                </a>
              </div>
            </article>
          ))}
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
    <section id="avis" className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Avis clients" title="Partagez votre expérience EDSOLAR"
          description="Votre satisfaction compte. Laissez un avis — il sera publié après validation de notre équipe." />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <form onSubmit={submit} className="h-fit rounded-3xl border border-border bg-card p-5 sm:p-8 shadow-sm">
            <p className="text-sm font-bold">Laisser un avis</p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nom</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-amber-500" />
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
                      <Star className={`pointer-events-none h-7 w-7 sm:h-8 sm:w-8 ${n <= (hoverRating || form.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-muted-foreground">{form.rating}/5</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Votre commentaire</label>
                <textarea rows={4} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required
                  className="mt-1 w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-amber-500" />
              </div>
              <button disabled={busy} className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800 disabled:opacity-60 dark:bg-amber-500 dark:text-slate-950">
                {busy ? "Envoi…" : "Publier mon avis"}
              </button>
              {sent && <p className="text-sm text-emerald-600 font-semibold">Merci ! Votre avis sera publié après validation.</p>}
            </div>
          </form>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.length === 0 && (
              <p className="col-span-full rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Soyez le premier à partager votre expérience !
              </p>
            )}
            {items.map((r) => (
              <div key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
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
