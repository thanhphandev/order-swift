import { CategoryBar } from '@/components/menu-items/CategoryBar'
import { getCategories } from '@/actions/category'
import React from 'react'
import { CategoryType } from '@/types/category';

const MenuItems = async() => {
  const categories = await getCategories();
  return (
    <div>
        <CategoryBar categories={categories}/>
    </div>
  )
}

export default MenuItems