export interface MenuItemType {
    _id: string,
    name: string,
    description: string,
    category: string, // Link to category._id
    subcategory?: string, // Link to subcategory._id
    price: number,
    pricePerSize?: { size: string; price: number }[],
    topping?: { name: string; price: number }[];
    image: string,
    isAvailable: boolean,
    isBestSeller: boolean,
}