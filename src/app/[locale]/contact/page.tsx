import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { WA_NUMBER_FORMATTED, WA_LINK } from "@/lib/constants";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                Contactez-nous
            </h1>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <MessageCircle className="w-6 h-6 text-primary" />
                            WhatsApp (Principal)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-6">
                            Pour passer commande ou pour toute assistance rapide.
                        </p>
                        <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full" size="lg">
                                Discuter sur WhatsApp
                            </Button>
                        </a>
                        <p className="mt-4 text-center text-sm font-mono text-primary/80">
                            {WA_NUMBER_FORMATTED}
                        </p>
                    </CardContent>
                </Card>

                <Card className="hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            <Phone className="w-6 h-6 text-purple-400" />
                            Appels Directs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">
                            Disponibles pour vos urgences.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Cameroun 1:</span>
                                <a href="tel:+237692738430" className="hover:text-primary transition-colors">+237 692 738 430</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Cameroun 2:</span>
                                <a href="tel:+237692371538" className="hover:text-primary transition-colors">+237 692 371 538</a>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                <span>Support par email (réponse sous 24h)</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
