import { CategoryBar } from '@/components/menu-items/CategoryBar'
import { getCategories } from '@/app/actions/category'
import React from 'react'

const MenuItems = async() => {
  const categories = await getCategories();
  return (
    <div>
        <CategoryBar categories={categories}/>
    </div>
  )
}

export default MenuItems