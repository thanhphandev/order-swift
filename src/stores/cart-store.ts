import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartProductType } from '@/types/cart-product';

interface CartStore {
    cartProducts: CartProductType[];
    addToCart: (product: CartProductType) => void;
    updateQuantity: (name: string, size: string, quantity: number) => void;
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
                            item.name === product.name &&
                            (item.size === product.size || (!item.size && !product.size))
                    );

                    if (existing) {
                        return {
                            cartProducts: state.cartProducts.map((item) =>
                                item.name === product.name && item.size === product.size
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

            updateQuantity: (name, size, quantity) => {
                set((state) => ({
                    cartProducts:
                        quantity === 0
                            ? state.cartProducts.filter(
                                (item) => item.name !== name || item.size !== size
                            ) // Xóa sản phẩm khi quantity = 0 và không match cả `name` và `size`
                            : state.cartProducts.map((item) =>
                                  item.name === name && item.size === size
                                      ? { ...item, quantity } // Cập nhật quantity khi match cả `name` và `size`
                                      : item
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
