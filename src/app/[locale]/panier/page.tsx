"use client";

import { useStore } from "@/store/useStore";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { cn } from "@/lib/utils";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
    const { cart, region, updateQuantity, removeFromCart } = useStore();

    const currencySymbol = region === 'EU' ? '€' : 'FCFA';

    if (!cart.length) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-6 bg-accent/30 rounded-full">
                        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
                <p className="text-muted-foreground mb-8">
                    Découvrez nos packs et créations uniques pour la Saint-Valentin.
                </p>
                <Link
                    href="/boutique"
                    className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg hover:shadow-primary/25"
                >
                    Aller à la boutique
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                Votre Panier
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item, index) => {
                        const price = region ? item.product.price[region] : item.product.price.CM;
                        const totalItemPrice = price * item.quantity;

                        return (
                            <div
                                key={`${item.product.id}-${index}`}
                                className="bg-card glass border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center group hover:border-primary/30 transition-colors"
                            >
                                {/* Image / Icon */}
                                <div className="h-20 w-20 bg-accent rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                                    🎁
                                </div>

                                {/* Details */}
                                <div className="flex-grow">
                                    <h3 className="font-bold text-lg">{item.product.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {/* Display options if any */}
                                        {Object.entries(item.selectedOptions).map(([key, val]) => (
                                            <span key={key} className="mr-2 bg-accent/50 px-2 py-0.5 rounded text-xs">
                                                {key}: {val}
                                            </span>
                                        ))}
                                    </p>
                                    <div className="font-mono font-bold text-primary mt-1">
                                        {price} {currencySymbol}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="flex items-center bg-accent/50 rounded-lg border border-border">
                                        <button
                                            onClick={() => updateQuantity(index, -1)}
                                            className="p-2 hover:text-primary transition-colors disabled:opacity-50"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-8 text-center font-mono font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(index, 1)}
                                            className="p-2 hover:text-primary transition-colors"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(index)}
                                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                        title="Supprimer"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Checkout Form & Summary */}
                <div className="lg:col-span-1">
                    <CheckoutForm />
                </div>
            </div>
        </div>
    );
}
