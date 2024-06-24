import express from "express";
import { orderControllers } from "./orders.controllers";

const router = express.Router();

router.get("/", orderControllers.handleGetOrders);

router.post("/", orderControllers.handleCreateOrder);

export const orderRoutes = router;
