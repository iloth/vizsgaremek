import { IOrderHistoryMonth, IOrderHistoryWeek, IOrders, IOrderStat } from "../models/dashboard";
import { orderModel, IOrder } from "../models/orderModel";
import { BaseApiService } from "./BaseApiService";

class OrderService extends BaseApiService<IOrder> {
  constructor() {
    super(orderModel, ['userId']);
  }

  async getByUserId(id: string): Promise<IOrder[]> {
    return await orderModel.find({ userId: id }).populate('userId');
  }

  async getByStatus(status: string): Promise<IOrder[]> {
    return await orderModel.find({ status: status }).populate('userId').sort({ orderDate: 1 });
  }

  async getOrdered(): Promise<IOrders> {
    const orders = await this.getByStatus('ordered');
    return {
      count: orders.length,
      orders: orders.slice(0, 5)
    } as IOrders;
  }

  async getInprogress(): Promise<IOrders> {
    const orders = await this.getByStatus('inprogress');
    return {
      count: orders.length,
      orders: orders.slice(0, 5)
    } as IOrders;
  }

  async getOrderStat(): Promise<IOrderStat> {
    const total = orderModel.aggregate([{ '$count': 'total' } ]);
    const byStatus = orderModel.aggregate([{ '$group': { '_id': '$status', 'count': { '$count': {} } } }]);

    return {
      total: 50,
      ordered: 4,
      inprogress: 1,
      completed: 40,
      cancelled: 5,
      inDay: 10,
      inWeek: 20,
      inMonth: 30,
      inYear: 40
    } as IOrderStat
  }

  async getOrderHistoryW(): Promise<IOrderHistoryWeek[]> {
    return [
      { week: "23", completed: 10 } as IOrderHistoryWeek,
      { week: "22", completed: 50 } as IOrderHistoryWeek,
      { week: "21", completed: 42 } as IOrderHistoryWeek,
      { week: "20", completed: 53 } as IOrderHistoryWeek,
      { week: "19", completed: 30 } as IOrderHistoryWeek,
    ]
  }

  async getOrderHistoryM(): Promise<IOrderHistoryMonth[]> {
    return [
      { month: "Julius", completed: 25 } as IOrderHistoryMonth,
      { month: "Junius", completed: 195 } as IOrderHistoryMonth,
      { month: "Május", completed: 180 } as IOrderHistoryMonth,
      { month: "Április", completed: 212 } as IOrderHistoryMonth,
      { month: "Február", completed: 150 } as IOrderHistoryMonth,
    ]
  }


}

export default new OrderService();
