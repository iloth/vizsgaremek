import { orderModel, IOrder } from "../models/orderModel";
import { BaseApiService } from "./BaseApiService";

class OrderService extends BaseApiService<IOrder> {
  constructor() {
    super(orderModel);
  }

  async getByUserId(id: string): Promise<IOrder[]> {
    return await orderModel.find({ userId: id});
  }
}

export default new OrderService();
