import Link from 'next/link';
import { RegionSwitcher } from './RegionSwitcher';

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-background py-12 text-sm text-zinc-500">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand */}
                <div>
                    <h3 className="text-lg font-bold text-foreground mb-4">Kado Express 237</h3>
                    <p className="mb-4">
                        Célébrez l'amour avec des cadeaux uniques et inoubliables.
                        Livraison digitale dans le monde entier.
                        Livraison physique à Yaoundé.
                    </p>
                    <p className="text-xs">© 2026 Kado Express 237. Tous droits réservés.</p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-semibold text-foreground mb-4">Liens Utiles</h4>
                    <ul className="space-y-2">
                        <li><Link href="/boutique" className="hover:text-primary transition-colors">Boutique</Link></li>
                        <li><Link href="/packs" className="hover:text-primary transition-colors">Nos Packs</Link></li>
                        <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        <li><Link href="/conditions" className="hover:text-primary transition-colors">Mentions Légales</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-semibold text-foreground mb-4">Contact</h4>
                    <ul className="space-y-2">
                        <li>WhatsApp: <a href="https://wa.me/12896301143" className="text-primary hover:underline">+1 (289) 630-1143</a></li>
                        <li>Téléphone: +237 692 738 430</li>
                        <li>Yaoundé, Cameroun</li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <RegionSwitcher />
                    </div>
                </div>
            </div>
        </footer>
    );
}
