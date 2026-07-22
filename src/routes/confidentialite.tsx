import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — EDSOLAR Énergie Cameroun" },
      { name: "description", content: "Comment EDSOLAR Énergie Cameroun collecte, utilise et protège vos données personnelles." },
      { property: "og:title", content: "Politique de confidentialité — EDSOLAR Énergie Cameroun" },
      { property: "og:description", content: "Protection des données personnelles chez EDSOLAR Énergie Cameroun." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link to="/" className="text-sm text-primary hover:underline">← Retour à l'accueil</Link>
      <h1 className="mt-4 text-4xl font-black text-primary">Politique de confidentialité</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-lg font-bold text-primary">Données collectées</h2>
          <p>Lorsque vous utilisez notre formulaire de contact ou notre calculateur solaire, nous collectons uniquement les informations que vous nous fournissez : nom, téléphone, e-mail, zone d'intervention et besoins spécifiques.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Utilisation des données</h2>
          <p>Vos données sont utilisées exclusivement pour répondre à vos demandes de devis, planifier une visite technique ou vous transmettre un accompagnement personnalisé sur nos solutions solaires.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Partage</h2>
          <p>Nous ne vendons ni ne louons vos données personnelles à des tiers. Elles peuvent être échangées via WhatsApp lorsque vous cliquez sur nos boutons de contact, dans le cadre strict du traitement de votre demande.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Conservation</h2>
          <p>Les informations sont conservées le temps nécessaire au suivi commercial et technique de votre projet, puis archivées ou supprimées.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Vos droits</h2>
          <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez-nous au +237 650544444 ou par le formulaire de contact.</p>
        </section>
      </div>
    </main>
  );
}
