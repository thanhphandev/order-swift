import React from 'react'
import Link from 'next/link'
const page = async ({params}: {params: Promise<{category: string}>}) => {
  const category = (await params).category;
  return (
    <div>
        Category {category}
        <Link href="/menu">Food</Link>
    </div>
  )
}

export default page