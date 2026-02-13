"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/store/useStore";
import { catalog, Product, Region } from "@/data/catalog";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Image from "next/image";
import { ProductModal } from "@/components/modals/ProductModal";

export default function PacksPage() {
    const region = useStore((state) => state.region);
    const addToCart = useStore((state) => state.addToCart);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const packs = useMemo(() => {
        return catalog.filter((p) => p.category === "Packs" || p.category === "Livres");
    }, []);

    const currencySymbol = region === 'EU' ? '€' : 'FCFA';

    const getPrice = (product: Product, r: Region | null) => {
        if (!r) return product.price.CM;
        return product.price[r];
    };

    const handlePackClick = (pack: Product) => {
        setSelectedProduct(pack);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-4">
                    Nos Packs Saint-Valentin
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Des ensembles soigneusement conçus pour offrir une expérience complète et inoubliable à votre partenaire.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packs.map((pack) => (
                    <div
                        key={pack.id}
                        onClick={() => handlePackClick(pack)}
                        className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
                    >
                        <div className="h-56 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
                            {pack.image ? (
                                <Image
                                    src={pack.image}
                                    alt={pack.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🎁</span>
                                </div>
                            )}
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                {pack.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                                {pack.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-2xl font-bold text-foreground">
                                    {region ? pack.price[region] : pack.price.CM} <span className="text-sm font-normal text-muted-foreground">{currencySymbol}</span>
                                </span>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(pack, {});
                                    }}
                                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-transform active:scale-95"
                                >
                                    Ajouter <ShoppingCart className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ProductModal
                product={selectedProduct}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </div>
    );
}
