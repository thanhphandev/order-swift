"use client"

import React from 'react';
import type { typeOrder } from '@/types/order';
import { MapPinCheckInside, Clock, ClipboardList, Activity } from 'lucide-react';
import { relativeDate } from '@/lib/utils';

interface TableProps {
    table: string;
    orderType: typeOrder;
    orderId: string;
    createAt: Date;
    status: string;
}

const Table = ({ table, orderType, orderId, createAt, status }: TableProps) => {
    const handleClick = () => {
        alert(`Order ID: ${orderId}`);
    }

    return (
        <div className="p-5 bg-white rounded-xl shadow-md" onClick={handleClick}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                    <MapPinCheckInside className="h-4 w-4 text-orange-500" />
                    <p className="font-semibold text-lg">Bàn: {table}</p>
                </div>

            </div>
            <div className="flex items-center space-x-2 mb-4 text-gray-600">
                <ClipboardList className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Loại: {orderType === "dine-in" ? "Tại quán" : orderType === "take-away" ? "Mang về" : "Giao hàng"}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm">{relativeDate(new Date(createAt))}</span>
            </div>

        </div>
    );
};

export default Table;