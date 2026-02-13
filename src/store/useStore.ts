import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductOption, Region } from '@/data/catalog';

export interface CartItem {
    product: Product;
    quantity: number;
    selectedOptions: Record<string, string | boolean>; // optionId -> value
}

interface AppState {
    region: Region | null;
    setRegion: (region: Region | null) => void;

    cart: CartItem[];
    addToCart: (product: Product, options: Record<string, string | boolean>) => void;
    removeFromCart: (index: number) => void;
    updateQuantity: (index: number, delta: number) => void;
    clearCart: () => void;

    isCartOpen: boolean;
    toggleCart: () => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            region: null, // Initial check will require user selection
            setRegion: (region) => set({ region }),

            cart: [],
            addToCart: (product, options) => set((state) => {
                // Simple logic: add new item. 
                // Advanced: check if same product+options exists and increment quantity.
                // For now, let's treat every addition as a new line item for custom products.
                // For standard products, we could merge.
                // Given the nature of "Unique/Personalized", separate lines might be safer.
                return { cart: [...state.cart, { product, quantity: 1, selectedOptions: options }] };
            }),
            removeFromCart: (index) => set((state) => ({
                cart: state.cart.filter((_, i) => i !== index)
            })),
            updateQuantity: (index, delta) => set((state) => {
                const newCart = [...state.cart];
                const item = newCart[index];
                if (!item) return {};

                const newQty = item.quantity + delta;
                if (newQty < 1) {
                    // Remove if quantity goes to 0? Or keep at 1?
                    // Usually remove or keep at 1. Let's remove if < 1.
                    return { cart: state.cart.filter((_, i) => i !== index) };
                }
                item.quantity = newQty;
                return { cart: newCart };
            }),
            clearCart: () => set({ cart: [] }),

            isCartOpen: false,
            toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
        }),
        {
            name: 'kado-express-storage',
        }
    )
);
