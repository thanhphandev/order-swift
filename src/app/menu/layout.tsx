"use client"

import React, { useState } from 'react'

interface MenuLayoutProps {
    children: React.ReactNode
}
const MenuLayout = ({ children }: MenuLayoutProps) => {
    const [value, setValue ] = useState('')

    return (
        <div>
            <nav>Navigate {value}</nav>
            {children}
            <button className='bg-red-400 p-4' onClick={() => setValue("XIN CHAO")}>On click</button>

        </div>
    )
}

export default MenuLayout