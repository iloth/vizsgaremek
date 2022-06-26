import mongoose from "mongoose";
import { orderItemModel, IOrderItem } from "../models/orderItemModel";
import { BaseApiService } from "./BaseApiService";

class OrderItemService extends BaseApiService<IOrderItem> {
  constructor() {
    super(orderItemModel, ['burgerParts']);
  }

  async getByOrderId(id: string): Promise<IOrderItem[]> {
    return await orderItemModel.find({ orderId: id}).populate('burgerParts');
  }
}

export default new OrderItemService();
