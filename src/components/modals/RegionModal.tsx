"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { REGIONS, RegionCode } from "@/lib/constants";
import { MapPin } from "lucide-react";

export function RegionModal() {
    const region = useStore((state) => state.region);
    const setRegion = useStore((state) => state.setRegion);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Don't show if region is already set
    if (region) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md p-6 bg-card border border-border rounded-xl shadow-2xl animate-in zoom-in-95 grid gap-4">

                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <MapPin className="h-8 w-8 text-primary animate-bounce" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Bienvenue !</h2>
                    <p className="text-muted-foreground">
                        Veuillez sélectionner votre région pour afficher les prix et produits adaptés.
                    </p>
                </div>

                <div className="grid gap-3 mt-4">
                    {REGIONS.map((r) => (
                        <button
                            key={r.code}
                            onClick={() => setRegion(r.code as RegionCode)}
                            className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary hover:bg-accent transition-all group"
                        >
                            <div className="flex flex-col items-start">
                                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {r.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Paiement en {r.currency}
                                </span>
                            </div>
                            {r.code === 'CM' && (
                                <span className="px-2 py-1 text-[10px] bg-primary/20 text-primary rounded-full">
                                    Populaire
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border text-center">
                    <p className="text-xs text-muted-foreground">
                        Ce choix sera sauvegardé pour votre prochaine visite.
                    </p>
                </div>
            </div>
        </div>
    );
}
