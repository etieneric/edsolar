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

// Imports des 9 images de terrain locales
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
import orangeMoneyLogo from "@/assets/OrangeMoney.png";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "EDSOLAR Énergie Cameroun — Installation Solaire à Yaoundé & Afrique Centrale",
      },
      {
        name: "description",
        content:
          "Solutions anti-délestage Eneo, installation de panneaux solaires, batteries Lithium et matériel certifié à Yaoundé. Contactez-nous à edsolarcam@gmail.com ou au +237 650544444.",
      },
      {
        property: "og:title",
        content:
          "EDSOLAR Énergie Cameroun — Installation Solaire & Anti-Délestage",
      },
      {
        property: "og:description",
        content:
          "Fini les coupures Eneo. Équipements solaires certifiés Tier 1 à Yaoundé et livraison dans toute l'Afrique Centrale.",
      },

      // Vérification Google Search Console
      {
        name: "google-site-verification",
        content: "AZgs_Swa5ZCBipELur5gmowIYDrg1h_3VuNUvaQugEk",
      },
    ],
  }),
  component: Index,
});
  component: Index,
});

const PHONE = "+237650544444";
const EMAIL = "edsolarcam@gmail.com";
const WA = `https://wa.me/${PHONE.replace("+", "")}`;
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@EDSOLAR237";
const YOUTUBE_CHANNEL_ID = "UCCfnDu6TV2B-_NO6E_tWm7Q";
const YOUTUBE_UPLOADS_PLAYLIST = "UUCfnDu6TV2B-_NO6E_tWm7Q";

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

// Galerie par défaut des 9 photos du terrain
const INITIAL_FIELD_IMAGES = [
  { src: field2, caption: "Équipe EDSOLAR en rassemblement sur le terrain", location: "Yaoundé, Cameroun" },
  { src: field9, caption: "Déplacement en pirogue pour installation en zone enclavée", location: "Nyong-et-So'o, Cameroun" },
  { src: field1, caption: "Installation & câblage technique du coffret solaire", location: "Olembe, Yaoundé" },
  { src: field7, caption: "Fixation et pose de panneaux solaires sur toiture", location: "Bastos, Yaoundé" },
  { src: field4, caption: "Moments d'enthousiasme et de cohésion d'équipe", location: "Siège EDSOLAR, Yaoundé" },
  { src: field8, caption: "Recherche & développement de solutions énergétiques", location: "Atelier EDSOLAR" },
  { src: field3, caption: "Mission technique d'installation en région", location: "Ebolowa, Cameroun" },
  { src: field5, caption: "Équipe de techniciens qualifiés prêts pour l'intervention", location: "Douala, Cameroun" },
  { src: field6, caption: "Vérification et raccordement des panneaux solaires", location: "Kribi, Cameroun" },
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

    channelTag: "Vidéos & Shorts du terrain",
    channelTitle1: "Rejoignez la Chaîne ",
    channelTitle2: "YouTube EDSOLAR",
    channelDesc: "Abonnez-vous à notre chaîne officielle pour découvrir nos réalisations en vidéo, tutoriels et démonstrations du matériel.",
    channelSubscribers: "Suivez nos vidéos & Shorts exclusifs sur YouTube !",
    channelSubNote: "Abonnez-vous gratuitement à la chaîne @EDSOLAR237",
    channelBtn: "S'abonner sur YouTube",

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
    aboutVisionText: "Notre vision est de bâtir un avenir où chaque famille, chaque entreprise et chaque communauté bénéficie d'une énergie propre, fiable et accessible.",
    aboutPresenceText: "Depuis 2017, nous déployons nos activités et notre savoir-faire sur l'ensemble du territoire camerounais.",
    aboutEcosystemTitle: "Cette vision s'étendra progressivement à d'autres domaines essentiels du quotidien :",
    aboutConclusion: "EDSOLAR, ce n'est pas seulement une entreprise. C'est une vision, un engagement et un mouvement au service du bien-être total.",

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
    navYouTube: "Videos",
    navReviews: "Customer Reviews",
    navContact: "Contact",
    btnQuote: "Free Quote",
    
    heroTag: "No more blackout issues with Eneo",
    heroTitle1: "Solar Energy ",
    heroTitle2: "Autonomous & Eco-Friendly",
    heroTitle3: " for Your Comfort",
    heroDesc: "Ensure 24/7 electricity at home and office. Tier 1 certified equipment, guaranteed installations and responsive after-sales service.",
    heroSimulateBtn: "Simulate your energy needs",
    heroExpertBtn: "Contact an expert",
    heroStat1: "+500 successful installations",
    heroStat2: "25-year warranty",
    heroStat3: "Cameroon & Central Africa",
    heroCardTitle: "EDSOLAR Yaoundé",
    heroCardSub: "Direct contact",

    partnersEyebrow: "Trust & Quality",
    partnersTitle: "Our Official Brands & Partners",
    partnersDesc: "We work directly with world leaders in solar technology to guarantee Tier 1 certified equipment.",

    servicesEyebrow: "Our Services",
    servicesTitle: "Complete expertise in solar energy",
    servicesDesc: "From audit to commissioning, EDSOLAR supports you at every step of your energy transition.",
    s1Title: "Custom Solar Installation",
    s1Desc: "Autonomous (Off-Grid), hybrid, and grid-tied systems for residences, businesses, and industries.",
    s2Title: "Maintenance & Repair",
    s2Desc: "Technical inspection, panel cleaning, preventive maintenance, and inverter/battery replacement.",
    s3Title: "Solar Equipment Sales",
    s3Desc: "Photovoltaic panels, hybrid inverters, Lithium/Gel batteries, and MPPT controllers.",
    s4Title: "Energy Audit & Consulting",
    s4Desc: "Precise sizing by qualified engineers to optimize your energy consumption.",
    learnMore: "Learn more",

    simEyebrow: "Quote Simulator",
    simTitle: "Estimate your solar setup in 1 minute",
    simDesc: "Select your appliances. Instantly get recommended capacity and budget estimate.",
    simResultTitle: "Real-time results",
    simPeakPower: "Peak power",
    simDailyCons: "Daily consumption",
    simRecSystem: "Recommended system",
    simLithiumBatt: "Lithium batteries",
    simPanels: "450W solar panels",
    simBudget: "Estimated budget",
    simSendWA: "Get quote on WhatsApp",
    simNote: "Indicative estimation — final validation by our engineers.",

    shopEyebrow: "Shop",
    shopTitle: "Factory-certified solar equipment",
    shopDesc: "Panels, Lithium batteries, inverters and full kits — 100% genuine.",
    shopSearchPlaceholder: "Search equipment (inverter, battery, panel…)",
    shopSortFeatured: "Sort: Featured",
    shopSortPriceAsc: "Price: Low to High",
    shopSortPriceDesc: "Price: High to Low",
    shopSortPopularity: "Popularity",
    shopSortWarranty: "Warranty (Long → Short)",
    shopOrderWA: "Order via WhatsApp",
    shopNoProduct: "No product matches your search.",

    channelTag: "Field Videos & Shorts",
    channelTitle1: "Join the Official ",
    channelTitle2: "YouTube Channel EDSOLAR",
    channelDesc: "Subscribe to our channel to watch video project tours, Shorts, tutorials and demos.",
    channelSubscribers: "Watch exclusive videos & Shorts on YouTube!",
    channelSubNote: "Subscribe for free to @EDSOLAR237",
    channelBtn: "Subscribe on YouTube",

    trustEyebrow: "Why choose us?",
    trustTitle: "Trusted by hundreds of customers",
    trustDesc: "100% local expertise serving Cameroon and Central Africa 🌍.",
    trustStat1: "Installations completed",
    trustStat2: "Customer satisfaction",
    trustStat3: "Intervention in Yaoundé",
    trustStat4: "Years of experience",

    realEyebrow: "Our Projects",
    realTitle: "Recent projects in Cameroon",
    realDesc: "Explore our latest residential and commercial solar installations.",

    reviewsEyebrow: "Reviews",
    reviewsTitle: "Share your experience with EDSOLAR",
    reviewsDesc: "Your feedback matters. Leave a review — published upon team validation.",
    reviewsLeaveTitle: "Write a review",
    reviewsName: "Name",
    reviewsRating: "Rating",
    reviewsComment: "Your comment",
    reviewsSubmit: "Publish review",
    reviewsSending: "Sending…",
    reviewsSuccess: "Thank you! Your review will be published after validation.",
    reviewsEmpty: "Be the first to share your experience!",

    aboutEyebrow: "Our Vision & Mission",
    aboutTitle: "EDSOLAR — Strong commitment to sustainable well-being",
    aboutPillarsText: "EDSOLAR stands on four main pillars: Gratitude, Abundance, Love and Compassion.",
    aboutMissionText: "Our mission is to help people access affordable solar energy.",
    aboutVisionText: "Our vision is a future where every household and business enjoys clean, reliable and accessible energy.",
    aboutPresenceText: "Since 2017, we operate throughout Cameroon.",
    aboutEcosystemTitle: "This vision progressively expands to other essential services:",
    aboutConclusion: "EDSOLAR is more than a company. It is a vision, commitment and movement for total well-being.",

    contactEyebrow: "Contact",
    contactTitle: "Let's discuss your solar project",
    contactDesc: "Fill the form or contact us — an expert responds within 24h.",
    contactHeadquarters: "Headquarters",
    contactZone: "Intervention zone",
    contactPhone: "Phone / WhatsApp",
    contactEmail: "E-mail Address",
    formName: "Full name",
    formPhone: "Phone",
    formLocation: "Location / City",
    formProjectType: "Project type",
    formNeeds: "Specific requirements",
    formMessage: "Message",
    formSubmit: "Send via WhatsApp",
    formSuccess: "Thank you! Message prepared on WhatsApp.",

    footerNav: "Navigation",
    footerContact: "Contact",
    footerPartners: "Certified Partners",
    footerRights: "© 2026 Bimedia Connect Agency. All rights reserved.",
    footerLegal: "Legal notice",
    footerPrivacy: "Privacy policy",
    footerCookies: "Cookies",
  }
};

