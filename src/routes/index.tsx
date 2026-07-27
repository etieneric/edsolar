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

type Lang = "fr" | "en";

const TRANSLATIONS = {
  fr: {
    navServices: "Services",
    navKits: "Kits",
    navBoutique: "Boutique",
    navSimulator: "Simulateur Devis",
    navRealisations: "Réalisations",
    navHome: "Accueil",
    navWhatsApp: "Chaîne WhatsApp",
    navReviews: "Avis clients",
    navContact: "Contact",
    btnQuote: "Devis gratuit",
    
    heroTag: "L'énergie propre pour un avenir durable",
    heroTitle1: "Passez à l'Énergie ",
    heroTitle2: "Solaire",
    heroTitle3: " avec EDSOLAR",
    heroDesc: "Installation de panneaux solaires, maintenance préventive et vente d'équipements de haute qualité à Yaoundé et dans tout le Cameroun.",
    heroSimulateBtn: "Simuler vos besoins énergétiques",
    heroExpertBtn: "Contacter un expert",
    heroStat1: "+500 installations",
    heroStat2: "Garantie 25 ans",
    heroStat3: "Cameroun & Afrique Centrale",
    heroCardTitle: "EDSOLAR Yaoundé",
    heroCardSub: "Contactez-nous",
    
    servicesEyebrow: "Nos Services",
    servicesTitle: "Une expertise complète en énergie solaire",
    servicesDesc: "De l'audit à la mise en service, EDSOLAR vous accompagne à chaque étape de votre transition énergétique.",
    s1Title: "Installation Solaire Sur-Mesure",
    s1Desc: "Systèmes autonomes (Off-Grid), hybrides et raccordés au réseau pour résidences, entreprises et industries.",
    s2Title: "Maintenance & Dépannage",
    s2Desc: "Inspection technique, nettoyage de panneaux, maintenance préventive et remplacement d'onduleurs/batteries.",
    s3Title: "Vente d'Équipements Solaires",
    s3Desc: "Panneaux photovoltaïques, onduleurs hybrides, batteries Lithium/Gel et régulateurs MPPT.",
    s4Title: "Audit & Conseil Énergétique",
    s4Desc: "Dimensionnement précis par nos ingénieurs qualifiés pour optimiser votre consommation.",
    learnMore: "En savoir plus",

    simEyebrow: "Simulateur Devis",
    simTitle: "Estimez votre installation solaire en 1 minute",
    simDesc: "Sélectionnez vos appareils. Obtenez immédiatement votre puissance recommandée et une estimation budgétaire.",
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
    shopTitle: "Équipements solaires de qualité",
    shopDesc: "Panneaux, batteries, onduleurs et kits complets — sélectionnés pour leur fiabilité.",
    shopSearchPlaceholder: "Rechercher un équipement (onduleur, batterie, panneau…)",
    shopSortFeatured: "Trier : à la une",
    shopSortPriceAsc: "Prix croissant",
    shopSortPriceDesc: "Prix décroissant",
    shopSortPopularity: "Popularité",
    shopSortWarranty: "Garantie (longue → courte)",
    shopNameLabel: "Votre nom",
    shopPhoneLabel: "Votre téléphone",
    shopInfoNote: "Vos infos préremplissent le message WhatsApp.",
    shopOrderWA: "Commander via WhatsApp",
    shopNoProduct: "Aucun équipement ne correspond à votre recherche.",

    channelTag: "Direct du terrain",
    channelTitle1: "Rejoignez la Chaîne ",
    channelTitle2: "WhatsApp EDSOLAR",
    channelDesc: "Suivez nos équipes au quotidien : vidéos d'installations, conseils techniques, arrivages de matériel et retours d'expérience.",
    c1Title: "Vidéos d'installations",
    c1Desc: "Découvrez nos chantiers en direct à Yaoundé et dans toutes les régions du Cameroun.",
    c2Title: "Photos & Matériel",
    c2Desc: "Présentation détaillée des derniers onduleurs, batteries lithium et panneaux réceptionnés.",
    c3Title: "Offres Exclusives",
    c3Desc: "Recevez les promotions et remises réservées uniquement aux membres de la chaîne.",
    channelSubscribers: "Près de 1 000 abonnés nous suivent !",
    channelSubNote: "Abonnement 100% gratuit, rapide et confidentiel.",
    channelBtn: "Suivre la Chaîne",

    trustEyebrow: "Pourquoi nous choisir ?",
    trustTitle: "La confiance de centaines de clients",
    trustDesc: "Une expertise 100% locale, au service du Cameroun et de toute l'Afrique Centrale 🌍.",
    trustStat1: "Installations réalisées",
    trustStat2: "Satisfaction client",
    trustStat3: "Intervention à Yaoundé",
    trustStat4: "Années d'expertise",

    realEyebrow: "Nos Réalisations",
    realTitle: "Projets récents au Cameroun",
    realDesc: "Découvrez nos installations récentes chez les particuliers et les entreprises.",

    reviewsEyebrow: "Avis clients",
    reviewsTitle: "Partagez votre expérience EDSOLAR",
    reviewsDesc: "Votre satisfaction compte. Laissez un avis — il sera publié après validation de notre équipe.",
    reviewsLeaveTitle: "Laisser un avis",
    reviewsName: "Nom",
    reviewsRating: "Note",
    reviewsComment: "Votre commentaire",
    reviewsSubmit: "Publier mon avis",
    reviewsSending: "Envoi…",
    reviewsSuccess: "Merci ! Votre avis sera publié après validation.",
    reviewsEmpty: "Soyez le premier à partager votre expérience !",

    aboutEyebrow: "À propos",
    aboutTitle: "EDSOLAR — votre partenaire solaire au Cameroun & en Afrique Centrale",
    aboutDesc: "Basés à Tradex Olembe, Yaoundé, nous intervenons partout au Cameroun et dans toute l'Afrique Centrale. Notre mission : rendre l'énergie solaire accessible, fiable et rentable pour chaque foyer et chaque entreprise, avec du matériel certifié et une équipe de techniciens qualifiés.",
    aboutF1: "Ingénieurs qualifiés et techniciens certifiés",
    aboutF2: "Matériel Tier 1 avec garantie constructeur",
    aboutF3: "Service après-vente réactif à Yaoundé",
    aboutF4: "Financement et options de paiement échelonné",

    contactEyebrow: "Contact",
    contactTitle: "Parlons de votre projet solaire",
    contactDesc: "Remplissez le formulaire ou appelez-nous — un expert vous répond sous 24h.",
    contactHeadquarters: "Siège social",
    contactZone: "Zone d'intervention",
    contactPhone: "Téléphone / WhatsApp",
    formName: "Nom complet",
    formPhone: "Téléphone",
    formLocation: "Quartier / Ville",
    formProjectType: "Type de projet",
    formNeeds: "Besoins spécifiques",
    formMessage: "Message",
    formSubmit: "Envoyer sur WhatsApp",
    formSuccess: "Merci ! Votre message a été préparé sur WhatsApp.",

    footerNav: "Navigation",
    footerContact: "Contact",
    footerRights: "© 2026 Bimedia Connect Agency. Tous droits réservés.",
    footerLegal: "Mentions légales",
    footerPrivacy: "Confidentialité",
    footerCookies: "Cookies",
  },
  en: {
    navServices: "Services",
    navKits: "Kits",
    navBoutique: "Shop",
    navSimulator: "Quote Simulator",
    navRealisations: "Projects",
    navHome: "Home",
    navWhatsApp: "WhatsApp Channel",
    navReviews: "Customer Reviews",
    navContact: "Contact",
    btnQuote: "Free Quote",
    
    heroTag: "Clean energy for a sustainable future",
    heroTitle1: "Switch to ",
    heroTitle2: "Solar",
    heroTitle3: " Energy with EDSOLAR",
    heroDesc: "Solar panel installation, preventive maintenance, and sale of high-quality solar equipment in Yaoundé and across Cameroon.",
    heroSimulateBtn: "Simulate your energy needs",
    heroExpertBtn: "Talk to an expert",
    heroStat1: "+500 installations",
    heroStat2: "25-year warranty",
    heroStat3: "Cameroon & Central Africa",
    heroCardTitle: "EDSOLAR Yaoundé",
    heroCardSub: "Get in touch",
    
    servicesEyebrow: "Our Services",
    servicesTitle: "Comprehensive expertise in solar energy",
    servicesDesc: "From audit to commissioning, EDSOLAR guides you through every step of your energy transition.",
    s1Title: "Custom Solar Installation",
    s1Desc: "Off-grid, hybrid, and grid-tied systems for residences, businesses, and industrial facilities.",
    s2Title: "Maintenance & Repair",
    s2Desc: "Technical inspection, panel cleaning, preventive maintenance, and inverter/battery replacement.",
    s3Title: "Solar Equipment Sales",
    s3Desc: "Photovoltaic panels, hybrid inverters, Lithium/Gel batteries, and MPPT charge controllers.",
    s4Title: "Energy Audit & Consulting",
    s4Desc: "Precise sizing by our qualified engineers to optimize your power consumption.",
    learnMore: "Learn more",

    simEyebrow: "Quote Simulator",
    simTitle: "Estimate your solar installation in 1 minute",
    simDesc: "Select your home appliances. Get your recommended power system and budget estimate instantly.",
    simResultTitle: "Real-time Results",
    simPeakPower: "Peak Power",
    simDailyCons: "Daily Consumption",
    simRecSystem: "Recommended System",
    simLithiumBatt: "Lithium Batteries",
    simPanels: "450W Solar Panels",
    simBudget: "Estimated Budget",
    simSendWA: "Get estimate on WhatsApp",
    simNote: "Indicative estimate — final sizing validated by our engineers.",

    shopEyebrow: "Shop",
    shopTitle: "High-quality solar equipment",
    shopDesc: "Panels, batteries, inverters, and complete kits — selected for ultimate reliability.",
    shopSearchPlaceholder: "Search equipment (inverter, battery, panel...)",
    shopSortFeatured: "Sort: Featured",
    shopSortPriceAsc: "Price low to high",
    shopSortPriceDesc: "Price high to low",
    shopSortPopularity: "Popularity",
    shopSortWarranty: "Warranty (long → short)",
    shopNameLabel: "Your Name",
    shopPhoneLabel: "Your Phone Number",
    shopInfoNote: "Your info pre-fills the WhatsApp message.",
    shopOrderWA: "Order via WhatsApp",
    shopNoProduct: "No equipment matches your search.",

    channelTag: "Direct from the field",
    channelTitle1: "Join the ",
    channelTitle2: "EDSOLAR WhatsApp Channel",
    channelDesc: "Follow our team daily: installation videos, technical advice, stock arrivals, and customer feedback.",
    c1Title: "Installation Videos",
    c1Desc: "Watch our live job sites in Yaoundé and across all regions of Cameroon.",
    c2Title: "Photos & Equipment",
    c2Desc: "In-depth overview of the latest inverters, lithium batteries, and solar panels received.",
    c3Title: "Exclusive Deals",
    c3Desc: "Receive special discounts and promotions reserved exclusively for channel members.",
    channelSubscribers: "Nearly 1,000 subscribers follow us!",
    channelSubNote: "100% free, fast, and confidential subscription.",
    channelBtn: "Follow the Channel",

    trustEyebrow: "Why Choose Us?",
    trustTitle: "Trusted by hundreds of customers",
    trustDesc: "100% local expertise serving Cameroon and the entire Central African region 🌍.",
    trustStat1: "Completed installations",
    trustStat2: "Customer satisfaction",
    trustStat3: "Intervention in Yaoundé",
    trustStat4: "Years of expertise",

    realEyebrow: "Our Projects",
    realTitle: "Recent projects in Cameroon",
    realDesc: "Explore our latest solar installations for homes and businesses.",

    reviewsEyebrow: "Customer Reviews",
    reviewsTitle: "Share your EDSOLAR experience",
    reviewsDesc: "Your feedback matters. Leave a review — it will be published after team approval.",
    reviewsLeaveTitle: "Leave a Review",
    reviewsName: "Name",
    reviewsRating: "Rating",
    reviewsComment: "Your Comment",
    reviewsSubmit: "Post my review",
    reviewsSending: "Sending...",
    reviewsSuccess: "Thank you! Your review will be published after approval.",
    reviewsEmpty: "Be the first to share your experience!",

    aboutEyebrow: "About Us",
    aboutTitle: "EDSOLAR — your solar partner in Cameroon & Central Africa",
    aboutDesc: "Based in Tradex Olembe, Yaoundé, we operate across Cameroon and Central Africa. Our mission: make solar energy accessible, reliable, and cost-effective for every home and business, using certified equipment and skilled technicians.",
    aboutF1: "Qualified engineers and certified technicians",
    aboutF2: "Tier-1 equipment with manufacturer warranty",
    aboutF3: "Responsive customer support in Yaoundé",
    aboutF4: "Financing and installment payment options",

    contactEyebrow: "Contact",
    contactTitle: "Let's talk about your solar project",
    contactDesc: "Fill out the form or give us a call — an expert will respond within 24 hours.",
    contactHeadquarters: "Headquarters",
    contactZone: "Service Area",
    contactPhone: "Phone / WhatsApp",
    formName: "Full Name",
    formPhone: "Phone Number",
    formLocation: "Neighborhood / City",
    formProjectType: "Project Type",
    formNeeds: "Specific Needs",
    formMessage: "Message",
    formSubmit: "Send on WhatsApp",
    formSuccess: "Thank you! Your message has been prepared on WhatsApp.",

    footerNav: "Navigation",
    footerContact: "Contact",
    footerRights: "© 2026 Bimedia Connect Agency. All rights reserved.",
    footerLegal: "Legal Notice",
    footerPrivacy: "Privacy Policy",
    footerCookies: "Cookies",
  }
};

