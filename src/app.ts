import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRoutes } from "./app/modules/products/products.route";
import { orderRoutes } from "./app/modules/orders/orders.route";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//product route
app.use("/api/products", productRoutes);

// order route
app.use("/api/orders", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("App is running");
});

export default app;
