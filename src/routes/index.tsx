import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Sun, Leaf, Phone, MapPin, MessageCircle, Menu, X, ArrowRight,
  Wrench, ShoppingBag, ClipboardCheck, ShieldCheck, Battery,
  Zap, Cpu, Tv, Refrigerator, Snowflake, Lightbulb, WashingMachine,
  Laptop, Fan, Microwave, CheckCircle2, Star, Award, Clock, Users,
  Facebook, Instagram, Linkedin, Send, Package, Search, ArrowUp,
  Radio, Camera, Video, Sparkles, Globe, CreditCard, ShieldAlert,
  Check, AlertTriangle, Mail, Handshake, Heart, Smile, Utensils, Stethoscope, Car, Home,
  Compass
} from "lucide-react";

import logo from "@/assets/edsolar-logo-new.jpeg";
import hero from "@/assets/install-panels.jpeg";
import gal1 from "@/assets/gallery-1.jpg";
import gal2 from "@/assets/gallery-2.jpg";
import gal3 from "@/assets/gallery-3.jpg";
import teamPortrait from "@/assets/team-portrait.jpeg";

// Imports de TOUTES les images du terrain
import field1 from "@/assets/FB_IMG_1785237119977.jpeg";
import field2 from "@/assets/FB_IMG_1785237146000.jpeg";
import field3 from "@/assets/FB_IMG_1785237208608.jpeg";
import field4 from "@/assets/FB_IMG_1785237208736.jpeg";
import field5 from "@/assets/FB_IMG_1785237236998.jpeg";
import field6 from "@/assets/FB_IMG_1785237261058.jpeg";
import field7 from "@/assets/FB_IMG_1785237273893.jpeg";
import field8 from "@/assets/FB_IMG_1785237328858.jpeg";
import field9 from "@/assets/FB_IMG_1785237355589.jpeg";

// Imports des logos partenaires depuis assets/
import sakoLogo from "@/assets/SAKO.png";
import felicityLogo from "@/assets/Felicity.png";
import cworthLogo from "@/assets/Cworth.png";
import growattLogo from "@/assets/Growarth.png";
import longiLogo from "@/assets/Longi.png";

// Imports des logos de paiement Mobile Money
import momoLogo from "@/assets/momo.png";
import orangeMoneyLogo from "@/assets/Orange Money.png";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EDSOLAR Énergie Cameroun — Installation Solaire à Yaoundé & Afrique Centrale" },
      { name: "description", content: "Solutions anti-délestage Eneo, installation de panneaux solaires, batteries Lithium et matériel certifié à Yaoundé. Contactez-nous à edsolarcam@gmail.com ou au +237 650544444." },
      { property: "og:title", content: "EDSOLAR Énergie Cameroun — Installation Solaire & Anti-Délestage" },
      { property: "og:description", content: "Fini les coupures Eneo. Équipements solaires certifiés Tier 1 à Yaoundé et livraison dans toute l'Afrique Centrale." },
    ],
  }),
  component: Index,
});

const PHONE = "+237650544444";
const EMAIL = "edsolarcam@gmail.com";
const WA = `https://wa.me/${PHONE.replace("+", "")}`;
const WA_CHANNEL_URL = "https://whatsapp.com/channel/0029VauTigF9Gv7cyMQUQH1x";
const waLink = (msg: string) => `${WA}?text=${encodeURIComponent(msg)}`;

type Lang = "fr" | "en";

// Données Partenaires
const PARTNERS_DATA = [
  { name: "SAKO", logo: sakoLogo, desc: "Onduleurs & Systèmes Solaires", badge: "Tier 1 Certified" },
  { name: "Felicity Solar", logo: felicityLogo, desc: "Batteries Lithium & Onduleurs", badge: "LiFePO4 Pro" },
  { name: "Cworth Energy", logo: cworthLogo, desc: "Composants & Protections", badge: "IEC Standard" },
  { name: "Growatt", logo: growattLogo, desc: "Onduleurs Hybrides Intelligents", badge: "Smart Energy" },
  { name: "LONGi Solar", logo: longiLogo, desc: "Panneaux Photovoltaïques", badge: "World Leader" },
];

