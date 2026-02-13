"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { generateWhatsAppMessage, OrderDetails } from "@/lib/checkoutUtils";
import { cn } from "@/lib/utils";
import { Calendar, Truck, User, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WA_LINK } from "@/lib/constants";

export function CheckoutForm() {
    const { cart, region } = useStore();
    const [formData, setFormData] = useState<Partial<OrderDetails>>({
        deliveryType: 'digital',
        desiredDate: '',
    });

    const [loading, setLoading] = useState(false);

    // Determine if physical delivery is allowed/required
    const hasPhysicalItems = cart.some(item => item.product.isPhysical);

    // Update delivery type if physical items present
    if (hasPhysicalItems && formData.deliveryType !== 'physical') {
        setFormData(prev => ({ ...prev, deliveryType: 'physical' }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Basic validation
        if (!formData.clientName || !formData.whatsappPhone || !formData.desiredDate) {
            alert("Veuillez remplir les champs obligatoires (*)");
            setLoading(false);
            return;
        }

        if (hasPhysicalItems && !formData.address) {
            alert("L'adresse est obligatoire pour la livraison physique.");
            setLoading(false);
            return;
        }

        // Verify date (simple check)
        const date = new Date(formData.desiredDate!);
        const minDate = new Date();
        minDate.setDate(new Date().getDate() + 2); // J+2 logic
        minDate.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        if (date < minDate) {
            alert("La date souhaitée doit être au moins 2 jours à l'avance.");
            setLoading(false);
            return;
        }

        const order: OrderDetails = {
            clientName: formData.clientName!,
            whatsappPhone: formData.whatsappPhone!,
            recipientName: formData.recipientName || formData.clientName!,
            deliveryType: hasPhysicalItems ? 'physical' : (formData.deliveryType as 'digital' | 'physical' || 'digital'),
            address: formData.address,
            desiredDate: formData.desiredDate!,
            message: formData.message,
            filesNote: formData.filesNote,
            region: region || 'CM',
        };

        const message = generateWhatsAppMessage(order, cart);
        // Uses the constant for correct number and format
        const link = `${WA_LINK}?text=${message}`;

        window.open(link, '_blank');
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (cart.length === 0) return null;

    return (
        <form onSubmit={handleSubmit} className="bg-card/50 glass border border-white/10 rounded-xl p-6 shadow-lg animate-in fade-in slide-in-from-bottom-4 space-y-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="text-primary" />
                Finaliser sur WhatsApp
            </h2>

            <div className="space-y-4">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Votre Nom *</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                            <Input
                                type="text"
                                name="clientName"
                                required
                                placeholder="Jean Dupont"
                                className="pl-10"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Numéro WhatsApp *</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-3 text-muted-foreground text-xs font-bold z-10">WA</span>
                            <Input
                                type="tel"
                                name="whatsappPhone"
                                required
                                placeholder="+237 6..."
                                className="pl-10"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Recipient */}
                <div className="space-y-2">
                    <Label>Nom du Destinataire (si cadeau) *</Label>
                    <Input
                        type="text"
                        name="recipientName"
                        placeholder="Laissez vide si c'est pour vous"
                        onChange={handleChange}
                    />
                </div>

                {/* Delivery Info */}
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 space-y-4">
                    <div className="flex items-center gap-2 font-semibold text-primary">
                        <Truck className="h-5 w-5" />
                        Mode de Livraison
                    </div>

                    <div className="flex gap-4">
                        <label className={cn(
                            "flex-1 p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-2 text-sm",
                            formData.deliveryType === 'digital'
                                ? "border-primary bg-primary/20 text-white shadow-glow"
                                : "border-white/10 hover:bg-white/5 opacity-60"
                        )}>
                            <input
                                type="radio"
                                name="deliveryType"
                                value="digital"
                                checked={formData.deliveryType === 'digital'}
                                disabled={hasPhysicalItems}
                                onChange={handleChange}
                                className="hidden"
                            />
                            <span>Digital (WhatsApp)</span>
                        </label>

                        <label className={cn(
                            "flex-1 p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-2 text-sm",
                            formData.deliveryType === 'physical'
                                ? "border-primary bg-primary/20 text-white shadow-glow"
                                : (hasPhysicalItems ? "border-primary/50 text-white" : "border-white/10 hover:bg-white/5 opacity-60")
                        )}>
                            <input
                                type="radio"
                                name="deliveryType"
                                value="physical"
                                checked={formData.deliveryType === 'physical'}
                                onChange={handleChange}
                                className="hidden"
                            />
                            <span>Physique (Yaoundé)</span>
                        </label>
                    </div>

                    {hasPhysicalItems && (
                        <p className="text-xs text-yellow-500 font-medium">
                            ⚠️ Les articles physiques requièrent une livraison à Yaoundé (+1000 FCFA).
                        </p>
                    )}

                    {formData.deliveryType === 'physical' && (
                        <div className="space-y-2 animate-in slide-in-from-top-2">
                            <Label>Adresse de livraison à Yaoundé *</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                                <Input
                                    type="text"
                                    name="address"
                                    required={formData.deliveryType === 'physical'}
                                    placeholder="Quartier, repère, ville"
                                    className="pl-10"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Date */}
                <div className="space-y-2">
                    <Label>Date Souhaitée (min J+2) *</Label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                        <Input
                            type="date"
                            name="desiredDate"
                            required
                            min={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                            className="pl-10"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Messages */}
                <div className="space-y-2">
                    <Label>Message à inclure dans le cadeau</Label>
                    <Textarea
                        name="message"
                        rows={3}
                        placeholder="Écrivez votre mot doux ici..."
                        className="resize-none"
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2">
                    <Label>Note sur les fichiers (photos/vidéos)</Label>
                    <Textarea
                        name="filesNote"
                        rows={2}
                        placeholder="Ex: Je vais vous envoyer 5 photos sur WhatsApp après la commande."
                        className="resize-none"
                        onChange={handleChange}
                    />
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                variant="default"
                size="lg"
                className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-6 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
            >
                {loading ? "Préparation..." : "COMMANDER SUR WHATSAPP"}
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-4">
                Vous serez redirigé vers WhatsApp pour envoyer le récapitulatif pré-rempli. Aucun paiement n'est requis sur le site.
            </p>
        </form>
    );
}
