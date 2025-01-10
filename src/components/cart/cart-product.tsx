import React from 'react';
import { Minus, Plus } from 'lucide-react';
import type { CartProductType } from '@/types/cart-product';
import { formatMoney } from '@/lib/utils';

interface CartProductProps {
    product: CartProductType;
    onUpdateQuantity: (id: string, quantity: number) => void;
}

export function CartProduct({ product, onUpdateQuantity }: CartProductProps) {
    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                    <h3 className="font-medium">{product.name}</h3>
                    {product.size && <span className="text-sm text-gray-500">{product.size}</span>}
                    <p className="text-gray-600">
                        {formatMoney(product.price)} x {product.quantity}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onUpdateQuantity(product._id, product.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                >
                    <Minus className="w-4 h-4" />
                </button>
                <span className="w-6 text-center text-sm">{product.quantity}</span>
                <button
                    onClick={() => onUpdateQuantity(product._id, product.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}