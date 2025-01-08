import { CategoryBar } from '@/components/menu-items/CategoryBar'
import { getCategories } from '@/actions/category.action'
import React from 'react'

const Menu = async() => {
  const categories = await getCategories();
  return (
    <div>
        <CategoryBar categories={categories}/>
    </div>
  )
}

export default Menu