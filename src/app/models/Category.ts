import mongoose, { Schema, model, Types } from 'mongoose';


const SubcategorySchema = new Schema({
    name: { type: String, required: true },
    categoryId: { type: Types.ObjectId, ref: 'Category', required: true },
});


const CategorySchema = new Schema({
    name: { type: String, required: true },
    subcategories: [{ type: Types.ObjectId, ref: 'Subcategory' }],
});


export const Subcategory = mongoose.models.Subcategory || model('Subcategory', SubcategorySchema);
export const Category = mongoose.models.Category || model('Category', CategorySchema);