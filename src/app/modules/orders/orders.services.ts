import { TOrder } from "./orders.interface";
import { orderModel } from "./orders.model";

// create order
const createOrder = async (order: TOrder) => {
  // Check available quantity
  const availableQuantity = await orderModel.checkAvailableQuantity(
    order.productId
  );
  if (availableQuantity) {
    if (order.quantity > availableQuantity) {
      throw new Error("Insufficient quantity available in inventory");
    }
  } else {
    throw new Error("Product not found");
  }

  //   if available quantity is sufficient
  const result = await orderModel.create(order);
  return result;
};

export const orderServices = {
  createOrder,
};
