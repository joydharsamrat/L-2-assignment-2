import { z } from "zod";

const orderValidationSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "user Email id is required"),
  productId: z.string().min(1, "Product id is required"),
  price: z
    .number()
    .positive("Price must be a positive number")
    .min(1, "Price is required"),
  quantity: z
    .number()
    .int()
    .positive("Quantity must be a positive number")
    .min(1, "Quantity is required"),
});

export default orderValidationSchema;
