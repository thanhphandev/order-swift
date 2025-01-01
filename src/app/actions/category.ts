'use server';

import { Category, Subcategory } from '@/app/models/Category';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import { z } from 'zod';

// Zod schema for validating category data
const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(255, 'Category name is too long'),
});

// Zod schema for validating subcategory data
const subcategorySchema = z.object({
  name: z.string().min(1, 'Subcategory name is required').max(255, 'Subcategory name is too long'),
  categoryId: z.string().uuid('Invalid category ID format'),
});

/**
 * Add a new category to the database.
 * @param data - Object containing category details.
 */
export async function addCategory(data: { name: string }) {
  try {
    // Validate input using Zod schema
    categorySchema.parse(data);

    await connectDB();
    const category = new Category({ name: data.name });
    const savedCategory = await category.save();

    return {
      _id: savedCategory._id.toString(),
      name: savedCategory.name
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation Error:', error.errors);
      throw new Error('Invalid data: ' + error.errors.map((e) => e.message).join(', '));
    }
    console.error('Error adding category:', error.message, error.stack);
    throw new Error('Failed to add category. Please try again.');
  }
}

/**
 * Fetch all categories from the database.
 */
export async function getCategories() {
  try {
    await connectDB();
    const categories = await Category.find();
    
    return categories.map(category => ({
      _id: category._id.toString(),
      name: category.name,
      subcategories: category.subcategories?.map(sub => ({
        _id: sub._id.toString(),
        name: sub.name
      })) || []
    }));
  } catch (error) {
    console.error('Error fetching categories:', error.message, error.stack);
    throw new Error('Failed to fetch categories. Please try again.');
  }
}

/**
 * Add a new subcategory to a category.
 * @param data - Object containing subcategory details.
 */
export async function addSubcategory(data: { name: string; categoryId: string }) {
  try {
    // Validate input using Zod schema
    subcategorySchema.parse(data);

    await connectDB();
    const subcategory = new Subcategory({ name: data.name, categoryId: data.categoryId });
    const savedSubcategory = await subcategory.save();

    // Update the parent category to include this subcategory
    await Category.findByIdAndUpdate(data.categoryId, {
      $push: { subcategories: savedSubcategory._id },
    });

    return savedSubcategory;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation Error:', error.errors);
      throw new Error('Invalid data: ' + error.errors.map((e) => e.message).join(', '));
    }
    console.error('Error adding subcategory:', error.message, error.stack);
    throw new Error('Failed to add subcategory. Please try again.');
  }
}

/**
 * Fetch all subcategories for a specific category.
 * @param categoryId - ID of the category to fetch subcategories for.
 */
export async function getSubcategories(categoryId: string) {
  try {
    await connectDB();
    const subcategories = await Subcategory.find({ categoryId });
    return subcategories;
  } catch (error) {
    console.error('Error fetching subcategories:', error.message, error.stack);
    throw new Error('Failed to fetch subcategories. Please try again.');
  }
}

/**
 * Delete a category and its associated subcategories.
 * @param categoryId - ID of the category to delete.
 */
export async function deleteCategory(categoryId: string) {
  try {
    await connectDB();

    // Delete all subcategories associated with the category
    const deletedSubcategories = await Subcategory.deleteMany({ categoryId });

    // Delete the category itself
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    return {
      message: 'Category and subcategories deleted successfully.'
    };
  } catch (error) {
    console.error('Error deleting category:', error.message, error.stack);
    throw new Error('Failed to delete category. Please try again.');
  }
}
