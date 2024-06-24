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

// static method to check available quantity of ordered product before ordering//
orderSchema.statics.checkAvailableQuantity = async function (
  productId: string
) {
  const quantityData = await productModel.findOne(
    { _id: productId },
    { _id: 0, "inventory.quantity": 1 }
  );
  const quantity = quantityData?.inventory.quantity;
  return quantity;
};

// update product inventory
orderSchema.statics.updateProductQuantity = async function (
  productId: string,
  orderedQuantity: number,
  availableQuantity: number
) {
  const updatedDoc: { $inc: {}; $set?: {} } = {
    $inc: { "inventory.quantity": -orderedQuantity },
  };

  if (availableQuantity - orderedQuantity === 0) {
    updatedDoc.$set = { "inventory.inStock": false };
  }

  const result = await productModel.updateOne({ _id: productId }, updatedDoc);
  return result;
};

export const orderModel = model<TOrder, Order>("order", orderSchema);