// Ensemble complet des 9 photos de terrain
const FIELD_IMAGES = [
  { src: field2, caption: "Équipe EDSOLAR en rassemblement sur le terrain" },
  { src: field9, caption: "Déplacement en pirogue pour installation en zone enclavée" },
  { src: field1, caption: "Installation & câblage technique du coffret solaire" },
  { src: field7, caption: "Fixation et pose de panneaux solaires sur toiture" },
  { src: field4, caption: "Moments d'enthousiasme et de cohésion d'équipe" },
  { src: field8, caption: "Recherche & développement de solutions énergétiques" },
  { src: field3, caption: "Mission technique d'installation en région" },
  { src: field5, caption: "Équipe de techniciens qualifiés prêts pour l'intervention" },
  { src: field6, caption: "Vérification et raccordement des panneaux solaires" },
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
    navWhatsApp: "Chaîne WhatsApp",
    navReviews: "Avis clients",
    navContact: "Contact",
    btnQuote: "Devis gratuit",
    
    heroTag: "Fini les délestages Eneo intempestifs",
    heroTitle1: "L'Énergie Solaire ",
    heroTitle2: "Autonome & Écologique",
    heroTitle3: " pour Votre Confort",
    heroDesc: "Assurez une électricité 24h/24 à la maison et au bureau. Équipements certifiés Tier 1, installations garanties et SAV réactif à Yaoundé et dans toute l'Afrique Centrale.",
    heroSimulateBtn: "Simuler vos besoins énergétiques",
    heroExpertBtn: "Contacter un expert",
    heroStat1: "+500 installations réussies",
    heroStat2: "Garantie constructeur 25 ans",
    heroStat3: "Cameroun & Afrique Centrale",
    heroCardTitle: "EDSOLAR Yaoundé",
    heroCardSub: "Contact direct",

    partnersEyebrow: "Confiance & Qualité",
    partnersTitle: "Nos Marques & Partenaires Officiels",
    partnersDesc: "Nous collaborons directement avec les leaders mondiaux de la technologie photovoltaïque pour vous garantir du matériel certifié Tier 1.",

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
    shopTitle: "Équipements solaires certifiés d'usine",
    shopDesc: "Panneaux, batteries Lithium, onduleurs et kits complets — zéro contrefaçon.",
    shopSearchPlaceholder: "Rechercher un équipement (onduleur, batterie, panneau…)",
    shopSortFeatured: "Trier : à la une",
    shopSortPriceAsc: "Prix croissant",
    shopSortPriceDesc: "Prix décroissant",
    shopSortPopularity: "Popularité",
    shopSortWarranty: "Garantie (longue → courte)",
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

    aboutEyebrow: "Notre Vision & Mission",
    aboutTitle: "EDSOLAR — Un engagement fort pour le bien-être durable",
    aboutPillarsText: "EDSOLAR repose sur quatre Grands Piliers fondamentaux : la Gratitude, l'Abondance, l'Amour et la Compassion.",
    aboutMissionText: "Notre mission est d'aider les gens à accéder à l'énergie solaire à moindre coût.",
    aboutVisionText: "Notre vision est de bâtir un avenir où chaque famille, chaque entreprise et chaque communauté bénéficie d'une énergie propre, fiable et accessible : un monde sans délestage, avec moins de pollution, un environnement mieux protégé, des coûts énergétiques réduits et une véritable indépendance énergétique.",
    aboutPresenceText: "Depuis 2017, nous déployons nos activités et notre savoir-faire sur l'ensemble du territoire camerounais.",
    aboutEcosystemTitle: "Cette vision s'étendra progressivement à d'autres domaines essentiels du quotidien :",
    aboutConclusion: "EDSOLAR, ce n'est pas seulement une entreprise. C'est une vision, un engagement et un mouvement au service du bien-être total des générations d'aujourd'hui et de demain.",

    contactEyebrow: "Contact",
    contactTitle: "Parlons de votre projet solaire",
    contactDesc: "Remplissez le formulaire, écrivez-nous ou appelez-nous — un expert vous répond sous 24h.",
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
    formSuccess: "Merci ! Votre message a été préparé sur WhatsApp.",

    footerNav: "Navigation",
    footerContact: "Contact",
    footerPartners: "Partenaires Certifiés",
    footerRights: "© 2026 Bimedia Connect Agency. Tous droits réservés.",
    footerLegal: "Mentions légales",
    footerPrivacy: "Confidentialité",
    footerCookies: "Cookies",
  },
  en: {
    navServices: "Services",
    navPartners: "Partners",
    navKits: "Kits",
    navBoutique: "Shop",
    navSimulator: "Quote Simulator",
    navRealisations: "Projects",
    navHome: "Home",
    navWhatsApp: "WhatsApp Channel",
    navReviews: "Customer Reviews",
    navContact: "Contact",
    btnQuote: "Free Quote",
    
    heroTag: "No more unexpected power outages",
    heroTitle1: "Autonomous & Eco-friendly ",
    heroTitle2: "Solar Energy",
    heroTitle3: " for Your Comfort",
    heroDesc: "Ensure 24/7 power at home and office. Tier-1 certified equipment, guaranteed installations, and responsive support in Yaoundé and Central Africa.",
    heroSimulateBtn: "Simulate your energy needs",
    heroExpertBtn: "Talk to an expert",
    heroStat1: "+500 successful setups",
    heroStat2: "25-year manufacturer warranty",
    heroStat3: "Cameroon & Central Africa",
    heroCardTitle: "EDSOLAR Yaoundé",
    heroCardSub: "Direct Contact",

    partnersEyebrow: "Trust & Quality",
    partnersTitle: "Our Official Brands & Partners",
    partnersDesc: "We partner directly with global leaders in photovoltaic technology to provide you Tier-1 certified equipment.",

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
    shopTitle: "Factory certified solar equipment",
    shopDesc: "Panels, Lithium batteries, inverters, and complete kits — zero counterfeit.",
    shopSearchPlaceholder: "Search equipment (inverter, battery, panel...)",
    shopSortFeatured: "Sort: Featured",
    shopSortPriceAsc: "Price low to high",
    shopSortPriceDesc: "Price high to low",
    shopSortPopularity: "Popularity",
    shopSortWarranty: "Warranty (long → short)",
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

    aboutEyebrow: "Our Vision & Mission",
    aboutTitle: "EDSOLAR — A commitment to sustainable well-being",
    aboutPillarsText: "EDSOLAR is built on four core Great Pillars: Gratitude, Abundance, Love, and Compassion.",
    aboutMissionText: "Our mission is to help people access affordable solar energy.",
    aboutVisionText: "Our vision is to build a future where every family, business, and community benefits from clean, reliable, and accessible energy: a world without power cuts, with less pollution, better environmental protection, lower energy costs, and true energy independence.",
    aboutPresenceText: "Since 2017, we have been carrying out our operations across the entire Cameroonian territory.",
    aboutEcosystemTitle: "This vision will progressively expand to other key areas of daily life:",
    aboutConclusion: "EDSOLAR is not just a business. It is a vision, a commitment, and a movement dedicated to the total well-being of present and future generations.",

    contactEyebrow: "Contact",
    contactTitle: "Let's talk about your solar project",
    contactDesc: "Fill out the form, send us an email or give us a call — an expert will respond within 24 hours.",
    contactHeadquarters: "Headquarters",
    contactZone: "Service Area",
    contactPhone: "Phone / WhatsApp",
    contactEmail: "Email Address",
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
    footerPartners: "Certified Partners",
    footerRights: "© 2026 Bimedia Connect Agency. All rights reserved.",
    footerLegal: "Legal Notice",
    footerPrivacy: "Privacy Policy",
    footerCookies: "Cookies",
  }
};

