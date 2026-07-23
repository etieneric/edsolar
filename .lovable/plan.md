## Portée des modifications

### 1. Section "Laissez un avis" (avis clients)
- Nouveau composant `ReviewsSection` avec formulaire (nom, note 1-5 étoiles, commentaire) + affichage de la liste des avis publiés
- Stockage via **Lovable Cloud** (table `reviews` avec RLS : lecture publique, insertion publique, modération admin)
- Avis en attente de validation par l'admin avant publication

### 2. Dashboard admin (mot de passe `Admin123!`)
- Route `/admin` avec écran de connexion simple (mot de passe unique, session en sessionStorage)
- **Note sécurité :** un mot de passe partagé côté client est peu sécurisé ; recommandé d'activer plus tard une vraie auth Cloud. Pour l'instant on livre ce que tu demandes.
- Onglets du dashboard :
  - **Galerie photos** : upload / suppression / réordonner (Cloud Storage)
  - **Avis clients** : approuver / supprimer
  - **Kits** : CRUD sur les 3 kits (Prestige, Congélateur, Filet bleu) — titre, description, prix, image, contenu
  - **Vidéos YouTube** : gérée automatiquement (voir #4), pas d'édition manuelle

### 3. Section "Nos Kits"
- Nouvelle section sur la home entre Services et Calculateur
- 3 cartes initiales : **Kit-Prestige**, **Kit-Congélateur**, **Kit-Filet bleu** (contenu par défaut, éditable depuis /admin)
- CTA WhatsApp par kit

### 4. Intégration YouTube — chaîne @Bimediatv
- Grille de miniatures cliquables (style capture d'écran fournie) affichant les dernières vidéos
- Bouton "S'abonner à notre chaîne YouTube"
- Clic ouvre la vidéo dans une modal lecteur YouTube embed
- **Approche technique :** flux RSS YouTube public (`https://www.youtube.com/feeds/videos.xml?channel_id=...`) via server function (pas besoin de clé API). Fallback sur liste statique si le flux est indisponible.

### 5. Boutique — mise à jour prix & photos (PDF SAKO)
Refonte de la section Produits avec les vrais équipements du catalogue SAKO au **prix Marketing** :
- **Onduleurs** : E-SUN 1KVA (95k), 2KVA (140k), 3KVA (170k), 4.2KVA (200k), 6.2KVA (230k), 10.2KVA (360k) ; SUNON V 4.5KW (260k), 6.5KW (300k) ; SUNPOLO 6.2KW (350k), 11KVA (580k) ; SUNIN 12KW triphasé (1.2M)
- **Batteries lithium Li-SUN** : 25.6V 100Ah (310k), 200Ah (550k), 300Ah (700k) ; 51.2V 100Ah (550k), 200Ah (950k), 300Ah (1.35M), 600Ah (2.5M)
- Filtres par catégorie (Onduleurs / Batteries / Kits complets)
- Photos officielles : je génère des visuels produit propres correspondant aux modèles (le PDF n'incluant pas d'images extractibles)

## Détails techniques

- Activation **Lovable Cloud** (base de données + storage + auth pour la modération)
- Tables : `reviews`, `gallery_photos`, `kits`, `admin_settings`
- Storage bucket public : `gallery`, `kits`
- Server function : `fetch-youtube-videos` (parse RSS)
- Nouveaux fichiers : `src/routes/admin.tsx`, `src/components/ReviewsSection.tsx`, `src/components/KitsSection.tsx`, `src/components/YouTubeSection.tsx`, migrations SQL

## Ordre d'exécution
1. Activer Lovable Cloud + migrations (tables, buckets, RLS)
2. Server function YouTube RSS
3. Section Kits + Section YouTube + Section Avis sur la home
4. Refonte boutique avec prix SAKO + visuels
5. Dashboard admin `/admin`

Confirme-moi et je lance tout.