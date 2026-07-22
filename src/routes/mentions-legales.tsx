import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — EDSOLAR Énergie Cameroun" },
      { name: "description", content: "Mentions légales du site EDSOLAR Énergie Cameroun : éditeur, hébergement et responsabilités." },
      { property: "og:title", content: "Mentions légales — EDSOLAR Énergie Cameroun" },
      { property: "og:description", content: "Informations légales relatives au site EDSOLAR Énergie Cameroun." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link to="/" className="text-sm text-primary hover:underline">← Retour à l'accueil</Link>
      <h1 className="mt-4 text-4xl font-black text-primary">Mentions légales</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-lg font-bold text-primary">Éditeur du site</h2>
          <p>EDSOLAR Énergie Cameroun — Tradex Olembe, Yaoundé, Cameroun.</p>
          <p>Téléphone : +237 650544444</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Directeur de la publication</h2>
          <p>La direction d'EDSOLAR Énergie Cameroun.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Hébergement</h2>
          <p>Le site est hébergé sur une infrastructure cloud (Cloudflare Workers).</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Conception & développement</h2>
          <p>Site conçu et développé par Bimedia Connect Agency.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Propriété intellectuelle</h2>
          <p>L'ensemble des contenus (textes, images, logos) présents sur ce site sont la propriété d'EDSOLAR Énergie Cameroun ou de leurs auteurs respectifs. Toute reproduction sans autorisation préalable est interdite.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Responsabilité</h2>
          <p>EDSOLAR Énergie Cameroun s'efforce d'assurer l'exactitude des informations publiées sur le site mais ne saurait être tenu responsable des erreurs, omissions ou indisponibilités du service.</p>
        </section>
      </div>
    </main>
  );
}
