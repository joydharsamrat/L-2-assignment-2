import { Schema, model } from "mongoose";
import Order from "./orders.interface";
import Order from "./orders.interface";

const orderSchema = new Schema<Order>({
  email: {
    type: String,
    required: [true, "User Email is required"],
  },
  productId: {
    type: String,
    required: [true, "Product id is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Price is required"],
    min: [1, "Quantity can not be 0 or negative value"],
  },
});

export const orderModel = model<Order>("order", orderSchema);
