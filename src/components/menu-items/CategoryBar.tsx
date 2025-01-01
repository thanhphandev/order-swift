"use client";

import React, { useState, useEffect } from 'react';
import { Plus, ChevronRight, MinusCircle, MinusCircleIcon } from 'lucide-react'; // Add Trash icon
import type { Category, Subcategory } from '@/app/types/category';
import { getCategories, getSubcategories, deleteCategory } from '@/app/actions/category'; // Assuming you have these actions
import { Button } from '@/components/ui/button';
import { ModalAction } from '@/components/widgets/ModalAction';
import AddCategoryForm from '@/components/forms/AddCategoryForm';

export function CategoryBar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const handleCategoryAdded = (newCategory: Category) => {
    setCategories(prev => [...prev, newCategory]);
  };

  const fetchCategories = async () => {
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
  };

  const handleClickCategory = async (id: string) => {
    setSelectedCategory(id);
    const subs = await getSubcategories(id);
    setSubcategories(subs);
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteCategory(id); // Assuming this action handles deletion
    setCategories(prev => prev.filter(category => category._id !== id));
  };

  // const handleDeleteSubcategory = async (id: string) => {
  //   await deleteSubcategory(id); // Assuming this action handles deletion
  //   setSubcategories(prev => prev.filter(sub => sub._id !== id));
  // };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="rounded-xl flex flex-col w-full bg-white shadow-sm">
      <ModalAction title="Thêm danh mục" isOpen={isCategoryOpen} setIsOpen={setIsCategoryOpen}>
        <AddCategoryForm onOpenChange={setIsCategoryOpen} onCategoryAdded={handleCategoryAdded} />
      </ModalAction>

      <div className="flex flex-wrap items-center gap-3 p-4 border-b">
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <div className="relative" key={category._id}>
              <button
                onClick={() => handleClickCategory(category._id)}
                className={`p-3 rounded-xl transition-colors shrink-0 ${selectedCategory === category._id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
              >
                <span className="flex items-center gap-2">
                  {category.name}
                </span>
              </button>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className={`absolute -top-3 -right-2 p-2 ${selectedCategory === category._id
                  ? 'text-black'
                  : 'text-red-500'
                  }`}
              >
                <MinusCircleIcon size={16} />
              </button>
            </div>
          ))}
          <Button
            onClick={() => setIsCategoryOpen(true)}
            className="p-5 bg-orange-500 rounded-xl text-white hover:bg-orange-600 shrink-0"
          >
            <Plus size={25} />
          </Button>
        </div>
      </div>

      {selectedCategory && (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50">
          <Button
            onClick={() => setIsSubcategoryOpen(true)}
            className="p-2 bg-orange-400 rounded-xl text-white hover:bg-orange-500 shrink-0"
          >
            <Plus size={16} />
          </Button>

          <div className="flex flex-wrap gap-3">
            {subcategories.map((sub) => (
              <div className="relative" key={sub._id}>
                <span
                  className="px-4 py-2 text-sm bg-white rounded-lg text-gray-700 shadow-sm"
                >
                  {sub.name}
                </span>
                {/* <button
                  className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
                >
                  <Trash size={12} />
                </button> */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
