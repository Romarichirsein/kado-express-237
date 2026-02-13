# WHATSAPP_ORDER — Spécification

## Numéros
- WhatsApp Business (UNIQUE pour toutes commandes) : +1 (289) 630‑1143
- wa.me : https://wa.me/12896301143 (sans +, sans espaces)
- Téléphone (appel) principal : +237 692 738 430
- Téléphone secondaire : +237 692 371 538

## Règle délai
- Date souhaitée >= aujourd’hui + 2 jours (bloquer sinon)

## Modèle de message (structure)
Le message doit être construit puis encodé via encodeURIComponent.

Exemple (avant encodage) :

Commande KadoExpress237
Pays: {CM|GA|EU}
Client: {Nom Prénom} - Tel: {Num WhatsApp}
Destinataire: {Nom Prénom}
Livraison: {DIGITAL via WhatsApp | PHYSIQUE Yaoundé}
Adresse (si physique): {Quartier, repère, détails}
Date souhaitée: {YYYY-MM-DD} (Commande 2 jours avant)

Produits:
- {Produit 1} x{qte} {options} — {prix}
- {Produit 2} x{qte} {options} — {prix}

Sous-total: {subtotal}
Frais livraison Yaoundé: {shipping si physique}
Total: {total}

Détails / Message à inclure:
{message client}

Fichiers:
{“Je vais envoyer les photos/vidéos juste après ce message sur WhatsApp” | lien si fourni}

## Format du lien WhatsApp
https://wa.me/12896301143?text={ENCODED_MESSAGE}

## Notes UX
- Le bouton “Commander sur WhatsApp” doit toujours fonctionner (mobile + desktop)
- Sur desktop: ouvrir web.whatsapp.com si WhatsApp app absent (optionnel)
- Après clic: afficher un toast “Ouverture de WhatsApp…”
