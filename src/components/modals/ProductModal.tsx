"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Product } from "@/data/catalog";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { ImageCarousel } from "@/components/ui/image-carousel";

interface ProductModalProps {
    product: Product | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
    const { region, addToCart } = useStore();
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string | boolean>>({});

    if (!product) return null;

    const currencySymbol = region === 'EU' ? '€' : 'FCFA';
    const price = region ? product.price[region] : product.price.CM;

    // Calculate total including options
    let modalTotal = price;
    if (product.options) {
        // Simple logic for toggle options only for now as per catalog
        product.options.forEach(opt => {
            if (selectedOptions[opt.id] && opt.priceModifier) {
                modalTotal += region ? opt.priceModifier[region] : opt.priceModifier.CM;
            }
        });
    }

    const handleAddToCart = () => {
        addToCart(product, selectedOptions);
        onOpenChange(false);
        setSelectedOptions({});
    };

    const handleOptionChange = (optionId: string, value: any) => {
        setSelectedOptions(prev => ({ ...prev, [optionId]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{product.name}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Image Display - Carousel or Single Image */}
                    {product.images && product.images.length > 0 ? (
                        <ImageCarousel images={product.images} alt={product.name} />
                    ) : product.image ? (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                        </div>
                    ) : (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                            <div className="flex h-full items-center justify-center text-muted-foreground">Image non disponible</div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <DialogDescription className="text-base text-foreground">
                            {product.description}
                        </DialogDescription>

                        {/* Options rendering */}
                        {product.options && (
                            <div className="space-y-3 p-4 bg-accent/20 rounded-lg">
                                <h4 className="font-semibold text-sm">Options disponibles :</h4>
                                {product.options.map(opt => (
                                    <div key={opt.id} className="flex items-center justify-between">
                                        <label htmlFor={opt.id} className="text-sm cursor-pointer flex-1">
                                            {opt.label}
                                            {opt.priceModifier && (
                                                <span className="text-muted-foreground ml-1">
                                                    (+{region ? opt.priceModifier[region] : opt.priceModifier.CM} {currencySymbol})
                                                </span>
                                            )}
                                        </label>
                                        {opt.type === 'toggle' && (
                                            <input
                                                type="checkbox"
                                                id={opt.id}
                                                checked={!!selectedOptions[opt.id]}
                                                onChange={(e) => handleOptionChange(opt.id, e.target.checked)}
                                                className="accent-primary h-4 w-4"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="flex items-center gap-4 sm:justify-between w-full">
                    <div className="text-xl font-bold text-primary">
                        {modalTotal} {currencySymbol}
                    </div>
                    <Button onClick={handleAddToCart} size="lg" className="w-full sm:w-auto gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Ajouter au Panier
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
