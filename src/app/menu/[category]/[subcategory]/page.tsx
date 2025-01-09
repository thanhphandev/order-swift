import React from 'react'
import { filterProducts } from '@/actions/menu-item.action';
import { Product } from '@/components/menu/product';

const page = async ({ params }: { params: Promise<{ subcategory: string }> }) => {
  const subcategory = (await params).subcategory;
  const products = await filterProducts(undefined, subcategory);
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
      Here is subcategory {subcategory}
      {products.length > 0 ? products.map((product) => (
        <Product key={product._id}
          product={product} />
      )) : <div>No products found</div>}
    </div>
  )
}

export default page