/* ---------------- Traduction dynamique universelle ---------------- */
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

/* ---------------- INTERRUPTEUR DE MAINTENANCE ---------------- */
// Passe cette variable à "false" pour rétablir le site normal immédiatement.
const IS_MAINTENANCE_MODE = false;

function MaintenanceView() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center selection:bg-[#386b34] selection:text-white">
      <div className="max-w-md rounded-3xl bg-slate-900 p-8 border border-emerald-900/40 shadow-2xl relative overflow-hidden">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[#386b34]/20 text-[#386b34] border border-[#386b34]/30">
          <Wrench className="h-8 w-8 text-emerald-400" />
        </div>
        
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 mb-4">
          <AlertTriangle className="h-3.5 w-3.5" /> Maintenance technique en cours
        </div>

        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">EDSOLAR Énergie</h1>
        
        <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          Notre plateforme est actuellement en cours de mise à jour et de maintenance technique planifiée. 
          L'accès aux services en ligne sera rétabli sous peu.
        </p>

        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col items-center justify-center gap-2 text-xs text-slate-400">
          <p>Pour toute urgence technique ou commerciale :</p>
          <a 
            href={`tel:${PHONE}`} 
            className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:underline"
          >
            <Phone className="h-3.5 w-3.5" /> +237 650544444
          </a>
        </div>

        <p className="mt-6 text-[10px] text-slate-600 uppercase tracking-widest font-semibold">
          Code Référence : MAINT-503-SYS
        </p>
      </div>
    </div>
  );
}

