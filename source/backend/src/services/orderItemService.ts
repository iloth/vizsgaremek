import { orderItemModel, IOrderItem } from "../models/orderItemModel";
import { BaseApiService } from "./BaseApiService";

class OrderItemService extends BaseApiService<IOrderItem> {
  constructor() {
    super(orderItemModel);
  }

  async getByOrderId(id: string): Promise<IOrderItem[]> {
    return await orderItemModel.find({ orderId: id});
  }
}

export default new OrderItemService();
