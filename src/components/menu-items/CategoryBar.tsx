"use client";

import React, { useState, useEffect } from "react";
import { Plus, MinusCircleIcon, Trash2Icon } from "lucide-react";
import type { Category, Subcategory } from "@/app/types/category";
import { getCategories, getSubcategories, deleteCategory, deleteSubcategory } from "@/app/actions/category";
import { Button } from "@/components/ui/button";
import { ModalAction } from "@/components/widgets/ModalAction";
import AddCategoryForm from "@/components/forms/AddCategoryForm";
import { SubCategoryList } from "./Subcategory";
import DeleteConfirmationModal from "../widgets/DeleteConfirmationModal";

export function CategoryBar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; type: "category" | "subcategory" } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const handleCategoryAdded = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleSubcategoryAdded = (newSubcategory: Subcategory) => {
    setSubcategories((prev) => [...prev, newSubcategory]);
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleClickCategory = async (id: string) => {
    setSelectedCategory(id);
    try {
      const subs = await getSubcategories(id);
      setSubcategories(subs);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };

  const confirmDelete = async () => {
    if (deleteTarget) {
      if (deleteTarget.type === "category") {
        await deleteCategory(deleteTarget.id);
        setCategories((prev) => prev.filter((category) => category._id !== deleteTarget.id));
      } else if (deleteTarget.type === "subcategory") {
        await deleteSubcategory(deleteTarget.id);
        setSubcategories((prev) => prev.filter((subcategory) => subcategory._id !== deleteTarget.id));
      }
    }
    setIsDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  const requestDelete = (id: string, type: "category" | "subcategory") => {
    setDeleteTarget({ id, type });
    setIsDeleteConfirmOpen(true);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="rounded-xl flex flex-col w-full bg-white shadow-sm">
      {/* Confirm Delete Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmOpen}
        setIsOpen={setIsDeleteConfirmOpen}
        onConfirm={confirmDelete}
        type={deleteTarget?.type || 'category'}
      />

      {/* Add Category Modal */}
      <ModalAction title="Thêm danh mục" isOpen={isCategoryOpen} setIsOpen={setIsCategoryOpen}>
        <AddCategoryForm onOpenChange={setIsCategoryOpen} onCategoryAdded={handleCategoryAdded} />
      </ModalAction>

      <div className="flex items-center gap-3 p-4 border-b">
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <div
              className="relative"
              key={category._id}
              onMouseEnter={() => setHoveredCategory(category._id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <button
                onClick={() => handleClickCategory(category._id)}
                className={`px-4 py-2 rounded-xl transition-colors shrink-0 ${
                  selectedCategory === category._id
                    ? "bg-orange-500 text-white"
                    : "bg-orange-100 hover:bg-orange-50 text-black"
                }`}
              >
                <span className="flex items-center gap-2">{category.name}</span>
              </button>
              {hoveredCategory === category._id && (
                <button
                  onClick={() => requestDelete(category._id, "category")}
                  className="absolute -top-3 -right-2 p-1 text-red-500 bg-white rounded-full shadow-sm"
                >
                  <MinusCircleIcon size={16} />
                </button>
              )}
            </div>
          ))}
          <Button
            onClick={() => setIsCategoryOpen(true)}
            className="px-4 py-2 bg-orange-500 rounded-xl text-white hover:bg-orange-600 shrink-0"
          >
            <Plus size={25} />
          </Button>
        </div>
      </div>
      {selectedCategory && (
        <SubCategoryList
          subCategories={subcategories}
          categoryId={selectedCategory}
          onSubcategoryAdded={handleSubcategoryAdded}
          onSubcategoryDeleted={(id) => requestDelete(id, "subcategory")}
        />
      )}
    </div>
  );
}
