export interface Category {
    _id: string;
    name: string;
    subcategories?: Subcategory[];
}

export interface Subcategory {
    _id: string;
    name: string;
}