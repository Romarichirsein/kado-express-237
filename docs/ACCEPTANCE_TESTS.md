
---

# 8) `docs/ACCEPTANCE_TESTS.md` (checklist de validation)

```md
# ACCEPTANCE_TESTS — Critères d’acceptation (QA)

## Pricing / Région
- [ ] Au premier chargement, une modal propose la géoloc OU sélection manuelle (CM/GA/EU)
- [ ] Le choix région persiste (refresh, navigation)
- [ ] Tous les prix changent selon région (boutique, packs, builder, panier)
- [ ] Les produits “Non proposé” sont désactivés (pas ajout panier)

## Builder
- [ ] On peut cocher/décocher des items
- [ ] Quantités modifiables (si pertinent)
- [ ] Options (toggle / radio) appliquent bien le prix
- [ ] Le résumé (total) se met à jour en temps réel

## Panier
- [ ] Liste items + options + quantités
- [ ] Total correct et stable après navigation
- [ ] Si produit physique (CM) → frais livraison +1000 FCFA ajoutés
- [ ] Si région ≠ CM → impossibilité d’ajouter du physique (ou suppression + message)

## Commande (WhatsApp)
- [ ] Formulaire valide champs requis
- [ ] Date souhaitée >= aujourd’hui + 2 jours (bloquer sinon)
- [ ] Bouton commande ouvre WhatsApp sur wa.me/12896301143
- [ ] Message WhatsApp contient: pays, client, tel, destinataire, items, total, options, livraison, date, message client

## UI/UX & Design
- [ ] Dark mode identique style néon rose (glow, glassmorphism)
- [ ] Light mode cohérent
- [ ] Hover produits: float + glow
- [ ] Boutons: feedback clic (tap scale + glow)
- [ ] Responsive mobile-first (tous breakpoints)
- [ ] Accessibilité: focus visible, contrastes, accordions navigables clavier

## Performance
- [ ] LCP correct (pas d’animations lourdes)
- [ ] Images optimisées / lazyload
