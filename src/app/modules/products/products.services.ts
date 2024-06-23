import Product from "./products.interface";
import { productModel } from "./products.model";

// add product in db
const createProduct = async (product: Product) => {
  const result = await productModel.create(product);
  return result;
};

// get all products from db
const getAllProducts = async () => {
  const result = await productModel.find({});
  return result;
};

// get searched product
const getSearchedProducts = async (searchTerm: string) => {
  const result = await productModel.find({ $text: { $search: searchTerm } });
  return result;
};

// get single product by id
const getProductById = async (id: string) => {
  const result = await productModel.findOne({ _id: id });
  return result;
};

// update product
const updateProduct = async (id: string, product: Product) => {
  const result = await productModel.updateOne({ _id: id }, product);
  return result;
};

// delete a product
const deleteProduct = async (id: string) => {
  const result = await productModel.deleteOne({ _id: id });
  return result;
};

export const productServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getSearchedProducts,
  deleteProduct,
};
