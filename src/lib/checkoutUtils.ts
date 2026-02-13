import { CartItem } from "@/store/useStore";
import { Region, Product } from "@/data/catalog";
import { SHIPPING_FEE_CM } from "./constants";
// import { format } from "date-fns"; // Removed unused import

// We will use native JS Date for simplicity to avoid another dependency if not needed,
// but date-fns is great. Let's stick to native for now or assumes date string.

export interface OrderDetails {
    clientName: string;
    whatsappPhone: string;
    recipientName: string;
    deliveryType: 'digital' | 'physical';
    address?: string;
    desiredDate: string;
    message?: string;
    filesNote?: string;
    region: Region;
}

export function generateWhatsAppMessage(order: OrderDetails, cart: CartItem[]) {
    const {
        clientName, whatsappPhone, recipientName, deliveryType,
        address, desiredDate, message, filesNote, region
    } = order;

    // Calculate totals
    const subtotal = cart.reduce((acc, item) => {
        const price = item.product.price[region];
        return acc + (price * item.quantity);
    }, 0);

    const shipping = (deliveryType === 'physical' && region === 'CM') ? SHIPPING_FEE_CM : 0;
    const total = subtotal + shipping;
    const currency = region === 'EU' ? '€' : 'FCFA';

    // Build Item List
    const itemsList = cart.map(item => {
        const opts = Object.entries(item.selectedOptions)
            .map(([k, v]) => `${k}:${v}`)
            .join(', ');
        const optStr = opts ? `(${opts})` : '';
        return `- ${item.product.name} x${item.quantity} ${optStr} — ${item.product.price[region] * item.quantity} ${currency}`;
    }).join('\n');

    // Build Message
    const text = `
*Commande Kado Express 237* 🎁
-----------------------------
*Région:* ${region}
*Client:* ${clientName} (${whatsappPhone})
*Destinataire:* ${recipientName}
*Livraison:* ${deliveryType === 'physical' ? 'PHYSIQUE (Yaoundé)' : 'DIGITAL (WhatsApp)'}
${deliveryType === 'physical' ? `*Adresse:* ${address}\n` : ''}*Date souhaitée:* ${desiredDate}

*Produits:*
${itemsList}

*Sous-total:* ${subtotal} ${currency}
${shipping > 0 ? `*Livraison:* ${shipping} ${currency}\n` : ''}*TOTAL:* ${total} ${currency}
-----------------------------
*Message à inclure:*
${message || "Aucun"}

*Fichiers:*
${filesNote || "Je vais envoyer les médias séparément."}
  `.trim();

    return encodeURIComponent(text);
}

export function getWhatsAppLink(message: string) {
    // We use the number from constants but for link generation
    return `https://wa.me/12896301143?text=${message}`;
}
