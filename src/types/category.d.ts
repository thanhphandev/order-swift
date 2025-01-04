export interface SubcategoryType {
    _id: string;
    name: string;
}

export interface CategoryType {
    _id: string;
    name: string;
    subcategories?: Subcategory[];
}
