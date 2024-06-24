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
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error,
    });
  }
};

// get all/searched products from db
const handelGetAllOrSearchedProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    // if searched for products
    if (searchTerm) {
      const result = await productServices.getSearchedProducts(
        searchTerm as string
      );
      res.status(200).json({
        success: true,
        message: `Products matching search term " ${searchTerm} " fetched successfully!`,
        data: result,
      });
      return;
    }

    // get all products
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

// update product
const handelUpdateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = req.body;

    const validatedProduct = productValidationSchema.parse(product);

    const result = await productServices.updateProduct(
      productId,
      validatedProduct
    );

    // if product not found
    if (result?.matchedCount === 0) {
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      message: "Product Updated successfully",
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

// delete product
const handelDeleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.deleteProduct(productId);

    // if product not found
    if (result?.deletedCount === 0) {
      throw new Error("Product not found");
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted successfully",
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
  handelGetAllOrSearchedProducts,
  handelGetProductById,
  handelUpdateProduct,
  handelDeleteProduct,
};
