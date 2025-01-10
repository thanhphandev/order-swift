import { getCategories } from '@/actions/category.action'
import { CategoryBar } from '@/components/menu/category-bar';
import Header from '@/components/menu/header'
import CartView from '@/components/cart/cart-view';

interface MenuLayoutProps {
    children: React.ReactNode
}

const MenuLayout = async ({ children }: MenuLayoutProps) => {
    const categories = await getCategories();
    const availableTables = Array.from({ length: 10 }, (_, i) => `${i + 1}`);

    return (
        <div>
            <Header />
            <CategoryBar categories={categories} />
            {children}
            <CartView tables={availableTables} />
        </div>
    )
}

export default MenuLayout