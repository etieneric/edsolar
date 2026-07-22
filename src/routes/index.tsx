import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Sun, Leaf, Phone, MapPin, MessageCircle, Menu, X, ArrowRight,
  Wrench, ShoppingBag, ClipboardCheck, ShieldCheck, Battery,
  Zap, Cpu, Tv, Refrigerator, Snowflake, Lightbulb, WashingMachine,
  Laptop, Fan, Microwave, CheckCircle2, Star, Award, Clock, Users,
  Facebook, Instagram, Linkedin, Send, Quote,
} from "lucide-react";
import logo from "@/assets/edsolar-logo.asset.json";
import hero from "@/assets/hero-installers.jpg";
import gal1 from "@/assets/gallery-1.jpg";
import gal2 from "@/assets/gallery-2.jpg";
import gal3 from "@/assets/gallery-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EDSOLAR Énergie Cameroun — Installation Solaire à Yaoundé" },
      { name: "description", content: "Installation de panneaux solaires, maintenance et vente d'équipements solaires à Yaoundé. Calculateur solaire, devis gratuit au +237 650-54-44-44." },
      { property: "og:title", content: "EDSOLAR — L'énergie propre pour un avenir durable" },
      { property: "og:description", content: "Systèmes solaires sur-mesure, maintenance et équipements de qualité au Cameroun." },
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
  { href: "#boutique", label: "Équipements" },
  { href: "#calculateur", label: "Calculateur" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#apropos", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Services />
      <Calculator />
      <Products />
      <Trust />
      <Realisations />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
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
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <Leaf className="h-5 w-5" />
          </span>
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
              <Phone className="h-4 w-4" /> Contacter un expert (+237 650-54-44-44)
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> +500 installations</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Garantie 25 ans</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Expertise 🇨🇲 & 🇺🇸</div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="ml-auto max-w-sm rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="EDSOLAR" className="h-14 w-14 rounded-xl bg-white object-contain p-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-white/70">Contactez-nous</p>
                <p className="text-lg font-bold">EDSOLAR Yaoundé</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> Tradex Olembe, Rue des pavés, Yaoundé</div>
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-accent" /> Holland, Michigan (USA)</div>
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-accent" /> +237 650-54-44-44</div>
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

  const { peakW, dailyWh, systemKva, batteryAh } = useMemo(() => {
    let peak = 0, daily = 0;
    for (const a of APPLIANCES) {
      const n = qty[a.id] ?? 0;
      peak += n * a.watts;
      daily += n * a.watts * a.hours;
    }
    const kva = Math.max(peak / 800, 0); // pf 0.8
    const ah = daily / 48 * 1.3; // 48V bank, 30% margin
    return { peakW: peak, dailyWh: daily, systemKva: kva, batteryAh: ah };
  }, [qty]);

  const msg = `Bonjour EDSOLAR,%0AVoici mon estimation solaire:%0A- Puissance de pointe: ${peakW} W%0A- Consommation journalière: ${dailyWh.toFixed(0)} Wh%0A- Système recommandé: ${systemKva.toFixed(2)} kVA%0A- Batterie 48V: ${batteryAh.toFixed(0)} Ah%0AMerci de me contacter pour un devis.`;

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
              <Metric icon={Cpu} label="Système recommandé" value={`${systemKva.toFixed(2)} kVA`} highlight />
              <Metric icon={Battery} label="Batterie 48V nécessaire" value={`${batteryAh.toFixed(0)} Ah`} />
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
  id: string; name: string; category: string; price: string; badge: string;
  desc: string; icon: any;
};
const CATEGORIES = ["Tous", "Panneaux", "Batteries", "Onduleurs", "Kits"];
const PRODUCTS: Product[] = [
  { id: "p1", name: "Panneau Mono 550W", category: "Panneaux", price: "125 000 FCFA", badge: "Garantie 25 ans", desc: "Monocristallin haut rendement, idéal résidentiel & commercial.", icon: Sun },
  { id: "p2", name: "Panneau Mono 450W", category: "Panneaux", price: "95 000 FCFA", badge: "Tier 1", desc: "Panneau performant pour installations moyennes.", icon: Sun },
  { id: "b1", name: "Batterie Lithium 200Ah 48V", category: "Batteries", price: "1 350 000 FCFA", badge: "LiFePO4 6000 cycles", desc: "Sécurité maximale, longue durée de vie, sans entretien.", icon: Battery },
  { id: "b2", name: "Batterie Gel 200Ah 12V", category: "Batteries", price: "185 000 FCFA", badge: "Sans entretien", desc: "Solution économique et fiable pour petits systèmes.", icon: Battery },
  { id: "o1", name: "Onduleur Hybride 5kVA 48V", category: "Onduleurs", price: "650 000 FCFA", badge: "MPPT intégré", desc: "Onduleur hybride avec régulateur solaire MPPT.", icon: Cpu },
  { id: "o2", name: "Onduleur Hybride 10kVA 48V", category: "Onduleurs", price: "1 250 000 FCFA", badge: "Parallélisable", desc: "Pour installations commerciales et industrielles.", icon: Cpu },
  { id: "k1", name: "Kit Solaire 3kVA Complet", category: "Kits", price: "2 450 000 FCFA", badge: "Clé en main", desc: "Panneaux + batteries + onduleur + accessoires + installation.", icon: Zap },
  { id: "k2", name: "Kit Solaire 5kVA Complet", category: "Kits", price: "3 950 000 FCFA", badge: "Installation incluse", desc: "Solution complète pour villa 4 pièces avec clim.", icon: Zap },
];

