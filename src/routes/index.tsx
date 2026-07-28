import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Sun, Leaf, Phone, MapPin, MessageCircle, Menu, X, ArrowRight,
  Wrench, ShoppingBag, ClipboardCheck, ShieldCheck, Battery,
  Zap, Cpu, Tv, Refrigerator, Snowflake, Lightbulb, WashingMachine,
  Laptop, Fan, Microwave, CheckCircle2, Star, Award, Clock, Users,
  Facebook, Instagram, Linkedin, Send, Package, Search, ArrowUp,
  Sparkles, Globe, ZoomIn, Edit2, Save, Check, AlertTriangle, Mail, Handshake, Heart, Smile, Utensils, Stethoscope, Car, Home,
  Compass, Play, Youtube
} from "lucide-react";

import logo from "@/assets/edsolar-logo-new.jpeg";
import hero from "@/assets/install-panels.jpeg";

// Logos Partenaires & Paiement
import sakoLogo from "@/assets/SAKO.png";
import felicityLogo from "@/assets/Felicity.png";
import cworthLogo from "@/assets/Cworth.png";
import growattLogo from "@/assets/Growarth.png";
import longiLogo from "@/assets/Longi.png";
import momoLogo from "@/assets/momo.png";
import orangeMoneyLogo from "@/assets/OrangeMoney.png";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EDSOLAR Énergie Cameroun — Installation Solaire à Yaoundé & Afrique Centrale" },
      { name: "description", content: "Solutions anti-délestage Eneo, installation de panneaux solaires, batteries Lithium et matériel certifié à Yaoundé." },
    ],
  }),
  component: Index,
});

const PHONE = "+237650544444";
const EMAIL = "edsolarcam@gmail.com";
const WA = `https://wa.me/${PHONE.replace("+", "")}`;
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@EDSOLAR237";
const YOUTUBE_CHANNEL_ID = "UCCfnDu6TV2B-_NO6E_tWm7Q";

const waLink = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;

type Lang = "fr" | "en";

const PARTNERS_DATA = [
  { name: "SAKO", logo: sakoLogo, desc: "Onduleurs & Systèmes Solaires", badge: "Tier 1 Certified" },
  { name: "Felicity Solar", logo: felicityLogo, desc: "Batteries Lithium & Onduleurs", badge: "LiFePO4 Pro" },
  { name: "Cworth Energy", logo: cworthLogo, desc: "Composants & Protections", badge: "IEC Standard" },
  { name: "Growatt", logo: growattLogo, desc: "Onduleurs Hybrides Intelligents", badge: "Smart Energy" },
  { name: "LONGi Solar", logo: longiLogo, desc: "Panneaux Photovoltaïques", badge: "World Leader" },
];

