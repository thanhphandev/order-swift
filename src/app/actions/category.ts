'use server';

import { Category, Subcategory } from '@/app/models/Category';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/mongodb';
import { z } from 'zod';

export async function addCategory(data: { name: string }) {
  try {

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
    }));

  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories. Please try again.');
  }
}


export async function addSubcategory(data: { name: string; categoryId: string }) {
  try {
    console.log(data);

    await connectDB();
    const subcategory = new Subcategory({ name: data.name, categoryId: data.categoryId });
    const savedSubcategory = await subcategory.save();

    // Update the parent category to include this subcategory
    await Category.findByIdAndUpdate(data.categoryId, {
      $push: { subcategories: savedSubcategory._id },
    });

    return {
      _id: savedSubcategory._id.toString(),
      name: savedSubcategory.name
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation Error:', error.errors);
      throw new Error('Invalid data: ' + error.errors.map((e) => e.message).join(', '));
    }
    console.error('Error adding subcategory:', error);
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
    const formattedSubcategories = subcategories.map(sub => ({
      name: sub.name,
      _id: sub._id.toString()
      }));
    return formattedSubcategories;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
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
    await Subcategory.deleteMany({ categoryId });

    await Category.findByIdAndDelete(categoryId);

    return {
      message: 'Category and subcategories deleted successfully.'
    };
  } catch (error) {
    console.error('Error deleting category:', error);
    throw new Error('Failed to delete category. Please try again.');
  }
}

export async function deleteSubcategory(subcategoryId: string) {
  try {
    await connectDB();
    await Subcategory.findByIdAndDelete(subcategoryId);
    return {
      message: 'Subcategory deleted successfully.'
    };
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    throw new Error('Failed to delete subcategory. Please try again.');
  }
}
