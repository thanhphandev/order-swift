"use client"

import React, { useState, useCallback } from 'react';
import CartButton from '@/components/cart/cart-button';
import { X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartProduct } from './cart-product';
import { useCartStore } from '@/stores/cart-store';
import { formatMoney } from '@/lib/utils';
import { toast } from 'sonner';
import { DiningOption } from '@/components/cart/option-button';

const CartView = ({ tables }: { tables: string[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tableNumber, setTableNumber] = useState<string | null>(null);
    const [note, setNote] = useState<string>('');
    const [diningOption, setDiningOption] = useState<'dine-in' | 'takeaway'>('dine-in');

    const { cartProducts, updateQuantity, clearCart } = useCartStore();

    const subTotal = cartProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const totalQuantity = cartProducts.reduce((sum, product) => sum + product.quantity, 0);

    const handleClose = useCallback((e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setIsOpen(false);
    }, []);

    const handleOrder = () => {
        if (diningOption === 'dine-in' && !tableNumber) {
            toast.error('Vui lòng chọn số bàn');
            return;
        }
        toast.success('Đặt món thành công');
        setIsOpen(false);
        clearCart();
    };

    if (!isOpen) {
        return <CartButton itemCount={totalQuantity} onClick={() => setIsOpen(true)} />;
    }

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-gray-400 bg-opacity-50 z-50"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white p-4 border-b z-10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Giỏ hàng</h2>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleClose}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Dining Options */}
                        <div className="p-4 border-b">
                            <div className="flex gap-3">
                                <DiningOption
                                    label="Ăn tại quán"
                                    selected={diningOption === 'dine-in'}
                                    onClick={() => setDiningOption('dine-in')}
                                />
                                <DiningOption
                                    label="Mang về"
                                    selected={diningOption === 'takeaway'}
                                    onClick={() => setDiningOption('takeaway')}
                                />
                            </div>
                        </div>

                        <div className="p-4 space-y-2">
                            <AnimatePresence mode="popLayout">
                                {cartProducts.map((product) => (
                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <CartProduct product={product} onUpdateQuantity={updateQuantity} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {cartProducts.length === 0 && (
                                <div className="text-center py-8 text-gray-500">Giỏ hàng trống</div>
                            )}
                        </div>

                        {/* Table Selection */}
                        <AnimatePresence>
                            {diningOption === 'dine-in' && cartProducts.length > 0 && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    {tableNumber === null && (
                                        <div className="p-4 border-b">
                                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                                Số bàn
                                            </label>
                                            <select
                                                value={tableNumber ?? ""}
                                                onChange={(e) => setTableNumber(e.target.value)}
                                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                            >
                                                <option value="" disabled>
                                                    Chọn số bàn
                                                </option>
                                                {tables.map((table) => (
                                                    <option key={table} value={table}>
                                                        {table}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Notes */}
                        {cartProducts.length > 0 && (
                            <div className="p-4 border-b">
                                <label className="text-sm font-medium text-gray-700 block mb-2">Ghi chú</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Ghi chú thêm về đơn hàng..."
                                    className="w-full p-2 border rounded-xl h-20 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                />
                            </div>
                        )}

                        {/* Payment Section */}
                        {cartProducts.length > 0 && (
                            <div className="sticky bottom-0 bg-white p-4 border-t">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-bold">Tổng đơn hàng</span>
                                    <span className="font-bold">
                                        {formatMoney(subTotal)}
                                    </span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                                    disabled={!diningOption || (diningOption === 'dine-in' && !tableNumber)}
                                    onClick={handleOrder}
                                >
                                    Đặt món
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CartView;