/* ---------------- Traduction dynamique universelle pour Supabase ---------------- */
function translateDynamicText(text: string | null | undefined, lang: Lang): string {
  if (!text) return "";
  if (lang === "fr") return text;

  const map: [RegExp | string, string][] = [
    ["CONFORT HAUT DE GAMME POUR VILLAS ET GRANDES RÉSIDENCES", "HIGH-END COMFORT FOR VILLAS & LARGE RESIDENCES"],
    ["SOLUTION DÉDIÉE AUX COMMERCES ET POISSONNERIES", "SOLUTION FOR SHOPS, BUSINESSES & FISH MARKETS"],
    ["PROMOTION EXCEPTIONNELLE", "SPECIAL PROMOTION"],
    
    [/Alimentez votre maison avec (.*?) d'énergie propre et durable\./gi, "Power your home with $1 of clean, sustainable energy."],
    [/Paiement en plusieurs tranches : (.*?) d'avance puis (.*?)\/mois pendant (.*?)\. Installation gratuite offerte\./gi, "Installment payment: $1 upfront then $2/month for $3. Free installation included."],
    [/Le Kit Prestige (.*?) est la solution idéale pour les foyers souhaitant bénéficier d'une alimentation électrique fiable, écologique et sans coupures\./gi, "The Prestige $1 Kit is the ideal solar solution for households looking for reliable, eco-friendly, blackout-free power."],
    [/Conçu pour répondre aux besoins essentiels d'une maison, il vous permet de profiter de l'électricité même en cas de coupure du réseau\./gi, "Designed to meet essential home energy needs, keeping your power on even during grid outages."],
    [/Paiement comptant (.*?) FCFA ═ Paiement échelonné (.*?) d'avance (.*?)\/mois pendant (.*?)/gi, "Cash payment $1 FCFA ═ Installment payment $2 upfront, $3/month for $4"],
    [/Kit spécifiquement dimensionné pour maintenir un ou plusieurs congélateurs en fonctionnement continu, idéal pour boutiques, poissonneries et restaurants\./gi, "System specifically sized to keep one or multiple freezers running continuously, ideal for shops, fish markets, and restaurants."],
    
    [/(\d+) panneaux solaires de (\d+)Wc?/gi, "$1 x $2W solar panels"],
    [/(\d+) panneaux (\d+)W/gi, "$1 x $2W solar panels"],
    [/Onduleur EDSOLAR (.*)/gi, "EDSOLAR Inverter $1"],
    [/Onduleur (.*)/gi, "Inverter $1"],
    [/Contrôleur de charges? MPPT (.*)/gi, "MPPT Charge Controller $1"],
    [/1 contrôleur de charge MPPT (.*)/gi, "1 x MPPT Charge Controller $1"],
    [/Batterie lithium (.*)/gi, "Lithium Battery $1"],
    [/1 batterie Lithium (.*)/gi, "1 x Lithium Battery $1"],
    [/(\d+) ampoules offertes/gi, "$1 x Free LED Light Bulbs"],
    ["08 ampoules offertes", "8 x Free LED Light Bulbs"],
    ["Installation gratuite", "Free Installation"],
    ["Paiement en 4 tranches disponible", "4-time installment payment available"],
    ["Câbles, connectiques et accessoires d'installation", "Cables, connectors & installation accessories"],
    ["Installation et mise en service gratuites", "Free installation & commissioning"],
    ["Autonomie 12h", "12-hour autonomy"],
    ["Autonomie 24h", "24-hour autonomy"],
    ["Autonomie 48h", "48-hour autonomy"],
    ["Protection surtension", "Surge protection"],

    ["Panneaux solaires", "Solar Panels"],
    ["Batterie Lithium", "Lithium Battery"],
    ["Batteries lithium", "Lithium Batteries"],
    ["Onduleur Hybride", "Hybrid Inverter"],
    ["Régulateur MPPT", "MPPT Controller"],
    ["Tableau électrique & protections solaires", "Electrical panel & solar surge protection"],
    ["Installation onduleur & batterie Lithium", "Inverter & Lithium Battery Installation"],
    ["Équipe technique EDSOLAR en intervention", "EDSOLAR Technical Team on Site"]
  ];

  let translated = text;
  for (const [pattern, replacement] of map) {
    if (typeof pattern === "string") {
      translated = translated.replaceAll(pattern, replacement);
    } else {
      translated = translated.replace(pattern, replacement);
    }
  }

  return translated;
}

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

/* ---------------- Header Responsive ---------------- */
function Header({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: typeof TRANSLATIONS["fr"] }) {
  const [open, setOpen] = useState(false);

  const navDesktop = [
    { href: "#partenaires", label: t.navPartners },
    { href: "#services", label: t.navServices },
    { href: "#kits", label: t.navKits },
    { href: "#boutique", label: t.navBoutique },
    { href: "#calculateur", label: t.navSimulator },
    { href: "#realisations", label: t.navRealisations },
    { href: "#apropos", label: "Vision" },
  ];

  const navMobile = [
    { href: "#accueil", label: t.navHome },
    { href: "#partenaires", label: t.navPartners },
    { href: "#services", label: t.navServices },
    { href: "#kits", label: t.navKits },
    { href: "#boutique", label: t.navBoutique },
    { href: "#calculateur", label: t.navSimulator },
    { href: "#qualite", label: lang === "fr" ? "Anti-Contrefaçon" : "Quality vs Fakes" },
    { href: "#diaspora", label: "Diaspora" },
    { href: "#canal", label: t.navWhatsApp },
    { href: "#realisations", label: t.navRealisations },
    { href: "#apropos", label: "Vision & Mission" },
    { href: "#avis", label: t.navReviews },
    { href: "#contact", label: t.navContact },
  ];

  const quoteMsg = lang === "fr" 
    ? "Bonjour EDSOLAR, je souhaite un devis gratuit." 
    : "Hello EDSOLAR, I would like to request a free quote.";

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-white/90 backdrop-blur-md dark:border-emerald-900/30 dark:bg-[#20401d]/90 transition-all">
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
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-[#386b34]">Énergie Cameroun</span>
          </span>
        </a>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navDesktop.map((n) => (
            <a 
              key={n.href} 
              href={n.href} 
              className="text-sm font-semibold text-slate-700 transition-colors hover:text-[#386b34] dark:text-slate-200 whitespace-nowrap"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* BOUTONS ACTIONS + SWITCH LANGUE DESKTOP */}
        <div className="hidden items-center gap-3 lg:flex shrink-0">
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
            <button 
              type="button"
              onClick={() => setLang("fr")}
              className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${lang === "fr" ? "bg-[#386b34] text-white shadow" : "text-slate-600 dark:text-slate-400 hover:text-foreground"}`}
            >
              FR
            </button>
            <button 
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-2.5 py-1 text-xs font-bold transition-all ${lang === "en" ? "bg-[#386b34] text-white shadow" : "text-slate-600 dark:text-slate-400 hover:text-foreground"}`}
            >
              EN
            </button>
          </div>

          <a 
            href={waLink(quoteMsg)} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#386b34] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#386b34]/20 transition-all hover:scale-105 hover:bg-[#2e582b] whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>{t.btnQuote}</span>
          </a>
        </div>

        {/* HAMBURGER & SWITCH MOBILE */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
            <button 
              type="button"
              onClick={() => setLang("fr")}
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${lang === "fr" ? "bg-[#386b34] text-white" : "text-slate-600 dark:text-slate-400"}`}
            >
              FR
            </button>
            <button 
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${lang === "en" ? "bg-[#386b34] text-white" : "text-slate-600 dark:text-slate-400"}`}
            >
              EN
            </button>
          </div>

          <button 
            type="button"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" 
            onClick={() => setOpen((v) => !v)} 
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MENU DÉROULANT MOBILE */}
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#386b34] py-3.5 text-sm font-bold text-white shadow-md transition-all active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
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
    ? "Bonjour EDSOLAR, je souhaite discuter d'un projet solaire pour ma maison/entreprise." 
    : "Hello EDSOLAR, I would like to discuss a solar energy project for my home/business.";

  return (
    <section id="accueil" className="relative isolate overflow-hidden">
      <img src={hero} alt="Installateurs solaires EDSOLAR sur un toit à Yaoundé" width={1920} height={1080}
           className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#234d20]/95 via-[#1a3818]/90 to-[#234d20]/80" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-32 lg:grid-cols-[1.15fr_1fr] lg:py-40">
        <div className="text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-[#386b34]/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-200 backdrop-blur">
            <Zap className="h-3.5 w-3.5 text-emerald-300 fill-emerald-300" /> {t.heroTag}
          </span>
          <h1 className="mt-6 text-3xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t.heroTitle1}<span className="text-emerald-300">{t.heroTitle2}</span>{t.heroTitle3}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-emerald-100/90 sm:text-lg">
            {t.heroDesc}
          </p>

          {/* BANDEAU PAIEMENT FLEXIBLE AVEC LOGOS OFFICIELS */}
          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur text-xs text-slate-200">
            <span className="font-bold text-emerald-300">{lang === "fr" ? "Paiement flexible :" : "Flexible payment:"}</span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1 text-slate-900 font-extrabold shadow-sm">
                <img src={momoLogo} alt="" className="h-4 w-auto object-contain shrink-0" />
                <span>MTN MoMo</span>
              </span>
              <span className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1 text-slate-900 font-extrabold shadow-sm">
                <img src={orangeMoneyLogo} alt="" className="h-4 w-auto object-contain shrink-0" />
                <span>Orange Money</span>
              </span>
            </div>
            <span className="rounded-xl bg-[#386b34]/60 border border-emerald-400/30 px-2.5 py-1 text-emerald-100 font-semibold">{lang === "fr" ? "Traites échelonnées" : "Installments"}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#calculateur" className="inline-flex items-center gap-2 rounded-full bg-[#386b34] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#386b34]/30 transition-all hover:scale-105 hover:bg-[#4a8344]">
              <Zap className="h-4 w-4 fill-white" /> {t.heroSimulateBtn}
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
              <Phone className="h-4 w-4" /> {t.heroExpertBtn}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-emerald-100/90">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t.heroStat1}</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t.heroStat2}</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t.heroStat3}</div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="ml-auto max-w-sm rounded-3xl border border-emerald-400/20 bg-[#1a3818]/85 p-6 text-white shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <img src={logo} alt="EDSOLAR" className="h-14 w-14 rounded-xl bg-white object-contain p-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-200/70">{t.heroCardSub}</p>
                <p className="text-lg font-bold">{t.heroCardTitle}</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-emerald-100/90">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-emerald-300 shrink-0" /> Tradex Olembe, Yaoundé, Cameroun</div>
              <div className="flex items-start gap-3"><Leaf className="mt-0.5 h-4 w-4 text-emerald-300 shrink-0" /> {t.heroStat3}</div>
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-emerald-300 shrink-0" /> +237 650544444</div>
              <div className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-emerald-300 shrink-0" /> {EMAIL}</div>
            </div>
            <a href={waLink(waMsg)} target="_blank" rel="noreferrer"
               className="mt-5 flex items-center justify-center gap-2 rounded-full bg-[#386b34] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#4a8344]">
              <MessageCircle className="h-4 w-4 fill-white" /> WhatsApp direct
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PARTENAIRES SECTION (Avec vrais logos) ---------------- */
function Partners({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <section id="partenaires" className="border-y border-emerald-900/10 bg-card py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#386b34] dark:text-emerald-400 flex items-center justify-center gap-1.5">
            <Handshake className="h-4 w-4" /> {t.partnersEyebrow}
          </span>
          <h2 className="mt-2 text-2xl font-black text-foreground sm:text-3xl">{t.partnersTitle}</h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{t.partnersDesc}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {PARTNERS_DATA.map((partner) => (
            <div 
              key={partner.name} 
              className="group flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-5 text-center shadow-sm transition-all hover:border-[#386b34]/50 hover:shadow-md dark:bg-slate-900/80"
            >
              <div className="flex h-16 w-full items-center justify-center p-2 rounded-xl bg-white">
                <img src={partner.logo} alt={`Logo ${partner.name}`} className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105" />
              </div>
              <h3 className="mt-3 text-sm font-extrabold text-foreground">{partner.name}</h3>
              <p className="mt-1 text-[11px] text-muted-foreground leading-tight">{partner.desc}</p>
              <span className="mt-3 inline-block rounded-full bg-[#386b34]/10 px-2.5 py-0.5 text-[9px] font-bold text-[#386b34] dark:text-emerald-400">
                {partner.badge}
              </span>
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
            <div key={s.title} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-[#386b34]/40">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#386b34]/10 text-[#386b34] transition-colors group-hover:bg-[#386b34] group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <a href={waLink(lang === "fr" ? `Bonjour EDSOLAR, je suis intéressé par: ${s.title}` : `Hello EDSOLAR, I am interested in: ${s.title}`)} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#386b34] hover:gap-2 transition-all">
                {t.learnMore} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Kits ---------------- */
const DEFAULT_KITS = [
  { id: "d1", slug: "prestige", title: "Kit Prestige", subtitle: "CONFORT HAUT DE GAMME POUR VILLAS ET GRANDES RÉSIDENCES", description: "Le Kit Prestige 1500W (1.5 kVA) est la solution idéale pour les foyers souhaitant bénéficier d'une alimentation électrique fiable, écologique et sans coupures.", price: "500 000 FCFA", image_url: null as string | null, features: ["2 panneaux solaires de 200 Wc", "1 onduleur EDSOLAR 1500W (1.5 kVA)", "1 batterie Lithium 12V 100Ah", "1 contrôleur de charge MPPT 20A", "08 ampoules LED offertes", "Installation et mise en service gratuites"] },
  { id: "d2", slug: "congelateur", title: "Kit Congélateur", subtitle: "SOLUTION DÉDIÉE AUX COMMERCES ET POISSONNERIES", description: "Kit spécifiquement dimensionné pour maintenir un ou plusieurs congélateurs en fonctionnement continu, idéal pour boutiques, poissonneries et restaurants.", price: "1 700 000 FCFA", image_url: null, features: ["Onduleur 2 kVA / 24V", "Batterie lithium 25.6V 200Ah", "4 panneaux 450W", "Autonomie 12h", "Protection surtension"] },
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
                <p className="text-xs font-bold uppercase tracking-widest text-[#386b34]">{translateDynamicText(k.subtitle, lang)}</p>
                <h3 className="mt-1 text-xl font-black">{translateDynamicText(k.title, lang)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{translateDynamicText(k.description, lang)}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {(k.features ?? []).map((f: string) => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#386b34]" /> {translateDynamicText(f, lang)}</li>
                  ))}
                </ul>
                <a href={waLink(lang === "fr" ? `Bonjour EDSOLAR, je suis intéressé par le ${k.title} (${k.price ?? ""}).` : `Hello EDSOLAR, I am interested in the ${k.title} (${k.price ?? ""}).`)} target="_blank" rel="noreferrer"
                   className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#386b34] px-5 py-3 text-sm font-bold text-white transition-all hover:bg-[#2e582b] shadow-md">
                  <MessageCircle className="h-4 w-4 fill-white" /> {lang === "fr" ? "Demander ce kit" : "Request this kit"}
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
                  <div key={a.id} className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 transition-all ${active ? "border-[#386b34]/50 bg-[#386b34]/5" : "border-border bg-background"}`}>
                    <div className="flex min-w-0 items-center gap-3">
                      <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${active ? "bg-[#386b34] text-white" : "bg-slate-200 dark:bg-slate-800 text-foreground"}`}>
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
          <div className="rounded-3xl border border-emerald-900/40 bg-[#234d20] p-6 text-white shadow-2xl sm:p-8">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">{t.simEyebrow}</p>
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
               className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#386b34] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#2e582b]">
              <MessageCircle className="h-4 w-4 fill-white" /> {t.simSendWA}
            </a>
            <p className="mt-3 text-center text-xs text-emerald-100/70">{t.simNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-2xl border ${highlight ? "bg-[#386b34]/30 border-emerald-400/40 text-emerald-200" : "bg-[#1a3818]/70 border-emerald-900/40"} px-4 py-3`}>
      <div className="flex items-center gap-2.5">
        <Icon className={`h-4 w-4 ${highlight ? "text-emerald-300" : "text-emerald-200/70"}`} />
        <span className="text-xs sm:text-sm text-emerald-100/90">{label}</span>
      </div>
      <span className="text-base sm:text-lg font-black tabular-nums">{value}</span>
    </div>
  );
}

/* ---------------- Products (Boutique) ---------------- */
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
    let arr = (cat === "Tous") ? [...items] : items.filter((p) => p.category === cat);
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
      ? `Bonjour EDSOLAR, je souhaite commander :\n• Produit : ${p.name}\n• Prix : ${p.price ?? "Sur devis"}\n\nMerci de me donner la disponibilité.`
      : `Hello EDSOLAR, I would like to order:\n• Product: ${p.name}\n• Price: ${p.price ?? "Quote"}\n\nPlease confirm availability.`;
  };

  const adviceMsg = lang === "fr"
    ? "Bonjour EDSOLAR, j'ai besoin d'un conseil technique pour choisir mon équipement solaire."
    : "Hello EDSOLAR, I need technical advice to select my solar equipment.";

  return (
    <section id="boutique" className="bg-slate-100/70 dark:bg-slate-900/50 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.shopEyebrow} title={t.shopTitle} description={t.shopDesc} />

        {/* RECHERCHE & TRI */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder={t.shopSearchPlaceholder}
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none focus:border-[#386b34] shadow-sm" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold outline-none focus:border-[#386b34] shadow-sm">
            <option value="featured">{t.shopSortFeatured}</option>
            <option value="price_asc">{t.shopSortPriceAsc}</option>
            <option value="price_desc">{t.shopSortPriceDesc}</option>
            <option value="popularity">{t.shopSortPopularity}</option>
            <option value="warranty">{t.shopSortWarranty}</option>
          </select>
        </div>

        {/* FILTRES CATÉGORIES */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${cat === c ? "bg-[#386b34] text-white shadow-md" : "border border-border bg-card text-foreground hover:border-[#386b34]"}`}>
              {c === "Tous" ? (lang === "fr" ? "Tous" : "All") : translateDynamicText(c, lang)}
            </button>
          ))}
        </div>

        {/* BANDEAU COMBINÉ : PILIERS RÉASSURANCE + CONSEIL TECHNIQUE */}
        <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-3xl border border-[#386b34]/20 bg-card p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            
            {/* Les 3 Piliers de Réassurance */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#386b34]/10 text-[#386b34]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{lang === "fr" ? "Matériel Certifié" : "Certified Equipment"}</p>
                  <p className="text-[11px] text-muted-foreground">{lang === "fr" ? "Produits Tier 1 garantis" : "Guaranteed Tier-1 products"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#386b34]/10 text-[#386b34]">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{lang === "fr" ? "Livraison Cameroun" : "Cameroon Shipping"}</p>
                  <p className="text-[11px] text-muted-foreground">{lang === "fr" ? "Yaoundé & toutes régions" : "Yaoundé & all regions"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#386b34]/10 text-[#386b34]">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{lang === "fr" ? "SAV & Support" : "After-Sales Support"}</p>
                  <p className="text-[11px] text-muted-foreground">{lang === "fr" ? "Assistance technique 7j/7" : "7/7 Technical assistance"}</p>
                </div>
              </div>
            </div>

            {/* Bouton d'Aide WhatsApp */}
            <div className="flex flex-col sm:flex-row items-center justify-between lg:justify-end gap-3 pt-4 border-t border-border lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
              <div className="text-center sm:text-left lg:text-right">
                <p className="text-xs font-bold text-foreground">{lang === "fr" ? "Besoin d'aide pour choisir ?" : "Need help choosing?"}</p>
                <p className="text-[11px] text-muted-foreground">{lang === "fr" ? "Parlez à un ingénieur" : "Talk to a solar engineer"}</p>
              </div>
              <a href={waLink(adviceMsg)} target="_blank" rel="noreferrer"
                 className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#386b34] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-[#2e582b]">
                <MessageCircle className="h-4 w-4" />
                <span>{lang === "fr" ? "Conseil WhatsApp" : "WhatsApp Advice"}</span>
              </a>
            </div>

          </div>
        </div>

        {/* GRILLE DE PRODUITS */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <div key={p.id} className="flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition-transform hover:-translate-y-1">
              <div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                {p.image_url
                  ? <img src={p.image_url} alt={p.name} loading="lazy" className="h-full w-full object-contain p-3" />
                  : <ShoppingBag className="h-16 w-16 text-slate-400" />}
                {p.badge && <span className="absolute left-3 top-3 rounded-full bg-[#386b34] px-2.5 py-1 text-[10px] font-bold uppercase text-white">{translateDynamicText(p.badge, lang)}</span>}
              </div>
              <h3 className="mt-4 text-base font-bold">{p.name}</h3>
              {p.description && <p className="mt-1 text-xs text-muted-foreground">{translateDynamicText(p.description, lang)}</p>}
              <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-semibold">
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-700 dark:text-slate-300">{translateDynamicText(p.category, lang)}</span>
                {p.warranty && <span className="rounded-full bg-[#386b34]/10 px-2 py-0.5 text-[#386b34]">{translateDynamicText(p.warranty, lang)}</span>}
              </div>
              <div className="mt-4 flex items-end justify-between gap-2">
                <span className="text-lg font-black text-[#386b34] dark:text-emerald-400">{p.price ?? (lang === "fr" ? "Sur devis" : "On request")}</span>
              </div>
              <a href={waLink(buildOrderMsg(p))} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#386b34] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#2e582b]">
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

/* ---------------- SECTION : ANTI-CONTREFAÇON ---------------- */
function QualityComparison({ lang }: { lang: Lang }) {
  return (
    <section id="qualite" className="py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader 
          eyebrow={lang === "fr" ? "Sécurité & Transparence" : "Safety & Transparency"} 
          title={lang === "fr" ? "Pourquoi choisir EDSOLAR vs le matériel du marché ?" : "Why choose EDSOLAR vs market equipment?"} 
          description={lang === "fr" ? "Évitez les pièges de la contrefaçon. Découvrez ce qui fait la différence pour la sécurité de votre famille." : "Avoid counterfeit traps. See what makes the difference for your family's safety."} 
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Mauvaise Qualité / Marché Local */}
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 sm:p-8">
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-6 w-6 shrink-0" />
              <h3 className="text-lg font-bold">{lang === "fr" ? "Matériel Bas de Gamme du Marché" : "Low Quality Market Equipment"}</h3>
            </div>
            <ul className="mt-6 space-y-3.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <span>{lang === "fr" ? "Batteries GEL/Plomb périmées qui lâchent après 12 mois." : "Expired Gel/Lead batteries failing after 12 months."}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <span>{lang === "fr" ? "Onduleurs sans protection surtension (risque d'incendie)." : "Inverters lacking surge protection (fire risk)."}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <span>{lang === "fr" ? "Panneaux sous-dimensionnés et garanties fictives." : "Undersized panels and fake warranties."}</span>
              </li>
              <li className="flex items-start gap-3">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
                <span>{lang === "fr" ? "Aucun SAV après encaissement de votre argent." : "No after-sales support once paid."}</span>
              </li>
            </ul>
          </div>

          {/* Qualité EDSOLAR */}
          <div className="rounded-3xl border border-[#386b34]/30 bg-[#386b34]/5 p-6 sm:p-8 shadow-md">
            <div className="flex items-center gap-3 text-[#386b34] dark:text-emerald-400">
              <ShieldCheck className="h-6 w-6 shrink-0" />
              <h3 className="text-lg font-bold">{lang === "fr" ? "Engagement & Qualité EDSOLAR" : "EDSOLAR Commitment & Quality"}</h3>
            </div>
            <ul className="mt-6 space-y-3.5 text-sm text-foreground">
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#386b34]" />
                <span><strong>{lang === "fr" ? "Batteries Lithium LiFePO4 :" : "Lithium LiFePO4 Batteries:"}</strong> {lang === "fr" ? "Durée de vie +10 ans, tolérance aux fortes chaleurs." : "+10 year lifespan, heat tolerant."}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#386b34]" />
                <span><strong>{lang === "fr" ? "Onduleurs Hybrides Certifiés :" : "Certified Hybrid Inverters:"}</strong> {lang === "fr" ? "Protections intégrées contre les coupures brutales." : "Built-in protection against brutal outages."}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#386b34]" />
                <span><strong>{lang === "fr" ? "Panneaux Tier 1 :" : "Tier-1 Panels:"}</strong> {lang === "fr" ? "Production optimale même par temps nuageux, garantie 25 ans." : "Optimal yield even on cloudy days, 25yr warranty."}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#386b34]" />
                <span><strong>{lang === "fr" ? "Équipe sur place à Yaoundé :" : "On-site Team in Yaoundé:"}</strong> {lang === "fr" ? "Intervention garantie et suivi personnalisé." : "Guaranteed intervention and personal follow-up."}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION : SPÉCIAL DIASPORA ---------------- */
function DiasporaSection({ lang }: { lang: Lang }) {
  const diasporaMsg = lang === "fr"
    ? "Bonjour EDSOLAR, je vis à l'étranger (Diaspora) et je souhaite équiper la maison familiale au pays."
    : "Hello EDSOLAR, I live abroad (Diaspora) and want to equip my family home back in Cameroon.";

  return (
    <section id="diaspora" className="bg-[#234d20] py-16 text-white sm:py-28 border-t border-emerald-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300">
              <Globe className="h-3.5 w-3.5 text-emerald-300" /> {lang === "fr" ? "Offre Diaspora Camerounaise" : "Cameroonian Diaspora Offer"}
            </span>
            <h2 className="mt-4 text-2xl font-black sm:text-4xl text-white">
              {lang === "fr" ? "Équipez la maison familiale au pays en toute tranquillité" : "Equip your family home back home with total peace of mind"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/90 sm:text-base">
              {lang === "fr"
                ? "Vous vivez en France, au Canada, aux USA ou en Europe ? Offrez le confort solaire à vos parents et vos proches au Cameroun sans stress. Nous gérons tout de A à Z avec un suivi photos/vidéos en direct."
                : "Living in France, Canada, USA, or Europe? Provide solar comfort to your family in Cameroon stress-free. We manage everything from A to Z with live photo/video updates."}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-sm text-emerald-100/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <span>{lang === "fr" ? "Paiement sécurisé à distance (CB Internationale, Virement, Ria/Western Union)." : "Secure remote payment (International Card, Wire transfer, Ria/Western Union)."}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-emerald-100/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <span>{lang === "fr" ? "Compte-rendu vidéo WhatsApp direct à chaque étape du chantier." : "Direct WhatsApp video reports at every stage of the installation."}</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-emerald-100/90">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <span>{lang === "fr" ? "Visite technique gratuite du logement à Yaoundé, Douala ou en région." : "Free home technical survey in Yaoundé, Douala, or other regions."}</span>
              </div>
            </div>

            <div className="mt-8">
              <a href={waLink(diasporaMsg)} target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-[#386b34] px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-[#2e582b]">
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>{lang === "fr" ? "Lancer un projet à distance" : "Start a project from abroad"}</span>
              </a>
            </div>
          </div>

          <div className="relative rounded-3xl border border-emerald-700/40 bg-[#1a3818]/90 p-6 sm:p-8 backdrop-blur shadow-2xl">
            <h3 className="text-lg font-bold text-emerald-300">{lang === "fr" ? "Modes de Règlement Acceptés" : "Accepted Payment Methods"}</h3>
            <p className="mt-1 text-xs text-emerald-200/70">{lang === "fr" ? "Pour vos proches au pays ou depuis l'étranger :" : "For local relatives or from abroad:"}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3.5 text-slate-900 shadow-md">
                <div className="flex items-center gap-2">
                  <img src={momoLogo} alt="" className="h-5 w-auto object-contain shrink-0" />
                  <span className="font-extrabold text-xs text-slate-900">MTN MoMo</span>
                </div>
                <span className="text-slate-500 text-[10px] mt-1.5 font-medium">{lang === "fr" ? "Règlement local rapide" : "Fast local payment"}</span>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3.5 text-slate-900 shadow-md">
                <div className="flex items-center gap-2">
                  <img src={orangeMoneyLogo} alt="" className="h-5 w-auto object-contain shrink-0" />
                  <span className="font-extrabold text-xs text-slate-900">Orange Money</span>
                </div>
                <span className="text-slate-500 text-[10px] mt-1.5 font-medium">{lang === "fr" ? "Règlement local rapide" : "Fast local payment"}</span>
              </div>

              <div className="rounded-2xl border border-emerald-800/60 bg-[#122910]/80 p-3.5">
                <span className="font-bold text-white block">Carte Visa / Mastercard</span>
                <span className="text-emerald-200/60 text-[10px]">{lang === "fr" ? "Paiement en ligne sécurisé" : "Secure online payment"}</span>
              </div>

              <div className="rounded-2xl border border-emerald-800/60 bg-[#122910]/80 p-3.5">
                <span className="font-bold text-white block">Virement & Agence</span>
                <span className="text-emerald-200/60 text-[10px]">{lang === "fr" ? "SEPA / Swift / Ria / WU" : "SEPA / Swift / Ria / WU"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WhatsApp Channel Section ---------------- */
function WhatsAppChannel({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <section id="canal" className="relative overflow-hidden bg-[#234d20] py-16 text-slate-100 sm:py-28 border-t border-emerald-900/30">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25D366]/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#25D366]">
            <Radio className="h-3.5 w-3.5 animate-pulse" /> {t.channelTag}
          </span>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            {t.channelTitle1}<span className="text-[#25D366]">{t.channelTitle2}</span>
          </h2>
          <p className="mt-4 text-sm text-emerald-100/70 sm:text-lg">
            {t.channelDesc}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="group rounded-2xl border border-emerald-800/30 bg-[#1a3818]/60 p-6 backdrop-blur transition-all hover:border-[#25D366]/50">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
              <Video className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">{t.c1Title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-emerald-200/60">{t.c1Desc}</p>
          </div>

          <div className="group rounded-2xl border border-emerald-800/30 bg-[#1a3818]/60 p-6 backdrop-blur transition-all hover:border-[#25D366]/50">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
              <Camera className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">{t.c2Title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-emerald-200/60">{t.c2Desc}</p>
          </div>

          <div className="group rounded-2xl border border-emerald-800/30 bg-[#1a3818]/60 p-6 backdrop-blur transition-all hover:border-[#25D366]/50 sm:col-span-2 md:col-span-1">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-white">{t.c3Title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-emerald-200/60">{t.c3Desc}</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-800/50 bg-[#1a3818] p-6 shadow-2xl backdrop-blur sm:p-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-lg sm:text-xl font-bold text-white">{t.channelSubscribers}</p>
              <p className="mt-1 text-xs sm:text-sm text-emerald-200/60">{t.channelSubNote}</p>
            </div>
            <a href={WA_CHANNEL_URL} target="_blank" rel="noreferrer"
               className="inline-flex shrink-0 items-center gap-3 rounded-full bg-[#25D366] px-6 py-3.5 text-sm sm:text-base font-bold text-slate-950 shadow-lg transition-all hover:scale-105 hover:bg-[#20ba59]">
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
              <div className="mx-auto grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-[#386b34]/10 text-[#386b34]">
                <s.icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">{s.value}</div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          {["Normes IEC 61215", "ISO 9001", "Garantie 25 ans", "Ingénieurs certifiés", "Support 7j/7"].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#386b34]/20 bg-[#386b34]/10 px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-[#386b34] dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#386b34]" /> {b}
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
                  <p className="text-sm font-bold">{translateDynamicText(g.title, lang)}</p>
                  <p className="text-xs text-muted-foreground">{g.loc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#386b34] shrink-0" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- About (Mise à jour : Vision, 4 Grands Piliers, Presence depuis 2017 & Galerie de 9 Photos terrain) ---------------- */
function About({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  const PILLARS = [
    { name: "Gratitude", icon: Smile, desc: "Reconnaissance sincère envers la nature et chaque client" },
    { name: "Abondance", icon: Sparkles, desc: "Accès universel à une énergie propre et illimitée" },
    { name: "Amour", icon: Heart, desc: "Passion au service de l'humain et du bien-être général" },
    { name: "Compassion", icon: ShieldCheck, desc: "Bienveillance et soutien actif face aux défis quotidiens" },
  ];

  const ECOSYSTEM = [
    { name: "EDSHOP", tag: "Commerce & Distribution", icon: ShoppingBag },
    { name: "EDFOOD", tag: "Alimentation & Nutrition", icon: Utensils },
    { name: "EDCARE", tag: "Santé & Services Médicaux", icon: Stethoscope },
    { name: "EDSERVICE", tag: "Services à domicile (nettoyage, garde, etc.)", icon: Home },
    { name: "EDAUTO", tag: "Véhicule écologique", icon: Car },
  ];

  return (
    <section id="apropos" className="py-16 sm:py-28 bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#386b34]">{t.aboutEyebrow}</span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {t.aboutTitle}
            </h2>
            
            <p className="mt-4 text-base font-semibold text-foreground leading-relaxed">
              {t.aboutPillarsText}
            </p>

            {/* 4 Grands Piliers fondamentaux */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {PILLARS.map((v) => (
                <div key={v.name} className="flex items-start gap-3 rounded-2xl border border-[#386b34]/20 bg-[#386b34]/5 p-3.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#386b34] text-white">
                    <v.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-foreground">{v.name}</h4>
                    <p className="text-[11px] text-muted-foreground leading-tight">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3.5 text-sm text-muted-foreground leading-relaxed">
              <p className="border-l-4 border-[#386b34] pl-3 py-1 bg-emerald-500/5 rounded-r-xl">
                <strong className="text-foreground">Notre mission :</strong> {t.aboutMissionText}
              </p>
              <p className="border-l-4 border-[#386b34] pl-3 py-1 bg-emerald-500/5 rounded-r-xl">
                <strong className="text-foreground">Notre vision :</strong> {t.aboutVisionText}
              </p>
            </div>

            {/* PRÉCISION HISTORIQUE DEPUIS 2017 */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#386b34]/30 bg-[#386b34]/10 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#386b34] text-white">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#386b34]">Présence sur le terrain</span>
                <p className="mt-0.5 text-sm font-bold text-foreground leading-snug">
                  {t.aboutPresenceText}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Carte Écosystème Futur */}
            <div className="rounded-3xl border border-emerald-900/30 bg-[#234d20] p-6 text-white shadow-xl">
              <h3 className="text-base font-extrabold text-emerald-300">{t.aboutEcosystemTitle}</h3>
              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {ECOSYSTEM.map((e) => (
                  <div key={e.name} className="flex items-center gap-2.5 rounded-xl bg-[#1a3818]/80 p-2.5 border border-emerald-800/40">
                    <e.icon className="h-4 w-4 text-emerald-300 shrink-0" />
                    <div>
                      <span className="text-xs font-black text-white block">{e.name}</span>
                      <span className="text-[10px] text-emerald-200/70 block leading-tight">{e.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs text-emerald-100/90 italic leading-relaxed border-t border-emerald-800/50 pt-4">
                "{t.aboutConclusion}"
              </p>
            </div>

            {/* GALERIE COMPLETE DES 9 PHOTOS DU TERRAIN */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">En direct du terrain — Nos équipes à l'œuvre</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FIELD_IMAGES.map((img, idx) => (
                  <div key={idx} className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-slate-100 shadow-sm">
                    <img src={img.src} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-2.5">
                      <p className="text-[10px] font-bold text-white leading-tight">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
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
        
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1.2fr] items-start">
          
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard icon={MapPin} title={t.contactHeadquarters} lines={["Tradex Olembe", "Yaoundé, Cameroun"]} />
              <ContactCard icon={Leaf} title={t.contactZone} lines={["Tout le Cameroun", "& Afrique Centrale"]} />
              <ContactCard icon={Phone} title={t.contactPhone} lines={["+237 650544444"]} href={`tel:${PHONE}`} />
              <ContactCard icon={Mail} title={t.contactEmail} lines={[EMAIL]} href={`mailto:${EMAIL}`} />
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm h-64 sm:h-72 w-full">
              <iframe 
                title="EDSOLAR Yaoundé" 
                className="h-full w-full border-0"
                src="https://www.google.com/maps?q=Tradex+Olembe+Yaounde&output=embed" 
                loading="lazy" 
              />
            </div>
          </div>

          <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.formName} value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label={t.formPhone} value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required type="tel" />
              <Field label={t.formLocation} value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="Ex: Bastos, Yaoundé" />
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.formProjectType}</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[#386b34]">
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
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[#386b34]" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.formMessage}</label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={lang === "fr" ? "Décrivez brièvement votre besoin..." : "Briefly describe your request..."}
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[#386b34]" />
              </div>
            </div>
            <button type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#386b34] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#2e582b] sm:w-auto">
              <Send className="h-4 w-4" /> {t.formSubmit}
            </button>
            {sent && <p className="mt-3 text-sm text-[#386b34] font-semibold">{t.formSuccess}</p>}
          </form>

        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, title, lines, href }: { icon: any; title: string; lines: string[]; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm transition-transform hover:-translate-y-1 h-full">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#386b34]/10 text-[#386b34]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
        {lines.map((l) => (
          <p key={l} className="mt-0.5 text-sm font-bold text-foreground break-all">{l}</p>
        ))}
      </div>
    </div>
  );
  return href ? <a href={href} className="block h-full">{inner}</a> : inner;
}

function Field({ label, value, onChange, required, type = "text", placeholder }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <input type={type} required={required} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-[#386b34]" />
    </div>
  );
}

/* ---------------- FOOTER AVEC LOGOS PARTENAIRES VISIBLES ---------------- */
function Footer({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <footer className="border-t border-emerald-900/40 bg-[#1d3d19] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* COLONNE 1 : LOGO & INFOS */}
        <div>
          <a href="/" className="inline-flex items-center gap-3" aria-label="Retour à l'accueil">
            <img src={logo} alt="EDSOLAR Énergie Cameroun" className="h-12 w-12 rounded-xl bg-white object-contain p-1 shadow-md" />
            <div>
              <p className="text-lg font-black text-white">EDSOLAR</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-emerald-300 font-bold">Énergie Cameroun</p>
            </div>
          </a>
          <p className="mt-4 text-xs leading-relaxed text-emerald-100/70">
            Solutions solaires photovoltaïques haute performance et certifiées Tier 1 au Cameroun et en Afrique Centrale.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((I, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full bg-[#122910] text-emerald-200 transition-colors hover:bg-[#386b34] hover:text-white border border-emerald-800/50">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* COLONNE 2 : NAVIGATION */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-300">{t.footerNav}</p>
          <ul className="mt-4 space-y-2 text-xs text-emerald-100/70">
            <li><a href="#partenaires" className="hover:text-emerald-300 transition-colors">{t.navPartners}</a></li>
            <li><a href="#services" className="hover:text-emerald-300 transition-colors">{t.navServices}</a></li>
            <li><a href="#kits" className="hover:text-emerald-300 transition-colors">{t.navKits}</a></li>
            <li><a href="#boutique" className="hover:text-emerald-300 transition-colors">{t.navBoutique}</a></li>
            <li><a href="#calculateur" className="hover:text-emerald-300 transition-colors">{t.navSimulator}</a></li>
            <li><a href="#apropos" className="hover:text-emerald-300 transition-colors">Vision & Valeurs</a></li>
          </ul>
        </div>

        {/* COLONNE 3 : CONTACT */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-300">{t.footerContact}</p>
          <ul className="mt-4 space-y-2.5 text-xs text-emerald-100/70">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-emerald-300" /> Tradex Olembe, Yaoundé</li>
            <li className="flex gap-2"><Leaf className="h-4 w-4 shrink-0 text-emerald-300" /> Cameroun & Afrique Centrale</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-emerald-300" /> +237 650544444</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-emerald-300" /> edsolarcam@gmail.com</li>
          </ul>
        </div>

        {/* COLONNE 4 : PARTENAIRES AVEC LOGOS VISIBLES */}
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-emerald-300">{t.footerPartners}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {PARTNERS_DATA.map((p) => (
              <div key={p.name} className="flex items-center justify-center rounded-lg bg-white p-1.5 shadow-sm border border-emerald-950 h-10">
                <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="border-t border-emerald-900/30 bg-[#122910]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-emerald-100/50 sm:flex-row sm:px-6">
          <p>{t.footerRights}</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="/mentions-legales" className="hover:text-emerald-300">{t.footerLegal}</a>
            <a href="/confidentialite" className="hover:text-emerald-300">{t.footerPrivacy}</a>
            <a href="/cookies" className="hover:text-emerald-300">{t.footerCookies}</a>
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
      <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-emerald-400 text-[10px] font-black text-slate-950 animate-pulse">1</span>
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
      type="button"
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
      <span className="text-xs font-bold uppercase tracking-widest text-[#386b34] dark:text-emerald-400">{eyebrow}</span>
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
                  className="mt-1 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-[#386b34]" />
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
                      <Star className={`pointer-events-none h-7 w-7 sm:h-8 sm:w-8 ${n <= (hoverRating || form.rating) ? "fill-[#386b34] text-[#386b34]" : "text-muted-foreground/30"}`} />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-muted-foreground">{form.rating}/5</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.reviewsComment}</label>
                <textarea rows={4} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required
                  className="mt-1 w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-[#386b34]" />
              </div>
              <button disabled={busy} className="w-full rounded-full bg-[#386b34] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2e582b] disabled:opacity-60">
                {busy ? t.reviewsSending : t.reviewsSubmit}
              </button>
              {sent && <p className="text-sm text-[#386b34] font-semibold">{t.reviewsSuccess}</p>}
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
                    <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-[#386b34] text-[#386b34]" : "text-muted-foreground/30"}`} />
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
