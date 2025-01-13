"use client"

import React from 'react';
import type { typeOrder } from '@/types/order';
import { MapPinCheckInside, Clock, Truck, Activity } from 'lucide-react';
import { relativeDate } from '@/lib/utils';

interface TableProps {
    table?: string;
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
            <div className='flex items-center justify-between'>
                <p className='font-bold text-center text-orange-500'>{orderType === "dine-in" 
                ? "Tại quán" 
                : orderType === "take-away" 
                  ? "Mang về" 
                  : "Giao hàng"}</p>
            </div>
            {table && (
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-bold'>Bàn</span>
                    <span className='text-sm bg-white px-3 py-1 rounded-full'>{table}</span>
                </div>
            )}
            <div className='flex items-center justify-between'>
                <span className='text-sm font-bold'>Trạng thái</span>
                <span className='text-sm bg-white px-3 py-1 rounded-full'>{status === 'pending' 
              ? 'Chờ xác nhận' 
              : status === 'completed' 
                ? 'Đã xác nhận' 
                : 'Đã thanh toán'}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-sm">{relativeDate(new Date(createAt))}</span>
            </div>

        </div>
    );
};

export default Table;