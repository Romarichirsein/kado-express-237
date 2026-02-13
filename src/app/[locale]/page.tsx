"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { ArrowRight, Star, Heart, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const region = useStore((state) => state.region);
  const currencySymbol = region === 'EU' ? '€' : 'FCFA';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-500 mb-6 leading-tight drop-shadow-[0_0_15px_rgba(255,43,214,0.5)]">
            Offrez de l'Amour Pur
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Des cadeaux digitaux et physiques inoubliables pour la Saint-Valentin 2026.
            Livraison instantanée sur WhatsApp ou physique à Yaoundé.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/boutique"
              className="group bg-primary hover:bg-primary/90 text-white text-lg font-bold py-4 px-8 rounded-full shadow-[0_0_20px_rgba(255,43,214,0.4)] hover:shadow-[0_0_40px_rgba(255,43,214,0.6)] transition-all flex items-center gap-2"
            >
              Voir la Boutique <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/personnaliser"
              className="bg-card glass hover:bg-accent border border-primary/30 hover:border-primary text-foreground text-lg font-medium py-4 px-8 rounded-full transition-all"
            >
              Créer un Pack Unique
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
            <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Livraison Instantanée</h3>
            <p className="text-muted-foreground">Recevez vos cadeaux digitaux directement sur WhatsApp en quelques minutes après validation.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
            <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Personnalisé</h3>
            <p className="text-muted-foreground">Chansons, poèmes, vidéos... Créez une émotion sur-mesure pour votre moitié.</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
            <div className="mx-auto w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Commande Simple</h3>
            <p className="text-muted-foreground">Tout se passe sur WhatsApp. Pas de paiement complexe en ligne, on discute d'abord.</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 relative text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Prêt à marquer les esprits ?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
          La Saint-Valentin arrive vite. Ne manquez pas l'occasion d'offrir quelque chose d'unique.
        </p>
        <Link
          href="/packs"
          className="inline-flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90 font-bold py-4 px-10 rounded-full text-lg transition-transform hover:scale-105"
        >
          Découvrir les Packs <Star className="h-5 w-5 fill-current" />
        </Link>
      </section>
    </div>
  );
}