const TRANSLATIONS = {
  fr: {
    navServices: "Services",
    navPartners: "Partenaires",
    navKits: "Kits",
    navBoutique: "Boutique",
    navSimulator: "Simulateur Devis",
    navRealisations: "Réalisations",
    navHome: "Accueil",
    navYouTube: "Vidéos",
    navReviews: "Avis clients",
    navContact: "Contact",
    btnQuote: "Devis gratuit",
    heroTag: "Fini les délestages Eneo intempestifs",
    heroTitle1: "L'Énergie Solaire ",
    heroTitle2: "Autonome & Écologique",
    heroTitle3: " pour Votre Confort",
    heroDesc: "Assurez une électricité 24h/24 à la maison et au bureau. Équipements certifiés Tier 1 à Yaoundé et dans toute l'Afrique Centrale.",
    heroSimulateBtn: "Simuler vos besoins",
    heroExpertBtn: "Contacter un expert",
    heroStat1: "+500 installations réussies",
    heroStat2: "Garantie 25 ans",
    heroStat3: "Cameroun & Afrique Centrale",
    heroCardTitle: "EDSOLAR Yaoundé",
    heroCardSub: "Contact direct",
    partnersEyebrow: "Confiance & Qualité",
    partnersTitle: "Nos Partenaires Officiels",
    partnersDesc: "Collaborations directes avec les leaders photovoltaïques mondiaux.",
    servicesEyebrow: "Nos Services",
    servicesTitle: "Une expertise complète en énergie solaire",
    servicesDesc: "De l'audit à la mise en service, EDSOLAR vous accompagne.",
    s1Title: "Installation Solaire Sur-Mesure",
    s1Desc: "Systèmes autonomes (Off-Grid) et hybrides pour résidences et entreprises.",
    s2Title: "Maintenance & Dépannage",
    s2Desc: "Inspection technique, nettoyage et remplacement d'onduleurs/batteries.",
    s3Title: "Vente d'Équipements Solaires",
    s3Desc: "Panneaux photovoltaïques, onduleurs hybrides et batteries Lithium/Gel.",
    s4Title: "Audit & Conseil Énergétique",
    s4Desc: "Dimensionnement précis par nos ingénieurs qualifiés.",
    learnMore: "En savoir plus",
    simEyebrow: "Simulateur Devis",
    simTitle: "Estimez votre installation en 1 minute",
    simDesc: "Sélectionnez vos appareils. Obtenez immédiatement votre puissance recommandée.",
    simResultTitle: "Résultats en temps réel",
    simPeakPower: "Puissance de pointe",
    simDailyCons: "Consommation journalière",
    simRecSystem: "Système recommandé",
    simLithiumBatt: "Batteries lithium",
    simPanels: "Panneaux solaires 450W",
    simBudget: "Budget estimatif",
    simSendWA: "Recevoir l'estimation sur WhatsApp",
    simNote: "Estimation indicative — nos ingénieurs valident le dimensionnement final.",
    shopEyebrow: "Boutique",
    shopTitle: "Équipements solaires certifiés",
    shopDesc: "Panneaux, batteries Lithium et onduleurs — zéro contrefaçon.",
    shopSearchPlaceholder: "Rechercher un équipement...",
    shopSortFeatured: "Trier : à la une",
    shopSortPriceAsc: "Prix croissant",
    shopSortPriceDesc: "Prix décroissant",
    shopSortPopularity: "Popularité",
    shopSortWarranty: "Garantie",
    shopOrderWA: "Commander via WhatsApp",
    shopNoProduct: "Aucun équipement ne correspond.",
    channelTag: "Vidéos du terrain",
    channelTitle1: "Rejoignez la Chaîne ",
    channelTitle2: "YouTube EDSOLAR",
    channelDesc: "Découvrez nos réalisations en vidéo et démonstrations de matériel.",
    channelSubscribers: "Suivez nos vidéos exclusives sur YouTube !",
    channelSubNote: "Abonnez-vous gratuitement à la chaîne @EDSOLAR237",
    channelBtn: "S'abonner sur YouTube",
    trustEyebrow: "Pourquoi nous choisir ?",
    trustTitle: "La confiance de centaines de clients",
    trustDesc: "Une expertise 100% locale, au service du Cameroun 🌍.",
    trustStat1: "Installations réalisées",
    trustStat2: "Satisfaction client",
    trustStat3: "Intervention à Yaoundé",
    trustStat4: "Années d'expertise",
    realEyebrow: "Nos Réalisations",
    realTitle: "Projets récents au Cameroun",
    realDesc: "Découvrez nos installations récentes chez les particuliers et entreprises.",
    reviewsEyebrow: "Avis clients",
    reviewsTitle: "Partagez votre expérience EDSOLAR",
    reviewsDesc: "Votre satisfaction compte.",
    reviewsLeaveTitle: "Laisser un avis",
    reviewsName: "Nom",
    reviewsRating: "Note",
    reviewsComment: "Votre commentaire",
    reviewsSubmit: "Publier mon avis",
    reviewsSending: "Envoi…",
    reviewsSuccess: "Merci ! Votre avis sera publié après validation.",
    reviewsEmpty: "Soyez le premier à partager votre expérience !",
    aboutEyebrow: "Notre Vision & Mission",
    aboutTitle: "EDSOLAR — Un engagement pour le bien-être durable",
    aboutPillarsText: "EDSOLAR repose sur 4 Piliers : Gratitude, Abondance, Amour et Compassion.",
    aboutMissionText: "Aider à accéder à l'énergie solaire à moindre coût.",
    aboutVisionText: "Bâtir un avenir sans délestage avec une énergie propre et accessible.",
    aboutPresenceText: "Depuis 2017, nous déployons notre savoir-faire sur tout le territoire camerounais.",
    aboutEcosystemTitle: "Un écosystème étendu au service du quotidien :",
    aboutConclusion: "EDSOLAR est une vision et un mouvement au service du bien-être.",
    contactEyebrow: "Contact",
    contactTitle: "Parlons de votre projet solaire",
    contactDesc: "Remplissez le formulaire, nous vous répondons sous 24h.",
    contactHeadquarters: "Siège social",
    contactZone: "Zone d'intervention",
    contactPhone: "Téléphone / WhatsApp",
    contactEmail: "Adresse E-mail",
    formName: "Nom complet",
    formPhone: "Téléphone",
    formLocation: "Quartier / Ville",
    formProjectType: "Type de projet",
    formNeeds: "Besoins spécifiques",
    formMessage: "Message",
    formSubmit: "Envoyer sur WhatsApp",
    formSuccess: "Merci ! Message préparé sur WhatsApp.",
    footerNav: "Navigation",
    footerContact: "Contact",
    footerPartners: "Partenaires Certifiés",
    footerRights: "© 2026 Bimedia Connect Agency. Tous droits réservés.",
    footerLegal: "Mentions légales",
    footerPrivacy: "Confidentialité",
    footerCookies: "Cookies",
  }
};

