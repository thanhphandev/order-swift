export type status = 'pending' | 'completed' | 'paid';
export type typeOrder = 'dine-in' | 'take-away' | 'delivery';

export interface OrderType {
    _id: string,
    table?: string,
    items: [{
        _id: string,
        name: string,
        quantity: number,
        size?: string,
        topping?: [{
            name: string,
            price: number,
        }],
        price: number,
    }],
    status: status,
    typeOrder: typeOrder,
    customerInfo?: {
        customerName?: string,
        phoneNumber?: string,
        deliveryAddress?: string,
    },
    totalAmount: number,
    notes: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface CreateOrderData {
    table: string | null;
    items: {
        _id: string;
        name: string;
        quantity: number;
        size?: string;
        topping?: {
            name: string;
            price: number;
        }[];
        price: number;
    }[];
    status: status;
    typeOrder: typeOrder;
    customerInfo?: {
        name: string;
        phone: string;
        address: string;
    } | null;
    totalAmount: number;
    notes?: string;
}