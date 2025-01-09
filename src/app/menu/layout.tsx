import { getCategories } from '@/actions/category.action'
import { CategoryBar } from '@/components/menu/category-bar';
import Header from '@/components/menu/header'

interface MenuLayoutProps {
    children: React.ReactNode
}
const MenuLayout = async({ children }: MenuLayoutProps) => {
    const categories = await getCategories();
    return (
        <div>
            <Header />
            <CategoryBar categories={categories} />
            {children}
        </div>
    )
}

export default MenuLayout