function Index() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = TRANSLATIONS[lang] || TRANSLATIONS.fr;

  // Si le mode maintenance est activé, seul le composant de maintenance est rendu
  if (IS_MAINTENANCE_MODE) {
    return <MaintenanceView />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#386b34] selection:text-white overflow-x-hidden">
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

  const navMobile = [
    { href: "#accueil", label: t.navHome },
    { href: "#partenaires", label: t.navPartners },
    { href: "#services", label: t.navServices },
    { href: "#kits", label: t.navKits },
    { href: "#boutique", label: t.navBoutique },
    { href: "#calculateur", label: t.navSimulator },
    { href: "#qualite", label: lang === "fr" ? "Anti-Contrefaçon" : "Quality vs Fakes" },
    { href: "#diaspora", label: "Diaspora" },
    { href: "#videos", label: t.navYouTube },
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
        <a href="#accueil" className="flex items-center gap-2 shrink-0">
          <img 
            src={logo} 
            alt="EDSOLAR Énergie Cameroun" 
            className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-white object-contain p-0.5 shadow-sm border border-slate-100" 
          />
          <span className="flex flex-col leading-tight">
            <span className="text-sm sm:text-lg font-black tracking-tight text-slate-900 dark:text-white">EDSOLAR</span>
            <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-[#386b34]">Énergie Cameroun</span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex">
          {navDesktop.map((n) => (
            <a 
              key={n.href} 
              href={n.href} 
              className="text-xs xl:text-sm font-semibold text-slate-700 transition-colors hover:text-[#386b34] dark:text-slate-200 whitespace-nowrap"
            >
              {n.label}
            </a>
          ))}
        </nav>

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
            className="inline-flex items-center gap-2 rounded-full bg-[#386b34] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#386b34]/20 transition-all hover:scale-105 hover:bg-[#2e582b] whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>{t.btnQuote}</span>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex items-center rounded-full border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-slate-900">
            <button 
              type="button"
              onClick={() => setLang("fr")}
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${lang === "fr" ? "bg-[#386b34] text-white" : "text-slate-600 dark:text-slate-400"}`}
            >
              FR
            </button>
            <button 
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${lang === "en" ? "bg-[#386b34] text-white" : "text-slate-600 dark:text-slate-400"}`}
            >
              EN
            </button>
          </div>

          <button 
            type="button"
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100" 
            onClick={() => setOpen((v) => !v)} 
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white/95 px-4 pb-6 pt-3 shadow-2xl backdrop-blur-xl lg:hidden dark:border-slate-800 dark:bg-slate-950/95 max-h-[80vh] overflow-y-auto">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navMobile.map((n) => (
              <a 
                key={n.href} 
                href={n.href} 
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#386b34] py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all active:scale-[0.98]"
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
           decoding="async" loading="eager" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#234d20]/95 via-[#1a3818]/90 to-[#234d20]/80" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 md:py-28 lg:grid-cols-[1.15fr_1fr] lg:py-36">
        <div className="text-white">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-300/30 bg-[#386b34]/30 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-200 backdrop-blur">
            <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-300 fill-emerald-300" /> {t.heroTag}
          </span>
          <h1 className="mt-4 sm:mt-6 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight">
            {t.heroTitle1}<span className="text-emerald-300">{t.heroTitle2}</span>{t.heroTitle3}
          </h1>
          <p className="mt-4 sm:mt-6 max-w-xl text-xs sm:text-base md:text-lg leading-relaxed text-emerald-100/90">
            {t.heroDesc}
          </p>

          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3 rounded-2xl border border-white/15 bg-white/10 p-2.5 sm:p-3 backdrop-blur text-[11px] sm:text-xs text-slate-200">
            <span className="font-bold text-emerald-300">{lang === "fr" ? "Paiement flexible :" : "Flexible payment:"}</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="flex items-center gap-1 sm:gap-1.5 rounded-xl bg-white px-2.5 py-1 text-slate-900 font-extrabold shadow-sm text-[10px] sm:text-xs">
                <img src={momoLogo} alt="MTN MoMo" className="h-3.5 sm:h-4 w-auto object-contain shrink-0" decoding="async" />
                <span>MTN MoMo</span>
              </span>
              <span className="flex items-center gap-1 sm:gap-1.5 rounded-xl bg-white px-2.5 py-1 text-slate-900 font-extrabold shadow-sm text-[10px] sm:text-xs">
                <img src={orangeMoneyLogo} alt="Orange Money" className="h-3.5 sm:h-4 w-auto object-contain shrink-0" decoding="async" />
              </span>
            </div>
            <span className="rounded-xl bg-[#386b34]/60 border border-emerald-400/30 px-2 py-0.5 sm:px-2.5 sm:py-1 text-emerald-100 font-semibold text-[10px] sm:text-xs">{lang === "fr" ? "Traites échelonnées" : "Installments"}</span>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#calculateur" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#386b34] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xl shadow-[#386b34]/30 transition-all hover:bg-[#4a8344]">
              <Zap className="h-4 w-4 fill-white" /> {t.heroSimulateBtn}
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
              <Phone className="h-4 w-4" /> {t.heroExpertBtn}
            </a>
          </div>
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-emerald-100/90">
            <div className="flex items-center gap-1.5 sm:gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" /> {t.heroStat1}</div>
            <div className="flex items-center gap-1.5 sm:gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" /> {t.heroStat2}</div>
            <div className="flex items-center gap-1.5 sm:gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" /> {t.heroStat3}</div>
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

/* ---------------- PARTENAIRES ---------------- */
function Partners({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <section id="partenaires" className="border-y border-emerald-900/10 bg-card py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#386b34] dark:text-emerald-400 flex items-center justify-center gap-1.5">
            <Handshake className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {t.partnersEyebrow}
          </span>
          <h2 className="mt-2 text-xl sm:text-3xl font-black text-foreground">{t.partnersTitle}</h2>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{t.partnersDesc}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {PARTNERS_DATA.map((partner) => (
            <div 
              key={partner.name} 
              className="group flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-3.5 sm:p-5 text-center shadow-sm transition-all hover:border-[#386b34]/50 hover:shadow-md dark:bg-slate-900/80"
            >
              <div className="flex h-12 sm:h-16 w-full items-center justify-center p-1 sm:p-2 rounded-xl bg-white">
                <img src={partner.logo} alt={`Logo ${partner.name}`} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105" />
              </div>
              <h3 className="mt-2 sm:mt-3 text-xs sm:text-sm font-extrabold text-foreground">{partner.name}</h3>
              <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] text-muted-foreground leading-tight">{partner.desc}</p>
              <span className="mt-2 sm:mt-3 inline-block rounded-full bg-[#386b34]/10 px-2 py-0.5 text-[8px] sm:text-[9px] font-bold text-[#386b34] dark:text-emerald-400">
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
    <section id="services" className="bg-slate-100/70 dark:bg-slate-900/50 py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.servicesEyebrow} title={t.servicesTitle} description={t.servicesDesc} />
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="group rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm transition-all hover:border-[#386b34]/40 flex flex-col justify-between">
              <div>
                <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-[#386b34]/10 text-[#386b34] transition-colors group-hover:bg-[#386b34] group-hover:text-white">
                  <s.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <h3 className="mt-4 sm:mt-5 text-base sm:text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
              <a href={waLink(lang === "fr" ? `Bonjour EDSOLAR, je suis intéressé par: ${s.title}` : `Hello EDSOLAR, I am interested in: ${s.title}`)} target="_blank" rel="noreferrer"
                 className="mt-4 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#386b34] hover:gap-2 transition-all">
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
  const [selectedKit, setSelectedKit] = useState<any | null>(null);

  useEffect(() => {
    supabase.from("kits").select("*").order("sort_order").then(({ data }) => {
      if (data && data.length) setItems(data);
    });
  }, []);

  return (
    <section id="kits" className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.navKits} title={lang === "fr" ? "Des solutions solaires prêtes à l'emploi" : "Ready-to-use solar solutions"} description={t.servicesDesc} />
        <div className="mt-8 sm:mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((k) => {
            const kitImgSrc = k.image_url ? (k.image_url.startsWith("http") ? k.image_url : `/assets/${k.image_url}`) : null;
            return (
              <article key={k.id} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-transform hover:-translate-y-1">
                <div 
                  onClick={() => kitImgSrc && setSelectedKit(k)}
                  className={`relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800 ${kitImgSrc ? "cursor-pointer group" : ""}`}
                >
                  {kitImgSrc ? (
                    <>
                      <img 
                        src={kitImgSrc} 
                        alt={k.title} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        loading="lazy" 
                        decoding="async" 
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                          (e.target as HTMLElement).nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="absolute inset-0 bg-slate-950/30 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#386b34] text-white shadow-xl">
                          <ZoomIn className="h-5 w-5" />
                        </div>
                      </div>
                    </>
                  ) : null}
                  <div className={`grid h-full w-full place-items-center ${kitImgSrc ? 'hidden' : ''}`}>
                    <Package className="h-16 w-16 text-slate-400" />
                  </div>
                  {k.price && (
                    <span className="absolute right-3 top-3 rounded-full bg-slate-900 px-3 py-1 text-[11px] sm:text-xs font-bold text-white shadow z-10">
                      {k.price}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#386b34]">{translateDynamicText(k.subtitle, lang)}</p>
                  <h3 className="mt-1 text-lg sm:text-xl font-black">{translateDynamicText(k.title, lang)}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">{translateDynamicText(k.description, lang)}</p>
                  <ul className="mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                    {(k.features ?? []).map((f: string) => (
                      <li key={f} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-[#386b34]" /> {translateDynamicText(f, lang)}</li>
                    ))}
                  </ul>
                  <a href={waLink(lang === "fr" ? `Bonjour EDSOLAR, je suis intéressé par le ${k.title} (${k.price ?? ""}).` : `Hello EDSOLAR, I am interested in the ${k.title} (${k.price ?? ""}).`)} target="_blank" rel="noreferrer"
                     className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#386b34] px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white transition-all hover:bg-[#2e582b] shadow-md">
                    <MessageCircle className="h-4 w-4 fill-white" /> {lang === "fr" ? "Demander ce kit" : "Request this kit"}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX MODAL - ZOOM SUR UN KIT */}
      {selectedKit && (
        <div 
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/90 p-3 sm:p-4 backdrop-blur-md transition-all"
          onClick={() => setSelectedKit(null)}
        >
          <div 
            className="relative flex max-h-[85vh] max-w-4xl flex-col items-center justify-center overflow-hidden rounded-3xl bg-slate-900 border border-emerald-900/40 shadow-2xl p-3 sm:p-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedKit(null)}
              className="absolute right-3 top-3 z-10 grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-slate-950/80 text-white hover:bg-[#386b34] transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            <img 
              src={selectedKit.image_url.startsWith("http") ? selectedKit.image_url : `/assets/${selectedKit.image_url}`} 
              alt={selectedKit.title} 
              className="max-h-[55vh] w-auto max-w-full rounded-2xl object-contain"
            />
            
            <div className="mt-3 w-full text-center px-2 sm:px-4">
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400">{translateDynamicText(selectedKit.subtitle, lang)}</p>
              <p className="text-base sm:text-2xl font-black text-white mt-0.5">{translateDynamicText(selectedKit.title, lang)}</p>
              {selectedKit.price && <p className="text-sm sm:text-lg font-extrabold text-[#386b34] dark:text-emerald-400 mt-0.5">{selectedKit.price}</p>}
            </div>
          </div>
        </div>
      )}
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
    <section id="calculateur" className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.simEyebrow} title={t.simTitle} description={t.simDesc} />
        <div className="mt-8 sm:mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border bg-card p-4 sm:p-8 shadow-sm">
            <div className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
              {APPLIANCES.map((a) => {
                const n = qty[a.id] ?? 0;
                const active = n > 0;
                return (
                  <div key={a.id} className={`flex items-center justify-between gap-2.5 rounded-2xl border p-2.5 sm:p-3.5 transition-all ${active ? "border-[#386b34]/50 bg-[#386b34]/5" : "border-border bg-background"}`}>
                    <div className="flex min-w-0 items-center gap-2.5">
                      <div className={`grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl ${active ? "bg-[#386b34] text-white" : "bg-slate-200 dark:bg-slate-800 text-foreground"}`}>
                        <a.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs sm:text-sm font-semibold">{lang === "fr" ? a.name : a.nameEn}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground">{a.watts} W · {a.hours}h/{lang === "fr" ? "j" : "d"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => set(a.id, n - 1)} className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full border border-border text-base sm:text-lg font-bold hover:bg-secondary" aria-label="moins">−</button>
                      <span className="w-4 sm:w-5 text-center text-xs sm:text-sm font-bold tabular-nums">{n}</span>
                      <button onClick={() => set(a.id, n + 1)} className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-slate-900 text-base sm:text-lg font-bold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900" aria-label="plus">+</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-900/40 bg-[#234d20] p-5 sm:p-8 text-white shadow-2xl">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-300">{t.simEyebrow}</p>
            <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-black">{t.simResultTitle}</h3>
            <div className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3.5">
              <Metric icon={Zap} label={t.simPeakPower} value={`${peakW.toLocaleString()} W`} />
              <Metric icon={Sun} label={t.simDailyCons} value={`${dailyWh.toLocaleString(undefined, { maximumFractionDigits: 0 })} Wh`} />
              <Metric icon={Cpu} label={t.simRecSystem} value={`${systemKva} kVA ${systemVoltage}V`} highlight />
              <Metric icon={Battery} label={`${t.simLithiumBatt} ${systemVoltage}V`} value={`${batteryCount} × ${batteryUnitAh} Ah`} />
              <Metric icon={Sun} label={t.simPanels} value={`${panelsCount} ${lang === "fr" ? "panneaux" : "panels"}`} />
              <Metric icon={Zap} label={t.simBudget} value={priceLabel} highlight />
            </div>
            <a href={`${WA}?text=${msg}`} target="_blank" rel="noreferrer"
               className="mt-5 sm:mt-6 flex items-center justify-center gap-2 rounded-full bg-[#386b34] px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition-all hover:bg-[#2e582b]">
              <MessageCircle className="h-4 w-4 fill-white" /> {t.simSendWA}
            </a>
            <p className="mt-2.5 text-center text-[10px] sm:text-xs text-emerald-100/70">{t.simNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-2xl border ${highlight ? "bg-[#386b34]/30 border-emerald-400/40 text-emerald-200" : "bg-[#1a3818]/70 border-emerald-900/40"} px-3 py-2 sm:px-4 sm:py-3`}>
      <div className="flex items-center gap-2">
        <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${highlight ? "text-emerald-300" : "text-emerald-200/70"}`} />
        <span className="text-[11px] sm:text-sm text-emerald-100/90">{label}</span>
      </div>
      <span className="text-sm sm:text-lg font-black tabular-nums">{value}</span>
    </div>
  );
}

/* ---------------- Helper Parser de Variantes ---------------- */
type VariantItem = { label: string; priceDisplay: string };

function parseProductVariants(
  priceRaw: string | null | undefined, 
  name: string, 
  badge?: string | null, 
  description?: string | null
): VariantItem[] {
  if (!priceRaw) return [];
  const rawString = priceRaw.trim();
  if (!rawString) return [];

  if (rawString.includes("=") || rawString.includes(":")) {
    const delim = rawString.includes("\n") ? "\n" : (rawString.includes("-") ? "-" : ",");
    const parts = rawString.split(delim).map((s) => s.trim()).filter(Boolean);
    const explicitVariants: VariantItem[] = [];

    for (const part of parts) {
      if (part.includes("=") || part.includes(":")) {
        const sep = part.includes("=") ? "=" : ":";
        const [lbl, prc] = part.split(sep).map((s) => s.trim());
        if (lbl && prc) {
          const num = Number(prc.replace(/\D/g, ""));
          const formatted = num > 0 ? `${new Intl.NumberFormat("fr-FR").format(num)} FCFA` : prc;
          explicitVariants.push({ label: lbl.toUpperCase(), priceDisplay: formatted });
        }
      }
    }
    if (explicitVariants.length > 0) return explicitVariants;
  }

  const priceParts = rawString.split("-").map((s) => s.trim()).filter(Boolean);
  if (priceParts.length === 0) return [];

  const formattedPrices = priceParts.map((part) => {
    const num = Number(part.replace(/\D/g, ""));
    return num > 0 ? `${new Intl.NumberFormat("fr-FR").format(num)} FCFA` : part;
  });

  if (formattedPrices.length === 1) {
    return [{ label: "Base", priceDisplay: formattedPrices[0] }];
  }

  const combinedText = `${name} ${badge || ""} ${description || ""}`;
  const matches = combinedText.match(/\b\d+(?:\.\d+)?\s*(?:AH|Ah|KVA|kVA|KWH|kWh|W|kW)\b/g);
  let uniqueLabels: string[] = [];
  if (matches) {
    uniqueLabels = Array.from(new Set(matches.map((m) => m.toUpperCase().replace(/\s+/g, ""))));
  }

  const defaultBatteryLabels = ["100AH", "200AH", "300AH", "400AH", "500AH"];
  const isBattery = /li-sun|25\.6v|51\.2v|batterie|battery/i.test(combinedText);

  return formattedPrices.map((priceDisplay, idx) => {
    let label = "";
    if (uniqueLabels.length >= formattedPrices.length) {
      label = uniqueLabels[idx];
    } else if (isBattery && defaultBatteryLabels[idx]) {
      label = defaultBatteryLabels[idx];
    } else {
      label = `Option ${idx + 1}`;
    }
    return { label, priceDisplay };
  });
}

/* ---------------- Products / Boutique ---------------- */
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

function ProductCard({ p, lang, t, onSelectImage }: { p: Product; lang: Lang; t: typeof TRANSLATIONS["fr"]; onSelectImage: (p: Product) => void }) {
  const variants = useMemo(() => parseProductVariants(p.price, p.name, p.badge, p.description), [p.price, p.name, p.badge, p.description]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeVariant = variants[selectedIndex] || variants[0];
  const activePrice = activeVariant ? activeVariant.priceDisplay : (p.price || (lang === "fr" ? "Sur devis" : "On request"));

  const buildOrderMsg = () => {
    const variantInfo = variants.length > 1 ? `\n• Capacité / Option : ${activeVariant?.label}` : "";
    return lang === "fr" 
      ? `Bonjour EDSOLAR, je souhaite commander :\n• Produit : ${p.name}${variantInfo}\n• Prix : ${activePrice}\n\nMerci de me confirmer la disponibilité.`
      : `Hello EDSOLAR, I would like to order:\n• Product: ${p.name}${variantInfo}\n• Price: ${activePrice}\n\nPlease confirm availability.`;
  };

  const prodImgSrc = p.image_url ? (p.image_url.startsWith("http") ? p.image_url : `/assets/${p.image_url}`) : null;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm transition-transform hover:-translate-y-1">
      <div>
        <div 
          onClick={() => prodImgSrc && onSelectImage(p)}
          className={`relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 ${prodImgSrc ? "cursor-pointer group" : ""}`}
        >
          {prodImgSrc ? (
            <>
              <img 
                src={prodImgSrc} 
                alt={p.name} 
                loading="lazy" 
                decoding="async" 
                className="h-full w-full object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  (e.target as HTMLElement).nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-[#386b34] text-white shadow-xl">
                  <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
              </div>
            </>
          ) : null}
          <div className={`grid h-full w-full place-items-center ${prodImgSrc ? 'hidden' : ''}`}>
            <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-slate-400" />
          </div>
          {p.badge && <span className="absolute left-2.5 top-2.5 sm:left-3 sm:top-3 rounded-full bg-[#386b34] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase text-white z-10 max-w-[85%] truncate">{translateDynamicText(p.badge, lang)}</span>}
        </div>

        <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-bold line-clamp-2">{p.name}</h3>
        {p.description && <p className="mt-1 text-[11px] sm:text-xs text-muted-foreground line-clamp-2">{translateDynamicText(p.description, lang)}</p>}

        <div className="mt-2 flex flex-wrap gap-1 text-[9px] sm:text-[10px] font-semibold">
          <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-700 dark:text-slate-300">{translateDynamicText(p.category, lang)}</span>
          {p.warranty && <span className="rounded-full bg-[#386b34]/10 px-2 py-0.5 text-[#386b34]">{translateDynamicText(p.warranty, lang)}</span>}
        </div>

        {/* Variantes sous forme de puces interactives */}
        {variants.length > 1 && (
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border">
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 sm:mb-2">
              {lang === "fr" ? "CHOISIR LA CAPACITÉ :" : "SELECT CAPACITY:"}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {variants.map((v, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`rounded-xl px-2.5 py-1 text-[11px] sm:text-xs font-black transition-all ${
                    selectedIndex === idx
                      ? "bg-[#386b34] text-white shadow-md ring-2 ring-[#386b34]/30"
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

      <div className="mt-4 sm:mt-5 pt-2.5 sm:pt-3 border-t border-border">
        <div className="flex items-baseline justify-between gap-1 mb-2.5 sm:mb-3">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase text-muted-foreground">PRIX :</span>
          <span className="text-base sm:text-xl font-black text-[#386b34] dark:text-emerald-400 break-all">{activePrice}</span>
        </div>

        <a href={waLink(buildOrderMsg())} target="_blank" rel="noreferrer"
           className="inline-flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#386b34] px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow transition-all hover:bg-[#2e582b]">
          <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {t.shopOrderWA}
        </a>
      </div>
    </div>
  );
}

function Products({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  const [items, setItems] = useState<Product[]>([]);
  const [cat, setCat] = useState("Tous");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const adviceMsg = lang === "fr"
    ? "Bonjour EDSOLAR, j'ai besoin d'un conseil technique pour choisir mon équipement solaire."
    : "Hello EDSOLAR, I need technical advice to select my solar equipment.";

  return (
    <section id="boutique" className="bg-slate-100/70 dark:bg-slate-900/50 py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.shopEyebrow} title={t.shopTitle} description={t.shopDesc} />

        {/* RECHERCHE & TRI */}
        <div className="mx-auto mt-6 sm:mt-8 grid max-w-4xl gap-2.5 sm:gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder={t.shopSearchPlaceholder}
              className="w-full rounded-full border border-border bg-card py-2.5 sm:py-3 pl-10 pr-4 text-xs sm:text-sm outline-none focus:border-[#386b34] shadow-sm" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-border bg-card px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold outline-none focus:border-[#386b34] shadow-sm">
            <option value="featured">{t.shopSortFeatured}</option>
            <option value="price_asc">{t.shopSortPriceAsc}</option>
            <option value="price_desc">{t.shopSortPriceDesc}</option>
            <option value="popularity">{t.shopSortPopularity}</option>
            <option value="warranty">{t.shopSortWarranty}</option>
          </select>
        </div>

        {/* FILTRES CATÉGORIES */}
        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`rounded-full px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${cat === c ? "bg-[#386b34] text-white shadow-md" : "border border-border bg-card text-foreground hover:border-[#386b34]"}`}>
              {c === "Tous" ? (lang === "fr" ? "Tous" : "All") : translateDynamicText(c, lang)}
            </button>
          ))}
        </div>

        {/* BANDEAU REASSURANCE */}
        <div className="mx-auto mt-6 sm:mt-8 max-w-5xl overflow-hidden rounded-3xl border border-[#386b34]/20 bg-card p-4 sm:p-6 shadow-sm">
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#386b34]/10 text-[#386b34]">
                  <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{lang === "fr" ? "Matériel Certifié" : "Certified Equipment"}</p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground">{lang === "fr" ? "Tier 1 garantis" : "Tier-1 guaranteed"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#386b34]/10 text-[#386b34]">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{lang === "fr" ? "Livraison Cameroun" : "Cameroon Shipping"}</p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground">{lang === "fr" ? "Yaoundé & régions" : "Yaoundé & regions"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#386b34]/10 text-[#386b34]">
                  <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">{lang === "fr" ? "SAV & Support" : "After-Sales Support"}</p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground">{lang === "fr" ? "Support 7j/7" : "7/7 Support"}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between lg:justify-end gap-2.5 pt-3 border-t border-border lg:border-t-0 lg:border-l lg:pt-0 lg:pl-6">
              <div className="text-center sm:text-left lg:text-right">
                <p className="text-xs font-bold text-foreground">{lang === "fr" ? "Besoin d'aide ?" : "Need help?"}</p>
                <p className="text-[10px] sm:text-[11px] text-muted-foreground">{lang === "fr" ? "Parlez à un ingénieur" : "Talk to an engineer"}</p>
              </div>
              <a href={waLink(adviceMsg)} target="_blank" rel="noreferrer"
                 className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#386b34] px-3.5 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-[#2e582b]">
                <MessageCircle className="h-3.5 w-3.5" />
                <span>{lang === "fr" ? "Conseil WhatsApp" : "WhatsApp Advice"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* GRILLE DE PRODUITS */}
        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} lang={lang} t={t} onSelectImage={setSelectedProduct} />
          ))}
          {list.length === 0 && <p className="col-span-full text-center text-xs sm:text-sm text-muted-foreground">{t.shopNoProduct}</p>}
        </div>
      </div>

      {/* LIGHTBOX MODAL - ZOOM SUR UN PRODUIT */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/90 p-3 sm:p-4 backdrop-blur-md transition-all"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="relative flex max-h-[85vh] max-w-4xl flex-col items-center justify-center overflow-hidden rounded-3xl bg-slate-900 border border-emerald-900/40 shadow-2xl p-3 sm:p-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute right-3 top-3 z-10 grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-slate-950/80 text-white hover:bg-[#386b34] transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            <img 
              src={selectedProduct.image_url?.startsWith("http") ? selectedProduct.image_url : `/assets/${selectedProduct.image_url}`} 
              alt={selectedProduct.name} 
              className="max-h-[55vh] w-auto max-w-full rounded-2xl object-contain bg-white p-3 sm:p-4"
            />
            
            <div className="mt-3 w-full text-center px-2 sm:px-4">
              <p className="text-base sm:text-2xl font-black text-white">{selectedProduct.name}</p>
              {selectedProduct.description && <p className="text-[11px] sm:text-sm text-emerald-200/80 mt-1 max-w-xl mx-auto">{translateDynamicText(selectedProduct.description, lang)}</p>}
              {selectedProduct.price && <p className="text-sm sm:text-lg font-extrabold text-[#386b34] dark:text-emerald-400 mt-1.5">{selectedProduct.price}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- SECTION : ANTI-CONTREFAÇON ---------------- */
function QualityComparison({ lang }: { lang: Lang }) {
  return (
    <section id="qualite" className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader 
          eyebrow={lang === "fr" ? "Sécurité & Transparence" : "Safety & Transparency"} 
          title={lang === "fr" ? "Pourquoi choisir EDSOLAR vs le matériel du marché ?" : "Why choose EDSOLAR vs market equipment?"} 
          description={lang === "fr" ? "Évitez les pièges de la contrefaçon. Découvrez ce qui fait la différence pour la sécurité de votre famille." : "Avoid counterfeit traps. See what makes the difference for your family's safety."} 
        />

        <div className="mt-8 sm:mt-12 grid gap-6 md:grid-cols-2">
          {/* Mauvaise Qualité */}
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-5 sm:p-8">
            <div className="flex items-center gap-2.5 sm:gap-3 text-red-600 dark:text-red-400">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold">{lang === "fr" ? "Matériel Bas de Gamme du Marché" : "Low Quality Market Equipment"}</h3>
            </div>
            <ul className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-red-500" />
                <span>{lang === "fr" ? "Batteries GEL/Plomb périmées qui lâchent après 12 mois." : "Expired Gel/Lead batteries failing after 12 months."}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-red-500" />
                <span>{lang === "fr" ? "Onduleurs sans protection surtension (risque d'incendie)." : "Inverters lacking surge protection (fire risk)."}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-red-500" />
                <span>{lang === "fr" ? "Panneaux sous-dimensionnés et garanties fictives." : "Undersized panels and fake warranties."}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <X className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-red-500" />
                <span>{lang === "fr" ? "Aucun SAV après encaissement de votre argent." : "No after-sales support once paid."}</span>
              </li>
            </ul>
          </div>

          {/* Qualité EDSOLAR */}
          <div className="rounded-3xl border border-[#386b34]/30 bg-[#386b34]/5 p-5 sm:p-8 shadow-md">
            <div className="flex items-center gap-2.5 sm:gap-3 text-[#386b34] dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold">{lang === "fr" ? "Engagement & Qualité EDSOLAR" : "EDSOLAR Commitment & Quality"}</h3>
            </div>
            <ul className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm text-foreground">
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#386b34]" />
                <span><strong>{lang === "fr" ? "Batteries Lithium LiFePO4 :" : "Lithium LiFePO4 Batteries:"}</strong> {lang === "fr" ? "Durée de vie +10 ans, tolérance aux fortes chaleurs." : "+10 year lifespan, heat tolerant."}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#386b34]" />
                <span><strong>{lang === "fr" ? "Onduleurs Hybrides Certifiés :" : "Certified Hybrid Inverters:"}</strong> {lang === "fr" ? "Protections intégrées contre les coupures brutales." : "Built-in protection against brutal outages."}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#386b34]" />
                <span><strong>{lang === "fr" ? "Panneaux Tier 1 :" : "Tier-1 Panels:"}</strong> {lang === "fr" ? "Production optimale même par temps nuageux, garantie 25 ans." : "Optimal yield even on cloudy days, 25yr warranty."}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#386b34]" />
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
    <section id="diaspora" className="bg-[#234d20] py-12 text-white sm:py-24 border-t border-emerald-900/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-300">
              <Globe className="h-3.5 w-3.5 text-emerald-300" /> {lang === "fr" ? "Offre Diaspora Camerounaise" : "Cameroonian Diaspora Offer"}
            </span>
            <h2 className="mt-3 sm:mt-4 text-xl sm:text-3xl md:text-4xl font-black text-white">
              {lang === "fr" ? "Équipez la maison familiale au pays en toute tranquillité" : "Equip your family home back home with total peace of mind"}
            </h2>
            <p className="mt-3 sm:mt-4 text-xs sm:text-base leading-relaxed text-emerald-100/90">
              {lang === "fr"
                ? "Vous vivez en France, au Canada, aux USA ou en Europe ? Offrez le confort solaire à vos parents et vos proches au Cameroun sans stress. Nous gérons tout de A à Z avec un suivi photos/vidéos en direct."
                : "Living in France, Canada, USA, or Europe? Provide solar comfort to your family in Cameroon stress-free. We manage everything from A to Z with live photo/video updates."}
            </p>

            <div className="mt-5 space-y-2.5 sm:space-y-3">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-100/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-emerald-300" />
                <span>{lang === "fr" ? "Paiement sécurisé à distance (CB Internationale, Virement, Ria/Western Union)." : "Secure remote payment (International Card, Wire transfer, Ria/Western Union)."}</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-100/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-emerald-300" />
                <span>{lang === "fr" ? "Compte-rendu vidéo WhatsApp direct à chaque étape du chantier." : "Direct WhatsApp video reports at every stage of the installation."}</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-100/90">
                <CheckCircle2 className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-emerald-300" />
                <span>{lang === "fr" ? "Visite technique gratuite du logement à Yaoundé, Douala ou en région." : "Free home technical survey in Yaoundé, Douala, or other regions."}</span>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <a href={waLink(diasporaMsg)} target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-[#386b34] px-5 py-3 text-xs sm:text-sm font-bold text-white transition-transform hover:bg-[#2e582b]">
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>{lang === "fr" ? "Lancer un projet à distance" : "Start a project from abroad"}</span>
              </a>
            </div>
          </div>

          <div className="relative rounded-3xl border border-emerald-700/40 bg-[#1a3818]/90 p-5 sm:p-8 backdrop-blur shadow-2xl">
            <h3 className="text-base sm:text-lg font-bold text-emerald-300">{lang === "fr" ? "Modes de Règlement Acceptés" : "Accepted Payment Methods"}</h3>
            <p className="mt-0.5 text-[11px] sm:text-xs text-emerald-200/70">{lang === "fr" ? "Pour vos proches au pays ou depuis l'étranger :" : "For local relatives or from abroad:"}</p>

            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2.5 sm:gap-3 text-xs">
              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-md">
                <div className="flex items-center gap-1.5">
                  <img src={momoLogo} alt="MTN MoMo" className="h-4 sm:h-5 w-auto object-contain shrink-0" decoding="async" />
                  <span className="font-extrabold text-[11px] sm:text-xs text-slate-900">MTN MoMo</span>
                </div>
                <span className="text-slate-500 text-[9px] sm:text-[10px] mt-1 font-medium">{lang === "fr" ? "Règlement local rapide" : "Fast local payment"}</span>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 shadow-md">
                <div className="flex items-center gap-1.5">
                  <img src={orangeMoneyLogo} alt="Orange Money" className="h-4 sm:h-5 w-auto object-contain shrink-0" decoding="async" />
                </div>
                <span className="text-slate-500 text-[9px] sm:text-[10px] mt-1 font-medium">{lang === "fr" ? "Règlement local rapide" : "Fast local payment"}</span>
              </div>

              <div className="rounded-2xl border border-emerald-800/60 bg-[#122910]/80 p-3">
                <span className="font-bold text-white text-[11px] sm:text-xs block">Carte Visa / Mastercard</span>
                <span className="text-emerald-200/60 text-[9px] sm:text-[10px]">{lang === "fr" ? "Paiement en ligne sécurisé" : "Secure online payment"}</span>
              </div>

              <div className="rounded-2xl border border-emerald-800/60 bg-[#122910]/80 p-3">
                <span className="font-bold text-white text-[11px] sm:text-xs block">Virement & Agence</span>
                <span className="text-emerald-200/60 text-[9px] sm:text-[10px]">{lang === "fr" ? "SEPA / Swift / Ria / WU" : "SEPA / Swift / Ria / WU"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SECTION CHAÎNE YOUTUBE (INSPECTION ASYNCHRONE DES MINIATURES) ---------------- */
function YouTubeSection({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  const [activeVideo, setActiveVideo] = useState<{ id: string; isShort: boolean } | null>(null);
  const [videos, setVideos] = useState<Array<{ id: string; title: string; youtubeId: string; thumbnail: string; date?: string; isShort: boolean }>>([]);

  useEffect(() => {
    const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?playlist_id=${YOUTUBE_UPLOADS_PLAYLIST}`);
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data && data.items && data.items.length > 0) {
          const rawParsed = data.items.map((item: any) => {
            const videoId = item.guid ? item.guid.replace("yt:video:", "") : (item.link?.split("v=")[1] || "");
            const title = item.title || "";
            const isShort = item.link?.includes("/shorts/") || title.toLowerCase().includes("short");

            return {
              id: videoId || item.link,
              title: title,
              youtubeId: videoId,
              thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              date: item.pubDate ? new Date(item.pubDate).toLocaleDateString("fr-FR") : "",
              isShort: isShort,
            };
          }).filter((v: any) => v.youtubeId);

          // Inspection réelle et asynchrone des images pour éliminer les miniatures supprimées/grises (120px)
          const validated = await Promise.all(
            rawParsed.map((v: any) => {
              return new Promise<any>((resolve) => {
                const img = new Image();
                img.src = v.thumbnail;
                img.onload = () => {
                  if (img.naturalHeight === 120 || img.naturalWidth === 120) {
                    resolve(null);
                  } else {
                    const actualIsShort = v.isShort || (img.naturalHeight > img.naturalWidth);
                    resolve({ ...v, isShort: actualIsShort });
                  }
                };
                img.onerror = () => resolve(null);
              });
            })
          );

          setVideos(validated.filter(Boolean));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="videos" className="relative overflow-hidden bg-[#234d20] py-12 text-slate-100 sm:py-24 border-t border-emerald-900/30">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#386b34]/20 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-300/30 bg-[#386b34]/30 px-3 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-200 backdrop-blur">
            <Youtube className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-300" /> {t.channelTag}
          </span>
          <h2 className="mt-3 sm:mt-4 text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            {t.channelTitle1}<span className="text-emerald-300">{t.channelTitle2}</span>
          </h2>
          <p className="mt-2 sm:mt-4 text-xs sm:text-base text-emerald-100/80">
            {t.channelDesc}
          </p>
        </div>

        {/* Grille adaptative pour vidéos et Shorts */}
        <div className="mt-8 sm:mt-12 grid gap-3 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {videos.length > 0 ? (
            videos.map((v) => (
              <div 
                key={v.id} 
                onClick={() => setActiveVideo({ id: v.youtubeId, isShort: v.isShort })}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-emerald-800/40 bg-[#1a3818]/80 shadow-lg transition-all hover:-translate-y-1 hover:border-emerald-400/50 flex flex-col justify-between"
              >
                <div className={`relative ${v.isShort ? "aspect-[9/16]" : "aspect-video"} w-full overflow-hidden bg-slate-900`}>
                  <img 
                    src={v.thumbnail} 
                    alt={v.title} 
                    loading="lazy" 
                    decoding="async" 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                    <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-[#386b34] text-white shadow-xl transition-transform group-hover:scale-110">
                      <Play className="h-4 w-4 sm:h-5 sm:w-5 fill-white ml-0.5" />
                    </div>
                  </div>
                  {v.date && (
                    <span className="absolute bottom-2 right-2 rounded-md bg-slate-950/80 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-bold text-white backdrop-blur">
                      {v.date}
                    </span>
                  )}
                  {v.isShort && (
                    <span className="absolute top-2 left-2 rounded-md bg-red-600/90 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-extrabold uppercase text-white shadow">
                      Short
                    </span>
                  )}
                </div>
                <div className="p-2.5 sm:p-3">
                  <h3 className="text-[11px] sm:text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
                    {v.title}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div 
              onClick={() => window.open(YOUTUBE_CHANNEL_URL, "_blank")}
              className="col-span-full mx-auto max-w-lg cursor-pointer overflow-hidden rounded-3xl border border-emerald-800/40 bg-[#1a3818]/80 p-6 sm:p-8 text-center shadow-lg transition-all hover:border-emerald-400/50"
            >
              <div className="mx-auto grid h-12 w-12 sm:h-16 sm:w-16 place-items-center rounded-full bg-[#386b34] text-white shadow-xl">
                <Play className="h-5 w-5 sm:h-7 sm:w-7 fill-white ml-0.5" />
              </div>
              <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-bold text-white">Vidéos & Shorts @EDSOLAR237</h3>
              <p className="mt-1 text-[11px] sm:text-xs text-emerald-200/70">Cliquez pour voir la chaîne officielle YouTube</p>
            </div>
          )}
        </div>

        <div className="mt-8 sm:mt-12 rounded-3xl border border-emerald-800/50 bg-[#1a3818] p-5 sm:p-8 shadow-2xl backdrop-blur">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 sm:gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-base sm:text-xl font-bold text-white">{t.channelSubscribers}</p>
              <p className="mt-1 text-[11px] sm:text-xs text-emerald-200/70">{t.channelSubNote}</p>
            </div>
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer"
               className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#386b34] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition-all hover:bg-[#4a8344]">
              <Youtube className="h-4 w-4 sm:h-5 sm:w-5 text-white" /> {t.channelBtn}
            </a>
          </div>
        </div>
      </div>

      {/* Lecteur Lightbox responsive pour Vidéos et Shorts */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 p-3 sm:p-4 backdrop-blur-md" onClick={() => setActiveVideo(null)}>
          <div className={`relative w-full ${activeVideo.isShort ? "max-w-sm aspect-[9/16]" : "max-w-4xl aspect-video"} overflow-hidden rounded-3xl bg-slate-900 shadow-2xl`} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute right-3 top-3 z-10 grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-[#386b34] text-white shadow-lg"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <iframe 
              src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`} 
              title="EDSOLAR YouTube Player"
              className="h-full w-full border-0 rounded-3xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
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
    <section className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.trustEyebrow} title={t.trustTitle} description={t.trustDesc} />
        <div className="mt-8 sm:mt-12 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-4 sm:p-6 text-center shadow-sm transition-transform hover:-translate-y-1">
              <div className="mx-auto grid h-10 w-10 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-[#386b34]/10 text-[#386b34]">
                <s.icon className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <div className="mt-2 sm:mt-4 text-xl sm:text-4xl font-black text-slate-900 dark:text-white">{s.value}</div>
              <div className="mt-0.5 sm:mt-1 text-[11px] sm:text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-14 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {["Normes IEC 61215", "ISO 9001", "Garantie 25 ans", "Ingénieurs certifiés", "Support 7j/7"].map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-[#386b34]/20 bg-[#386b34]/10 px-3 py-1 text-[10px] sm:text-xs font-semibold text-[#386b34] dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5 text-[#386b34]" /> {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Realisations ---------------- */
function Realisations({ t, lang }: { t: typeof TRANSLATIONS["fr"]; lang: Lang }) {
  const [items, setItems] = useState<{ id?: string; src: string; title: string; loc: string }[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<{ index: number; src: string; title: string; loc: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editLoc, setEditLoc] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setIsAdmin(true);
    });

    supabase
      .from("gallery_photos")
      .select("id, url, caption, location")
      .eq("category", "realisations")
      .order("sort_order")
      .order("created_at", { ascending: false })
      .then(({ data }) =>
        setItems(
          (data ?? []).map((p: any) => ({
            id: p.id,
            src: p.url,
            title: p.caption ?? "Réalisation EDSOLAR",
            loc: p.location ?? "Cameroun",
          }))
        )
      );
  }, []);

  const openPhoto = (index: number, item: { src: string; title: string; loc: string }) => {
    const title = translateDynamicText(item.title, lang);
    setSelectedPhoto({ index, src: item.src, title, loc: item.loc });
    setEditTitle(title);
    setEditLoc(item.loc);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (selectedPhoto === null) return;
    const updated = [...items];
    updated[selectedPhoto.index] = {
      ...updated[selectedPhoto.index],
      title: editTitle,
      loc: editLoc,
    };
    setItems(updated);
    setSelectedPhoto({ ...selectedPhoto, title: editTitle, loc: editLoc });
    setIsEditing(false);

    const target = updated[selectedPhoto.index];
    if (target.id) {
      await supabase.from("gallery_photos").update({ caption: editTitle, location: editLoc }).eq("id", target.id);
    }
  };

  return (
    <section id="realisations" className="bg-slate-100/70 dark:bg-slate-900/50 py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.realEyebrow} title={t.realTitle} description={t.realDesc} />
        
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((g, i) => (
            <figure 
              key={`${g.src}-${i}`} 
              onClick={() => openPhoto(i, g)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {g.src ? (
                  <>
                    <img 
                      src={g.src} 
                      alt={g.title} 
                      width={1200} 
                      height={800} 
                      loading="lazy" 
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/30 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                      <div className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-[#386b34] text-white shadow-xl transition-transform group-hover:scale-110">
                        <ZoomIn className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="grid h-full w-full place-items-center text-xs text-muted-foreground">Photo indisponible</div>
                )}
              </div>
              <figcaption className="flex items-center justify-between p-3.5 sm:p-4">
                <div className="min-w-0 pr-2">
                  <p className="text-xs sm:text-sm font-bold truncate">{translateDynamicText(g.title, lang)}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="h-3 w-3 text-[#386b34] shrink-0" /> {g.loc}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-[#386b34] shrink-0" />
              </figcaption>
            </figure>
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-center text-xs sm:text-sm text-muted-foreground mt-8">
            {lang === "fr" ? "Aucune réalisation à afficher pour le moment." : "No projects to display at the moment."}
          </p>
        )}
      </div>

      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/90 p-3 sm:p-4 backdrop-blur-md transition-all"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative flex max-h-[85vh] max-w-5xl flex-col items-center justify-center overflow-hidden rounded-3xl bg-slate-900 border border-emerald-900/40 shadow-2xl p-3 sm:p-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-3 top-3 z-10 grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-slate-950/80 text-white hover:bg-[#386b34] transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.title} 
              className="max-h-[60vh] w-auto max-w-full rounded-2xl object-contain"
            />
            
            <div className="mt-3 w-full max-w-2xl text-center px-2 sm:px-4">
              {!isEditing ? (
                <div className="flex flex-col items-center gap-1.5">
                  <p className="text-sm sm:text-xl font-black text-white">{selectedPhoto.title}</p>
                  <p className="text-xs sm:text-sm text-emerald-400 font-bold flex items-center justify-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-400" /> {selectedPhoto.loc}
                  </p>
                  {isAdmin && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#386b34] px-3 py-1 text-xs font-bold text-white hover:bg-[#4a8344]"
                    >
                      <Edit2 className="h-3 w-3" /> Éditer la légende & le lieu
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 bg-slate-950/80 p-3 rounded-2xl border border-emerald-800/50">
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-400 uppercase text-left mb-1">Légende de la photo</label>
                    <input 
                      type="text" 
                      value={editTitle} 
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs text-white outline-none focus:border-[#386b34]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-400 uppercase text-left mb-1">Lieu / Ville</label>
                    <input 
                      type="text" 
                      value={editLoc} 
                      placeholder="Ex: Douala, Bonanjo"
                      onChange={(e) => setEditLoc(e.target.value)}
                      className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs text-white outline-none focus:border-[#386b34]"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-1">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="rounded-full bg-slate-800 px-3 py-1 text-xs font-bold text-slate-300"
                    >
                      Annuler
                    </button>
                    <button 
                      onClick={handleSave}
                      className="inline-flex items-center gap-1 rounded-full bg-[#386b34] px-3 py-1 text-xs font-bold text-white"
                    >
                      <Save className="h-3 w-3" /> Enregistrer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
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
    <section id="avis" className="bg-slate-100/70 dark:bg-slate-900/50 py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.reviewsEyebrow} title={t.reviewsTitle} description={t.reviewsDesc} />
        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-[1fr_1.3fr]">
          <form onSubmit={submit} className="h-fit rounded-3xl border border-border bg-card p-5 sm:p-8 shadow-sm">
            <p className="text-xs sm:text-sm font-bold">{t.reviewsLeaveTitle}</p>
            <div className="mt-3 sm:mt-4 space-y-3">
              <div>
                <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.reviewsName}</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="mt-1 w-full rounded-xl border border-input bg-background px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-[#386b34]" />
              </div>
              <div>
                <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.reviewsRating}</label>
                <div className="mt-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n}
                      onClick={() => setForm((f) => ({ ...f, rating: n }))}
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      aria-label={`${n} étoile`}
                      className="p-0.5 transition-transform hover:scale-110">
                      <Star className={`pointer-events-none h-6 w-6 sm:h-8 sm:w-8 ${n <= (hoverRating || form.rating) ? "fill-[#386b34] text-[#386b34]" : "text-muted-foreground/30"}`} />
                    </button>
                  ))}
                  <span className="ml-1.5 text-xs sm:text-sm font-semibold text-muted-foreground">{form.rating}/5</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.reviewsComment}</label>
                <textarea rows={3} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required
                  className="mt-1 w-full resize-none rounded-xl border border-input bg-background px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-[#386b34]" />
              </div>
              <button disabled={busy} className="w-full rounded-full bg-[#386b34] px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-[#2e582b] disabled:opacity-60">
                {busy ? t.reviewsSending : t.reviewsSubmit}
              </button>
              {sent && <p className="text-xs sm:text-sm text-[#386b34] font-semibold">{t.reviewsSuccess}</p>}
            </div>
          </form>
          <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
            {items.length === 0 && (
              <p className="col-span-full rounded-2xl border border-dashed border-border p-5 text-center text-xs sm:text-sm text-muted-foreground">
                {t.reviewsEmpty}
              </p>
            )}
            {items.map((r) => (
              <div key={r.id} className="rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-[#386b34] text-[#386b34]" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-foreground/90">"{r.comment}"</p>
                <p className="mt-2 text-xs sm:text-sm font-bold">{r.name}</p>
                <p className="text-[10px] text-muted-foreground">{new Date(r.created_at).toLocaleDateString("fr-FR")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About (Vision & Galerie du Terrain) ---------------- */
function About({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  const [fieldPhotos, setFieldPhotos] = useState<any[]>(INITIAL_FIELD_IMAGES);
  const [selectedPhoto, setSelectedPhoto] = useState<{ index: number; src: string; caption: string; location: string } | null>(null);

  useEffect(() => {
    supabase
      .from("gallery_photos")
      .select("*")
      .eq("category", "terrain")
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) {
          setFieldPhotos(
            data.map((p) => ({
              src: p.url,
              caption: p.caption || "EDSOLAR sur le terrain",
              location: p.location || "Cameroun",
            }))
          );
        }
      });
  }, []);

  const openPhoto = (index: number, img: { src: string; caption: string; location: string }) => {
    setSelectedPhoto({ index, ...img });
  };

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
    { name: "EDSERVICE", tag: "Services à domicile", icon: Home },
    { name: "EDAUTO", tag: "Véhicule écologique", icon: Car },
  ];

  return (
    <section id="apropos" className="py-12 sm:py-24 bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#386b34]">{t.aboutEyebrow}</span>
            <h2 className="mt-2 text-xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              {t.aboutTitle}
            </h2>
            
            <p className="mt-3 sm:mt-4 text-xs sm:text-base font-semibold text-foreground leading-relaxed">
              {t.aboutPillarsText}
            </p>

            <div className="mt-4 sm:mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
              {PILLARS.map((v) => (
                <div key={v.name} className="flex items-start gap-2 sm:gap-3 rounded-2xl border border-[#386b34]/20 bg-[#386b34]/5 p-3">
                  <div className="grid h-7 w-7 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-xl bg-[#386b34] text-white">
                    <v.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-foreground">{v.name}</h4>
                    <p className="text-[9px] sm:text-[11px] text-muted-foreground leading-tight">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p className="border-l-4 border-[#386b34] pl-2.5 sm:pl-3 py-0.5 bg-emerald-500/5 rounded-r-xl">
                <strong className="text-foreground">Notre mission :</strong> {t.aboutMissionText}
              </p>
              <p className="border-l-4 border-[#386b34] pl-2.5 sm:pl-3 py-0.5 bg-emerald-500/5 rounded-r-xl">
                <strong className="text-foreground">Notre vision :</strong> {t.aboutVisionText}
              </p>
            </div>

            <div className="mt-5 flex items-start gap-2.5 sm:gap-3 rounded-2xl border border-[#386b34]/30 bg-[#386b34]/10 p-3 sm:p-4">
              <div className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl bg-[#386b34] text-white">
                <Compass className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#386b34]">Présence sur le terrain</span>
                <p className="mt-0.5 text-xs sm:text-sm font-bold text-foreground leading-snug">
                  {t.aboutPresenceText}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-emerald-900/30 bg-[#234d20] p-5 sm:p-6 text-white shadow-xl">
              <h3 className="text-xs sm:text-base font-extrabold text-emerald-300">{t.aboutEcosystemTitle}</h3>
              <div className="mt-3 sm:mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {ECOSYSTEM.map((e) => (
                  <div key={e.name} className="flex items-center gap-2 rounded-xl bg-[#1a3818]/80 p-2 sm:p-2.5 border border-emerald-800/40">
                    <e.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-300 shrink-0" />
                    <div>
                      <span className="text-xs font-black text-white block">{e.name}</span>
                      <span className="text-[9px] sm:text-[10px] text-emerald-200/70 block leading-tight">{e.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[11px] sm:text-xs text-emerald-100/90 italic leading-relaxed border-t border-emerald-800/50 pt-3">
                "{t.aboutConclusion}"
              </p>
            </div>

            <div>
              <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 sm:mb-3 flex items-center justify-between">
                <span>En direct du terrain — Nos équipes à l'œuvre</span>
                <span className="text-[9px] font-normal text-[#386b34]">(Cliquez pour agrandir)</span>
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {fieldPhotos.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => openPhoto(idx, img)}
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-border bg-slate-100 shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <img 
                      src={img.src} 
                      alt={img.caption} 
                      loading="lazy" 
                      decoding="async" 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/50 opacity-0 transition-opacity group-hover:opacity-100 flex flex-col justify-between p-1.5 sm:p-2">
                      <div className="ml-auto grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full bg-[#386b34] text-white shadow-md">
                        <ZoomIn className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </div>
                      <div>
                        <p className="text-[8px] sm:text-[10px] font-bold text-white leading-tight line-clamp-1">{img.caption}</p>
                        <p className="text-[7px] sm:text-[9px] font-semibold text-emerald-300 flex items-center gap-0.5 mt-0.5">
                          <MapPin className="h-2 w-2 sm:h-2.5 sm:w-2.5" /> {img.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/90 p-3 sm:p-4 backdrop-blur-md transition-all"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative flex max-h-[85vh] max-w-5xl flex-col items-center justify-center overflow-hidden rounded-3xl bg-slate-900 border border-emerald-900/40 shadow-2xl p-3 sm:p-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-3 top-3 z-10 grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-slate-950/80 text-white hover:bg-[#386b34] transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.caption} 
              className="max-h-[60vh] w-auto max-w-full rounded-2xl object-contain"
            />
            
            <div className="mt-3 w-full max-w-2xl text-center px-2 sm:px-4">
              <p className="text-sm sm:text-xl font-bold text-white">{selectedPhoto.caption}</p>
              <p className="text-xs sm:text-sm text-emerald-400 font-bold flex items-center justify-center gap-1 mt-0.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" /> {selectedPhoto.location}
              </p>
            </div>
          </div>
        </div>
      )}
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
    <section id="contact" className="bg-slate-100/70 dark:bg-slate-900/50 py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow={t.contactEyebrow} title={t.contactTitle} description={t.contactDesc} />
        
        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_1.2fr] items-start">
          
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              <ContactCard icon={MapPin} title={t.contactHeadquarters} lines={["Tradex Olembe", "Yaoundé, Cameroun"]} />
              <ContactCard icon={Leaf} title={t.contactZone} lines={["Tout le Cameroun", "& Afrique Centrale"]} />
              <ContactCard icon={Phone} title={t.contactPhone} lines={["+237 650544444"]} href={`tel:${PHONE}`} />
              <ContactCard icon={Mail} title={t.contactEmail} lines={[EMAIL]} href={`mailto:${EMAIL}`} />
            </div>

            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm h-52 sm:h-72 w-full">
              <iframe 
                title="EDSOLAR Yaoundé" 
                className="h-full w-full border-0"
                src="https://www.google.com/maps?q=Tradex+Olembe+Yaounde&output=embed" 
                loading="lazy" 
              />
            </div>
          </div>

          <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-5 sm:p-8 shadow-sm">
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              <Field label={t.formName} value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label={t.formPhone} value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required type="tel" />
              <Field label={t.formLocation} value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="Ex: Bastos, Yaoundé" />
              <div>
                <label className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.formProjectType}</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#386b34]">
                  <option>{lang === "fr" ? "Maison" : "Home"}</option>
                  <option>{lang === "fr" ? "Commerce" : "Business"}</option>
                  <option>{lang === "fr" ? "Industrie" : "Industry"}</option>
                  <option>{lang === "fr" ? "Autre" : "Other"}</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.formNeeds}</label>
                <input type="text" value={form.needs} onChange={(e) => setForm({ ...form, needs: e.target.value })}
                  placeholder={lang === "fr" ? "Ex: pompage, climatisation, bureaux..." : "Ex: pumping, AC, offices..."}
                  className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#386b34]" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.formMessage}</label>
                <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={lang === "fr" ? "Décrivez brièvement votre besoin..." : "Briefly describe your request..."}
                  className="w-full resize-none rounded-xl border border-input bg-background px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#386b34]" />
              </div>
            </div>
            <button type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#386b34] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#2e582b] sm:w-auto">
              <Send className="h-4 w-4" /> {t.formSubmit}
            </button>
            {sent && <p className="mt-2 text-xs sm:text-sm text-[#386b34] font-semibold">{t.formSuccess}</p>}
          </form>

        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, title, lines, href }: { icon: any; title: string; lines: string[]; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3.5 sm:p-5 shadow-sm transition-transform hover:-translate-y-1 h-full">
      <div className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl bg-[#386b34]/10 text-[#386b34]">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
        {lines.map((l) => (
          <p key={l} className="mt-0.5 text-xs sm:text-sm font-bold text-foreground break-all">{l}</p>
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
      <label className="mb-1 block text-[10px] sm:text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</label>
      <input type={type} required={required} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#386b34]" />
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ t }: { t: typeof TRANSLATIONS["fr"] }) {
  return (
    <footer className="border-t border-emerald-900/40 bg-[#1d3d19] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 sm:py-14">
        
        <div>
          <a href="/" className="inline-flex items-center gap-2.5" aria-label="Retour à l'accueil">
            <img src={logo} alt="EDSOLAR Énergie Cameroun" className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-white object-contain p-1 shadow-md" />
            <div>
              <p className="text-base sm:text-lg font-black text-white">EDSOLAR</p>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-emerald-300 font-bold">Énergie Cameroun</p>
            </div>
          </a>
          <p className="mt-3 text-xs leading-relaxed text-emerald-100/70">
            Solutions solaires photovoltaïques haute performance et certifiées Tier 1 au Cameroun et en Afrique Centrale.
          </p>
          <div className="mt-4 flex gap-2.5">
            {[Facebook, Instagram, Linkedin].map((I, i) => (
              <a key={i} href="#" className="grid h-8 w-8 sm:h-10 sm:w-10 place-items-center rounded-full bg-[#122910] text-emerald-200 transition-colors hover:bg-[#386b34] hover:text-white border border-emerald-800/50">
                <I className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300">{t.footerNav}</p>
          <ul className="mt-3 space-y-1.5 sm:space-y-2 text-xs text-emerald-100/70">
            <li><a href="#partenaires" className="hover:text-emerald-300 transition-colors">{t.navPartners}</a></li>
            <li><a href="#services" className="hover:text-emerald-300 transition-colors">{t.navServices}</a></li>
            <li><a href="#kits" className="hover:text-emerald-300 transition-colors">{t.navKits}</a></li>
            <li><a href="#boutique" className="hover:text-emerald-300 transition-colors">{t.navBoutique}</a></li>
            <li><a href="#calculateur" className="hover:text-emerald-300 transition-colors">{t.navSimulator}</a></li>
            <li><a href="#videos" className="hover:text-emerald-300 transition-colors">{t.navYouTube}</a></li>
            <li><a href="#apropos" className="hover:text-emerald-300 transition-colors">Vision & Valeurs</a></li>
          </ul>
        </div>

        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300">{t.footerContact}</p>
          <ul className="mt-3 space-y-2 text-xs text-emerald-100/70">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-emerald-300" /> Tradex Olembe, Yaoundé</li>
            <li className="flex gap-2"><Leaf className="h-4 w-4 shrink-0 text-emerald-300" /> Cameroun & Afrique Centrale</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-emerald-300" /> +237 650544444</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-emerald-300" /> edsolarcam@gmail.com</li>
          </ul>
        </div>

        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-300">{t.footerPartners}</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {PARTNERS_DATA.map((p) => (
              <div key={p.name} className="flex items-center justify-center rounded-lg bg-white p-1 shadow-sm border border-emerald-950 h-9">
                <img src={p.logo} alt={p.name} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="border-t border-emerald-900/30 bg-[#122910]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2.5 px-4 py-4 text-[11px] sm:text-xs text-emerald-100/50 sm:flex-row sm:px-6">
          <p className="text-center sm:text-left">{t.footerRights}</p>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
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
       className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-2.5 sm:px-5 sm:py-3.5 font-bold text-slate-950 shadow-2xl transition-transform hover:scale-105"
       aria-label="Contacter sur WhatsApp">
      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 fill-slate-950" />
      <span className="hidden sm:inline text-xs sm:text-sm">Chat WhatsApp</span>
      <span className="absolute -right-1 -top-1 grid h-4 w-4 sm:h-5 sm:w-5 place-items-center rounded-full bg-emerald-400 text-[9px] sm:text-[10px] font-black text-slate-950 animate-pulse">1</span>
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
      className="fixed bottom-16 sm:bottom-24 right-4 sm:right-6 z-50 grid h-9 w-9 sm:h-11 sm:w-11 place-items-center rounded-full border border-border bg-card text-foreground shadow-xl transition-transform hover:scale-110">
      <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
  );
}

/* ---------------- Shared ---------------- */
function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center px-2">
      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#386b34] dark:text-emerald-400">{eyebrow}</span>
      <h2 className="mt-1.5 sm:mt-2.5 text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 sm:mt-3 text-xs sm:text-base text-muted-foreground">{description}</p>
    </div>
  );
}
