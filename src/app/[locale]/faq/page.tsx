import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                Foire Aux Questions
            </h1>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Comment passer commande ?</AccordionTrigger>
                        <AccordionContent>
                            Remplissez votre panier, cliquez sur "Commander", et notre site générera automatiquement un message WhatsApp avec tous les détails. Envoyez ce message à notre numéro officiel pour valider votre commande.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Quels sont les délais de livraison ?</AccordionTrigger>
                        <AccordionContent>
                            Pour garantir la qualité de nos services personnalisés, nous demandons de commander au moins <strong>2 jours à l'avance</strong>.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>Livrez-vous les produits physiques hors de Yaoundé ?</AccordionTrigger>
                        <AccordionContent>
                            Non, la livraison physique (T-shirts, montres, cadres) est disponible <strong>uniquement à Yaoundé</strong> pour le moment. Les produits digitaux sont disponibles partout dans le monde.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger>Comment payer ?</AccordionTrigger>
                        <AccordionContent>
                            Le paiement s'effectue directement via WhatsApp (Orange Money, MTN Mobile Money) après confirmation de votre commande par notre équipe.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                        <AccordionTrigger>Puis-je personnaliser le contenu ?</AccordionTrigger>
                        <AccordionContent>
                            Absolument ! La plupart de nos packs incluent des options de personnalisation (texte, photos, audio). Vous pourrez envoyer vos médias directement sur WhatsApp après la commande.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="mt-12 text-center">
                <p className="mb-4 text-muted-foreground">Vous n'avez pas trouvé votre réponse ?</p>
                <Link href="/contact">
                    <Button variant="outline">Contactez-nous</Button>
                </Link>
            </div>
        </div>
    );
}
