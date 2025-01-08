import React from 'react'

const page = async({params}: {params: Promise<{subcategory: string}>}) => {
    const subcategory = (await params).subcategory;
  return (
    <div>
        Here is subcategory {subcategory}
    </div>
  )
}

export default page