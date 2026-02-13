"use client";

import { useStore } from "@/store/useStore";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SHIPPING_FEE_CM } from "@/lib/constants";

export function Cart() {
    const { cart, removeFromCart, updateQuantity, isCartOpen, toggleCart, region } = useStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const currencySymbol = region === 'EU' ? '€' : 'FCFA';

    // Calculate Subtotal
    const subtotal = cart.reduce((acc, item) => {
        const price = region ? item.product.price[region] : item.product.price.CM;
        return acc + (price * item.quantity);
    }, 0);

    // Calculate Shipping (Only for display purposes here, final calculation is in checkout)
    const hasPhysicalItems = cart.some(item => item.product.isPhysical);
    const shippingFee = (region === 'CM' && hasPhysicalItems) ? SHIPPING_FEE_CM : 0;

    const total = subtotal + shippingFee;

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card border-l border-border shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ShoppingBag className="text-primary" />
                                Panier ({cart.length})
                            </h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-accent rounded-full transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                                    <ShoppingBag className="h-12 w-12 opacity-20" />
                                    <p>Votre panier est vide.</p>
                                    <Button onClick={toggleCart} variant="outline">
                                        Continuer vos achats
                                    </Button>
                                </div>
                            ) : (
                                cart.map((item, index) => {
                                    const price = region ? item.product.price[region] : item.product.price.CM;
                                    return (
                                        <div key={`${item.product.id}-${index}`} className="flex gap-4 p-3 rounded-lg bg-accent/50 border border-border">
                                            {/* Image */}
                                            <div className="relative w-16 h-16 rounded-md overflow-hidden bg-background">
                                                {item.product.image ? (
                                                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-xs">🎁</div>
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                                                <p className="text-xs text-muted-foreground mb-2">
                                                    {Object.entries(item.selectedOptions).map(([k, v]) => `${v}`).join(', ')}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-bold text-sm">
                                                        {price} {currencySymbol}
                                                    </span>

                                                    <div className="flex items-center gap-2 bg-background rounded-full px-2 py-1 border border-border">
                                                        <button
                                                            onClick={() => updateQuantity(index, -1)}
                                                            className="text-xs w-4 h-4 flex items-center justify-center hover:text-primary"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-xs font-mono">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(index, 1)}
                                                            className="text-xs w-4 h-4 flex items-center justify-center hover:text-primary"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                onClick={() => removeFromCart(index)}
                                                className="text-muted-foreground hover:text-destructive flex items-start"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-4 border-t border-border space-y-4 bg-accent/20">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Sous-total</span>
                                        <span>{subtotal} {currencySymbol}</span>
                                    </div>
                                    {hasPhysicalItems && region === 'CM' && (
                                        <div className="flex justify-between text-yellow-500">
                                            <span>Livraison (Yaoundé)</span>
                                            <span>+ {shippingFee} {currencySymbol}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                                        <span>Total</span>
                                        <span>{total} {currencySymbol}</span>
                                    </div>
                                </div>

                                <Link href="/checkout" onClick={toggleCart}>
                                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6">
                                        COMMANDER MAINTENANT
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
