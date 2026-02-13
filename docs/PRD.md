# Product Requirement Document (PRD) — Kado Express 237

## 1. Product Overview
**Kado Express 237** is an ultra-modern, mobile-first e-commerce platform designed for the Valentine's Day 2026 season. It specializes in emotional gifts, ranging from personalized digital content (songs, poems, videos) to physical luxury items (jewelry, watches) available exclusively in Yaoundé.

### 1.1 Vision
To create a "Wow" effect with a high-end "Neon Pink" aesthetic, simplifying the gift-giving process through a seamless browse-to-WhatsApp ordering flow.

### 1.2 Target Audience
-   **Primary**: Young couples and romantics in Cameroon (Yaoundé for physical goods).
-   **Secondary**: Diaspora (Gabon, Europe) wishing to offer digital gifts or services.
-   **Occasion**: Valentine's Day (primary), Anniversaries, Apologies, Declarations.

---

## 2. User Experience (UX) & Design
The design is a critical success factor and must strictly adhere to the "Neon Pink" aesthetic.

### 2.1 Visual Style
-   **Theme**: Dark mode dominant (Deep black/purple backgrounds: `#06030A`).
-   **Accents**: Neon Pink (`#FF2BD6`) and subtle Violet Glows.
-   **Materials**: Glassmorphism (translucent cards with thin borders and blurs).
-   **Animations**: Micro-interactions (hover floats, glow pulses), smooth page transitions (Framer Motion).
-   **Modes**: Full separate Light Mode support required, maintaining the pink branding.

### 2.2 Navigation Structure
-   **Home (`/`)**: High-conversion landing page. Hero split screen, Best Sellers, Trust Signals, FAQ.
-   **Shop (`/boutique`)**: Filterable product listing (Category, Price).
-   **Packs (`/packs`)**: Pre-bundled offers for quick purchase.
-   **Builder (`/personnaliser`)**: Custom gift composition tool.
-   **Cart (`/panier`)**: Review items, adjust quantities, calculate totals including shipping.
-   **Checkout**: Form to collect details, leading to WhatsApp.
-   **Static Pages**: FAQ, Contact, Terms.

### 2.3 Responsiveness
-   **Mobile-First Approach**: UI must be optimized for vertical scrolling and touch interactions.
-   **Desktop**: Adapted grid layouts (3 columns), sticky cart summary.

---

## 3. Functional Requirements

### 3.1 Localization (Region & Language)
-   **Region Detection**: Modal on first visit to select region: **Cameroun (CM)**, **Gabon (GA)**, or **Europe (EU)**.
-   **Currency Display**:
    -   CM/GA: FCFA
    -   EU: EUR (€)
-   **Persistence**: Selection saved in `localStorage`.
-   **Language**: Toggle between **Français (FR)** and **English (EN)**. Default to FR or browser locale.

### 3.2 Product Catalog
-   **Categories**:
    1.  **Livres**: PDF/Audio packs.
    2.  **Personnalisables**: Custom songs, poems, videos.
    3.  **Visuels & Vidéo**: Graphics, photo edits, montages.
    4.  **Services**: Web design, marketing, CVs.
    5.  **Produits Physiques**: Jewelry, watches, T-shirts (Yaoundé only).
    6.  **Packs**: Curated bundles.
-   **Availability Logic**: "Produits Physiques" category and items are **disabled** or hidden if Region is NOT CM.

### 3.3 Shopping Cart & Pricing
-   **Dynamic Pricing**: Prices update globally based on selected region.
-   **Shipping Fee**: Automatic `+1000 FCFA` added if Cart contains at least one **Physical Item**.
-   **Quantities**: Adjustable via +/- buttons.
-   **Real-time Totals**: Subtotal + Shipping = Total.

### 3.4 Order & Checkout
-   **Validation**:
    -   **Minimum Date**: User cannot select a delivery date earlier than `Today + 2 days`.
    -   **Physical Delivery**: Address field mandatory only if physical items are in cart.
-   **Data Collection**:
    -   Client Name & WhatsApp Number.
    -   Recipient Name.
    -   Delivery Address (if applicable).
    -   Custom Message / Files note.
-   **WhatsApp Integration**:
    -   Generates a structured text message summarizing the entire order (see `WHATSAPP_ORDER.md`).
    -   Uses `wa.me` link to open chat with `+1 (289) 630‑1143`.

---

## 4. Technical Constraints
-   **Framework**: Next.js (App Router).
-   **Language**: TypeScript.
-   **Styling**: Tailwind CSS + CSS Variables for theming.
-   **State Management**: Zustand (Cart, Region, Locale).
-   **Animation**: Framer Motion.
-   **Internationalization**: `next-intl`.
-   **Icons**: `lucide-react`.

## 5. Deliverables
1.  Fully functional web application (Build & Dev modes).
2.  Clean, modular component architecture (Cards, Modals, Forms).
3.  Centralized Data file (`catalog.ts`) derived from `CATALOG.md`.
4.  Helper functions for WhatsApp link generation and Price formatting.
