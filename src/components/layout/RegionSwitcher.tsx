"use client";

import { useStore } from "@/store/useStore";
import { Region } from "@/data/catalog";
import { Globe } from "lucide-react";

export function RegionSwitcher() {
    const region = useStore((state) => state.region);
    const setRegion = useStore((state) => state.setRegion);

    if (!region) return null;

    const regions: { code: Region; label: string }[] = [
        { code: 'CM', label: 'Cameroun (FCFA)' },
        { code: 'GA', label: 'Gabon (FCFA)' },
        { code: 'EU', label: 'France/Europe (€)' },
    ];

    return (
        <div className="flex items-center gap-2 text-xs">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region)}
                className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs text-foreground hover:border-primary transition-colors cursor-pointer"
            >
                {regions.map((r) => (
                    <option key={r.code} value={r.code} className="bg-background">
                        {r.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
