import express from "express";
import { productControllers } from "./products.controllers";

const router = express.Router();

router.get("/", productControllers.handelGetAllOrSearchedProducts);
router.get("/:productId", productControllers.handelGetProductById);

router.post("/", productControllers.handelCreateProduct);

router.put("/:productId", productControllers.handelUpdateProduct);

router.delete("/:productId", productControllers.handelDeleteProduct);

export const productRoutes = router;
