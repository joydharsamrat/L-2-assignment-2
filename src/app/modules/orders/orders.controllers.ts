import { Request, Response } from "express";
import orderValidationSchema from "./orders.validation";
import { orderServices } from "./orders.services";

// create order
const handleCreateOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    // validate order data using zod
    const validatedOrder = orderValidationSchema.parse(order);

    const result = await orderServices.createOrder(validatedOrder);
    res.status(200).json({
      success: true,
      message: "Order Created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
};

// get all or user specific orders
const handleGetOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    // orders for specific user
    if (email) {
      const result = await orderServices.getOrdersByUser(email as string);
      res.status(200).json({
        success: true,
        message: `Orders Fetched successfully for ${email}`,
        data: result,
      });
      return;
    }

    // all orders
    const result = await orderServices.getallOrders();
    res.status(200).json({
      success: true,
      message: "Orders Fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
};

export const orderControllers = {
  handleCreateOrder,
  handleGetOrders,
};
