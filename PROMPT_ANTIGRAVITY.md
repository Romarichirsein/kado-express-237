# PROMPT — Antigravity (à coller dans le chat)

Tu es un assistant de dev agentique. Objectif: générer un site e‑commerce ultra premium pour **Kado Express 237**.

## Références à respecter
- Lis et applique strictement: AGENTS.md, GUARDRAILS.md, docs/*
- Le design doit reproduire EXACTEMENT le style “néons roses” (dark) du screenshot fourni (glow rose, glassmorphism, gradients, cards arrondies, CTA néon).
- Implémente un thème clair + thème sombre (toggle).
- Implémente FR/EN (switch langue) sans bugs.

## Contraintes business (non négociables)
- Livraison produits physiques: Yaoundé uniquement + frais fixes +1000 FCFA
- Commande 2 jours avant (date min = aujourd’hui + 2 jours)
- Commande 100% via WhatsApp, message pré-rempli complet
- WhatsApp Business unique (tous liens) : +1 (289) 630-1143 → wa.me/12896301143
- Tel appel principal : +237 692 738 430 ; secondaire : +237 692 371 538

## Fonctionnalités obligatoires
1) Localisation prix:
   - Modal au premier load: proposer géoloc + fallback sélection manuelle (CM/GA/EU)
   - Persister choix (localStorage)
   - Mettre à jour prix partout

2) Catalogue complet:
   - Catégories: Livres, Personnalisables, Visuels & Vidéo, Services, Produits physiques, Packs
   - Utiliser docs/CATALOG.md comme source of truth
   - Produits “Non proposé” selon région => désactivés

3) Pages:
   - Home (landing conversion: hero, best-sellers, confiance, process, FAQ, CTA final)
   - Boutique
   - Packs
   - Personnaliser (builder: checklist + options + quantités + total live)
   - Panier
   - Commander (formulaire)
   - FAQ
   - Contact
   - Conditions

4) Panier:
   - Ajouter/supprimer, modifier quantités, options
   - Frais livraison Yaoundé si physique
   - Totaux corrects

5) Formulaire commande:
   - Nom client, nom destinataire, tel WhatsApp, message à inclure, date souhaitée
   - Adresse Yaoundé seulement si panier contient physique
   - Choix voix si panier contient un item audio
   - Langue FR/EN
   - Note fichiers (ex: “je vais envoyer les médias après”)
   - Validation date J+2

6) WhatsApp:
   - Construire un message structuré (voir docs/WHATSAPP_ORDER.md)
   - Ouvrir wa.me/12896301143?text=ENCODED
   - Ajouter toast “Ouverture de WhatsApp…”

## Exigence design (très important)
- Dark mode identique au screenshot:
  - background sombre + glow rose (radial gradients) + noise overlay
  - cards glass (border fin, blur, halo rose hover)
  - CTA néon rose
- Survol produits: float vers l’avant (translateY negative + scale + shadow glow)
- Animations légères (Framer Motion): reveal sections, hover, tap feedback
- Ultra responsive mobile-first

## Tech stack souhaitée (si possible)
- Next.js App Router + TypeScript + Tailwind
- next-themes (dark/light)
- next-intl (FR/EN)
- Zustand (cart + region + locale)
- Radix/shadcn pour Dialog/Accordion/Switch
- Framer Motion
- lucide-react icons

## Livrables
- Projet compilable sans erreurs:
  - `pnpm install`
  - `pnpm dev`
  - `pnpm build` OK
- Code propre, composants réutilisables:
  - Button, Card, ProductCard, Price, RegionModal, LanguageSwitch, ThemeToggle, CartDrawer/CartPage
- Data catalogue dans un fichier unique (ex: src/data/catalog.ts) basé sur docs/CATALOG.md
- Fonctions utilitaires:
  - formatPrice(region, amount)
  - computeCartTotals(cart, region)
  - buildWhatsAppMessage(order)
  - buildWaLink(message)

## Plan d’action demandé (à exécuter)
1) Scaffold Next.js + deps + config Tailwind (tokens design + themes)
2) Implémenter layout + navbar + footer (design glass + glow)
3) Implémenter region pricing + modal
4) Implémenter i18n FR/EN
5) Implémenter catalogue data + pages boutique/packs
6) Implémenter builder + panier + checkout form
7) WhatsApp order + validations + QA checklist
8) Polish: animations, hover float, accessibilité, perf

Commence par créer la structure, puis itère jusqu’à respecter 100% les docs.
