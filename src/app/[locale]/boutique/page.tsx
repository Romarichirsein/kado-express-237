"use client";

import { useState, useMemo } from "react";
import { useStore } from "@/store/useStore";
import { catalog, Product, Region } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { ShoppingCart, Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = [
    "Tout",
    "Livres",
    "Personnalisables",
    "Visuels",
    "Vidéo",
    "Packs",
    "Physique",
];

import { ProductModal } from "@/components/modals/ProductModal";

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState("Tout");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const region = useStore((state) => state.region);
    const addToCart = useStore((state) => state.addToCart);

    // Filter products based on region and category
    const filteredProducts = useMemo(() => {
        return catalog.filter((product) => {
            // 1. Check Region availability
            if (product.isPhysical && region !== 'CM') return false;

            // 2. Check Category
            if (activeCategory !== "Tout" && product.category !== activeCategory) {
                return false;
            }
            return true;
        });
    }, [region, activeCategory]);

    const currencySymbol = region === 'EU' ? '€' : 'FCFA';

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                La Boutique de l'Amour
            </h1>
            <p className="text-center text-muted-foreground mb-8">
                Trouvez le cadeau parfait pour faire battre son cœur.
            </p>

            {/* Filters (Horizontal Scroll on Mobile) */}
            <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar justify-start md:justify-center">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                            activeCategory === cat
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                                : "bg-card hover:bg-accent text-muted-foreground hover:text-foreground border border-border"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            region={region}
                            currency={currencySymbol}
                            onClick={() => handleProductClick(product)}
                            onAdd={(e) => {
                                e.stopPropagation();
                                addToCart(product, {});
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    Aucun produit trouvé dans cette catégorie pour votre région.
                </div>
            )}

            <ProductModal
                product={selectedProduct}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            />
        </div>
    );
}

function ProductCard({ product, region, currency, onClick, onAdd }: { product: Product, region: Region | null, currency: string, onClick: () => void, onAdd: (e: React.MouseEvent) => void }) {
    // Determine if price should be displayed
    const price = region ? product.price[region] : product.price.CM;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            className="group relative glass rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-[0_0_30px_rgba(255,43,214,0.15)] transition-shadow cursor-pointer"
        >
            {/* Image Placeholder or Real Image */}
            <div className="h-48 bg-gray-900 relative overflow-hidden">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                        <span className="text-4xl">🎁</span>
                    </div>
                )}

                {/* Overlay Gradient for Text Readability if needed, or just hover effect */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors pointer-events-none" />

                {/* Badge Physical */}
                {product.isPhysical && (
                    <span className="absolute top-2 right-2 z-10 bg-purple-500/80 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md shadow-sm">
                        Physique
                    </span>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <span className="text-xs text-primary font-semibold uppercase tracking-wider">{product.category}</span>
                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                    </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <span className="text-xl font-bold font-mono">
                        {price} <span className="text-sm text-muted-foreground font-normal">{currency}</span>
                    </span>

                    <button
                        onClick={onAdd}
                        className="p-2 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all active:scale-95"
                        title="Ajouter au panier"
                    >
                        <Plus className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
