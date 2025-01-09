import React from 'react'
import { filterProducts } from '@/actions/menu-item.action';
import { Product } from '@/components/menu/product';

const page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const categoryPath = (await params).category;
  const products = await filterProducts(categoryPath);
  return (
    <div
      className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      gap-6 
      p-4
    "
    >
      Category {categoryPath}
      {products.length > 0 ? products.map((product) => (
        <Product key={product._id}
          product={product} />
      )) : <div>No products found</div>}
    </div>
  )
}

export default page