/* ---------------- Traduction dynamique pour le contenu Supabase ---------------- */
function translateText(text: string | null | undefined, lang: Lang): string {
  if (!text) return "";
  if (lang === "fr") return text;

  // Mappings automatiques des descriptions de BDD
  const dictionary: Record<string, string> = {
    "Villa haut standing": "Luxury Villa",
    "Système solaire complet pour villa avec climatisation, électroménager et confort total.": "Complete solar power system for luxury villa with AC, home appliances, and full comfort.",
    "Commerce & alimentation": "Business & Food Retail",
    "Solution dédiée aux commerçants pour maintenir congélateurs et réfrigérateurs 24h/24.": "Dedicated solution for shop owners to keep freezers and refrigerators running 24/7.",
    "Résidence familiale": "Family Home",
    "Kit résidentiel équilibré : éclairage, télévision, réfrigérateur et petits appareils.": "Balanced residential kit: lighting, TV, refrigerator, and essential devices.",
    "Onduleur hybride": "Hybrid Inverter",
    "Batteries lithium": "Lithium Batteries",
    "Installation clé en main": "Turnkey Installation",
    "Garantie 25 ans panneaux": "25-year panel warranty",
    "Autonomie 48h": "48h autonomy",
    "Support technique 7j/7": "7/7 Technical Support",
    "Installation en 1 journée": "Same-day installation",
    "Suivi maintenance": "Maintenance follow-up",
    "Panneaux solaires": "Solar Panels",
    "Batterie Lithium": "Lithium Battery",
    "Onduleur Hybride": "Hybrid Inverter",
    "Régulateur MPPT": "MPPT Controller",
    "Tableau électrique & protections solaires": "Electrical panel & solar surge protection",
    "Installation onduleur & batterie Lithium": "Inverter & Lithium Battery Installation",
    "Équipe technique EDSOLAR en intervention": "EDSOLAR Technical Team on Site"
  };

  let translated = text;
  Object.keys(dictionary).forEach((key) => {
    if (translated.includes(key)) {
      translated = translated.replaceAll(key, dictionary[key]);
    }
  });

  return translated;
}

