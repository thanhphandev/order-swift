import React, { useState } from 'react';
import type { Subcategory } from '@/app/types/category';
import { Plus } from 'lucide-react';

interface SubCategoryListProps {
  subCategories: Subcategory[];
}

export function SubCategoryList({ subCategories }: SubCategoryListProps) {
  if (subCategories.length === 0) return null;

  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const handleClickSubcategory = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  return (
    <div className="bg-white border-t px-4 py-2 animate-slideDown">
        <button
        className="p-2 bg-orange-500 rounded-xl text-white hover:bg-orange-600 transition-colors"
        aria-label="Add category"
      >
        <Plus size={20} />
      </button>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide p
      b-2">
        {subCategories.map((subCategory) => (
          <button
            onClick={() => handleClickSubcategory(subCategory._id)}
            key={subCategory._id}
            className={`px-4 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedSubcategory === subCategory._id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 hover:text-white hover:bg-orange-500'
            }`}
          >
            {subCategory.name}
          </button>
        ))}
      </div>
    </div>
  );
}
