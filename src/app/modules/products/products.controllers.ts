import { Request, Response } from "express";
import { productServices } from "./products.services";
import productValidationSchema from "./products.validation";

// add product single in db
const handelCreateProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const validatedProduct = productValidationSchema.parse(product);

    const result = await productServices.createProduct(validatedProduct);
    res.status(200).json({
      success: true,
      message: "Product Created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
};

// get all products from db
const handelGetAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProducts();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
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

// get single product by id
const handelGetProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getProductById(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
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

export const productControllers = {
  handelCreateProduct,
  handelGetAllProducts,
  handelGetProductById,
};
