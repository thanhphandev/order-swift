import React from 'react'
import Link from 'next/link'


const Menu = async({searchParams} : {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const tableName = (await searchParams).table;
  return (
    <div>
        <h1>Menu</h1>
        {tableName ? (
        <p>Table: {tableName}</p>
      ) : (
        <p>No table selected.</p>
      )}
        <Link href="/menu/hem"> Go to page 1</Link>
    </div>
  )
}

export default Menu