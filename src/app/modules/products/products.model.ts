import { Schema, model } from "mongoose";
import Product from "./products.interface";

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  tags: {
    type: [String],
  },
  variants: [
    {
      type: {
        type: String,
        required: [true, "Variant type is required"],
      },
      value: {
        type: String,
        required: [true, "Variant value is required"],
      },
    },
  ],
  inventory: {
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"], // Ensure quantity is non-negative
    },
    inStock: {
      type: Boolean,
      required: [true, "InStock status is required"], // Ensure inStock status is provided
    },
  },
});

export const productModel = model<Product>("product", productSchema);
