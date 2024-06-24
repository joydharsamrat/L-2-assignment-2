import { Model } from "mongoose";

export type TOrder = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};

export interface Order extends Model<TOrder> {
  checkAvailableQuantity(productId: string): Promise<number | null>;
}
