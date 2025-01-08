'use server'

import connectDB from "@/lib/mongodb";
import { MenuItem } from "@/models/MenuItem";
import { MenuItemType } from "@/types/menu-item";
import { revalidatePath } from "next/cache";
import { type ProductFormValues,} from "@/schemas/menu-item";

export const createMenuItem = async (data: ProductFormValues) => {
    try {
        const menuItem = new MenuItem(data);
        await connectDB();
        const savedMenuItem = await menuItem.save();
        revalidatePath('/admin/menu');
        console.log('savedMenuItem', savedMenuItem);
        return {
            _id: savedMenuItem._id.toString(),
            name: savedMenuItem.name,
        }
    } catch (error) {
        throw new Error(`Error creating menu item: ${error}`);
    }
};

export const getProducts = async (): Promise<MenuItemType[]> => {
    try {
        await connectDB();

        const data = await MenuItem.find();

        const products: MenuItemType[] = data.map((product) => ({
            _id: product._id.toString(),
            name: product.name,
            description: product.description,
            category: product.category.toString(),
            subcategory: product.subcategory?.toString(),
            price: product.price,
            pricePerSize: product.pricePerSize || [],
            topping: product.topping || [],
            image: product.image,
            isAvailable: product.isAvailable,
            isBestSeller: product.isBestSeller,
        }));

        return products;
    } catch (error) {
        throw new Error(`Error getting products: ${error}`);
    }
};


