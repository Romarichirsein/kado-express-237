"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageCarouselProps {
    images: string[];
    alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
            emblaApi.off('reInit', onSelect);
        };
    }, [emblaApi, onSelect]);

    // Single image - no carousel needed
    if (images.length === 1) {
        return (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <Image
                    src={images[0]}
                    alt={alt}
                    fill
                    className="object-cover"
                />
            </div>
        );
    }

    return (
        <div className="relative w-full">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-lg" ref={emblaRef}>
                <div className="flex">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative min-w-0 flex-[0_0_100%]"
                        >
                            <div className="relative aspect-video w-full bg-muted">
                                <Image
                                    src={image}
                                    alt={`${alt} - Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                onClick={scrollPrev}
                aria-label="Image précédente"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                onClick={scrollNext}
                aria-label="Image suivante"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots Indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all ${index === selectedIndex
                                ? 'bg-primary w-6'
                                : 'bg-primary/30 hover:bg-primary/50'
                            }`}
                        onClick={() => scrollTo(index)}
                        aria-label={`Aller à l'image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
