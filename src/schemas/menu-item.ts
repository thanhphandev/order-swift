import { z } from "zod";

export const basicInformationSchema = z.object({
  name: z.string().min(3, "Tên phải có ít nhất 3 ký tự"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  category: z.string(),
  subcategory: z.string().optional(),
  price: z.number().min(0, "Giá không được nhỏ hơn 0"),
});

export const pricingOptionsSchema = z.object({
  pricePerSize: z
    .array(
      z.object({
        size: z.string(),
        price: z.number().min(0),
      })
    )
    .optional(),
  topping: z
    .array(
      z.object({
        name: z.string(),
        price: z.number().min(0),
      })
    )
    .optional(),
});

export const additionalDetailsSchema = z.object({
  image: z.string().min(1, "Yêu cầu phải cung cấp hình ảnh"),
  isAvailable: z.boolean(),
  isBestSeller: z.boolean(),
});

export const productFormSchema = basicInformationSchema.merge(
  pricingOptionsSchema).merge(additionalDetailsSchema);

export type ProductFormValues = z.infer<typeof productFormSchema>;