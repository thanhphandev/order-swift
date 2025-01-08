'use client'

import React, { useState } from 'react'
import { ModalAction } from '@/components/widgets/ModalAction';
import NewProduct from '@/components/forms/product-form/new-product';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';


const AddMenuItem = () => {
    const [isAddMenuItemOpen, setIsAddMenuItemOpen] = useState(false);
    return (
        <div>
            <ModalAction
                title="Thêm mục menu"
                isOpen={isAddMenuItemOpen}
                setIsOpen={setIsAddMenuItemOpen}
            >
                <NewProduct onOpenChange={setIsAddMenuItemOpen} />
            </ModalAction>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                <div onClick={() => setIsAddMenuItemOpen(true)} className="flex justify-center bg-white mt-5 items-center py-10 rounded-xl border-dashed border-2 border-gray-200">
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 transition-colors"
                    >
                        <Plus size={24} />
                        <span className="font-medium">Thêm món</span>
                    </Button>
                </div>
            </div>

        </div>

    )
}

export default AddMenuItem