function Index() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <Header lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} />
      <Services t={t} lang={lang} />
      <Kits t={t} lang={lang} />
      <Calculator t={t} lang={lang} />
      <Products t={t} lang={lang} />
      <WhatsAppChannel t={t} />
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

/* ---------------- Header Responsive avec Switch FR / EN ---------------- */
function Header({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: typeof TRANSLATIONS["fr"] }) {
  const [open, setOpen] = useState(false);

  const navDesktop = [
    { href: "#services", label: t.navServices },
    { href: "#kits", label: t.navKits },
    { href: "#boutique", label: t.navBoutique },
    { href: "#calculateur", label: t.navSimulator },
    { href: "#realisations", label: t.navRealisations },
  ];

  const navMobile = [
    { href: "#accueil", label: t.navHome },
    { href: "#services", label: t.navServices },
    { href: "#kits", label: t.navKits },
    { href: "#boutique", label: t.navBoutique },
    { href: "#calculateur", label: t.navSimulator },
    { href: "#canal", label: t.navWhatsApp },
    { href: "#realisations", label: t.navRealisations },
    { href: "#avis", label: t.navReviews },
    { href: "#contact", label: t.navContact },
  ];

  const quoteMsg = lang === "fr" 
    ? "Bonjour EDSOLAR, je souhaite un devis gratuit." 
    : "Hello EDSOLAR, I would like to request a free quote.";

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
          {navDesktop.map((n) => (
            <a 
              key={n.href} 
              href={n.href} 
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-amber-500 dark:text-slate-200 whitespace-nowrap"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* BOUTONS ACTIONS + SWITCH LANGUE DESKTOP */}
        <div className="hidden items-center gap-3 lg:flex shrink-0">
          {/* Switch FR / EN */}
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
            <button 
              onClick={() => setLang("fr")}
              className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${lang === "fr" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-600 dark:text-slate-400"}`}
            >
              FR
            </button>
            <button 
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${lang === "en" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-600 dark:text-slate-400"}`}
            >
              EN
            </button>
          </div>

          <a 
            href={waLink(quoteMsg)} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-amber-500/10 transition-all hover:scale-105 hover:bg-amber-400 whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4 fill-slate-950" />
            <span>{t.btnQuote}</span>
          </a>
        </div>

        {/* HAMBURGER & SWITCH MOBILE */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
            <button 
              onClick={() => setLang("fr")}
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${lang === "fr" ? "bg-amber-500 text-slate-950" : "text-slate-600 dark:text-slate-400"}`}
            >
              FR
            </button>
            <button 
              onClick={() => setLang("en")}
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${lang === "en" ? "bg-amber-500 text-slate-950" : "text-slate-600 dark:text-slate-400"}`}
            >
              EN
            </button>
          </div>

          <button 
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" 
            onClick={() => setOpen((v) => !v)} 
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MENU DEROULANT MOBILE */}
      {open && (
        <div className="border-t border-slate-200 bg-white/95 px-4 pb-6 pt-3 shadow-2xl backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/95">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navMobile.map((n) => (
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
                href={waLink(quoteMsg)} 
                target="_blank" 
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-bold text-slate-950 shadow-md transition-all active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4 fill-slate-950" />
                <span>{t.btnQuote}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  const waMsg = lang === "fr" 
    ? "Bonjour EDSOLAR, je souhaite discuter d'un projet solaire." 
    : "Hello EDSOLAR, I would like to discuss a solar energy project.";

  return (
    <section id="accueil" className="relative isolate overflow-hidden">
      <img src={hero} alt="Installateurs solaires EDSOLAR sur un toit à Yaoundé" width={1920} height={1080}
           className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/60" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-32 lg:grid-cols-[1.15fr_1fr] lg:py-40">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 backdrop-blur">
            <Sun className="h-3.5 w-3.5 text-amber-400" /> {t.heroTag}
          </span>
          <h1 className="mt-6 text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t.heroTitle1}<span className="text-amber-400">{t.heroTitle2}</span>{t.heroTitle3}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {t.heroDesc}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#calculateur" className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-amber-500/20 transition-all hover:scale-105 hover:bg-amber-400">
              <Zap className="h-4 w-4 fill-slate-950" /> {t.heroSimulateBtn}
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
              <Phone className="h-4 w-4" /> {t.heroExpertBtn}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t.heroStat1}</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t.heroStat2}</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> {t.heroStat3}</div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="ml-auto max-w-sm rounded-3xl border border-white/15 bg-slate-900/60 p-6 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <img src={logo} alt="EDSOLAR" className="h-14 w-14 rounded-xl bg-white object-contain p-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400">{t.heroCardSub}</p>
                <p className="text-lg font-bold">{t.heroCardTitle}</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-amber-400 shrink-0" /> Tradex Olembe, Yaoundé, Cameroun</div>
              <div className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-emerald-400 shrink-0" /> {t.heroStat3}</div>
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-amber-400 shrink-0" /> +237 650544444</div>
            </div>
            <a href={waLink(waMsg)} target="_blank" rel="noreferrer"
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
            <div key={s.title} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-amber-500/40">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-amber-500/10 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-slate-950">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <a href={waLink(lang === "fr" ? `Bonjour EDSOLAR, je suis intéressé par: ${s.title}` : `Hello EDSOLAR, I am interested in: ${s.title}`)} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:gap-2 transition-all">
                {t.learnMore} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Kits (Avec traduction dynamique) ---------------- */
const DEFAULT_KITS = [
  { id: "d1", slug: "prestige", title: "Kit Prestige", subtitle: "Villa haut standing", description: "Système solaire complet pour villa avec climatisation, électroménager et confort total.", price: "3 000 000 FCFA", image_url: null as string | null, features: ["Onduleur hybride 12 kVA", "Batteries lithium 48V 300Ah", "12 panneaux 550W", "Installation clé en main", "Garantie 25 ans panneaux"] },
  { id: "d2", slug: "congelateur", title: "Kit Congélateur", subtitle: "Commerce & alimentation", description: "Solution dédiée aux commerçants pour maintenir congélateurs et réfrigérateurs 24h/24.", price: "1 700 000 FCFA", image_url: null, features: ["Onduleur hybride 4 kVA", "Batteries lithium 24V 200Ah", "6 panneaux 450W", "Autonomie 48h", "Support technique 7j/7"] },
  { id: "d3", slug: "filet-bleu", title: "Kit Filet Bleu", subtitle: "Résidence familiale", description: "Kit résidentiel équilibré : éclairage, télévision, réfrigérateur et petits appareils.", price: "1 000 000 FCFA", image_url: null, features: ["Onduleur hybride 2 kVA", "Batteries lithium 24V 200Ah", "4 panneaux 450W", "Installation en 1 journée", "Suivi maintenance"] },
];

function Kits({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  const [items, setItems] = useState<any[]>(DEFAULT_KITS);

  useEffect(() => {
    supabase.from("kits").select("*").order("sort_order").then(({ data }) => {
      if (data && data.length) setItems(data);
    });
  }, []);

  return (
    <section id="kits" className="py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.navKits} title={lang === "fr" ? "Des solutions solaires prêtes à l'emploi" : "Ready-to-use solar solutions"} description={t.servicesDesc} />
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
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">{translateText(k.subtitle, lang)}</p>
                <h3 className="mt-1 text-xl font-black">{k.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{translateText(k.description, lang)}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {(k.features ?? []).map((f: string) => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {translateText(f, lang)}</li>
                  ))}
                </ul>
                <a href={waLink(lang === "fr" ? `Bonjour EDSOLAR, je suis intéressé par le ${k.title} (${k.price ?? ""}).` : `Hello EDSOLAR, I am interested in the ${k.title} (${k.price ?? ""}).`)} target="_blank" rel="noreferrer"
                   className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-amber-400">
                  <MessageCircle className="h-4 w-4 fill-slate-950" /> {lang === "fr" ? "Demander ce kit" : "Request this kit"}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Calculator / Simulateur Devis ---------------- */
type Appliance = { id: string; name: string; nameEn: string; watts: number; icon: any; hours: number };
const APPLIANCES: Appliance[] = [
  { id: "led", name: "Éclairage LED", nameEn: "LED Lighting", watts: 15, icon: Lightbulb, hours: 6 },
  { id: "tv", name: "Télévision", nameEn: "Television", watts: 100, icon: Tv, hours: 5 },
  { id: "fridge", name: "Réfrigérateur", nameEn: "Refrigerator", watts: 200, icon: Refrigerator, hours: 12 },
  { id: "freezer", name: "Congélateur", nameEn: "Freezer", watts: 300, icon: Snowflake, hours: 10 },
  { id: "ac", name: "Climatiseur", nameEn: "Air Conditioner", watts: 1200, icon: Snowflake, hours: 6 },
  { id: "fan", name: "Ventilateur", nameEn: "Fan", watts: 75, icon: Fan, hours: 8 },
  { id: "wm", name: "Machine à laver", nameEn: "Washing Machine", watts: 500, icon: WashingMachine, hours: 1 },
  { id: "mw", name: "Micro-ondes", nameEn: "Microwave", watts: 800, icon: Microwave, hours: 0.5 },
  { id: "pc", name: "Ordinateur", nameEn: "Computer", watts: 150, icon: Laptop, hours: 5 },
];

function Calculator({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
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
  
  const msg = lang === "fr" 
    ? `Bonjour EDSOLAR,%0AVoici mon estimation solaire:%0A- Puissance de pointe: ${peakW} W%0A- Consommation journalière: ${dailyWh.toFixed(0)} Wh%0A- Système recommandé: ${systemKva} kVA ${systemVoltage}V%0A- Batteries lithium: ${batteryCount} x ${systemVoltage}V ${batteryUnitAh}Ah%0A- Panneaux solaires: ${panelsCount} x 450W%0A- Budget estimatif: ${priceLabel}`
    : `Hello EDSOLAR,%0AHere is my solar estimation:%0A- Peak Power: ${peakW} W%0A- Daily Consumption: ${dailyWh.toFixed(0)} Wh%0A- Recommended System: ${systemKva} kVA ${systemVoltage}V%0A- Lithium Batteries: ${batteryCount} x ${systemVoltage}V ${batteryUnitAh}Ah%0A- Solar Panels: ${panelsCount} x 450W%0A- Estimated Budget: ${priceLabel}`;

  return (
    <section id="calculateur" className="py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.simEyebrow} title={t.simTitle} description={t.simDesc} />
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
                        <p className="truncate text-sm font-semibold">{lang === "fr" ? a.name : a.nameEn}</p>
                        <p className="text-xs text-muted-foreground">{a.watts} W · {a.hours}h/{lang === "fr" ? "jour" : "day"}</p>
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
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400">{t.simEyebrow}</p>
            <h3 className="mt-2 text-2xl font-black">{t.simResultTitle}</h3>
            <div className="mt-6 space-y-3.5">
              <Metric icon={Zap} label={t.simPeakPower} value={`${peakW.toLocaleString()} W`} />
              <Metric icon={Sun} label={t.simDailyCons} value={`${dailyWh.toLocaleString(undefined, { maximumFractionDigits: 0 })} Wh`} />
              <Metric icon={Cpu} label={t.simRecSystem} value={`${systemKva} kVA ${systemVoltage}V`} highlight />
              <Metric icon={Battery} label={`${t.simLithiumBatt} ${systemVoltage}V`} value={`${batteryCount} × ${batteryUnitAh} Ah`} />
              <Metric icon={Sun} label={t.simPanels} value={`${panelsCount} ${lang === "fr" ? "panneaux" : "panels"}`} />
              <Metric icon={Zap} label={t.simBudget} value={priceLabel} highlight />
            </div>
            <a href={`${WA}?text=${msg}`} target="_blank" rel="noreferrer"
               className="mt-6 flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-lg transition-all hover:scale-105 hover:bg-amber-400">
              <MessageCircle className="h-4 w-4 fill-slate-950" /> {t.simSendWA}
            </a>
            <p className="mt-3 text-center text-xs text-slate-400">{t.simNote}</p>
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

/* ---------------- Products (Avec traduction BDD dynamique) ---------------- */
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

function Products({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
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
    return [lang === "fr" ? "Tous" : "All", ...Array.from(s)];
  }, [items, lang]);

  const list = useMemo(() => {
    let arr = (cat === "Tous" || cat === "All") ? [...items] : items.filter((p) => p.category === cat);
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
    return lang === "fr" 
      ? `Bonjour EDSOLAR, je souhaite commander :\n• Équipement : ${p.name}\n• Prix : ${p.price ?? "Sur devis"}\n• Nom : ${buyer.name || "(à préciser)"}`
      : `Hello EDSOLAR, I want to order:\n• Equipment: ${p.name}\n• Price: ${p.price ?? "Quote"}\n• Name: ${buyer.name || "(to specify)"}`;
  };

  return (
    <section id="boutique" className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.shopEyebrow} title={t.shopTitle} description={t.shopDesc} />

        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder={t.shopSearchPlaceholder}
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none focus:border-amber-500" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold outline-none focus:border-amber-500">
            <option value="featured">{t.shopSortFeatured}</option>
            <option value="price_asc">{t.shopSortPriceAsc}</option>
            <option value="price_desc">{t.shopSortPriceDesc}</option>
            <option value="popularity">{t.shopSortPopularity}</option>
            <option value="warranty">{t.shopSortWarranty}</option>
          </select>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${cat === c ? "bg-slate-900 text-white shadow-md dark:bg-amber-500 dark:text-slate-950" : "border border-border bg-card text-foreground hover:border-amber-500"}`}>
              {translateText(c, lang)}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-3xl gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.shopNameLabel}</label>
            <input value={buyer.name} onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} placeholder="Ex. Jean Kamga"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-amber-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.shopPhoneLabel}</label>
            <input value={buyer.phone} onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })} placeholder="+237 6XX XX XX XX"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-amber-500" />
          </div>
          <p className="text-xs text-muted-foreground sm:text-right">{t.shopInfoNote}</p>
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
              {p.description && <p className="mt-1 text-xs text-muted-foreground">{translateText(p.description, lang)}</p>}
              <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-semibold">
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-700 dark:text-slate-300">{translateText(p.category, lang)}</span>
                {p.warranty && <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-600">{lang === "fr" ? "Garantie" : "Warranty"} {p.warranty}</span>}
              </div>
              <div className="mt-4 flex items-end justify-between gap-2">
                <span className="text-lg font-black text-amber-600 dark:text-amber-400">{p.price ?? "Sur devis"}</span>
              </div>
              <a href={waLink(buildOrderMsg(p))} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700">
                <MessageCircle className="h-4 w-4" /> {t.shopOrderWA}
              </a>
            </div>
          ))}
          {list.length === 0 && <p className="col-span-full text-center text-sm text-muted-foreground">{t.shopNoProduct}</p>}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WhatsApp Channel Section ---------------- */
function WhatsAppChannel({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <section id="canal" className="relative overflow-hidden bg-slate-950 py-16 text-slate-100 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D366]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#25D366]">
            <Radio className="h-3.5 w-3.5 animate-pulse" /> {t.channelTag}
          </span>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            {t.channelTitle1}<span className="text-[#25D366]">{t.channelTitle2}</span>
          </h2>
          <p className="mt-4 text-sm text-slate-400 sm:text-lg">
            {t.channelDesc}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur transition-all hover:border-[#25D366]/50 hover:bg-slate-900">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366] transition-transform group-hover:scale-110">
              <Video className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">{t.c1Title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.c1Desc}</p>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur transition-all hover:border-[#25D366]/50 hover:bg-slate-900">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366] transition-transform group-hover:scale-110">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">{t.c2Title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.c2Desc}</p>
          </div>

          <div className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur transition-all hover:border-[#25D366]/50 hover:bg-slate-900 sm:col-span-2 md:col-span-1">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366] transition-transform group-hover:scale-110">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">{t.c3Title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.c3Desc}</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 p-6 shadow-2xl backdrop-blur sm:p-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-lg sm:text-xl font-bold text-white">{t.channelSubscribers}</p>
              <p className="mt-1 text-xs sm:text-sm text-slate-400">{t.channelSubNote}</p>
            </div>
            <a href={WA_CHANNEL_URL} target="_blank" rel="noreferrer"
               className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-slate-950 shadow-lg transition-all hover:scale-105 hover:bg-[#20ba59]">
              <MessageCircle className="h-5 w-5 fill-slate-950 text-[#25D366]" /> {t.channelBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Trust ---------------- */
function Trust({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  const STATS = [
    { icon: Users, value: "+500", label: t.trustStat1 },
    { icon: Star, value: "99%", label: t.trustStat2 },
    { icon: Clock, value: "24/48h", label: t.trustStat3 },
    { icon: Award, value: "10+", label: t.trustStat4 },
  ];

  return (
    <section className="py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.trustEyebrow} title={t.trustTitle} description={t.trustDesc} />
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

function Realisations({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  const [extra, setExtra] = useState<{ src: string; title: string; loc: string }[]>([]);
  useEffect(() => {
    supabase.from("gallery_photos").select("url, caption").order("sort_order").order("created_at", { ascending: false })
      .then(({ data }) => setExtra((data ?? []).map((p) => ({ src: p.url, title: p.caption ?? "Réalisation EDSOLAR", loc: "Cameroun" }))));
  }, []);
  const items = [...extra, ...STATIC_GALLERY];
  return (
    <section id="realisations" className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.realEyebrow} title={t.realTitle} description={t.realDesc} />
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
                  <p className="text-sm font-bold">{translateText(g.title, lang)}</p>
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
function About({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <section id="apropos" className="py-16 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">{t.aboutEyebrow}</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight">
            {t.aboutTitle}
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
            {t.aboutDesc}
          </p>
          <ul className="mt-6 space-y-3">
            {[t.aboutF1, t.aboutF2, t.aboutF3, t.aboutF4].map((f) => (
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
function Contact({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  const [form, setForm] = useState({ name: "", phone: "", location: "", type: "Maison", zone: "Cameroun", needs: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = lang === "fr" 
      ? `Bonjour EDSOLAR,%0ANom: ${form.name}%0ATéléphone: ${form.phone}%0AQuartier: ${form.location}%0AZone: ${form.zone}%0AType: ${form.type}%0ABesoins: ${form.needs}%0AMessage: ${form.message}`
      : `Hello EDSOLAR,%0AName: ${form.name}%0APhone: ${form.phone}%0ACity: ${form.location}%0AZone: ${form.zone}%0AType: ${form.type}%0ANeeds: ${form.needs}%0AMessage: ${form.message}`;
    window.open(`${WA}?text=${msg}`, "_blank");
    setSent(true);
  };

  return (
    <section id="contact" className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.contactEyebrow} title={t.contactTitle} description={t.contactDesc} />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <ContactCard icon={MapPin} title={t.contactHeadquarters} lines={["Tradex Olembe", "Yaoundé, Cameroun"]} />
            <ContactCard icon={Leaf} title={t.contactZone} lines={["Tout le Cameroun", "& Afrique Centrale"]} />
            <ContactCard icon={Phone} title={t.contactPhone} lines={["+237 650544444"]} href={`tel:${PHONE}`} />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <iframe title="EDSOLAR Yaoundé" className="h-56 w-full"
                src="https://www.google.com/maps?q=Tradex+Olembe+Yaounde&output=embed" loading="lazy" />
            </div>
          </div>
          <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-5 sm:p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.formName} value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label={t.formPhone} value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required type="tel" />
              <Field label={t.formLocation} value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="Ex: Bastos, Yaoundé" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.formProjectType}</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-amber-500">
                  <option>{lang === "fr" ? "Maison" : "Home"}</option>
                  <option>{lang === "fr" ? "Commerce" : "Business"}</option>
                  <option>{lang === "fr" ? "Industrie" : "Industry"}</option>
                  <option>{lang === "fr" ? "Autre" : "Other"}</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.formNeeds}</label>
                <input type="text" value={form.needs} onChange={(e) => setForm({ ...form, needs: e.target.value })}
                  placeholder={lang === "fr" ? "Ex: pompage, climatisation, bureaux..." : "Ex: pumping, AC, offices..."}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-amber-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.formMessage}</label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={lang === "fr" ? "Décrivez brièvement votre besoin..." : "Briefly describe your request..."}
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-amber-500" />
              </div>
            </div>
            <button type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-emerald-700 sm:w-auto">
              <Send className="h-4 w-4" /> {t.formSubmit}
            </button>
            {sent && <p className="mt-3 text-sm text-emerald-600 font-semibold">{t.formSuccess}</p>}
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
function Footer({ t }: { t: typeof TRANSLATIONS["fr"] }) {
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
            {t.heroDesc}
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
          <p className="text-sm font-bold uppercase tracking-wider text-amber-400">{t.footerNav}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><a href="#services" className="hover:text-amber-400 transition-colors">{t.navServices}</a></li>
            <li><a href="#kits" className="hover:text-amber-400 transition-colors">{t.navKits}</a></li>
            <li><a href="#boutique" className="hover:text-amber-400 transition-colors">{t.navBoutique}</a></li>
            <li><a href="#calculateur" className="hover:text-amber-400 transition-colors">{t.navSimulator}</a></li>
            <li><a href="#realisations" className="hover:text-amber-400 transition-colors">{t.navRealisations}</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-amber-400">{t.footerContact}</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-amber-400" /> Tradex Olembe, Yaoundé, Cameroun</li>
            <li className="flex gap-2"><Leaf className="h-4 w-4 shrink-0 text-emerald-400" /> Cameroun & Afrique Centrale</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-amber-400" /> +237 650544444</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-900 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:px-6">
          <p>{t.footerRights}</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="/mentions-legales" className="hover:text-amber-400">{t.footerLegal}</a>
            <a href="/confidentialite" className="hover:text-amber-400">{t.footerPrivacy}</a>
            <a href="/cookies" className="hover:text-amber-400">{t.footerCookies}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Floating WhatsApp ---------------- */
function FloatingWhatsApp({ lang }: { lang: Lang }) {
  const waMsg = lang === "fr" 
    ? "Bonjour EDSOLAR, j'aimerais plus d'informations." 
    : "Hello EDSOLAR, I would like more information.";

  return (
    <a href={waLink(waMsg)} target="_blank" rel="noreferrer"
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

/* ---------------- Reviews ---------------- */
function Reviews({ t }: { t: typeof TRANSLATIONS["fr"] }) {
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
        <SectionHeader eyebrow={t.reviewsEyebrow} title={t.reviewsTitle} description={t.reviewsDesc} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <form onSubmit={submit} className="h-fit rounded-3xl border border-border bg-card p-5 sm:p-8 shadow-sm">
            <p className="text-sm font-bold">{t.reviewsLeaveTitle}</p>
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.reviewsName}</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.reviewsRating}</label>
                <div className="mt-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n}
                      onClick={() => setForm((f) => ({ ...f, rating: n }))}
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`${n} étoile`}
                      className="p-1 transition-transform hover:scale-110">
                      <Star className={`pointer-events-none h-7 w-7 sm:h-8 sm:w-8 ${n <= (hoverRating || form.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-muted-foreground">{form.rating}/5</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.reviewsComment}</label>
                <textarea rows={4} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required
                  className="mt-1 w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-amber-500" />
              </div>
              <button disabled={busy} className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800 disabled:opacity-60 dark:bg-amber-500 dark:text-slate-950">
                {busy ? t.reviewsSending : t.reviewsSubmit}
              </button>
              {sent && <p className="text-sm text-emerald-600 font-semibold">{t.reviewsSuccess}</p>}
            </div>
          </form>
          <div className="grid gap-4 sm:grid-cols-2">
            {items.length === 0 && (
              <p className="col-span-full rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                {t.reviewsEmpty}
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
