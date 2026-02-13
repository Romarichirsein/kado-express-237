# AGENTS.md — Kado Express 237 (E‑commerce WhatsApp) — Saint‑Valentin 2026

## Objectif
Construire un site e‑commerce **ultra moderne, mobile‑first, responsive**, avec un design **néons roses** (dark) identique au style fourni en image (glow rose, glassmorphism, gradients, cartes arrondies, micro‑animations), et un **thème clair** (light) équivalent.

Le site vend des **produits digitaux** (livrés via WhatsApp) et des **produits physiques** (livraison **uniquement Yaoundé**, frais fixes **+1000 FCFA**).
La commande finale se fait **100% via WhatsApp** avec un message pré‑rempli (structuré).

Le site doit être **bilingue FR/EN** (switch de langue).
Le site doit afficher des **prix localisés** selon la région : **CM / GA / EU** (FCFA ou €) avec détection (si possible) + sélecteur manuel, persistance en localStorage.

## Contacts & règles non négociables
- Téléphone principal (appel) : +237 692 738 430
- Téléphone secondaire : +237 692 371 538
- WhatsApp Business (tous les liens WhatsApp du site) : +1 (289) 630‑1143  → wa.me/12896301143
- Livraison produits physiques : **Toute la ville de Yaoundé** uniquement
- Délai : le client doit **commander 2 jours avant** (validation côté UI + message WhatsApp)
- Toute commande (même depuis panier) = redirection WhatsApp avec message complet.

## Pages / routes minimales
- `/` Accueil (landing conversion + best‑sellers + sections confiance + FAQ + CTA final)
- `/boutique` Listing produits (filtres catégories + recherche)
- `/packs` Packs prêts à vendre (cartes + filtres)
- `/personnaliser` Builder (sélection à la carte + options + quantités + résumé live)
- `/panier` Panier (edit quantités, options, frais livraison Yaoundé si physique, total)
- `/commander` Formulaire (ou modal depuis panier) + bouton “Commander sur WhatsApp”
- `/faq`
- `/contact`
- `/conditions` (mentions / confidentialité / conditions)

## Comportements clés
- Modal “Région & devise” au premier chargement :
  - proposer “Activer ma position” (géoloc)
  - sinon sélecteur : Cameroun (FCFA), Gabon (FCFA), Europe (EUR)
  - persister le choix
- Prix partout (boutique, packs, builder, panier) selon région.
- Produits non disponibles dans une région → afficher “Non proposé” + désactiver l’achat.
- Si panier contient produit physique (CM seulement) :
  - ajouter automatiquement “Frais livraison Yaoundé: +1000 FCFA”
- Date souhaitée :
  - empêcher la date < J+2 (2 jours avant)
  - afficher info claire “Commande 2 jours à l’avance”
- Commande WhatsApp :
  - message structuré : pays, client, destinataire, téléphone, adresse (si physique), date, items, options, total, message.
  - ouvrir WhatsApp sur wa.me/12896301143?text=...

## Stack conseillée (préférée)
- Next.js (App Router) + TypeScript
- TailwindCSS + CSS variables (thème)
- `next-themes` pour dark/light
- i18n : `next-intl` (ou équivalent robuste) + switch FR/EN
- State panier : Zustand (ou Context + reducer)
- Animations : Framer Motion (micro‑interactions + hover float + reveal sections)
- UI primitives : Radix UI (Switch, Accordion, Dialog, Tabs) ou shadcn/ui
- Toasts : sonner (ou équivalent)
- Icons : lucide-react

## Exigence design (FIDÉLITÉ)
- Reproduire le style néon rose fourni :
  - fond très sombre + gradients roses
  - glow rose sous hero / sections
  - cards glassmorphism (bordure fine + blur + ombre glow)
  - CTA rose néon avec halo
  - typographie moderne, espacée
  - sections aérées, conversion‑oriented
- Survol produits : la card “flotte” vers l’avant (translateY négatif + légère scale + glow augmenté).
- Boutons : feedback au clic (scale down léger + glow pulse / ring).

## Commandes projet (à adapter si besoin)
- Install: `pnpm install`
- Dev: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck` (si script)
- Tests: `pnpm test` (si configurés)

## Qualité / contraintes
- Mobile-first (priorité)
- Performance : images optimisées, animations légères
- Accessibilité : contrastes, focus states visibles, navigation clavier
- Aucun paiement obligatoire : commande via WhatsApp uniquement
- Pas de “dummy CTA” : chaque CTA mène à une page/action réelle
