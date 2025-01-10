import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartProductType } from '@/types/cart-product';

interface CartStore {
    cartProducts: CartProductType[];
    addToCart: (product: CartProductType) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            cartProducts: [],

            addToCart: (product) => {
                set((state) => {
                    const existing = state.cartProducts.find(
                        (item) =>
                            item._id === product._id &&
                            (item.size === product.size || (!item.size && !product.size))
                    );

                    if (existing) {
                        return {
                            cartProducts: state.cartProducts.map((item) =>
                                item._id === product._id && item.size === product.size
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return {
                        cartProducts: [...state.cartProducts, { ...product, quantity: 1 }],
                    };
                });
            },

            updateQuantity: (id, quantity) => {
                set((state) => ({
                    cartProducts:
                        quantity === 0
                            ? state.cartProducts.filter((item) => item._id !== id)
                            : state.cartProducts.map((item) =>
                                  item._id === id ? { ...item, quantity } : item
                              ),
                }));
            },

            clearCart: () => set({ cartProducts: [] }),
        }),
        {
            name: 'cart-products',
        }
    )
);
