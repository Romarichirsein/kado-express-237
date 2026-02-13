# GUARDRAILS.md — Règles strictes (ne jamais casser)

## 1) WhatsApp & contacts
- Tous les boutons WhatsApp utilisent EXCLUSIVEMENT : +1 (289) 630‑1143
- Format wa.me obligatoire : 12896301143
- Ne jamais remplacer ce numéro.
- Bouton “Appeler” utilise le numéro principal : +237 692 738 430
- Le secondaire peut être affiché en fallback.

## 2) Commande 100% WhatsApp
- Aucune “commande interne” sans WhatsApp.
- Le parcours final : panier → formulaire → ouverture WhatsApp avec message pré‑rempli.
- Le message doit inclure :
  - Pays/région (CM/GA/EU)
  - Client: nom & prénom
  - Tel client (WhatsApp)
  - Destinataire: nom & prénom
  - Adresse de livraison (si physique) + repères + quartier (Yaoundé)
  - Date souhaitée (validation J+2)
  - Liste produits, quantités, options, prix
  - Frais livraison si physique
  - Total final
  - Message à inclure (texte libre)
  - Note fichiers (comment envoyer)

## 3) Livraison & règles Yaoundé
- Produits physiques disponibles uniquement si région = Cameroun (CM).
- Livraison = Yaoundé seulement.
- Frais fixes = +1000 FCFA si au moins 1 produit physique dans le panier.
- Afficher clairement la règle sur Panier + Commander + pages produits physiques.

## 4) Délai
- Toujours afficher “Commander 2 jours avant”.
- Date de livraison souhaitée doit être >= aujourd’hui + 2 jours.
- Si invalid : bloquer bouton commander et afficher erreur.

## 5) Prix localisés
- Toute carte produit/pack affiche le prix correspondant à la région.
- Si “Non proposé” : pas d’ajout au panier.
- La région est persistée (localStorage/cookie).

## 6) Design
- Ne pas dériver vers un design “template” classique.
- Respecter glassmorphism + néons roses + glow + gradients.
- Dark mode = identité principale.
- Light mode = version claire cohérente (mêmes composants, couleurs adaptées).
