'use client';

import Image from 'next/image';
import { ThumbsUp, MoreVertical, Pencil, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import type { MenuItemType } from '@/types/menu-item';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteProduct, updateProductBestSeller, updateProductStatus } from '@/actions/menu-item.action';
import { ModalAction } from '@/components/widgets/ModalAction'
import EditProduct from '@/components/forms/product-form/edit-product';
import DeleteConfirmationModal from '@/components/widgets/DeleteConfirmationModal';

interface MenuItemProps {
    product: MenuItemType;
}

const MenuItem = ({ product }: MenuItemProps) => {
    const [isEditProductOpen, setIsEditProductOpen] = useState<boolean>(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);

    const [selectedSize, setSelectedSize] = useState<string | null>(
        product.pricePerSize?.length ? product.pricePerSize[0].size : null
    );

    const [isAvailable, setIsAvailable] = useState<boolean>(product.isAvailable);

    const currentPrice = product.pricePerSize?.length
        ? product.pricePerSize.find(p => p.size === selectedSize)?.price
        : product.price;


    const handleSwitchToggle = async () => {
        const newState = !isAvailable;
        setIsAvailable(newState);
        toast.success(newState ? 'Sản phẩm đang hiển thị!' : 'Sản phẩm đã bị ẩn.');
        try {
            await updateProductStatus(product._id, newState);
        } catch (error) {
            setIsAvailable(!newState);
            toast.error('Không thể cập nhật trạng thái sản phẩm. Vui lòng thử lại.');
        }
    };

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(product._id);
            toast.success('Sản phẩm đã được xoá!');
        } catch (error) {
            toast.error('Không thể xoá sản phẩm. Vui lòng thử lại.');
        }
    };

    const handleBestSeller = async () => {
        try {
            await updateProductBestSeller(product._id, !product.isBestSeller);
            toast.success(
                product.isBestSeller
                    ? 'Sản phẩm không còn là sản phẩm bán chạy.'
                    : 'Sản phẩm đã được đặt là sản phẩm bán chạy.'
            );
        } catch (error) {
            toast.error('Không thể cập nhật trạng thái sản phẩm. Vui lòng thử lại.');
        }
    }

    return (
        <div
            className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
        >
            <ModalAction
                title="Chỉnh sửa sản phẩm"
                isOpen={isEditProductOpen}
                setIsOpen={setIsEditProductOpen}
            >
                <EditProduct product={product} onOpenChange={setIsEditProductOpen} />

            </ModalAction>

            <DeleteConfirmationModal
                isOpen={isDeleteConfirmOpen}
                setIsOpen={setIsDeleteConfirmOpen}
                onConfirm={handleDeleteProduct}
                itemName={product.name}
            />

            <div className="relative w-full h-48 overflow-hidden">
                {/* Skeleton loader or placeholder image */}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 rounded-full p-2 transition-colors">
                    <Switch checked={isAvailable} onCheckedChange={handleSwitchToggle} />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="absolute top-3 right-3 p-2 bg-white rounded-full transition-colors">
                            <MoreVertical className="h-4 w-4" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem onClick={handleBestSeller}>
                            <ThumbsUp className="mr-2 h-4 w-4" /> {product.isBestSeller ? 'Bỏ bán chạy' : 'Đặt bán chạy'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsEditProductOpen(true)}>
                            <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsDeleteConfirmOpen(true)}>
                            <Trash2Icon className="mr-2 h-4 w-4" /> Xoá
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="absolute bottom-3 left-3 flex flex-col gap-2">
                    {isAvailable === false && (
                        <Badge variant="destructive" className="bg-red-500 rounded-xl">
                            Hết hàng
                        </Badge>
                    )}
                    {product.isBestSeller && (
                        <Badge variant="default" className="bg-amber-500 rounded-xl">
                            🔥 Bán chạy
                        </Badge>
                    )}
                </div>
            </div>

            {/* Product Details */}
            <div className="p-4 space-y-2">
                <div className="flex justify-between items-center cursor-pointer">
                    <h3 className="text-lg font-bold text-gray-800 truncate max-w-[70%]">
                        {product.name}
                    </h3>
                    <span className="text-green-500 font-semibold text-base">
                        {currentPrice?.toLocaleString()}đ
                    </span>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

                {product.pricePerSize && product.pricePerSize.length > 0 && (
                    <div className="flex gap-2">
                        {product.pricePerSize.map(({ size, price }) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedSize === size
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuItem;
