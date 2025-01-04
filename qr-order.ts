interface category {
    _id: string,
    name: string,
    subcategory: Subcategory[]
}

interface Subcategory {
    _id: string,
    name: string,
}

interface menuItem {
    _id: string,
    name: string,
    description: string,
    category: string, // Link to category._id
    subcategory?: string, // Link to subcategory._id
    price: number,
    pricePerSize?: { size: string; price: number }[],
    image: string,
    isAvailable: boolean,
    isBestSeller: boolean,
    preparationTime?: number;
    options?: { name: string; price: number }[];
}

type status = 'pending' | 'completed' | 'canceled';
type typeOrder = 'dine-in' | 'take-away' | 'delivery';
interface order {
    _id: string,
    table: string, // Table identifier
    items: [{
        menuItem: string, // Link to menuItem._id
        quantity: number,
        size?: string,
        options?: [{
            name: string,
            price: number,
        }],
        itemPrice: number,
    }],
    status: status,
    customerName: string,
    typeOrder: typeOrder,
    deliveryAddress?: string,
    phoneNumber?: string,
    totalAmount: number,
    notes: string,
    createdAt: Date,
    updatedAt: Date,
}

interface User {
    _id: string;
    email: string;
    password: string;
    phone?: string;
    role: 'admin' | 'staff' | 'owner';
    createdAt: Date;
    updatedAt: Date;
}

// optional
interface Table {
    _id: string;
    tableNumber: string; // Human-readable table number
    order_id?: string; // Reference to Order._id
    qrCodeUrl: string; // URL for QR code scanning
    isOccupied: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface Promotion {
    _id: string;
    title: string;
    description: string;
    discountPercentage?: number; // e.g., 10%
    discountAmount?: number; // Fixed discount
    validFrom: Date;
    validUntil: Date;
    applicableMenuItems?: string[]; // References to MenuItem._id
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

type PaymentMethod = 'cash' | 'online';

interface Payment {
    _id: string;
    orderId: string; // Reference to Order._id
    amountPaid: number;
    paymentMethod: PaymentMethod;
    paymentStatus: 'paid' | 'unpaid' | 'refunded';
    transactionId?: string; // Reference to payment gateway transaction
    createdAt: Date;
}


interface AuditLog {
    _id: string;
    action: 'CREATE' | 'UPDATE' | 'DELETE'; // Action performed
    target: string; // Entity affected, e.g., 'menuItem', 'order'
    targetId: string; // ID of the affected entity
    details: string; // JSON string or plain text with more information
    user: string; // Reference to User._id
    createdAt: Date;
    updatedAt: Date;
}

//https://chatgpt.com/share/6778bc6e-66e4-8011-b3ca-cb873f9f6c3b
interface Settings {
    _id: string;
    logoUrl: string; // URL for the restaurant's logo
    restaurantName: string; // Name of the restaurant
    description?: string; // A brief description of the restaurant
    contactInfo: {
        phone: string;
        email: string;
        address: string;
    };
    openingHours: { 
        day: string; // e.g., 'Monday', 'Tuesday'
        open: string; // Opening time in HH:mm format
        close: string; // Closing time in HH:mm format
    }[];
    languages: string[]; // List of supported languages, e.g., ['en', 'fr']
    socialMedia?: { 
        platform: string; // e.g., 'Facebook', 'Instagram'
        url: string; // Link to the restaurant's social media profile
    }[];
    currency: string; // Currency symbol (e.g., '$', '€')
    taxSettings?: {
        taxRate: number; // Percentage tax rate
        inclusive: boolean; // True if tax is included in prices
    };
    theme?: {
        primaryColor: string; // Hex color for the primary theme
        secondaryColor: string; // Hex color for the secondary theme
    };
    notifications?: {
        enableEmail: boolean; // Whether to send email notifications
        enableSMS: boolean; // Whether to send SMS notifications
    };
    paymentSettings?: {
        methods: string[]; // List of supported payment methods, e.g., ['cash', 'credit_card', 'online']
        onlinePaymentGateway?: string; // Name of the payment gateway (e.g., 'Stripe', 'PayPal')
    };
    createdAt: Date;
    updatedAt: Date;
}

