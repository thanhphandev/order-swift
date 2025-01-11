'use server'

import connectDB from "@/lib/mongodb";
import { MenuItem } from "@/models/MenuItem";
import { Category, Subcategory } from "@/models/Category";
import { MenuItemType } from "@/types/menu-item";
import { revalidatePath, revalidateTag } from "next/cache";
import { type ProductFormValues } from "@/schemas/menu-item";

export const createMenuItem = async (data: ProductFormValues) => {
    try {
        const menuItem = new MenuItem(data);
        await connectDB();
        const savedMenuItem = await menuItem.save();
        revalidatePath('/admin/menu');
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
            pricePerSize: product.pricePerSize?.map((pbs: { size: string, price: number }) => ({
                size: pbs.size,
                price: pbs.price,
            })) || [],  // Default to empty array if pricePerSize is not defined
            topping: product.topping?.map((tp: { size: string, price: number }) => ({
                size: tp.size,
                price: tp.price,
            })) || [],  // Default to empty array if topping is not defined
            image: product.image,
            isAvailable: product.isAvailable,
            isBestSeller: product.isBestSeller,
        }));

        return products;
    } catch (error) {
        throw new Error(`Error getting products: ${error}`);
    }
};

export const updateProduct = async (id: string, data: ProductFormValues) => {
    try {
        await connectDB();
        const updatedProduct = await MenuItem.findByIdAndUpdate(id, { ...data }, { new: true });
        revalidatePath('/admin/menu');
        return {
            _id: updatedProduct._id.toString(),
            name: updatedProduct.name,
        };
    } catch (error) {
        console.error(`Error updating product: ${error}`);
        throw new Error('Failed to update product. Please try again later.');
    }
}

export const updateProductStatus = async (id: string, isAvailable: boolean) => {
    try {
        await connectDB();

        const updatedProduct = await MenuItem.findByIdAndUpdate(
            id,
            { isAvailable },
            { new: true }
        );

        if (!updatedProduct) {
            throw new Error('Product not found.');
        }
        revalidatePath('/admin/menu')
        return {
            _id: updatedProduct._id.toString(),
            name: updatedProduct.name,
            isAvailable: updatedProduct.isAvailable,
        };
    } catch (error) {
        console.error(`Error updating product status: ${error}`);
        throw new Error('Failed to update product status. Please try again later.');
    }
};

export const updateProductBestSeller = async (id: string, isBestSeller: boolean) => {
    try {
        const updatedProduct = await MenuItem.findByIdAndUpdate(id, { isBestSeller }, { new: true });
        revalidatePath('/admin/menu');
        revalidateTag('menu')
        return {
            _id: updatedProduct._id.toString(),
            name: updatedProduct.name,
            isBestSeller: updatedProduct.isBestSeller,
        };
    } catch (error) {
        console.error(`Error updating product best seller status: ${error}`);
        throw new Error('Failed to update product best seller status. Please try again later.');
    }
}

export const deleteProduct = async (id: string) => {
    try {
        await connectDB();

        const deletedProduct = await MenuItem.findByIdAndDelete(id);

        if (!deletedProduct) {
            throw new Error('Product not found.');
        }
        revalidatePath('/admin/menu')
        revalidateTag('menu')
        return {
            _id: deletedProduct._id.toString(),
            name: deletedProduct.name,
        };
    } catch (error) {
        console.error(`Error deleting product: ${error}`);
        throw new Error('Failed to delete product. Please try again later.');
    }
}

export const filterProducts = async (
    categoryPath?: string,
    subcategoryPath?: string,
    isBestSeller?: boolean
  ): Promise<MenuItemType[]> => {
    try {
      await connectDB();
  
      const filterConditions: Record<string, any> = {};
  
      if (categoryPath) {
        const category = await Category.findOne({ path: categoryPath });
        if (!category) {
          return [];
        }
        filterConditions.category = category._id;
      }
  
      if (subcategoryPath) {
        const subcategory = await Subcategory.findOne({ path: subcategoryPath });
        if (!subcategory) {
          return [];
        }
        filterConditions.subcategory = subcategory._id;
      }
  
      if (typeof isBestSeller === 'boolean') {
        filterConditions.isBestSeller = isBestSeller;
      }
  
      const data = await MenuItem.find(filterConditions);
  
      return data.map((product) => ({
        _id: product._id.toString(),
        name: product.name,
        description: product.description,
        category: product.category.toString(),
        subcategory: product.subcategory?.toString(),
        price: product.price,
        pricePerSize:
          product.pricePerSize?.map(({ size, price }: { size: string; price: number }) => ({ size, price })) || [],
        topping:
          product.topping?.map(({ size, price }: { size: string; price: number }) => ({ size, price })) || [],
        image: product.image,
        isAvailable: product.isAvailable,
        isBestSeller: product.isBestSeller,
      }));
    } catch (error) {
      console.error(`Error filtering products: ${error}`);
      return [];
    }
  };
  