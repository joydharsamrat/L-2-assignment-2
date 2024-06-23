import { z } from "zod";

// Zod validation schema for Product
const productValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .min(1, "There must be at least one tag"),
  variants: z
    .array(
      z.object({
        type: z.string().min(1, "Variant type is required"),
        value: z.string().min(1, "Variant value is required"),
      })
    )
    .min(1, "There must be at least one variant"),
  inventory: z.object({
    quantity: z.number().int().min(0, "Quantity cannot be negative"),
    inStock: z.boolean(),
  }),
});

export default productValidationSchema;
