import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Politique des cookies — EDSOLAR Énergie Cameroun" },
      { name: "description", content: "Utilisation des cookies sur le site EDSOLAR Énergie Cameroun." },
      { property: "og:title", content: "Politique des cookies — EDSOLAR Énergie Cameroun" },
      { property: "og:description", content: "Informations sur les cookies utilisés par EDSOLAR Énergie Cameroun." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link to="/" className="text-sm text-primary hover:underline">← Retour à l'accueil</Link>
      <h1 className="mt-4 text-4xl font-black text-primary">Politique des cookies</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground/80">
        <section>
          <h2 className="text-lg font-bold text-primary">Qu'est-ce qu'un cookie ?</h2>
          <p>Un cookie est un petit fichier déposé sur votre terminal (ordinateur, mobile, tablette) lors de la visite d'un site web. Il permet notamment de mémoriser vos préférences et d'analyser la fréquentation.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Cookies utilisés</h2>
          <p>Le site EDSOLAR Énergie Cameroun utilise uniquement des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire n'est déposé.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Gestion des cookies</h2>
          <p>Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies ou être averti avant leur enregistrement. Le refus des cookies techniques peut altérer certaines fonctionnalités du site.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-primary">Contact</h2>
          <p>Pour toute question relative à notre utilisation des cookies : +237 650544444.</p>
        </section>
      </div>
    </main>
  );
}
