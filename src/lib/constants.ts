export const APP_NAME = "Kado Express 237";
export const WHATSAPP_NUMBER = "12896301143"; // Corrected to +1 (289) 630‑1143 per Guardrails
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export const WA_NUMBER_FORMATTED = "+1 (289) 630‑1143";
export const WA_LINK = WHATSAPP_LINK;

export const PHONE_PRIMARY = "+237 692 738 430";
export const PHONE_SECONDARY = "+237 692 371 538";

export const SHIPPING_FEE_CM = 1000;
export const MIN_DAYS_ADVANCE = 2;

export const REGIONS = [
    { code: 'CM', label: 'Cameroun (FCFA)', currency: 'XAF' },
    { code: 'GA', label: 'Gabon (FCFA)', currency: 'XAF' },
    { code: 'EU', label: 'Europe (€)', currency: 'EUR' },
] as const;

export type RegionCode = typeof REGIONS[number]['code'];
