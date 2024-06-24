import { Schema, model } from "mongoose";
import { Order, TOrder } from "./orders.interface";
import { productModel } from "../products/products.model";

const orderSchema = new Schema<TOrder, Order>({
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

orderSchema.statics.checkAvailableQuantity = async function (
  productId: string
) {
  const quantity = await productModel.find(
    { _id: productId },
    { _id: 0, quantity: 1 }
  );
  return quantity;
};

export const orderModel = model<TOrder, Order>("order", orderSchema);