function Index() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#386b34] selection:text-white">
      <Header lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <Partners t={t} />
      <Services t={t} lang={lang} />
      <Kits t={t} lang={lang} />
      <Calculator t={t} lang={lang} />
      <Products t={t} lang={lang} />
      <QualityComparison lang={lang} />
      <DiasporaSection lang={lang} />
      <YouTubeSection t={t} />
      <Trust t={t} />
      <Realisations t={t} lang={lang} />
      <Reviews t={t} />
      <About t={t} />
      <Contact t={t} lang={lang} />
      <Footer t={t} />
      <FloatingWhatsApp lang={lang} />
      <ScrollToTop />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: typeof TRANSLATIONS["fr"] }) {
  const [open, setOpen] = useState(false);

  const navDesktop = [
    { href: "#partenaires", label: t.navPartners },
    { href: "#services", label: t.navServices },
    { href: "#kits", label: t.navKits },
    { href: "#boutique", label: t.navBoutique },
    { href: "#calculateur", label: t.navSimulator },
    { href: "#realisations", label: t.navRealisations },
    { href: "#videos", label: t.navYouTube },
    { href: "#apropos", label: "Vision" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-white/90 backdrop-blur-md dark:border-emerald-900/30 dark:bg-[#20401d]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <a href="#accueil" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="EDSOLAR" className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white object-contain p-0.5 border border-slate-100" />
          <span className="flex flex-col leading-tight">
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">EDSOLAR</span>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-[#386b34]">Énergie Cameroun</span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {navDesktop.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-semibold text-slate-700 transition-colors hover:text-[#386b34] dark:text-slate-200">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex shrink-0">
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
            <button onClick={() => setLang("fr")} className={`rounded-full px-2.5 py-1 text-xs font-bold ${lang === "fr" ? "bg-[#386b34] text-white" : "text-slate-600 dark:text-slate-400"}`}>FR</button>
            <button onClick={() => setLang("en")} className={`rounded-full px-2.5 py-1 text-xs font-bold ${lang === "en" ? "bg-[#386b34] text-white" : "text-slate-600 dark:text-slate-400"}`}>EN</button>
          </div>
          <a href={waLink("Bonjour EDSOLAR, je souhaite un devis gratuit.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#386b34] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#2e582b]">
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>{t.btnQuote}</span>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  return (
    <section id="accueil" className="relative isolate overflow-hidden">
      <img src={hero} alt="Panneaux EDSOLAR" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#234d20]/95 via-[#1a3818]/90 to-[#234d20]/80" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-32 lg:grid-cols-[1.15fr_1fr] lg:py-40">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-[#386b34]/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200 backdrop-blur">
            <Zap className="h-3.5 w-3.5 text-emerald-300 fill-emerald-300" /> {t.heroTag}
          </span>
          <h1 className="mt-6 text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t.heroTitle1}<span className="text-emerald-300">{t.heroTitle2}</span>{t.heroTitle3}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-100/90 sm:text-lg">{t.heroDesc}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#calculateur" className="inline-flex items-center gap-2 rounded-full bg-[#386b34] px-6 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-[#4a8344]">
              <Zap className="h-4 w-4 fill-white" /> {t.heroSimulateBtn}
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
              <Phone className="h-4 w-4" /> {t.heroExpertBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Partners ---------------- */
function Partners({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <section id="partenaires" className="border-y border-emerald-900/10 bg-card py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#386b34] flex items-center justify-center gap-1.5"><Handshake className="h-4 w-4" /> {t.partnersEyebrow}</span>
          <h2 className="mt-2 text-2xl font-black sm:text-3xl">{t.partnersTitle}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PARTNERS_DATA.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-5 text-center shadow-sm dark:bg-slate-900/80">
              <img src={partner.logo} alt={partner.name} className="h-12 object-contain" />
              <h3 className="mt-3 text-sm font-extrabold">{partner.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */
function Services({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  const SERVICES = [
    { icon: Sun, title: t.s1Title, desc: t.s1Desc },
    { icon: Wrench, title: t.s2Title, desc: t.s2Desc },
    { icon: ShoppingBag, title: t.s3Title, desc: t.s3Desc },
    { icon: ClipboardCheck, title: t.s4Title, desc: t.s4Desc },
  ];
  return (
    <section id="services" className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.servicesEyebrow} title={t.servicesTitle} description={t.servicesDesc} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#386b34]/10 text-[#386b34]">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Kits ---------------- */
function Kits({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("kits").select("*").order("sort_order").then(({ data }) => setItems(data ?? []));
  }, []);

  return (
    <section id="kits" className="py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.navKits} title="Solutions Solaires Clé en Main" description={t.servicesDesc} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((k) => (
            <div key={k.id} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm">
              {k.image_url && <img src={k.image_url} alt={k.title} className="h-44 w-full object-contain mb-4 rounded-xl bg-slate-50" />}
              <h3 className="text-xl font-black">{k.title}</h3>
              <p className="mt-1 text-xs font-bold text-[#386b34] uppercase">{k.subtitle}</p>
              <p className="mt-3 text-sm text-muted-foreground">{k.description}</p>
              <div className="mt-4 text-2xl font-black text-[#386b34]">{k.price}</div>
              <a href={waLink(`Bonjour EDSOLAR, je suis intéressé par le ${k.title}`)} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#386b34] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#2e582b]">
                <MessageCircle className="h-4 w-4" /> Commander ce kit
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Calculator ---------------- */
function Calculator({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  return (
    <section id="calculateur" className="py-16 bg-slate-50 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <SectionHeader eyebrow={t.simEyebrow} title={t.simTitle} description={t.simDesc} />
      </div>
    </section>
  );
}

/* ---------------- Products / Boutique avec Sélecteur de Variantes ---------------- */
type VariantOption = { label: string; price: number };

function parsePriceNumber(str: string): number {
  const n = Number(str.replace(/\D/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function ProductCard({ p, lang, t }: { p: any; lang: Lang; t: typeof TRANSLATIONS["fr"] }) {
  const variants: VariantOption[] = useMemo(() => {
    if (!p.price) return [{ label: "Standard", price: p.price_amount || 0 }];
    const rawParts = p.price.split("-").map((s: string) => s.trim());
    if (rawParts.length <= 1) {
      return [{ label: "Standard", price: p.price_amount || parsePriceNumber(p.price) }];
    }
    
    const labels = p.name.includes("25.6V") || p.name.includes("Li-SUN") 
      ? ["100Ah (2.56kWh)", "200Ah (5.12kWh)", "300Ah (7.68kWh)"]
      : rawParts.map((_, idx) => `Option ${idx + 1}`);

    return rawParts.map((part: string, idx: number) => ({
      label: labels[idx] || `Option ${idx + 1}`,
      price: parsePriceNumber(part),
    }));
  }, [p]);

  const [selectedVariant, setSelectedVariant] = useState<VariantOption>(variants[0]);

  const formattedPrice = selectedVariant.price > 0 
    ? new Intl.NumberFormat("fr-FR").format(selectedVariant.price) + " FCFA" 
    : p.price || "Sur devis";

  const orderMsg = lang === "fr"
    ? `Bonjour EDSOLAR, je souhaite commander :\n• Produit : ${p.name}\n• Variante : ${selectedVariant.label}\n• Prix : ${formattedPrice}`
    : `Hello EDSOLAR, I want to order:\n• Product: ${p.name}\n• Variant: ${selectedVariant.label}\n• Price: ${formattedPrice}`;

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
      <div>
        <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">
          {p.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-[#386b34] px-3 py-1 text-[10px] font-bold uppercase text-white z-10">
              {p.badge}
            </span>
          )}
          {p.image_url ? (
            <img src={p.image_url} alt={p.name} className="h-full w-full object-contain" />
          ) : (
            <ShoppingBag className="h-16 w-16 text-slate-400" />
          )}
        </div>

        <h3 className="text-base font-extrabold text-foreground">{p.name}</h3>
        {p.description && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>}

        <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-semibold">
          <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-700 dark:text-slate-300">{p.category}</span>
          {p.warranty && <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 text-[#386b34]">{p.warranty}</span>}
        </div>

        {/* Puces de Variantes */}
        {variants.length > 1 && (
          <div className="mt-4 pt-3 border-t border-border">
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Sélectionner la capacité :</p>
            <div className="flex flex-wrap gap-1.5">
              {variants.map((v) => (
                <button
                  key={v.label}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  className={`rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
                    selectedVariant.label === v.label
                      ? "bg-[#386b34] text-white shadow-sm"
                      : "border border-border bg-background text-foreground hover:bg-secondary"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-3 pt-3 border-t border-border">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Prix :</p>
          <span className="text-2xl font-black text-[#386b34] dark:text-emerald-400">{formattedPrice}</span>
        </div>

        <a
          href={waLink(orderMsg)}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#386b34] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#2d5629]"
        >
          <MessageCircle className="h-4 w-4" />
          {t.shopOrderWA}
        </a>
      </div>
    </div>
  );
}

function Products({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("products").select("*").order("sort_order").order("created_at", { ascending: false })
      .then(({ data }) => setItems(data ?? []));
  }, []);

  return (
    <section id="boutique" className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.shopEyebrow} title={t.shopTitle} description={t.shopDesc} />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} lang={lang} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Realisations ---------------- */
function Realisations({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("gallery_photos").select("*").eq("category", "realisations").order("sort_order").then(({ data }) => setItems(data ?? []));
  }, []);

  return (
    <section id="realisations" className="py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.realEyebrow} title={t.realTitle} description={t.realDesc} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card">
              <img src={p.url} alt={p.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
              <div className="p-3">
                <p className="font-bold text-sm">{p.caption}</p>
                <p className="text-xs text-emerald-600 flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.location || "Cameroun"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About (Avec Section "En Direct du Terrain") ---------------- */
function About({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  const [terrainPhotos, setTerrainPhotos] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("gallery_photos").select("*").eq("category", "terrain").order("sort_order").then(({ data }) => setTerrainPhotos(data ?? []));
  }, []);

  return (
    <section id="apropos" className="py-16 sm:py-28 bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#386b34]">{t.aboutEyebrow}</span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-black">{t.aboutTitle}</h2>
            <p className="mt-4 text-sm text-muted-foreground">{t.aboutVisionText}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center justify-between">
              <span>En direct du terrain — Nos équipes à l'œuvre</span>
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              {terrainPhotos.map((img) => (
                <div key={img.id} className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-slate-100">
                  <img src={img.url} alt={img.caption ?? ""} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/50 p-2 flex flex-col justify-end text-white text-[10px] opacity-0 hover:opacity-100 transition-opacity">
                    <p className="font-bold truncate">{img.caption}</p>
                    <p className="text-emerald-300 text-[8px]">📍 {img.location || "Cameroun"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Quality Comparison ---------------- */
function QualityComparison({ lang }: { lang: Lang }) {
  return (
    <section id="qualite" className="py-16 bg-slate-50 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Sécurité & Transparence" title="Pourquoi choisir EDSOLAR ?" description="Matériel certifié Tier 1 vs produits contrefaits." />
      </div>
    </section>
  );
}

/* ---------------- Diaspora ---------------- */
function DiasporaSection({ lang }: { lang: Lang }) {
  return (
    <section id="diaspora" className="bg-[#234d20] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-2xl font-black">Offre Diaspora Camerounaise</h2>
        <p className="mt-2 text-sm text-emerald-100">Équipez vos proches au pays avec paiement sécurisé à distance.</p>
      </div>
    </section>
  );
}

/* ---------------- YouTube ---------------- */
function YouTubeSection({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <section id="videos" className="bg-[#1a3818] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <Youtube className="mx-auto h-10 w-10 text-emerald-400" />
        <h2 className="mt-2 text-2xl font-black">{t.channelTitle1} {t.channelTitle2}</h2>
        <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#386b34] px-5 py-2.5 text-xs font-bold text-white">
          <Youtube className="h-4 w-4" /> {t.channelBtn}
        </a>
      </div>
    </section>
  );
}

/* ---------------- Trust ---------------- */
function Trust({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <section className="py-12 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#386b34]">{t.trustEyebrow}</p>
        <h2 className="mt-1 text-2xl font-black">{t.trustTitle}</h2>
      </div>
    </section>
  );
}

/* ---------------- Reviews ---------------- */
function Reviews({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <section id="avis" className="py-16 bg-slate-50 dark:bg-slate-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.reviewsEyebrow} title={t.reviewsTitle} description={t.reviewsDesc} />
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */
function Contact({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  return (
    <section id="contact" className="py-16 sm:py-28 bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.contactEyebrow} title={t.contactTitle} description={t.contactDesc} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
          <div className="p-4 rounded-2xl border border-border"><MapPin className="mx-auto h-6 w-6 text-[#386b34]" /><p className="mt-2 text-xs font-bold">Yaoundé, Cameroun</p></div>
          <div className="p-4 rounded-2xl border border-border"><Phone className="mx-auto h-6 w-6 text-[#386b34]" /><p className="mt-2 text-xs font-bold">+237 650544444</p></div>
          <div className="p-4 rounded-2xl border border-border"><Mail className="mx-auto h-6 w-6 text-[#386b34]" /><p className="mt-2 text-xs font-bold">{EMAIL}</p></div>
          <div className="p-4 rounded-2xl border border-border"><Leaf className="mx-auto h-6 w-6 text-[#386b34]" /><p className="mt-2 text-xs font-bold">Afrique Centrale</p></div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <footer className="border-t border-emerald-900/40 bg-[#1d3d19] text-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="EDSOLAR" className="h-10 w-10 rounded-xl bg-white p-1" />
          <span className="font-bold text-sm">EDSOLAR Énergie Cameroun</span>
        </div>
        <p className="text-xs text-emerald-200/70">{t.footerRights}</p>
      </div>
    </footer>
  );
}

/* ---------------- Floating WhatsApp & ScrollToTop ---------------- */
function FloatingWhatsApp({ lang }: { lang: Lang }) {
  return (
    <a href={waLink("Bonjour EDSOLAR, j'aimerais plus d'informations.")} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-bold text-slate-950 shadow-2xl">
      <MessageCircle className="h-5 w-5 fill-slate-950" />
      <span className="text-sm">Chat WhatsApp</span>
    </a>
  );
}

function ScrollToTop() {
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-20 right-5 z-50 grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground shadow-xl">
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-bold uppercase tracking-widest text-[#386b34]">{eyebrow}</span>
      <h2 className="mt-2 text-2xl font-black sm:text-4xl">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
