import express from "express";
import { productControllers } from "./products.controllers";

const router = express.Router();

router.get("/", productControllers.handelGetAllProducts);
router.get("/:productId", productControllers.handelGetProductById);

router.post("/", productControllers.handelCreateProduct);

export const productRoutes = router;
