export type Region = 'CM' | 'GA' | 'EU';

export interface ProductPrice {
    CM: number; // FCFA
    GA: number; // FCFA
    EU: number; // EUR
}

export interface ProductOption {
    id: string;
    label: string;
    priceModifier?: ProductPrice; // Add to base price
    type: 'toggle' | 'select' | 'radio';
    values?: { label: string; value: string }[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: ProductPrice;
    category: string;
    isPhysical: boolean; // only available in CM
    image?: string;
    images?: string[]; // Multiple images for carousel
    options?: ProductOption[];

    // I18N placeholders (for future use)
    name_en?: string;
    description_en?: string;
}

export const catalog: Product[] = [
    // --- Livres ---
    {
        id: 'pack-livres-amour',
        name: 'Pack Livres Amour & Sexe',
        description: 'Collection complète de guides et livres sur l\'amour et l\'intimité.',
        category: 'Livres',
        isPhysical: false,
        price: { CM: 5000, GA: 5000, EU: 20 },
        image: '/images/products/livre-amour-sexe.jpg',
    },
    {
        id: 'pack-livres-dev-perso',
        name: 'Pack Livres Entrepreneuriat & Dev Perso',
        description: 'Les meilleurs livres pour booster votre mindset et votre business.',
        category: 'Livres',
        isPhysical: false,
        price: { CM: 5000, GA: 5000, EU: 20 },
        image: '/images/products/pack-livres-dev-perso.jpg',
    },
    {
        id: 'mini-livre-2',
        name: 'Mini-livre PDF Souvenir Gratitude (2 pages)',
        description: 'Un petit livre numérique pour dire merci.',
        category: 'Livres',
        isPhysical: false,
        price: { CM: 500, GA: 1000, EU: 5 },
        image: '/images/products/mini-livre-2.png',
    },
    {
        id: 'mini-livre-5',
        name: 'Mini-livre PDF Souvenir Gratitude (5 pages)',
        description: 'Plus de pages pour plus de souvenirs.',
        category: 'Livres',
        isPhysical: false,
        price: { CM: 1000, GA: 2000, EU: 10 },
        image: '/images/products/mini-livre-5.png',
    },

    // --- Personnalisables ---
    {
        id: 'musique-perso',
        name: 'Musique personnalisée',
        description: 'Une chanson unique composée pour votre partenaire.',
        category: 'Personnalisables',
        isPhysical: false,
        price: { CM: 1000, GA: 2000, EU: 10 },
        image: '/images/products/musique-perso.png',
        options: [
            { id: 'voice', label: 'Voix', type: 'radio', values: [{ label: 'Homme', value: 'male' }, { label: 'Femme', value: 'female' }] }
        ]
    },
    {
        id: 'poeme-amour',
        name: 'Poème d\'amour personnalisé',
        description: 'Un poème touchant écrit et récité (Audio + PDF).',
        category: 'Personnalisables',
        isPhysical: false,
        price: { CM: 1000, GA: 2000, EU: 10 },
        image: '/images/products/poeme-amour.png',
    },
    {
        id: 'lettre-amour',
        name: 'Lettre d\'amour + Déclaration',
        description: 'Texte émouvant et audio pour exprimer vos sentiments.',
        category: 'Personnalisables',
        isPhysical: false,
        price: { CM: 1000, GA: 2000, EU: 10 },
        image: '/images/products/lettre-amour.png',
    },
    {
        id: 'lettre-excuses',
        name: 'Lettre d\'excuses',
        description: 'Pour demander pardon avec les mots justes (Audio + Texte).',
        category: 'Personnalisables',
        isPhysical: false,
        price: { CM: 1000, GA: 2000, EU: 10 },
        image: '/images/products/lettre-excuses.png',
    },
    {
        id: 'message-video',
        name: 'Message vidéo romantique',
        description: 'Montage vidéo de vos meilleurs moments (envoyez vos médias).',
        category: 'Personnalisables',
        isPhysical: false,
        price: { CM: 1000, GA: 2000, EU: 10 },
        image: '/images/products/message-video.png',
    },
    {
        id: 'message-chretien',
        name: 'Message chrétien + Promesse',
        description: 'Une déclaration spirituelle et touchante.',
        category: 'Personnalisables',
        isPhysical: false,
        price: { CM: 1000, GA: 2000, EU: 10 },
        image: '/images/products/message-chretien.png',
    },
    {
        id: 'priere-amour',
        name: 'Prière d\'amour personnalisée',
        description: 'Une prière unique pour votre couple (PDF + Audio).',
        category: 'Personnalisables',
        isPhysical: false,
        price: { CM: 1000, GA: 2000, EU: 10 },
        image: '/images/products/priere-amour.png',
    },

    // --- Visuels ---
    {
        id: 'carte-voeux',
        name: 'Carte de vœux digitale',
        description: 'Une carte magnifique à envoyer sur WhatsApp.',
        category: 'Visuels',
        isPhysical: false,
        price: { CM: 2000, GA: 3000, EU: 10 },
        image: '/images/products/carte-voeux.png',
        options: [
            {
                id: 'animated',
                label: 'Version Animée',
                type: 'toggle',
                priceModifier: { CM: 3000, GA: 3000, EU: 10 }
            }
        ]
    },
    {
        id: 'carte-animee',
        name: 'Carte animée (Mini Motion)',
        description: 'Une carte de vœux qui prend vie.',
        category: 'Visuels',
        isPhysical: false,
        price: { CM: 5000, GA: 6000, EU: 20 }, // Base + Option implied
        image: '/images/products/carte-animee.png',
    },
    {
        id: 'photo-couple-3',
        name: 'Photo couple stylisée (Pack 3)',
        description: 'Retouche artistique de 3 photos de couple.',
        category: 'Visuels',
        isPhysical: false,
        price: { CM: 500, GA: 1000, EU: 5 },
        image: '/images/products/shooting-3.png',
    },
    {
        id: 'photo-couple-15',
        name: 'Photo couple stylisée (Pack 15)',
        description: 'Retouche artistique de 15 photos pour un album complet.',
        category: 'Visuels',
        isPhysical: false,
        price: { CM: 2000, GA: 3000, EU: 10 },
        image: '/images/products/shooting-15.png',
    },
    {
        id: 'traitement-photo-3',
        name: 'Traitement Photos (Pack 3)',
        description: 'Sublimation de 3 photos.',
        category: 'Visuels',
        isPhysical: false,
        price: { CM: 500, GA: 1000, EU: 5 },
        image: '/images/products/traitement-photo-3.png',
    },
    {
        id: 'traitement-photo-15',
        name: 'Traitement Photos (Pack 15)',
        description: 'Sublimation de 15 photos.',
        category: 'Visuels',
        isPhysical: false,
        price: { CM: 2000, GA: 3000, EU: 10 },
        image: '/images/products/traitement-photo-15.png',
    },
    {
        id: 'fonds-ecran-3',
        name: 'Fonds d\'écran d\'amour (Pack 3)',
        description: 'Pour avoir votre moitié toujours sur votre écran.',
        category: 'Visuels',
        isPhysical: false,
        price: { CM: 500, GA: 1000, EU: 5 },
        image: '/images/products/fonds-ecran-3.png',
    },
    {
        id: 'fonds-ecran-15',
        name: 'Fonds d\'écran d\'amour (Pack 15)',
        description: 'Une collection complète de wallpapers romantiques.',
        category: 'Visuels',
        isPhysical: false,
        price: { CM: 2000, GA: 3000, EU: 10 },
        image: '/images/products/fonds-ecran-15.png',
    },
    {
        id: 'certificat',
        name: 'Certificat (Meilleur Partenaire)',
        description: 'Diplôme officiel de l\'amour.',
        category: 'Visuels',
        isPhysical: false,
        price: { CM: 1000, GA: 1000, EU: 5 },
        image: '/images/products/certificat.png',
    },
    {
        id: 'portrait-typo',
        name: 'Portrait Typographique (Cœur)',
        description: 'Vos noms formant un cœur.',
        category: 'Visuels',
        isPhysical: false,
        price: { CM: 500, GA: 1000, EU: 5 },
        image: '/images/products/portrait-typo.png',
    },
    {
        id: 'calendrier-amour',
        name: 'Calendrier Amour (12 mois)',
        description: 'Avril, Mai, Juin... votre amour toute l\'année.',
        category: 'Visuels',
        isPhysical: false,
        price: { CM: 2500, GA: 4000, EU: 20 },
        image: '/images/products/calendrier-amour.png',
    },

    // --- Vidéo ---
    {
        id: 'montage-video-sv',
        name: 'Montage Vidéo Saint-Valentin',
        description: 'Film émotionnel de 30 à 60s.',
        category: 'Vidéo',
        isPhysical: false,
        price: { CM: 5000, GA: 7000, EU: 25 },
        image: '/images/products/video-st-valentin.png',
        options: [
            {
                id: 'long-version',
                label: 'Version Longue (90-120s)',
                type: 'toggle',
                priceModifier: { CM: 3000, GA: 3000, EU: 10 }
            }
        ]
    },
    {
        id: 'video-souvenir',
        name: 'Montage Vidéo Souvenir',
        description: 'Un film pour revivre vos plus beaux souvenirs.',
        category: 'Vidéo',
        isPhysical: false,
        price: { CM: 5000, GA: 7000, EU: 25 },
        image: '/images/products/video-souvenir.png',
    },
    {
        id: 'mini-montage-5',
        name: 'Mini Montage Photo (5 photos)',
        description: 'Animation simple de 5 photos.',
        category: 'Vidéo',
        isPhysical: false,
        price: { CM: 1000, GA: 2000, EU: 5 },
        image: '/images/products/montage-5.png',
    },
    {
        id: 'mini-montage-15',
        name: 'Mini Montage Photo (15 photos)',
        description: 'Animation riche de 15 photos.',
        category: 'Vidéo',
        isPhysical: false,
        price: { CM: 3000, GA: 4000, EU: 15 },
        image: '/images/products/montage-15.png',
    },

    // --- Services ---
    {
        id: 'affiche-flyer',
        name: 'Affiche / Flyer Promo Business',
        description: 'Design professionnel pour votre événement ou promo.',
        category: 'Services',
        isPhysical: false,
        price: { CM: 3000, GA: 5000, EU: 10 },
        image: '/images/products/affiche-flyer.png',
    },
    {
        id: 'pack-visuels-3',
        name: 'Pack 3 Visuels (Flyers)',
        description: 'Trois designs assortis pour vos réseaux sociaux.',
        category: 'Services',
        isPhysical: false,
        price: { CM: 7000, GA: 7000, EU: 25 },
        image: '/images/products/pack-visuels-3.png',
    },
    {
        id: 'mini-logo',
        name: 'Mini-logo + Identité Simple',
        description: 'Logo express et palette de couleurs.',
        category: 'Services',
        isPhysical: false,
        price: { CM: 8000, GA: 12000, EU: 25 },
        image: '/images/products/mini-logo.png',
    },
    {
        id: 'google-business',
        name: 'Google Business Profile',
        description: 'Optimisation de votre fiche Google Maps.',
        category: 'Services',
        isPhysical: false,
        price: { CM: 10000, GA: 15000, EU: 30 },
        image: '/images/products/google-business.png',
    },
    {
        id: 'site-vitrine',
        name: 'Site Vitrine',
        description: 'Présence web professionnelle.',
        category: 'Services',
        isPhysical: false,
        price: { CM: 60000, GA: 75000, EU: 150 },
        image: '/images/products/site-vitrine.png',
    },
    {
        id: 'site-portfolio',
        name: 'Site Portfolio',
        description: 'Mettez en valeur vos travaux.',
        category: 'Services',
        isPhysical: false,
        price: { CM: 45000, GA: 60000, EU: 120 },
        image: '/images/products/site-portfolio.png',
    },
    {
        id: 'landing-page',
        name: 'Landing Page Offre',
        description: 'Page de vente haute conversion.',
        category: 'Services',
        isPhysical: false,
        price: { CM: 25000, GA: 35000, EU: 70 },
        image: '/images/products/landing-page.png',
    },
    {
        id: 'ecommerce-starter',
        name: 'E-commerce Starter',
        description: 'Boutique en ligne (1-50 produits).',
        category: 'Services',
        isPhysical: false,
        price: { CM: 100000, GA: 120000, EU: 300 },
        image: '/images/products/ecommerce-starter.png',
    },
    {
        id: 'ecommerce-pro',
        name: 'E-commerce Pro',
        description: 'Boutique performante (20-100 produits).',
        category: 'Services',
        isPhysical: false,
        price: { CM: 120000, GA: 180000, EU: 500 },
        image: '/images/products/ecommerce-pro.png',
    },
    {
        id: 'ecommerce-premium',
        name: 'E-commerce Premium',
        description: 'Solution e-commerce sur mesure.',
        category: 'Services',
        isPhysical: false,
        price: { CM: 350000, GA: 450000, EU: 900 },
        image: '/images/products/ecommerce-premium.png',
    },
    // Admin Services (CM Only)
    {
        id: 'cni',
        name: 'Carte Nationale d\'Identité (CNI)',
        description: 'Assistance pour l\'obtention de votre CNI (Cameroun uniquement).',
        category: 'Services',
        isPhysical: false, // Digital service, but geo-restricted
        price: { CM: 20000, GA: 0, EU: 0 },
        image: '/images/products/cni.png',
    },
    {
        id: 'passeport',
        name: 'Passeport Biométrique',
        description: 'Assistance pour l\'obtention de votre Passeport (Cameroun uniquement).',
        category: 'Services',
        isPhysical: false,
        price: { CM: 130000, GA: 0, EU: 0 },
        image: '/images/products/passeport.png',
    },

    // --- Packs Prêts à vendre ---
    {
        id: 'pack-declaration',
        name: 'Pack Déclaration Express',
        description: 'Lettre + Audio + Carte de vœux simple.',
        category: 'Packs',
        isPhysical: false,
        price: { CM: 2000, GA: 3500, EU: 15 },
        image: '/images/products/combined.jpg', // Fallback
    },
    {
        id: 'pack-romance',
        name: 'Pack Romance Visuelle',
        description: 'Carte animée + 3 Photos retouchées + Poème.',
        category: 'Packs',
        isPhysical: false,
        price: { CM: 3000, GA: 4500, EU: 20 },
        image: '/images/products/carte-animee.png',
    },
    {
        id: 'pack-video-love',
        name: 'Pack Montage Vidéo Love',
        description: 'Le montage vidéo complet + Carte de vœux.',
        category: 'Packs',
        isPhysical: false,
        price: { CM: 5000, GA: 7000, EU: 25 },
        image: '/images/products/video-st-valentin.png',
    },
    {
        id: 'pack-souvenir-premium',
        name: 'Pack Souvenir Premium',
        description: 'Livre 2 pages + Montage Vidéo + Carte.',
        category: 'Packs',
        isPhysical: false,
        price: { CM: 8500, GA: 11000, EU: 40 },
        image: '/images/products/video-souvenir.png',
    },
    {
        id: 'pack-business-sv',
        name: 'Pack Business Saint-Valentin',
        description: 'Flyer + Landing Page simple + Post réseaux.',
        category: 'Services', // Or Packs, keeping in Packs for now as per catalog section? It's under "Packs prêts à vendre" in catalog md
        isPhysical: false,
        price: { CM: 5000, GA: 7000, EU: 20 },
        image: '/images/products/affiche-flyer.png',
    },

    // --- Produits Physiques (CM Only) ---
    {
        id: 'tshirt-perso',
        name: 'T-shirt Personnalisé',
        description: 'Transformez vos souvenirs en mode ! T-shirt premium 100% coton avec impression haute définition de votre photo, message d\'amour ou design personnalisé. Qualité supérieure, couleurs vives et durables. Matière douce et confortable pour un port quotidien. Impression résistante au lavage. Tailles disponibles : S, M, L, XL, XXL. Le cadeau parfait pour immortaliser vos moments précieux ou déclarer votre flamme avec style.',
        category: 'Physique',
        isPhysical: true,
        price: { CM: 5000, GA: 0, EU: 0 },
        image: '/images/products/combined.jpg',
    },
    {
        id: 'pack-couple-tshirt',
        name: 'Pack Couple (2 T-shirts)',
        description: 'Célébrez votre amour avec style ! Pack de 2 t-shirts assortis pour couple, en coton premium avec designs complémentaires (ex: "King" & "Queen", "Mon Cœur" & "Mon Âme"). Impression personnalisable avec vos prénoms, date spéciale ou message unique. Qualité supérieure, coupes modernes ajustées. Matière respirante et agréable. Couleurs coordonnées ou contrastées selon votre style. Le cadeau parfait pour la Saint-Valentin, anniversaire ou simplement pour afficher votre complicité au quotidien !',
        category: 'Physique',
        isPhysical: true,
        price: { CM: 9000, GA: 0, EU: 0 },
        image: '/images/products/combined.jpg',
    },
    {
        id: 'boite-bijoux-femme',
        name: 'Boîte Bijoux Femme Personnalisée',
        description: 'Coffret à bijoux élégant et raffiné, spécialement conçu pour elle. Design luxueux avec finitions soignées, disponible en forme de cœur romantique ou classique rectangulaire. Intérieur en velours doux pour protéger ses précieux bijoux. Personnalisation par gravure laser de son prénom, initiales ou message d\'amour indélébile. Compartiments multiples pour bagues, colliers, bracelets et boucles d\'oreilles. Fermeture sécurisée avec miroir intégré. Matériaux de qualité premium pour un cadeau qui dure. Parfait pour la Saint-Valentin, anniversaire, fiançailles ou simplement pour dire "Je t\'aime". Un écrin digne de ses plus beaux trésors !',
        category: 'Physique',
        isPhysical: true,
        price: { CM: 14000, GA: 0, EU: 0 },
        image: '/images/products/physiques/Boîte bijoux femme personnalisée.jpeg',
        images: [
            '/images/products/physiques/Boîte bijoux femme personnalisée.jpeg',
            '/images/products/physiques/Boîte bijoux femme personnalisée (2).jpeg',
            '/images/products/physiques/Boîte bijoux femme personnalisée (3).jpeg',
            '/images/products/physiques/Boîte bijoux femme personnalisée (4).jpeg',
            '/images/products/physiques/Boîte bijoux femme en forme de cœur.jpeg',
            '/images/products/physiques/Boîte bijoux femme en forme de cœur (2).jpeg',
            '/images/products/physiques/Boîte bijoux femme en forme de cœur (3).jpeg',
        ],
    },
    {
        id: 'boite-bijoux-homme',
        name: 'Boîte Bijoux Homme Personnalisée',
        description: 'Coffret à bijoux masculin au design sophistiqué et moderne. Boîte élégante avec finitions haut de gamme, spécialement adaptée aux accessoires masculins. Intérieur organisé avec compartiments pour montres, boutons de manchette, bagues, chaînes et bracelets. Revêtement extérieur résistant avec fermeture sécurisée. Personnalisation par gravure laser de son nom, initiales ou message personnel. Matériaux nobles et durables pour un rendu premium. Design masculin discret et classe qui trouvera sa place sur sa commode ou dans son dressing. Le cadeau idéal pour un homme qui prend soin de ses accessoires. Parfait pour anniversaire, fête des pères ou occasion spéciale.',
        category: 'Physique',
        isPhysical: true,
        price: { CM: 14500, GA: 0, EU: 0 },
        image: '/images/products/physiques/Boîte bijoux homme personnalisée.jpeg',
        images: [
            '/images/products/physiques/Boîte bijoux homme personnalisée.jpeg',
            '/images/products/physiques/Boîte bijoux homme personnalisée (2).jpeg',
            '/images/products/physiques/Boîte bijoux homme personnalisée (3).jpeg',
        ],
    },
    {
        id: 'montre-homme',
        name: 'Montre + Bracelet Homme',
        description: 'Ensemble élégant montre et bracelet coordonnés pour homme moderne. Montre au design contemporain avec cadran lisible, mouvement précis et bracelet confortable en acier inoxydable ou cuir véritable. Bracelet assorti en acier tressé ou cuir avec finitions métalliques. Ensemble harmonieux parfait pour compléter son style quotidien. Résistant à l\'eau, anti-rayures. Personnalisation possible avec gravure au dos du boîtier. Emballage cadeau élégant inclus. Accessoires indispensables pour l\'homme qui soigne son apparence. Idéal pour toutes occasions : travail, soirée, événements. Le cadeau parfait qui allie élégance et fonctionnalité !',
        category: 'Physique',
        isPhysical: true,
        price: { CM: 10000, GA: 0, EU: 0 },
        image: '/images/products/physiques/Montre + bracelet homme personnalisés.jpeg',
        images: [
            '/images/products/physiques/Montre + bracelet homme personnalisés.jpeg',
            '/images/products/physiques/Montre + bracelet homme personnalisés (2).jpeg',
        ],
    },
    {
        id: 'montre-rolex',
        name: 'Montre "Rolex" + Bracelet Homme',
        description: 'Ensemble prestige inspiré du style iconique Rolex. Montre de luxe au design intemporel avec cadran sophistiqué, lunette tournante, bracelet en acier inoxydable robuste. Mouvement quartz de précision, étanchéité renforcée. Finitions impeccables qui rivalisent avec les grandes marques. Bracelet assorti en acier massif avec maillons élégants. L\'ensemble parfait pour l\'homme qui affiche son succès avec classe. Boîtier résistant aux chocs et aux rayures. Emballage luxueux type coffret horloger. Le cadeau qui fera sensation, symbole de réussite et d\'élégance. Parfait pour célébrer une promotion, un anniversaire marquant ou simplement gâter un homme exceptionnel.',
        category: 'Physique',
        isPhysical: true,
        price: { CM: 12500, GA: 0, EU: 0 },
        image: '/images/products/physiques/Montre Rolex + bracelet homme.jpeg',
        images: [
            '/images/products/physiques/Montre Rolex + bracelet homme.jpeg',
            '/images/products/physiques/Montre Rolex + bracelet homme (2).jpeg',
        ],
    },
    {
        id: 'boite-2-montres',
        name: 'Boîte de 2 Montres Personnalisées',
        description: 'Coffret couple ultra romantique avec 2 montres assorties, une pour lui et une pour elle. Montres coordonnées au design harmonieux : même style, couleurs complémentaires parfaites. Boîtiers élégants avec cadrans lisibles et bracelets confortables (cuir ou acier selon modèle). Mouvements précis et fiables. Coffret présentation luxueux avec compartiments individuels rembourrés. Personnalisation possible avec gravure de vos prénoms ou message au dos des boîtiers. Le symbole parfait de votre union et complicité. Chaque fois que vous regardez l\'heure, vous pensez à l\'autre. Cadeau ultime pour fiançailles, mariage, Saint-Valentin ou anniversaire de couple. L\'amour à portée de poignet !',
        category: 'Physique',
        isPhysical: true,
        price: { CM: 13500, GA: 0, EU: 0 },
        image: '/images/products/physiques/Boîte de 2 montres personnalisées.jpeg',
        images: [
            '/images/products/physiques/Boîte de 2 montres personnalisées.jpeg',
        ],
    },
    {
        id: 'ensemble-montre-complet',
        name: 'Ensemble Montre + Bracelet + Chaîne',
        description: 'Pack complet 3 pièces pour un look sophistiqué imparable ! Ensemble parfaitement coordonné comprenant : une montre élégante au design moderne, un bracelet assorti en acier ou cuir, et une chaîne raffinée. Tous les éléments se complètent harmonieusement pour un style cohérent et tendance. Finitions de qualité supérieure, matériaux durables et résistants. Disponible en version homme ou femme avec designs adaptés. La montre offre précision et confort, le bracelet ajoute caractère, la chaîne parfait le tout. Coffret cadeau luxueux inclus. Personnalisation possible sur la montre. L\'ensemble idéal pour celui ou celle qui ne fait jamais les choses à moitié. Cadeau complet qui fera sensation à coup sûr !',
        category: 'Physique',
        isPhysical: true,
        price: { CM: 13500, GA: 0, EU: 0 },
        image: '/images/products/physiques/Ensemble montre + bracelet + chaîne (HF).jpeg',
        images: [
            '/images/products/physiques/Ensemble montre + bracelet + chaîne (HF).jpeg',
            '/images/products/physiques/Ensemble montre + bracelet + chaîne (HF) (2).jpeg',
            '/images/products/physiques/Ensemble montre + bracelet + chaîne (HF) (3).jpeg',
            '/images/products/physiques/Ensemble montre + bracelet + chaîne (HF) (4).jpeg',
            '/images/products/physiques/Ensemble montre + bracelet + chaîne (HF) (5).jpeg',
        ],
    },
];
