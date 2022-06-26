import { orderModel, IOrder } from "../models/orderModel";
import { BaseApiService } from "./BaseApiService";

class OrderService extends BaseApiService<IOrder> {
  constructor() {
    super(orderModel, ['userId']);
  }

  async getByUserId(id: string): Promise<IOrder[]> {
    return await orderModel.find({ userId: id}).populate('userId');
  }
}

export default new OrderService();
