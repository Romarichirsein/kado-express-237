"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitch() {
    const locale = useLocale();
    const router = useRouter();

    const switchLocale = (newLocale: string) => {
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
        window.location.reload();
    };

    return (
        <div className="flex items-center space-x-1 border border-white/10 rounded-full p-1 bg-black/20 backdrop-blur-sm">
            <button
                onClick={() => switchLocale("fr")}
                className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold transition-all duration-300",
                    locale === "fr"
                        ? "bg-[#FF2BD6] text-white shadow-[0_0_15px_rgba(255,43,214,0.6)]"
                        : "text-white/60 hover:text-white"
                )}
            >
                FR
            </button>
            <button
                onClick={() => switchLocale("en")}
                className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold transition-all duration-300",
                    locale === "en"
                        ? "bg-[#FF2BD6] text-white shadow-[0_0_15px_rgba(255,43,214,0.6)]"
                        : "text-white/60 hover:text-white"
                )}
            >
                EN
            </button>
        </div>
    );
}
