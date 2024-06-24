import { Request, Response } from "express";
import orderValidationSchema from "./orders.validation";
import { orderServices } from "./orders.services";

// create order
const handleCreateOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
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

export const orderControllers = { handleCreateOrder };
