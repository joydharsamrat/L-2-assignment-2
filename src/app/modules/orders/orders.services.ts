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

  //  if available quantity is sufficient create order
  const result = await orderModel.create(order);

  //   update product inventory
  if (result) {
    await orderModel.updateProductInventory(
      order.productId,
      order.quantity,
      availableQuantity
    );
  }

  return result;
};

// fetch all orders
const getallOrders = async () => {
  const result = await orderModel.find({});
  return result;
};

// get orders by user
const getOrdersByUser = async (email: string) => {
  const result = await orderModel.find({ email: email });
  return result;
};

export const orderServices = {
  createOrder,
  getallOrders,
  getOrdersByUser,
};
