import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import "../globals.css"; // Adjusted path from ./globals.css to ../globals.css
import { Providers } from "../providers"; // Adjusted path
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cart } from "@/components/layout/Cart";
import { RegionModal } from "@/components/modals/RegionModal";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Kado Express 237 | Cadeaux Saint-Valentin Cameroun & Monde",
    description: "Offrez des émotions uniques pour la Saint-Valentin 2026. Packs cadeaux digitaux (poèmes, chansons, vidéos) et physiques (fleurs, montres, chocolat) avec livraison à Yaoundé et sur WhatsApp.",
    keywords: ["Saint-Valentin Cameroun", "Cadeau Yaoundé", "Kado Express 237", "Cadeau Digital", "Poème personnalisé", "Livraison Kado"],
};

export function generateStaticParams() {
    return ['en', 'fr'].map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!['en', 'fr'].includes(locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col selection:bg-pink-500 selection:text-white`}
            >
                <NextIntlClientProvider messages={messages}>
                    <Providers attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                        <Navbar />
                        <main className="flex-grow pt-16">
                            {children}
                        </main>
                        <Footer />
                        <Cart />
                        <RegionModal />
                        <FloatingWhatsApp />
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
