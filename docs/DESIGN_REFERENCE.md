# DESIGN_REFERENCE — Look & Feel (néon rose, glass, ultra premium)

## Objectif
Reproduire le design “dark neon pink” :
- fond sombre profond
- glow rose/violet
- sections en cartes glassmorphism
- boutons néon rose
- micro-animations élégantes (rien de lourd)

## Palette (proposition à respecter)
> Ajuster au besoin, mais rester dans ce style.

### Dark theme
- Background: #06030A à #0B0612 (dégradés subtils)
- Foreground texte: #F4F1FF
- Muted texte: rgba(244,241,255,0.72)
- Card bg (glass): rgba(255,255,255,0.04)
- Card border: rgba(255,255,255,0.10)
- Accent pink: #FF2BD6
- Accent pink 2: #FF4DE3
- Violet glow: #A855F7 (léger)
- Danger: #FF3B6B

### Light theme
- Background: #FFFFFF avec léger rose très pâle (gradient)
- Foreground: #140A1E
- Card: rgba(20,10,30,0.04) + border rgba(20,10,30,0.10)
- Accent pink identique (mais halos adoucis)
- Shadows plus soft

## Background & Glow
- Utiliser :
  - un gradient radial rose en bas de sections (hero, CTA final)
  - un léger “noise overlay” (CSS) pour effet premium
- Exemple effets:
  - `radial-gradient(800px circle at 50% 110%, rgba(255,43,214,0.45), transparent 60%)`
  - `radial-gradient(600px circle at 20% 0%, rgba(168,85,247,0.18), transparent 50%)`

## Typographie
- Sans-serif moderne (ex: Inter / Space Grotesk / Sora)
- Titres: plus large, tracking léger négatif
- Paragraphes: line-height confortable, max-width

## Composants (style)
### Navbar
- transparente + blur (sticky)
- liens minimalistes
- à droite: toggle thème + switch langue + CTA WhatsApp

### Boutons
- Primary: fond rose néon + glow
- Secondary: glass outline (bordure) + hover glow
- Tap animation: scale(0.98)
- Hover: glow plus fort

### Cards
- border radius: 20–28px
- glass bg + border fine
- shadow: très douce + halo rose sur hover
- Survol produits: translateY(-6px) + scale(1.02) + glow intensifié

### Accordions (FAQ)
- style glass
- open state: bordure rose + glow léger

## Motion (Framer Motion)
- Reveal sections au scroll: fade + translateY
- CTA pulse (très léger)
- Add to cart: toast + micro bounce
- Hover cards: float + glow
- Respecter performance: animations 150–250ms, easing smooth

## Responsive
- Mobile-first:
  - hero centré, CTA visibles
  - sections en 1 colonne
  - grid produits: 1 colonne (mobile) → 2 (sm) → 3 (lg)
  - panier: sticky summary sur desktop
