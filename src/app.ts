import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRoutes } from "./app/modules/products/products.route";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes

app.use("/api/products", productRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("App is running");
});

export default app;
