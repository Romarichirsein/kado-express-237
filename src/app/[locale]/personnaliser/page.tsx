"use client";

import { useState, useMemo } from "react";
import { useStore } from "@/store/useStore";
import { catalog, Product, Region } from "@/data/catalog";
import { cn } from "@/lib/utils";
import { ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const builderSections = [
    { id: "audio", title: "Audio & Poèmes", categories: ["Personnalisables"] },
    { id: "visual", title: "Visuels & Vidéos", categories: ["Visuels", "Vidéo"] },
    { id: "services", title: "Services & Web", categories: ["Services"] },
    { id: "physical", title: "Cadeaux Physiques", categories: ["Physique"] },
];

export default function BuilderPage() {
    const region = useStore((state) => state.region);
    const addToCart = useStore((state) => state.addToCart);

    // Local builder state
    const [selectedItems, setSelectedItems] = useState<{ product: Product, options: any }[]>([]);
    const [activeSection, setActiveSection] = useState("audio");

    const currencySymbol = region === 'EU' ? '€' : 'FCFA';

    const toggleItem = (product: Product) => {
        const exists = selectedItems.find((i) => i.product.id === product.id);
        if (exists) {
            setSelectedItems(selectedItems.filter((i) => i.product.id !== product.id));
        } else {
            setSelectedItems([...selectedItems, { product, options: {} }]);
        }
    };

    const currentProducts = useMemo(() => {
        const section = builderSections.find(s => s.id === activeSection);
        if (!section) return [];

        return catalog.filter(p => {
            if (p.isPhysical && region !== 'CM') return false;
            return section.categories.includes(p.category);
        });
    }, [activeSection, region]);

    const totalPrice = useMemo(() => {
        if (!region) return 0;
        return selectedItems.reduce((acc, item) => {
            return acc + item.product.price[region];
        }, 0);
    }, [selectedItems, region]);

    const handleAddAllToCart = () => {
        selectedItems.forEach(item => {
            addToCart(item.product, item.options);
        });
        setSelectedItems([]);
        // Toast success ideally
        alert("Pack ajouté au panier !");
    };

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
            {/* Left: Builder Interface */}
            <div className="flex-grow">
                <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                    Composez votre Pack Unique
                </h1>

                {/* Sections Tabs */}
                <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
                    {builderSections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "px-4 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all border",
                                activeSection === section.id
                                    ? "bg-primary/10 border-primary text-primary"
                                    : "bg-card border-border text-muted-foreground hover:bg-accent"
                            )}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentProducts.length === 0 && (
                        <div className="col-span-2 text-center py-10 text-muted-foreground">
                            Aucun produit disponible dans cette section pour votre région.
                        </div>
                    )}
                    {currentProducts.map(product => {
                        const isSelected = selectedItems.some(i => i.product.id === product.id);
                        const price = region ? product.price[region] : product.price.CM;

                        return (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "cursor-pointer group relative p-4 rounded-xl border transition-all duration-200",
                                    isSelected
                                        ? "bg-primary/5 border-primary shadow-[0_0_15px_rgba(255,43,214,0.1)]"
                                        : "bg-card border-border hover:border-primary/50"
                                )}
                                onClick={() => toggleItem(product)}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className={cn("font-bold mb-1", isSelected && "text-primary")}>
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                            {product.description}
                                        </p>
                                        <div className="font-mono text-sm font-bold">
                                            {price} {currencySymbol}
                                        </div>
                                    </div>
                                    <div className={cn(
                                        "h-6 w-6 rounded-full border flex items-center justify-center transition-colors",
                                        isSelected ? "bg-primary border-primary text-white" : "border-muted-foreground/30"
                                    )}>
                                        {isSelected && <Check className="h-4 w-4" />}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Right: Summary Sticky */}
            <div className="lg:w-80 flex-shrink-0">
                <div className="sticky top-24 bg-card border border-border rounded-xl p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-4">Votre Pack</h2>

                    {selectedItems.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic mb-6">
                            Sélectionnez des articles pour commencer.
                        </p>
                    ) : (
                        <ul className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                            {selectedItems.map((item, idx) => (
                                <li key={idx} className="flex justify-between text-sm group">
                                    <span className="truncate pr-2">{item.product.name}</span>
                                    <span className="font-mono text-muted-foreground group-hover:text-foreground">
                                        {region ? item.product.price[region] : 0}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="border-t border-border pt-4 mt-auto">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-muted-foreground">Total estimé</span>
                            <span className="text-2xl font-bold text-primary">
                                {totalPrice} <span className="text-sm font-normal text-muted-foreground">{currencySymbol}</span>
                            </span>
                        </div>

                        <button
                            onClick={handleAddAllToCart}
                            disabled={selectedItems.length === 0}
                            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95"
                        >
                            <Plus className="h-5 w-5" />
                            Ajouter au Panier ({selectedItems.length})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