function Products() {
  const [cat, setCat] = useState("Tous");
  const list = cat === "Tous" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  return (
    <section id="boutique" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Boutique" title="Équipements solaires de qualité"
          description="Panneaux, batteries, onduleurs et kits complets — sélectionnés pour leur fiabilité." />
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${cat === c ? "bg-primary text-primary-foreground shadow-md" : "border border-border bg-card text-foreground hover:border-primary hover:text-primary"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <div key={p.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 glow-green">
              <div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                <p.icon className="h-16 w-16 text-primary" />
                <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase text-accent-foreground">{p.badge}</span>
              </div>
              <h3 className="mt-4 text-base font-bold">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex items-end justify-between gap-2">
                <span className="text-lg font-black text-primary">{p.price}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{p.category}</span>
              </div>
              <a href={waLink(`Bonjour EDSOLAR, je souhaite commander: ${p.name} (${p.price})`)} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark">
                <MessageCircle className="h-4 w-4" /> Commander via WhatsApp
              </a>
            </div>
          ))}
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
const TESTIMONIALS = [
  { name: "M. Nguema", role: "Villa à Odza", text: "Installation impeccable en 2 jours. Plus de coupures depuis 8 mois." },
  { name: "SARL Kribi Trade", role: "Commerce, Yaoundé", text: "Économies de 65% sur la facture ENEO. Équipe très professionnelle." },
  { name: "Mme Etoa", role: "Résidence Bastos", text: "Devis clair, matériel de qualité, service après-vente réactif." },
];

function Trust() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Pourquoi nous choisir ?" title="La confiance de centaines de clients"
          description="Expertise binationale Cameroun 🇨🇲 & USA 🇺🇸 pour des installations aux standards internationaux." />
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

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
              <Quote className="h-6 w-6 text-accent" />
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{t.text}"</p>
              <div className="mt-4">
                <p className="text-sm font-bold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
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
const GALLERY = [
  { src: gal1, title: "Maintenance panneaux", loc: "Yaoundé Centre" },
  { src: gal2, title: "Installation commerciale", loc: "Bastos" },
  { src: gal3, title: "Batterie Lithium & Onduleur", loc: "Odza" },
];

function Realisations() {
  return (
    <section id="realisations" className="bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Nos Réalisations" title="Projets récents au Cameroun"
          description="Découvrez nos installations récentes chez les particuliers et les entreprises." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {GALLERY.map((g) => (
            <figure key={g.title} className="group overflow-hidden rounded-2xl border border-border bg-card glow-green">
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
            EDSOLAR — un pont entre le Cameroun et l'expertise internationale
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Basés à <strong className="text-foreground">Yaoundé</strong> et à <strong className="text-foreground">Holland, Michigan (USA)</strong>, nous combinons une connaissance approfondie du terrain camerounais et l'exigence des standards nord-américains. Notre mission : rendre l'énergie solaire accessible, fiable et rentable pour chaque foyer et chaque entreprise.
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
          <img src={gal2} alt="" className="col-span-2 aspect-[16/9] w-full rounded-2xl object-cover" loading="lazy" />
          <img src={gal1} alt="" className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
          <img src={gal3} alt="" className="aspect-square w-full rounded-2xl object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", location: "", type: "Maison", message: "" });
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Bonjour EDSOLAR,%0ANom: ${form.name}%0ATéléphone: ${form.phone}%0AQuartier: ${form.location}%0AType: ${form.type}%0AMessage: ${form.message}`;
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
            <ContactCard icon={MapPin} title="Siège Yaoundé" lines={["Tradex Olembe", "Rue des pavés, Yaoundé, Cameroun"]} />
            <ContactCard icon={MapPin} title="Bureau USA" lines={["Holland, Michigan", "United States"]} />
            <ContactCard icon={Phone} title="Téléphone / WhatsApp" lines={["+237 650-54-44-44"]} href={`tel:${PHONE}`} />
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
          <div className="flex items-center gap-2">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <div>
              <p className="text-lg font-black">EDSOLAR</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/70">Énergie Cameroun</p>
            </div>
          </div>
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
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-accent" /> Tradex Olembe, Yaoundé</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-accent" /> Holland, Michigan (USA)</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-accent" /> +237 650-54-44-44</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/60 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} EDSOLAR Énergie Cameroun. Tous droits réservés.</p>
          <p>Fait avec ☀️ à Yaoundé</p>
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
