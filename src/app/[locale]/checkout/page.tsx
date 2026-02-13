"use client";

import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { useStore } from "@/store/useStore";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
    const cart = useStore((state) => state.cart);
    const router = useRouter();

    useEffect(() => {
        if (cart.length === 0) {
            router.push('/boutique');
        }
    }, [cart, router]);

    if (cart.length === 0) return null;

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link href="/boutique" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Retour à la boutique
            </Link>

            <h1 className="text-3xl font-bold mb-2">Finaliser la Commande</h1>
            <p className="text-muted-foreground mb-8">
                Remplissez ce formulaire pour générer votre commande WhatsApp.
                Aucun paiement ne sera prélevé ici.
            </p>

            <CheckoutForm />
        </div>
    );
}
